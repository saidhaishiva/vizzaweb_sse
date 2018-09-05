import { Component, OnInit } from '@angular/core';
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
    gethours: any;
    getMinutes: any;
    questionLists: any;
    getOptions: any;
    allQuestionLists: any;
    startTime: boolean;
    startOnlineExam: boolean;
    public settings : Settings;
    constructor(public appSettings: AppSettings, public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {

        this.settings = this.appSettings.settings;
        this.gethours = '';
        this.getMinutes = '';
        this.startTime = true;
        this.startOnlineExam = false;

    }
    ngOnInit() {
      this.trainingTiming();
    }

    countdown(minutes) {
        this.startTime = true;
        const test = this;
        let timeoutHandle;
        let h = Math.floor(minutes / 60);
        console.log(h, 'hh');
        let m = minutes % 60;
        console.log(m, 'mm');

        let seconds = 60;
        let mins = m;
        function tick() {

            let counter = document.getElementById("timer");
            let current_minutes = mins-1
            seconds--;
            counter.innerHTML = (h+ ":" +
                current_minutes+ ":" + (seconds < 10 ? "0" : "") + String(seconds)).toString();


            setTimeout(() => {
                test.gethours = h;
                test.getMinutes = current_minutes;
            },1500);


            if( seconds > 0 ) {

                timeoutHandle=setTimeout(tick, 1000);
            } else {

                if(minutes > 1){
                    setTimeout(function () { test.countdown(minutes - 1); }, 1000);
                }
                if (current_minutes == 0) {
                    this.startTime = false;
                    document.getElementById("demo").innerHTML = "EXPIRED";

                }

            }

        }
        tick();
    }
    testy(val) {
        this.countdown(val);

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
            console.log(successData.ResponseObject);
            this.countdown('900');

        }
    }
    public getTrainingTimingError(error) {

    }

    public sendRemainingTime(time): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
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
