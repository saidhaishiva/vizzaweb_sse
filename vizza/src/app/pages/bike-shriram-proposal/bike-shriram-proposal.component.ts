import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ActivatedRoute} from '@angular/router';
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
  selector: 'app-bike-shriram-proposal',
  templateUrl: './bike-shriram-proposal.component.html',
  styleUrls: ['./bike-shriram-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class BikeShriramProposalComponent implements OnInit {
  public proposer: FormGroup;
  public vehical: FormGroup;
  public previousInsure: FormGroup;
  public nomineeDetail: FormGroup;
  public minDate: any;
  public maxdate: any;
  public shriramProposer: any;
  public pincodeList: any;
  public settings: Settings;
  public proposerRatioDetail: boolean;
  public driverAgeDetail: boolean;
  public insurerdateError: any;
  public proposerAgeP: any;
  public insuredAgeP: any;
  public maxStartdate: any;
  public pannumberP: boolean;
  public bikeCityList: any;
  public bkVehicleList: any;
  public bkHypothecationList: any;
  public bikeProposerAge: any;
  public proposerdateError: any;
  public nomineeRelation: any;
  public hypothecationTypedm: any;
  public addonPackagedm: any;
  public titleList: any;
  public policyTypeList: any;
  public proposalTypeList: any;
  public finance: boolean;
  public claimDetails: any;
  public claimList: boolean;
  public previousList: any;
  public summaryData: any;
  public bikeEnquiryDetails: any;
  public ProposalId: any;
  public apponiteeList: boolean;
  public electricalValid: boolean;
  public nonelectricalValid: boolean;
  public policyTypeDetails: boolean;
  public perviousDate: boolean;
  public paUnNamed: boolean;
  public pType: boolean;
  public proposerFormData : any;
  public vehicalFormData : any;
  public previousFormData : any;
  public nomineeFormData : any;
  public buyBikeDetails : any;
  public pincodeState : any;
  public stateList : any;
  public pincodeCity : any;
  public pincodeHypoList : any;
  public pincodeHypoState : any;
  public pincodeHypoCity : any;
  public previousDateError : any;
  public webhost : any;
  public declaration : any;
  public PaymentRedirect : any;
  public PolicySisID : any;
  public PaymentReturn : any;
  public hypothecationTypeDetails : any;
  public enquiryFormData : any;
  public bikeEnquiryId : any;
  public siValue : any;
  public policyDatevalidate : any;
    public currentStep : any;
    public premiumAmount : any;
    public packagelist : any;

  public genderList: boolean;
    constructor(public fb: FormBuilder, public validation: ValidationService,public route: ActivatedRoute, public config: ConfigurationService,public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public bikeInsurance: BikeInsuranceService ) {
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 4;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.PaymentRedirect = this.summaryData.PaymentURL;
                    this.ProposalId = this.summaryData.ProposalId;
                    this.PolicySisID =   this.summaryData.PolicySisID;
                    this.PaymentReturn =   this.summaryData.PaymentReturn;
                    sessionStorage.shiramFwProposalID = this.ProposalId;
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.vehicalFormData = JSON.parse(sessionStorage.vehicalFormData);
                    this.previousFormData = JSON.parse(sessionStorage.previousFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    console.log(this.summaryData ,'this.summaryData ');
                    console.log(sessionStorage.summaryData,'sessionStorage.summaryData ');
                }
            }
        });
        this.currentStep = stepperindex;
        console.log(this.currentStep,'this.currentStep');
        const minDate = new Date();
        this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());

    this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();

        this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.proposerRatioDetail = false;
    this.driverAgeDetail = false;
    this.proposerAgeP = '';
    this.insuredAgeP = '';
    this.maxStartdate = '';
    this.pannumberP = false;
    this.finance = false;
    this.claimList = false;
    this.apponiteeList = false;
    this.pType = false;
    this.electricalValid = false;
    this.nonelectricalValid = false;
    this.paUnNamed = false;
    this.policyTypeDetails = false;
    this.policyDatevalidate = [];
    this.proposer = this.fb.group({
      title: ['', Validators.required],
      name: new FormControl(''),
      dob: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pincode: ['', Validators.required],
      radio: ' ',
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      fax: '',
      pan: ['', Validators.compose([ Validators.minLength(10)])],
      gst: ['', Validators.compose([Validators.minLength(15)])],
      address: ['', Validators.required],
      address2: '',
      address3: '',
      state: '',
      stateName: '',
      city: '',
      cityName: '',
      breakIn: '',
    });
    this.vehical = this.fb.group({
        proposalType: 'Renewal',
        policyTypeName: '',
      policyType: ['', Validators.required],
      vehicleColour: ['', Validators.required],
      nilDepreciationCover: '',
      electricalAccess: '',
      electricalAccessSI: '',
      nonElectricalAccess: '',
      nonElectricalAccessSI: '',
      paforUnnamed: '',
      paforUnnamedSI: '',
      hypothecationType: '',
        hypothecationTypeName: '',
      hypothecationAddress1: '',
      hypothecationAddress2: '',
      hypothecationAddress3: '',
      hypothecationAgreementNo: '',
      antiTheft: '',
      lltoPaidDriver: '',
      addonPackage:'',
      hypothecationBankName:'',
      pincode:'',
      state:'',
      city:'',
      stateName:'',
      cityName:'',
      isFinanced:'',
    });
    this.previousInsure = this.fb.group({
      policyNumber:['', Validators.required],
      // previousInsured: ['', Validators.required],
      // policyUwYear:  ['', Validators.compose([Validators.pattern('[2]{1}[0-9]{3}')])],
      previousPolicyType: ['', Validators.required],
      policyNilDescription: '0',
      // previousdob:['', Validators.required],
      previousPolicyTypeName:'',
        // previousdEndob:['', Validators.required],
        policySi:['', Validators.required]

    });


    this.nomineeDetail = this.fb.group({
      nomineeName: '',
      nomineeAge: '',
      nomineeRelationship: '',
      appointeeName: '',
      appointeeRelationship: ''
    });
        this.genderList = false;

    }

  ngOnInit() {
      this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
      this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
      this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
      this.packagelist = sessionStorage.packae_list;
         this.changeTitle();
         this.changehypothecation();
         this.policyType();
         this.proposalType();
         this.addonPackage();
         this.previousInsureType();
         this.claimpercent();
         this.nomineeRelationShip();
         this.changehypothecationType();

      this.sessionData();
  }



  // FIRST STEPPER

  // title change function
      changeTitle() {
        const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.bikeInsurance.getTitleList(data).subscribe(
            (successData) => {
              this.titlesucccess(successData);
            },
            (error) => {
              this.failureSuccess(error);
            }
        );
      }
        public titlesucccess(successData){
          this.titleList = successData.ResponseObject;
        }
        public failureSuccess(error) {
        }
        changeGender() {
        if (this.proposer.controls['title'].value == 'Mr') {
            this.genderList = false;
            this.proposer.controls['gender'].patchValue('Male');
        } else if(this.proposer.controls['title'].value == 'Ms' || this.proposer.controls['title'].value == 'Mrs' )  {
            this.genderList = false;
            this.proposer.controls['gender'].patchValue('Female');
        } else {
            if(this.proposer.controls['title'].value == 'Dr'){
                this.genderList = true;
            }
            }

    }

    // AGE VALIDATION
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

         // validation previous page


  // date input



    addEvent(event,type) {
        if (event.value != null) {
            let selectedDate = '';
            this.bikeProposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insurerdateError = '';
                } else {
                    this.insurerdateError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.bikeProposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.bikeProposerAge;

                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.bikeProposerAge = this.ageCalculate(dob);
                    sessionStorage.insuredAgePA = this.bikeProposerAge;

                }
                this.insurerdateError = '';
            }
            sessionStorage.bkShriramProposerAge = this.bikeProposerAge;

        }
    }
  // // PINCODE
           getPostalCode(pin) {
              const data = {
                'platform': 'web',
                'pin_code': pin
              };
              console.log(data,'jhgjh');
              if (pin.length == 6) {
                this.bikeInsurance.getPincodeList(data).subscribe(
                    (successData) => {
                      this.pinProposerListSuccess(successData, pin);
                    },
                    (error) => {
                      this.pinProposerListFailure(error);
                    }
                );
              }
            }

            public pinProposerListSuccess(successData, pin) {
              if (successData.IsSuccess) {
                this.pincodeList = successData.ResponseObject;
                console.log(pin,'jhgfdghj');
                  if(pin.length == '' || pin.length == 0 || pin.length != 6){
                      this.proposer.controls['state'].patchValue('');
                      this.proposer.controls['city'].patchValue('');
                  }
                for(let key in this.pincodeList.state) {
                    this.proposer.controls['state'].patchValue(key);
                    this.proposer.controls['stateName'].patchValue(this.pincodeList['state'][key]);
                }
                  for(let key in this.pincodeList.city) {
                      this.proposer.controls['city'].patchValue(key);
                      this.proposer.controls['cityName'].patchValue(this.pincodeList['city'][key]);
                  }

                } else{
                  this.toastr.error(successData.ErrorObject);
                  this.proposer.controls['state'].patchValue('');
                  this.proposer.controls['city'].patchValue('');

              }
        }


            public pinProposerListFailure(error) {
            }

            driverAgeList() {
              console.log(this.proposer.controls['driverAge'].value,'eeeeeeeeeeeeeeee');
              if (this.proposer.controls['driverAge'].value == 'Yes') {
                this.driverAgeDetail = true;
              } else {
                this.driverAgeDetail = false;
              }
            }

      changeCity() {
        this.proposer.controls['proposerbkCityName'].patchValue(this.bikeCityList[this.proposer.controls['proposerbkCity'].value]);

      }
      changevehicle() {
        this.proposer.controls['vehicleTypeName'].patchValue(this.bkVehicleList[this.proposer.controls['vehicleType'].value]);

      }

  // NEXT BUTTON

        public proposerDetails(stepper: MatStepper, value) {
          console.log(value, 'eeeeeeeeeee');
          sessionStorage.stepper1 = '';
          sessionStorage.stepper1 = JSON.stringify(value);
          console.log(this.proposer.valid, 'checked');
          if(this.proposer.valid) {
              if(sessionStorage.bkShriramProposerAge >= 18){
                  stepper.next();
                  this.topScroll();


                  this.vehical.controls['proposalType'].patchValue('Renewal');

              } else {
                  this.toastr.error('Proposer age should be 18 or above');

              }
          }

        }

 // SECOND STEPPER

    addonPackage() {
        if(this.buyBikeDetails.plan_code == 'ADDON_01') {
            this.vehical.controls['addonPackage'].patchValue('BASIC');
        } else if (this.buyBikeDetails.plan_code == 'ADDON_02') {
            this.vehical.controls['addonPackage'].patchValue('SILVER PACKAGE');
        } else if (this.buyBikeDetails.plan_code == 'ADDON_03') {
            this.vehical.controls['addonPackage'].patchValue('GOLD PACKAGE');
        } else if (this.buyBikeDetails.plan_code == 'ADDON_04') {
            this.vehical.controls['addonPackage'].patchValue(' PLATINUM PACKAGE');
        }
    }

          proposalType() {
            const data = {
              'platform': 'web',
              'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
              'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
              'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'


            }
            this.bikeInsurance.getProposalDetails(data).subscribe(
                (successData) => {
                  this.proposalTypeSuccess(successData);
                },
                (error) => {
                  this.proposalTypeFailure(error);
                }
            );
          }
          public proposalTypeSuccess(successData){
            if (successData.IsSuccess) {
              this.proposalTypeList = successData.ResponseObject;
            }
          }
          public proposalTypeFailure(error) {
          }

    policyDetail(){
            this.previousInsure.controls['previousPolicyTypeName'].patchValue(this.policyTypeList[this.previousInsure.controls['previousPolicyType'].value]);

    }
    gethypoTypeName(){
        this.vehical.controls['hypothecationTypeName'].patchValue(this.hypothecationTypeDetails[this.vehical.controls['hypothecationType'].value]);

    }
        policyType() {
              const data = {
                'platform': 'web',
                'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
                'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
                'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'


              }
              this.bikeInsurance.getPolicyDetails(data).subscribe(
                  (successData) => {
                    this.policyTypeSuccess(successData);
                  },
                  (error) => {
                    this.policyTypeFailure(error);
                  }
              );
          }
            public policyTypeSuccess(successData){
              if (successData.IsSuccess) {
                this.policyTypeList = successData.ResponseObject;
              }
            }
            public policyTypeFailure(error) {
            }

        changehypothecation() {

            const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

          }
          this.bikeInsurance.getHypothecation(data).subscribe(
              (successData) => {
                this.hypothecationSuccess(successData);
              },
              (error) => {
                this.hypothecationFailure(error);
              }
          );
        }
        public hypothecationSuccess(successData){
          if (successData.IsSuccess) {
            this.hypothecationTypedm = successData.ResponseObject;
          }
          console.log(this.hypothecationTypedm,'this.hypothecationTypedm');
        }
        public hypothecationFailure(error) {
        }
