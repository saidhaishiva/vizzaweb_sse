import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {ProposalService} from '../../shared/services/proposal.service';

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
    public proposalnumber: any
    constructor(public config: ConfigurationService, public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService, public dialog: MatDialog) {
      this.route.params.forEach((params) => {
          console.log(params.id);
          this.paymentStatus = params.id;
          this.proposalnumber = params.proNo;
      });
  }
  ngOnInit() {
  }

    DownloadPdf() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'proposal_number' : this.proposalnumber == undefined ? '' : this.proposalnumber,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
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
        console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
        this.type = successData.ResponseObject.type;
        this.path = successData.ResponseObject.path;
        this.currenturl = this.config.getimgUrl();
        if (this.type == 'pdf') {
            window.open(this.currenturl + '/' +  this.path,'_blank');
        } else {
            this.downloadMessage();
        }
    }
    public downloadPdfFailure(error) {
        console.log(error);
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

