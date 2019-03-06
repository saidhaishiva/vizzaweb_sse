import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-apollomunich-payment-success',
  templateUrl: './apollomunich-payment-success.component.html',
  styleUrls: ['./apollomunich-payment-success.component.scss']
})
export class ApollomunichPaymentSuccessComponent implements OnInit {

    public paymentStatus: any
    public type: any
    public path: any
    public proposalId: any
    public remainingStatus: any
    public applicationNo: any
    public settings: Settings;

    constructor(public config: ConfigurationService,public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.remainingStatus = false;

        // let allDetails = JSON.parse(sessionStorage.allGroupDetails);
        // if(allDetails.length > 1) {
        //     this.remainingStatus = true;
        // }
        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            this.proposalId = params.proId;
            this.applicationNo = params.applicationNo;
        });
    }

  ngOnInit() {
  }
    retry() {
        this.router.navigate(['/appollo-munich-health'  + '/' + true]);
    }
    pay(){
        let changedTabDetails = JSON.parse(sessionStorage.changedTabDetails);
        let allGroupDetails = JSON.parse(sessionStorage.allGroupDetails);
        for (let i = 0; i < allGroupDetails.length; i++) {
            if(allGroupDetails[i].name == changedTabDetails.name) {
                allGroupDetails.splice(i, 1);
            }
        }
        sessionStorage.policyLists = JSON.stringify({index: 0, value: allGroupDetails});
        this.router.navigate(['/healthinsurance']);
    }



}
