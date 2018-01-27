import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PetsComponent } from './pets.component';
import { PetsHomeComponent } from './pets-home/pets-home.component';
import { PetsAddComponent } from './pets-add/pets-add.component';
import { PetsViewComponent } from "./pets-view/pets-view.component";
import { PetsTimelineComponent } from "./pets-timeline/pets-timeline.component";

import { PetsService } from "./pets.service";

import { InternalRouterModule } from './pets.routes';

@NgModule({
    imports: [InternalRouterModule, SharedModule],
    declarations: [
        PetsComponent,
        PetsHomeComponent,
        PetsAddComponent,
        PetsViewComponent,
        PetsTimelineComponent
    ],
    providers: [PetsService]
})
export class PetsModule { }