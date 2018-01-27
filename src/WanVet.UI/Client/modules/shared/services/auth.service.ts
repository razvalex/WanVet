import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from './user.service';

import { User } from '../models/user.model';
import { Configuration } from "../../app.constants";

@Injectable()
export class AuthService {

    private headers: Headers;
    private storage: any;
    isAuthorized: boolean;
    isAdmin: boolean;
    isStaff: boolean;
    isDoctor: boolean;
    gender: string;
    givenName: string;
    familyName: string;
    email: string;
    phoneNumber: string;
    private authorizationUrl: string;
    private clientId: string;
    private serverUrl: string;
    private identityServerUrl: string;
    private endSessionUrl: string;
    private unauthorizedUrl: string;
    private isDevelopment: boolean;
    private isProduction: boolean;

    constructor(private router: Router, private http: Http, private constants: Configuration, private userService: UserService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.storage = localStorage;
        this.isDevelopment = process.env.ENV === "Development";
        this.isProduction = process.env.ENV === "Production";
        this.clientId = this.isDevelopment ? constants.IdentityClientDevName : constants.IdentityClientProdName;
        this.identityServerUrl = this.isDevelopment ? constants.IdentityDevServer : constants.IdentityProdServer;
        this.serverUrl = this.isDevelopment ? constants.DevServer : constants.ProdServer;
        this.endSessionUrl = this.identityServerUrl + '/connect/endsession';
        this.authorizationUrl = this.identityServerUrl + '/connect/authorize';
        this.unauthorizedUrl = this.serverUrl + '/unauthorized';
        if (this.retrieve("IsAuthorized") !== "") {
            this.isAuthorized = this.retrieve("IsAuthorized");
        }
        if (this.retrieve("IsAdmin") !== "") {
            this.isAdmin = this.retrieve("IsAdmin");
        }
        if (this.retrieve("IsStaff") !== "") {
            this.isStaff = this.retrieve("IsStaff");
        }
        if (this.retrieve("IsDoctor") !== "") {
            this.isDoctor = this.retrieve("IsDoctor");
        }
        if (this.retrieve("Gender") !== "") {
            this.gender = this.retrieve("Gender");
        }
        if (this.retrieve("Email") !== "") {
            this.email = this.retrieve("Email");
        }
        if (this.retrieve("GivenName") !== "") {
            this.givenName = this.retrieve("GivenName");
        }
        if (this.retrieve("FamilyName") !== "") {
            this.familyName = this.retrieve("FamilyName");
        }
        if (this.retrieve("PhoneNumber") !== "") {
            this.phoneNumber = this.retrieve("PhoneNumber");
        }

    }

    logoff(): void {
        var idTokenHint = this.retrieve("authorizationDataIdToken");
        var url =
            this.endSessionUrl + "?" +
            "id_token_hint=" + encodeURI(idTokenHint) + "&" +
            "post_logout_redirect_uri=" + encodeURI(this.unauthorizedUrl);

        this.resetAuthorizationData();

        window.location.href = url;
    }

    authorize(): void {
        this.resetAuthorizationData();

        var responseType = "id_token token";
        var scope = "wanvet openid";
        var nonce = "N" + Math.random() + "" + Date.now();
        var state = Date.now() + "" + Math.random();

        this.store("authStateControl", state);
        this.store("authNonce", nonce);

        var url =
            this.authorizationUrl + "?" +
            "response_type=" + encodeURI(responseType) + "&" +
            "client_id=" + encodeURI(this.clientId) + "&" +
            "redirect_uri=" + encodeURI(this.serverUrl) + "&" +
            "scope=" + encodeURI(scope) + "&" +
            "nonce=" + encodeURI(nonce) + "&" +
            "state=" + encodeURI(state);

        window.location.href = url;
    }

