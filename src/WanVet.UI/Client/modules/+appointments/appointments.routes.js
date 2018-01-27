"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var appointments_component_1 = require("./appointments.component");
var appointments_home_component_1 = require("./appointments-home/appointments-home.component");
var appointments_add_component_1 = require("./appointments-add/appointments-add.component");
var appointments_manage_component_1 = require("./appointments-manage/appointments-manage.component");
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
//# sourceMappingURL=appointments.routes.js.map