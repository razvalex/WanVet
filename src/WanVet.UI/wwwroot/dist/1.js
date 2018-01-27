webpackJsonp([1],{

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var shared_module_1 = __webpack_require__(77);
var pets_component_1 = __webpack_require__(269);
var pets_home_component_1 = __webpack_require__(266);
var pets_add_component_1 = __webpack_require__(265);
var pets_view_component_1 = __webpack_require__(268);
var pets_timeline_component_1 = __webpack_require__(267);
var pets_service_1 = __webpack_require__(230);
var pets_routes_1 = __webpack_require__(385);
var PetsModule = (function () {
    function PetsModule() {
    }
    return PetsModule;
}());
PetsModule = __decorate([
    core_1.NgModule({
        imports: [pets_routes_1.InternalRouterModule, shared_module_1.SharedModule],
        declarations: [
            pets_component_1.PetsComponent,
            pets_home_component_1.PetsHomeComponent,
            pets_add_component_1.PetsAddComponent,
            pets_view_component_1.PetsViewComponent,
            pets_timeline_component_1.PetsTimelineComponent
        ],
        providers: [pets_service_1.PetsService]
    })
], PetsModule);
exports.PetsModule = PetsModule;


/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var data_service_1 = __webpack_require__(28);
var PetsService = (function () {
    function PetsService(dataService) {
        this.dataService = dataService;
        this.petsApiUrl = 'api/pets/';
    }
    PetsService.prototype.create = function (petAddFormModel) {
        this.dataService.post(this.petsApiUrl, petAddFormModel, {})
            .map(function (response) { return true; }).subscribe(function (response) { });
    };
    PetsService.prototype.get = function (id) {
        return this.dataService.get(this.petsApiUrl, { id: id });
    };
    return PetsService;
}());
PetsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], PetsService);
exports.PetsService = PetsService;


/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(4);
var pets_service_1 = __webpack_require__(230);
var pets_add_model_1 = __webpack_require__(384);
var user_service_1 = __webpack_require__(6);
var router_1 = __webpack_require__(3);
var notification_service_1 = __webpack_require__(76);
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
        template: __webpack_require__(361),
        styles: [__webpack_require__(371)]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, pets_service_1.PetsService, user_service_1.UserService,
        notification_service_1.NotificationService, router_1.Router])
], PetsAddComponent);
exports.PetsAddComponent = PetsAddComponent;


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var PetsHomeComponent = (function () {
    function PetsHomeComponent() {
    }
    PetsHomeComponent.prototype.ngOnInit = function () {
        this.cards = [
            { route: 'add', title: 'Add', description: 'Add a new pet', icon: 'fa fa-plus', bg: 'bg-aqua' },
            { route: 'view', title: 'View', description: 'View existing pets', icon: 'fa fa-eye', bg: 'bg-green' }
        ];
    };
    return PetsHomeComponent;
}());
PetsHomeComponent = __decorate([
    core_1.Component({
        selector: 'appc-pets-home',
        template: __webpack_require__(362),
        styles: [__webpack_require__(372)]
    }),
    __metadata("design:paramtypes", [])
], PetsHomeComponent);
exports.PetsHomeComponent = PetsHomeComponent;


/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var pets_service_1 = __webpack_require__(230);
var user_service_1 = __webpack_require__(6);
var router_1 = __webpack_require__(3);
var pet_model_1 = __webpack_require__(383);
var appointment_model_1 = __webpack_require__(382);
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
        template: __webpack_require__(363),
        styles: [__webpack_require__(373)]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, pets_service_1.PetsService, user_service_1.UserService, router_1.Router])
], PetsTimelineComponent);
exports.PetsTimelineComponent = PetsTimelineComponent;


