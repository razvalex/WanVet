﻿import { Injectable } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class NotificationService {
    constructor(private toastr: ToasterService) { }

    success = (body: string, title: string = 'Operation successful'): void => {
        this.toastr.pop({ title: title, body: body, type: 'success' });
    }

    error = (body: string, title: string = 'An error occured'): void =>  {
        this.toastr.pop({ title: title, body: body, type: 'error' });
    }

    warning = (body: string, title: string = 'Something went wrong'): void =>  {
        this.toastr.pop({ title: title, body: body, type: 'warning' });
    }
}