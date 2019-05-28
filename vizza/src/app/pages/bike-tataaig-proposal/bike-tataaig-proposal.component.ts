import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ValidationService } from '../../shared/services/validation.service';
import { BikeInsuranceService } from '../../shared/services/bike-insurance.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { ToastrService} from 'ngx-toastr';
import { AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-bike-tataaig-proposal',
  templateUrl: './bike-tataaig-proposal.component.html',
  styleUrls: ['./bike-tataaig-proposal.component.scss']
})
export class BikeTataaigProposalComponent implements OnInit {

  public proposer: FormGroup;
  public vehicle: FormGroup;
  public previouspolicy: FormGroup;
  public nominee: FormGroup;
  public settings: Settings;
  public currentStep: any;
  public minDate: any;
  public maxdate: any;
  public proposerdateError: any;
  public automobdateError: any;
  public precodelist: any;
  public preNamelist: any;
  public proposerGenderlist: any;
  public relationlist: any;
  public getstepper1: any;
  public getstepper2: any;
  public getstepper3: any;
  public getstepper4: any;


  constructor(public fb: FormBuilder, public validation: ValidationService, public bikeinsurance: BikeInsuranceService, public appSettings: AppSettings, public toastr: ToastrService,public authservice: AuthService) {
    let stepperindex = 0;
    this.currentStep = stepperindex;
    this.settings = this.appSettings.settings;
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
      Financetype: '',
      FinanceName: '',
      Address: '',
      autoflag: '',
      autoNumber: '',
      autoName: ['', Validators.required],
      autoDob: ['', Validators.compose([Validators.required])],
    });

    this.previouspolicy = this.fb.group({
      preflag: ['', Validators.required],
      precode: ['', Validators.required],
      preName: ['', Validators.required],
      prepolno: '',
      preAddressone: ['', Validators.required],
      preAddresstwo: ['', Validators.required],
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
    this.sessionData();
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
    console.log(typeof event.value._i, 'type');
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        alert('string');
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
          } else if (type == 'automob') {
            this.automobdateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'automob') {
            this.automobdateError = 'Enter Valid Date';
          }
        }
      } else if (typeof event.value._i == 'object') {
        alert('object');
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposer') {
            this.proposerdateError = '';
          } else if (type == 'automob') {
            this.automobdateError = '';
          }
        } else {
          if (type == 'proposer') {
            this.proposerdateError = 'Enter Valid Date';
          } else if (type == 'automob') {
            this.automobdateError = 'Enter Valid Date';
          }
        }
      }
    }
  }


  //Proposer GenderList
  getGenderlist() {
    const data = {
      'platform': 'web',
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


  //Proposer PincodeList
  getPostalCode(pin, type) {
    console.log(pin,type,'pincode');
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
        this.proposer.controls['proposerState'].patchValue('');
        this.proposer.controls['proposerDistrict'].patchValue('');
        this.proposer.controls['proposerCity'].patchValue('');
      } else if (type == 'prepolicy') {
        this.previouspolicy.controls['preState'].patchValue('');
        this.previouspolicy.controls['preDistrict'].patchValue('');
        this.previouspolicy.controls['preCity'].patchValue('');
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

  //PreviousPolicy CodeList
  getCodelist() {
    const data = {
      'platform': 'web',

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

  //PreviousPolicy NameList
  getNamelist() {
    const data = {
      'platform': 'web',
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

  //Nominee RelationList
  getRelationList() {
    const data = {
      'platform': 'web',
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


  chooseflag(event: any) {
    console.log(this.proposer.controls['driveflag'].value, 'driveflag');
    if (this.proposer.controls['driveflag'].value == 'Y') {
      this.proposer.controls['driveFirstname'].setValidators([Validators.required]);
      this.proposer.controls['driveLastname'].setValidators([Validators.required]);
      this.proposer.controls['driveGender'].setValidators([Validators.required]);
      this.proposer.controls['driveAge'].setValidators([Validators.required]);
      this.proposer.controls['drivingexp'].setValidators([Validators.required]);
      this.proposer.controls['drivemaritalStatus'].setValidators([Validators.required]);
    } else if (this.proposer.controls['driveflag'].value == 'N') {
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

  proposerDetails(stepper: MatStepper, value) {
    sessionStorage.tatabikeproposer = '';
    sessionStorage.tatabikeproposer = JSON.stringify(value);
    if(this.proposer.valid) {
      console.log(value,'proposer');
      stepper.next();
    }else{
      this.toastr.error('Please Fill All The Mandtory Fields');
    }
  }

  vehicleDetails(stepper: MatStepper, value) {
    sessionStorage.tatavehicle = '';
    sessionStorage.tatavehicle = JSON.stringify(value);
    if (this.vehicle.valid) {
      console.log(value,'vehicle');
      stepper.next();
    }
  }

  prepolicyDetails(stepper: MatStepper, value) {
    sessionStorage.tataprepolicy = '';
    sessionStorage.tataprepolicy = JSON.stringify(value);
    if(this.previouspolicy.valid) {
      console.log(value,'prepolicy');
      stepper.next();
    }
  }

  nomineeDetails(stepper: MatStepper, value) {
    sessionStorage.tatanominee = '';
    sessionStorage.tatanominee = JSON.stringify(value);
    if(this.nominee.valid) {
      console.log(value,'nominee');
      this.createproposal(stepper);
    }
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }

  sessionData() {
    if (sessionStorage.tatabikeproposer != '' && sessionStorage.tatabikeproposer != undefined) {
      this.getstepper1 = JSON.parse(sessionStorage.tatabikeproposer);
      this.proposer = this.fb.group({
        proposerTitle: this.getstepper1.proposerTitle,
        proposerFirstname: this.getstepper1.proposerTitle,
        proposerMidname: this.getstepper1.proposerTitle,
        proposerLastname: this.getstepper1.proposerTitle,
        proposerGender: this.getstepper1.proposerTitle,
        proposerDob: this.getstepper1.proposerTitle,
        maritalStatus: this.getstepper1.proposerTitle,
        proposerMobile: this.getstepper1.proposerTitle,
        proposerEmail: this.getstepper1.proposerTitle,
        proposerAadhar: this.getstepper1.proposerTitle,
        Addressone: this.getstepper1.proposerTitle,
        Addresstwo: this.getstepper1.proposerTitle,
        Addressthree: this.getstepper1.proposerTitle,
        proposerPincode: this.getstepper1.proposerTitle,
        proposerState: this.getstepper1.proposerTitle,
        proposerDistrict: this.getstepper1.proposerTitle,
        proposerCity: this.getstepper1.proposerTitle,
        driveflag: this.getstepper1.proposerTitle,
        driveFirstname: this.getstepper1.proposerTitle,
        driveLastname: this.getstepper1.proposerTitle,
        driveGender: this.getstepper1.proposerTitle,
        driveAge: this.getstepper1.proposerTitle,
        drivingexp: this.getstepper1.proposerTitle,
        drivemaritalStatus: this.getstepper1.proposerTitle,
      })
    } else if (sessionStorage.tatavehicle != '' && sessionStorage.tatavehicle != undefined) {
      this.getstepper2 = JSON.parse(sessionStorage.tatavehicle);
      this.vehicle = this.fb.group({
        chassis: this.getstepper2.chassis,
        Financetype: this.getstepper2.Financetype,
        FinanceName: this.getstepper2.FinanceName,
        Address: this.getstepper2.Address,
        autoflag: this.getstepper2.autoflag,
        autoNumber: this.getstepper2.autoNumber,
        autoName: this.getstepper2.autoName,
        autoDob: this.getstepper2.autoDob,
      })
    } else if (sessionStorage.tataprepolicy != '' && sessionStorage.tataprepolicy != undefined) {
      this.getstepper3 = JSON.parse(sessionStorage.tataprepolicy);
      this.previouspolicy = this.fb.group({
        preflag: this.getstepper3.preflag,
        precode: this.getstepper3.precode,
        preName: this.getstepper3.preName,
        prepolno: this.getstepper3.prepolno,
        preAddressone: this.getstepper3.preAddressone,
        preAddresstwo: this.getstepper3.preAddresstwo,
        preAddressthree: this.getstepper3.preAddressthree,
        prepincode: this.getstepper3.prepincode,
        preState: this.getstepper3.preState,
        preDistrict: this.getstepper3.preDistrict,
        preCity: this.getstepper3.preCity,
      })
    } else if (sessionStorage.tatanominee != '' && sessionStorage.tatanominee != undefined) {
      this.getstepper4 = JSON.parse(sessionStorage.tatanominee);
      this.nominee = this.fb.group({
        nomieeName: this.getstepper4.nomieeName,
        nomineeAge: this.getstepper4.nomineeAge,
        nomineerelation: this.getstepper4.nomineerelation,
      })
    }
  }

  //Proposal Creation
  createproposal(stepper: MatStepper) {
    const data = {
      "platform": "web",
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": "0",
      "enquiry_id": 740,
      "created_by": "",
      "proposal_id": "",
      "motorproposalObj": {
        "pol_sdate": "20192405",
        "sp_name": "Name",
        "sp_license": "Lino12345566",
        "sp_place": "Mahbubnagar",
        "customer": {
          "salutation": this.proposer.controls['proposerTitle'].value,
          "first_name": this.proposer.controls['proposerFirstname'].value,
          "middle_name": this.proposer.controls['proposerMidname'].value,
          "last_name": this.proposer.controls['proposerLastname'].value,
          "gender": this.proposer.controls['proposerGender'].value,
          "dob": this.proposer.controls['proposerDob'].value,
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
          "flag": this.previouspolicy.controls['preflag'].value,
          "code": this.previouspolicy.controls['precode'].value,
          "name": this.previouspolicy.controls['preName'].value,
          "address1": this.previouspolicy.controls['preAddressone'].value,
          "address2": this.previouspolicy.controls['preAddresstwo'].value,
          "address3": this.previouspolicy.controls['preAddressthree'].value,
          "polno": this.previouspolicy.controls['prepolno'].value,
          "pincode": this.previouspolicy.controls['prepincode'].value
        },
        "financier": {
          "type": this.vehicle.controls['Financetype'].value,
          "name": this.vehicle.controls['FinanceName'].value,
          "address": this.vehicle.controls['Address'].value,
          "loanacno": ""
        },
        "automobile": {
          "flag": this.vehicle.controls['autoflag'].value,
          "number": this.vehicle.controls['autoNumber'].value,
          "name": this.vehicle.controls['autoName'].value,
          "expiry_date": this.vehicle.controls['autoDob'].value,
        },
        "nominee": {
          "name": this.nominee.controls['nomieeName'].value,
          "age": this.nominee.controls['nomineeAge'].value,
          "relation": this.nominee.controls['nomineerelation'].value
        },
        "driver": {
          "flag": this.vehicle.controls['driveflag'].value,
          "fname": this.vehicle.controls['driveFirstname'].value,
          "lname": this.vehicle.controls['driveLastname'].value,
          "gender": this.vehicle.controls['driveGender'].value,
          "age": this.vehicle.controls['driveAge'].value,
          "drivingexp": this.vehicle.controls['drivingexp'].value,
          "marital_status":this.vehicle.controls['drivemaritalStatus'].value,
        }
      }
    };
    this.bikeinsurance.proposal(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }

  proposalSuccess(successData) {
    this.relationlist = successData.ResponseObject;

  }

  proposalFailure(error) {

  }
}