/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var pets_service_1 = __webpack_require__(230);
var user_service_1 = __webpack_require__(6);
var router_1 = __webpack_require__(3);
var PetsViewComponent = (function () {
    function PetsViewComponent(petsService, userService, router) {
        this.petsService = petsService;
        this.userService = userService;
        this.router = router;
    }
    PetsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.userService.setCurrentUser(user);
            if (user !== null) {
                _this.pets = user.pets;
            }
        });
    };
    return PetsViewComponent;
}());
PetsViewComponent = __decorate([
    core_1.Component({
        selector: 'appc-pets-view',
        template: __webpack_require__(364),
        styles: [__webpack_require__(374)]
    }),
    __metadata("design:paramtypes", [pets_service_1.PetsService, user_service_1.UserService, router_1.Router])
], PetsViewComponent);
exports.PetsViewComponent = PetsViewComponent;


/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var PetsComponent = (function () {
    function PetsComponent() {
    }
    PetsComponent.prototype.ngOnInit = function () {
    };
    return PetsComponent;
}());
PetsComponent = __decorate([
    core_1.Component({
        selector: 'appc-pets',
        template: __webpack_require__(365),
        styles: [__webpack_require__(375)]
    }),
    __metadata("design:paramtypes", [])
], PetsComponent);
exports.PetsComponent = PetsComponent;


/***/ },

