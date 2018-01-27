import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/services/notification.service";
import { User } from "../../shared/models/user.model";
import { SelectComponent } from "ng2-select";
import { SelectOption } from "../../shared/types/select-option";
import { CalendarsService } from "../../+calendars/calendars.service";
import { AppointmentAddFormModel } from "./appointments-add.model";

@Component({
    selector: 'appc-appointments-add',
    templateUrl: './appointments-add.component.html',
    styleUrls: ['./appointments-add.component.scss']
})
export class AppointmentsAddComponent implements OnInit {

    constructor(private fb: FormBuilder, private userService: UserService,
        private calendarsService: CalendarsService,
        private notificationService: NotificationService, private router: Router) {

    }

    @ViewChild('doctorsInput') doctorsInput: SelectComponent;
    @ViewChild('startingTimeInput') startingTimeInput: SelectComponent;

    appointmentForm: FormGroup;

    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm-dd-yyyy',
    };

    pets: any[];

    ngOnInit() {
        this.userService.getUser().subscribe((user: User) => { this.userService.setCurrentUser(user); });
        this.doctorsInput.items = [];
        this.startingTimeInput.items = [];
        this.pets = this.userService.currentUser.pets.map((value, index, array) => {
            return { id: value.id, text: value.name };
        });
        this.appointmentForm = this.fb.group({
            date: ['', [Validators.required]],
            calendarId: ['', [Validators.required]],
            petId: ['', [Validators.required]],
            startingTime: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        var data = this.appointmentForm.value;
        var currentUser = this.userService.currentUser;
        var selectedPet = this.pets.filter(x => x.id === data.petId)[0];
        var appointmentAddFormModel = new AppointmentAddFormModel(data.calendarId, data.petId, selectedPet.text, currentUser.id, currentUser.familyName,
            currentUser.givenName, data.date.formatted, data.startingTime.id);
        this.calendarsService.checkappointmentdisponibility(appointmentAddFormModel);
        console.log('Submitted: ' + JSON.stringify(appointmentAddFormModel));
        this.notificationService.success('We successfully received your request to add a new appointment.');
        this.router.navigate(['/pets']);
    }

    selectedDoctor($event) {
        this.appointmentForm.patchValue({
            calendarId: $event.id
        });
    }

    removedDoctor($event) {
        this.appointmentForm.patchValue({
            calendarId: ''
        });
    }

    typedDoctor($event) {
        this.userService.getDoctors($event)
            .subscribe((results: User[]) => {
                this.doctorsInput.items = results.map(result => {
                    return new SelectOption(result.calendarId, result.givenName + ' ' + result.familyName);
                });
                (<any>this.doctorsInput).open()
            });
    }


    selectedPet($event) {
        this.appointmentForm.patchValue({
            petId: $event.id
        });
    }

    removedPet($event) {
        this.appointmentForm.patchValue({
            petId: ''
        });
    }

    selectedStartingTime($event) {
        this.appointmentForm.patchValue({
            startingTime: $event
        });
    }

    removedStartingTime($event) {
        this.appointmentForm.patchValue({
            startingTime: ''
        });
    }

    private generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }

    typedStartingTime($event) {
        this.calendarsService.getFreeSpots(this.appointmentForm.controls.calendarId.value, this.appointmentForm.controls.date.value.formatted)
            .map(response => {
                return this.generateArray(response);
            })
            .subscribe((results: string[]) => {
                this.startingTimeInput.items = results;
                (<any>this.startingTimeInput).open()
            });
    }
}
