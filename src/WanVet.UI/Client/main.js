"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js");
require("bootstrap");
require("admin-lte/plugins/fastclick/fastclick.min.js");
require("admin-lte/plugins/slimScroll/jquery.slimscroll.js");
require("admin-lte/plugins/iCheck/icheck.js");
require("admin-lte/dist/js/app.js");
require("es6-shim");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var app_module_1 = require("./modules/app.module");
// Enable either Hot Module Reloading or production mode
if (module['hot']) {
    module['hot'].accept();
    module['hot'].dispose(function () {
        // do something to clean the environment e.g universal platform dispose
    });
}
else {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map