import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { PetsService } from '../pets.service';
import { PetAddFormModel } from "./pets-add.model";
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/services/notification.service";
import { User } from "../../shared/models/user.model";

@Component({
    selector: 'appc-pets-add',
    templateUrl: './pets-add.component.html',
    styleUrls: ['./pets-add.component.scss']
})
export class PetsAddComponent implements OnInit {

    storage = localStorage;

    petForm: FormGroup;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm-dd-yyyy',
    };

    constructor(private fb: FormBuilder, private petsService: PetsService, private userService: UserService,
        private notificationService: NotificationService, private router: Router) {

    }

    ngOnInit() {
        this.userService.getUser().subscribe((user: User) => { this.userService.setCurrentUser(user); });
        this.petForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            breed: ['', [Validators.required]],
            sex: 'male',
            species: 'cat',
            colorHex: ['', []],
            birthDate: ['', [Validators.required]],
            profileImageUrl: ['', [Validators.required]]
        });
    }

    getHeaders(): any {
        let tokenValue = 'Bearer ' + this.retrieve("authorizationData");
        return ([{ header: 'Accept', value: 'application/json' },
        { header: 'Authorization', value: tokenValue }]);
    };

    retrieve(key: string): string {
        var item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return '';
    }

    onSubmit(): void {
        var data = this.petForm.value;
        var currentUser = this.userService.currentUser;
        var petAddFormModel = new PetAddFormModel(data.name, data.species, data.sex, data.breed, data.colorHex,
            currentUser.id, currentUser.email, data.profileImageUrl, data.birthDate.formatted);
        this.petsService.create(petAddFormModel);
        console.log('Submitted: ' + JSON.stringify(petAddFormModel));
        this.notificationService.success('We successfully received your request to add a new pet.');
        this.router.navigate(['/pets']);
    }

    onColorPickerChanged($event): void {
        this.petForm.patchValue({
            colorHex: $event
        });
    }

    profileImageUploaded($event): void {
        this.petForm.patchValue({
            profileImageUrl: $event.serverResponse._body
        });
    }

    profileImageRemoved($event): void {
        this.petForm.patchValue({
            profileImageUrl: ''
        });
    }
}
