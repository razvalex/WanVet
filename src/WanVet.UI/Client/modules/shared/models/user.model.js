"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pet = (function () {
    function Pet(id, name, breed, sex, species, profileImageUrl) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.sex = sex;
        this.species = species;
        this.profileImageUrl = profileImageUrl;
    }
    return Pet;
}());
exports.Pet = Pet;
var User = (function () {
    function User(id, calendarId, email, familyName, givenName, phoneNumber, gender, creationDate, pets) {
        this.id = id;
        this.calendarId = calendarId;
        this.email = email;
        this.familyName = familyName;
        this.givenName = givenName;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.creationDate = creationDate;
        this.pets = pets;
        this.creationDate = creationDate || Date.now().toString();
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map