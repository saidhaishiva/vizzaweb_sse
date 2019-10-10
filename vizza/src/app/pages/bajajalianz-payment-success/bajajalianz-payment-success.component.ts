import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-bajajalianz-payment-success',
  templateUrl: './bajajalianz-payment-success.component.html',
  styleUrls: ['./bajajalianz-payment-success.component.scss']
})
export class BajajalianzPaymentSuccessComponent implements OnInit {
    public paymentStatus: any
    public currenturl: any
    public type: any
    public path: any
    public proposalId: any
    public mailstatus: any
    public remainingStatus: any

    public settings: Settings;
  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService,public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
      this.settings = this.appSettings.settings;
      this.remainingStatus = false;
      this.route.params.forEach((params) => {
          this.paymentStatus = params.status;
          this.proposalId = params.proId;
          this.proposalId = params.proId;
          this.mailstatus = params.mailstatus;
      });
      // let groupDetails = JSON.parse(sessionStorage.groupDetails);
      // for(let i = 0; i < groupDetails.family_groups.length; i++) {
      //     if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
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
      // sessionStorage.stepper1Details = '';
      // sessionStorage.copaymentShow = '';
      // sessionStorage.buyProductdetails = '';
      // sessionStorage.enquiryId = '';
      // sessionStorage.groupName = '';
      // sessionStorage.proposalID = '';
  }
    DownloadPdf() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'proposal_id' : this.proposalId,

        }
        this.settings.loadingSpinner = true;
        this.proposalservice.getDownloadPdfBajaj(data).subscribe(
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
    retry() {
        this.router.navigate(['/bajaj'  + '/' + true]);
    }

    pay(){
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        this.router.navigate(['/healthinsurance']);
    }

    downloadMessage() {
        const dialogRef = this.dialog.open(DownloadMessageBajaj, {
            width: '400px',
            data: this.path

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
@Component({
    selector: 'downloadmessagebajaj',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessageBajaj {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessageBajaj>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}


