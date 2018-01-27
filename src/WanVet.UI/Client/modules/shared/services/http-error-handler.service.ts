﻿// CREDIT:
//  The vast majority of this code came right from Ben Nadel's post:
//  http://www.bennadel.com/blog/3047-creating-specialized-http-clients-in-angular-2-beta-8.htm
//
// My updates are mostly adapting it for Typescript:
//  1. Importing required modules
//  2. Adding type notations
//  3. Using the 'fat-arrow' syntax to properly scope in-line functions
//
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerService {

    constructor(private router: Router) { }

    handle(error: any) {
        if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(['unauthorized']);
        }
        if (error.status === 403) {
            localStorage.clear();
            this.router.navigate(['forbidden']);
        } else {
            this.router.navigate(['']);
        }
    }
}
