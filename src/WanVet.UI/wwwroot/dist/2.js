webpackJsonp([2],{

/***/ 226:
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
var appointments_routes_1 = __webpack_require__(379);
var appointments_component_1 = __webpack_require__(262);
var appointments_home_component_1 = __webpack_require__(260);
var appointments_add_component_1 = __webpack_require__(259);
var appointments_service_1 = __webpack_require__(263);
var calendars_service_1 = __webpack_require__(229);
var appointments_manage_component_1 = __webpack_require__(261);
var AppointmentsModule = (function () {
    function AppointmentsModule() {
    }
    return AppointmentsModule;
}());
AppointmentsModule = __decorate([
    core_1.NgModule({
        imports: [appointments_routes_1.InternalRouterModule, shared_module_1.SharedModule],
        declarations: [
            appointments_component_1.AppointmentsComponent,
            appointments_home_component_1.AppointmentsHomeComponent,
            appointments_add_component_1.AppointmentsAddComponent,
            appointments_manage_component_1.AppointmentsManageComponent
        ],
        providers: [appointments_service_1.AppointmentsService, calendars_service_1.CalendarsService]
    })
], AppointmentsModule);
exports.AppointmentsModule = AppointmentsModule;


/***/ },

/***/ 229:
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
var CalendarsService = (function () {
    function CalendarsService(dataService) {
        this.dataService = dataService;
        this.calendarsApiUrl = 'api/calendars/';
    }
    CalendarsService.prototype.get = function (id) {
        return this.dataService.get(this.calendarsApiUrl, { id: id });
    };
    CalendarsService.prototype.getFreeSpots = function (id, date) {
        return this.dataService.get(this.calendarsApiUrl + 'freespots', { id: id, date: date });
    };
    CalendarsService.prototype.checkappointmentdisponibility = function (appointmentAddFormModel) {
        this.dataService.post(this.calendarsApiUrl + 'checkappointmentdisponibility', appointmentAddFormModel, {})
            .map(function (response) { return true; }).subscribe(function (response) { });
    };
    CalendarsService.prototype.getAppointments = function (id, startDate, endDate) {
        return this.dataService.get(this.calendarsApiUrl + 'appointments', { id: id, startDate: startDate, endDate: endDate });
    };
    CalendarsService.prototype.getOpenAppointments = function (id, term) {
        return this.dataService.get(this.calendarsApiUrl + 'openappointments', { id: id, term: term });
    };
    return CalendarsService;
}());
CalendarsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], CalendarsService);
exports.CalendarsService = CalendarsService;


/***/ },

