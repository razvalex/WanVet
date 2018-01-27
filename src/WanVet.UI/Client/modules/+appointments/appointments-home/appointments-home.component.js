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
var AppointmentsHomeComponent = (function () {
    function AppointmentsHomeComponent() {
    }
    AppointmentsHomeComponent.prototype.ngOnInit = function () {
        this.cards = [
            { route: 'add', title: 'Add', description: 'Add a new appointment', icon: 'fa fa-plus', bg: 'bg-aqua' }
        ];
    };
    return AppointmentsHomeComponent;
}());
AppointmentsHomeComponent = __decorate([
    core_1.Component({
        selector: 'appc-appointments-home',
        templateUrl: './appointments-home.component.html',
        styleUrls: ['./appointments-home.component.scss']
    }),
    __metadata("design:paramtypes", [])
], AppointmentsHomeComponent);
exports.AppointmentsHomeComponent = AppointmentsHomeComponent;
//# sourceMappingURL=appointments-home.component.js.map