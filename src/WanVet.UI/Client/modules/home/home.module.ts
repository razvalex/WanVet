import { NgModule }       from '@angular/core';

import { HomeComponent } from './home.component';
import { InternalRouterModule }            from './home.routes';


@NgModule({
    imports: [InternalRouterModule],
    declarations: [HomeComponent]
})
export class HomeModule { }