/***/ 259:
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
var user_service_1 = __webpack_require__(6);
var router_1 = __webpack_require__(3);
var notification_service_1 = __webpack_require__(76);
var ng2_select_1 = __webpack_require__(86);
var select_option_1 = __webpack_require__(270);
var calendars_service_1 = __webpack_require__(229);
var appointments_add_model_1 = __webpack_require__(377);
var AppointmentsAddComponent = (function () {
    function AppointmentsAddComponent(fb, userService, calendarsService, notificationService, router) {
        this.fb = fb;
        this.userService = userService;
        this.calendarsService = calendarsService;
        this.notificationService = notificationService;
        this.router = router;
        this.myDatePickerOptions = {
            dateFormat: 'mm-dd-yyyy',
        };
    }
    AppointmentsAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) { _this.userService.setCurrentUser(user); });
        this.doctorsInput.items = [];
        this.startingTimeInput.items = [];
        this.pets = this.userService.currentUser.pets.map(function (value, index, array) {
            return { id: value.id, text: value.name };
        });
        this.appointmentForm = this.fb.group({
            date: ['', [forms_1.Validators.required]],
            calendarId: ['', [forms_1.Validators.required]],
            petId: ['', [forms_1.Validators.required]],
            startingTime: ['', [forms_1.Validators.required]]
        });
    };
    AppointmentsAddComponent.prototype.onSubmit = function () {
        var data = this.appointmentForm.value;
        var currentUser = this.userService.currentUser;
        var selectedPet = this.pets.filter(function (x) { return x.id === data.petId; })[0];
        var appointmentAddFormModel = new appointments_add_model_1.AppointmentAddFormModel(data.calendarId, data.petId, selectedPet.text, currentUser.id, currentUser.familyName, currentUser.givenName, data.date.formatted, data.startingTime.id);
        this.calendarsService.checkappointmentdisponibility(appointmentAddFormModel);
        console.log('Submitted: ' + JSON.stringify(appointmentAddFormModel));
        this.notificationService.success('We successfully received your request to add a new appointment.');
        this.router.navigate(['/pets']);
    };
    AppointmentsAddComponent.prototype.selectedDoctor = function ($event) {
        this.appointmentForm.patchValue({
            calendarId: $event.id
        });
    };
    AppointmentsAddComponent.prototype.removedDoctor = function ($event) {
        this.appointmentForm.patchValue({
            calendarId: ''
        });
    };
    AppointmentsAddComponent.prototype.typedDoctor = function ($event) {
        var _this = this;
        this.userService.getDoctors($event)
            .subscribe(function (results) {
            _this.doctorsInput.items = results.map(function (result) {
                return new select_option_1.SelectOption(result.calendarId, result.givenName + ' ' + result.familyName);
            });
            _this.doctorsInput.open();
        });
    };
    AppointmentsAddComponent.prototype.selectedPet = function ($event) {
        this.appointmentForm.patchValue({
            petId: $event.id
        });
    };
    AppointmentsAddComponent.prototype.removedPet = function ($event) {
        this.appointmentForm.patchValue({
            petId: ''
        });
    };
    AppointmentsAddComponent.prototype.selectedStartingTime = function ($event) {
        this.appointmentForm.patchValue({
            startingTime: $event
        });
    };
    AppointmentsAddComponent.prototype.removedStartingTime = function ($event) {
        this.appointmentForm.patchValue({
            startingTime: ''
        });
    };
    AppointmentsAddComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    AppointmentsAddComponent.prototype.typedStartingTime = function ($event) {
        var _this = this;
        this.calendarsService.getFreeSpots(this.appointmentForm.controls.calendarId.value, this.appointmentForm.controls.date.value.formatted)
            .map(function (response) {
            return _this.generateArray(response);
        })
            .subscribe(function (results) {
            _this.startingTimeInput.items = results;
            _this.startingTimeInput.open();
        });
    };
    return AppointmentsAddComponent;
}());
__decorate([
    core_1.ViewChild('doctorsInput'),
    __metadata("design:type", ng2_select_1.SelectComponent)
], AppointmentsAddComponent.prototype, "doctorsInput", void 0);
__decorate([
    core_1.ViewChild('startingTimeInput'),
    __metadata("design:type", ng2_select_1.SelectComponent)
], AppointmentsAddComponent.prototype, "startingTimeInput", void 0);
AppointmentsAddComponent = __decorate([
    core_1.Component({
        selector: 'appc-appointments-add',
        template: __webpack_require__(356),
        styles: [__webpack_require__(366)]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService,
        calendars_service_1.CalendarsService,
        notification_service_1.NotificationService, router_1.Router])
], AppointmentsAddComponent);
exports.AppointmentsAddComponent = AppointmentsAddComponent;


/***/ },

/***/ 260:
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
var AppointmentsHomeComponent = (function () {
    function AppointmentsHomeComponent() {
    }
    AppointmentsHomeComponent.prototype.ngOnInit = function () {
        this.cards = [
            { route: 'add', title: 'Add', description: 'Add a new appointment', icon: 'fa fa-plus', bg: 'bg-aqua' }
        ];
    };
    return AppointmentsHomeComponent;
}());
AppointmentsHomeComponent = __decorate([
    core_1.Component({
        selector: 'appc-appointments-home',
        template: __webpack_require__(357),
        styles: [__webpack_require__(367)]
    }),
    __metadata("design:paramtypes", [])
], AppointmentsHomeComponent);
exports.AppointmentsHomeComponent = AppointmentsHomeComponent;


