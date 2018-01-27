import { Routes, RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetsHomeComponent } from './pets-home/pets-home.component';
import { PetsAddComponent } from './pets-add/pets-add.component';
import { PetsViewComponent } from "./pets-view/pets-view.component";
import { PetsTimelineComponent } from "./pets-timeline/pets-timeline.component";

const routes: Routes = [
    {
        path: '', component: PetsComponent, children: [
            { path: '', component: PetsHomeComponent },
            { path: 'add', component: PetsAddComponent },
            { path: 'view', component: PetsViewComponent },
            { path: 'view/timeline/:id', component: PetsTimelineComponent }
        ]
    }
];

export const InternalRouterModule = RouterModule.forChild(routes);
