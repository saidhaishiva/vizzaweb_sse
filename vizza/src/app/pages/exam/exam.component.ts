import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {LearningcenterService} from '../../shared/services/learningcenter.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
    gethours: any;
    getMinutes: any;
    questionLists: any;
    allQuestionLists: any;
    startTime: boolean;
    startOnlineExam: boolean;
    favoriteSeason: string;
    seasons = [
        'Winter',
        'Spring',
        'Summer',
        'Autumn',
    ];
  constructor(public common: CommonService, public auth: AuthService, public learning: LearningcenterService) {
      this.gethours = '';
      this.getMinutes = '';
      this.startTime = true;
      this.startOnlineExam = true;



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
            'adminid': '1',
            'subjectid': '3'
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
                options.push({'option_a':this.questionLists[i].option_a}, {'option_b':this.questionLists[i].option_b}, {'option_c':this.questionLists[i].option_c}, {'option_d':this.questionLists[i].option_d}, {'option_e':this.questionLists[i].option_e});
            }

            this.allQuestionLists = this.questionLists.concat(options);
            console.log(this.allQuestionLists, 'this.allQuestionLists');

        }
    }
    public getQuestionListsError(error) {
        console.log(error);
    }

    startExam() {
      this.startOnlineExam = false;
      this.countdown('80');

    }



}
