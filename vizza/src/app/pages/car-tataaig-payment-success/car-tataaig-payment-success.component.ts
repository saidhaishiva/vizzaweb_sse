import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../app.settings';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { Settings } from '../../app.settings.model';
import { FourWheelerService } from '../../shared/services/four-wheeler.service';


@Component({
  selector: 'app-car-tataaig-payment-success',
  templateUrl: './car-tataaig-payment-success.component.html',
  styleUrls: ['./car-tataaig-payment-success.component.scss']
})
export class CarTataaigPaymentSuccessComponent implements OnInit {

  public settings: Settings;
  public paymentStatus: any;
  public proposalId: any;
  public policyNo: any;
  public type: any;
  public path: any;
  public currenturl: any;

  constructor(public config: ConfigurationService, public carservice: FourWheelerService, public router: Router, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    this.route.params.forEach((params) => {
      console.log(params);
      this.paymentStatus = params.status;
      this.proposalId = params.proId;
      this.policyNo = params.policyNo;
    });
  }

  ngOnInit() {
  }

  retry() {
    this.router.navigate(['/car-tataaig-proposal'  + '/' + true]);
  }

  DownloadPdf() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'policy_id' : this.proposalId,

    }
    this.settings.loadingSpinner = true;
    this.carservice.getDownloadPdfTataaig(data).subscribe(
        (successData) => {
          this.downloadPdfSuccess(successData);
        },
        (error) => {
          this.downloadPdfFailure(error);
        }
    );
  }
  downloadPdfSuccess(successData) {
    console.log(successData.ResponseObject, 'ssssssssssssssssssssss');
    this.type = successData.ResponseObject.type;
    this.path = successData.ResponseObject.path;
    this.settings.loadingSpinner = false;

    if (successData.IsSuccess == true) {
      console.log(this.type, 'ww22');

      this.currenturl = this.config.getimgUrl();
      if (this.type == 'pdf') {
        console.log(successData.ResponseObject, 'www333');
        window.open(this.path,'_blank');
      } else if (this.type === 'pdf') {
        console.log(successData.ResponseObject, 'www3444');
        window.open(this.path,'_blank');
      } else {
      }
    } else {
      this.toast.error(successData.ErrorObject);
    }
  }
  downloadPdfFailure(error) {
    console.log(error);
  }
}
