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
var pets_component_1 = require("./pets.component");
var pets_home_component_1 = require("./pets-home/pets-home.component");
var pets_add_component_1 = require("./pets-add/pets-add.component");
var pets_view_component_1 = require("./pets-view/pets-view.component");
var pets_timeline_component_1 = require("./pets-timeline/pets-timeline.component");
var pets_service_1 = require("./pets.service");
var pets_routes_1 = require("./pets.routes");
var PetsModule = (function () {
    function PetsModule() {
    }
    return PetsModule;
}());
PetsModule = __decorate([
    core_1.NgModule({
        imports: [pets_routes_1.InternalRouterModule, shared_module_1.SharedModule],
        declarations: [
            pets_component_1.PetsComponent,
            pets_home_component_1.PetsHomeComponent,
            pets_add_component_1.PetsAddComponent,
            pets_view_component_1.PetsViewComponent,
            pets_timeline_component_1.PetsTimelineComponent
        ],
        providers: [pets_service_1.PetsService]
    })
], PetsModule);
exports.PetsModule = PetsModule;
//# sourceMappingURL=pets.module.js.map