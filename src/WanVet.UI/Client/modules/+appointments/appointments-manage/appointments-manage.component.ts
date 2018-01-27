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
import { AppointmentManageFormModel } from './appointments-manage.model'
import { Appointment } from "../appointment.model";
import { AppointmentsService } from "../appointments.service";

@Component({
    selector: 'appc-appointments-manage',
    templateUrl: './appointments-manage.component.html',
    styleUrls: ['./appointments-manage.component.scss']
})
export class AppointmentsManageComponent implements OnInit {

    constructor(private fb: FormBuilder, private userService: UserService,
        private calendarsService: CalendarsService,
        private notificationService: NotificationService,
        private appointmentsService: AppointmentsService, private router: Router) {

    }

    @ViewChild('appoitmentsInput') appoitmentsInput: SelectComponent;

    appointmentManageForm: FormGroup;

    ngOnInit() {
        this.userService.getUser().subscribe((user: User) => { this.userService.setCurrentUser(user); });
        this.appointmentManageForm = this.fb.group({
            appointmentId: ['', [Validators.required]],
            diagnostic: ['', [Validators.required]],
            medicalHistory: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        var data = this.appointmentManageForm.value;
        var currentUser = this.userService.currentUser;
        var appointmentManageFormModel = new AppointmentManageFormModel(data.appointmentId, data.diagnostic, data.medicalHistory);
        this.appointmentsService.finalize(appointmentManageFormModel);
        this.notificationService.success('We successfully received your request to finalize current appointment.');
        this.router.navigate(['/calendars']);
    }

    selectedAppointment($event) {
        this.appointmentManageForm.patchValue({
            appointmentId: $event.id
        });
    }

    removedAppointment($event) {
        this.appointmentManageForm.patchValue({
            appointmentId: ''
        });
    }

    private generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }

    private toAppointment(response): Appointment {
        var appointmentId = response["Id"];
        var petName = response["PetName"];
        var petId = response["PetId"];
        var state = response["State"];
        var ownerFamilyName = response["OwnerFamilyName"];
        var ownerGivenName = response["OwnerGivenName"];
        var ownerId = response["OwnerId"];
        var startingTime = new Date(response["StartingTime"]);
        return new Appointment(appointmentId, state, petName, petId,
            ownerFamilyName, ownerGivenName, ownerId, startingTime);
    }

    typedAppointment($event) {
        this.calendarsService.getOpenAppointments(this.userService.currentUser.calendarId, $event)
            .map(response => {
                var appointments = new Array<Appointment>();
                if (response !== null) {
                    var responseArray = this.generateArray(response);
                    responseArray.forEach((value, index, array) => {
                        appointments.push(this.toAppointment(value));
                    });
                }
                return appointments;
            })
            .subscribe((results: Appointment[]) => {
                this.appoitmentsInput.items = results.map(result => {
                    return new SelectOption(result.id, result.startingTime.toLocaleString() + '-' + result.petName + ' (' + result.ownerGivenName + ' ' + result.ownerFamilyName + ')');
                });
                (<any>this.appoitmentsInput).open()
            });
    }
}
