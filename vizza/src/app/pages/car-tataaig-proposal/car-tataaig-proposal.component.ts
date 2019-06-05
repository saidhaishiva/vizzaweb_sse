import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';

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
  selector: 'app-car-tataaig-proposal',
  templateUrl: './car-tataaig-proposal.component.html',
  styleUrls: ['./car-tataaig-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CarTataaigProposalComponent implements OnInit {

  public proposer: FormGroup;
  public vehicle: FormGroup;
  public previouspolicy: FormGroup;
  public nominee: FormGroup;
  public minDate: any;
  public maxdate: any;
  public proposerdateError: any;
  public automobdateError: any;
  public proposerPinList: any;
  public prepolicyPinList: any;
  public proposerGenderlist: any;
  public preNamelist: any;
  public precodelist: any;
  public relationlist: any;
  public QuoteList: any;
  public banklist: any;
  public currentStep: any;
  public settings: Settings;
  public webhost: any;

  constructor(public fb: FormBuilder,public validation: ValidationService,public datepipe: DatePipe,public bikeinsurance: BikeInsuranceService,public toastr: ToastrService,public authservice: AuthService,public appSettings: AppSettings,public config: ConfigurationService ) {

    let stepperindex = 0;
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    const miniDate = new Date();
    this.minDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
    this.maxdate = this.minDate;

    this.proposer = this.fb.group({
      proposerTitle: ['', Validators.required],
      proposerFirstname: ['', Validators.required],
      proposerMidname: '',
      proposerLastname: ['', Validators.required],
      proposerGender: ['', Validators.compose([Validators.required])],
      proposerDob: ['', Validators.compose([Validators.required])],
      maritalStatus: ['', Validators.required],
      proposerMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      proposerEmail: ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      proposerAadhar: '',
      proposerAccount: '',
      Addressone: ['', Validators.required],
      Addresstwo: '',
      Addressthree: '',
      proposerPincode: ['', Validators.required],
      proposerState: ['', Validators.required],
      proposerDistrict: ['', Validators.required],
      proposerCity: ['', Validators.required],
      driveflag: '',
      driveFirstname: '',
      driveLastname: '',
      driveGender: '',
      driveAge: '',
      drivingexp: '',
      drivemaritalStatus: '',
    });

    this.vehicle = this.fb.group({
      engine: ['', Validators.required],
      chassis: ['', Validators.required],
      Financetype: false,
      banktype: '',
      bankName: '',
      Address: '',
      autoflag: ['',Validators.required],
      autoNumber: '',
      autoName: '',
      autoDob: '',
    });

    this.previouspolicy = this.fb.group({
      preflag: ['', Validators.required],
      precode: ['', Validators.required],
      preName: ['', Validators.required],
      prepolno: '',
      preAddressone: ['', Validators.required],
      preAddresstwo: '',
      preAddressthree: '',
      prepincode: '',
      preState: '',
      preDistrict: '',
      preCity: '',
    });

    this.nominee = this.fb.group({
      nomieeName: '',
      nomineeAge: '',
      nomineerelation: '',
    })
  }

  ngOnInit() {
    this.getGenderlist();
    this.getNamelist();
    this.getCodelist();
    this.getRelationList();
  }

  nameValidate(event: any) {
  }

  // Dob validation
  dobValidate(event: any) {
    this.validation.dobValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  // space
  space(event: any) {
    this.validation.space(event);
  }

  addEvent(event: any, type) {
    console.log(type);
    let dob = '';
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
          } else if (type == 'autoDob') {
            this.automobdateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'autoDob') {
            this.automobdateError = 'Enter Valid Date';
          }
        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value,'y-MM-dd');
        if (dob.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
          } else if (type == 'autoDob') {
            this.automobdateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'autoDob') {
            alert('auto');
            this.automobdateError = 'Enter Valid Date';
          }
        }
      }
    }
  }

  //Proposer PincodeList
  getPostalCode(pin, type) {
    console.log(pin, type, 'pincode');
    const data = {
      'platform': 'web',
      'pincode': pin,
    };
    if (pin.length == 6) {
      this.bikeinsurance.PincodeList(data).subscribe(
          (successData) => {
            this.proposerpincodeListSuccess(successData, type);
          },
          (error) => {
            this.proposerpincodeListFailure(error);
          }
      );
    }
  }

  proposerpincodeListSuccess(successData, type) {
    if (successData.IsSuccess) {
      if (type == 'proposer') {
        this.proposerPinList = successData.ResponseObject;
        this.proposer.controls['proposerState'].patchValue(this.proposerPinList.text_state);
        this.proposer.controls['proposerDistrict'].patchValue(this.proposerPinList.text_city_district);
        this.proposer.controls['proposerCity'].patchValue(this.proposerPinList.text_pincode_locality);
      } else if (type == 'prepolicy') {
        this.prepolicyPinList = successData.ResponseObject;
        this.previouspolicy.controls['preState'].patchValue(this.prepolicyPinList.text_state);
        this.previouspolicy.controls['preDistrict'].patchValue(this.prepolicyPinList.text_city_district);
        this.previouspolicy.controls['preCity'].patchValue(this.prepolicyPinList.text_pincode_locality);
      }
    } else if (successData.IsSuccess != true) {
      this.toastr.error('Please Fill Valid Pincode');
      if (type == 'proposer') {
        this.proposer.controls['proposerState'].patchValue('');
        this.proposer.controls['proposerDistrict'].patchValue('');
        this.proposer.controls['proposerCity'].patchValue('');
      } else if (type == 'prepolicy') {
        this.previouspolicy.controls['preState'].patchValue('');
        this.previouspolicy.controls['preDistrict'].patchValue('');
        this.previouspolicy.controls['preCity'].patchValue('');
      }
    }
  }

  proposerpincodeListFailure(error) {

  }

