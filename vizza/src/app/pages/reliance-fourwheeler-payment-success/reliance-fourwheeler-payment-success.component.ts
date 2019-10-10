import { Component, OnInit, Inject } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-reliance-fourwheeler-payment-success',
  templateUrl: './reliance-fourwheeler-payment-success.component.html',
  styleUrls: ['./reliance-fourwheeler-payment-success.component.scss']
})
export class RelianceFourwheelerPaymentSuccessComponent implements OnInit {

  public paymentStatus: any;
  public currenturl: any;
  public type: any;
  public path: any;
  public proposalId: any;
  public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService, public fourWheelerInsurance: FourWheelerService,public router: Router, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.route.params.forEach((params) => {
      console.log(params);
      this.paymentStatus = params.status;
      this.proposalId = params.proId;
    });
  }
  ngOnInit() {
  }
  retry() {
    this.router.navigate(['/reliance-fourwheeler-motor-proposal'  + '/' + true]);
  }

  DownloadPdf() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      // 'policy_id' : this.proposalId,
      "proposal_id": this.proposalId,
      "mail_status": "0"
    }
    this.settings.loadingSpinner = true;
    this.fourWheelerInsurance.getDownloadPdfReliancefourWheeler(data).subscribe(
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

      console.log(this.type, 'ww22');

      this.currenturl = this.config.getimgUrl();
      if (this.type == 'pdf') {
        console.log(successData.ResponseObject, 'www333');
        this.window.open(this.path,'_blank');
      } else {
        this.toast.error(successData.ResponseObject.path);
      }
    } else {
      this.toast.error(successData.ErrorObject);
    }

  }


  public downloadPdfFailure(error) {
    this.settings.loadingSpinner = false;
    console.log(error);
  }
}
