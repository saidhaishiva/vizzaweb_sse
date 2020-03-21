import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WINDOW} from '@ng-toolkit/universal';
import {HealthService} from '../../../shared/services/health.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidationService} from '../../../shared/services/validation.service';
import {DatePipe, Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';
import {MatDialog} from '@angular/material';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-starhealth-renewel-proposal',
  templateUrl: './starhealth-renewel-proposal.component.html',
  styleUrls: ['./starhealth-renewel-proposal.component.scss']
})
export class StarhealthRenewelProposalComponent implements OnInit {
  // public personal: FormGroup;

  constructor(@Inject(WINDOW) private window: Window, public proposalservice: HealthService,public route: ActivatedRoute ,public validation: ValidationService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,public location :Location,
              public config: ConfigurationService, public common: HealthService, public fb: FormBuilder, public auth: AuthService, public http:HttpClient, @Inject(LOCALE_ID) private locale: string) {
    // this.personal = this.fb.group({
    //   personalTitle: ['', Validators.required],
    //   personalFirstname: ['', Validators.required],
    //   personalLastname: ['', Validators.required],
    //   personalDob: ['', Validators.compose([Validators.required])],
    //   personalOccupation: ['', Validators.required],
    //   personalOccupationName: '',
    //   personalIncome: [''],
    //   personalAadhar: ['', Validators.compose([ Validators.minLength(4)])],
    //   personalPan: ['', Validators.compose([ Validators.minLength(10)])],
    //   personalGst: ['', Validators.compose([ Validators.minLength(15)])],
    //   socialStatus: '',
    //   socialAnswer1: '',
    //   socialAnswer2: '',
    //   socialAnswer3: '',
    //   socialAnswer4: '',
    //   personalAddress: ['', Validators.required],
    //   previousinsurance: '',
    //   previousinsuranceChecked: '',
    //   personalAddress2: ['', Validators.required],
    //   personalPincode: '',
    //   personalgstIdType: '',
    //   personalCity: ['', Validators.required],
    //   personalCityName: '',
    //   personalArea: ['', Validators.required],
    //   personalAreaName: '',
    //   personalState: ['', Validators.required],
    //   personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
    //   personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
    //   personalAltnumber: '',
    //   residenceAddress: '',
    //   residenceAddress2: '',
    //   residencePincode:'',
    //   residenceCity: '',
    //   residenceCityName: '',
    //   residenceArea: '',
    //   residenceAreaName: '',
    //   residenceState: '',
    //   illnessCheck: '',
    //   sameas: ''
    // });
  }

  ngOnInit() {
  }

}
