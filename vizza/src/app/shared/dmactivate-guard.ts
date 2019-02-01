import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthService} from './services/auth.service';

@Injectable()
export class DmexamactivateGuard implements CanActivate {
    constructor(private router: Router, public auth: AuthService) {}
    canActivate() {
    const status = this.auth.getSessionData('dmTrainingStatus');
        if (status == '1') {
            return true;
        } else {
            alert("Please complete training before applying the exam");
            return false;
        }
    }
}