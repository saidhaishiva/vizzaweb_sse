import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}