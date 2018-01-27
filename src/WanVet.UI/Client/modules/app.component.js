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
var auth_service_1 = require("./shared/services/auth.service");
var user_service_1 = require("./shared/services/user.service");
var message_service_1 = require("./shared/services/message.service");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var AppComponent = (function () {
    function AppComponent(authService, userService, messageService, toasterService) {
        this.authService = authService;
        this.userService = userService;
        this.messageService = messageService;
        this.toasterService = toasterService;
        if (window.location.hash) {
            this.authService.authorizedCallback();
        }
        this.toastrConfig = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true,
            newestOnTop: true,
            tapToDismiss: false,
            positionClass: 'toast-top-right'
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var ie = this.detectIE();
        if (!ie) {
            window.dispatchEvent(new Event('resize'));
        }
        else {
            var event_1 = document.createEvent('Event');
            event_1.initEvent('resize', false, true);
            window.dispatchEvent(event_1);
        }
    };
    AppComponent.prototype.detectIE = function () {
        var ua = window.navigator.userAgent;
        // Test values; Uncomment to check result �
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        styleUrls: ['./app.component.scss'],
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService,
        message_service_1.MessageService, angular2_toaster_1.ToasterService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map