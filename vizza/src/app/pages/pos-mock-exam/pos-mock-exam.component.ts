import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {CommonService} from '../../shared/services/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pos-mock-exam',
  templateUrl: './pos-mock-exam.component.html',
  styleUrls: ['./pos-mock-exam.component.scss']
})
export class PosMockExamComponent implements OnInit {
  public questionLists: any;
  public selectedData: any;
  public custumerId: any;

  constructor(public auth: AuthService, public common: CommonService, public route: ActivatedRoute, public router: Router) {
    this.route.params.forEach((params) => {
      console.log(params.custumerId);
      this.custumerId = params.custumerId;
    });
    this.selectedData = [];
  }

  ngOnInit() {
    this.getQuestions();
  }

  public getQuestions(): void {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
    };
    this.common.mockQuestions(data).subscribe(
        (successData) => {
          this.mockQuestionSuccess(successData);
        },
        (error) => {
          this.mockQuestionFailure(error);
        }
    );
  }
  public mockQuestionSuccess(successData) {
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
  public mockQuestionFailure(error) {}

  selectOption(value, pi) {}

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
        const data = {
          'platform': 'web',
          'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
          'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
          'customer_id': this.custumerId,
          'question_details': this.selectedData
        };
        this.common.mockExamSubmit(data).subscribe(
            (successData) => {
              this.mockExamSuccess(successData);
            },
            (error) => {
              this.mockExamError(error);
            }
        );
  }
  public mockExamSuccess(successData) {
    if (successData.IsSuccess) {
      sessionStorage.customerid = successData.ResponseObject.customer_id;
      sessionStorage.allQuestions = successData.ResponseObject.all_question_count;
      sessionStorage.correctAns = successData.ResponseObject.correct_answer_count;
      sessionStorage.examPercentage = successData.ResponseObject.percentage;
      sessionStorage.examStatus = successData.ResponseObject.exam_status;
      this.auth.setSessionData('examStatus', successData.ResponseObject.exam_status);
      this.router.navigate(['/mock-result']);
    }
  }
  public mockExamError(error) {}

}
