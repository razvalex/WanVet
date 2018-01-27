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
var user_service_1 = require("../../shared/services/user.service");
var router_1 = require("@angular/router");
var date_fns_1 = require("date-fns");
var calendars_service_1 = require("../calendars.service");
var CalendarsViewComponent = (function () {
    function CalendarsViewComponent(userService, calendarsService, router) {
        this.userService = userService;
        this.calendarsService = calendarsService;
        this.router = router;
        this.view = 'day';
        this.viewDate = new Date();
        this.activeDayIsOpen = false;
    }
    CalendarsViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (user) {
            _this.userService.setCurrentUser(user);
            _this.fetchEvents();
        });
    };
    CalendarsViewComponent.prototype.generateArray = function (obj) {
        return Object.keys(obj).map(function (key) { return obj[key]; });
    };
    CalendarsViewComponent.prototype.fetchEvents = function () {
        var _this = this;
        var getStart = {
            month: date_fns_1.startOfMonth,
            week: date_fns_1.startOfWeek,
            day: date_fns_1.startOfDay
        }[this.view];
        var getEnd = {
            month: date_fns_1.endOfMonth,
            week: date_fns_1.endOfWeek,
            day: date_fns_1.endOfDay
        }[this.view];
        var startDate = date_fns_1.format(getStart(this.viewDate), 'MM-DD-YYYY');
        var endDate = date_fns_1.format(getEnd(this.viewDate), 'MM-DD-YYYY');
        this.events$ = this.calendarsService.getAppointments(this.userService.currentUser.calendarId, startDate, endDate)
            .map(function (response) {
            var returnedEvents = new Array();
            if (response !== null) {
                var appointments = _this.generateArray(response);
                appointments.forEach(function (value, index, array) {
                    returnedEvents.push(_this.toEvent(value));
                });
            }
            return returnedEvents;
        });
    };
    CalendarsViewComponent.prototype.toEvent = function (response) {
        var startDate = new Date(response["StartingTime"]);
        var endDate = new Date(startDate.getTime() + 30 * 60000);
        var petName = response["PetName"];
        var state = response["State"];
        var ownerFamilyName = response["OwnerFamilyName"];
        var ownerGivenName = response["OwnerGivenName"];
        return {
            start: startDate,
            end: endDate,
            title: petName + ' (' + ownerGivenName + ' ' + ownerFamilyName + ')',
            color: state === "Open" ? {
                primary: 'blue',
                secondary: 'lightblue'
            } : {
                primary: 'green',
                secondary: 'lightgreen'
            }
        };
    };
    CalendarsViewComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    CalendarsViewComponent.prototype.eventClicked = function (event) {
    };
    return CalendarsViewComponent;
}());
CalendarsViewComponent = __decorate([
    core_1.Component({
        selector: 'appc-calendars-view',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        templateUrl: './calendars-view.component.html',
        styleUrls: ['./calendars-view.component.scss']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, calendars_service_1.CalendarsService,
        router_1.Router])
], CalendarsViewComponent);
exports.CalendarsViewComponent = CalendarsViewComponent;
//# sourceMappingURL=calendars-view.component.js.map