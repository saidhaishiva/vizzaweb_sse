import { CanDeactivate } from '@angular/router';
import { ExamComponent} from '../pages/exam/exam.component';
import {AuthService} from './services/auth.service';
import {CommonService} from './services/common.service';
import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

export  class ExamdeactivatetimeGuard implements CanDeactivate<ExamComponent> {
    // constructor(private authService: AuthService) { }

    canDeactivate(training: ExamComponent) {
        console.log(training, 'candeactivate');
        const status = false;
        if (status) {
            return true;
        } else {
           // alert("You can't move the another page until complete your exam");
            return true;
        }
    }

}

