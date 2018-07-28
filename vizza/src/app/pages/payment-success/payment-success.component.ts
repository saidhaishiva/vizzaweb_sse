import { Component, OnInit, Inject } from '@angular/core';
import {ProposalService} from '../../shared/services/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




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

  constructor(public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService, public dialog: MatDialog) {
      this.purchasetoken = this.route.snapshot.queryParamMap['params']['purchaseToken'];
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
  }

  ngOnInit() {
      this.proposalid = sessionStorage.proposalId;
      this.setPurchaseStatus();
  }

    setPurchaseStatus() {
        // const data = {
        //     'platform': 'web',
        //     'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
        //     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        //     'purchase_token' : this.purchasetoken,
        //     'proposal_id' : this.proposalid
        // }
        const data = {
            "platform": "web",
            "proposal_id": "14",
            "purchase_token": "eb51645c48c65c63fa9ab0d5304c89d5",
            "user_id": "0",
            "role_id": "4"
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
       this.purchaseStatus = successData.ResponseObject;
    }
    public purchaseStatusFailure(error) {
        console.log(error);
    }

    DownloadPdf() {
        const data = {
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
        console.log(successData.ResponseObject);
        if (successData.ResponseObject.Note == 'Your policy is being prepared. Kindly try after few minutes.' ) {
            this.downloadMessage();
        }
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }

    downloadMessage() {
        const dialogRef = this.dialog.open(DownloadMessage, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }


}
@Component({
    selector: 'downloadmessage',
    template: `<div mat-dialog-content class="text-center">
        <label> Your policy is being prepared. A link has been shared to your registered emailID and Mobile number. </label>
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
