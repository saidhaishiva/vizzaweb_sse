import {Component, HostListener, OnInit, Inject} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {CommonService} from '../../shared/services/common.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dm-training',
  templateUrl: './dm-training.component.html',
  styleUrls: ['./dm-training.component.scss']
})
export class DmTrainingComponent implements OnInit {

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e) {
        this.timoutWarning = 54000000; // Display warning in 14 Mins.
        this.timoutNow = 54000000; // Timeout in 15 mins.
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
    trainingCompleted: any;


    startTime: boolean;
    startOnlineExam: boolean;
    public settings : Settings;
    constructor(public appSettings: AppSettings, public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {
        this.settings = this.appSettings.settings;
        setTimeout((time) => {
            this.settings.loadingSpinner = false;
        },700);
        this.trainingStatus = this.auth.getSessionData('dmTrainingStatus');
        console.log(this.trainingStatus, 'this.trainingStatus');
        this.getRemainingTime = '';
        this.getMinutes = '';
        this.startTime = true;
        this.startOnlineExam = false;
        // Set timeout variables.
        this.timoutWarning = 54000000; // Display warning in 14 Mins.
        this.timoutNow = 54000000; // Timeout in 15 mins.
        this.warningTimer = 0;
        this.timeoutTimer = 0;
        this.StartTimers();
        if (this.trainingStatus == 1) {
            this.trainingCompleted = true;
        } else {
            this.trainingCompleted = false;

        }
        console.log(this.trainingCompleted, 'this.trainingCompleted');


    }
    ngOnInit() {
        this.trainingTiming();

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
            sessionStorage.dmCheckoutTime = newtime;
            if (newtime == '00:00:00') {

                this.trainingCompleted = true;
                const getFulltime = test.getRemainingTime;
                // split the time
                let pieces = getFulltime.split(":");
                let hours = pieces[0];
                let minutes = pieces[1];
                let seconds = pieces[2];
                hours = hours == '00' ? 0 : hours;
                minutes = minutes == '00' ? 0 : minutes;
                let timeLeft = sessionStorage.dmTimeLeft;
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
                    sessionStorage.dmTimeLeft = '';
                }
                setTimeout(() => {
                    let dialogRef = test.dialog.open(DmTrainingcompletedAlert, {
                        width: '700px',
                    });

                    dialogRef.disableClose = true;
                    dialogRef.afterClosed().subscribe(result => {
                        if (result) {
                            test.sendRemainingTime(sendMinutes, 'leftTime');
                        } else {
                        }
                    });
                },800);
                // end

            } else {
                if (test.getRemainingTime != '') {
                    let h ;
                    let m ;
                    const getFulltime = test.getRemainingTime;
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
                    if (minutes != 0 || hours != 0) {
                        m = minutes;
                        sendMinutes = true;
                    } else if (hours == 0 && minutes == 0) {
                        m = timeLeft;
                        sendMinutes = false;
                    } else {
                        m = minutes;
                        sendMinutes = true;
                    }
                    if (sendMinutes) {
                        let remainingTime = parseInt(h) + parseInt(m);
                        console.log(remainingTime, 'remainingTime');
                        sendMinutes = timeLeft - remainingTime;
                    } else {
                        sendMinutes = timeLeft;
                        sessionStorage.timeLeft = '';
                    }
                    if (getFulltime != '00:00:00') {
                        console.log(sendMinutes, 'sendMinutes0');
                        if (sendMinutes >= 3) {
                            test.sendRemainingTime(sendMinutes, 'everyTime');
                            sessionStorage.checkoutTime = '';
                            // test.trainingTiming();
                        }
                    }
                }
                timeoutHandle=setTimeout(count, 1000);
            }

        }

        count();
    }

    public trainingTiming(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getDmRoleId() ? this.auth.getDmRoleId() : 19,
            'dm_id': this.auth.getDmUserId() ? this.auth.getDmUserId() : 0
        };
        this.learning.dmTrainingTiming(data).subscribe(
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
            sessionStorage.dmTimeLeft = time;
            let seconds = 0;
            let h = Math.floor(time / 60);
            let m = time % 60;
            h = h < 10 ? 0 + h : h;
            m = m < 10 ? 0 + m : m;
            console.log(h, 'h');
            console.log(m, 'minutes');
            if (sessionStorage.dmCheckoutTime != '' && sessionStorage.dmCheckoutTime != undefined) {
                // let fullTime = sessionStorage.dmCheckoutTime.split(":");
                // let hr = parseInt(fullTime[0]);
                // console.log(hr, 'hr');
                // let mins = parseInt(fullTime[1]);
                // let sec = parseInt(fullTime[2]);
                // console.log(hr +':'+ mins +':'+ sec, 'sessionStorage.dmCheckoutTime');
                document.getElementById('timer').innerHTML= sessionStorage.dmCheckoutTime;
                this.countdown(840);
            } else {
                document.getElementById('timer').innerHTML= h +':'+ m +':'+ seconds ;
                this.countdown(840);

            }

        }
    }
    public getTrainingTimingError(error) {

    }

    public sendRemainingTime(time, status): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getDmRoleId() ? this.auth.getDmRoleId() : 19,
            'dm_id': this.auth.getDmUserId() ? this.auth.getDmUserId() : 0,
            'time' : time
        };
        this.learning.sendDmRemainingTime(data).subscribe(
            (successData) => {
                this.sendTimeSuccess(successData, status);
            },
            (error) => {
                this.sendTimeTimingError(error);

            }
        );
    }
    public sendTimeSuccess(successData, status) {
        if (successData.IsSuccess) {
            this.trainingCompleted = true;
            console.log(successData.ResponseObject.training_status, 'successData.ResponseObject.training_status');
            this.auth.setSessionData('trainingStatus', successData.ResponseObject.training_status);
            this.trainingStatus = successData.ResponseObject.training_status;
            if (successData.ResponseObject.training_status == 1) {
                // this.router.navigate(['/home']);
            }
            if (status == 'everyTime') {
                this.trainingTiming();
            } else {

            }
        }
        console.log(successData, 'remainingg');
    }
    public sendTimeTimingError(error) {
        console.log(error);
    }


}
@Component({
    selector: 'dmtrainingcompletedalert',
    template: `
        <div mat-dialog-content class="text-center">
            <label>You have completed your training successfully. Get ready for your Examination. Do you want to continue?</label>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <!--<button mat-button class="secondary-bg-color" (click)="onNoClick()" >Cancel</button>-->
            <button mat-raised-button color="primary" [mat-dialog-close]="true" >Ok</button>
        </div>
    `

})
export class DmTrainingcompletedAlert {

    constructor(
        public dialogRef: MatDialogRef<DmTrainingcompletedAlert>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