/***/ 361:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"box box-success\">\r\n            <div class=\"box-header with-border\">\r\n                <h3 class=\"box-title\">Add Pet</h3>\r\n            </div>\r\n            <!-- /.box-header -->\r\n            <!-- form start -->\r\n            <form novalidate\r\n                  (ngSubmit)=\"onSubmit()\"\r\n                  [formGroup]=\"petForm\">\r\n                <div class=\"box-body\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-xs-12\">\r\n                            <image-upload url=\"/api/files\"\r\n                                          [max]=\"1\"\r\n                                          [headers]=\"getHeaders()\"\r\n                                          [buttonCaption]=\"'Select Profile Image!'\"\r\n                                          [dropBoxMessage]=\"'Drop your image here!'\"\r\n                                          [extensions]=\"['jpg','png','gif']\"\r\n                                          (onFileUploadFinish)=\"profileImageUploaded($event)\"\r\n                                          (onRemove)=\"profileImageRemoved($event)\"></image-upload>\r\n                            <span class=\"help-block\" *ngIf=\"(petForm.get('profileImageUrl').touched ||\r\n                                                         petForm.get('profileImageUrl').dirty) &&\r\n                                                         petForm.get('profileImageUrl').errors\">\r\n                                <span *ngIf=\"petForm.get('profileImageUrl').errors.required\">\r\n                                    Please add pet's profile image.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-3\">\r\n                            <label>Birth Date</label>\r\n                            <my-date-picker [options]=\"myDatePickerOptions\"\r\n                                            formControlName=\"birthDate\"></my-date-picker>\r\n                            <span class=\"help-block\" *ngIf=\"(petForm.get('birthDate').touched ||\r\n                                                         petForm.get('birthDate').dirty) &&\r\n                                                         petForm.get('birthDate').errors\">\r\n                                <span *ngIf=\"petForm.get('birthDate').errors.required\">\r\n                                    Please enter pet's birth date.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\"\r\n                         [ngClass]=\"{'has-error': (petForm.get('name').touched ||\r\n                                              petForm.get('name').dirty) &&\r\n                                              !petForm.get('name').valid }\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"nameId\">Name</label>\r\n                            <input class=\"form-control\"\r\n                                   id=\"nameId\"\r\n                                   type=\"text\"\r\n                                   placeholder=\"(Required)\"\r\n                                   formControlName=\"name\" />\r\n                            <span class=\"help-block\" *ngIf=\"(petForm.get('name').touched ||\r\n                                                         petForm.get('name').dirty) &&\r\n                                                         petForm.get('name').errors\">\r\n                                <span *ngIf=\"petForm.get('name').errors.required\">\r\n                                    Please enter a pet name.\r\n                                </span>\r\n                                <span *ngIf=\"petForm.get('name').errors.minlength\">\r\n                                    Pet name must be longer than 3 characters.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"sexRadios\">Species</label>\r\n                            <div class=\"radio\">\r\n                                <label>\r\n                                    <input type=\"radio\" formControlName=\"species\" id=\"speciesRadios\" value=\"cat\" checked=\"\">\r\n                                    Cat\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"radio\">\r\n                                <label>\r\n                                    <input type=\"radio\" formControlName=\"species\" id=\"speciesRadios\" value=\"dog\" checked=\"\">\r\n                                    Dog\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"sexRadios\">Sex</label>\r\n                            <div class=\"radio\">\r\n                                <label>\r\n                                    <input type=\"radio\" formControlName=\"sex\" id=\"sexRadios\" value=\"male\" checked=\"\">\r\n                                    Male\r\n                                </label>\r\n                            </div>\r\n                            <div class=\"radio\">\r\n                                <label>\r\n                                    <input type=\"radio\" formControlName=\"sex\" id=\"sexRadios\" value=\"female\" checked=\"\">\r\n                                    Female\r\n                                </label>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\"\r\n                         [ngClass]=\"{'has-error': (petForm.get('breed').touched ||\r\n                                              petForm.get('breed').dirty) &&\r\n                                              !petForm.get('breed').valid }\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"breedId\">Breed</label>\r\n                            <input class=\"form-control\"\r\n                                   id=\"breedId\"\r\n                                   type=\"text\"\r\n                                   placeholder=\"(Required)\"\r\n                                   formControlName=\"breed\" />\r\n                            <span class=\"help-block\" *ngIf=\"(petForm.get('breed').touched ||\r\n                                                         petForm.get('breed').dirty) &&\r\n                                                         petForm.get('breed').errors\">\r\n                                <span *ngIf=\"petForm.get('breed').errors.required\">\r\n                                    Please enter pet's breed.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-xs-4 col-sm-9\">\r\n                            <label for=\"colorId\">Color</label>\r\n                            <input type=\"text\" [(colorPicker)]=\"color\" (colorPickerChange)=\"onColorPickerChanged($event)\" [style.background]=\"color\" class=\"form-control\" formControlName=\"colorHex\" id=\"colorId\" />\r\n                        </div>\r\n                    </div>\r\n         \r\n                </div>\r\n                <!-- /.box-body -->\r\n\r\n                <div class=\"box-footer\">\r\n                    <div class=\"col-xs-12\">\r\n                        <button class=\"btn btn-success\"\r\n                                type=\"submit\"\r\n                                [disabled]=\"!petForm.valid\">\r\n                            Submit\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 362:
/***/ function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-sm-4\" *ngFor=\"let card of cards\">\r\n        <div class=\"info-box\">\r\n            <a routerLink=\"{{card.route}}\">\r\n                <span class=\"info-box-icon {{card.bg}}\">\r\n                    <i class=\"{{card.icon}}\"></i>\r\n                </span>\r\n            </a>\r\n            <div class=\"info-box-content\">\r\n                <span class=\"info-box-text\">{{card.title}}</span>\r\n                <span class=\"info-box-number\">{{card.description}}</span>\r\n\r\n            </div>\r\n            <!-- /.info-box-content -->\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 363:
/***/ function(module, exports) {

module.exports = "<div class=\"box box-default\">\r\n    <div class=\"box-body\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-12\">\r\n                <ul class=\"users-list clearfix\" *ngIf=\"!loading\">\r\n                    <li>\r\n                        <img src=\"{{pet.profileImageUrl}}\" alt=\"{{pet.name}} Profile Image\">\r\n                        <a class=\"users-list-name\">{{pet.name}}</a>\r\n                        <span class=\"users-list-date\">{{pet.species}}, {{pet.breed}}, {{pet.sex}}</span>\r\n                    </li>\r\n                </ul>\r\n                <ul class=\"timeline\" *ngIf=\"!loading\">\r\n                    <li *ngFor=\"let appointment of pet.appointments\">\r\n                        <i class=\"fa fa-check-circle-o bg-green\" *ngIf=\"appointment.medicalHistory\"></i>\r\n\r\n                        <i class=\"fa fa-info-circle bg-green\" *ngIf=\"!appointment.medicalHistory\"></i>\r\n\r\n                        <div class=\"timeline-item\">\r\n                            <span class=\"time\"><i class=\"fa fa-clock-o\"></i> {{ appointment.startingTime | date :'medium' }} </span>\r\n\r\n                            <h3 class=\"timeline-header\" *ngIf=\"appointment.medicalHistory\">\r\n                                Appointment completed. Diagnostic and medical history record updated.\r\n                            </h3>\r\n\r\n                            <h3 class=\"timeline-header\" *ngIf=\"!appointment.medicalHistory\">\r\n                                We are looking forward to meeting you and your beloved pet.\r\n                            </h3>\r\n\r\n                            <div class=\"timeline-body\" *ngIf=\"appointment.medicalHistory\">\r\n                                {{appointment.diagnostic}}\r\n                                <br />\r\n                                {{appointment.medicalHistory}}\r\n                            </div>\r\n                        </div>\r\n                    </li>\r\n                    <li>\r\n                        <i class=\"fa fa-clock-o bg-gray\"></i>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 364:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"box box-success\">\r\n            <div class=\"box-header with-border\">\r\n                <h3 class=\"box-title\">Latest Pets</h3>\r\n            </div>\r\n            <!-- /.box-header -->\r\n            <div class=\"box-body no-padding\">\r\n                <ul class=\"users-list clearfix\">\r\n                    <li *ngFor=\"let pet of pets\">\r\n                        <img src=\"{{pet.profileImageUrl}}\" alt=\"{{pet.name}} Profile Image\">\r\n                        <a class=\"users-list-name\" routerLink=\"timeline/{{pet.id}}\">{{pet.name}}</a>\r\n                        <span class=\"users-list-date\">{{pet.species}}, {{pet.breed}}, {{pet.sex}}</span>\r\n                    </li>\r\n                </ul>\r\n                <!-- /.users-list -->\r\n            </div>\r\n            <!-- /.box-body -->\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 365:
/***/ function(module, exports) {

module.exports = "<router-outlet></router-outlet>";

/***/ },

/***/ 371:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 372:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 373:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 374:
/***/ function(module, exports) {

module.exports = ".users-list > li img {\n  max-width: 65%; }\n"

/***/ },

/***/ 375:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 382:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Appointment = (function () {
    function Appointment(id, state, petName, petId, ownerFamilyName, ownerGivenName, ownerId, diagnostic, medicalHistory, startingTime) {
        this.id = id;
        this.state = state;
        this.petName = petName;
        this.petId = petId;
        this.ownerFamilyName = ownerFamilyName;
        this.ownerGivenName = ownerGivenName;
        this.ownerId = ownerId;
        this.diagnostic = diagnostic;
        this.medicalHistory = medicalHistory;
        this.startingTime = startingTime;
    }
    return Appointment;
}());
exports.Appointment = Appointment;


/***/ },

