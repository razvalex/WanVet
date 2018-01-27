import { Routes, RouterModule } from '@angular/router';

import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { CanActivateGuard } from './shared/services/guard.service';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'appointments',
        loadChildren: './+appointments/appointments.module#AppointmentsModule'
    },
    {
        path: 'pets',
        loadChildren: './+pets/pets.module#PetsModule'
    },
    {
        path: 'calendars',
        loadChildren: './+calendars/calendars.module#CalendarsModule'
    },
    { path: 'forbidden', component: ForbiddenComponent },
    { path: 'unauthorized', component: UnauthorizedComponent }
];

export const InternalRouterModule = RouterModule.forRoot(routes);
