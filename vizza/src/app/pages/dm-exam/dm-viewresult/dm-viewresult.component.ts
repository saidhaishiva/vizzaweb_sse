import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-dm-viewresult',
  templateUrl: './dm-viewresult.component.html',
  styleUrls: ['./dm-viewresult.component.scss']
})
export class DmViewresultComponent implements OnInit {

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
        this.allQuestions = sessionStorage.dmAllQuestions;
        this.answeredQuestions = this.allQuestions - this.unAnsweredQuestions;
        this.correctAns = sessionStorage.dmCorrectAns;
        this.examPercentage = sessionStorage.dmExamPercentage;
        this.examStatus = sessionStorage.dmExamStatus;
        console.log(this.examStatus, 'examStatus');
        let perQuestionMark = 2;
    }

    public onSelect(event) {
        console.log(event);
    }

    ngOnInit() {
        // console.log("hi");
    }
}

