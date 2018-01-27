"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var calendars_view_component_1 = require("./calendars-view/calendars-view.component");
var routes = [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    {
        path: 'view', component: calendars_view_component_1.CalendarsViewComponent
    }
];
exports.InternalRouterModule = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=calendars.routes.js.map