export class PetAddFormModel {
    constructor(
        public name: string,
        public species: string,
        public sex: string,
        public breed: string,
        public colorHex: string,
        public ownerId: string,
        public ownerEmail: string,
        public profileImageUrl: string,
        public birthDate: string
    ) {

    }
}
