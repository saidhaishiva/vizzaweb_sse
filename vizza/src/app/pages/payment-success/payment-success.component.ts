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
 public purchasetoken: any;
 public proposalid: any;
 public settings: Settings;

  constructor(public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public auth: AuthService) {
      this.purchasetoken = this.route.snapshot.queryParamMap['params']['purchaseToken'];
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
  }

  ngOnInit() {
      this.proposalid = sessionStorage.proposalId;
      this.purchaseStatus();
  }

    purchaseStatus() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'purchase_token' : this.purchasetoken,
            'proposal_id' : this.proposalid
        }
        // const data = {
        //     "platform": "web",
        //     "proposal_id": "8",
        //     "purchase_token": "0d8c690510384d4f842d84defd34075c",
        //     "user_id": "0",
        //     "role_id": "4"
        // }
        this.proposalservice.getPurchaceStatus(data).subscribe(
            (successData) => {
                this. purchaseStatusSuccess(successData);
            },
            (error) => {
                this.purchaseStatusFailure(error);
            }
        );

    }
    public purchaseStatusSuccess(successData) {
        console.log(successData.ResponseObject);
    }
    public purchaseStatusFailure(error) {
        console.log(error);
    }

}
