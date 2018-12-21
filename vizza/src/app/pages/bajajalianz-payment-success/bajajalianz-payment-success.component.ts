import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {ProposalService} from '../../shared/services/proposal.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-bajajalianz-payment-success',
  templateUrl: './bajajalianz-payment-success.component.html',
  styleUrls: ['./bajajalianz-payment-success.component.scss']
})
export class BajajalianzPaymentSuccessComponent implements OnInit {
    public paymentStatus: any
    public currenturl: any
    public type: any
    public path: any
    public proposalId: any
    public mailstatus: any

    public settings: Settings;
  constructor(public config: ConfigurationService, public proposalservice: ProposalService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
      this.settings = this.appSettings.settings;
      this.route.params.forEach((params) => {
          console.log(params.id);
          this.paymentStatus = params.status;
          this.proposalId = params.proId;
          this.proposalId = params.proId;
          this.mailstatus = params.mailstatus;

      });
  }

  ngOnInit() {
  }

}
