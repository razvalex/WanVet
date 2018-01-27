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
var forms_1 = require("@angular/forms");
var pets_service_1 = require("../pets.service");
var pets_add_model_1 = require("./pets-add.model");
var user_service_1 = require("../../shared/services/user.service");
var router_1 = require("@angular/router");
var notification_service_1 = require("../../shared/services/notification.service");
var PetsAddComponent = (function () {
    function PetsAddComponent(fb, petsService, userService, notificationService, router) {
        this.fb = fb;
        this.petsService = petsService;
        this.userService = userService;
        this.notificationService = notificationService;
        this.router = router;
        this.storage = localStorage;
        this.myDatePickerOptions = {
            dateFormat: 'mm-dd-yyyy',
        };
    }
    PetsAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) { _this.userService.setCurrentUser(user); });
        this.petForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            breed: ['', [forms_1.Validators.required]],
            sex: 'male',
            species: 'cat',
            colorHex: ['', []],
            birthDate: ['', [forms_1.Validators.required]],
            profileImageUrl: ['', [forms_1.Validators.required]]
        });
    };
    PetsAddComponent.prototype.getHeaders = function () {
        var tokenValue = 'Bearer ' + this.retrieve("authorizationData");
        return ([{ header: 'Accept', value: 'application/json' },
            { header: 'Authorization', value: tokenValue }]);
    };
    ;
    PetsAddComponent.prototype.retrieve = function (key) {
        var item = this.storage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }
        return '';
    };
    PetsAddComponent.prototype.onSubmit = function () {
        var data = this.petForm.value;
        var currentUser = this.userService.currentUser;
        var petAddFormModel = new pets_add_model_1.PetAddFormModel(data.name, data.species, data.sex, data.breed, data.colorHex, currentUser.id, currentUser.email, data.profileImageUrl, data.birthDate.formatted);
        this.petsService.create(petAddFormModel);
        console.log('Submitted: ' + JSON.stringify(petAddFormModel));
        this.notificationService.success('We successfully received your request to add a new pet.');
        this.router.navigate(['/pets']);
    };
    PetsAddComponent.prototype.onColorPickerChanged = function ($event) {
        this.petForm.patchValue({
            colorHex: $event
        });
    };
    PetsAddComponent.prototype.profileImageUploaded = function ($event) {
        this.petForm.patchValue({
            profileImageUrl: $event.serverResponse._body
        });
    };
    PetsAddComponent.prototype.profileImageRemoved = function ($event) {
        this.petForm.patchValue({
            profileImageUrl: ''
        });
    };
    return PetsAddComponent;
}());
PetsAddComponent = __decorate([
    core_1.Component({
        selector: 'appc-pets-add',
        templateUrl: './pets-add.component.html',
        styleUrls: ['./pets-add.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, pets_service_1.PetsService, user_service_1.UserService,
        notification_service_1.NotificationService, router_1.Router])
], PetsAddComponent);
exports.PetsAddComponent = PetsAddComponent;
//# sourceMappingURL=pets-add.component.js.map