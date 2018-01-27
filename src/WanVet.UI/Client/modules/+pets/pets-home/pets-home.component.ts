import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'appc-pets-home',
    templateUrl: './pets-home.component.html',
    styleUrls: ['./pets-home.component.scss']
})
export class PetsHomeComponent implements OnInit {
    cards: any;
    constructor() { }

    ngOnInit() {
        this.cards = [
            { route: 'add', title: 'Add', description: 'Add a new pet', icon: 'fa fa-plus', bg: 'bg-aqua' },
            { route: 'view', title: 'View', description: 'View existing pets', icon: 'fa fa-eye', bg: 'bg-green' }
        ];
    }

}


