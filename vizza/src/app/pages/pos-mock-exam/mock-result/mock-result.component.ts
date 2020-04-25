import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mock-result',
  templateUrl: './mock-result.component.html',
  styleUrls: ['./mock-result.component.scss']
})
export class MockResultComponent implements OnInit {
  public unAnsweredQuestions: any;
  public allQuestions: any;
  public answeredQuestions: any;
  public correctAns: any;
  public examPercentage: any;
  public examStatus: any;
  public customerId: any;

  constructor(public router: Router) {
    this.customerId = sessionStorage.customerid;
    this.unAnsweredQuestions = sessionStorage.unAnsweredQuestions;
    this.allQuestions = sessionStorage.allQuestions;
    this.answeredQuestions = this.allQuestions - this.unAnsweredQuestions;
    this.correctAns = sessionStorage.correctAns;
    this.examPercentage = sessionStorage.examPercentage;
    this.examStatus = sessionStorage.examStatus;
  }

  ngOnInit() {
  }
  // backtologin(){
  //   this.router.navigate(['/POS-Mock_Test']);
  // }
  reExam() {
    this.router.navigate(['/POS-Mock-Exam/' + this.customerId]);
  }

}
