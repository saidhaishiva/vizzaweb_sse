import { Component, OnInit } from '@angular/core';
import {ProposalService} from '../../shared/services/proposal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';



@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
 public buyProductdetails: any;
 public purchastoken: any;
 public proposalid: any;
 public settings: Settings;

  constructor(public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
      this.route.params.forEach((params) => {
          console.log(params.purchaseToken, 'tokennnnnnnnnnnnnnnnnnnnnnnnnnn');
          this.purchastoken = params.purchaseToken;
          this.settings = this.appSettings.settings;
          this.settings.HomeSidenavUserBlock = false;
          this.settings.sidenavIsOpened = false;
          this.settings.sidenavIsPinned = false;
      });
  }

  ngOnInit() {
      this.proposalid = sessionStorage.proposalId;
      this.purchaceStatus();
  }

    purchaceStatus() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'purchas_token' : this.purchastoken,
            'proposal_id' : this.proposalid
        }
        this.proposalservice.getPurchaceStatus(data).subscribe(
            (successData) => {
                this. purchaceStatusSuccess(successData);
            },
            (error) => {
                this.purchaceStatusFailure(error);
            }
        );

    }
    public purchaceStatusSuccess(successData) {
        console.log(successData.ResponseObject);
    }
    public purchaceStatusFailure(error) {
        console.log(error);
    }

    DownloadPdf() {
        const data = {
            'proposal_id' : this.proposalid,
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
        console.log(successData.ResponseObject);
    }
    public downloadPdfFailure(error) {
        console.log(error);
    }

}
