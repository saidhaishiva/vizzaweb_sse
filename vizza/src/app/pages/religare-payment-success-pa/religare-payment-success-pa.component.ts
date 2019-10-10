
import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
    selector: 'app-religare-payment-success-pa',
    templateUrl: './religare-payment-success-pa.component.html',
    styleUrls: ['./religare-payment-success-pa.component.scss']
})
export class ReligarePaymentSuccessPaComponent implements OnInit {
    public paymentStatus: any;
    public currenturl: any;
    public type: any;
    public path: any;
    public proposalId: any;
    public settings: Settings;

    constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService,public router: Router, public personalService: PersonalAccidentService,public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            console.log(this.paymentStatus, 'this.paymentStatus');
            this.proposalId = params.proId;
            console.log(this.proposalId, 'this.proposalId');
        });
    }
    ngOnInit() {

    }
    retry() {
        this.router.navigate(['/personal-accident-religare'  + '/' + true]);
    }
    DownloadPdf() {
        const data = {
            'mail_status': '1',
            'proposal_id' : this.proposalId,
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
        }
        this.personalService.getDownloadPdfReligarepa(data).subscribe(
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
                this.window.open(this.currenturl + '/' +  this.path,'_blank');
            // } else if (this.type === 'pdf') {
            //     console.log(successData.ResponseObject, 'www3444');
            //     window.open(this.currenturl + '/' +  this.path,'_blank');
            } else {
                this.downloadMessage();
            }
        } else {
            this.toast.error(successData.ErrorObject);
        }

    }
    public downloadPdfFailure(error) {
        console.log(error);
    }
    downloadMessage() {
        const dialogRef = this.dialog.open(DownloadMessageReligarePersonal, {
            width: '400px',
            data: this.path

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }


}
@Component({
    selector: 'downloadmessagereligarepersonal',
    template: `<div mat-dialog-content class="text-center">
        <label> {{data}} </label>
    </div>
    <div mat-dialog-actions style="justify-content: center">
        <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
    </div>`,
})
export class DownloadMessageReligarePersonal {

    constructor(
        public dialogRef: MatDialogRef<DownloadMessageReligarePersonal>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}



