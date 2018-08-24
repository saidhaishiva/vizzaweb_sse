import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AuthService} from './services/auth.service';

@Injectable()
export class ExamactivateGuard implements CanActivate {
    constructor(private router: Router, public auth: AuthService) {}
    canActivate() {
        const res = this.auth.getPosStatus();
        console.log(res);
        if (res == '1') {
            return true;
        } else {
            return false;
        }
    }
}