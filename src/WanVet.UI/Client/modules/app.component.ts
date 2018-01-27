import { Title } from '@angular/platform-browser';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthService } from './shared/services/auth.service';

import { User } from './shared/models/user.model';
import { UserService } from './shared/services/user.service';
import { Message } from './shared/models/message.model';
import { MessageService } from './shared/services/message.service';

import { DataService } from './shared/services/data.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    private toastrConfig: ToasterConfig;

    constructor(public authService: AuthService, private userService: UserService,
        private messageService: MessageService, private toasterService: ToasterService) {

        if (window.location.hash) {
            this.authService.authorizedCallback();
        }

        this.toastrConfig = new ToasterConfig({
            showCloseButton: true,
            newestOnTop: true,
            tapToDismiss: false,
            positionClass: 'toast-top-right'
        });
    }

    ngOnInit() {
        let ie = this.detectIE();
        if (!ie) {
            window.dispatchEvent(new Event('resize'));
        }
        else {
            let event = document.createEvent('Event');
            event.initEvent('resize', false, true);
            window.dispatchEvent(event);
        }
    }

    detectIE(): any {
        let ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        let edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
}
