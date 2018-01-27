import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { ImageUploadModule } from 'angular2-image-upload';
import { ColorPickerModule } from 'ngx-color-picker';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';
import { CalendarModule } from 'angular-calendar';

import { DynamicFormComponent } from './forms/dynamic-form.component';
import { DynamicFormControlComponent } from './forms/dynamic-form-control.component';
import { ErrorMessageComponent } from './forms/error-message.component';
import { ErrorSummaryComponent } from './forms/error-summary.component';
import { FormControlService } from './forms/form-control.service';

import { AlertModule } from 'ngx-bootstrap';

import { HeaderComponent } from "./layout/header.component";
import { MenuAsideComponent } from "./layout/menu-aside.component";
import { MessageBoxComponent } from "./components/message-box/message-box.component";
import { UserBoxComponent } from "./components/user-box/user-box.component"

import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { Configuration } from '../app.constants';

// Services
import { DataService } from './services/data.service';
import { ApiGatewayService } from './services/api-gateway.service';
import { AuthService } from './services/auth.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { UtilityService } from './services/utility.service';
import { UppercasePipe } from './pipes/uppercase.pipe';

import { UserService } from "./services/user.service";
import { MessageService } from "./services/message.service";
import { CanActivateGuard } from './services/guard.service';
import { NotificationService } from './services/notification.service';

@NgModule({
    imports: [
        AlertModule.forRoot(),
        ImageUploadModule.forRoot(),
        CalendarModule.forRoot(),
        ColorPickerModule,
        MyDatePickerModule,
        SelectModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2BootstrapModule,
        // No need to export as these modules don't expose any components/directive etc'
        HttpModule,
        JsonpModule,
        ToasterModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicFormControlComponent,
        ErrorMessageComponent,
        ErrorSummaryComponent,
        MenuAsideComponent,
        HeaderComponent,
        UppercasePipe,
        ForbiddenComponent,
        UnauthorizedComponent,
        UserBoxComponent,
        MessageBoxComponent
    ],
    exports: [
        // Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Providers, Components, directive, pipes
        DynamicFormComponent,
        DynamicFormControlComponent,
        ErrorSummaryComponent,
        ErrorMessageComponent,
        HeaderComponent,
        MenuAsideComponent,
        UppercasePipe,
        ForbiddenComponent,
        UnauthorizedComponent,
        UserBoxComponent,
        MessageBoxComponent,
        ToasterModule,
        AlertModule,
        ImageUploadModule,
        CalendarModule,
        ColorPickerModule,
        MyDatePickerModule,
        SelectModule
    ]

})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // Providers
                HttpErrorHandlerService,
                ApiGatewayService,
                DataService,
                UserService,
                AuthService,
                FormControlService,
                UtilityService,
                Configuration,
                MessageService,
                CanActivateGuard,
                NotificationService
            ]
        };
    }
}
