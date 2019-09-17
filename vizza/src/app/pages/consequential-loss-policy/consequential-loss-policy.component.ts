import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MetaService} from '../../shared/services/meta.service';
import {AuthService} from '../../shared/services/auth.service';
import {Meta, Title} from '@angular/platform-browser';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',

    monthYearA11yLabel: 'MM YYYY',
  },
};

@Component({
  selector: 'app-consequential-loss-policy',
  templateUrl: './consequential-loss-policy.component.html',
  styleUrls: ['./consequential-loss-policy.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ConsequentialLossPolicyComponent implements OnInit {
  public marineErr: FormGroup;
  public setDate: any;
  public selectDate: any;
  public productName: any;
  public pin:any;
  public title: any;
  public response: any;
  public pincodeErrors: any;
  public webhost: any;
  public metaConsequentialLoss: any;
  public metaTitle: any;
  metaKeyword: any;
  metaDescription: any;
  public settings: Settings;
  constructor(public fb: FormBuilder, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute,public toastr: ToastrService,public config: ConfigurationService,
              public appSettings: AppSettings, public meta: MetaService, public auth: AuthService, public metaTag: Meta, private titleService: Title) {
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    if(window.innerWidth < 787){
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }else{
      this.settings.HomeSidenavUserBlock = true;
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
    this.marineErr = this.fb.group({
      'appdate': ['', Validators.required],
      'apptime': null,
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'contactperson':  ['', Validators.compose([Validators.required])],
      'mobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'email': ['', Validators.compose([Validators.required,  Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'pincode': ['', Validators.compose([Validators.required])],
      'insurance': ['',Validators.compose([Validators.required])],
      'appointmentwith': ['',Validators.compose([Validators.required])]
    });
    this.productName = '';
  }

  ngOnInit() {
    this.setDate = Date.now();
    this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
    this.route.params.forEach((params) => {
      this.productName = params.id;
    });
    this.metaList();
  }

  public metaList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'component_name': 'Consequential Loss Policy'
    };
    this.meta.metaDetail(data).subscribe(
        (successData) => {
          this.metaDetailSuccess(successData);
        },
        (error) => {
          this.metaDetailFailure(error);
        }
    );
  }
  public metaDetailSuccess(successData) {
    this.metaConsequentialLoss = successData.ResponseObject[0];
    this.metaTitle = this.metaConsequentialLoss.title;
    this.metaKeyword = this.metaConsequentialLoss.keyword;
    this.metaDescription = this.metaConsequentialLoss.descrition;
    this.metaTag.addTags([
      {name: 'keywords', content: this.metaKeyword},
      {name: 'description', content: this.metaDescription},
    ]);
    this.setTitle();
  }
  public metaDetailFailure(error) {
    console.log(error);
  }
  public setTitle() {
    this.titleService.setTitle( this.metaTitle );
  }

  addEvent(event) {
    this.selectDate = event.value;
    this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
  }
  jewKeeper(values) {

    if (this.marineErr.valid) {
      const data = {
        'platform': 'web',
        'product_type': 'offline',
        'appointment_date': this.setDate,
        'appointment_time': this.marineErr.controls['apptime'].value,
        'company_name': this.marineErr.controls['name'].value,
        'customer_mobile': this.marineErr.controls['mobile'].value,
        'customer_email': this.marineErr.controls['email'].value,
        'contact_person' : this.marineErr.controls['contactperson'].value,
        'pincode': this.marineErr.controls['pincode'].value,
        'product_name': this.marineErr.controls['insurance'].value,
        'appointment_with': this.marineErr.controls['appointmentwith'].value,

      };

      this.commonservices.setFixAppointment(data).subscribe(
          (successData) => {
            this.fixAppointmentSuccess(successData);
          },
          (error) => {
            this.fixAppointmentFailure(error);
          }
      );
    }
  }
  fixAppointmentSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
    } else {
      this.toastr.error(successData.ErrorObject);

    }
  }
  fixAppointmentFailure(error) {
  }
  getPincodeDetails(pin, title) {
    this.pin = pin;
    this.title = title;
    const data = {
      'platform': 'web',
      'postalcode': this.pin
    }
    if (this.pin.length == 6) {
      this.commonservices.getPincodeDetails(data).subscribe(
          (successData) => {
            this.getPincodeDetailsSuccess(successData);
          },
          (error) => {
            this.getPincodeDetailsFailure(error);
          }
      );
    }
  }
  public getPincodeDetailsSuccess(successData) {
    if (successData.ErrorObject) {
      this.toastr.error(successData.ErrorObject);
      this.pincodeErrors = false;
    }else {
      this.pincodeErrors = true;
    }
  }

  public getPincodeDetailsFailure(error) {
  }
  public keyPress(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }
  public data(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[a-zA-Z\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

}
