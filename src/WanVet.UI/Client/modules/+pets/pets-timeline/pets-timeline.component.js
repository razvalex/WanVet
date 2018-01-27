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
var core_1 = require("@angular/core");
var pets_service_1 = require("../pets.service");
var user_service_1 = require("../../shared/services/user.service");
var router_1 = require("@angular/router");
var pet_model_1 = require("../pet.model");
var appointment_model_1 = require("../appointment.model");
var PetsTimelineComponent = (function () {
    function PetsTimelineComponent(route, petsService, userService, router) {
        this.route = route;
        this.petsService = petsService;
        this.userService = userService;
        this.router = router;
        this.loading = true;
    }
    PetsTimelineComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.petId = this.route.snapshot.params['id'];
        this.petsService.get(this.petId).map(function (response) {
            var appointments = new Array();
            if (response !== null) {
                var responseArray = _this.generateArray(response["Appointments"]);
                responseArray.forEach(function (value, index, array) {
                    appointments.push(_this.toAppointment(value));
                });
            }
            return new pet_model_1.Pet(response["Id"], response["Name"], response["OwnerId"], response["ProfileImageUrl"], response["ColorHex"], response["Breed"], response["Sex"], response["Species"], new Date(response["BirthDate"]), appointments);
        }).subscribe(function (result) { _this.pet = result; _this.loading = false; });
    };
    PetsTimelineComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    PetsTimelineComponent.prototype.toAppointment = function (response) {
        var appointmentId = response["Id"];
        var petName = response["PetName"];
        var petId = response["PetId"];
        var state = response["State"];
        var ownerFamilyName = response["OwnerFamilyName"];
        var ownerGivenName = response["OwnerGivenName"];
        var medicalHistory = response["MedicalHistory"];
        var diagnostic = response["Diagnostic"];
        var ownerId = response["OwnerId"];
        var startingTime = new Date(response["StartingTime"]);
        return new appointment_model_1.Appointment(appointmentId, state, petName, petId, ownerFamilyName, ownerGivenName, ownerId, diagnostic, medicalHistory, startingTime);
    };
    return PetsTimelineComponent;
}());
PetsTimelineComponent = __decorate([
    core_1.Component({
        selector: 'appc-pets-timeline',
        templateUrl: './pets-timeline.component.html',
        styleUrls: ['./pets-timeline.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, pets_service_1.PetsService, user_service_1.UserService, router_1.Router])
], PetsTimelineComponent);
exports.PetsTimelineComponent = PetsTimelineComponent;
//# sourceMappingURL=pets-timeline.component.js.map