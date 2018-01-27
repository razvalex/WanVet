import { Component, OnInit } from '@angular/core';
import { PetsService } from '../pets.service';
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";

@Component({
    selector: 'appc-pets-view',
    templateUrl: './pets-view.component.html',
    styleUrls: ['./pets-view.component.scss']
})
export class PetsViewComponent implements OnInit {

    pets: any;

    constructor(private petsService: PetsService, private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.userService.getUser().subscribe((user: User) => {
            this.userService.setCurrentUser(user);
            if (user !== null) {
                this.pets = user.pets;
            }
        });
    }
}
