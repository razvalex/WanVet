"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var pets_component_1 = require("./pets.component");
var pets_home_component_1 = require("./pets-home/pets-home.component");
var pets_add_component_1 = require("./pets-add/pets-add.component");
var pets_view_component_1 = require("./pets-view/pets-view.component");
var pets_timeline_component_1 = require("./pets-timeline/pets-timeline.component");
var routes = [
    {
        path: '', component: pets_component_1.PetsComponent, children: [
            { path: '', component: pets_home_component_1.PetsHomeComponent },
            { path: 'add', component: pets_add_component_1.PetsAddComponent },
            { path: 'view', component: pets_view_component_1.PetsViewComponent },
            { path: 'view/timeline/:id', component: pets_timeline_component_1.PetsTimelineComponent }
        ]
    }
];
exports.InternalRouterModule = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=pets.routes.js.map