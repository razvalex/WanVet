import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from "../../shared/services/user.service";
import { Router } from "@angular/router";
import { User } from "../../shared/models/user.model";
import { Observable } from 'rxjs/Observable';
import { CalendarEvent } from 'angular-calendar';
import {
    isSameMonth,
    isSameDay,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    startOfDay,
    endOfDay,
    format
} from 'date-fns';
import { CalendarsService } from "../calendars.service";

@Component({
    selector: 'appc-calendars-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendars-view.component.html',
    styleUrls: ['./calendars-view.component.scss']
})
export class CalendarsViewComponent implements OnInit {

    view: string = 'day';

    viewDate: Date = new Date();

    events$: Observable<Array<CalendarEvent>>;

    activeDayIsOpen: boolean = false;

    constructor(private userService: UserService, private calendarsService: CalendarsService,
        private router: Router) { }

    ngOnInit() {

        this.userService.getUser().subscribe((user: User) => {
            this.userService.setCurrentUser(user);
            this.fetchEvents();
        });
    }

    private generateArray(obj) {
        return Object.keys(obj).map((key) => { return obj[key] });
    }

    fetchEvents(): void {
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

        var startDate = format(getStart(this.viewDate), 'MM-DD-YYYY');
        var endDate = format(getEnd(this.viewDate), 'MM-DD-YYYY');

        this.events$ = this.calendarsService.getAppointments(this.userService.currentUser.calendarId, startDate, endDate)
            .map(response => {
                var returnedEvents = new Array<CalendarEvent>();
                if (response !== null) {
                    var appointments = this.generateArray(response);
                    appointments.forEach((value, index, array) => {
                        returnedEvents.push(this.toEvent(value));
                    });
                }
                return returnedEvents;
            });
    }

    private toEvent(response): any {
        var startDate = new Date(response["StartingTime"]);
        var endDate = new Date(startDate.getTime() + 30 * 60000);
        var petName = response["PetName"];
        var state = response["State"];
        var ownerFamilyName = response["OwnerFamilyName"];
        var ownerGivenName = response["OwnerGivenName"];
        return {
            start: startDate,
            end: endDate,
            title: petName + ' (' + ownerGivenName + ' ' + ownerFamilyName + ')',
            color: state === "Open" ? {
                primary: 'blue',
                secondary: 'lightblue'
            } : {
                    primary: 'green',
                    secondary: 'lightgreen'
                }
        };
    }

    dayClicked({
    date,
        events
  }: {
            date: Date;
            events: Array<CalendarEvent>;
        }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventClicked(event: CalendarEvent): void {

    }
}