/***/ },

/***/ 261:
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
var user_service_1 = __webpack_require__(6);
var router_1 = __webpack_require__(3);
var notification_service_1 = __webpack_require__(76);
var ng2_select_1 = __webpack_require__(86);
var select_option_1 = __webpack_require__(270);
var calendars_service_1 = __webpack_require__(229);
var appointments_manage_model_1 = __webpack_require__(378);
var appointment_model_1 = __webpack_require__(376);
var appointments_service_1 = __webpack_require__(263);
var AppointmentsManageComponent = (function () {
    function AppointmentsManageComponent(fb, userService, calendarsService, notificationService, appointmentsService, router) {
        this.fb = fb;
        this.userService = userService;
        this.calendarsService = calendarsService;
        this.notificationService = notificationService;
        this.appointmentsService = appointmentsService;
        this.router = router;
    }
    AppointmentsManageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) { _this.userService.setCurrentUser(user); });
        this.appointmentManageForm = this.fb.group({
            appointmentId: ['', [forms_1.Validators.required]],
            diagnostic: ['', [forms_1.Validators.required]],
            medicalHistory: ['', [forms_1.Validators.required]]
        });
    };
    AppointmentsManageComponent.prototype.onSubmit = function () {
        var data = this.appointmentManageForm.value;
        var currentUser = this.userService.currentUser;
        var appointmentManageFormModel = new appointments_manage_model_1.AppointmentManageFormModel(data.appointmentId, data.diagnostic, data.medicalHistory);
        this.appointmentsService.finalize(appointmentManageFormModel);
        this.notificationService.success('We successfully received your request to finalize current appointment.');
        this.router.navigate(['/calendars']);
    };
    AppointmentsManageComponent.prototype.selectedAppointment = function ($event) {
        this.appointmentManageForm.patchValue({
            appointmentId: $event.id
        });
    };
    AppointmentsManageComponent.prototype.removedAppointment = function ($event) {
        this.appointmentManageForm.patchValue({
            appointmentId: ''
        });
    };
    AppointmentsManageComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    AppointmentsManageComponent.prototype.toAppointment = function (response) {
        var appointmentId = response["Id"];
        var petName = response["PetName"];
        var petId = response["PetId"];
        var state = response["State"];
        var ownerFamilyName = response["OwnerFamilyName"];
        var ownerGivenName = response["OwnerGivenName"];
        var ownerId = response["OwnerId"];
        var startingTime = new Date(response["StartingTime"]);
        return new appointment_model_1.Appointment(appointmentId, state, petName, petId, ownerFamilyName, ownerGivenName, ownerId, startingTime);
    };
    AppointmentsManageComponent.prototype.typedAppointment = function ($event) {
        var _this = this;
        this.calendarsService.getOpenAppointments(this.userService.currentUser.calendarId, $event)
            .map(function (response) {
            var appointments = new Array();
            if (response !== null) {
                var responseArray = _this.generateArray(response);
                responseArray.forEach(function (value, index, array) {
                    appointments.push(_this.toAppointment(value));
                });
            }
            return appointments;
        })
            .subscribe(function (results) {
            _this.appoitmentsInput.items = results.map(function (result) {
                return new select_option_1.SelectOption(result.id, result.startingTime.toLocaleString() + '-' + result.petName + ' (' + result.ownerGivenName + ' ' + result.ownerFamilyName + ')');
            });
            _this.appoitmentsInput.open();
        });
    };
    return AppointmentsManageComponent;
}());
__decorate([
    core_1.ViewChild('appoitmentsInput'),
    __metadata("design:type", ng2_select_1.SelectComponent)
], AppointmentsManageComponent.prototype, "appoitmentsInput", void 0);
AppointmentsManageComponent = __decorate([
    core_1.Component({
        selector: 'appc-appointments-manage',
        template: __webpack_require__(358),
        styles: [__webpack_require__(368)]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService,
        calendars_service_1.CalendarsService,
        notification_service_1.NotificationService,
        appointments_service_1.AppointmentsService, router_1.Router])
], AppointmentsManageComponent);
exports.AppointmentsManageComponent = AppointmentsManageComponent;


