import { Component, OnInit, Inject } from '@angular/core';
import {ProposalService} from '../../shared/services/proposal.service';
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
 currenturl: any;

  constructor(public config: ConfigurationService, public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService, public dialog: MatDialog) {
      this.purchasetoken = this.route.snapshot.queryParamMap['params']['purchaseToken'];
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;

  }

  ngOnInit() {
      this.proposalid = sessionStorage.proposalID;
      if ( this.purchasetoken != undefined) {
          this.setPurchaseStatus();
      }
      // let oReq = new XMLHttpRequest();
      // console.log('service listener');
      // oReq.addEventListener('load', (evt) => this.reqListener(evt));
      // // let formData = new FormData();
      // // console.log(formData);
      // // console.log(formData.get('transactionRefNum'));



      console.log(this.proposalid, 'this.proposalidthis.proposalid');
  }
  reqListener (event) {
        console.log(event, 'evennnnnnttttddddddddd');
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
        // const data = {
        //     "platform": "web",
        //     "proposal_id": "14",
        //     "purchase_token": "eb51645c48c65c63fa9ab0d5304c89d5",
        //     "user_id": "0",
        //     "role_id": "4"
        // }
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
           sessionStorage.nomineeDate = '';
           sessionStorage.familyMembers = '';
           sessionStorage.stepper1Details = '';
           sessionStorage.setPage = '';
           sessionStorage.sideMenu = false;
           sessionStorage.setFamilyDetails = '';
           sessionStorage.setInsuredAmount = '';
           sessionStorage.setPincode = '';
           sessionStorage.setPage = '';
           sessionStorage.policyLists = '';
           sessionStorage.sideMenu = '';
           sessionStorage.sonBTn = '';
           sessionStorage.daughterBTn = '';
           sessionStorage.fatherBTn = '';
           sessionStorage.motherBtn = '';
           sessionStorage.fatherInLawBTn = '';
           sessionStorage.motherInLawBtn = '';
           sessionStorage.changedTabDetails = '';
           sessionStorage.changeSuninsuredAmount = '';
           sessionStorage.changedTabIndex = '';
           sessionStorage.shorListTab = '';
           sessionStorage.enquiryId = '';
           sessionStorage.proposalId = '';
           sessionStorage.mobileNumber = '';
           sessionStorage.ageRestriction = '';
       } else {
           this.purchaseStatus = successData.ResponseObject;
       }
    }
    public purchaseStatusFailure(error) {
        console.log(error);
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
        console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
        // if (successData.ResponseObject.Note == 'Your policy is being prepared. Kindly try after few minutes.' ) {
        //     this.downloadMessage();
        // }
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;
        this.currenturl = this.config.getimgUrl();
        if (this.type == 'pdf') {
            window.open(this.currenturl + '/' +  this.path,'_blank');
            // window.location.href = this.fileName + '/' +  this.path  ;
        } else {
            this.downloadMessage();
        }
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }

    downloadMessage() {
        const dialogRef = this.dialog.open(DownloadMessage, {
            width: '400px',
            data: this.path

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
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
