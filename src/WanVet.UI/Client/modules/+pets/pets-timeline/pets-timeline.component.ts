import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { UserService } from "../../shared/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Pet } from "../pet.model";
import { Appointment } from "../appointment.model";

@Component({
    selector: 'appc-pets-timeline',
    templateUrl: './pets-timeline.component.html',
    styleUrls: ['./pets-timeline.component.scss']
})
export class PetsTimelineComponent implements OnInit {
    pet: Pet;
    petId: string;
    loading: boolean = true;
    constructor(private route: ActivatedRoute, private petsService: PetsService, private userService: UserService, private router: Router) {

    }
    ngOnInit() {
        this.petId = this.route.snapshot.params['id'];
        this.petsService.get(this.petId).map(response => {
            var appointments = new Array<Appointment>();
            if (response !== null) {
                var responseArray = this.generateArray(response["Appointments"]);
                responseArray.forEach((value, index, array) => {
                    appointments.push(this.toAppointment(value));
                });
            }
            return new Pet(response["Id"], response["Name"], response["OwnerId"], response["ProfileImageUrl"],
                response["ColorHex"], response["Breed"], response["Sex"], response["Species"], new Date(response["BirthDate"]), appointments);
        }).subscribe((result: Pet) => { this.pet = result; this.loading = false; });
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
        var medicalHistory = response["MedicalHistory"];
        var diagnostic = response["Diagnostic"];
        var ownerId = response["OwnerId"];
        var startingTime = new Date(response["StartingTime"]);
        return new Appointment(appointmentId, state, petName, petId,
            ownerFamilyName, ownerGivenName, ownerId, diagnostic, medicalHistory, startingTime);
    }
}