/***/ },

/***/ 262:
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
var AppointmentsComponent = (function () {
    function AppointmentsComponent() {
    }
    AppointmentsComponent.prototype.ngOnInit = function () {
    };
    return AppointmentsComponent;
}());
AppointmentsComponent = __decorate([
    core_1.Component({
        selector: 'appc--appointments',
        template: __webpack_require__(359),
        styles: [__webpack_require__(369)]
    }),
    __metadata("design:paramtypes", [])
], AppointmentsComponent);
exports.AppointmentsComponent = AppointmentsComponent;


/***/ },

/***/ 263:
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
var AppointmentsService = (function () {
    function AppointmentsService(dataService) {
        this.dataService = dataService;
        this.appointmentsApiUrl = 'api/appointments/';
    }
    AppointmentsService.prototype.finalize = function (appointmentManageFormModel) {
        this.dataService.post(this.appointmentsApiUrl, appointmentManageFormModel, {})
            .map(function (response) { return true; }).subscribe(function (response) { });
    };
    return AppointmentsService;
}());
AppointmentsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [data_service_1.DataService])
], AppointmentsService);
exports.AppointmentsService = AppointmentsService;


/***/ },

/***/ 270:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectOption = (function () {
    function SelectOption(id, text) {
        this.id = id;
        this.text = text;
    }
    return SelectOption;
}());
exports.SelectOption = SelectOption;


/***/ },

