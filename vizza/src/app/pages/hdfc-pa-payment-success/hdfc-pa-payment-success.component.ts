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

@Component({
    selector: 'app-hdfc-pa-payment-success',
    templateUrl: './hdfc-pa-payment-success.component.html',
    styleUrls: ['./hdfc-pa-payment-success.component.scss']
})
export class HdfcPaPaymentSuccessComponent implements OnInit {

public paymentStatus: any
public currenturl: any
public type: any
public path: any
public proposalId: any
public settings: Settings;

constructor(public config: ConfigurationService, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;

    this.route.params.forEach((params) => {
        console.log(params.id);
        this.paymentStatus = params.status;
        this.proposalId = params.proId;
    });
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
    console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
    this.type = successData.ResponseObject.type;
    this.path = successData.ResponseObject.path;
    this.settings.loadingSpinner = false;

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
        this.toast.error(successData.ErrorObject);

    }

}
public downloadPdfFailure(error) {
    this.settings.loadingSpinner = false;
    console.log(error);
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


