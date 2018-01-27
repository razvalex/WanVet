"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pet = (function () {
    function Pet(id, name, ownerId, profileImageUrl, colorHex, breed, sex, species, birthDate, appointments) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.profileImageUrl = profileImageUrl;
        this.colorHex = colorHex;
        this.breed = breed;
        this.sex = sex;
        this.species = species;
        this.birthDate = birthDate;
        this.appointments = appointments;
    }
    return Pet;
}());
exports.Pet = Pet;
//# sourceMappingURL=pet.model.js.map