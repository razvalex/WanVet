"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("../models/user.model");
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var data_service_1 = require("./data.service");
var UserService = (function () {
    function UserService(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.usersApiUrl = 'api/users/';
        this.storage = localStorage;
        this.currentUserReplaySubject = new Rx_1.ReplaySubject(1);
        this.getUser().subscribe(function (user) { _this.setCurrentUser(user); });
        this.currentUserReplaySubject.subscribe(function (user) { return _this.onCurrentUserChange(user); });
    }
    UserService.prototype.getUser = function () {
        if (!this.retrieve("IsAuthorized") || (this.retrieve("Email") === "" || this.retrieve("Email") === null)) {
            return Rx_1.Observable.of(null);
        }
        return this.getUserByEmail(this.retrieve("Email"));
    };
    UserService.prototype.createUser = function (email, familyName, givenName, phoneNumber, gender, isDoctor) {
        return this.dataService.post(this.usersApiUrl, {
            Email: email, FamilyName: familyName,
            GivenName: givenName, PhoneNumber: phoneNumber, Gender: gender, IsDoctor: isDoctor
        }, {}).map(function (response) { return true; });
    };
    UserService.prototype.setCurrentUser = function (user) {
        this.currentUserReplaySubject.next(user);
    };
    UserService.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    UserService.prototype.toUser = function (response) {
        var pets = new Array();
        if (response["Pets"] !== null) {
            for (var index = 0; index < response["Pets"].length; index++) {
                var pet = response["Pets"][index];
                pets.push(new user_model_1.Pet(pet["Id"], pet["Name"], pet["Breed"], pet["Sex"], pet["Species"], pet["ProfileImageUrl"]));
            }
        }
        return new user_model_1.User(response["Id"], response["CalendarId"], response["Email"], response["FamilyName"], response["GivenName"], response["PhoneNumber"], response["Gender"], null, pets);
    };
    UserService.prototype.getUserByEmail = function (email) {
        var _this = this;
        return this.dataService.get(this.usersApiUrl, { email: email })
            .map(function (response) {
            if (response != null) {
                return _this.toUser(response);
            }
            return null;
        });
    };
    UserService.prototype.getDoctors = function (term) {
        var _this = this;
        return this.dataService.get(this.usersApiUrl + "doctors", { term: term })
            .map(function (response) {
            var returnedUsers = new Array();
            if (response !== null) {
                var users = _this.generateArray(response);
                users.forEach(function (value, index, array) {
                    returnedUsers.push(_this.toUser(value));
                });
                return returnedUsers;
            }
            return null;
        });
    };
    UserService.prototype.retrieve = function (key) {
        var item = this.storage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }
        return null;
    };
    UserService.prototype.onCurrentUserChange = function (currentUser) {
        this.isEnrolled = (currentUser !== null) && typeof (currentUser.id) !== 'undefined' && currentUser.id !== null
            && currentUser.id !== "";
        this.currentUser = currentUser;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map