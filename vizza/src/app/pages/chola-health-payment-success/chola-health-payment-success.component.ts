import {Component, Inject, OnInit} from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-chola-health-payment-success',
  templateUrl: './chola-health-payment-success.component.html',
  styleUrls: ['./chola-health-payment-success.component.scss']
})
export class CholaHealthPaymentSuccessComponent implements OnInit {

  public paymentStatus: any
  public currenturl: any
  public type: any
  public path: any
  public proposalId: any
  public policyStatus: any
  public remainingStatus: any
  public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService, public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;

    this.route.params.forEach((params) => {
      this.paymentStatus = params.status;
      this.proposalId = params.proId;
      this.policyStatus = params.policyStatus;
    });
  }
  ngOnInit() {
  }
  retry() {
    this.router.navigate(['/chola-health-proposal'  + '/' + true]);
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
    this.proposalservice.getDownloadPdfchola(data).subscribe(
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

      this.currenturl = this.config.getimgUrl();
      if (this.type == 'pdf') {
        this.window.open(this.currenturl + '/' +  this.path,'_blank');
      } else if (this.type === 'pdf') {
        this.window.open(this.currenturl + '/' +  this.path,'_blank');
      } else {
        this.downloadMessage();
      }
    } else {
      this.toast.error(successData.ErrorObject);
    }

  }
  public downloadPdfFailure(error) {
  }
  downloadMessage() {
    const dialogRef = this.dialog.open(DownloadMessageCholaHealth, {
      width: '400px',
      data: this.path

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
@Component({
  selector: 'downloadmessagecholahealth',
  template: `<div mat-dialog-content class="text-center">
    <label> {{data}} </label>
  </div>
  <div mat-dialog-actions style="justify-content: center">
    <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
  </div>`,
})
export class DownloadMessageCholaHealth{

  constructor(
      public dialogRef: MatDialogRef<DownloadMessageCholaHealth>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
