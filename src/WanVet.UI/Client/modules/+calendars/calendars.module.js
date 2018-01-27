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
var calendars_service_1 = require("./calendars.service");
var calendars_routes_1 = require("./calendars.routes");
var calendars_view_component_1 = require("./calendars-view/calendars-view.component");
var calendar_header_component_1 = require("./helpers/calendar-header.component");
var CalendarsModule = (function () {
    function CalendarsModule() {
    }
    return CalendarsModule;
}());
CalendarsModule = __decorate([
    core_1.NgModule({
        imports: [calendars_routes_1.InternalRouterModule, shared_module_1.SharedModule],
        declarations: [
            calendars_view_component_1.CalendarsViewComponent,
            calendar_header_component_1.CalendarHeaderComponent
        ],
        providers: [calendars_service_1.CalendarsService]
    })
], CalendarsModule);
exports.CalendarsModule = CalendarsModule;
//# sourceMappingURL=calendars.module.js.map