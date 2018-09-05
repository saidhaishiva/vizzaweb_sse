import { CanDeactivate } from '@angular/router';
import { TrainingComponent} from '../pages/training/training.component';
import {AuthService} from './services/auth.service';
import {CommonService} from './services/common.service';
import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

export  class DeactivatetimeGuard implements CanDeactivate<TrainingComponent> {
    // constructor(private authService: AuthService) { }

    canDeactivate(training: TrainingComponent) {
        console.log(training, 'candeactivate');
        let h ;
        let m ;
        const gethours = training.gethours;
        const getMinutes = training.getMinutes;
        if (gethours != 0) {
            h = gethours * 60;
        }
        if (getMinutes != 0) {
            m = getMinutes;
        }
        console.log(h, 'h');
        console.log(m, 'm');
        console.log(h != undefined ? h : 0 + m !=undefined ? m : 0, 'gethours');
        let remainingTime = h != undefined ? h : 0 + m !=undefined ? m : 0
        training.sendRemainingTime(remainingTime);

        console.log(gethours, 'gethours');
        console.log(getMinutes, 'getMinutes');
        console.log(training);


        return true;
    }

}

