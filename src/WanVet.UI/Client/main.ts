import 'reflect-metadata';
import 'zone.js';
import 'bootstrap';
import 'admin-lte/plugins/fastclick/fastclick.min.js';
import 'admin-lte/plugins/slimScroll/jquery.slimscroll.js';
import 'admin-lte/plugins/iCheck/icheck.js';
import 'admin-lte/dist/js/app.js';
import 'es6-shim';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './modules/app.module';

// Enable either Hot Module Reloading or production mode
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(() => {
        // do something to clean the environment e.g universal platform dispose
    });
} else {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
