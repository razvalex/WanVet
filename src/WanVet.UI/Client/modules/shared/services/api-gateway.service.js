// CREDIT:
//  The vast majority of this code came right from Ben Nadel's post:
//  http://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
//
// My updates are mostly adapting it for Typescript:
//  1. Importing required modules
//  2. Adding type notations
//  3. Using the 'fat-arrow' syntax to properly scope in-line functions
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var http_error_handler_service_1 = require("./http-error-handler.service");
// Import the rxjs operators we need (in a production app you'll
//  probably want to import only the operators you actually use)
//
var ApiGatewayOptions = (function () {
    function ApiGatewayOptions() {
        this.headers = {};
        this.params = {};
        this.data = {};
    }
    return ApiGatewayOptions;
}());
exports.ApiGatewayOptions = ApiGatewayOptions;
var ApiGatewayService = (function () {
    function ApiGatewayService(http, httpErrorHandler) {
        this.http = http;
        this.httpErrorHandler = httpErrorHandler;
        // Define the internal Subject we'll use to push the command count
        this.pendingRequestsSubject = new Subject_1.Subject();
        this.pendingRequestCount = 0;
        this.storage = localStorage;
        this.pendingRequests$ = this.pendingRequestsSubject.asObservable();
    }
    // I perform a GET request to the API, appending the given params
    // as URL search parameters. Returns a stream.
    ApiGatewayService.prototype.get = function (url, params) {
        var options = new ApiGatewayOptions();
        options.method = http_1.RequestMethod.Get;
        options.url = url;
        options.params = params;
        return this.request(options);
    };
    // I perform a POST request to the API. If both the params and data
    // are present, the params will be appended as URL search parameters
    // and the data will be serialized as a JSON payload. If only the
    // data is present, it will be serialized as a JSON payload. Returns
    // a stream.
    ApiGatewayService.prototype.post = function (url, data, params) {
        if (!data) {
            data = params;
            params = {};
        }
        var options = new ApiGatewayOptions();
        options.method = http_1.RequestMethod.Post;
        options.url = url;
        options.params = params;
        options.data = data;
        return this.request(options);
    };
    ApiGatewayService.prototype.request = function (options) {
        var _this = this;
        options.method = (options.method || http_1.RequestMethod.Get);
        options.url = (options.url || '');
        options.headers = (options.headers || {});
        options.params = (options.params || {});
        options.data = (options.data || {});
        this.interpolateUrl(options);
        this.setHeaders(options);
        this.addContentType(options);
        var requestOptions = new http_1.RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);
        this.pendingRequestsSubject.next(++this.pendingRequestCount);
        var stream = this.http.request(options.url, requestOptions)
            .catch(function (error) {
            _this.httpErrorHandler.handle(error);
            return Observable_1.Observable.throw(error);
        })
            .map(this.unwrapHttpValue)
            .catch(function (error) {
            return Observable_1.Observable.throw(_this.unwrapHttpError(error));
        })
            .finally(function () {
            _this.pendingRequestsSubject.next(--_this.pendingRequestCount);
        });
        return stream;
    };
    ApiGatewayService.prototype.setHeaders = function (options) {
        options.headers['Accept'] = 'application/json';
        var token = this.retrieve("authorizationData");
        if (token !== "") {
            var tokenValue = 'Bearer ' + token;
            options.headers['Authorization'] = tokenValue;
        }
    };
    ApiGatewayService.prototype.retrieve = function (key) {
        var item = this.storage.getItem(key);
        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }
        return null;
    };
    ApiGatewayService.prototype.addContentType = function (options) {
        if (options.method !== http_1.RequestMethod.Get) {
            options.headers['Content-Type'] = 'application/json; charset=UTF-8';
        }
        return options;
    };
    ApiGatewayService.prototype.extractValue = function (collection, key) {
        var value = collection[key];
        delete (collection[key]);
        return value;
    };
    ApiGatewayService.prototype.addCors = function (options) {
        options.headers['Access-Control-Allow-Origin'] = '*';
        return options;
    };
    ApiGatewayService.prototype.buildUrlSearchParams = function (params) {
        var searchParams = new http_1.URLSearchParams();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                searchParams.append(key, params[key]);
            }
        }
        return searchParams;
    };
    ApiGatewayService.prototype.interpolateUrl = function (options) {
        var _this = this;
        options.url = options.url.replace(/:([a-zA-Z]+[\w-]*)/g, function ($0, token) {
            // Try to move matching token from the params collection.
            if (options.params.hasOwnProperty(token)) {
                return (_this.extractValue(options.params, token));
            }
            // Try to move matching token from the data collection.
            if (options.data.hasOwnProperty(token)) {
                return (_this.extractValue(options.data, token));
            }
            // If a matching value couldn't be found, just replace
            // the token with the empty string.
            return ('');
        });
        // Clean up any repeating slashes.
        options.url = options.url.replace(/\/{2,}/g, '/');
        // Clean up any trailing slashes.
        options.url = options.url.replace(/\/+$/g, '');
        return options;
    };
    ApiGatewayService.prototype.unwrapHttpError = function (error) {
        try {
            return (error.json());
        }
        catch (jsonError) {
            return ({
                code: -1,
                message: 'An unexpected error occurred.'
            });
        }
    };
    ApiGatewayService.prototype.unwrapHttpValue = function (value) {
        return (value.json());
    };
    return ApiGatewayService;
}());
ApiGatewayService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_error_handler_service_1.HttpErrorHandlerService])
], ApiGatewayService);
exports.ApiGatewayService = ApiGatewayService;
//# sourceMappingURL=api-gateway.service.js.map