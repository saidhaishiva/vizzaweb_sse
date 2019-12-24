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
        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            this.proposalId = params.proId;
            this.applicationNo = params.applicationNo;
        });
        let groupDetails = JSON.parse(sessionStorage.groupDetails);
        console.log(sessionStorage.groupDetails,'sessionStorage.groupDetails');
        for(let i = 0; i < groupDetails.family_groups.length; i++) {
            if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
                groupDetails.family_groups[i].status = 1;
            }
            console.log(sessionStorage.changedTabIndex,'sessionStorage.changedTabIndex');
        }
        let status = groupDetails.family_groups.filter(data => data.status == 0);
        if(status.length > 0) {
            this.remainingStatus = true;
        }
        sessionStorage.groupDetails = JSON.stringify(groupDetails);
        console.log(sessionStorage.groupDetails, 'sessionStorage.groupDetails' )

    }

  ngOnInit() {
  }
    retry() {
        this.router.navigate(['/appollo-health'  + '/' + true]);
    }
    pay(){
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        this.router.navigate(['/healthinsurance']);
    }



}
