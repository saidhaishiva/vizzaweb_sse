import { Component, OnInit, HostListener } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e) {
        console.log(e, 'eeee');
        this.timoutWarning = 300000; // Display warning in 14 Mins.
        this.timoutNow = 300000; // Timeout in 15 mins.
        this.ResetTimers();
    }
    getRemainingTime: any;
    getMinutes: any;
    allQuestionLists: any;

    warningTimer: any;
    timeoutTimer: any;
    timoutWarning: any;
    timoutNow: any;


    startTime: boolean;
    startOnlineExam: boolean;
    public settings : Settings;
    constructor(public appSettings: AppSettings, public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {

        this.settings = this.appSettings.settings;
        this.getRemainingTime = '';
        this.getMinutes = '';
        this.startTime = true;
        this.startOnlineExam = false;
        // Set timeout variables.
        this.timoutWarning = 300000; // Display warning in 14 Mins.
        this.timoutNow = 300000; // Timeout in 15 mins.
        this.warningTimer = 0;
        this.timeoutTimer = 0;
        this.StartTimers();


    }
    ngOnInit() {
      this.trainingTiming();
        // window.addEventListener('beforeunload', function (e) {
        //     let confirmationMessage = '\o/';
        //     e.returnValue = confirmationMessage;
        //     return confirmationMessage;
        // });
    }
    // Start timers.
    StartTimers() {
        this.warningTimer = setTimeout((res) => { this.IdleWarning() }, this.timoutWarning);
        this.timeoutTimer = setTimeout((res) => { this.IdleTimeout() }, this.timoutNow);
    }
    // Reset timers.
    ResetTimers() {
        clearTimeout(this.warningTimer);
        clearTimeout(this.timeoutTimer);
        this.StartTimers();
    }
    // Show idle timeout warning dialog.
    IdleWarning() {
       // alert('wring');
    }
    // Logout the user.
    IdleTimeout() {
        console.log('logout');
        this.router.navigate(['/home']);
    }

    countdown(minutes) {
        const test = this;
        let timeoutHandle;
        function count() {
           // let startTime = '15:00:00';
            let startTime = document.getElementById('timer').innerHTML;
            let pieces = startTime.split(":");
            console.log(pieces, 'pieces');
            let time = new Date();
            time.setHours(parseInt(pieces[0]));
            time.setMinutes(parseInt(pieces[1]));
            time.setSeconds(parseInt(pieces[2]));
            let timedif = new Date(time.valueOf() - 1000);
            let newtime = timedif.toTimeString().split(" ")[0];
            document.getElementById('timer').innerHTML=newtime;
            console.log(newtime, 'newtime');

            if (newtime == '00:00:00') {

            } else {
                test.getRemainingTime = newtime;
                sessionStorage.checkoutTime = newtime;
            }
            timeoutHandle=setTimeout(count, 1000);

        }
        count();









        // this.startTime = true;
        // const test = this;
        // let timeoutHandle;
        // console.log(minutes, 'minutesminutes');
        // let h = Math.floor(minutes / 60);
        // console.log(h, 'firsty');
        // // let hours = 0;
        // // if (h > 0) {
        // //     hours = h-1;
        // // } else {
        // //     hours = 0;
        // // }
        // console.log(h, 'hh');
        // let m = minutes % 60;
        // console.log(m, 'mm');
        //
        // let seconds = 60;
        // let mins = m;
        // // let mins = 0;
        // // if (m > 0) {
        // //     mins = m-1;
        // // } else {
        // //     mins = 60;
        // // }
        //
        // function tick() {
        //
        //     let counter = document.getElementById("timer");
        //     let current_minutes = mins-1;
        //     seconds--;
        //     counter.innerHTML = (h+ ":" +
        //         current_minutes+ ":" + (seconds < 10 ? "0" : "") + String(seconds)).toString();
        //
        //
        //     setTimeout(() => {
        //         test.gethours = h;
        //         test.getMinutes = current_minutes;
        //     },1500);
        //
        //
        //     if( seconds > 0 ) {
        //
        //         timeoutHandle=setTimeout(tick, 1000);
        //     } else {
        //
        //         if(minutes > 1){
        //             setTimeout(function () { test.countdown(minutes - 1); }, 1000);
        //         }
        //         if (current_minutes == 0) {
        //             this.startTime = false;
        //             document.getElementById("demo").innerHTML = "EXPIRED";
        //
        //         }
        //
        //     }
        //
        // }
        // tick();
    }
    // testy(val) {
    //     this.countdown(val);
    //
    // }


    public trainingTiming(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : 0
        };
        this.learning.trainingTiming(data).subscribe(
            (successData) => {
                this.getTrainingTimingSuccess(successData);
            },
            (error) => {
                this.getTrainingTimingError(error);
            }
        );
    }
    public getTrainingTimingSuccess(successData) {
        if (successData.IsSuccess) {
            console.log(successData.ResponseObject.pending_time_left);
            let time = successData.ResponseObject.pending_time_left;
            sessionStorage.timeLeft = time;
            let seconds = 0;
            let h = Math.floor(time / 60);
            let m = time % 60;
            h = h < 10 ? 0 + h : h;
            m = m < 10 ? 0 + m : m;
            console.log(m, 'minutes');
            if (sessionStorage.checkoutTime != '' && sessionStorage.checkoutTime != undefined) {
                // alert(sessionStorage.checkoutTime);
                // let fullTime = sessionStorage.checkoutTime.split(":");
                // let hr = parseInt(fullTime[0]);
                // console.log(hr, 'hr');
                // let mins = parseInt(fullTime[1]);
                // let sec = parseInt(fullTime[2]);
                // console.log(hr +':'+ mins +':'+ sec, 'sessionStorage.checkoutTime');
                document.getElementById('timer').innerHTML= sessionStorage.checkoutTime;
                this.countdown(840);
            } else {
                document.getElementById('timer').innerHTML= h +':'+ m +':'+ seconds ;
                this.countdown(840);

            }

        }
    }
    public getTrainingTimingError(error) {

    }

    public sendRemainingTime(time): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : 0,
            'time' : time
        };
        this.learning.sendRemainingTime(data).subscribe(
            (successData) => {
                this.sendTimeSuccess(successData);
            },
            (error) => {
                this.sendTimeTimingError(error);

            }
        );
    }
    public sendTimeSuccess(successData) {
            console.log(successData, 'remainingg');
    }
    public sendTimeTimingError(error) {
            console.log(error);
    }


}
