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
    public colorScheme = {
        domain: ['#378D3B']
    };
    public colorScheme1 = {
        domain: ['red']
    };

    public settings: Settings;

    constructor(public appSettings: AppSettings) {
        let status = false;
        if (status) {
             this.single = [
                {
                    name: 'Pass',
                    value: 80,
                    status: 'pass'
                }
            ]
            this.examStatus = this.single[0].status;

        } else {
            this.single = [
                {
                    name: 'Fail',
                    value: 20,
                    status: 'fail'

                }
            ]
            this.examStatus = this.single[0].status;
        }

        this.settings = this.appSettings.settings;
        Object.assign(this.single);
    }

    public onSelect(event) {
        console.log(event);
    }

    ngOnInit() {
      console.log("hi");
    }
}

