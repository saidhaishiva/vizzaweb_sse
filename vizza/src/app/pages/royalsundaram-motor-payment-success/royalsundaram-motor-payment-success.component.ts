import { Component, OnInit } from '@angular/core';
import {Settings} from '../../app.settings.model';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-royalsundaram-motor-payment-success',
  templateUrl: './royalsundaram-motor-payment-success.component.html',
  styleUrls: ['./royalsundaram-motor-payment-success.component.scss']
})
export class RoyalsundaramMotorPaymentSuccessComponent implements OnInit {
  public paymentStatus: any
  public currenturl: any
  public type: any
  public path: any
  public proposalId: any
  public settings: Settings;

  constructor(public config: ConfigurationService, public bikeService: BikeInsuranceService,public router: Router, public route: ActivatedRoute, public appSettings: AppSettings, public toast: ToastrService, public auth: AuthService, public dialog: MatDialog) {
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
    this.router.navigate(['/bike-royal-proposal'  + '/' + true]);
  }


}
