
export class Pet {
    constructor(
        public id: string,
        public name: string,
        public breed: string,
        public sex: string,
        public species: string,
        public profileImageUrl: string
    ) {

    }
}

export class User {
    constructor(
        public id: string,
        public calendarId: string,
        public email: string,
        public familyName: string,
        public givenName: string,
        public phoneNumber: string,
        public gender: string,
        public creationDate: string,
        public pets: Array<Pet>
    ) {
        this.creationDate = creationDate || Date.now().toString();

    }
}
