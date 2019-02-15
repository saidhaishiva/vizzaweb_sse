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
  selector: 'app-reliance-payment-success',
  templateUrl: './reliance-payment-success.component.html',
  styleUrls: ['./reliance-payment-success.component.scss']
})
export class ReliancePaymentSuccessComponent implements OnInit {

    public paymentStatus: any
    public currenturl: any
    public type: any
    public path: any
    public proposalId: any
    public mailstatus: any
    public remainingStatus: any

    public settings: Settings;


    constructor(public config: ConfigurationService,public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;

        let allDetails = JSON.parse(sessionStorage.allGroupDetails);
        this.remainingStatus = false;
        if(allDetails.length > 1) {
            this.remainingStatus = true;
        }

        this.route.params.forEach((params) => {
            console.log(params.id);
            this.paymentStatus = params.status;
            this.proposalId = params.proId;
            this.proposalId = params.proId;
            this.mailstatus = params.mailstatus;

        });
    }

  ngOnInit() {
  }
    DownloadPdf() {
        const data = {
            'mail_status': this.mailstatus,
            'proposal_id' : this.proposalId,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
        this.settings.loadingSpinner = true;
        this.proposalservice.getDownloadPdfReliance(data).subscribe(
            (successData) => {
                this.downloadPdfSuccess(successData);
            },
            (error) => {
                this.downloadPdfFailure(error);
            }
        );

    }
    public downloadPdfSuccess(successData) {
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;
        this.settings.loadingSpinner = false;
        console.log(this.path, 'this.paththis.paththis.path');

        if (successData.IsSuccess == true) {
            if (this.type == 'pdf') {
                window.open(this.path, '_self' );
            }
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }
    retry() {
        this.router.navigate(['/reliance-heath-proposal'  + '/' + true]);
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
