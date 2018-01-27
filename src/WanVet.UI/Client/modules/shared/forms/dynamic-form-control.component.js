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
var DynamicFormControlComponent = (function () {
    function DynamicFormControlComponent() {
        this.control = undefined;
        this.form = undefined;
    }
    Object.defineProperty(DynamicFormControlComponent.prototype, "valid", {
        get: function () {
            return this.form.controls[this.control.key].valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControlComponent.prototype, "invalid", {
        get: function () {
            return !this.form.controls[this.control.key].valid && this.form.controls[this.control.key].touched;
        },
        enumerable: true,
        configurable: true
    });
    return DynamicFormControlComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicFormControlComponent.prototype, "control", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicFormControlComponent.prototype, "form", void 0);
DynamicFormControlComponent = __decorate([
    core_1.Component({
        selector: 'appc-dynamic-control',
        templateUrl: './dynamic-form-control.component.html'
    }),
    __metadata("design:paramtypes", [])
], DynamicFormControlComponent);
exports.DynamicFormControlComponent = DynamicFormControlComponent;
//# sourceMappingURL=dynamic-form-control.component.js.map