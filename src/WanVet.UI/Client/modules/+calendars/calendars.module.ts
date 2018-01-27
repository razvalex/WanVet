import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CalendarsService } from "./calendars.service";
import { InternalRouterModule } from "./calendars.routes";
import { CalendarsViewComponent } from "./calendars-view/calendars-view.component";
import { CalendarHeaderComponent } from "./helpers/calendar-header.component";

@NgModule({
    imports: [InternalRouterModule, SharedModule],
    declarations: [
        CalendarsViewComponent,
        CalendarHeaderComponent
    ],
    providers: [CalendarsService]
})
export class CalendarsModule { }