import { Component, OnInit, HostListener } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {RouterModule, Router} from '@angular/router';
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
        this.timoutWarning = 300000; // Display warning in 14 Mins.
        this.timoutNow = 300000; // Timeout in 15 mins.
        this.ResetTimers();
    }
    getRemainingTime: any;
    getMinutes: any;
    allQuestionLists: any;
    trainingStatus: any;

    warningTimer: any;
    timeoutTimer: any;
    timoutWarning: any;
    timoutNow: any;


    startTime: boolean;
    startOnlineExam: boolean;
    public settings : Settings;
    constructor(public appSettings: AppSettings, public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {
        this.settings = this.appSettings.settings;
        setTimeout((time) => {
            this.settings.loadingSpinner = false;
        },700);
        this.trainingStatus = this.auth.getSessionData('trainingStatus');
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
        let timeStatus = 0;
        let h ;
        let m ;
        function count() {
           // let startTime = '15:00:00';
            let startTime = document.getElementById('timer').innerHTML;
            let pieces = startTime.split(":");
            let time = new Date();
            time.setHours(parseInt(pieces[0]));
            time.setMinutes(parseInt(pieces[1]));
            time.setSeconds(parseInt(pieces[2]));
            let timedif = new Date(time.valueOf() - 1000);
            let newtime = timedif.toTimeString().split(" ")[0];
            document.getElementById('timer').innerHTML=newtime;
            test.getRemainingTime = newtime;
            sessionStorage.checkoutTime = newtime;
            if (newtime == '00:00:00') {
                const getFulltime = test.getRemainingTime;
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
                    console.log(remainingTime, 'remainingTime');
                    sendMinutes = timeLeft - remainingTime;;
                } else {
                    sendMinutes = timeLeft;
                    sessionStorage.timeLeft = '';
                }
                // end
                test.sendRemainingTime(sendMinutes);
            } else {
                timeoutHandle=setTimeout(count, 1000);
            }

        }

        count();
    }

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
        if (successData.IsSuccess) {
            this.auth.setSessionData('trainingStatus', successData.ResponseObject.training_status);
            if (successData.ResponseObject.training_status == 1) {
                // this.router.navigate(['/home']);
            }
        }
            console.log(successData, 'remainingg');
    }
    public sendTimeTimingError(error) {
            console.log(error);
    }


}
