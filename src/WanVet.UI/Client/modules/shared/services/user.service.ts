import { User, Pet } from "../models/user.model";
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { DataService } from './data.service';
import { Response } from '@angular/http';

@Injectable()
export class UserService {

    private usersApiUrl: string = 'api/users/';
    private storage = localStorage;

    private currentUserReplaySubject: ReplaySubject<User> = new ReplaySubject<User>(1);

    public currentUser: User;
    public isEnrolled: Boolean;

    constructor(private dataService: DataService) {
        this.getUser().subscribe((user: User) => { this.setCurrentUser(user); });
        this.currentUserReplaySubject.subscribe(user => this.onCurrentUserChange(user));
    }

    public getUser(): Observable<User | null> {
        if (!this.retrieve("IsAuthorized") || (this.retrieve("Email") === "" || this.retrieve("Email") === null)) {
            return Observable.of(null);
        }

        return this.getUserByEmail(this.retrieve("Email"));
    }

    public createUser(email: string, familyName: string, givenName: string, phoneNumber: string, gender: string, isDoctor: boolean): Observable<Boolean> {
        return this.dataService.post(this.usersApiUrl, {
            Email: email, FamilyName: familyName,
            GivenName: givenName, PhoneNumber: phoneNumber, Gender: gender, IsDoctor: isDoctor
        }, {}).map(response => { return true });
    }

    public setCurrentUser(user: User) {
        this.currentUserReplaySubject.next(user);
    }

    private generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }

    private toUser(response): User {
        var pets = new Array<Pet>();
        if (response["Pets"] !== null) {
            for (var index = 0; index < response["Pets"].length; index++) {
                var pet = response["Pets"][index];
                pets.push(new Pet(pet["Id"], pet["Name"], pet["Breed"], pet["Sex"],
                    pet["Species"], pet["ProfileImageUrl"]));
            }
        }
        return new User(response["Id"], response["CalendarId"], response["Email"],
            response["FamilyName"], response["GivenName"],
            response["PhoneNumber"], response["Gender"], null, pets);
    }

    private getUserByEmail(email: string): Observable<User | null> {
        return this.dataService.get(this.usersApiUrl, { email: email })
            .map(response => {
                if (response != null) {
                    return this.toUser(response);
                }
                return null;
            });
    }

    public getDoctors(term: string): Observable<Array<User> | null> {
        return this.dataService.get(this.usersApiUrl + "doctors", { term: term })
            .map(response => {
                var returnedUsers = new Array<User>();
                if (response !== null) {
                    var users = this.generateArray(response);
                    users.forEach((value, index, array) => {
                        returnedUsers.push(this.toUser(value));
                    });
                    return returnedUsers;
                }
                return null;
            });
    }

    private retrieve(key: string): any {
        var item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return null;
    }

    protected onCurrentUserChange(currentUser: User) {
        this.isEnrolled = (currentUser !== null) && typeof (currentUser.id) !== 'undefined' && currentUser.id !== null
            && currentUser.id !== "";
        this.currentUser = currentUser;
    }

}