/***/ 356:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"box box-success\">\r\n            <div class=\"box-header with-border\">\r\n                <h3 class=\"box-title\">Add Appointment</h3>\r\n            </div>\r\n            <!-- /.box-header -->\r\n            <!-- form start -->\r\n            <form novalidate\r\n                  (ngSubmit)=\"onSubmit()\"\r\n                  [formGroup]=\"appointmentForm\">\r\n                <div class=\"box-body\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-6\">\r\n                            <label>Pet</label>\r\n                            <ng-select [items]=\"pets\" [allowClear]=\"true\"\r\n                                       (selected)=\"selectedPet($event)\"\r\n                                       (removed)=\"removedPet($event)\"\r\n                                       placeholder=\"No pet selected\">\r\n                            </ng-select>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentForm.get('petId').touched ||\r\n                                                         appointmentForm.get('petId').dirty) &&\r\n                                                         appointmentForm.get('petId').errors\">\r\n                                <span *ngIf=\"appointmentForm.get('petId').errors.required\">\r\n                                    Please select a pet.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-9\">\r\n                            <label>Date</label>\r\n                            <my-date-picker [options]=\"myDatePickerOptions\"\r\n                                            formControlName=\"date\"></my-date-picker>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentForm.get('date').touched ||\r\n                                                         appointmentForm.get('date').dirty) &&\r\n                                                         appointmentForm.get('date').errors\">\r\n                                <span *ngIf=\"appointmentForm.get('date').errors.required\">\r\n                                    Please enter appointment's date.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-9\">\r\n                            <label>Doctor</label>\r\n                            <ng-select #doctorsInput [allowClear]=\"true\"\r\n                                       (selected)=\"selectedDoctor($event)\"\r\n                                       (removed)=\"removedDoctor($event)\"\r\n                                       (typed)=\"typedDoctor($event)\"\r\n                                       placeholder=\"No doctor selected\"\r\n                                       >\r\n                            </ng-select>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentForm.get('calendarId').touched ||\r\n                                                         appointmentForm.get('calendarId').dirty) &&\r\n                                                         appointmentForm.get('calendarId').errors\">\r\n                                <span *ngIf=\"appointmentForm.get('calendarId').errors.required\">\r\n                                    Please select a doctor.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-6\">\r\n                            <label>Starting Time</label>\r\n                            <ng-select #startingTimeInput [allowClear]=\"true\"\r\n                                       (selected)=\"selectedStartingTime($event)\"\r\n                                       (removed)=\"removedStartingTime($event)\"\r\n                                       (typed)=\"typedStartingTime($event)\"\r\n                                       placeholder=\"No starting time selected\">\r\n                            </ng-select>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentForm.get('startingTime').touched ||\r\n                                                         appointmentForm.get('startingTime').dirty) &&\r\n                                                         appointmentForm.get('startingTime').errors\">\r\n                                <span *ngIf=\"appointmentForm.get('startingTime').errors.required\">\r\n                                    Please select a starting time.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n                        <!-- /.box-body -->\r\n\r\n                        <div class=\"box-footer\">\r\n                            <div class=\"col-xs-12\">\r\n                                <button class=\"btn btn-success\"\r\n                                        type=\"submit\"\r\n                                        [disabled]=\"!appointmentForm.valid\">\r\n                                    Submit\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n</form>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 357:
/***/ function(module, exports) {

module.exports = "\r\n<div class=\"row\">\r\n    <div class=\"col-sm-4\" *ngFor=\"let card of cards\">\r\n        <div class=\"info-box\">\r\n            <a routerLink=\"{{card.route}}\">\r\n                <span class=\"info-box-icon {{card.bg}}\">\r\n                    <i class=\"{{card.icon}}\"></i>\r\n                </span>\r\n            </a>\r\n            <div class=\"info-box-content\">\r\n                <span class=\"info-box-text\">{{card.title}}</span>\r\n                <span class=\"info-box-number\">{{card.description}}</span>\r\n\r\n            </div>\r\n            <!-- /.info-box-content -->\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 358:
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"box box-success\">\r\n            <div class=\"box-header with-border\">\r\n                <h3 class=\"box-title\">Manage Appointment</h3>\r\n            </div>\r\n            <!-- /.box-header -->\r\n            <!-- form start -->\r\n            <form novalidate\r\n                  (ngSubmit)=\"onSubmit()\"\r\n                  [formGroup]=\"appointmentManageForm\">\r\n                <div class=\"box-body\">\r\n\r\n                    <div class=\"form-group\">\r\n                        <div class=\"col-sm-6\">\r\n                            <label>Appointment</label>\r\n                            <ng-select #appoitmentsInput [allowClear]=\"true\"\r\n                                       (selected)=\"selectedAppointment($event)\"\r\n                                       (removed)=\"removedAppointment($event)\"\r\n                                       (typed)=\"typedAppointment($event)\"\r\n                                       placeholder=\"No appointment selected\">\r\n                            </ng-select>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentManageForm.get('appointmentId').touched ||\r\n                                                         appointmentManageForm.get('appointmentId').dirty) &&\r\n                                                         appointmentManageForm.get('appointmentId').errors\">\r\n                                <span *ngIf=\"appointmentForm.get('appointmentId').errors.required\">\r\n                                    Please select an appointment.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\"\r\n                         [ngClass]=\"{'has-error': (appointmentManageForm.get('diagnostic').touched ||\r\n                                              appointmentManageForm.get('diagnostic').dirty) &&\r\n                                              !appointmentManageForm.get('diagnostic').valid }\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"diagnosticId\">Diagnostic</label>\r\n                            <textarea class=\"form-control\" id=\"diagnosticId\"\r\n                                      placeholder=\"(Required)\"\r\n                                      formControlName=\"diagnostic\"></textarea>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentManageForm.get('diagnostic').touched ||\r\n                                                         appointmentManageForm.get('diagnostic').dirty) &&\r\n                                                         appointmentManageForm.get('diagnostic').errors\">\r\n                                <span *ngIf=\"appointmentManageForm.get('diagnostic').errors.required\">\r\n                                    Please enter at least one diagnostic.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"form-group\"\r\n                         [ngClass]=\"{'has-error': (appointmentManageForm.get('medicalHistory').touched ||\r\n                                              appointmentManageForm.get('medicalHistory').dirty) &&\r\n                                              !appointmentManageForm.get('medicalHistory').valid }\">\r\n                        <div class=\"col-xs-12\">\r\n                            <label for=\"medicalHistoryId\">Medical History</label>\r\n                            <textarea class=\"form-control\" id=\"medicalHistoryId\"\r\n                                      placeholder=\"(Required)\"\r\n                                      formControlName=\"medicalHistory\"></textarea>\r\n                            <span class=\"help-block\" *ngIf=\"(appointmentManageForm.get('medicalHistory').touched ||\r\n                                                         appointmentManageForm.get('medicalHistory').dirty) &&\r\n                                                         appointmentManageForm.get('medicalHistory').errors\">\r\n                                <span *ngIf=\"appointmentManageForm.get('medicalHistory').errors.required\">\r\n                                    Please enter medical history.\r\n                                </span>\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n\r\n\r\n                </div>\r\n                <!-- /.box-body -->\r\n\r\n                <div class=\"box-footer\">\r\n                    <div class=\"col-xs-12\">\r\n                        <button class=\"btn btn-success\"\r\n                                type=\"submit\"\r\n                                [disabled]=\"!appointmentManageForm.valid\">\r\n                            Submit\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },

/***/ 359:
/***/ function(module, exports) {

module.exports = "<router-outlet></router-outlet>";

/***/ },

/***/ 366:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 367:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 368:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 369:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 376:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Appointment = (function () {
    function Appointment(id, state, petName, petId, ownerFamilyName, ownerGivenName, ownerId, startingTime) {
        this.id = id;
        this.state = state;
        this.petName = petName;
        this.petId = petId;
        this.ownerFamilyName = ownerFamilyName;
        this.ownerGivenName = ownerGivenName;
        this.ownerId = ownerId;
        this.startingTime = startingTime;
    }
    return Appointment;
}());
exports.Appointment = Appointment;


/***/ },

