"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Appointment = (function () {
    function Appointment(id, state, petName, petId, ownerFamilyName, ownerGivenName, ownerId, diagnostic, medicalHistory, startingTime) {
        this.id = id;
        this.state = state;
        this.petName = petName;
        this.petId = petId;
        this.ownerFamilyName = ownerFamilyName;
        this.ownerGivenName = ownerGivenName;
        this.ownerId = ownerId;
        this.diagnostic = diagnostic;
        this.medicalHistory = medicalHistory;
        this.startingTime = startingTime;
    }
    return Appointment;
}());
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.model.js.map