// hypo type
    changehypothecationType() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

        }
        this.bikeInsurance.getHypothecationType(data).subscribe(
            (successData) => {
                this.hypothecationTypeSuccess(successData);
            },
            (error) => {
                this.hypothecationTypeFailure(error);
            }
        );
    }
    public hypothecationTypeSuccess(successData){
        if (successData.IsSuccess) {
            this.hypothecationTypeDetails = successData.ResponseObject;
        }
        console.log(this.hypothecationTypedm,'this.hypothecationTypedm');
    }
    public hypothecationTypeFailure(error) {
    }

    // hypo pincode
    getHypoPostalCode(pin) {
        const data = {
            'platform': 'web',
            'pin_code': pin
        };
        console.log(data,'jhgjh');
        if (pin.length == 6) {
            this.bikeInsurance.getHypoPincodeList(data).subscribe(
                (successData) => {
                    this.pinListSuccess(successData, pin);
                },
                (error) => {
                    this.pinListFailure(error);
                }
            );
        }
    }




    public pinListSuccess(successData, pin) {
                if (successData.IsSuccess) {
                    this.pincodeHypoCity = successData.ResponseObject;
                    console.log(pin,'jhgfdghj');
                    if(pin.length == '' || pin.length == 0 || pin.length != 6){
                        this.vehical.controls['state'].patchValue('');
                        this.vehical.controls['city'].patchValue('');
                    }
                    for(let key in this.pincodeHypoCity.state) {
                        this.vehical.controls['state'].patchValue(key);
                        this.vehical.controls['stateName'].patchValue(this.pincodeHypoCity['state'][key]);
                    }
                    for(let key in this.pincodeHypoCity.city) {
                        this.vehical.controls['city'].patchValue(key);
                        this.vehical.controls['cityName'].patchValue(this.pincodeHypoCity['city'][key]);
                    }

            } else{
                this.toastr.error(successData.ErrorObject);
                this.vehical.controls['state'].patchValue('');
                this.vehical.controls['city'].patchValue('');

            }
    }



    public pinListFailure(error) {
    }

    electricalAccess(value){
        if(value.checked){
            this.electricalValid = true;
            this.vehical.controls['electricalAccessSI'].setValidators([Validators.required]);
        } else {
            this.electricalValid = false;
            this.vehical.controls['electricalAccessSI'].setValidators(null);
            this.vehical.controls['electricalAccessSI'].patchValue('');

        }
    }
    nonElectricalAccess(value){
        if(value.checked){
            this.nonelectricalValid = true;
            this.vehical.controls['nonElectricalAccessSI'].setValidators([Validators.required]);
        } else {
            this.nonelectricalValid = false;
            this.vehical.controls['nonElectricalAccessSI'].setValidators(null);
            this.vehical.controls['nonElectricalAccessSI'].patchValue('');

        }
    }
    changePA(value){
        if(value.checked){
            this.paUnNamed = true;
            this.vehical.controls['paforUnnamedSI'].setValidators([Validators.required]);
        } else {
            this.paUnNamed = false;
            this.vehical.controls['paforUnnamedSI'].setValidators(null);
            this.vehical.controls['paforUnnamedSI'].patchValue('');

        }
    }
    financeType(value){
    if(value.checked){
      this.finance = true;
        this.vehical.controls['hypothecationType'].setValidators([Validators.required]);
        this.vehical.controls['hypothecationAddress1'].setValidators([Validators.required]);
        this.vehical.controls['hypothecationBankName'].setValidators([Validators.required]);

    } else{
      this.finance = false;
        this.vehical.controls['hypothecationType'].setValidators(null);
        this.vehical.controls['hypothecationAddress1'].setValidators(null);
        this.vehical.controls['hypothecationBankName'].setValidators(null);
        this.vehical.controls['hypothecationType'].patchValue('');
        this.vehical.controls['hypothecationAddress1'].patchValue('');
        this.vehical.controls['hypothecationBankName'].patchValue('');

    }
  }
    selectPolicy(){
        // MOT-PLT-002
        this.vehical.controls['policyTypeName'].patchValue(this.policyTypeList[this.vehical.controls['policyType'].value]);
        if( this.vehical.controls['policyType'].value == 'MOT-PLT-002'){
            this.policyTypeDetails = true;
            this.vehical.controls['nilDepreciationCover'].patchValue('');
            this.vehical.controls['electricalAccess'].patchValue('');
            this.vehical.controls['nonElectricalAccess'].patchValue('');
            this.vehical.controls['antiTheft'].patchValue('');

        } else {
            this.policyTypeDetails = false;
            this.vehical.controls['lltoPaidDriver'].patchValue('');
            this.vehical.controls['paforUnnamed'].patchValue('');

        }
    }
  // NEXT BUTTON
          vehicalDetails(stepper: MatStepper, value){
              sessionStorage.stepper2 = '';
              sessionStorage.stepper2 = JSON.stringify(value);
              let valid = 20/100;
              this.siValue = valid * this.buyBikeDetails.Idv;
              console.log(this.siValue, 'sdfdfdadf');
              if(this.vehical.valid){
                       stepper.next();
                  this.topScroll();


              }
          }



  // THIRD STEPPER
  //       previousClaim(){
  //           if(this.previousInsure.controls['policyClaim'].value == 1) {
  //             this.claimList = true;
  //             this.claimpercent();
  //           }  else {
  //             this.claimList = false;
  //
  //           }
  //       }
        claimpercent() {
          const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

          }
          this.bikeInsurance.getClaimList(data).subscribe(
              (successData) => {
                this.claimSuccess(successData);
              },
              (error) => {
                this.claimFailure(error);
              }
          );
        }
        public claimSuccess(successData){
          if (successData.IsSuccess) {
            this.claimDetails = successData.ResponseObject;
          }
        }
        public claimFailure(error) {
        }


        // from date
    addEventPrevious(event) {
        this.policyDatevalidate = [];

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.previousDateError = '';
                } else {
                    this.previousDateError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    let year = new Date(dob);
                    let getPolicyYear = year.getFullYear();
                    this.previousInsure.controls['policyUwYear'].patchValue(getPolicyYear);
                }

                //sessionStorage.insuredAgePA = this.bikeProposerAge;
            }   else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    let year = new Date(dob);
                    let getPolicyYear = year.getFullYear();
                    this.previousInsure.controls['policyUwYear'].patchValue(getPolicyYear);

                }
            }

        }
        // let start = this.datepipe.transform(new Date(this.previousInsure.controls['previousdob'].value), 'y-MM-dd');
        // let end = this.datepipe.transform(new Date(this.previousInsure.controls['previousdEndob'].value), 'y-MM-dd');
        // var d = new Date(this.previousInsure.controls['previousdob'].value);
        // var year = d.getFullYear();
        // var month = d.getMonth();
        // var day = d.getDate();
        // for (let i = 1; i <= 3; i++) {
        //     this.policyDatevalidate.push(this.getFormattedDate(new Date(year + i, month, day - 1)));
        // }
        // console.log(this.policyDatevalidate, 'this.policyDatevalidate');
        // sessionStorage.policyDatevalidateArray = JSON.stringify(this.policyDatevalidate);
    }

  previousInsureType() {
        const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0'

        }
        this.bikeInsurance.getPreviousList(data).subscribe(
            (successData) => {
              this.previousInsureSuccess(successData);
            },
            (error) => {
              this.previousInsureFailure(error);
            }
        );
      }
      public previousInsureSuccess(successData){
        if (successData.IsSuccess) {
          this.previousList = successData.ResponseObject;
        }
      }
      public previousInsureFailure(error) {
      }

    uvYear(){
       if(this.previousInsure.controls['policyUwYear'].value > 2000){

       }

    }
     getFormattedDate(newdate) {
        var todayTime = new Date();
        var month = newdate .getMonth() + 1;
        var day = newdate .getDate();
        var year =newdate .getFullYear();
        return year + "-" + this.changeValidate(month,2, 0) + "-" + this.changeValidate(day,2, 0);
    }

     changeValidate(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }


    previousDetails(stepper: MatStepper, value) {
        console.log(value, 'vvvvvv');
        sessionStorage.stepper3 = '';
        sessionStorage.stepper3 = JSON.stringify(value);

        if (this.previousInsure.valid) {
                stepper.next();
                        this.topScroll();


        }

    }

