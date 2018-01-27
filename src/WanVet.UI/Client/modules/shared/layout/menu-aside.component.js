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
var router_1 = require("@angular/router");
var user_service_1 = require("../services/user.service");
var auth_service_1 = require("../services/auth.service");
var MenuAsideComponent = (function () {
    function MenuAsideComponent(userService, router, authService) {
        this.userService = userService;
        this.router = router;
        this.authService = authService;
        this.links = [
            {
                "title": "Home",
                "icon": "dashboard",
                "link": ['/']
            }
        ];
        this.initializeLinks();
    }
    MenuAsideComponent.prototype.initializeLinks = function () {
        if (this.authService.isDoctor) {
            this.links.push({
                "title": "Appointments",
                "icon": "plus",
                "link": ['/appointments/manage']
            }, {
                "title": "Calendar",
                "icon": "calendar",
                "link": ['/calendars/view']
            });
        }
        else {
            this.links.push({
                "title": "Pets",
                "icon": "paw",
                "link": ['/pets']
            }, {
                "title": "Appointments",
                "icon": "calendar",
                "sublinks": [
                    {
                        "title": "Home",
                        "link": ['/appointments'],
                    },
                    {
                        "title": "New",
                        "link": ['/appointments/add'],
                    },
                ]
            });
        }
    };
    MenuAsideComponent.prototype.ngOnInit = function () { };
    return MenuAsideComponent;
}());
MenuAsideComponent = __decorate([
    core_1.Component({
        selector: 'menu-aside',
        templateUrl: 'menu-aside.component.html',
        styleUrls: ['menu-aside.component.scss']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router, auth_service_1.AuthService])
], MenuAsideComponent);
exports.MenuAsideComponent = MenuAsideComponent;
//# sourceMappingURL=menu-aside.component.js.map