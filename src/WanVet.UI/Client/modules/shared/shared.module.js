"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var angular2_toaster_1 = require("angular2-toaster/angular2-toaster");
var angular2_image_upload_1 = require("angular2-image-upload");
var ngx_color_picker_1 = require("ngx-color-picker");
var mydatepicker_1 = require("mydatepicker");
var ng2_select_1 = require("ng2-select");
var angular_calendar_1 = require("angular-calendar");
var dynamic_form_component_1 = require("./forms/dynamic-form.component");
var dynamic_form_control_component_1 = require("./forms/dynamic-form-control.component");
var error_message_component_1 = require("./forms/error-message.component");
var error_summary_component_1 = require("./forms/error-summary.component");
var form_control_service_1 = require("./forms/form-control.service");
var ngx_bootstrap_2 = require("ngx-bootstrap");
var header_component_1 = require("./layout/header.component");
var menu_aside_component_1 = require("./layout/menu-aside.component");
var message_box_component_1 = require("./components/message-box/message-box.component");
var user_box_component_1 = require("./components/user-box/user-box.component");
var forbidden_component_1 = require("./components/forbidden/forbidden.component");
var unauthorized_component_1 = require("./components/unauthorized/unauthorized.component");
var app_constants_1 = require("../app.constants");
// Services
var data_service_1 = require("./services/data.service");
var api_gateway_service_1 = require("./services/api-gateway.service");
var auth_service_1 = require("./services/auth.service");
var http_error_handler_service_1 = require("./services/http-error-handler.service");
var utility_service_1 = require("./services/utility.service");
var uppercase_pipe_1 = require("./pipes/uppercase.pipe");
var user_service_1 = require("./services/user.service");
var message_service_1 = require("./services/message.service");
var guard_service_1 = require("./services/guard.service");
var notification_service_1 = require("./services/notification.service");
var SharedModule = SharedModule_1 = (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule_1,
            providers: [
                // Providers
                http_error_handler_service_1.HttpErrorHandlerService,
                api_gateway_service_1.ApiGatewayService,
                data_service_1.DataService,
                user_service_1.UserService,
                auth_service_1.AuthService,
                form_control_service_1.FormControlService,
                utility_service_1.UtilityService,
                app_constants_1.Configuration,
                message_service_1.MessageService,
                guard_service_1.CanActivateGuard,
                notification_service_1.NotificationService
            ]
        };
    };
    return SharedModule;
}());
SharedModule = SharedModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            ngx_bootstrap_2.AlertModule.forRoot(),
            angular2_image_upload_1.ImageUploadModule.forRoot(),
            angular_calendar_1.CalendarModule.forRoot(),
            ngx_color_picker_1.ColorPickerModule,
            mydatepicker_1.MyDatePickerModule,
            ng2_select_1.SelectModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule,
            ngx_bootstrap_1.Ng2BootstrapModule,
            // No need to export as these modules don't expose any components/directive etc'
            http_1.HttpModule,
            http_1.JsonpModule,
            angular2_toaster_1.ToasterModule
        ],
        declarations: [
            dynamic_form_component_1.DynamicFormComponent,
            dynamic_form_control_component_1.DynamicFormControlComponent,
            error_message_component_1.ErrorMessageComponent,
            error_summary_component_1.ErrorSummaryComponent,
            menu_aside_component_1.MenuAsideComponent,
            header_component_1.HeaderComponent,
            uppercase_pipe_1.UppercasePipe,
            forbidden_component_1.ForbiddenComponent,
            unauthorized_component_1.UnauthorizedComponent,
            user_box_component_1.UserBoxComponent,
            message_box_component_1.MessageBoxComponent
        ],
        exports: [
            // Modules
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule,
            // Providers, Components, directive, pipes
            dynamic_form_component_1.DynamicFormComponent,
            dynamic_form_control_component_1.DynamicFormControlComponent,
            error_summary_component_1.ErrorSummaryComponent,
            error_message_component_1.ErrorMessageComponent,
            header_component_1.HeaderComponent,
            menu_aside_component_1.MenuAsideComponent,
            uppercase_pipe_1.UppercasePipe,
            forbidden_component_1.ForbiddenComponent,
            unauthorized_component_1.UnauthorizedComponent,
            user_box_component_1.UserBoxComponent,
            message_box_component_1.MessageBoxComponent,
            angular2_toaster_1.ToasterModule,
            ngx_bootstrap_2.AlertModule,
            angular2_image_upload_1.ImageUploadModule,
            angular_calendar_1.CalendarModule,
            ngx_color_picker_1.ColorPickerModule,
            mydatepicker_1.MyDatePickerModule,
            ng2_select_1.SelectModule
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
var SharedModule_1;
//# sourceMappingURL=shared.module.js.map