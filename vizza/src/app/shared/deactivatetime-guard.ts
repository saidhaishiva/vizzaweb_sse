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
        let sendMinutes;
        if (minutes != 0) {
            m = minutes;
            sendMinutes = true;
        } else {
            m = timeLeft;
            sendMinutes = false;

        }
        // let stayTime = timeLeft - remainingTime;
        if (sendMinutes) {
            let remainingTime = parseInt(h) + parseInt(m);
            sendMinutes = timeLeft - remainingTime;;
        } else {
            sendMinutes = timeLeft;
            sessionStorage.timeLeft = '';
        }
        // end
        if (getFulltime != '00:00:00') {
            sendMinutes = 1;
           training.sendRemainingTime(sendMinutes, 'leftTime');
        }

        return true;
    }

}

