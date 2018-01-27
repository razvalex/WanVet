import { Component, OnInit } from '@angular/core';
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'menu-aside',
    templateUrl: 'menu-aside.component.html',
    styleUrls: ['menu-aside.component.scss']
})
export class MenuAsideComponent implements OnInit {
    private currentUrl: string;
    private links: Array<any> = [
        {
            "title": "Home",
            "icon": "dashboard",
            "link": ['/']
        }
    ];

    constructor(private userService: UserService, public router: Router, private authService: AuthService) {
        this.initializeLinks();
    }

    private initializeLinks(): void {
        if (this.authService.isDoctor) {
            this.links.push({
                "title": "Appointments",
                "icon": "plus",
                "link": ['/appointments/manage']
            },
            {
                "title": "Calendar",
                "icon": "calendar",
                "link": ['/calendars/view']
            });
        }
        else {
            this.links.push(
            {
                "title": "Pets",
                "icon": "paw",
                "link": ['/pets']
            },
            {
                "title": "Appointments",
                "icon": "calendar",
                "sublinks": [
                    {
                        "title": "Home",
                        "link": ['/appointments'],
                    },
                    {
                        "title": "New",
                        "link": ['/appointments/add'],
                    },
                ]
            });
        }
    }

    ngOnInit() { }
}
