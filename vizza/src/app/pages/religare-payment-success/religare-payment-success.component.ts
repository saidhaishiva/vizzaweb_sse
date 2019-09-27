import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';
import {CommonService} from '../../shared/services/common.service';


@Component({
  selector: 'app-religare-payment-success',
  templateUrl: './religare-payment-success.component.html',
  styleUrls: ['./religare-payment-success.component.scss']
})
export class ReligarePaymentSuccessComponent implements OnInit {
    public paymentStatus: any
    public currenturl: any
    public type: any
    public path: any
    public proposalId: any
    public remainingStatus: any
    public setArray: any
    public insuranceLists: any
    public getArray: any
    public finalData: any
    public selectedAmount: any
    public pincoce: any
    public allCompanyList: any
    public filterCompany: any
    public allGroupDetails: any
    public policyNo: any
    public policyStatus: any
    public settings: Settings;

    constructor(public config: ConfigurationService, public router: Router,public healthService: HealthService ,public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.remainingStatus = false;
        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            this.policyStatus = params.policyStatus;
            this.proposalId = params.proId;
            this.policyNo = params.policyNo;
        });
        // let groupDetails = JSON.parse(sessionStorage.groupDetails);
        // console.log(groupDetails.family_groups[sessionStorage.changedTabIndex].name, 'name');
        // console.log(sessionStorage.changedTabIndex, 'indx');
        // for(let i = 0; i < groupDetails.family_groups.length; i++) {
        //     console.log('in');
        //     if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
        //         console.log('outt');
        //         groupDetails.family_groups[i].status = 1;
        //     }
        // }
        // let status = groupDetails.family_groups.filter(data => data.status == 0);
        // if(status.length > 0) {
        //     this.remainingStatus = true;
        // }
        // sessionStorage.groupDetails = JSON.stringify(groupDetails);
    }
  ngOnInit() {
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
        this.proposalservice.getDownloadPdfReligare(data).subscribe(
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
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;
        if (successData.IsSuccess == true) {
            console.log(this.type, 'ww22');

            this.currenturl = this.config.getimgUrl();
            if (this.type == 'pdf') {
                console.log(successData.ResponseObject, 'www333');
                window.open(this.currenturl + '/' +  this.path,'_blank');
            } else if (this.type === 'pdf') {
                console.log(successData.ResponseObject, 'www3444');
                window.open(this.currenturl + '/' +  this.path,'_blank');
            } else {
                this.downloadMessage();
            }
        } else {
            this.settings.loadingSpinner = false;
            this.toast.error(successData.ErrorObject);
        }

    }
    public downloadPdfFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }
    retry() {
        this.router.navigate(['/religare-health-proposal'  + '/' + true]);
    }
    pay() {
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        this.router.navigate(['/healthinsurance']);
    }


    downloadMessage() {
    const dialogRef = this.dialog.open(DownloadMessageReligare, {
        width: '400px',
        data: this.path

    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
}


}
@Component({
    selector: 'downloadmessagereligare',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessageReligare {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessageReligare>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}

