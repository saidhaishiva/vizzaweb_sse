import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ValidationService} from '../../shared/services/validation.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {HealthService} from '../../shared/services/health.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Settings} from '../../app.settings.model';

@Component({
  selector: 'app-star-covid19',
  templateUrl: './star-covid19.component.html',
  styleUrls: ['./star-covid19.component.scss']
})
export class StarCovid19Component implements OnInit {
  public form: FormGroup;
  public setDate: any;
  public selectDate: any;
  public settings: Settings;
  commentBox: boolean;
  sdate: any;
  companyList: any;
  comments: any;
  webhost: any;
  policyTypes: any;
  renewalPolicy: any;
  allImage: any;
  fileDetails: any;
  url: any;
  getUrl: any;
  today: any;
  maxDate: any;
  sdateError: any;
  edateError: any;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe ,public validation: ValidationService, public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public healthService: HealthService, public dialog: MatDialog,public router: Router) {
    this.form =  this.fb.group({
      'policytypename': ['', Validators.compose([Validators.required])],
      'postalcode': ['', Validators.compose([Validators.required])],
      'period': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])],
      'sumInsuredId': ['', Validators.compose([Validators.required])],
    });
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.settings.HomeSidenavUserBlock = true;
    this.settings.sidenavIsOpened = true;
    this.settings.sidenavIsPinned = true;
    this.commentBox = true;
    this.selectDate = '';
    this.allImage = [];
    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  }

  ngOnInit() {
  }

}
