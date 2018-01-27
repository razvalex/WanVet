import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { PetAddFormModel } from "./pets-add/pets-add.model";
import { Response } from '@angular/http';

@Injectable()
export class PetsService {

    private petsApiUrl: string = 'api/pets/';

    constructor(private dataService: DataService) { }

    create(petAddFormModel: PetAddFormModel) {
        this.dataService.post(this.petsApiUrl, petAddFormModel, {})
            .map(response => { return true }).subscribe((response: Boolean) => { });
    }

    get(id: string) {
        return this.dataService.get(this.petsApiUrl, { id: id });
    }
}
