"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var forbidden_component_1 = require("./shared/components/forbidden/forbidden.component");
var unauthorized_component_1 = require("./shared/components/unauthorized/unauthorized.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'appointments',
        loadChildren: './+appointments/appointments.module#AppointmentsModule'
    },
    {
        path: 'pets',
        loadChildren: './+pets/pets.module#PetsModule'
    },
    {
        path: 'calendars',
        loadChildren: './+calendars/calendars.module#CalendarsModule'
    },
    { path: 'forbidden', component: forbidden_component_1.ForbiddenComponent },
    { path: 'unauthorized', component: unauthorized_component_1.UnauthorizedComponent }
];
exports.InternalRouterModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map