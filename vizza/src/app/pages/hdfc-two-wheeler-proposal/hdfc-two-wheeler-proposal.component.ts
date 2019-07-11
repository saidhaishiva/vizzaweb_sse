import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup} from '@angular/forms';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute} from '@angular/router';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

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
  selector: 'app-hdfc-two-wheeler-proposal',
  templateUrl: './hdfc-two-wheeler-proposal.component.html',
  styleUrls: ['./hdfc-two-wheeler-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class HdfcTwoWheelerProposalComponent implements OnInit {

    public today: any;
    public setting: any;
    public webhost: any;
    public customerDetails: any;
    public proposerAge: any;
    public personalDobError: any;
    public titleList: any;
    public companyList: any;
    public bankList: any;
    public proposerPinList: any;
    public vehicledetails: any;
    public proposer: FormGroup;
    public vechicle: FormGroup;
    public addOns: FormGroup;
    public BankDetails: FormGroup;
    public proposerComList: any;
    public previouspolicy: any;
    public vehicledata: any;
    public financeList: any;
    public bikeEnquiryId: any;


    constructor(public fb: FormBuilder, public appsetting: AppSettings, public config: ConfigurationService, public route: ActivatedRoute, public validation: ValidationService, private toastr: ToastrService, public bikeInsurance: BikeInsuranceService, public authservice: AuthService, public datepipe: DatePipe) {

        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.setting = appsetting.settings;
        this.webhost = this.config.getimgUrl();

        this.proposer = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            middleName: [''],
            dob: ['', Validators.required],
            title: ['', Validators.required],
            address: ['', Validators.required],
            paddress: ['', Validators.required],
            raddress: ['', Validators.required],
            address2: ['', Validators.required],
            paddress2: ['', Validators.required],
            raddress2: ['', Validators.required],
            pincode: ['', Validators.required],
            ppincode: ['', Validators.required],
            rpincode: ['', Validators.required],
            state: ['', Validators.required],
            stateId: [''],
            titleValue: [''],
            statepermanent: ['', Validators.required],
            pstateId: [''],
            citypermanent: ['', Validators.required],
            rstateId: [''],
            districtpermanent: ['', Validators.required],
            cityId: [''],
            landmarkpermanent: ['', Validators.required],
            pcityId: [''],
            statecom: ['', Validators.required],
            rcityId: [''],
            citycom: ['', Validators.required],
            districtId: [''],
            districtcom: ['', Validators.required],
            pdistrictId: [''],
            landmarkcom: ['', Validators.required],
            plandmark: [''],
            rlandmark: [''],
            address3: [''],
            paddress3: [''],
            raddress3: [''],
            alternateContact: [''],
            gstNumber: ['',],
            personalPan: [''],
            sameAsAddress: [''],
            regSameAscommAddress: [''],
            regSameAspermAddress: [''],
            address4:['', Validators.required],
            address5:['', Validators.required],
            address6:['', Validators.required],
            pincode1:['', Validators.required],

            gender: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

            mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
        });
        this.vechicle = this.fb.group({
            engine: ['', Validators.required],
            chassis: ['', Validators.required],
            vehiclemodel: ['', Validators.required],
            Vehicleregdate: '',
            regno: ['', Validators.required],
            manufactureyear: ['', Validators.required],
            Previouscompany:['', Validators.required ],
            ncb:['',Validators.required ],
            previousenddate:['',Validators.required ],
            previouspolicyno:['',Validators.required ],
            vechicleidv:['',Validators.required ],
            Financetype: ['',Validators.required],
            Agreement: [''],
            financiercode:[''],
            fibranchname:[''],
        });
        this.addOns =this.fb.group({
            extentioncountry: [''],
            policytenture: [''],
            drivinglicence: [''],

        });
      this.BankDetails =this.fb.group({
          Bankname: ['',Validators.required],
          Branch: ['',Validators.required],
          Payertype: ['',Validators.required],
          paymentmode: ['',Validators.required],
          refrenceno: ['',Validators.required],
          Paymentdate:['',Validators.required],


        });

    }

    ngOnInit() {
        this.changeGender();
        this.previouscompany();
        this.bankname();
        this.financiername();
        this.vehicledata = JSON.parse(sessionStorage.vehicledetails);
        this.bikeEnquiryId = sessionStorage.bikeEnquiryId;

        console.log(this.vehicledata,'iie');
        this.vechicle.controls['engine'].patchValue(this.vehicledata.engine_no);
        this.vechicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
        this.vehicledetails=JSON.parse(sessionStorage.bikeListDetails);
        this.vechicle.controls['vehiclemodel'].patchValue(this.vehicledetails.vehicle_model);
        this.vechicle.controls['Vehicleregdate'].patchValue(this.datepipe.transform(this.vehicledetails.registration_date, 'y-MM-dd'));
        this.vechicle.controls['regno'].patchValue(this.vehicledetails.vehicle_no);
        this.vechicle.controls['manufactureyear'].patchValue(this.vehicledetails.manu_yr);
        this.vechicle.controls['Previouscompany'].patchValue(this.vehicledetails.prev_insurance_name);
        this.vechicle.controls['ncb'].patchValue(this.vehicledetails.ncb_percent);
        this.vechicle.controls['previousenddate'].patchValue(this.datepipe.transform(this.vehicledetails.previous_policy_expiry_date,'y-MM-dd'));
    }


    //service

    // title change function
    changeGender() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeInsurance.hdfcGetTitleList(data).subscribe(
            (successData) => {
                this.titlesucccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }

    //insurance company change function
    previouscompany() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeInsurance.hdfcGetInsuranceCompanyList(data).subscribe(
            (successData) => {
                this.companysucccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }
    bankname() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeInsurance.hdfcGetBankNameList(data).subscribe(
            (successData) => {
                this.banksuccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }
    financiername() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeInsurance.hdfcGetFinancierNameList(data).subscribe(
            (successData) => {
                this.financesuccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }

    public titlesucccess(successData) {
        this.titleList = successData.ResponseObject;
    }
    public companysucccess(successData){
        this.companyList = successData.ResponseObject;

    }public banksuccess(successData){
        this.bankList = successData.ResponseObject;
    }public financesuccess(successData){
        this.financeList = successData.ResponseObject;
    }

    public failureSuccess(error) {
    }


  ///change title value
  changeTitle(){
    this.proposer.controls['titleValue'].patchValue(this.titleList[this.proposer.controls['title'].value]);
  }
  changeInsuranceCompany(){
      this.vechicle.controls['Previouscompany'].patchValue(this.companyList[this.vechicle.controls['Previouscompany'].value]);

  }changefinancecompany(){
      this.vechicle.controls['financiercode'].patchValue(this.companyList[this.vechicle.controls['financiercode'].value]);

  }changebankname(){
this.addOns.controls['Bankname'].patchValue(this.bankList[this.addOns.controls['Bankname'].value]);
    }



    //
  //stepper
  nextTab(stepper,value,type) {
    console.log(stepper,'step');

    if (type == 'stepper1') {
      // this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      // this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
console.log(sessionStorage.proposerAge,'rr');
if(this.proposer.valid){
        if (sessionStorage.proposerAge >= 18) {
          stepper.next();
          this.topScroll();
        } else {
          this.toastr.error('Proposer Age should be greater than 18.')
        }
      }else{
    this.toastr.error('Please Fill All The Mandtory Fields');

}
      if (type == 'stepper2') {
            console.log('wwwww');
            sessionStorage.stepper2Details = '';
            sessionStorage.stepper2Details = JSON.stringify(value);
            if (this.vechicle.valid) {
                stepper.next();
                this.topScroll();
            } else {
                this.toastr.error('Please fill the Mandatory Fields')

            }
        }
    }if (type == 'stepper3') {
            sessionStorage.stepper3Details = '';
            sessionStorage.stepper3Details = JSON.stringify(value);
            if (this.addOns.valid) {
              stepper.next();
              this.topScroll();

            }else{
              this.toastr.error('Please fill the Mandatory Fields')

            }
          }else{
          this.toastr.error('Please fill the Mandatory Fields')

      }




      // this.proposerFormData = this.relianceProposal.value;
      // this.riskFormData = this.riskDetails.value;
      // this.coverFormData = this.coverDetails.value;
      // this.previousFormData = this.previousInsurance.value;

      // this.summaryData = true;


    }
    check(event) {
        console.log(event);
        if (event.checked == true) {
            this.vechicle.controls['Agreement'].setValidators([Validators.required]);
            this.vechicle.controls['financiercode'].setValidators([Validators.required]);
            this.vechicle.controls['fibranchname'].setValidators([Validators.required]);
        } else if (event.checked != true) {
            this.vechicle.controls['Agreement'].patchValue('');
            this.vechicle.controls['financiercode'].patchValue('');
            this.vechicle.controls['fibranchname'].patchValue('');
            this.vechicle.controls['Agreement'].setValidators(null);
            this.vechicle.controls['financiercode'].setValidators(null);
            this.vechicle.controls['fibranchname'].setValidators(null);
        }
        this.vechicle.controls['Agreement'].updateValueAndValidity();
        this.vechicle.controls['financiercode'].updateValueAndValidity();
        this.vechicle.controls['fibranchname'].updateValueAndValidity();
    }





  //

  //dob
  addEvent(event, type) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposor') {
            this.personalDobError = '';
          } else if (type == 'nominee') {
            this.personalDobError = '';
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          } else if (type == 'insurer') {
            this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          this.personalDobError = '';
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }
      }
      if (type == 'proposor') {
        console.log(this.proposerAge, 'age');
        sessionStorage.proposerAge = this.proposerAge;
      }
    }
  }
    getPostalCode(pin, type) {
        console.log(pin, type, 'pincode');
        const data = {
            'platform': 'web',
            'pincode': pin,
        };
        if (pin.length == 6) {
            this.bikeInsurance.PincodeList(data).subscribe(
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
          console.log(successData,'ss');
            if (type == 'proposer') {
                this.proposerPinList = successData.ResponseObject;
                this.proposer.controls['statepermanent'].patchValue(this.proposerPinList.text_state);
                this.proposer.controls['districtpermanent'].patchValue(this.proposerPinList.text_city_district);
                this.proposer.controls['citypermanent'].patchValue(this.proposerPinList.text_pincode_locality);
            } else if (type == 'comm') {
                this.proposerComList = successData.ResponseObject;
                this.proposer.controls['statecom'].patchValue(this.proposerComList.text_state);
                this.proposer.controls['districtcom'].patchValue(this.proposerComList.text_city_district);
                this.proposer.controls['citycom'].patchValue(this.proposerComList.text_pincode_locality);
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
    //create proposal
    createproposal(){
        const data={

            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '0',
            "pos_status":this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "enquiry_id": this.bikeEnquiryId,
            "created_by": "",
            "proposal_id": "",
            "motorproposalObj": {
            "Customer_Details": {
                "Customer_FirstName": this.proposer.controls['firstName'].value,
                    "Customer_MiddleName": this.proposer.controls['firstName'].value,
                    "Customer_LastName": this.proposer.controls['firstName'].value,
                    "Customer_DateofBirth": this.datepipe.transform(this.proposer.controls['proposerDob'].value, 'yMMdd'),
                    "Customer_Email": this.proposer.controls['firstName'].value,
                    "Customer_Mobile": this.proposer.controls['firstName'].value,
                    "Customer_Telephone": [],
                    "Customer_PanNo": this.proposer.controls['firstName'].value,
                    "Customer_Salutation": this.proposer.controls['firstName'].value,
                    "Customer_Gender": this.proposer.controls['firstName'].value,
                    "Customer_Perm_Address1": this.proposer.controls['firstName'].value,
                    "Customer_Perm_Address2": this.proposer.controls['firstName'].value,
                    "Customer_Perm_Apartment": this.proposer.controls['firstName'].value,
                    "Customer_Perm_Street": this.proposer.controls['firstName'].value,
                    "Customer_Perm_CityDistrictCode": [],
                    "Customer_Perm_CityDistrict": [],
                    "Customer_Perm_StateCode": [],
                    "Customer_Perm_State": [],
                    "Customer_Perm_PinCode": this.proposer.controls['firstName'].value,
                    "Customer_Perm_PinCodeLocality": [],
                    "Customer_Mailing_Address1": this.proposer.controls['firstName'].value,
                    "Customer_Mailing_Address2": this.proposer.controls['firstName'].value,
                    "Customer_Mailing_Apartment": this.proposer.controls['firstName'].value,
                    "Customer_Mailing_Street": this.proposer.controls['firstName'].value,
                    "Customer_Mailing_CityDistrictCode": [],
                    "Customer_Mailing_CityDistrict": [],
                    "Customer_Mailing_StateCode": [],
                    "Customer_Mailing_State": [],
                    "Customer_Mailing_PinCode": this.proposer.controls['firstName'].value,
                    "Customer_Mailing_PinCodeLocality": [],
                    "Customer_GSTIN_Number": [],
                    "Customer_GSTIN_State": []
            },
            "Policy_Details": {
                "PolicyStartDate": "24/05/2019",
                    "PreviousPolicyEndDate": [],
                    "ProposalDate": "15/04/2019",
                    "AgreementType": [],
                    "FinancierCode": [],
                    "BranchName": [],
                    "PreviousPolicy_CorporateCustomerId_Mandatary": this.proposer.controls['firstName'].value,
                    "PreviousPolicy_NCBPercentage": this.proposer.controls['firstName'].value,
                    "PreviousPolicy_PolicyEndDate": this.proposer.controls['firstName'].value,
                    "PreviousPolicy_PolicyNo": this.proposer.controls['firstName'].value,
                    "PreviousPolicy_PolicyClaim": this.proposer.controls['firstName'].value,
                    "BusinessType_Mandatary": "Roll Over",
                    "VehicleModelCode": this.proposer.controls['firstName'].value,
                    "DateofDeliveryOrRegistration": this.proposer.controls['firstName'].value,
                    "YearOfManufacture": this.proposer.controls['firstName'].value,
                    "Registration_No": this.proposer.controls['firstName'].value,
                    "EngineNumber": this.proposer.controls['firstName'].value,
                    "ChassisNumber": this.proposer.controls['firstName'].value,
                    "RTOLocationCode": this.proposer.controls['firstName'].value,
                    "Vehicle_IDV": this.proposer.controls['firstName'].value
            },
            "Req_TW": {
                "ExtensionCountryCode": "0",
                    "POLICY_TENURE": "1",
                    "ExtensionCountryName": [],
                    "Effectivedrivinglicense": "true",
                    "Paiddriver": "1",
                    "BiFuelType": "LPG",
                    "BiFuel_Kit_Value": "10000",
                    "Paiddriver_Si": "0",
                    "Owner_Driver_Nominee_Name": [],
                    "Owner_Driver_Nominee_Age": "0",
                    "Owner_Driver_Nominee_Relationship": [],
                    "Owner_Driver_Appointee_Name": [],
                    "Owner_Driver_Appointee_Relationship": [],
                    "IsZeroDept_Cover": "1",
                    "ElecticalAccessoryIDV": "0",
                    "NonElecticalAccessoryIDV": "0",
                    "IsLimitedtoOwnPremises": "0",
                    "OtherLoadDiscRate": "0",
                    "AntiTheftDiscFlag": "false",
                    "HandicapDiscFlag": "false",
                    "UnnamedPersonSI": "40000",
                    "NoofUnnamedPerson": "1"
            },
            "Payment_Details": {
                "GC_PaymentID": [],
                    "BANK_NAME": this.proposer.controls['firstName'].value,
                    "BANK_BRANCH_NAME": this.proposer.controls['firstName'].value,
                    "PAYMENT_MODE_CD": this.proposer.controls['firstName'].value,
                    "PAYER_TYPE": this.proposer.controls['firstName'].value,
                    "PAYMENT_AMOUNT": this.proposer.controls['firstName'].value,
                    "INSTRUMENT_NUMBER": this.proposer.controls['firstName'].value,
                    "PAYMENT_DATE": this.proposer.controls['firstName'].value

        }
        }
        };
    }
  //
  ageCalculate(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }
  //
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
  nameValidate(event: any){
    this.validation.nameValidate(event);
  }

  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }
}

