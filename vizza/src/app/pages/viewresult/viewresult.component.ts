import { Component, OnInit } from '@angular/core';
import { AppSettings} from '../../app.settings';
import { Settings} from '../../app.settings.model';

@Component({
  selector: 'app-viewresult',
  templateUrl: './viewresult.component.html',
  styleUrls: ['./viewresult.component.scss']
})
export class ViewresultComponent implements OnInit {
    public single: any[];
    public multi: any[];
    public showLegend = true;
    public gradient = true;
    examStatus: any;
    examStatus1: any;
    unAnsweredQuestions: any;
    allQuestions: any;
    correctAns: any;
    examPercentage: any;
    answeredQuestions: any;
    public colorScheme = {
        domain: ['#378D3B']
    };
    public colorScheme1 = {
        domain: ['red']
    };

    public settings: Settings;

    constructor(public appSettings: AppSettings) {
        this.unAnsweredQuestions = sessionStorage.unAnsweredQuestions;
        this.allQuestions = sessionStorage.allQuestions;
        this.answeredQuestions = this.allQuestions - this.unAnsweredQuestions;
        this.correctAns = sessionStorage.correctAns;
        this.examPercentage = sessionStorage.examPercentage;
        this.examStatus = sessionStorage.examStatus;
        console.log(this.examStatus, 'examStatus');
        let perQuestionMark = 2;
        // let marks = (this.correctAns * perQuestionMark);
        // console.log(marks, 'status');
        // let status;
        // if (sessionStorage.examStatus == 1) {
        //     this.single = [
        //         {
        //             name: 'Pass',
        //             value: this.examPercentage,
        //             status: 'pass'
        //         }
        //     ]
        //     this.examStatus = this.single[0].status;
        // } else {
        //     this.single = [
        //         {
        //             name: 'Fail',
        //             value: this.examPercentage,
        //             status: 'fail'
        //
        //         }
        //     ]
        //     this.examStatus = this.single[0].status;
        // }
        //
        // this.settings = this.appSettings.settings;
        // Object.assign(this.single);
    }

    public onSelect(event) {
        console.log(event);
    }

    ngOnInit() {
      console.log("hi");
    }
}

