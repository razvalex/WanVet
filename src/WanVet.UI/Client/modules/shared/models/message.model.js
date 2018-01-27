"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = (function () {
    function Message(data) {
        if (data === void 0) { data = {}; }
        this.content = data.content || "";
        this.title = data.title || "";
        this.destination = data.destination || null;
        this.date = data.date || Date.now();
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.model.js.map