//  fFOURTH sTEPPER (NOMINEE)
      ageNominee(){
      if(this.nomineeDetail.controls['nomineeAge'].value <= 17){
        this.apponiteeList = true;
      }  else{
        this.apponiteeList = false;
        this.nomineeDetail.controls['appointeeName'].patchValue('');
        this.nomineeDetail.controls['appointeeRelationship'].patchValue('');

      }
      }
        //RELATIONSHIP
          nomineeRelationShip(){
            const data = {
              'platform': 'web',
              'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
              'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
            }
              this.bikeInsurance.getNomineeRelationship(data).subscribe(
                  (successData) => {
                    this.nomineeRelationSuccess(successData);
                  },
                  (error) => {
                    this.nomineeRelationFailure(error);
                  }
              );
            }
            public nomineeRelationSuccess(successData) {
              if (successData.IsSuccess) {
                this.nomineeRelation = successData.ResponseObject;
                console.log(this.nomineeRelation, 'this.nomineeRelation');
              }
            }
            public nomineeRelationFailure(error){
            }

        nomineeDetails(stepper: MatStepper, value){
          sessionStorage.stepper4 = '';
          sessionStorage.stepper4 = JSON.stringify(value);
          if(this.nomineeDetail.valid){
              if(this.nomineeDetail['controls'].nomineeAge.value > 17) {
                  this.proposal(stepper);
              } else {
                  if(this.nomineeDetail['controls'].appointeeName.value !="" && this.nomineeDetail['controls'].appointeeRelationship.value !="")  {
                      this.proposal(stepper);
                  }   else {
                      this.toastr.error('Please fill the appointee details');
                  }
              }
          }

  }
  // VALIDATION
          numberValidate(event: any) {
            this.validation.numberValidate(event);
          }
          nameValidate(event: any) {
            this.validation.nameValidate(event);
          }
          // Dob validation
          dobValidate(event: any) {
            this.validation.dobValidate(event);
          }
          spac(event: any){
            this.validation.spac(event);

          }
          idValidate(event: any) {
            this.validation.idValidate(event);
          }
        topScroll() {
          document.getElementById('main-content').scrollTop = 0;
        }

    // proposal Creation

  proposal(stepper) {
      const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
          'enquiry_id': this.bikeEnquiryId,
          "created_by": "",
          'proposal_id': sessionStorage.shiramBikeproposalID == '' || sessionStorage.shiramBikeproposalID == undefined ? '' : sessionStorage.shiramBikeproposalID,
          "geogrophicalExtensionCover": "false",
          "package_type": this.packagelist,
          "motorProposalObj": {
              // "PreviousPolicyFromDt": this.previousInsure.controls['previousdob'].value,
              "InsuredPrefix": "1",
              "InsuredName": this.proposer.controls['name'].value,
              "Gender": this.proposer.controls['gender'].value == 'Male' ? 'M' : 'F',
              "Address1": this.proposer.controls['address'].value,
              "Address2": this.proposer.controls['address2'].value,
              "Address3": this.proposer.controls['address3'].value,
              "State": 'TN',
              "City": this.proposer.controls['city'].value,
              "PinCode": this.proposer.controls['pincode'].value,
              "PanNo": this.proposer.controls['pan'].value,
              "TelephoneNo": "",
              "FaxNo": "",
              "GSTNo": "",
              "EMailID": this.proposer.controls['email'].value,
              "PolType": this.vehical.controls['policyType'].value,
              "ProposalType": this.vehical.controls['proposalType'].value,
              "MobileNo": this.proposer.controls['mobile'].value,
              "DateOfBirth": this.proposer.controls['dob'].value,
              "CoverNoteNo": "",
              "CoverNoteDt": "",
              "IDV_of_Vehicle": this.buyBikeDetails.Idv,
              "Colour": this.vehical.controls['vehicleColour'].value,
              "NoEmpCoverLL": "",
              "VehiclePurposeYN": "",
              "DriverAgeYN": "0",
              "LimitOwnPremiseYN": "0",
              "CNGKitYN": "0",
              "CNGKitSI": "",
              "LimitedTPPDYN": "0",
              "InBuiltCNGKitYN": "0",
              "VoluntaryExcess": "TWVE1",
              "Bangladesh": "0",
              "Bhutan": "0",
              "SriLanka": "0",
              "Pakistan": "0",
              "Nepal": "0",
              "Maldives": "0",
              "DeTariff": "0",
              "PreInspectionReportYN": "0",
              "PreInspection": "",
              "BreakIn": "NO",
              "AddonPackage": this.buyBikeDetails.plan_code,
              "NilDepreciationCoverYN": this.vehical.controls['nilDepreciationCover'].value == true ? '1' : '0',
              "PAforUnnamedPassengerYN": this.vehical.controls['paforUnnamed'].value == true ? '1' : '0',
              "PAforUnnamedPassengerSI": this.vehical.controls['paforUnnamed'].value == true ? this.siValue : '',
              "ElectricalaccessYN": this.vehical.controls['electricalAccess'].value == true ? '1' : '0',
              "ElectricalaccessSI": this.vehical.controls['electricalAccess'].value == true ? this.siValue : '',
              "NonElectricalaccessYN": this.vehical.controls['nonElectricalAccess'].value == true ? '1' : '0',
              "NonElectricalaccessSI":  this.vehical.controls['nonElectricalAccess'].value == true ? this.siValue : '',
              "PAPaidDriverConductorCleanerYN": "0",
              "PAPaidDriverConductorCleanerSI": "",
              "PAPaidDriverCount": "",
              "PAPaidConductorCount": "",
              "PAPaidCleanerCount": "",
              "ElectricalaccessRemarks": "",
              "NonElectricalaccessRemarks": "",
              "SpecifiedPersonField": "",
              "PAOwnerDriverExclusion": "",
              "PAOwnerDriverExReason": "",
              "NomineeNameforPAOwnerDriver": this.nomineeDetail.controls['nomineeName'].value,
              "NomineeAgeforPAOwnerDriver": this.nomineeDetail.controls['nomineeAge'].value,
              "NomineeRelationforPAOwnerDriver": this.nomineeDetail.controls['nomineeRelationship'].value,
              "AppointeeNameforPAOwnerDriver": this.nomineeDetail.controls['appointeeName'].value,
              "AppointeeRelationforPAOwnerDriver": this.nomineeDetail.controls['appointeeRelationship'].value,
              "LLtoPaidDriverYN": this.vehical.controls['lltoPaidDriver'].value == true ? '1' : '0',
              "AntiTheftYN": this.vehical.controls['antiTheft'].value == true ? '1' : '0',
              "PreviousPolicyNo": this.previousInsure.controls['policyNumber'].value,
              // "PreviousInsurer": this.previousInsure.controls['previousInsured'].value,
              // "PreviousPolicyUWYear": this.previousInsure.controls['policyUwYear'].value,
              "PreviousPolicySI": this.previousInsure.controls['policySi'].value,
              // "PreviousPolicyClaimYN": this.previousInsure.controls['policyClaim'].value == true ? '1' : '0',
             // / "PreviousPolicyNCBPerc": this.previousInsure.controls['previousPolicyNcb'].value ? this.previousInsure.controls['previousPolicyNcb'].value : 0,
              "PreviousPolicyType": this.previousInsure.controls['previousPolicyType'].value,
              "PreviousNilDepreciation": this.previousInsure.controls['policyNilDescription'].value,
              "HypothecationType": this.vehical.controls['hypothecationType'].value ? this.vehical.controls['hypothecationType'].value : '',
              "HypothecationBankName": this.vehical.controls['hypothecationBankName'].value ? this.vehical.controls['hypothecationBankName'].value : '' ,
              "HypothecationAddress1": this.vehical.controls['hypothecationAddress1'].value ?  this.vehical.controls['hypothecationAddress1'].value: '',
              "HypothecationAddress2": this.vehical.controls['hypothecationAddress2'].value?  this.vehical.controls['hypothecationAddress2'].value : '',
              "HypothecationAddress3": this.vehical.controls['hypothecationAddress3'].value? this.vehical.controls['hypothecationAddress3'].value: '',
              "HypothecationAgreementNo": this.vehical.controls['hypothecationAgreementNo'].value ? this.vehical.controls['hypothecationAgreementNo'].value: '',
              "HypothecationCountry": "",
              "HypothecationState":  this.vehical.controls['state'].value ? this.vehical.controls['state'].value: '',
              "HypothecationCity":  this.vehical.controls['city'].value ? this.vehical.controls['city'].value : '',
              "HypothecationPinCode":  this.vehical.controls['pincode'].value ? this.vehical.controls['pincode'].value : ''
          },
      }
      console.log(data,'fileeee');
      this.settings.loadingSpinner = true;

      this.bikeInsurance.proposalCreation(data).subscribe(
              (successData) => {
                  this.proposalSuccess(successData,stepper);
              },
              (error) => {
                  this.proposalFailure(error);
              }
          );
  }
    public proposalSuccess(successData, stepper){
        this.settings.loadingSpinner = false;
        if(successData.IsSuccess){
          stepper.next();
            this.topScroll();

            this.toastr.success('Proposal created successfully!!');
          this.summaryData = successData.ResponseObject;
         this.ProposalId =   this.summaryData.ProposalId;
         this.PaymentRedirect =   this.summaryData.PaymentRedirect;
         this.PolicySisID =   this.summaryData.PolicySisID;
         this.PaymentReturn =   this.summaryData.PaymentReturn;
         sessionStorage.shiramBikeproposalID = this.ProposalId;
         this.proposerFormData = this.proposer.value;
         this.vehicalFormData = this.vehical.value;
         this.previousFormData = this.previousInsure.value;
         this.nomineeFormData = this.nomineeDetail.value;
         console.log(this.vehicalFormData,'this.proposerFormData');
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            sessionStorage.vehicalFormData = JSON.stringify(this.vehicalFormData);
            sessionStorage.previousFormData = JSON.stringify(this.previousFormData);
            sessionStorage.nomineeFormData = JSON.stringify(this.nomineeFormData);
      } else{
            this.toastr.error(successData.ErrorObject);

        }
    }
    public proposalFailure(error){

    }





  // session Data
  sessionData() {
    if (sessionStorage.stepper1 != '' && sessionStorage.stepper1 != undefined) {
      let stepper1 = JSON.parse(sessionStorage.stepper1);
       this.getPostalCode('pin');
      this.proposer = this.fb.group({
        title: stepper1.title,
        name: stepper1.name,
        gender:stepper1.gender,
        dob :  this.datepipe.transform(stepper1.dob, 'y-MM-dd'),
        email:stepper1.email,
        mobile: stepper1.mobile,
        pincode: stepper1.pincode,
        alterMobile : stepper1.alterMobile,
        fax: stepper1.fax,
        pan: stepper1.pan,
        gst: stepper1.gst,
        address: stepper1.address,
        address2: stepper1.address2,
        address3: stepper1.address3,
        state:stepper1.state,
        city: stepper1.city,
          stateName: stepper1.stateName,
          cityName:stepper1.cityName

      });

    }
    if (sessionStorage.stepper2 != '' && sessionStorage.stepper2 != undefined) {
      let stepper2 = JSON.parse(sessionStorage.stepper2);
      this.vehical = this.fb.group({
        policyType: stepper2.policyType,
        policyTypeName: stepper2.policyTypeName,
        proposalType:stepper2.proposalType ,
        vehicleColour: stepper2.vehicleColour,
        nilDepreciationCover: stepper2.nilDepreciationCover,
        electricalAccess:stepper2.electricalAccess,
        electricalAccessSI: stepper2.electricalAccessSI,
        nonElectricalAccess:stepper2.nonElectricalAccess,
        nonElectricalAccessSI: stepper2.nonElectricalAccessSI,
        hypothecationType: stepper2.hypothecationType,
        hypothecationTypeName: stepper2.hypothecationTypeName,
        paforUnnamed: stepper2.paforUnnamed,
        paforUnnamedSI: stepper2.paforUnnamedSI,
        hypothecationAddress1:stepper2.hypothecationAddress1,
        hypothecationAddress2: stepper2.hypothecationAddress2,
        hypothecationAddress3:stepper2.hypothecationAddress3,
        hypothecationAgreementNo:stepper2.hypothecationAgreementNo,
        antiTheft: stepper2.antiTheft,
        lltoPaidDriver: stepper2.lltoPaidDriver,
        addonPackage:stepper2.addonPackage,
        hypothecationBankName:stepper2.hypothecationBankName,
          isFinanced:stepper2.isFinanced,
        pincode:stepper2.pincode,
        state:stepper2.state,
        city:stepper2.city,
        stateName:stepper2.stateName,
        cityName:stepper2.cityName,
      });

    }
      if (sessionStorage.policyDatevalidateArray != '' && sessionStorage.policyDatevalidateArray != undefined) {
        this.policyDatevalidate = JSON.parse(sessionStorage.policyDatevalidateArray);

    }
    if (sessionStorage.stepper3 != '' && sessionStorage.stepper3 != undefined) {
      let stepper3 = JSON.parse(sessionStorage.stepper3);
      this.previousInsure = this.fb.group({
        policyNumber: stepper3.policyNumber,
        // previousInsured: stepper3.previousInsured,
        policySi: stepper3.policySi,
        previousPolicyType: stepper3.previousPolicyType,
        policyNilDescription: stepper3.policyNilDescription,
        previousPolicyTypeName: stepper3.previousPolicyTypeName,
      });

    }
    if (sessionStorage.stepper4 != '' && sessionStorage.stepper4 != undefined) {
      let stepper4 = JSON.parse(sessionStorage.stepper4);
        if(stepper4.nomineeAge < 17){
            this.apponiteeList = true;
        }
      this.nomineeDetail = this.fb.group({
        nomineeName: stepper4.nomineeName,
        nomineeAge: stepper4.nomineeAge,
        nomineeRelationship: stepper4.nomineeRelationship,
        appointeeName: stepper4.appointeeName,
        appointeeRelationship: stepper4.appointeeRelationship
      });

    }
  }

}
