import { Component, OnInit, Inject } from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {AuthService} from '../../shared/services/auth.service';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {Router} from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-dm-exam',
  templateUrl: './dm-exam.component.html',
  styleUrls: ['./dm-exam.component.scss']
})
export class DmExamComponent implements OnInit {

    gethours: any;
    getMinutes: any;
    questionLists: any;
    allQuestionLists: any;
    startTime: boolean;
    startOnlineExam: boolean;
    selectedData: any;
    expired: boolean;
    public settings : Settings;
    constructor(@Inject(WINDOW) private window: Window, public appSettings: AppSettings, public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {
        this.settings = this.appSettings.settings;
        this.gethours = '';
        this.getMinutes = '';
        this.startTime = true;
        this.startOnlineExam = false;
        this.selectedData = [];
        this.expired = false;
        sessionStorage.backDmStatus = 'false';

    }
    ngOnInit() {
        this.getQuestions();
        this.countdown('45');
        this.window.addEventListener('beforeunload', function (e) {
            let confirmationMessage = '\o/';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });

    }
    countdown(minutes) {
        this.startTime = true;
        const test = this;
        let timeoutHandle;
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        let seconds = 60;
        let mins = m
        function tick() {
            let counter = document.getElementById("timer");
            let current_minutes = mins-1
            seconds--;
            counter.innerHTML = (current_minutes+ ":" + (seconds < 10 ? "0" : "") + String(seconds)).toString();
            setTimeout(() => {
                test.gethours = h;
                test.getMinutes = current_minutes;
            },1000);
            if( seconds > 0 ) {
                timeoutHandle=setTimeout(tick, 1000);
            } else {

                if(minutes > 1){
                    setTimeout(function () { test.countdown(minutes - 1); }, 1000);
                }
                if (current_minutes == 0) {
                    this.startTime = false;
                    this.expired = true;
                    test.submit();
                    document.getElementById("timer").innerHTML = "EXPIRED";

                }
            }

        }
        tick();
    }

    public getQuestions(): void {
        const data = {
            'platform': 'web',
            'dm_id': this.auth.getDmUserId(),
            'roleid': this.auth.getDmRoleId(),
            'userid': this.auth.getDmUserId()
        };
        this.learning.getDmQuestionLists(data).subscribe(
            (successData) => {
                this.getQuestionListsSuccess(successData);
            },
            (error) => {
                this.getQuestionListsError(error);
            }
        );
    }
    public getQuestionListsSuccess(successData) {
        if (successData.IsSuccess) {
            let options = [];
            this.questionLists = successData.ResponseObject;
            for (let i = 0; i < this.questionLists.length; i++) {
                options = [];
                this.questionLists[i].checkedStatus = '';
                if (this.questionLists[i].question != 'question') {
                    options.push(this.questionLists[i].option_a,this.questionLists[i].option_b,this.questionLists[i].option_c,this.questionLists[i].option_d);
                    this.questionLists[i].optionlist = options;
                }
            }
        }
    }
    public getQuestionListsError(error) {
    }
    selectOption(value, pi) {
    }
    // submit the test
    submit() {

        this.selectedData = [];
        for (let i = 0; i < this.questionLists.length; i++) {
            if (this.questionLists[i].checkedStatus != '') {
                this.selectedData.push({'questionid': this.questionLists[i].question_id, 'answer' : this.questionLists[i].checkedStatus});
            } else {
                this.selectedData.push({'questionid': this.questionLists[i].question_id, 'answer' : this.questionLists[i].checkedStatus});
            }
        }
        let total = this.selectedData.filter(data => data.answer == '');
        sessionStorage.unAnsweredQuestions = total.length;

        let dialogRef = this.dialog.open(DmConfrimAlert, {
            width: '500px', data:{total: total.length, expired: this.expired}});
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const data = {
                    'platform': 'web',
                    'dm_id': this.auth.getDmUserId(),
                    'question_details': this.selectedData
                };
                this.settings.loadingSpinner = true;
                this.learning.submitDmExam(data).subscribe(
                    (successData) => {
                        this.submitExamSuccess(successData);
                    },
                    (error) => {
                        this.submitExamError(error);
                    }
                );
            }
        });


    }
    public submitExamSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            sessionStorage.dmExamBack = 1;
            sessionStorage.dmAllQuestions = successData.ResponseObject.all_question_count;
            sessionStorage.dmCorrectAns = successData.ResponseObject.correct_answer_count;
            sessionStorage.dmExamPercentage = successData.ResponseObject.percentage;
            sessionStorage.dmExamStatus = successData.ResponseObject.exam_status;
            this.auth.setSessionData('dmExamStatus', successData.ResponseObject.exam_status);
           this.router.navigate(['/dm-viewresult']);
        }

    }
    public submitExamError(error) {
        this.settings.loadingSpinner = false;
    }

}
@Component({
    selector: 'dmconfrimalert',
    template: `
        <div mat-dialog-content class="text-center" *ngIf="!expiredStatus">
            <label>Total Number of unanswered questions = <span style="color: red">{{total}}</span></label><br>
            <label>Are you sure want to submit the Test now?</label>
        </div>
        <div mat-dialog-content class="text-center" *ngIf="expiredStatus">
            <label>Your time's up this is auto update on 2 seconds </label>

        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" *ngIf="!expiredStatus" (click)="onNoClick()" >Cancel</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="true" >Ok</button>
        </div>
    `

})
export class DmConfrimAlert {
    total: any;
    expiredStatus: boolean;
    constructor(
        public dialogRef: MatDialogRef<DmConfrimAlert>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.total = data.total;
        this.expiredStatus = data.expired;
        if (this.expiredStatus) {
            setTimeout((res)=> {
                this.dialogRef.close(true);
            },2000);
        }

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}




