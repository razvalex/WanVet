export class Appointment {
    constructor(
        public id: string,
        public state: string, 
        public petName: string,
        public petId: string,
        public ownerFamilyName: string,
        public ownerGivenName: string,
        public ownerId: string,
        public diagnostic: string,
        public medicalHistory: string,
        public startingTime: Date
    ) {

    }
}
