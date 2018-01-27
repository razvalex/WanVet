"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var appointments_routes_1 = require("./appointments.routes");
var appointments_component_1 = require("./appointments.component");
var appointments_home_component_1 = require("./appointments-home/appointments-home.component");
var appointments_add_component_1 = require("./appointments-add/appointments-add.component");
var appointments_service_1 = require("./appointments.service");
var calendars_service_1 = require("../+calendars/calendars.service");
var appointments_manage_component_1 = require("./appointments-manage/appointments-manage.component");
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
//# sourceMappingURL=appointments.module.js.map