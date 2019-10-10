import { Component, OnInit, Inject } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-edelweisspos-paymnet-success',
  templateUrl: './edelweisspos-paymnet-success.component.html',
  styleUrls: ['./edelweisspos-paymnet-success.component.scss']
})
export class EdelweissposPaymnetSuccessComponent implements OnInit {
  public paymentStatus: any;
  public currenturl: any;
  public type: any;
  public path: any;
  public policyId: any;
  public remainingStatus: any;
  public applicationNo: any;
  public receipt_link: any;
  public bi_pdf_url: any;
  public proposal_form: any;
  public settings: Settings;

  constructor(@Inject(WINDOW) private window: Window, public config: ConfigurationService, public router: Router, public proposalservice: CommonService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;

    this.route.params.forEach((params) => {
      this.paymentStatus = params.status;
      this.policyId = params.policyNo;
      this.applicationNo = params.applicationNo;
    });
  }

  ngOnInit() {
  }
  retry() {

    this.router.navigate(['/edelweiss-pos' + '/' + true]);
  }

  DownloadPdf(type) {
    const data = {
      'policy_id': this.policyId,
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
    };
    this.settings.loadingSpinner = true;
    this.proposalservice.edelweissDownloadPdf(data).subscribe(
        (successData) => {
          this.downloadPdfSuccess(successData, type);
        },
        (error) => {
          this.downloadPdfFailure(error);
        }
    );
  }

  public downloadPdfSuccess(successData, type) {
    console.log(type, 'type');
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess == true) {
      this.bi_pdf_url = successData.ResponseObject.bi_pdf_url;
      this.proposal_form = successData.ResponseObject.proposal_form;
      this.receipt_link = successData.ResponseObject.receipt_link;
      if(type == 'receipt'){
        console.log(this.receipt_link, 'this.bi_pdf_url');
        this.window.open(this.receipt_link, '_blank');
      }
      if(type == 'pdf') {
        console.log(this.bi_pdf_url, 'this.form');
        this.window.open(this.bi_pdf_url, '_blank');

      }
      if(type == 'proposl') {
        this.window.open(this.proposal_form, '_blank');
        console.log(this.proposal_form, 'this.bi_pdf_url');

      }
    } else {
      this.toast.error(successData.ErrorObject);
    }

  }

  public downloadPdfFailure(error) {
  }

}
