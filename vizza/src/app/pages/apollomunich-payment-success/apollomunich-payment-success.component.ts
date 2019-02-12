import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {HealthService} from '../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-apollomunich-payment-success',
  templateUrl: './apollomunich-payment-success.component.html',
  styleUrls: ['./apollomunich-payment-success.component.scss']
})
export class ApollomunichPaymentSuccessComponent implements OnInit {

    public paymentStatus: any
    public type: any
    public path: any
    public proposalId: any
    public settings: Settings;

    constructor(public config: ConfigurationService,public router: Router, public proposalservice: HealthService, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;

        this.route.params.forEach((params) => {
            this.paymentStatus = params.status;
            this.proposalId = params.proId;
        });
    }

  ngOnInit() {
  }
    retry() {
        this.router.navigate(['/appollo-munich-health'  + '/' + true]);
    }


}
