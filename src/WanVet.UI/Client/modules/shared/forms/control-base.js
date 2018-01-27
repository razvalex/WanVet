"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlBase = (function () {
    function ControlBase(options) {
        if (options === void 0) { options = {}; }
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.placeholder = options.placeholder || '';
        this.required = !!options.required;
        this.minlength = options.minlength;
        this.maxlength = options.maxlength;
        this.order = options.order === undefined ? 1 : options.order;
        this.type = options.type || '';
        this.class = options.class || '';
    }
    return ControlBase;
}());
exports.ControlBase = ControlBase;
//# sourceMappingURL=control-base.js.map