import {Component, Inject, OnInit} from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-bajaj-term-payment-success',
  templateUrl: './bajaj-term-payment-success.component.html',
  styleUrls: ['./bajaj-term-payment-success.component.scss']
})
export class BajajTermPaymentSuccessComponent implements OnInit {

  public paymentStatus: any
  public currenturl: any
  public type: any
  public path: any
  public policyId: any
  public remainingStatus: any
  public applicationNo: any
  public settings: Settings;



  constructor(public config: ConfigurationService, public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;

    this.route.params.forEach((params) => {
      this.paymentStatus = params.status;
      this.policyId = params.policyId;
      this.applicationNo = params.applicationNo;
    });
  }
  ngOnInit() {
  }
  retry() {
    this.router.navigate(['/life-bajaj-proposal'  + '/' + true]);
  }

  DownloadPdf() {
    const data = {
      'policy_Id' : this.policyId,
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    }
    this.settings.loadingSpinner = true;
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
    this.type = successData.ResponseObject.type;
    this.path = successData.ResponseObject.path;
    this.settings.loadingSpinner = false;

    if (successData.IsSuccess == true) {

      // this.currenturl = this.config.getimgUrl();
      // if (this.type == 'pdf') {
      //   window.open(this.currenturl + '/' +  this.path,'_blank');
      // } else if (this.type === 'pdf') {
      //   window.open(this.currenturl + '/' +  this.path,'_blank');
      // } else {
        this.downloadMessage();
      // }
    } else {
      this.toast.error(successData.ErrorObject);
    }

  }
  public downloadPdfFailure(error) {
  }

  downloadMessage() {
    const dialogRef = this.dialog.open(DownloadMessageBajajTerm, {
      width: '400px',
      data: this.path

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
@Component({
  selector: 'downloadmessagebajajterm',
  template: `<div mat-dialog-content class="text-center">
    <label> {{data}} </label>
  </div>
  <div mat-dialog-actions style="justify-content: center">
    <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
  </div>`,
})
export class DownloadMessageBajajTerm{

  constructor(
      public dialogRef: MatDialogRef<DownloadMessageBajajTerm>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

