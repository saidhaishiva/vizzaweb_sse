import { CanDeactivate } from '@angular/router';
import { TrainingComponent} from '../pages/training/training.component';
import {AuthService} from './services/auth.service';
import {CommonService} from './services/common.service';
import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

export  class DeactivatetimeGuard implements CanDeactivate<TrainingComponent> {
    canDeactivate(training: TrainingComponent) {
        sessionStorage.checkoutTime = '';
        console.log(training, 'candeactivate');
        let h ;
        let m ;
        const getFulltime = training.getRemainingTime;
        // split the time
        let pieces = getFulltime.split(":");
        let hours = pieces[0];
        let minutes = pieces[1];
        let seconds = pieces[2];
        hours = hours == '00' ? 0 : hours;
        minutes = minutes == '00' ? 0 : minutes;
        let timeLeft = sessionStorage.timeLeft;
        if (hours != 0) {
            h = hours * 60;
        } else {
            h = 0;
        }
        if (minutes != 0) {
            m = minutes;
        } else {
            m = timeLeft;
        }
        let remainingTime = parseInt(h) + parseInt(m);
        console.log(remainingTime, 'remainingTime');
        // let stayTime = timeLeft - remainingTime;

        let sendMinutes;
        if (remainingTime == 0) {
            sendMinutes = timeLeft;
        } else {
            sendMinutes = timeLeft - remainingTime;;
        }
        // end
        if (getFulltime != '00:00:00') {
           training.sendRemainingTime(sendMinutes);
        }

        return true;
    }

}

