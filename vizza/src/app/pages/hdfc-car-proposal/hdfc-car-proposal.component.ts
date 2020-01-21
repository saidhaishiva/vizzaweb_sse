import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators,FormGroup} from '@angular/forms';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute} from '@angular/router';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import { FourWheelerService} from '../../shared/services/four-wheeler.service';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {Settings} from '../../app.settings.model';
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

declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;

@Component({
  selector: 'app-hdfc-car-proposal',
  templateUrl: './hdfc-car-proposal.component.html',
  styleUrls: ['./hdfc-car-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class HdfcCarProposalComponent implements OnInit {
    public today: any;
    public setting: any;
    public webhost: any;
    public customerDetails: any;
    public settings: Settings;
    public Setting: any;
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
    public cityarray: any;
    public districtarray: any;
    public proposerComList: any;
    public previouspolicy: any;
    public getstepper1: any;
    public getstepper2: any;
    public getstepper3: any;
    // public getstepper4: any;
    public financeList: any;
    public countryList: any;
    public tommarrow: any;
    public todaydate: any;
    public tod: any;
    public proposerFormData: any;
    public summaryData: any;
    public Proposalnumber: any;
    public PaymentRedirect: any;
    public PaymentReturn: any;
    public vehicalFormData: any;
    public previousFormData: any;
    public bankFormData: any;
    public vehicledata: any;
    public vehicleTypedata: any;
    public carEquiryId: any;
    public vehicleidv: any;
    public regvalue: any;
    public RegDateage: any;
    public ProposalId: any;
    public currentStep: any;
    public personalCitys: any;
    public personaldistricts: any;
    public pinerrorpermanent: any;
    public response: any;
    public residenceCitys: any;
    public residenceDistricts: any;
    public pinerror: any;
    public altererror: any;
    public premiumType: any;
    public vehicleRegNumber: any;
    public vehicleRegNo: any;
    public nomineeAge: any;
    public coverPremium: any;
    public buyFourwheelerProductDetails: any;
    public errortoaster: boolean;
    public sameasper: boolean;
    public finlist: any;
    public AntiTheftDisc_Premium: any;
    public  BiFuel_Kit_OD_Premium: any;
    public  BiFuel_Kit_TP_Premium: any;
    public HandicapDisc_Premium: any;
    public PaidDriver_Premium: any;
    public  LimitedtoOwnPremises_OD_Premium: any;
    public  LimitedtoOwnPremises_TP_Premium: any;
    public NamedPerson_premium: any;
    public  UnnamedPerson_premium: any;
    public NonElectical_Acc_Premium: any;
    public Electical_Acc_Premium: any;
    public electricValid: any;
    public electricNonValid: any;
    public biFuelValid: any;
    public namedPersonSiValid: any;
    public unnamedPersonSiValid: any;
    public paidPersonSiValid: any;
    photos = [];
    photosBuffer = [];
    bufferSize = 50;
    numberOfItemsFromEndBeforeFetchingMore = 10;
    loading = false;

  constructor(public fb: FormBuilder,public appsetting: AppSettings, public config: ConfigurationService, public route: ActivatedRoute, public validation: ValidationService, private toastr: ToastrService, public bikeInsurance: BikeInsuranceService, public authservice: AuthService, public datepipe: DatePipe ,public Fourwheeler: FourWheelerService) {
      let stepperindex = 0;
      this.route.params.forEach((params) => {
          if (params.stepper == true || params.stepper == 'true') {
              stepperindex = 3;
              if (sessionStorage.summaryDatacarHdfc != '' && sessionStorage.summaryDatacarHdfc != undefined) {
                  this.summaryData = JSON.parse(sessionStorage.summaryDatacarHdfc);
                  this.premiumType = JSON.parse(sessionStorage.packageListFw);
                  console.log(this.summaryData);
                  this.PaymentRedirect = this.summaryData.PaymentRedirect;
                  this.PaymentReturn = this.summaryData.PaymentReturn;
                  this.proposerFormData = JSON.parse(sessionStorage.stepper1Details);
                  this.vehicalFormData = JSON.parse(sessionStorage.stepper2Details);
                  this.previousFormData = JSON.parse(sessionStorage.stepper3Details);
                  // this.bankFormData = JSON.parse(sessionStorage.stepper4Details);
                  this.ProposalId = sessionStorage.hdfccarproposalID;
              }
          }
      });
      this.currentStep = stepperindex;

      this.Setting = appsetting.settings;
      this.webhost = this.config.getimgUrl();
      this.Setting.HomeSidenavUserBlock = false;
      this.Setting.sidenavIsOpened = false;
      this.Setting.sidenavIsPinned = false;
      var today = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.tommarrow=this.today.setDate(this.today.getDate()+1);
      this.tommarrow=this.datepipe.transform(this.tommarrow,'dd/MM/y');
      var  todaydate =new Date();
      this.todaydate=new Date(todaydate.getFullYear(), todaydate.getMonth(), todaydate.getDate());
      this.tod=this.datepipe.transform(this.todaydate,'dd/MM/y');
      String ;this.tod = this.tod.substring(0, 10);
      this.sameasper = false;
      this.electricValid = false;
      this.namedPersonSiValid = false;
      this.unnamedPersonSiValid = false;
      this.paidPersonSiValid = false;
      this.biFuelValid = false;
      this.electricNonValid = false;


      this.proposer = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          middleName: [''],
          dob: ['', Validators.required],
          title: ['', Validators.required],
          address: ['', Validators.required],
          address2: ['', Validators.required],
          address3: [''],
          pincode: ['', Validators.required],
          statepermanent: ['', Validators.required],
          citypermanent: ['', Validators.required],
          districtpermanent: ['', Validators.required],
          landmarkpermanent: [''],
          statecom: ['', Validators.required],
          citycom: ['', Validators.required],
          districtcom: ['', Validators.required],
          landmarkcom: [''],
          alternateContact: [''],
          gstNumber: [''],
          personalPan: ['',Validators.required],
          sameAsAddress: [''],
          address4: ['', Validators.required],
          address5: ['', Validators.required],
          address6: [''],
          pincode1: ['', Validators.required],
          issameascmmunication: [''],
          titlevalue:[''],
          // uniqueid:[''],
          // Lgcode:[''],

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
          Previouscompany: ['', Validators.required],
          ncb: ['', Validators.required],
          previousenddate: ['', Validators.required],
          previouspolicyno: ['', Validators.required],
          vechicleidv: ['', Validators.required],
          Financetype: [''],
          Agreement: [''],
          financiercode: '',
          fibranchname: [''],
          Previouscompanyvalue: [''],
          financiercodevalue: '',
          previouspolicyclaim:['', Validators.required],
      });
      this.addOns = this.fb.group({
          extentioncountry: [''],
          policytenture: [''],
          drivinglicence: [''],
          biofuel: [''],
          biofuelkit: [''],
          totalbiofuelkitPremium: [''],
          totalbiofuelkitPremium1: [''],
          totalLimitedtoOwnPremium: [''],
          totalLimitedtoOwnPremium1: [''],
          totalUnnamedPersonSIPremium: [''],
          totalNamedPersonPremium: [''],
          totalElecticAccessIDVPremium: [''],
          totalNonElecticAccessIDVPremium: [''],
          totalpaiddriversiPremium: [''],
          totalAntitheftdiscPremium: [''],
          totalHandicapDiscFlagPremium: [''],
          totalPaidDriverPremium: [''],
          Antitheftdiscflag: [''],
          HandicapDiscFlag: [''],
          NomineeName: [''],
          NomineeAge: [''],
          nomineeRelation: [''],
          appointeename: [''],
          appointeerelation: [''],
          extentioncountryvalue: [''],
          IsPaidDriver: [''],
          zerodept: [''],
          ElecticalAccessoryIDV: [''],
          NonElecticalAccessoryIDV: [''],
          IsLimitedtoOwnPremises: [''],
          OtherLoadDiscRate: [''],
          numdrivers: [''],
          handicapdic: [''],
          paiddriversi: [''],
          IsNCBProtection: [''],
          UnnamedPersonSI: [''],
          VoluntaryExcessDiscount: [''],
          namedPersonSI: [''],
          TPPDLimit: [''],
          NoofnamedPerson: [''],
          IsRTIcover: [''],
          IsCOCcover: [''],
          engineandgear: [''],
          downtimeprotector: [''],
          IsEAAdvance_Cover: [''],
          IsEMIprotector_Cover: [''],
          EAW: [''],
          NoofUnnamedPerson: [''],
          namedPerson: [''],
          noOfEmi: [''],
          EMIamount: ['']
      });
      this.BankDetails = this.fb.group({
          // Bankname: ['', Validators.required],
          // Branch: ['', Validators.required],
          // Payertype: ['', Validators.required],
          // paymentmode: ['', Validators.required],
          // refrenceno: ['', Validators.required],
          // Paymentdate: ['', Validators.required],
          // Banknamevalue: ['']


      });


  }

  ngOnInit() {
      this.sessionstorage();
      this.previouscompany();
      this.bankname();
      this.financiername();
      this.extensioncountry();
      this.vehicledata = JSON.parse(sessionStorage.vehicledetailsfw);
      this.vehicleTypedata = JSON.parse(sessionStorage.enquiryFormDatafw);
      this.carEquiryId = sessionStorage.fwEnquiryId;
      this.vehicleidv = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
      this.buyFourwheelerProductDetails = JSON.parse(sessionStorage.buyFourwheelerProductDetails);
      let stringToSplit;
      stringToSplit = this.vehicledata.vehicle_no.toUpperCase();
      let x = stringToSplit.slice(0, 2);
      let y = stringToSplit.slice(2, 4);
      let oo = stringToSplit.slice(5, 6);
      let w = '';
      let z = stringToSplit.slice(4, 6);
      if (!isNaN(oo)) {
          let j = stringToSplit.slice(4, 5);
          w = stringToSplit.slice(5);
          this.vehicleRegNumber = x.concat('-', y, '-', j, '-', w);

      } else {
          w = stringToSplit.slice(6);
          this.vehicleRegNumber = x.concat('-', y, '-', z, '-', w);
      }

      this.addOns.controls['extentioncountry'].patchValue('No Extension');
      this.vechicle.controls['vechicleidv'].patchValue(this.buyFourwheelerProductDetails.Idv);
      console.log(this.vechicle.controls['vechicleidv'].value,'12233333');
      // this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
      this.vechicle.controls['engine'].patchValue(this.vehicledata.engine_no);
      this.vechicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
      this.vechicle.controls['vehiclemodel'].patchValue(this.vehicledata.vehicle_model);
      this.vechicle.controls['previouspolicyclaim'].patchValue(this.vehicledata.previous_claim_YN == '1' ? 'YES' : 'NO');
      this.vechicle.controls['Vehicleregdate'].patchValue(this.datepipe.transform(this.vehicledata.registration_date, 'y-MM-dd'));
      this.vechicle.controls['regno'].patchValue(this.vehicleRegNumber);
      this.vechicle.controls['manufactureyear'].patchValue(this.vehicledata.manu_yr);
      // this.vechicle.controls['Previouscompany'].patchValue(this.vehicledata.prev_insurance_name);
      this.vechicle.controls['ncb'].patchValue(this.vehicledata.ncb_percent);
      this.vechicle.controls['previousenddate'].patchValue(this.datepipe.transform(this.vehicledata.previous_policy_expiry_date, 'y-MM-dd'));
      if (this.vechicle.controls['Vehicleregdate'].value) {
          let regno = '';
          regno = this.datepipe.transform(this.datepipe.transform(this.vehicledata.registration_date), 'yyyy-MM-dd');
          this.RegDateage = this.regdatecalculate(regno);
          console.log(this.RegDateage,'empty');
      }
      if (this.vehicleTypedata.type == 'new') {
          console.log('into ve');
          this.regvalue = 'New Vehicle';
          this.validationForNew(this.regvalue);
          console.log(this.regvalue,'picasoo');
      } else {
          this.regvalue = 'Roll Over';
          this.validationForNew(this.regvalue);
      }
      this.altererror='';

  }
    // validationForNew(value) {
    //
    //     if (value == 'New Vehicle') {
    //         this.vechicle.controls['Previouscompany'].patchValue(this.vechicle.controls['Previouscompany'].value);
    //         this.vechicle.controls['ncb'].patchValue(this.vechicle.controls['ncb'].value);
    //         this.vechicle.controls['previousenddate'].patchValue(this.vechicle.controls['previousenddate'].value);
    //         this.vechicle.controls['previouspolicyno'].patchValue(this.vechicle.controls['previouspolicyno'].value);
    //         this.vechicle.controls['previouspolicyclaim'].patchValue(this.vechicle.controls['previouspolicyclaim'].value);
    //         this.vechicle.controls['vechicleidv'].patchValue(this.vechicle.controls['vechicleidv'].value);
    //
    //         this.proposer.controls['Previouscompany'].setValidators([Validators.required]);
    //         this.proposer.controls['ncb'].setValidators([Validators.required]);
    //         this.proposer.controls['previousenddate'].setValidators([Validators.required]);
    //         this.proposer.controls['previouspolicyno'].setValidators([Validators.required]);
    //         this.proposer.controls['previouspolicyclaim'].setValidators([Validators.required]);
    //         this.proposer.controls['vechicleidv'].setValidators([Validators.required]);
    //     } else {
    //         this.proposer.controls['Previouscompany'].patchValue('');
    //         this.proposer.controls['ncb'].patchValue('');
    //         this.proposer.controls['previousenddate'].patchValue('');
    //         this.proposer.controls['previouspolicyno'].patchValue('');
    //         this.proposer.controls['previouspolicyclaim'].patchValue('');
    //         this.proposer.controls['vechicleidv'].patchValue('');
    //
    //         this.proposer.controls['Previouscompany'].setValidators(null);
    //         this.proposer.controls['ncb'].setValidators(null);
    //         this.proposer.controls['previousenddate'].setValidators(null);
    //         this.proposer.controls['previouspolicyno'].setValidators(null);
    //         this.proposer.controls['previouspolicyclaim'].setValidators(null);
    //         this.proposer.controls['vechicleidv'].setValidators(null);
    //
    //     }
    //
    //      this.proposer.controls['Previouscompany'].updateValueAndValidity();
    //      this.proposer.controls['ncb'].updateValueAndValidity();
    //      this.proposer.controls['previousenddate'].updateValueAndValidity();
    //      this.proposer.controls['previouspolicyno'].updateValueAndValidity();
    //      this.proposer.controls['previouspolicyclaim'].updateValueAndValidity();
    //      this.proposer.controls['vechicleidv'].updateValueAndValidity();
    // }
    validationForNew(value) {
      console.log(value, 'valuecore');
        if (value == 'New Vehicle') {
            console.log('vinoyth');
            this.vechicle.controls['Previouscompany'].setValidators(null);
            this.vechicle.controls['Previouscompany'].updateValueAndValidity();
            this.vechicle.controls['regno'].setValidators(null);
            this.vechicle.controls['Vehicleregdate'].setValidators(null);
            this.vechicle.controls['ncb'].setValidators(null);
            this.vechicle.controls['previousenddate'].setValidators(null);
            this.vechicle.controls['previouspolicyno'].setValidators(null);
            this.vechicle.controls['previouspolicyclaim'].setValidators(null);
            this.vechicle.controls['ncb'].updateValueAndValidity();
            this.vechicle.controls['previousenddate'].updateValueAndValidity();
            this.vechicle.controls['previouspolicyno'].updateValueAndValidity();
            this.vechicle.controls['previouspolicyclaim'].updateValueAndValidity();
            this.vechicle.controls['Vehicleregdate'].updateValueAndValidity();
            this.vechicle.controls['regno'].updateValueAndValidity();
        }

    }

    sameaspermenant(event) {
        console.log(event);
        if (event.checked == true) {
            this.pinerrorpermanent = '';
            console.log(sessionStorage.residenceCitys);
            this.proposer.controls['address'].patchValue(this.proposer.controls['address4'].value);
            this.proposer.controls['address2'].patchValue(this.proposer.controls['address5'].value);
            this.proposer.controls['address3'].patchValue(this.proposer.controls['address6'].value);
            this.proposer.controls['pincode'].patchValue(this.proposer.controls['pincode1'].value);
            this.proposer.controls['statepermanent'].patchValue(this.proposer.controls['statecom'].value);
            this.proposer.controls['citypermanent'].patchValue(this.proposer.controls['citycom'].value);
            this.proposer.controls['districtpermanent'].patchValue(this.proposer.controls['districtcom'].value);
            this.proposer.controls['landmarkpermanent'].patchValue(this.proposer.controls['landmarkcom'].value);
            this.sameasper=true;
            this.personalCitys = JSON.parse(sessionStorage.residenceCitys);
            sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            this.personaldistricts = JSON.parse(sessionStorage.residenceDistricts);
            sessionStorage.personaldistricts = JSON.stringify(this.personaldistricts);


        } else if (event.checked != true) {
            this.proposer.controls['address'].patchValue('');
            this.proposer.controls['address2'].patchValue('');
            this.proposer.controls['address3'].patchValue('');
            this.proposer.controls['pincode'].patchValue('');
            this.proposer.controls['statepermanent'].patchValue('');
            this.proposer.controls['citypermanent'].patchValue('');
            this.proposer.controls['districtpermanent'].patchValue('');
            this.proposer.controls['landmarkpermanent'].patchValue('');
            this.sameasper=false;
            if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
                this.personalCitys = JSON.parse(sessionStorage.personalCitys);
            } else {
                this.personalCitys = {};
            }
            if (sessionStorage.personaldistricts != '' && sessionStorage.personaldistricts != undefined) {
                this.personaldistricts = JSON.parse(sessionStorage.personaldistricts);

            } else {
                this.personaldistricts = {};
            }

        }

    }    check(event) {
        console.log(event);
        if (event.checked == true) {
            this.vechicle.controls['Agreement'].setValidators([Validators.required]);
            this.vechicle.controls['financiercode'].setValidators([Validators.required]);
            this.vechicle.controls['fibranchname'].setValidators([Validators.required]);
        } else if (event.checked != true) {
            this.vechicle.controls['Agreement'].patchValue('');
            this.vechicle.controls['financiercode'].patchValue('');
            this.vechicle.controls['financiercodevalue'].patchValue('');
            this.vechicle.controls['fibranchname'].patchValue('');
            this.vechicle.controls['Agreement'].setValidators(null);
            this.vechicle.controls['financiercode'].setValidators(null);
            this.vechicle.controls['financiercodevalue'].setValidators(null);
            this.vechicle.controls['fibranchname'].setValidators(null);
        }
        this.vechicle.controls['Agreement'].updateValueAndValidity();
        this.vechicle.controls['financiercode'].updateValueAndValidity();
        this.vechicle.controls['financiercodevalue'].updateValueAndValidity();
        this.vechicle.controls['fibranchname'].updateValueAndValidity();
    }

    addEvent(event, type) {

        console.log(event.value,'valueeee')
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (type == 'proposor') {
                        this.personalDobError = '';
                    }
                    // else if (type == 'nominee') {
                    //     this.personalDobError = '';
                    // }else if (type == 'iDate'){
                    //     this.personalDobError = '';
                    // }
                }
                // else {
                //     if (type == 'proposor') {
                //         this.personalDobError = 'Enter Valid Dob';
                //     }
                //     // } else if (type == 'nominee') {
                //     //     this.personalDobError = 'Enter Valid Dob';
                //     // } else if (type == 'iDate') {
                //     //     this.personalDobError = 'Enter Valid Dob';
                //     // }
                // }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob,'dobvalue')
                if (selectedDate.length == 10 && type == 'proposor') {

                    this.proposerAge = this.ageCalculate(dob);
                    // sessionStorage.proposerAgeForTravel = this.proposerAge;
                } else if (selectedDate.length == 10 && type == 'nominee') {
                    this.nomineeAge = this.ageCalculate(dob);
                }
            }
            else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10 && type == 'iDate') {
                    this.personalDobError = '';
                }
                if (dob.length == 10 && type == 'proposor') {
                    this.proposerAge = this.ageCalculate(dob);
                    this.personalDobError = '';
                    // sessionStorage.proposerAgeForTravel = this.proposerAge;
                } else if (type == "nominee") {
                    this.nomineeAge = this.ageCalculate(dob);
                }

            }
            if (type == 'proposor') {
                this.proposerAge = this.ageCalculate(dob);

                console.log(this.proposerAge, 'age');
                sessionStorage.proposerAge = this.proposerAge;
            }

        }
    }

    // addEvent(event, type) {
    //     if (event.value != null) {
    //         let selectedDate = '';
    //         this.proposerAge = '';
    //         let dob = '';
    //         if (typeof event.value._i == 'string') {
    //             const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    //             let selDate = event.value._i;
    //             let dateValue = this.datepipe.transform(selDate, 'dd/MM/y');
    //             if (pattern.test(dateValue) && dateValue.length == 10) {
    //                 if (type == 'proposor') {
    //                     this.personalDobError = '';
    //                 } else if (type == 'nominee') {
    //                     this.personalDobError = '';
    //                 }
    //             } else {
    //                 if (type == 'proposor') {
    //                     this.personalDobError = 'Enter Valid Dob';
    //                 } else if (type == 'insurer') {
    //                     this.personalDobError = 'Enter Valid Dob';
    //                 }
    //             }
    //             // selectedDate = event.value._i;
    //             let seltDate = event.value._i;
    //             selectedDate = this.datepipe.transform(seltDate, 'dd/MM/y');
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             if (selectedDate.length == 10 && type == 'proposor') {
    //                 this.proposerAge = this.ageCalculate(dob);
    //                 sessionStorage.proposerAge = this.proposerAge;
    //             }
    //
    //         } else if (typeof event.value._i == 'object') {
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             if (dob.length == 10 && type == 'proposor') {
    //                 this.proposerAge = this.ageCalculate(dob);
    //                 this.personalDobError = '';
    //                 sessionStorage.proposerAge = this.proposerAge;
    //             }
    //         }
    //         if (type == 'proposor') {
    //             console.log(this.proposerAge, 'age');
    //             sessionStorage.proposerAge = this.proposerAge;
    //         }
    //     }
    // }
    Regdate($event){
        console.log('innn too');
        if($event.value!=''){
            let regno='';
            regno = this.datepipe.transform($event.value, 'y-MM-dd');
            console.log(regno,'reg date');
        }
    }
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
    public companysucccess(successData) {
        this.companyList = successData.ResponseObject;
        sessionStorage.companylist = JSON.stringify(this.companyList);

    }
    extensioncountry(){
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeInsurance.hdfcGetInsuranceExtensionCountryList(data).subscribe(
            (successData) => {
                this.countrysucccess(successData);
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
    // financiername() {
    //     const data = {
    //         'platform': 'web',
    //         'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    //         'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    //     };
    //     this.bikeInsurance.hdfcGetFinancierNameList(data).subscribe(
    //         (successData) => {
    //             this.financesuccess(successData);
    //         },
    //         (error) => {
    //             this.failureSuccess(error);
    //         }
    //     );
    // }
    financiername() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'

        }
        this.bikeInsurance.hdfcGetFinancierNameLists(data).subscribe(
            (successData) => {
                this.financiersuccess(successData);
            },
            (error) => {
                this.financierFailure(error);
            }
        );
    }

    public financiersuccess(successData) {
        if (successData.IsSuccess == true) {
            this.errortoaster = true;
            // this.finlist = successData.ResponseObject;
            this.finlist = successData.ResponseObject.bankdetails;
            console.log(this.finlist,'finlist');
            // this.photos = successData.ResponseObject.bankdetails ;
            // this.photosBuffer = this.photos.slice(0, this.bufferSize);
            this.financierListname();
        }
        else {
            this.errortoaster = false;
            this.toastr.error(successData.ErrorObject);
        }
    }

    public financierFailure(error) {
    }

    financierListname() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'financial_code':this.vechicle.controls['financiercode'].value
        }
        this.bikeInsurance.hdfcFinancierName(data).subscribe(
            (successData) => {
                this.financierNamesuccess(successData);
            },
            (error) => {
                this.financierNameFailure(error);
            }
        );
    }

    public financierNamesuccess(successData) {
        if (successData.IsSuccess == true) {
            // this.errortoaster = true;

            this.photos = successData.ResponseObject;
            console.log(this.photos,'photos');

        }
        // else {
        //     this.errortoaster = false;
        //     this.toastr.error(successData.ErrorObject);
        // }
    }

    public financierNameFailure(error) {
    }

    public banksuccess(successData) {
        this.bankList = successData.ResponseObject;
    }

    public financesuccess(successData) {
        if (successData.IsSuccess == true) {
            this.financeList = successData.ResponseObject;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public countrysucccess(successData) {
        this.countryList = successData.ResponseObject;
    }

    public failureSuccess(error) {
    }
    // onScrollToEnd() {
    //     this.fetchMore();
    // }
    //
    // onScroll({ end }) {
    //     if (this.loading || this.photos.length <= this.photosBuffer.length) {
    //         return;
    //     }
    //
    //     if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
    //         this.fetchMore();
    //     }
    // }
    //
    // private fetchMore() {
    //     const len = this.photosBuffer.length;
    //     const more = this.photos.slice(len, this.bufferSize + len);
    //     this.loading = true;
    //     // using timeout here to simulate backend API delay
    //     setTimeout(() => {
    //         this.loading = false;
    //         this.photosBuffer = this.photosBuffer.concat(more);
    //     }, 200)
    // }

    onsubmit(value1){
        console.log(this.addOns.controls['NomineeName'].value,'sdfsadf');
        if (this.addOns.controls['NomineeName'].value != ''){
            this.addOns.controls['NomineeAge'].setValidators([Validators.required]);
            this.addOns.controls['NomineeAge'].updateValueAndValidity();
            this.addOns.controls['nomineeRelation'].setValidators([Validators.required]);
            this.addOns.controls['nomineeRelation'].updateValueAndValidity();

        }
        else if(this.addOns.controls['NomineeName'].value == ''){
            console.log('setvalid');
            this.addOns.controls['NomineeAge'].patchValue('');
            this.addOns.controls['NomineeAge'].setValidators(null);
            this.addOns.controls['NomineeAge'].updateValueAndValidity();
            this.addOns.controls['nomineeRelation'].patchValue('');
            this.addOns.controls['nomineeRelation'].setValidators(null);
            this.addOns.controls['nomineeRelation'].updateValueAndValidity();

        }
        if(this.addOns.controls['NomineeAge'].value <18) {
            this.addOns.controls['appointeename'].setValidators([Validators.required]);
            this.addOns.controls['appointeename'].updateValueAndValidity();
            this.addOns.controls['appointeerelation'].setValidators([Validators.required]);
            this.addOns.controls['appointeerelation'].updateValueAndValidity();

        }  if(this.addOns.controls['NomineeAge'].value >18 || this.addOns.controls['NomineeAge'].value ==''){
            this.addOns.controls['appointeename'].patchValue('');
            this.addOns.controls['appointeename'].setValidators(null);
            this.addOns.controls['appointeename'].updateValueAndValidity();
            this.addOns.controls['appointeerelation'].patchValue('');
            this.addOns.controls['appointeerelation'].setValidators(null);
            this.addOns.controls['appointeerelation'].updateValueAndValidity();
        }

    }
    typeAddressDeatils() {
        if (this.proposer.controls['issameascmmunication'].value == true) {
            console.log(this.proposer.controls['issameascmmunication'].value, 'wheree');
            this.pinerrorpermanent = '';
            sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
            sessionStorage.personaldistricts = JSON.stringify(this.personaldistricts);
            //     this.citypermanent = JSON.parse(sessionStorage.personalCitys);
            this.proposer.controls['address'].setValue(this.proposer.controls['address4'].value);
            this.proposer.controls['address2'].setValue(this.proposer.controls['address5'].value);
            this.proposer.controls['address3'].setValue(this.proposer.controls['address6'].value);
            this.proposer.controls['pincode'].setValue(this.proposer.controls['pincode1'].value);
            this.proposer.controls['districtpermanent'].setValue(this.proposer.controls['districtcom'].value);
            this.proposer.controls['citypermanent'].setValue(this.proposer.controls['citycom'].value);
            this.proposer.controls['statepermanent'].setValue(this.proposer.controls['statecom'].value);
            this.proposer.controls['landmarkpermanent'].setValue(this.proposer.controls['landmarkcom'].value);

            // this.proposer.controls['residenceState'].setValue(this.proposer.controls['personalState'].value);
        }
    }
    validationforadons(event,value){
      console.log(event);
      if(this.addOns.controls['numdrivers'].value !=''){
          this.addOns.controls['numdrivers'].value == true;
          this.addOns.controls['paiddriversi'].setValidators([Validators.required]);
          this.addOns.controls['paiddriversi'].updateValueAndValidity();
console.log(this.addOns.controls['numdrivers'].value,'valueeeeeeeee')
      }else if(this.addOns.controls['numdrivers'].value ==''){
          this.addOns.controls['numdrivers'].value == false;
          this.addOns.controls['paiddriversi'].patchValue('');
          this.addOns.controls['paiddriversi'].setValidators(null);
          this.addOns.controls['paiddriversi'].updateValueAndValidity();
      }if(event.checked==true && value =='unamed'){
          console.log('rr');
            this.addOns.controls['NoofUnnamedPerson'].value == true;
            this.addOns.controls['UnnamedPersonSI'].setValidators([Validators.required]);
            this.addOns.controls['UnnamedPersonSI'].updateValueAndValidity();
            console.log(this.addOns.controls['NoofUnnamedPerson'].value,'valueeeeeeeee')

        }else if(event.checked==false && value =='unamed') {
            this.addOns.controls['NoofUnnamedPerson'].value == false;
            this.addOns.controls['UnnamedPersonSI'].patchValue('');
            this.addOns.controls['UnnamedPersonSI'].setValidators(null);
            this.addOns.controls['UnnamedPersonSI'].updateValueAndValidity();
        }if(event.checked==true && value =='named'){
          console.log('gg');
            this.addOns.controls['NoofnamedPerson'].value == true;
            this.addOns.controls['namedPerson'].setValidators([Validators.required]);
            this.addOns.controls['namedPerson'].updateValueAndValidity();
            this.addOns.controls['namedPersonSI'].setValidators([Validators.required]);
            this.addOns.controls['namedPersonSI'].updateValueAndValidity();
            console.log(this.addOns.controls['NoofnamedPerson'].value,'valueeeeeeeee')

        }else if(event.checked==false && value =='named'){
            this.addOns.controls['NoofnamedPerson'].value == false;
            this.addOns.controls['namedPerson'].patchValue('');
            this.addOns.controls['namedPerson'].setValidators(null);
            this.addOns.controls['namedPerson'].updateValueAndValidity();
            this.addOns.controls['namedPersonSI'].patchValue('');
            this.addOns.controls['namedPersonSI'].setValidators(null);
            this.addOns.controls['namedPersonSI'].updateValueAndValidity();
        }
    }
    validationforEmi(event) {
        if (event.checked == true) {
            this.addOns.controls['noOfEmi'].setValidators([Validators.required]);
            this.addOns.controls['noOfEmi'].updateValueAndValidity();
            this.addOns.controls['EMIamount'].setValidators([Validators.required]);
            this.addOns.controls['EMIamount'].updateValueAndValidity();
        } else if (event.checked == false) {
            this.addOns.controls['noOfEmi'].patchValue('');
            this.addOns.controls['noOfEmi'].setValidators(null);
            this.addOns.controls['noOfEmi'].updateValueAndValidity();
            this.addOns.controls['EMIamount'].patchValue('');
            this.addOns.controls['EMIamount'].setValidators(null);
            this.addOns.controls['EMIamount'].updateValueAndValidity();

        }
    }
ChangeGender(){
    if (this.proposer.controls['title'].value == 'Mr') {
        this.proposer.controls['gender'].patchValue('MALE');
    } else {
        this.proposer.controls['gender'].patchValue('FEMALE');
    }
}

    bioFuelValidation(event) {
        if (this.addOns.controls['biofuel'].value ) {
            this.addOns.controls['biofuelkit'].setValidators([Validators.required]);
        } else {
            this.addOns.controls['biofuelkit'].patchValue('');
            this.addOns.controls['biofuelkit'].setValidators(null);
        }
        this.addOns.controls['biofuelkit'].updateValueAndValidity();
        // if (this.addOns.controls['biofuel'].value == 'LPG' || this.addOns.controls['biofuel'].value == 'CNG') {
        //     this.addOns.controls['biofuelkit'].patchValue(this.addOns.controls['biofuelkit'].value);
        //     this.addOns.controls['biofuelkit'].setValidators([Validators.required]);
        // } else {
        //     this.addOns.controls['biofuelkit'].patchValue('');
        //     this.addOns.controls['biofuelkit'].setValidators(null);
        // }
        // this.addOns.controls['biofuelkit'].updateValueAndValidity();
    }
    bifuelChange(){
        if (this.addOns.controls['biofuelkit'].value ) {
            this.addOns.controls['totalbiofuelkitPremium'].setValidators([Validators.required]);
            this.addOns.controls['totalbiofuelkitPremium1'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalbiofuelkitPremium'].patchValue('');
            this.addOns.controls['totalbiofuelkitPremium1'].patchValue('');
            this.addOns.controls['totalbiofuelkitPremium'].setValidators(null);
            this.addOns.controls['totalbiofuelkitPremium1'].setValidators(null);
        }
        this.addOns.controls['totalbiofuelkitPremium'].updateValueAndValidity();
        this.addOns.controls['totalbiofuelkitPremium1'].updateValueAndValidity();
    }
    bifuelValidation() {
    if(this.addOns.controls.biofuelkit.value >= 1000){
    this.biFuelValid=false;
    this.biFuelValid='';
    this.getCover();
}else{
    this.biFuelValid=true;
    this.biFuelValid='Biofuel Kit Price should be Equal to Or Greater than 1000';
}

}
    bifuelChangeValue(){
        this.addOns.controls['totalbiofuelkitPremium'].patchValue(this.BiFuel_Kit_OD_Premium);
        this.addOns.controls['totalbiofuelkitPremium1'].patchValue(this.BiFuel_Kit_TP_Premium);

    }
    antitheftdiscChange(){
        if (this.addOns.controls['Antitheftdiscflag'].value=='true' ) {
            this.addOns.controls['totalAntitheftdiscPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalAntitheftdiscPremium'].patchValue('');
            this.addOns.controls['totalAntitheftdiscPremium'].setValidators(null);
        }
        this.addOns.controls['totalAntitheftdiscPremium'].updateValueAndValidity();
    }
    antiValue(){
        this.addOns.controls['totalAntitheftdiscPremium'].patchValue(this.AntiTheftDisc_Premium);

    }
    handicapDiscFlagChange(){
        if (this.addOns.controls['HandicapDiscFlag'].value=='true' ) {
            this.addOns.controls['totalHandicapDiscFlagPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalHandicapDiscFlagPremium'].patchValue('');
            this.addOns.controls['totalHandicapDiscFlagPremium'].setValidators(null);
        }
        this.addOns.controls['totalHandicapDiscFlagPremium'].updateValueAndValidity();
    }
    handicapValue(){
        this.addOns.controls['totalHandicapDiscFlagPremium'].patchValue(this.HandicapDisc_Premium);

    }

    ElecticAccesIDVChange(){
        if (this.addOns.controls['ElecticalAccessoryIDV'].value ) {
            this.addOns.controls['totalElecticAccessIDVPremium'].setValidators([Validators.required]);

        } else {
            this.addOns.controls['totalElecticAccessIDVPremium'].patchValue('');
            this.addOns.controls['totalElecticAccessIDVPremium'].setValidators(null);
        }
        this.addOns.controls['totalElecticAccessIDVPremium'].updateValueAndValidity();
    }
    electricValidation(){
      if(this.addOns.controls.ElecticalAccessoryIDV.value >= 10000){
          this.electricValid=false;
          this.electricValid='';
          this.getCover();
      }else{
          this.electricValid=true;
          this.electricValid='Electical Accessory IDV should be Equal to Or Greater than 10000';
      }
    }

    ElecticAccesValue(){
        this.addOns.controls['totalElecticAccessIDVPremium'].patchValue(this.Electical_Acc_Premium);

    }
    nonElecticAccesIDVChange(){
        if (this.addOns.controls['NonElecticalAccessoryIDV'].value ) {
            this.addOns.controls['totalNonElecticAccessIDVPremium'].setValidators([Validators.required]);

        } else {
            this.addOns.controls['totalNonElecticAccessIDVPremium'].patchValue('');
            this.addOns.controls['totalNonElecticAccessIDVPremium'].setValidators(null);
        }
        this.addOns.controls['totalNonElecticAccessIDVPremium'].updateValueAndValidity();
    }
    electricNonValidation(){
        if(this.addOns.controls.NonElecticalAccessoryIDV.value >= 10000){
            this.electricNonValid=false;
            this.electricNonValid='';
            this.getCover();
        }else{
            this.electricNonValid=true;
            this.electricNonValid='Non Electical Accessory IDV should be Equal to Or Greater than 10000';
        }

    }
    nonElecticAccesValue(){
        this.addOns.controls['totalNonElecticAccessIDVPremium'].patchValue(this.NonElectical_Acc_Premium);

    }
    UnnamedPersonChange(){
        if (this.addOns.controls['UnnamedPersonSI'].value ) {
            this.addOns.controls['totalUnnamedPersonSIPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalUnnamedPersonSIPremium'].patchValue('');
            this.addOns.controls['totalUnnamedPersonSIPremium'].setValidators(null);
        }
        this.addOns.controls['totalUnnamedPersonSIPremium'].updateValueAndValidity();
    }
    UnnamedPersonValue(){
        this.addOns.controls['totalUnnamedPersonSIPremium'].patchValue(this.UnnamedPerson_premium);

    }
    namedPersonSIChange(){
        if (this.addOns.controls['namedPersonSI'].value ) {
            this.addOns.controls['totalNamedPersonPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalNamedPersonPremium'].patchValue('');
            this.addOns.controls['totalNamedPersonPremium'].setValidators(null);
        }
        this.addOns.controls['totalNamedPersonPremium'].updateValueAndValidity();
    }
    namedPersonValidation(){
        if(this.addOns.controls.namedPersonSI.value >= 100000 ){
            this.namedPersonSiValid=false;
            this.namedPersonSiValid='';
            this.getCover();
        }else{
            this.namedPersonSiValid=true;
            this.namedPersonSiValid='Named Person SI should be Equal to Or Greater than 100000';
        }
    }
    unnamedPersonValidation(){
        if(this.addOns.controls.UnnamedPersonSI.value >= 100000 ){
            this.unnamedPersonSiValid=false;
            this.unnamedPersonSiValid='';
            this.getCover();
        }else{
            this.unnamedPersonSiValid=true;
            this.unnamedPersonSiValid='Unnamed Person SI should be Equal to Or Greater than 100000';
        }
    }
    paidPersonValidation(){
        if(this.addOns.controls.paiddriversi.value >= 10000  ){
            this.paidPersonSiValid=false;
            this.paidPersonSiValid='';
            this.getCover();
        }else{
            this.paidPersonSiValid=true;
            this.paidPersonSiValid='Unnamed Person SI should be Equal to Or Greater than 10000 ';
        }
    }
    namedPersonSIValue(){
        this.addOns.controls['totalNamedPersonPremium'].patchValue(this.NamedPerson_premium);

    }
    limitedtoOwnChange(){
        if(this.addOns.controls.IsLimitedtoOwnPremises.value == true){
            this.addOns.controls['totalLimitedtoOwnPremium'].setValidators([Validators.required]);
            this.addOns.controls['totalLimitedtoOwnPremium1'].setValidators([Validators.required]);
            // this.getCover();
        } else {
            this.addOns.controls['totalLimitedtoOwnPremium'].patchValue('');
            this.addOns.controls['totalLimitedtoOwnPremium1'].patchValue('');
            this.addOns.controls['totalLimitedtoOwnPremium'].setValidators(null);
            this.addOns.controls['totalLimitedtoOwnPremium1'].setValidators(null);
        }
        this.addOns.controls['totalLimitedtoOwnPremium'].updateValueAndValidity();
        this.addOns.controls['totalLimitedtoOwnPremium1'].updateValueAndValidity();
    }
    limitedtoOwnValue(){
        this.addOns.controls['totalLimitedtoOwnPremium'].patchValue(this.LimitedtoOwnPremises_OD_Premium);
        this.addOns.controls['totalLimitedtoOwnPremium1'].patchValue(this.LimitedtoOwnPremises_TP_Premium);

    }
    paidDriverChange(){
        if(this.addOns.controls.IsPaidDriver.value == true){
            this.addOns.controls['paiddriversi'].setValidators([Validators.required]);
            // this.getCover();
        } else {
            this.addOns.controls['paiddriversi'].patchValue('');
            this.addOns.controls['paiddriversi'].setValidators(null);
        }
        this.addOns.controls['paiddriversi'].updateValueAndValidity();
    }
    paiddriverFlagChange(){
        if (this.addOns.controls['paiddriversi'].value ) {
            this.addOns.controls['totalpaiddriversiPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalpaiddriversiPremium'].patchValue('');
            this.addOns.controls['totalpaiddriversiPremium'].setValidators(null);
        }
        this.addOns.controls['totalpaiddriversiPremium'].updateValueAndValidity();
    }
    paiddriverValue(){
        this.addOns.controls['totalpaiddriversiPremium'].patchValue(this.PaidDriver_Premium);

    }
    // paidDriverValue(){
    //     this.addOns.controls['totalbiofuelkitPremium'].patchValue(this.HandicapDisc_Premium);
    //
    // }


    changeInsuranceCompany() {
      // alert('inn');
        this.vechicle.controls['Previouscompanyvalue'].patchValue(this.companyList[this.vechicle.controls['Previouscompany'].value]);

    }

    changefinancecompany() {
      this.vechicle.controls['financiercodevalue'].patchValue(this.finlist[this.vechicle.controls['financiercode'].value]);
console.log(this.vechicle.controls['financiercodevalue'].value,'122345567777765')
    }

    // changebankname() {
    //     this.BankDetails.controls['Banknamevalue'].patchValue(this.bankList[this.BankDetails.controls['Bankname'].value]);
    // }
    changeextensioncountry() {
        this.addOns.controls['extentioncountryvalue'].patchValue(this.countryList[this.addOns.controls['extentioncountry'].value]);
    }


    ageCalculate(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate() - birthDate.getDate();
        if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
        }
        return age;
    }
    getPostalCode(pin, type) {
        console.log(pin, type, 'pincode');
        const data = {
            'platform': 'web',
            'pincode': pin,
        };
        if (pin.length == 6) {
            this.bikeInsurance.hdfcpincode(data).subscribe(
                (successData) => {
                    this.proposerpincodeListSuccess(successData, type);
                },
                (error) => {
                    this.proposerpincodeListFailure(error);
                }
            );
        }
    }
    proposerpincodeListFailure(error) {

    }

    proposerpincodeListSuccess(successData, type) {
        if (successData.IsSuccess) {
            this.response = successData.ResponseObject;
            var i;
            let g = new Array();
            let distrct = new Array();
            console.log(this.response, 'cityarry');
            for (i = 0; i < this.response.length; i++) {
                if (g.indexOf(this.response[i]['txt_pincode_locality']) == -1) {
                    // g.push(Array.from(new Set(this.cityarray[i]['txt_pincode_locality']))) ;
                    g.push(this.response[i]['txt_pincode_locality']);
                }
                if (distrct.indexOf(this.response[i]['txt_city_district']) == -1) {
                    distrct.push(this.response[i]['txt_city_district']);
                }

            }
            this.cityarray = g;
            sessionStorage.citylist = JSON.stringify(g);
            this.districtarray = distrct;
            sessionStorage.districtlist = JSON.stringify(distrct);

            if (type == 'proposer') {
                this.pinerrorpermanent = '';
                this.proposerPinList = successData.ResponseObject;
                this.proposer.controls['statepermanent'].patchValue(this.proposerPinList[0].txt_state);
                this.proposer.controls['districtpermanent'].patchValue(this.proposerPinList[0].txt_city_district);
                this.proposer.controls['citypermanent'].patchValue(this.proposerPinList[0].txt_pincode_locality);
                this.personalCitys = this.cityarray;
                this.personaldistricts = this.districtarray;
                sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
                sessionStorage.personaldistricts = JSON.stringify(this.personaldistricts);

            } else if (type == 'comm') {
                this.pinerror = '';
                this.proposerComList = successData.ResponseObject;
                console.log(this.proposerComList, 'com');
                this.proposer.controls['statecom'].patchValue(this.proposerComList[0].txt_state);
                this.proposer.controls['districtcom'].patchValue(this.proposerComList[0].txt_city_district);
                this.proposer.controls['citycom'].patchValue(this.proposerComList[0].txt_pincode_locality);
                this.residenceCitys = this.cityarray;
                this.residenceDistricts = this.districtarray;
                sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
                sessionStorage.residenceDistricts = JSON.stringify(this.residenceDistricts);
                if (this.proposer.controls['issameascmmunication'].value == true) {
                    this.personalCitys = this.cityarray;
                    this.personaldistricts = this.districtarray;
                    console.log(this.proposer.controls['citycom'].value, 'vvvv');
                    this.proposer.controls['statepermanent'].setValue(this.proposer.controls['statecom'].value);
                    this.proposer.controls['citypermanent'].setValue(this.proposer.controls['citycom'].value);
                    this.proposer.controls['districtpermanent'].setValue(this.proposer.controls['districtcom'].value);
                    sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
                    sessionStorage.personaldistricts = JSON.stringify(this.personaldistricts);

                }
            }
        } else if (successData.IsSuccess != true) {
            this.toastr.error('Please Fill Valid Pincode');
            if (type == 'proposer') {
                this.pinerrorpermanent = 'Please Fill Valid Pincode';
                console.log('varchar');
                sessionStorage.personalCitys = '';
                this.personalCitys = {};
                sessionStorage.personaldistricts = '';
                this.personaldistricts = {};
                this.proposer.controls['statepermanent'].patchValue('');
                this.proposer.controls['districtpermanent'].patchValue('');
                this.proposer.controls['citypermanent'].patchValue('');

            } else if (type == 'comm') {
                this.pinerror = 'Please Fill Valid Pincode';
                sessionStorage.residenceCitys = '';
                this.residenceCitys = {};
                sessionStorage.residenceDistricts = '';
                this.residenceDistricts = {};
                console.log(this.residenceDistricts, 'resss');
                this.proposer.controls['statecom'].patchValue('');
                this.proposer.controls['districtcom'].patchValue('');
                this.proposer.controls['citycom'].patchValue('');
                if (this.proposer.controls['issameascmmunication'].value == true) {
                    this.pinerrorpermanent = 'Please Fill Valid Pincode';
                    console.log('iiiiiii');
                    sessionStorage.cityarray = '';
                    this.cityarray = {};
                    sessionStorage.districtarray = '';
                    this.districtarray = {};
                    sessionStorage.personalCitys = '';
                    this.personalCitys = {};
                    sessionStorage.personaldistricts = '';
                    this.personaldistricts = {};
                    this.proposer.controls['statepermanent'].setValue('');
                    this.proposer.controls['districtpermanent'].setValue('');
                    this.proposer.controls['citypermanent'].setValue('');
                }
            }
        }
    }

    nextTab(stepper, value, type) {

        if (type == 'stepper1') {
            console.log(value,'value');
            // this.proposerData = value;
            sessionStorage.stepper1Details = '';
            sessionStorage.stepper1Details = JSON.stringify(value);
            console.log(sessionStorage,'storage');
            // this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
            console.log(sessionStorage.proposerAge, 'rr');
            console.log(this.proposer.valid,'valid');
            if (this.proposer.valid) {
                console.log(this.proposer.valid,'proposervalid');
                // alert('inn')
                if (sessionStorage.proposerAge >= 18) {
                    // alert('age')
                    if( this.altererror==''){
                        // alert('error')
                        stepper.next();
                        this.topScroll();
                    }


                }else {
                    this.toastr.error('Proposer Age should be greater than 18.')
                }
            } else {
                this.toastr.error('Please Fill All The Mandtory Fields');

            }
        }
        if (type == 'stepper2') {
            console.log(this.vechicle.controls['vechicleidv'].value,'wwww......w');
            sessionStorage.stepper2Details = '';
            sessionStorage.stepper2Details = JSON.stringify(value);
            // this.addOns.controls['NomineeName'].patchValue('');
            // this.addOns.controls['NomineeAge'].patchValue('');
            // this.addOns.controls['appointeename'].patchValue('');
            // this.addOns.controls['appointeerelation'].patchValue('');
            if (this.vechicle.valid) {
                // if(this.vechicle.controls['vechicleidv'].value > 7000 || this.vechicle.controls['vechicleidv'].value=='' ) {
                    //
                    // }
                    stepper.next();
                    this.topScroll();
                // }else{
                //     this.toastr.error('IDV Should Not Less Than 7000');
                // }
            } else {
                this.toastr.error('Please fill the Mandatory Fields')

            }
        }
        if (type == 'stepper3') {
            sessionStorage.stepper3Details = '';
            sessionStorage.stepper3Details = JSON.stringify(value);


            if (this.addOns.valid) {
                this.createproposal(stepper);
                this.topScroll();

                // stepper.next();
            }else{
                this.toastr.error('Please fill the Mandatory Fields')

            }
        }
        // if(type == 'stepper4'){
        //     sessionStorage.stepper4Details='';
        //     sessionStorage.stepper4Details=JSON.stringify(value);
        //
        //     // console.log(this.proposerFormData,'form');
        //     // console.log(this.proposerFormData.title,'titt');
        //     console.log('inn');
        //     if(this.BankDetails.valid){
        //         this.createproposal(stepper);
        //         this.topScroll();
        //     }
        // }


    }
    sessionstorage(){
        if (sessionStorage.personalCitys != '' && sessionStorage.personalCitys != undefined) {
            this.personalCitys = JSON.parse(sessionStorage.personalCitys);
        }
        if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
            this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
        }
        if (sessionStorage.personaldistricts != '' && sessionStorage.personaldistricts != undefined) {
            this.personaldistricts = JSON.parse(sessionStorage.personaldistricts);
        }
        if (sessionStorage.residenceDistricts != '' && sessionStorage.residenceDistricts != undefined) {
            this.residenceDistricts = JSON.parse(sessionStorage.residenceDistricts);
        }
        if (sessionStorage.citylist != '' && sessionStorage.citylist != undefined) {
            this.cityarray = JSON.parse(sessionStorage.citylist);
        }
        if (sessionStorage.districtlist != '' && sessionStorage.districtlist != undefined) {
            this.districtarray = JSON.parse(sessionStorage.districtlist);
        }
        if (sessionStorage.companylist != '' && sessionStorage.companylist != undefined) {
            this.companyList = JSON.parse(sessionStorage.companylist);
        }

        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getstepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.proposer = this.fb.group({
                title: this.getstepper1.title,
                firstName: this.getstepper1.firstName,
                middleName: this.getstepper1.middleName,
                lastName: this.getstepper1.lastName,
                gender: this.getstepper1.gender,
                dob: this.datepipe.transform(this.getstepper1.dob, 'y-MM-dd'),
                email: this.getstepper1.email,
                mobile: this.getstepper1.mobile,
                alternateContact: this.getstepper1.alternateContact,
                gstNumber: this.getstepper1.gstNumber,
                personalPan: this.getstepper1.personalPan,
                address4: this.getstepper1.address4,
                address5: this.getstepper1.address5,
                address6: this.getstepper1.address6,
                pincode1: this.getstepper1.pincode1,
                statecom: this.getstepper1.statecom,
                citycom: this.getstepper1.citycom,
                districtcom: this.getstepper1.districtcom,
                landmarkcom: this.getstepper1.landmarkcom,
                issameascmmunication: this.getstepper1.issameascmmunication,
                address: this.getstepper1.address,
                address2: this.getstepper1.address2,
                address3: this.getstepper1.address3,
                pincode: this.getstepper1.pincode,
                statepermanent: this.getstepper1.statepermanent,
                citypermanent: this.getstepper1.citypermanent,
                districtpermanent: this.getstepper1.districtpermanent,
                landmarkpermanent: this.getstepper1.landmarkpermanent,
                titlevalue: this.getstepper1.titlevalue,
                // uniqueid: this.getstepper1.uniqueid,
                // Lgcode: this.getstepper1.Lgcode,

            })
        }
        if (sessionStorage.company != '' && sessionStorage.company != undefined) {
            this.companyList = JSON.parse(sessionStorage.company);
            console.log('innnworld');
            console.log(this.companyList,'uvv');
        }
        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getstepper2 = JSON.parse(sessionStorage.stepper2Details);
            this.vechicle = this.fb.group({
                engine: this.getstepper2.engine,
                chassis: this.getstepper2.chassis,
                vehiclemodel: this.getstepper2.vehiclemodel,
                Vehicleregdate: this.datepipe.transform(this.getstepper2.Vehicleregdate, 'y-MM-dd'),
                regno: this.getstepper2.regno,
                manufactureyear: this.getstepper2.manufactureyear,
                Financetype: this.getstepper2.Financetype,
                Agreement: this.getstepper2.Agreement,
                financiercode: this.getstepper2.financiercode,
                fibranchname: this.getstepper2.fibranchname,
                Previouscompany: this.getstepper2.Previouscompany,
                ncb: this.getstepper2.ncb,
                previousenddate: this.datepipe.transform(this.getstepper2.previousenddate ,'y-MM-dd'),
                previouspolicyno: this.getstepper2.previouspolicyno,
                vechicleidv: this.getstepper2.vechicleidv,
                Previouscompanyvalue: this.getstepper2.Previouscompanyvalue,
                financiercodevalue: this.getstepper2.financiercodevalue,
                previouspolicyclaim: this.getstepper2.previouspolicyclaim,

            })
        }
        if (sessionStorage.stepper3Details != '' && sessionStorage.stepper3Details != undefined) {
            this.getstepper3 = JSON.parse(sessionStorage.stepper3Details);
            this.addOns = this.fb.group({
                extentioncountry: this.getstepper3.extentioncountry,
                policytenture: this.getstepper3.policytenture,
                drivinglicence: this.getstepper3.drivinglicence,
                biofuel: this.getstepper3.biofuel,
                biofuelkit: this.getstepper3.biofuelkit,
                totalbiofuelkitPremium1: this.getstepper3.totalbiofuelkitPremium1,
                totalbiofuelkitPremium: this.getstepper3.totalbiofuelkitPremium,
                totalLimitedtoOwnPremium1: this.getstepper3.totalLimitedtoOwnPremium1,
                totalHandicapDiscFlagPremium: this.getstepper3.totalHandicapDiscFlagPremium,
                totalElecticAccessIDVPremium: this.getstepper3.totalElecticAccessIDVPremium,
                totalNonElecticAccessIDVPremium: this.getstepper3.totalNonElecticAccessIDVPremium,
                totalLimitedtoOwnPremium: this.getstepper3.totalLimitedtoOwnPremium,
                totalNamedPersonPremium: this.getstepper3.totalNamedPersonPremium,
                totalUnnamedPersonSIPremium: this.getstepper3.totalUnnamedPersonSIPremium,
                totalpaiddriversiPremium: this.getstepper3.totalpaiddriversiPremium,
                totalPaidDriverPremium: this.getstepper3.totalPaidDriverPremium,
                totalAntitheftdiscPremium: this.getstepper3.totalAntitheftdiscPremium,
                Antitheftdiscflag: this.getstepper3.Antitheftdiscflag,
                HandicapDiscFlag: this.getstepper3.HandicapDiscFlag,
                NomineeName: this.getstepper3.NomineeName,
                NomineeAge: this.getstepper3.NomineeAge,
                nomineeRelation: this.getstepper3.nomineeRelation,
                appointeename: this.getstepper3.appointeename,
                appointeerelation: this.getstepper3.appointeerelation,
                extentioncountryvalue: this.getstepper3.extentioncountryvalue,
                IsPaidDriver: this.getstepper3.IsPaidDriver,
                zerodept: this.getstepper3.zerodept,
                ElecticalAccessoryIDV: this.getstepper3.ElecticalAccessoryIDV,
                NonElecticalAccessoryIDV: this.getstepper3.NonElecticalAccessoryIDV,
                IsLimitedtoOwnPremises: this.getstepper3.IsLimitedtoOwnPremises,
                OtherLoadDiscRate: this.getstepper3.OtherLoadDiscRate,
                paiddriversi: this.getstepper3.paiddriversi,
                IsNCBProtection: this.getstepper3.IsNCBProtection,
                UnnamedPersonSI: this.getstepper3.UnnamedPersonSI,
                VoluntaryExcessDiscount: this.getstepper3.VoluntaryExcessDiscount,
                namedPersonSI: this.getstepper3.namedPersonSI,
                TPPDLimit: this.getstepper3.TPPDLimit,
                NoofnamedPerson: this.getstepper3.NoofnamedPerson,
                IsRTIcover: this.getstepper3.IsRTIcover,
                IsCOCcover: this.getstepper3.IsCOCcover,
                engineandgear:this.getstepper3.engineandgear,
                downtimeprotector:this.getstepper3.downtimeprotector,
                IsEAAdvance_Cover:this.getstepper3.IsEAAdvance_Cover,
                IsEMIprotector_Cover:this.getstepper3.IsEMIprotector_Cover,
                EAW:this.getstepper3.EAW,
                NoofUnnamedPerson:this.getstepper3.NoofUnnamedPerson,
                numdrivers:this.getstepper3.numdrivers,
                namedPerson:this.getstepper3.namedPerson,
                noOfEmi:this.getstepper3.noOfEmi,
                EMIamount:this.getstepper3.EMIamount,

            })
        }
        // if (sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined) {
        //     this.getstepper4 = JSON.parse(sessionStorage.stepper4Details);
        //     this.BankDetails = this.fb.group({
        //         // Bankname: this.getstepper4.Bankname,
        //         // Branch: this.getstepper4.Branch,
        //         // paymentmode: this.getstepper4.paymentmode,
        //         // Payertype: this.getstepper4.Payertype,
        //         // refrenceno: this.getstepper4.refrenceno,
        //         // Paymentdate: this.datepipe.transform(this.getstepper4.Paymentdate, 'y-MM-dd'),
        //         // Banknamevalue: this.getstepper4.Banknamevalue,
        //         // banknamelist: this.getstepper4.banknamelist,
        //     });
        // }
    }


    getCover() {
        const data = {
            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "enquiry_id": this.carEquiryId,
            "created_by": "",
            "policy_type":this.premiumType=='ThridParty_premium'?'ThridParty_Premium':'Comprehensive_Premium',
            "proposal_id":sessionStorage.hdfccarproposalID == '' || sessionStorage.hdfccarproposalID == undefined ? '' : sessionStorage.hdfccarproposalID,
            "motorproposalObj": {
                "Customer_Details": {
                    "GC_CustomerID": [],
                    "Company_Name": [],
                    "Customer_Type": '',
                    "Customer_FirstName": this.proposer.controls['firstName'].value,
                    "Customer_MiddleName": this.proposer.controls['middleName'].value,
                    "Customer_LastName": this.proposer.controls['lastName'].value,
                    "Customer_DateofBirth": this.datepipe.transform(this.proposer.controls['dob'].value, 'dd/MM/y'),
                    "Customer_Email": this.proposer.controls['email'].value,
                    "Customer_Mobile": this.proposer.controls['mobile'].value,
                    "Customer_Telephone": this.proposer.controls['alternateContact'].value,
                    "Customer_PanNo": this.proposer.controls['personalPan'].value,
                    "Customer_Salutation": this.proposer.controls['title'].value,
                    "Customer_Gender": this.proposer.controls['gender'].value,
                    "Customer_Perm_Address1": this.proposer.controls['address'].value,
                    "Customer_Perm_Address2": this.proposer.controls['address2'].value,
                    "Customer_Perm_Apartment": this.proposer.controls['address3'].value,
                    "Customer_Perm_Street": this.proposer.controls['landmarkpermanent'].value,
                    "Customer_Perm_CityDistrictCode": [],
                    "Customer_Perm_CityDistrict": this.proposer.controls['districtpermanent'].value,
                    "Customer_Perm_StateCode": [],
                    "Customer_Perm_State": this.proposer.controls['statepermanent'].value,
                    "Customer_Perm_PinCode": this.proposer.controls['pincode'].value,
                    "Customer_Perm_PinCodeLocality": this.proposer.controls['citypermanent'].value,
                    "Customer_Mailing_Address1": this.proposer.controls['address4'].value,
                    "Customer_Mailing_Address2": this.proposer.controls['address5'].value,
                    "Customer_Mailing_Apartment": this.proposer.controls['address6'].value,
                    "Customer_Mailing_Street": this.proposer.controls['landmarkcom'].value,
                    "Customer_Mailing_CityDistrictCode": [],
                    "Customer_Mailing_CityDistrict": this.proposer.controls['districtcom'].value,
                    "Customer_Mailing_StateCode": [],
                    "Customer_Mailing_State": this.proposer.controls['statecom'].value,
                    "Customer_Mailing_PinCode": this.proposer.controls['pincode1'].value,
                    "Customer_Mailing_PinCodeLocality": this.proposer.controls['citycom'].value,
                    "Customer_GSTIN_Number": this.proposer.controls['gstNumber'].value,
                    "Customer_GSTIN_State": []
                },
                "Policy_Details": {
                    "PolicyStartDate": this.tommarrow,
                    "ProposalDate": this.tod,
                    "AgreementType": '',
                    "FinancierCode": this.vechicle.controls['financiercode'].value,
                    "BranchName": this.vechicle.controls['fibranchname'].value,
                    "PreviousPolicy_CorporateCustomerId_Mandatary": this.regvalue != 'New Vehicle' ? this.vechicle.controls['Previouscompany'].value : '',
                    "PreviousPolicy_NCBPercentage": this.regvalue != 'New Vehicle' ? this.vechicle.controls['ncb'].value : '',
                    "PreviousPolicy_PolicyEndDate": this.tommarrow,
                    // this.datepipe.transform(this.vechicle.controls['previousenddate'].value,'dd/MM/y'),
                    "PreviousPolicy_PolicyNo": this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyno'].value : '',
                    "PreviousPolicy_PolicyClaim": this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyclaim'].value : '',
                    "BusinessType_Mandatary": this.RegDateage,
                    "VehicleModelCode": "26114",
                    "DateofDeliveryOrRegistration": this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['Vehicleregdate'].value, 'dd/MM/y') : this.tod,
                    "YearOfManufacture": this.vechicle.controls['manufactureyear'].value,
                    "Registration_No": this.regvalue != 'New Vehicle' ? this.vehicleRegNo : '',
                    "EngineNumber": this.vechicle.controls['engine'].value,
                    "ChassisNumber": this.vechicle.controls['chassis'].value,
                    // "RTOLocationCode": "10406",
                    "Vehicle_IDV": this.vehicleidv.Idv
                },

                "Req_PvtCar": {
                    "POSP_CODE": '',
                    "POLICY_TENURE": this.addOns.controls['policytenture'].value,
                    "ExtensionCountryCode": '',
                    "ExtensionCountryName": this.addOns.controls['extentioncountryvalue'].value,
                    "BreakIN_ID": '',
                    "Effectivedrivinglicense": this.addOns.controls['drivinglicence'].value,
                    "NumberOfEmployees": "0",
                    "BiFuelType": this.addOns.controls['biofuel'].value,
                    "BiFuel_Kit_Value": this.addOns.controls['biofuelkit'].value,
                    "LLPaiddriver": this.addOns.controls['numdrivers'].value,
                    "PAPaiddriverSI": this.addOns.controls['paiddriversi'].value,
                    "Owner_Driver_Nominee_Name": this.addOns.controls['NomineeName'].value,
                    "Owner_Driver_Nominee_Age": this.addOns.controls['NomineeAge'].value,
                    "Owner_Driver_Nominee_Relationship": this.addOns.controls['nomineeRelation'].value,
                    "Owner_Driver_Appointee_Name": this.addOns.controls['appointeename'].value,
                    "Owner_Driver_Appointee_Relationship": this.addOns.controls['appointeerelation'].value,
                    "IsZeroDept_Cover": this.addOns.controls['zerodept'].value == true ? '1' : '0',
                    'ElecticalAccessoryIDV': this.addOns.controls['ElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['ElecticalAccessoryIDV'].value,
                    'NonElecticalAccessoryIDV': this.addOns.controls['NonElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['NonElecticalAccessoryIDV'].value,
                    "OtherLoadDiscRate": this.addOns.controls['OtherLoadDiscRate'].value == true ? '1' : '0',
                    "AntiTheftDiscFlag": this.addOns.controls['Antitheftdiscflag'].value,
                    "HandicapDiscFlag": this.addOns.controls['HandicapDiscFlag'].value,
                    "IsNCBProtection_Cover": this.addOns.controls['IsNCBProtection'].value == true ? '1' : '0',
                    "IsRTI_Cover": this.addOns.controls['IsRTIcover'].value == true ? '1' : '0',
                    "IsCOC_Cover": this.addOns.controls['IsCOCcover'].value == true ? '1' : '0',
                    "IsEngGearBox_Cover": this.addOns.controls['engineandgear'].value == true ? '1' : '0',
                    "IsLossofUseDownTimeProt_Cover": this.addOns.controls['downtimeprotector'].value == true ? '1' : '0',
                    "IsEA_Cover": this.addOns.controls['IsEAAdvance_Cover'].value == true ? '1' : '0',
                    "IsEAW_Cover": this.addOns.controls['EAW'].value == true ? '1' : '0',
                    "IsEAAdvance_Cover": this.addOns.controls['IsEAAdvance_Cover'].value == true ? '1' : '0',
                    "IsTowing_Cover": this.addOns.controls['IsNCBProtection'].value == true ? '1' : '0',
                    "Towing_Limit": '',
                    "IsEMIProtector_Cover": this.addOns.controls['IsEMIprotector_Cover'].value == true ? '1' : '0',
                    "NoOfEmi": this.addOns.controls['noOfEmi'].value,
                    "EMIAmount": this.addOns.controls['EMIamount'].value,
                    "NoofUnnamedPerson": this.addOns.controls['NoofUnnamedPerson'].value == true ? '1' : '0',
                    "UnnamedPersonSI": this.addOns.controls['UnnamedPersonSI'].value,
                    "Voluntary_Excess_Discount": this.addOns.controls['VoluntaryExcessDiscount'].value,
                    "IsLimitedtoOwnPremises": this.addOns.controls['IsLimitedtoOwnPremises'].value == true ? '1' : '0',
                    "TPPDLimit": this.addOns.controls['TPPDLimit'].value,
                    "NoofnamedPerson": this.addOns.controls['NoofnamedPerson'].value == true ? '1' : '0',
                    "namedPersonSI": this.addOns.controls['namedPersonSI'].value,
                    "NamedPersons": this.addOns.controls['namedPerson'].value,
                    "AutoMobile_Assoication_No": '',
                    "CPA_Tenure": "1"
                },
            }

        }
        this.Fourwheeler.hdfcCarCover(data).subscribe(
            (successData) => {
                this.hdfcCarCoversuccess(successData);
            },
            (error) => {
                this.hdfcCarCoverFailure(error);
            }
        );
    }

    public hdfcCarCoversuccess(successData) {
        if (successData.IsSuccess == true) {
            this.coverPremium = successData.ResponseObject;
            console.log(this.coverPremium,'coverPremium');
            this.AntiTheftDisc_Premium=this.coverPremium.AntiTheftDisc_Premium;
            this.BiFuel_Kit_OD_Premium=this.coverPremium.BiFuel_Kit_OD_Premium;
            this.BiFuel_Kit_TP_Premium=this.coverPremium.BiFuel_Kit_TP_Premium;
            this.HandicapDisc_Premium=this.coverPremium.HandicapDisc_Premium;
            this.PaidDriver_Premium=this.coverPremium.PaidDriver_Premium;
            this.LimitedtoOwnPremises_OD_Premium=this.coverPremium.LimitedtoOwnPremises_OD_Premium;
            this.LimitedtoOwnPremises_TP_Premium=this.coverPremium.LimitedtoOwnPremises_TP_Premium;
            this. NamedPerson_premium=this.coverPremium.NamedPerson_premium;
            this. UnnamedPerson_premium=this.coverPremium.UnnamedPerson_premium;
            this.NonElectical_Acc_Premium=this.coverPremium.NonElectical_Acc_Premium;
            this.Electical_Acc_Premium=this.coverPremium.Electical_Acc_Premium;
            this.bifuelChangeValue();
            this.antiValue();
            this. handicapValue();
            this.ElecticAccesValue();
            this.nonElecticAccesValue();
            this.UnnamedPersonValue();
            this.namedPersonSIValue();
            this.limitedtoOwnValue();
            this.paiddriverValue();

        }
        else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public hdfcCarCoverFailure(error) {
    }

    createproposal(stepper){
        let stringToSplit ;
        stringToSplit=this.vehicledata.vehicle_no.toUpperCase();
        var pos = stringToSplit.search("-");
        console.log(pos,'pos');
        if(pos==-1) {
            console.log('ioio');
            console.log(stringToSplit, 'original number of regno');
            let x = stringToSplit.slice(0, 2);
            let y = stringToSplit.slice(2, 4);
            let z = stringToSplit.slice(4, 6);
            let w = stringToSplit.slice(6);
            let regno = x.concat('-', y, '-', z, '-', w);
            this.vehicleRegNo=regno;
            console.log(regno, 'reg');
            console.log(this.addOns.controls['ElecticalAccessoryIDV'].value, 'check');
        }
        console.log(this.addOns.controls['zerodept'].value,'zerodepte1111111111.......');

        console.log(this.vehicleidv.Idv);
        const data={
            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "enquiry_id": this.carEquiryId,
            "created_by": "",
            "policy_type":this.premiumType=='ThridParty_premium'?'ThridParty_Premium':'Comprehensive_Premium',
            "proposal_id":sessionStorage.hdfccarproposalID == '' || sessionStorage.hdfccarproposalID == undefined ? '' : sessionStorage.hdfccarproposalID,
            "motorproposalObj": {
                // 'TransactionID':this.vehicleidv.TransactionID,
            "Customer_Details": {
                "GC_CustomerID": [],
                    "Company_Name": [],
                    "Customer_Type": '',
                    "Customer_FirstName": this.proposer.controls['firstName'].value,
                    "Customer_MiddleName": this.proposer.controls['middleName'].value,
                    "Customer_LastName": this.proposer.controls['lastName'].value,
                    "Customer_DateofBirth": this.datepipe.transform(this.proposer.controls['dob'].value,'dd/MM/y'),
                    "Customer_Email": this.proposer.controls['email'].value,
                    "Customer_Mobile": this.proposer.controls['mobile'].value,
                    "Customer_Telephone":this.proposer.controls['alternateContact'].value,
                    "Customer_PanNo": this.proposer.controls['personalPan'].value,
                    "Customer_Salutation": this.proposer.controls['title'].value,
                    "Customer_Gender": this.proposer.controls['gender'].value,
                    "Customer_Perm_Address1": this.proposer.controls['address'].value,
                    "Customer_Perm_Address2": this.proposer.controls['address2'].value,
                    "Customer_Perm_Apartment": this.proposer.controls['address3'].value,
                    "Customer_Perm_Street": this.proposer.controls['landmarkpermanent'].value,
                    "Customer_Perm_CityDistrictCode": [],
                    "Customer_Perm_CityDistrict": this.proposer.controls['districtpermanent'].value,
                    "Customer_Perm_StateCode": [],
                    "Customer_Perm_State": this.proposer.controls['statepermanent'].value,
                    "Customer_Perm_PinCode": this.proposer.controls['pincode'].value,
                    "Customer_Perm_PinCodeLocality": this.proposer.controls['citypermanent'].value,
                    "Customer_Mailing_Address1": this.proposer.controls['address4'].value,
                    "Customer_Mailing_Address2": this.proposer.controls['address5'].value,
                    "Customer_Mailing_Apartment": this.proposer.controls['address6'].value,
                    "Customer_Mailing_Street": this.proposer.controls['landmarkcom'].value,
                    "Customer_Mailing_CityDistrictCode": [],
                    "Customer_Mailing_CityDistrict": this.proposer.controls['districtcom'].value,
                    "Customer_Mailing_StateCode": [],
                    "Customer_Mailing_State": this.proposer.controls['statecom'].value,
                    "Customer_Mailing_PinCode": this.proposer.controls['pincode1'].value,
                    "Customer_Mailing_PinCodeLocality": this.proposer.controls['citycom'].value,
                    "Customer_GSTIN_Number": this.proposer.controls['gstNumber'].value,
                    "Customer_GSTIN_State": []
            },
            "Policy_Details": {
                "PolicyStartDate": this.tommarrow,
                    "ProposalDate": this.tod,
                    "AgreementType": '',
                    "FinancierCode": this.vechicle.controls['financiercode'].value,
                    "BranchName":this.vechicle.controls['fibranchname'].value,
                    "PreviousPolicy_CorporateCustomerId_Mandatary": this.regvalue != 'New Vehicle' ? this.vechicle.controls['Previouscompany'].value : '' ,
                    "PreviousPolicy_NCBPercentage":this.regvalue != 'New Vehicle' ? this.vechicle.controls['ncb'].value : '',
                    "PreviousPolicy_PolicyEndDate": this.tommarrow,
                        // this.datepipe.transform(this.vechicle.controls['previousenddate'].value,'dd/MM/y'),
                    "PreviousPolicy_PolicyNo": this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyno'].value : '',
                    "PreviousPolicy_PolicyClaim": this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyclaim'].value : '',
                    "BusinessType_Mandatary": this.RegDateage ,
                    "VehicleModelCode": "26114",
                    "DateofDeliveryOrRegistration": this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['Vehicleregdate'].value, 'dd/MM/y') : this.tod ,
                    "YearOfManufacture": this.vechicle.controls['manufactureyear'].value,
                    "Registration_No": this.regvalue != 'New Vehicle' ? this.vehicleRegNo : '',
                    "EngineNumber": this.vechicle.controls['engine'].value,
                    "ChassisNumber": this.vechicle.controls['chassis'].value,
                    // "RTOLocationCode": "10406",
                    "Vehicle_IDV": this.vehicleidv.Idv
            },

            "Req_PvtCar": {
                "POSP_CODE": '',
                    "POLICY_TENURE":this.addOns.controls['policytenture'].value,
                    "ExtensionCountryCode": '',
                    "ExtensionCountryName": this.addOns.controls['extentioncountryvalue'].value,
                    "BreakIN_ID": '',
                    "Effectivedrivinglicense": this.addOns.controls['drivinglicence'].value,
                    "NumberOfEmployees": "0",
                    "BiFuelType": this.addOns.controls['biofuel'].value,
                    "BiFuel_Kit_Value": this.addOns.controls['biofuelkit'].value,
                    "LLPaiddriver":this.addOns.controls['numdrivers'].value ,
                    "PAPaiddriverSI":this.addOns.controls['paiddriversi'].value  ,
                    "Owner_Driver_Nominee_Name": this.addOns.controls['NomineeName'].value,
                    "Owner_Driver_Nominee_Age": this.addOns.controls['NomineeAge'].value,
                    "Owner_Driver_Nominee_Relationship": this.addOns.controls['nomineeRelation'].value,
                    "Owner_Driver_Appointee_Name": this.addOns.controls['appointeename'].value,
                    "Owner_Driver_Appointee_Relationship": this.addOns.controls['appointeerelation'].value,
                    "IsZeroDept_Cover": this.addOns.controls['zerodept'].value==true ?'1':'0',
                     'ElecticalAccessoryIDV': this.addOns.controls['ElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['ElecticalAccessoryIDV'].value,
                    'NonElecticalAccessoryIDV': this.addOns.controls['NonElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['NonElecticalAccessoryIDV'].value,
                    "OtherLoadDiscRate": this.addOns.controls['OtherLoadDiscRate'].value==true ?'1':'0',
                    "AntiTheftDiscFlag": this.addOns.controls['Antitheftdiscflag'].value,
                    "HandicapDiscFlag": this.addOns.controls['HandicapDiscFlag'].value,
                    "IsNCBProtection_Cover": this.addOns.controls['IsNCBProtection'].value ==true ?'1':'0',
                    "IsRTI_Cover": this.addOns.controls['IsRTIcover'].value ==true ?'1':'0',
                    "IsCOC_Cover": this.addOns.controls['IsCOCcover'].value ==true ?'1':'0',
                    "IsEngGearBox_Cover": this.addOns.controls['engineandgear'].value ==true ?'1':'0',
                    "IsLossofUseDownTimeProt_Cover": this.addOns.controls['downtimeprotector'].value ==true ?'1':'0',
                    "IsEA_Cover": this.addOns.controls['IsEAAdvance_Cover'].value ==true ?'1':'0',
                    "IsEAW_Cover": this.addOns.controls['EAW'].value ==true ?'1':'0',
                    "IsEAAdvance_Cover": this.addOns.controls['IsEAAdvance_Cover'].value ==true ?'1':'0',
                    "IsTowing_Cover": this.addOns.controls['IsNCBProtection'].value ==true ?'1':'0',
                    "Towing_Limit": '',
                    "IsEMIProtector_Cover": this.addOns.controls['IsEMIprotector_Cover'].value ==true ?'1':'0',
                    "NoOfEmi": this.addOns.controls['noOfEmi'].value,
                    "EMIAmount": this.addOns.controls['EMIamount'].value,
                    "NoofUnnamedPerson":this.addOns.controls['NoofUnnamedPerson'].value ==true ?'1':'0' ,
                    "UnnamedPersonSI": this.addOns.controls['UnnamedPersonSI'].value ,
                    "Voluntary_Excess_Discount":this.addOns.controls['VoluntaryExcessDiscount'].value ,
                    "IsLimitedtoOwnPremises": this.addOns.controls['IsLimitedtoOwnPremises'].value==true ?'1':'0',
                    "TPPDLimit": this.addOns.controls['TPPDLimit'].value,
                    "NoofnamedPerson": this.addOns.controls['NoofnamedPerson'].value==true ?'1':'0',
                    "namedPersonSI": this.addOns.controls['namedPersonSI'].value,
                    "NamedPersons": this.addOns.controls['namedPerson'].value,
                    "AutoMobile_Assoication_No": '',
                    "CPA_Tenure": "1"
            },
        //     "Payment_Details": {
        //         "GC_PaymentID": [],
        //             // "BANK_NAME": this.BankDetails.controls['Bankname'].value,
        //             // "BANK_BRANCH_NAME": this.BankDetails.controls['Branch'].value,
        //             "PAYMENT_MODE_CD":this.BankDetails.controls['paymentmode'].value ,
        //             "PAYER_TYPE": this.BankDetails.controls['Payertype'].value,
        //             "PAYMENT_AMOUNT": "25176",
        //             "INSTRUMENT_NUMBER": this.BankDetails.controls['refrenceno'].value,
        //             "PAYMENT_DATE": this.datepipe.transform(this.BankDetails.controls['Paymentdate'].value,'dd/MM/y')
        //
        // }
        }

        };
        console.log(data,'data');
        console.log(this.addOns.controls['zerodept'].value,'zerodepte.......');
        this.Setting.loadingSpinner = true;
        this.Fourwheeler.proposalHdfccar(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
                console.log(successData,'succc');
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }
    proposalSuccess(successData,stepper){
        this.Setting.loadingSpinner = false;
        this.proposerFormData = this.proposer.value;
        console.log(this.proposerFormData);
        if (successData.IsSuccess) {
            stepper.next();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryDatacarHdfc = JSON.stringify(this.summaryData );
            this.Proposalnumber = this.summaryData.Proposal_Number;
            this.PaymentRedirect = this.summaryData.PaymentRedirect;
            this.PaymentReturn = this.summaryData.PaymentReturn;
            sessionStorage.hdfccarproposalID = this.summaryData.ProposalId;
            this.proposerFormData = this.proposer.value;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            this.vehicalFormData = this.vechicle.value;
            this.previousFormData = this.addOns.value;
            this.bankFormData = this.BankDetails.value;
        }else {
            if (successData.ErrorDes) {
                this.toastr.error(successData.ErrorDes);
                console.log(successData.ErrorDes, 'errordes');
                this.Setting.loadingSpinner = false;
            } else {
                this.toastr.error(successData.ErrorObject);
                console.log(successData.ErrorObject, 'errorobj');
                this.Setting.loadingSpinner = false;
            }
        }
        }

    proposalFailure(error){

    }
    alternatecontact(value, event) {
        console.log(event);
        if (this.proposer.controls['mobile'].value == value) {
            console.log('ooo');
            this.altererror = 'Enter Alternate Contact';
        } else if (this.proposer.controls['mobile'].value != value) {
            this.altererror = '';
        }
        if (value.search('-') == -1 && value != '') {
            this.altererror = 'Enter Valued Format Of Telephone Number';
        } else if (value.search('-') != -1) {
            this.altererror = '';
        }
        if (value.search('-') > 5 && value != '') {
            this.altererror = ' Enter Valid Area Code ';
        } else if (value.search('-')! > 5) {
            this.altererror = '';
        }
    }

    regdatecalculate(regno) {
        console.log(regno);
        let today = new Date();
        let birthDate = new Date(regno);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        let dd = today.getDate() - birthDate.getDate();
        console.log(age, 'age');
        console.log(m, 'month');
        console.log(dd, 'date');
        console.log(birthDate, 'bithdatree');
        if (age < 1 || m < 6) {
            this.regvalue = 'New Vehicle';
            console.log('log');
        }
        if (age > 1 || m > 6) {
            console.log('roll');
            this.regvalue = 'Roll Over';

        }
        return this.regvalue;


    }

    // idvinput(idv){
    //     if(idv<7000){
    //         this.toastr.error('IDV Should Not Less Than 7000');
    //     }
    // }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }

    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }

    dobValidate(event: any) {
        this.validation.dobValidate(event);
    }

    idValidate(event: any) {
        this.validation.idValidate(event);
    }

    teleValidate(event: any) {

        if (event.charCode !== 0) {
            const pattern = /[0-9-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();

            }
        }
    }

}