//Proposer GenderList
  getGenderlist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeinsurance.GenderList(data).subscribe(
        (successData) => {
          this.proposerGenderListSuccess(successData);
        },
        (error) => {
          this.proposerGenderListFailure(error);
        }
    );
  }

  proposerGenderListSuccess(successData) {
    this.proposerGenderlist = successData.ResponseObject;

  }

  proposerGenderListFailure(error) {

  }

  //PreviousPolicy NameList
  getNamelist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeinsurance.NameList(data).subscribe(
        (successData) => {
          this.prepolicyNameListSuccess(successData);
        },
        (error) => {
          this.prepolicyNameListFailure(error);
        }
    );
  }

  prepolicyNameListSuccess(successData) {
    this.preNamelist = successData.ResponseObject;

  }

  prepolicyNameListFailure(error) {

  }

  //PreviousPolicy CodeList
  getCodelist() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'

    };
    this.bikeinsurance.CodeList(data).subscribe(
        (successData) => {
          this.prepolicycodeListSuccess(successData);
        },
        (error) => {
          this.prepolicycodeListFailure(error);
        }
    );
  }

  prepolicycodeListSuccess(successData) {
    this.precodelist = successData.ResponseObject;

  }

  prepolicycodeListFailure(error) {

  }

  //Nominee RelationList
  getRelationList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeinsurance.RelationList(data).subscribe(
        (successData) => {
          this.nomineeRelationSuccess(successData);
        },
        (error) => {
          this.nomineeRelationFailure(error);
        }
    );
  }

  nomineeRelationSuccess(successData) {
    this.relationlist = successData.ResponseObject;
  }

  nomineeRelationFailure(error) {

  }

  financiertype(event: any) {
    console.log(event.length,'length');
    if (event.length >= 3) {
      if (this.vehicle.controls['banktype'].value == 'bank' || this.vehicle.controls['banktype'].value == 'nonbank financier') {
        const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          'type': this.vehicle.controls['banktype'].value,
          'name': event,
        };
        this.bikeinsurance.Finacetype(data).subscribe(
            (successData) => {
              this.FinanceSuccess(successData);
            },
            (error) => {
              this.FinanceFailure(error);
            }
        );
      }
    }
  }

  FinanceSuccess(successData) {
    this.banklist = successData.ResponseObject;
  }

  FinanceFailure(error) {

  }


  chooseflag(event: any) {
    console.log(this.proposer.controls['driveflag'].value, 'driveflag');
    if (this.proposer.controls['driveflag'].value == 'Y') {
      console.log(this.proposer.controls['proposerLastname'].value, 'value');
      this.proposer.controls['driveFirstname'].patchValue(this.proposer.controls['proposerFirstname'].value);
      this.proposer.controls['driveLastname'].patchValue(this.proposer.controls['proposerLastname'].value);
      this.proposer.controls['driveGender'].patchValue(this.proposer.controls['proposerGender'].value);
      this.proposer.controls['driveFirstname'].setValidators([Validators.required]);
      this.proposer.controls['driveLastname'].setValidators([Validators.required]);
      this.proposer.controls['driveGender'].setValidators([Validators.required]);
      this.proposer.controls['driveAge'].setValidators([Validators.required]);
      this.proposer.controls['drivingexp'].setValidators([Validators.required]);
      this.proposer.controls['drivemaritalStatus'].setValidators([Validators.required]);
    } else if (this.proposer.controls['driveflag'].value == 'N') {
      this.proposer.controls['driveFirstname'].patchValue('');
      this.proposer.controls['driveLastname'].patchValue('');
      this.proposer.controls['driveGender'].patchValue('');
      this.proposer.controls['driveAge'].patchValue('');
      this.proposer.controls['drivingexp'].patchValue('');
      this.proposer.controls['drivemaritalStatus'].patchValue('');

      this.proposer.controls['driveFirstname'].setValidators(null);
      this.proposer.controls['driveLastname'].setValidators(null);
      this.proposer.controls['driveGender'].setValidators(null);
      this.proposer.controls['driveAge'].setValidators(null);
      this.proposer.controls['drivingexp'].setValidators(null);
      this.proposer.controls['drivemaritalStatus'].setValidators(null);
    }
    this.proposer.controls['driveFirstname'].updateValueAndValidity();
    this.proposer.controls['driveLastname'].updateValueAndValidity();
    this.proposer.controls['driveGender'].updateValueAndValidity();
    this.proposer.controls['driveAge'].updateValueAndValidity();
    this.proposer.controls['drivingexp'].updateValueAndValidity();
    this.proposer.controls['drivemaritalStatus'].updateValueAndValidity();
  }

  autoflag(event: any) {
    if (this.vehicle.controls['autoflag'].value == 'Y') {
      this.vehicle.controls['autoNumber'].setValidators([Validators.required]);
      this.vehicle.controls['autoName'].setValidators([Validators.required]);
      this.vehicle.controls['autoDob'].setValidators([Validators.required],);
    } else if (this.vehicle.controls['autoflag'].value == 'N') {
      this.vehicle.controls['autoNumber'].patchValue('');
      this.vehicle.controls['autoName'].patchValue('');
      this.vehicle.controls['autoDob'].patchValue('');

      this.vehicle.controls['autoNumber'].setValidators(null);
      this.vehicle.controls['autoName'].setValidators(null);
      this.vehicle.controls['autoDob'].setValidators(null);
    }
    this.vehicle.controls['autoNumber'].updateValueAndValidity();
    this.vehicle.controls['autoName'].updateValueAndValidity();
    this.vehicle.controls['autoDob'].updateValueAndValidity();
  }

  check(event) {
    if(event.checked != true) {
      this.vehicle.controls['banktype'].patchValue('');
      this.vehicle.controls['bankName'].patchValue('');
      this.vehicle.controls['Address'].patchValue('');
    }
  }



  proposerDetails(stepper: MatStepper, value) {
    sessionStorage.tatabikeproposer = '';
    sessionStorage.tatabikeproposer = JSON.stringify(value);
    if (this.proposer.valid) {
      console.log(value, 'proposer');
      stepper.next();
    } else {
      this.toastr.error('Please Fill All The Mandtory Fields');
    }
  }

  vehicleDetails(stepper: MatStepper, value) {
    sessionStorage.tatavehicle = '';
    sessionStorage.tatavehicle = JSON.stringify(value);
    if (this.vehicle.valid) {
      console.log(value, 'vehicle');
      stepper.next();
    }
  }

  prepolicyDetails(stepper: MatStepper, value) {
    sessionStorage.tataprepolicy = '';
    sessionStorage.tataprepolicy = JSON.stringify(value);
    if (this.previouspolicy.valid) {
      console.log(value, 'prepolicy');
      stepper.next();
    }
  }

  nomineeDetails(stepper: MatStepper, value) {
    sessionStorage.tatanominee = '';
    sessionStorage.tatanominee = JSON.stringify(value);
    if (this.nominee.valid) {
      this.QuoteList(stepper);
    }
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }



}
