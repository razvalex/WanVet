import { Injectable } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { AppointmentManageFormModel } from "./appointments-manage/appointments-manage.model";

@Injectable()
export class AppointmentsService {

    private appointmentsApiUrl: string = 'api/appointments/';

    constructor(private dataService: DataService) { }

    finalize(appointmentManageFormModel: AppointmentManageFormModel) {
        this.dataService.post(this.appointmentsApiUrl, appointmentManageFormModel, {})
            .map(response => { return true }).subscribe((response: Boolean) => { });
    }
}