/***/ 377:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppointmentAddFormModel = (function () {
    function AppointmentAddFormModel(calendarId, petId, petName, ownerId, ownerFamilyName, ownerGivenName, date, time) {
        this.calendarId = calendarId;
        this.petId = petId;
        this.petName = petName;
        this.ownerId = ownerId;
        this.ownerFamilyName = ownerFamilyName;
        this.ownerGivenName = ownerGivenName;
        this.date = date;
        this.time = time;
    }
    return AppointmentAddFormModel;
}());
exports.AppointmentAddFormModel = AppointmentAddFormModel;


/***/ },

/***/ 378:
/***/ function(module, exports) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppointmentManageFormModel = (function () {
    function AppointmentManageFormModel(appointmentId, diagnostic, medicalHistory) {
        this.appointmentId = appointmentId;
        this.diagnostic = diagnostic;
        this.medicalHistory = medicalHistory;
    }
    return AppointmentManageFormModel;
}());
exports.AppointmentManageFormModel = AppointmentManageFormModel;


/***/ },

/***/ 379:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(3);
var appointments_component_1 = __webpack_require__(262);
var appointments_home_component_1 = __webpack_require__(260);
var appointments_add_component_1 = __webpack_require__(259);
var appointments_manage_component_1 = __webpack_require__(261);
var routes = [
    {
        path: '', component: appointments_component_1.AppointmentsComponent, children: [
            { path: '', component: appointments_home_component_1.AppointmentsHomeComponent },
            { path: 'add', component: appointments_add_component_1.AppointmentsAddComponent },
            { path: 'manage', component: appointments_manage_component_1.AppointmentsManageComponent }
        ]
    }
];
exports.InternalRouterModule = router_1.RouterModule.forChild(routes);


/***/ }

});
//# sourceMappingURL=2.js.map