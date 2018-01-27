export class AppointmentAddFormModel {
    constructor(
        public calendarId: string,
        public petId: string,
        public petName: string,
        public ownerId: string,
        public ownerFamilyName: string,
        public ownerGivenName: string,
        public date: string,
        public time: string
    ) {

    }
}