/***/ 383:
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ 384:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PetAddFormModel = (function () {
    function PetAddFormModel(name, species, sex, breed, colorHex, ownerId, ownerEmail, profileImageUrl, birthDate) {
        this.name = name;
        this.species = species;
        this.sex = sex;
        this.breed = breed;
        this.colorHex = colorHex;
        this.ownerId = ownerId;
        this.ownerEmail = ownerEmail;
        this.profileImageUrl = profileImageUrl;
        this.birthDate = birthDate;
    }
    return PetAddFormModel;
}());
exports.PetAddFormModel = PetAddFormModel;


/***/ },

/***/ 385:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(3);
var pets_component_1 = __webpack_require__(269);
var pets_home_component_1 = __webpack_require__(266);
var pets_add_component_1 = __webpack_require__(265);
var pets_view_component_1 = __webpack_require__(268);
var pets_timeline_component_1 = __webpack_require__(267);
var routes = [
    {
        path: '', component: pets_component_1.PetsComponent, children: [
            { path: '', component: pets_home_component_1.PetsHomeComponent },
            { path: 'add', component: pets_add_component_1.PetsAddComponent },
            { path: 'view', component: pets_view_component_1.PetsViewComponent },
            { path: 'view/timeline/:id', component: pets_timeline_component_1.PetsTimelineComponent }
        ]
    }
];
exports.InternalRouterModule = router_1.RouterModule.forChild(routes);


/***/ }

});
//# sourceMappingURL=1.js.map