import { Component, OnInit, Inject } from '@angular/core';
import {HealthService} from '../../shared/services/health.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { WINDOW } from '@ng-toolkit/universal';



@Component({
    selector: 'app-hdfc-health-payment-success',
    templateUrl: './hdfc-health-payment-success.component.html',
    styleUrls: ['./hdfc-health-payment-success.component.scss']
})
export class HdfcHealthPaymentSuccessComponent implements OnInit {

public paymentStatus: any
public currenturl: any
public type: any
public path: any
public proposalId: any
public policyStatus: any
public remainingStatus: any
public eAcceptanceTerm: any
public policyidd: any
public settings: Settings;

constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService, public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.remainingStatus = false;
    this.route.params.forEach((params) => {
        console.log(params.id);
        this.paymentStatus = params.status;
        console.log(params.id);

        this.proposalId = params.proId;
        this.policyStatus = params.policyStatus;
    });
    let groupDetails = JSON.parse(sessionStorage.groupDetails);
    for(let i = 0; i < groupDetails.family_groups.length; i++) {
        if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
            groupDetails.family_groups[i].status = 1;
        }
    }
    let status = groupDetails.family_groups.filter(data => data.status == 0);
    if(status.length > 0) {
        this.remainingStatus = true;
    }
    sessionStorage.groupDetails = JSON.stringify(groupDetails);

}
ngOnInit() {
    this.gethdfcPolicynum();
    // sessionStorage.hdfc_health_proposal_id = '';
    // sessionStorage.hdfcStep1 = '';
    // sessionStorage.hdfcStep2 = '';
    // sessionStorage.hdfcHealthNomineeDetails = '';
    // sessionStorage.sameAsinsure = '';
    // sessionStorage.pincodeValid = '';
    // sessionStorage.hdfcHealthProposerAge = '';
    // sessionStorage.hdfcHealthInsurerAge = '';
    // sessionStorage.buyProductdetails = '';
    // sessionStorage.changedTabDetails = '';

}

DownloadPdf() {
    const data = {
        'mail_status': '1',
        'proposal_id' : this.proposalId,
        'platform': 'web',
        'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    }
    this.settings.loadingSpinner = true;
    this.proposalservice.getDownloadPdfHdfc(data).subscribe(
        (successData) => {
            this.downloadPdfSuccess(successData);
        },
        (error) => {
            this.downloadPdfFailure(error);
        }
    );

}
public downloadPdfSuccess(successData) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess == true) {
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;

        this.currenturl = this.config.getimgUrl();
        if (this.type == 'pdf') {
            console.log(successData.ResponseObject, 'www333');
            this.window.open(this.currenturl + '/' +  this.path,'_blank');
        } else if (this.type === 'pdf') {
            console.log(successData.ResponseObject, 'www3444');
            this.window.open(this.currenturl + '/' +  this.path,'_blank');
        } else {
            this.downloadMessage();
        }
    } else {
        this.toast.error(successData.ErrorObject);

    }

}
public downloadPdfFailure(error) {
    this.settings.loadingSpinner = false;
    console.log(error);
}



    gethdfcPolicynum() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'policy_id':this.proposalId

        }
        this.proposalservice.hdfcPolicynum(data).subscribe(
            (successData) => {
                this.geteacceptanceTermSuccess(successData);
            },
            (error) => {
                this.geteacceptanceTermFailure(error);
            }
        );
    }

    public geteacceptanceTermSuccess(successData) {
        if (successData.IsSuccess) {
            this.eAcceptanceTerm = successData.ResponseObject;
            this.policyidd = this.eAcceptanceTerm.policy_no;
            console.log(this.policyidd,'ghfh');

        }
    }

    public geteacceptanceTermFailure(error) {
    }
    retry() {
        this.router.navigate(['/hdfc-proposal'  + '/' + true]);
    }
    pay(){
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        // this.router.navigate(['/healthinsurance']);
         this.router.navigate(['/healthinsurance']);
    }

    downloadMessage() {
    const dialogRef = this.dialog.open(DownloadMessageHdfcHealth, {
        width: '400px',
        data: this.path

    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
}


}
@Component({
    selector: 'downloadmessagehdfchealth',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessageHdfcHealth {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessageHdfcHealth>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}


