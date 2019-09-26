import { Component, OnInit, Inject } from '@angular/core';
import {HealthService} from '../../shared/services/health.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';




@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
 public buyProductdetails: any;
 public purchasetoken: any;
 public proposalid: any;
 public settings: Settings;
 public purchaseStatus: any;
 type: any;
 path: any;
 status: any;
 currenturl: any;
    remainingStatus: any;

  constructor(public config: ConfigurationService, public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService, public dialog: MatDialog) {
      this.purchasetoken = this.route.snapshot.queryParamMap['params']['purchaseToken'];
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.remainingStatus = false;
      // let groupDetails = JSON.parse(sessionStorage.groupDetails);
      //
      // console.log(groupDetails.family_groups[sessionStorage.changedTabIndex].name, 'name');
      // console.log(sessionStorage.changedTabIndex, 'indx');
      // for(let i = 0; i < groupDetails.family_groups.length; i++) {
      //     if(groupDetails.family_groups[i].name == groupDetails.family_groups[sessionStorage.changedTabIndex].name){
      //         console.log('in');
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
      console.log(this.purchasetoken, ' this.purchasetoken');
      this.proposalid = sessionStorage.proposalID;
      if (this.purchasetoken != undefined) {
          this.setPurchaseStatus();
      }
  }

  setPurchaseStatus() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'purchase_token' : this.purchasetoken,
            'proposal_id' : this.proposalid
        }
        this.proposalservice.getPurchaceStatus(data).subscribe(
            (successData) => {
                this. purchaseStatusSuccess(successData);
            },
            (error) => {
                this.purchaseStatusFailure(error);
            }
        );

    }
    public purchaseStatusSuccess(successData) {
       if (successData.IsSuccess) {
           this.purchaseStatus = successData.ResponseObject;
           this.status = true;
       } else {
           this.status = false;
       }
    }
    public purchaseStatusFailure(error) {
    }
    retry() {
        this.router.navigate(['/proposal'  + '/' + true]);
    }
    pay(){
        sessionStorage.policyLists = JSON.stringify({index: 0, value: []});
        this.router.navigate(['/healthinsurance']);
    }

    DownloadPdf() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'mail_status': '1',
            'proposal_id' : this.purchaseStatus.proposal_id,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
        this.proposalservice.getDownloadPdf(data).subscribe(
            (successData) => {
                this.downloadPdfSuccess(successData);
            },
            (error) => {
                this.downloadPdfFailure(error);
            }
        );

    }
    public downloadPdfSuccess(successData) {
        // if (successData.ResponseObject.Note == 'Your policy is being prepared. Kindly try after few minutes.' ) {
        //     this.downloadMessage();
        // }
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {

            this.type = successData.ResponseObject.type;
            this.path = successData.ResponseObject.path;
            this.currenturl = this.config.getimgUrl();
            if (this.type == 'pdf') {
                window.open(this.currenturl + '/' + this.path, '_blank');
                // window.location.href = this.fileName + '/' +  this.path  ;
            } else {
                this.downloadMessage();
            }
        }
    }
    public downloadPdfFailure(error) {
        this.settings.loadingSpinner = false;
    }

    downloadMessage() {
        const dialogRef = this.dialog.open(DownloadMessage, {
            width: '400px',
            data: this.path

        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }


}
@Component({
    selector: 'downloadmessage',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessage {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessage>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
