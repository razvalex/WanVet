import { Routes, RouterModule }  from '@angular/router';

import { AppointmentsComponent } from './appointments.component';
import { AppointmentsHomeComponent } from "./appointments-home/appointments-home.component";
import { AppointmentsAddComponent } from "./appointments-add/appointments-add.component";
import { AppointmentsManageComponent } from "./appointments-manage/appointments-manage.component";

const routes: Routes = [
    {
        path: '', component: AppointmentsComponent, children: [
            { path: '', component: AppointmentsHomeComponent },
            { path: 'add', component: AppointmentsAddComponent },
            { path: 'manage', component: AppointmentsManageComponent }
        ]
    }  
];

export const InternalRouterModule = RouterModule.forChild(routes);
