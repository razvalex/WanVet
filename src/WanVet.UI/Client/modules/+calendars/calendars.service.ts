import { Injectable } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Response } from '@angular/http';
import { AppointmentAddFormModel } from "../+appointments/appointments-add/appointments-add.model";

@Injectable()
export class CalendarsService {

    private calendarsApiUrl: string = 'api/calendars/';

    constructor(private dataService: DataService) { }

    get(id: string) {
        return this.dataService.get(this.calendarsApiUrl, { id: id });
    }

    getFreeSpots(id: string, date: string) {
        return this.dataService.get(this.calendarsApiUrl + 'freespots', { id: id, date: date });
    }

    checkappointmentdisponibility(appointmentAddFormModel: AppointmentAddFormModel) {
        this.dataService.post(this.calendarsApiUrl + 'checkappointmentdisponibility', appointmentAddFormModel, {})
            .map(response => { return true }).subscribe((response: Boolean) => { });
    }

    getAppointments(id: string, startDate: string, endDate: string) {
        return this.dataService.get(this.calendarsApiUrl + 'appointments', { id: id, startDate: startDate, endDate: endDate });
    }

    getOpenAppointments(id: string, term: string) {
        return this.dataService.get(this.calendarsApiUrl + 'openappointments', { id: id, term: term});
    }
}
