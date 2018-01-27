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
// CREDIT:
//  The vast majority of this code came right from Ben Nadel's post:
//  http://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
//
// My updates are mostly adapting it for Typescript:
//  1. Importing required modules
//  2. Adding type notations
//  3. Using the 'fat-arrow' syntax to properly scope in-line functions
//
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var HttpErrorHandlerService = (function () {
    function HttpErrorHandlerService(router) {
        this.router = router;
    }
    HttpErrorHandlerService.prototype.handle = function (error) {
        if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(['unauthorized']);
        }
        if (error.status === 403) {
            localStorage.clear();
            this.router.navigate(['forbidden']);
        }
        else {
            this.router.navigate(['']);
        }
    };
    return HttpErrorHandlerService;
}());
HttpErrorHandlerService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router])
], HttpErrorHandlerService);
exports.HttpErrorHandlerService = HttpErrorHandlerService;
//# sourceMappingURL=http-error-handler.service.js.map