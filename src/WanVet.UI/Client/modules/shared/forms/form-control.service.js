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
var forms_1 = require("@angular/forms");
var validation_service_1 = require("./validation.service");
var FormControlService = (function () {
    function FormControlService() {
    }
    FormControlService.prototype.toControlGroup = function (controls) {
        var group = {};
        controls.forEach(function (control) {
            var validators = [];
            // Required
            if (control.required) {
                validators.push(forms_1.Validators.required);
            }
            // Minlength
            if (control.minlength) {
                validators.push(forms_1.Validators.minLength(control.minlength));
            }
            // Maxlength
            if (control.maxlength) {
                validators.push(forms_1.Validators.minLength(control.maxlength));
            }
            // Email
            if (control.type === 'email') {
                validators.push(validation_service_1.ValidationService.emailValidator);
            }
            // Password
            if (control.type === 'password') {
                validators.push(validation_service_1.ValidationService.passwordValidator);
            }
            group[control.key] = new forms_1.FormControl(control.value || '', validators);
        });
        return new forms_1.FormGroup(group);
    };
    return FormControlService;
}());
FormControlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], FormControlService);
exports.FormControlService = FormControlService;
//# sourceMappingURL=form-control.service.js.map