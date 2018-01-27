import { Appointment } from "./appointment.model";

export class Pet {
    constructor(
        public id: string,
        public name: string,
        public ownerId: string,
        public profileImageUrl: string,
        public colorHex: string,
        public breed: string,
        public sex: string,
        public species: string,
        public birthDate: Date,
        public appointments: Appointment[]
    ) {

    }
}
