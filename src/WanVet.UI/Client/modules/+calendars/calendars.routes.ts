import { Routes, RouterModule } from '@angular/router';
import { CalendarsViewComponent } from "./calendars-view/calendars-view.component";

const routes: Routes = [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    {
      path: 'view', component: CalendarsViewComponent 
    }  
];

export const InternalRouterModule = RouterModule.forChild(routes);