    authorizedCallback(): void {
        this.resetAuthorizationData();

        var hash = window.location.hash.substr(1);

        var result: any = hash.split('&').reduce((result: any, item: string) => {
            var parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        var token = "";
        var id_token = "";
        var authResponseIsValid = false;
        if (!result.error) {

            if (result.state !== this.retrieve("authStateControl")) {
                console.log("AuthorizedCallback incorrect state");
            } else {

                token = result.access_token;
                id_token = result.id_token;

                var dataIdToken: any = this.getDataFromToken(id_token);

                // validate nonce
                if (dataIdToken.nonce !== this.retrieve("authNonce")) {
                    console.log("AuthorizedCallback incorrect nonce");
                } else {
                    this.store("authNonce", "");
                    this.store("authStateControl", "");

                    authResponseIsValid = true;
                    console.log("AuthorizedCallback state and nonce validated, returning access token");
                }
            }
        }

        if (authResponseIsValid) {
            this.setAuthorizationData(token, id_token);
            this.userService.getUser().subscribe((user: User) => { this.userService.setCurrentUser(user); });
            this.router.navigate(['/home']);
        }
        else {
            this.resetAuthorizationData();
            this.router.navigate(['/unauthorized']);
        }
    }

    handleError(error: any): void {
        console.log(error);
        if (error.status === 403) {
            this.router.navigate(['/forbidden']);
        }
        else if (error.status === 401) {
            this.resetAuthorizationData();
            this.router.navigate(['/unauthorized']);
        }
    }

    private urlBase64Decode(str: string): string {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        return window.atob(output);
    }

    private getDataFromToken(token: any): any {
        var data = {};
        if (typeof token !== 'undefined' && token) {
            var encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    private retrieve(key: string): any {
        var item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return null;
    }

    private store(key: string, value: any): void {
        this.storage.setItem(key, JSON.stringify(value));
    }

    getToken(): any {
        return this.retrieve("authorizationData");
    }

    resetAuthorizationData(): void {
        this.store("authorizationData", "");
        this.store("authorizationDataIdToken", "");

        this.isStaff = false;
        this.store("IsStaff", false);

        this.isAdmin = false;
        this.store("IsAdmin", false);

        this.isDoctor = false;
        this.store("IsDoctor", false);

        this.isAuthorized = false;
        this.store("IsAuthorized", false);

        this.store("Gender", "");
        this.store("Email", "");
        this.store("GivenName", "");
        this.store("FamilyName", "");
        this.store("PhoneNumber", "");
    }

    setAuthorizationData(token: any, id_token: any): void {
        if (this.retrieve("authorizationData") !== "") {
            this.store("authorizationData", "");
        }

        this.store("authorizationData", token);
        this.store("authorizationDataIdToken", id_token);

        this.isAuthorized = true;
        this.store("IsAuthorized", true);

        var data: any = this.getDataFromToken(id_token);
        this.isAdmin = data.role.indexOf("wanvet.admin") > -1;
        this.store("IsAdmin", this.isAdmin);

        this.isDoctor = data.role.indexOf("wanvet.doctor") > -1;
        this.store("IsDoctor", this.isDoctor);

        this.isStaff = data.role.indexOf("wanvet.staff") > -1;
        this.store("IsStaff", this.isStaff);

        this.gender = data.gender;
        this.store("Gender", data.gender);

        this.email = data.email;
        this.store("Email", data.email);

        this.givenName = data.given_name;
        this.store("GivenName", data.given_name);

        this.familyName = data.family_name;
        this.store("FamilyName", data.family_name);

        this.phoneNumber = data.phone_number;
        this.store("PhoneNumber", data.phone_number);
    };

    getUserPicture(): string {

        var isMale = this.retrieve("Gender") === "Male";

        if (isMale) {
            if (this.isAdmin) {
                return 'dist/assets/avatar_mad.png';
            }

            if (this.isDoctor || this.isStaff) {
                return 'dist/assets/avatar_mdr.png';
            }

            return 'dist/assets/avatar_mcl.png';
        } else {
            if (this.isAdmin || this.isDoctor || this.isStaff) {
                return 'dist/assets/avatar_fdr.png';
            }

            return 'dist/assets/avatar_fcl.png';
        }
    };

    getUserEmail = function () {
        return this.retrieve("Email");
    };

    getUserName = function () {
        return this.retrieve("GivenName") + ' ' + this.retrieve("FamilyName");
    };
}
