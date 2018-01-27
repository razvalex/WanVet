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
var appointments_manage_model_1 = require("./appointments-manage.model");
var appointment_model_1 = require("../appointment.model");
var appointments_service_1 = require("../appointments.service");
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
        templateUrl: './appointments-manage.component.html',
        styleUrls: ['./appointments-manage.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService,
        calendars_service_1.CalendarsService,
        notification_service_1.NotificationService,
        appointments_service_1.AppointmentsService, router_1.Router])
], AppointmentsManageComponent);
exports.AppointmentsManageComponent = AppointmentsManageComponent;
//# sourceMappingURL=appointments-manage.component.js.map