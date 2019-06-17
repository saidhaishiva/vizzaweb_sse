import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { FourWheelerService } from '../../shared/services/four-wheeler.service';


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
  public Quotelist: any;
  public banklist: any;
  public currentStep: any;
  public settings: Settings;
  public webhost: any;
  public summaryData: any;
  public Proposalnumber: any;
  public PaymentRedirect: any;
  public PaymentReturn: any;
  public proposerFormData: any;
  public vehicalFormData: any;
  public previousFormData: any;
  public nomineeFormData: any;
  public ProposalId: any;
  public coverlist: any;

  constructor(public fb: FormBuilder,public validation: ValidationService,public datepipe: DatePipe,public carinsurance: FourWheelerService,public toastr: ToastrService,public authservice: AuthService,public appSettings: AppSettings,public config: ConfigurationService ) {

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
      autoflag: ['', Validators.required],
      autoNumber: '',
      autoName: '',
      autoDob: '',
      coverdrive: ['', Validators.required],
      Associationmember: ['', Validators.required],
      Voluntary: ['', Validators.required],
      Antitheft: ['', Validators.required],
      Tppdrestrict: ['', Validators.required],
      depreciation: ['', Validators.required],
      Consumableexpense: ['', Validators.required],
      Returninvoice: ['', Validators.required],
      Roadsideassistance: ['', Validators.required],
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
    this.validation.nameValidate(event);
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
      this.carinsurance.PincodeList(data).subscribe(
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
    this.carinsurance.GenderList(data).subscribe(
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
    this.carinsurance.NameList(data).subscribe(
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
    this.carinsurance.CodeList(data).subscribe(
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
    this.carinsurance.RelationList(data).subscribe(
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
        this.carinsurance.Finacetype(data).subscribe(
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

  // // PACover_for_OwnerDriver for Addons
  // coverdriveList() {
  //   const data = {
  //     'platform': 'web',
  //     'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //     'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //   };
  //   this.carinsurance.coverdrive(data).subscribe(
  //       (successData) => {
  //         this.coverdriveSuccess(successData);
  //       },
  //       (error) => {
  //         this.coverdriveFailure(error);
  //       }
  //   );
  // }
  //
  // coverdriveSuccess(successData) {
  //   this.coverlist = successData.ResponseObject;
  // }
  //
  // coverdriveFailure(error) {
  //
  // }


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

  QuoteList(stepper) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'enquiry_id': '',
      'company_id': "13",
      'Idv': '',
      'revised_idv': '',
      'PACover_for_OwnerDriver': this.vehicle.controls['coverdrive'].value,
      'Automobile_Association_Membership': this.vehicle.controls['Associationmember'].value == true ? 'Y' : 'N',
      'Voluntary_Deductibles': this.vehicle.controls['Voluntary'].value == true ? 'Y' : 'N',
      'Anti_theft_device': this.vehicle.controls['Antitheft'].value == true ? 'Y' : 'N',
      'TPPD_Restricted': this.vehicle.controls['Tppdrestrict'].value == true ? 'Y' : 'N',
      'Depreciation_ReImbursement': this.vehicle.controls['depreciation'].value == true ? 'Y' : 'N',
      'Consumables_expenses': this.vehicle.controls['Consumableexpense'].value == true ? 'Y' : 'N',
      'Return_to_Invoice': this.vehicle.controls['Returninvoice'].value == true ? 'Y' : 'N',
      'Roadside_Assistance': this.vehicle.controls['Roadsideassistance'].value == true ? 'Y' : 'N',
    };
    this.carinsurance.QuoteList(data).subscribe(
        (successData) => {
          this.QuoteSuccess(successData,stepper);
        },
        (error) => {
          this.QuoteFailure(error);
        }
    );
  }

  QuoteSuccess(successData,stepper) {
    if (successData.IsSuccess) {
      this.Quotelist = successData.ResponseObject;
      console.log(this.Quotelist,'quotationdata');
      this.createproposal(stepper);
    }
  }

  QuoteFailure(error) {

  }

  //Proposal Creation
  createproposal(stepper: MatStepper) {
    console.log(this.previouspolicy.controls['preflag'].value,'preflag');
    console.log(this.vehicle.controls['autoDob'].value,'expry date');
    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "enquiry_id": '',
      "created_by": "",
      "proposal_id": '',
      "motorproposalObj": {
        "quotation_no": this.Quotelist.productlist.quotation_no,
        "pol_sdate": '',
        "sp_name": "Name",
        "sp_license": "Lino12345566",
        "sp_place": "Mahbubnagar",
        "customer": {
          "salutation": this.proposer.controls['proposerTitle'].value,
          "first_name": this.proposer.controls['proposerFirstname'].value,
          "middle_name": this.proposer.controls['proposerMidname'].value,
          "last_name": this.proposer.controls['proposerLastname'].value,
          "gender": this.proposer.controls['proposerGender'].value,
          "dob": this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'yMMdd'),
          "marital_status": this.proposer.controls['maritalStatus'].value,
          "address_1": this.proposer.controls['Addressone'].value,
          "address_2": this.proposer.controls['Addresstwo'].value,
          "address_3": this.proposer.controls['Addressthree'].value,
          "address_4": "",
          "pincode": this.proposer.controls['proposerPincode'].value,

          "cust_aadhaar": this.proposer.controls['proposerAadhar'].value,
          "mobile_no": this.proposer.controls['proposerMobile'].value,
          "email_id": this.proposer.controls['proposerEmail'].value
        },
        "vehicle": {
          "engine_no": this.vehicle.controls['engine'].value,
          "chassis_no": this.vehicle.controls['chassis'].value
        },
        "prevpolicy": {
          "flag": this.previouspolicy.controls['preflag'].value == null || this.previouspolicy.controls['preflag'].value == ''? 'N' : this.previouspolicy.controls['preflag'].value,
          "code": this.previouspolicy.controls['precode'].value == null ? '' : this.previouspolicy.controls['precode'].value,
          "name":  this.previouspolicy.controls['preName'].value == null ? '' : this.previouspolicy.controls['preName'].value,
          "address1": this.previouspolicy.controls['preAddressone'].value == null ? '' : this.previouspolicy.controls['preAddressone'].value,
          "address2": this.previouspolicy.controls['preAddresstwo'].value == null ? '' : this.previouspolicy.controls['preAddresstwo'].value,
          "address3": this.previouspolicy.controls['preAddressthree'].value == null ? '' : this.previouspolicy.controls['preAddressthree'].value,
          "polno": this.previouspolicy.controls['prepolno'].value == null ? '' : this.previouspolicy.controls['prepolno'].value,
          "pincode": this.previouspolicy.controls['prepincode'].value == null ? '' : this.previouspolicy.controls['prepincode'].value,
        },
        "financier": {
          "type": this.vehicle.controls['banktype'].value,
          "name": this.vehicle.controls['bankName'].value,
          "address": this.vehicle.controls['Address'].value,
          "loanacno": ""
        },
        "automobile": {
          "flag": this.vehicle.controls['autoflag'].value,
          "number": this.vehicle.controls['autoNumber'].value,
          "name": this.vehicle.controls['autoName'].value,
          "expiry_date": this.vehicle.controls['autoDob'].value == null || this.vehicle.controls['autoDob'].value == ''  ? '' : this.datepipe.transform(this.vehicle.controls['autoDob'].value, 'yMMdd'),
        },
        "nominee": {
          "name": this.nominee.controls['nomieeName'].value,
          "age": this.nominee.controls['nomineeAge'].value,
          "relation": this.nominee.controls['nomineerelation'].value
        },
        "driver": {
          "flag": this.proposer.controls['driveflag'].value,
          "fname": this.proposer.controls['driveFirstname'].value,
          "lname": this.proposer.controls['driveLastname'].value,
          "gender": this.proposer.controls['driveGender'].value,
          "age": this.proposer.controls['driveAge'].value,
          "drivingexp": this.proposer.controls['drivingexp'].value,
          "marital_status": this.proposer.controls['drivemaritalStatus'].value,
        }
      }
    };
    console.log(data,'dataproposal');
    sessionStorage.bikeproposaldata = JSON.stringify(data);
    this.settings.loadingSpinner = true;
    this.carinsurance.proposal(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData, stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }

  proposalSuccess(successData, stepper) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      stepper.next();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      console.log(this.summaryData,'summary');
      this.Proposalnumber = this.summaryData.Proposal_Number;
      console.log(this.Proposalnumber,'pronum');
      this.PaymentRedirect = this.summaryData.PaymentRedirect;
      console.log(this.PaymentRedirect,'redirect');
      this.PaymentReturn = this.summaryData.PaymentReturn;
      sessionStorage.tatacarproposalID = this.ProposalId;
      this.proposerFormData = this.proposer.value;
      this.vehicalFormData = this.vehicle.value;
      this.previousFormData = this.previouspolicy.value;
      this.nomineeFormData = this.nominee.value;
    }else{
      this.toastr.error(successData.ErrorObject);
      this.settings.loadingSpinner = false;
    }
  }

  proposalFailure(error) {
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }



}
