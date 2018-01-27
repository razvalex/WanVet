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
var user_service_1 = require("../../shared/services/user.service");
var router_1 = require("@angular/router");
var notification_service_1 = require("../../shared/services/notification.service");
var ng2_select_1 = require("ng2-select");
var select_option_1 = require("../../shared/types/select-option");
var calendars_service_1 = require("../../+calendars/calendars.service");
var appointments_add_model_1 = require("./appointments-add.model");
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
        templateUrl: './appointments-add.component.html',
        styleUrls: ['./appointments-add.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService,
        calendars_service_1.CalendarsService,
        notification_service_1.NotificationService, router_1.Router])
], AppointmentsAddComponent);
exports.AppointmentsAddComponent = AppointmentsAddComponent;
//# sourceMappingURL=appointments-add.component.js.map