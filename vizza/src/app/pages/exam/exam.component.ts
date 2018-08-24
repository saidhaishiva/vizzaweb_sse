import {Component, Inject, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ResultpageComponent} from './resultpage/resultpage.component';
import { Router} from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
    gethours: any;
    getMinutes: any;
    questionLists: any;
    getOptions: any;
    allQuestionLists: any;
    startTime: boolean;
    startOnlineExam: boolean;
    favoriteSeason: string;
    selectedData: any;
    seasons = [
        'Winter',
        'Spring',
        'Summer',
        'Autumn',
    ];
  constructor(public common: CommonService, public auth: AuthService, public learning: LearningcenterService, public dialog: MatDialog, public router: Router) {
      this.gethours = '';
      this.getMinutes = '';
      this.startTime = true;
      this.startOnlineExam = true;
      this.selectedData = [];



  }

  ngOnInit() {
    this.getQuestions();
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

    public sumInsuredAmonut(): void {
            const data = {
                'platform': 'web',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0
            };
        this.common.getSumInsuredAmount(data).subscribe(
            (successData) => {
                this.getSumInsuredAmountSuccess(successData);
            },
            (error) => {
            }
        );
    }
    public getSumInsuredAmountSuccess(successData) {
            if (successData.IsSuccess) {
              console.log(successData);
            }
    }


    public getQuestions(): void {
        const data = {
            'platform': 'web',
            'pos_id': '1'
        };
        this.learning.getQuestionLists(data).subscribe(
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
            console.log(successData);
            let options = [];
            this.questionLists = successData.ResponseObject;
            for (let i = 0; i < this.questionLists.length; i++) {
                options = [];
                this.questionLists[i].checkedStatus = '';
                if (this.questionLists[i].question != 'question') {
                    options.push(this.questionLists[i].option_a,this.questionLists[i].option_b,this.questionLists[i].option_c,this.questionLists[i].option_d,this.questionLists[i].option_e);
                    this.questionLists[i].optionlist = options;
                }
            }
            console.log(this.questionLists, 'this.allQuestionLists');
        }
    }
    public getQuestionListsError(error) {
        console.log(error);
    }

    startExam() {
      this.startOnlineExam = false;
      this.countdown('80');

    }
    selectOption(value, pi) {

    }

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
        console.log(total.length, 'lp');

        let dialogRef = this.dialog.open(ConfrimAlert, {
            width: '500px', data: total.length});
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(this.selectedData, 'pop');
                const data = {
                    'platform': 'web',
                    'pos_id': '1',
                    'question_details': this.selectedData
                };
                this.learning.submitExam(data).subscribe(
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
        console.log(successData, 'successData');
        if (successData.IsSuccess) {
            this.router.navigate(['/viewresult']);
        }

    }
    public submitExamError(error) {
        console.log(error, 'error');

    }



}
@Component({
    selector: 'confrimalert',
    template: `
        <div mat-dialog-content class="text-center">
            <label>Total Number of unanswered questions = <span style="color: red">{{total}}</span></label><br>
            <label>Are you sure want to submit the Test now?</label>

        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="onNoClick()" >Cancel</button>
            <button mat-raised-button color="primary" [mat-dialog-close]="true" >Ok</button>
        </div>
    `

})
export class ConfrimAlert {
    total: any;
    constructor(
        public dialogRef: MatDialogRef<ConfrimAlert>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.total = data;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

