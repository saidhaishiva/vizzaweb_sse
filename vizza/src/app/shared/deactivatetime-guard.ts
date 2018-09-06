import { CanDeactivate } from '@angular/router';
import { TrainingComponent} from '../pages/training/training.component';
import {AuthService} from './services/auth.service';
import {CommonService} from './services/common.service';
import {Observable} from 'rxjs/Observable';
import {OnInit} from '@angular/core';

export  class DeactivatetimeGuard implements CanDeactivate<TrainingComponent> {
    // constructor(private authService: AuthService) { }

    canDeactivate(training: TrainingComponent) {
        sessionStorage.checkoutTime = '';
        console.log(training, 'candeactivate');
        let h ;
        let m ;
        const getFulltime = training.getRemainingTime;
        let pieces = getFulltime.split(":");

        let hours = pieces[0];
        let minutes = pieces[1];
        let seconds = pieces[2];
        if (hours != 0) {
            h = hours * 60;
        }
        if (minutes != 0) {
            m = minutes;
        }

        let remainingTime = parseInt(h) + parseInt(m);
        console.log(remainingTime, 'remainingTimewwww');

        let timeLeft = sessionStorage.timeLeft;
        let stayTime = timeLeft - remainingTime;

        console.log(stayTime, 'stayTime');

        // training.sendRemainingTime(remainingTime);

        // const getMinutes = training.getMinutes;
        // if (gethours != 0) {
        //     h = gethours * 60;
        // }
        // if (getMinutes != 0) {
        //     m = getMinutes;
        // }
        // console.log(h, 'h');
        // console.log(m, 'm');
        //
        // console.log(h + m, 'totllal');
        // let hours = h != undefined || h != '' ? h : 0 ;
        // let minutes = m != undefined || m != '' ? m : 0 ;
        // let remainingTime = hours + minutes;


        // console.log(training);


        return true;
    }

}

