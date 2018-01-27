import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { InternalRouterModule } from './appointments.routes';
import { AppointmentsComponent } from "./appointments.component";
import { AppointmentsHomeComponent } from "./appointments-home/appointments-home.component";
import { AppointmentsAddComponent } from "./appointments-add/appointments-add.component";
import { AppointmentsService } from "./appointments.service";
import { CalendarsService } from "../+calendars/calendars.service";
import { AppointmentsManageComponent } from "./appointments-manage/appointments-manage.component";

@NgModule({
    imports: [InternalRouterModule, SharedModule],
    declarations: [
        AppointmentsComponent,
        AppointmentsHomeComponent,
        AppointmentsAddComponent,
        AppointmentsManageComponent
    ],
    providers: [AppointmentsService, CalendarsService]
})
export class AppointmentsModule { }