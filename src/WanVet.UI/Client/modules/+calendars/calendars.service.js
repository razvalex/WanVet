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
var data_service_1 = require("../shared/services/data.service");
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
//# sourceMappingURL=calendars.service.js.map