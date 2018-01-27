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
var control_base_1 = require("./control-base");
var validation_service_1 = require("./validation.service");
var ErrorMessageComponent = (function () {
    function ErrorMessageComponent() {
    }
    Object.defineProperty(ErrorMessageComponent.prototype, "errorMessage", {
        get: function () {
            var c = this.form.form.get(this.control.key);
            for (var propertyName in c.errors) {
                if (c.errors.hasOwnProperty(propertyName) && c.touched) {
                    return validation_service_1.ValidationService.getValidatorErrorMessage(propertyName, this.control.minlength || this.control.maxlength);
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorMessageComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", control_base_1.ControlBase)
], ErrorMessageComponent.prototype, "control", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroupDirective)
], ErrorMessageComponent.prototype, "form", void 0);
ErrorMessageComponent = __decorate([
    core_1.Component({
        selector: 'appc-control-error-message',
        template: "<div *ngIf=\"errorMessage\" class=\"form-control-feedback\"> {{errorMessage}} </div>"
    }),
    __metadata("design:paramtypes", [])
], ErrorMessageComponent);
exports.ErrorMessageComponent = ErrorMessageComponent;
//# sourceMappingURL=error-message.component.js.map