import { NgModule, NgModuleFactoryLoader }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/Router';
import { InternalRouterModule }        from './app.routes';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { SharedModule }  from './shared/shared.module';
import { HomeModule }  from './home/home.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        InternalRouterModule,
        HttpModule,
        SharedModule.forRoot(),
        HomeModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
