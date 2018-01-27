import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { Observable } from "rxjs/Observable";


@Component({
    selector: '.userBox',
    templateUrl: 'user-box.component.html',
    styleUrls: ['user-box.component.scss']
})
export class UserBoxComponent implements OnInit {
    constructor(private authService: AuthService, protected userService: UserService, private router: Router) {

    }

    public ngOnInit() {
    }

    private Logoff = (): void => {
        this.router.navigate(['/']);
        this.authService.logoff();
    }

    private Enroll(): void {
        this.userService
            .createUser(this.authService.email, this.authService.familyName,
            this.authService.givenName, this.authService.phoneNumber, this.authService.gender, this.authService.isDoctor)
            .subscribe((success: Boolean) => {
                if (success) {
                    this.userService.isEnrolled = true;
                }
            });
    }
}
