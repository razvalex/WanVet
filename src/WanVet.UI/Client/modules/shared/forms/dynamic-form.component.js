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
var form_control_service_1 = require("./form-control.service");
var DynamicFormComponent = (function () {
    function DynamicFormComponent(_controlService) {
        this._controlService = _controlService;
        this.controls = [];
        this.btnText = 'Submit'; // Default value at least
        this.formClass = 'form-horizontal';
        // Note: don't keep name of output events as same as native events such as submit etc.
        this.formsubmit = new core_1.EventEmitter();
    }
    DynamicFormComponent.prototype.ngOnInit = function () {
        var sortedControls = this.controls.sort(function (a, b) { return a.order - b.order; });
        this.form = this._controlService.toControlGroup(sortedControls);
    };
    DynamicFormComponent.prototype.onSubmit = function () {
        this.formsubmit.emit(this.form.value);
    };
    return DynamicFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DynamicFormComponent.prototype, "controls", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicFormComponent.prototype, "btnText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DynamicFormComponent.prototype, "formClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DynamicFormComponent.prototype, "formsubmit", void 0);
DynamicFormComponent = __decorate([
    core_1.Component({
        selector: 'appc-dynamic-form',
        templateUrl: './dynamic-form.component.html'
    }),
    __metadata("design:paramtypes", [form_control_service_1.FormControlService])
], DynamicFormComponent);
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map