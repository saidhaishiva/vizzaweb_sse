import { Component, OnInit } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';
import {FourWheelerService} from '../../shared/services/four-wheeler.service';

@Component({
  selector: 'app-shriram-mfw-payment-success',
  templateUrl: './shriram-mfw-payment-success.component.html',
  styleUrls: ['./shriram-mfw-payment-success.component.scss']
})

export class ShriramMfwPaymentSuccessComponent implements OnInit {
  public paymentStatus: any
  public currenturl: any
  public type: any
  public path: any
  public proposalId: any
  public settings: Settings;

  constructor(public config: ConfigurationService, public bikeService: FourWheelerService,public router: Router, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
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
    this.router.navigate(['/bike-shriram-proposal'  + '/' + true]);
  }
  DownloadPdf() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'policy_id' : this.proposalId,

    }
    this.settings.loadingSpinner = true;
    this.bikeService.getDownloadPdfShriram(data).subscribe(
        (successData) => {
          this.downloadPdfSuccess(successData);
        },
        (error) => {
          this.downloadPdfFailure(error);
        }
    );

  }
  public downloadPdfSuccess(successData) {
    // this.settings.loadingSpinner = false;
    // if(successData.Issuccess){
    //   let pdf = successData.ResponseObject;
    //   console.log(pdf,'kjhgfdghj');
    //   this.type = successData.ResponseObject.type;
    //   this.path = successData.ResponseObject.path;
    //   this.currenturl = this.config.getimgUrl();
    //     if (this.type == 'pdf') {
    //       console.log(successData.ResponseObject, 'www333');
    //       window.open(this.path,'_blank');
    //     } else if (this.type === 'pdf') {
    //       console.log(successData.ResponseObject, 'www3444');
    //       window.open(this.path,'_blank');
    // } else {
    //         this.toast.error(successData.ErrorObject);
    //
    //     }
    // }

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


  public downloadPdfFailure(error) {
    console.log(error);
  }

}
