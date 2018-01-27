import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'appc-appointments-home',
    templateUrl: './appointments-home.component.html',
    styleUrls: ['./appointments-home.component.scss']
})
export class AppointmentsHomeComponent implements OnInit {
    cards: any;
    constructor() { }

    ngOnInit() {
        this.cards = [
            { route: 'add', title: 'Add', description: 'Add a new appointment', icon: 'fa fa-plus', bg: 'bg-aqua' }
        ];
    }

}


