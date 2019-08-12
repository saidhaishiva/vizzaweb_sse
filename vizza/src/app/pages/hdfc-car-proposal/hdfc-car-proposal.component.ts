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
    public carEquiryId: any;
    public vehicleidv: any;

  constructor(public fb: FormBuilder,public appsetting: AppSettings, public config: ConfigurationService, public route: ActivatedRoute, public validation: ValidationService, private toastr: ToastrService, public bikeInsurance: BikeInsuranceService, public authservice: AuthService, public datepipe: DatePipe) {
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
          personalPan: [''],
          sameAsAddress: [''],
          address4: ['', Validators.required],
          address5: ['', Validators.required],
          address6: ['', Validators.required],
          pincode1: ['', Validators.required],
          issameascmmunication: [''],
          titlevalue:[''],
          uniqueid:[''],
          Lgcode:[''],

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
          financiercode: [''],
          fibranchname: [''],
          Previouscompanyvalue: [''],
          financiercodevalue: [''],
          previouspolicyclaim:['', Validators.required],
      });
      this.addOns = this.fb.group({
          extentioncountry: [''],
          policytenture: [''],
          drivinglicence: [''],
          biofuel: [''],
          biofuelkit: [''],
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
          IsEAAdvance_Cover:[''],
          IsEMIprotector_Cover:[''],
          EAW:[''],
          NoofUnnamedPerson:[''],
      });
      this.BankDetails = this.fb.group({
          Bankname: ['', Validators.required],
          Branch: ['', Validators.required],
          Payertype: ['', Validators.required],
          paymentmode: ['', Validators.required],
          refrenceno: ['', Validators.required],
          Paymentdate: ['', Validators.required],
          Banknamevalue: ['']


      });


  }

  ngOnInit() {
      this.sessionstorage();
      this.previouscompany();
      this.bankname();
      this.financiername();
      this.extensioncountry();
      this.vehicledata = JSON.parse(sessionStorage.vehicledetailsfw);
      this.carEquiryId = sessionStorage.fwEnquiryId;
      this.vehicleidv=JSON.parse(sessionStorage.buyFourwheelerProductDetails);

      // this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
      this.vechicle.controls['engine'].patchValue(this.vehicledata.engine_no);
      this.vechicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
      this.vechicle.controls['vehiclemodel'].patchValue(this.vehicledata.vehicle_model);
      this.vechicle.controls['Vehicleregdate'].patchValue(this.datepipe.transform(this.vehicledata.registration_date, 'y-MM-dd'));
      this.vechicle.controls['regno'].patchValue(this.vehicledata.vehicle_no);
      this.vechicle.controls['manufactureyear'].patchValue(this.vehicledata.manu_yr);
      this.vechicle.controls['Previouscompany'].patchValue(this.vehicledata.prev_insurance_name);
      this.vechicle.controls['ncb'].patchValue(this.vehicledata.ncb_percent);
      this.vechicle.controls['previousenddate'].patchValue(this.datepipe.transform(this.vehicledata.previous_policy_expiry_date, 'y-MM-dd'));

  }

    sameaspermenant(event){
        console.log(event);
        if (event.checked == true) {
            console.log(this.proposer.controls['citycom'].value);

            this.proposer.controls['address'].patchValue(this.proposer.controls['address4'].value);
            this.proposer.controls['address2'].patchValue(this.proposer.controls['address5'].value);
            this.proposer.controls['address3'].patchValue(this.proposer.controls['address6'].value);
            this.proposer.controls['pincode'].patchValue(this.proposer.controls['pincode1'].value);
            this.proposer.controls['statepermanent'].patchValue(this.proposer.controls['statecom'].value);
            this.proposer.controls['citypermanent'].patchValue(this.proposer.controls['citycom'].value);
            this.proposer.controls['districtpermanent'].patchValue(this.proposer.controls['districtcom'].value);
            this.proposer.controls['landmarkpermanent'].patchValue(this.proposer.controls['landmarkcom'].value);
        } else if (event.checked != true) {
            this.proposer.controls['address'].patchValue('');
            this.proposer.controls['address2'].patchValue('');
            this.proposer.controls['address3'].patchValue('');
            this.proposer.controls['pincode'].patchValue('');
            this.proposer.controls['statepermanent'].patchValue('');
            this.proposer.controls['citypermanent'].patchValue('');
            this.proposer.controls['districtpermanent'].patchValue('');
            this.proposer.controls['landmarkpermanent'].patchValue('');

        }

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

    proposerpincodeListFailure(error) {

    }
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
                    sessionStorage.proposerAge = this.proposerAge;
                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10 && type == 'proposor') {
                    this.proposerAge = this.ageCalculate(dob);
                    this.personalDobError = '';
                    sessionStorage.proposerAge = this.proposerAge;
                }
            }
            if (type == 'proposor') {
                console.log(this.proposerAge, 'age');
                sessionStorage.proposerAge = this.proposerAge;
            }
        }
    }
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
        sessionStorage.company = JSON.stringify(this.companyList);

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

    public banksuccess(successData) {
        this.bankList = successData.ResponseObject;
    }

    public financesuccess(successData) {
        this.financeList = successData.ResponseObject;
    }
    public countrysucccess(successData) {
        this.countryList = successData.ResponseObject;
    }

    public failureSuccess(error) {
    }
    changeInsuranceCompany() {
        this.vechicle.controls['Previouscompanyvalue'].patchValue(this.companyList[this.vechicle.controls['Previouscompany'].value]);

    }

    changefinancecompany() {
        this.vechicle.controls['financiercodevalue'].patchValue(this.financeList[this.vechicle.controls['financiercode'].value]);

    }

    changebankname() {
        this.BankDetails.controls['Banknamevalue'].patchValue(this.bankList[this.BankDetails.controls['Bankname'].value]);
    }
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

    proposerpincodeListSuccess(successData, type) {
        if (successData.IsSuccess) {
            console.log(successData, 'ss');

            this.cityarray=successData.ResponseObject;
            var i;
            let g= new Array();
            let distrct=new Array();
            console.log(this.cityarray,'cityarry');
            for (i = 0; i < this.cityarray.length; i++) {

                g.push(this.cityarray[i]['txt_pincode_locality']);
                console.log(distrct[i]);
                if(this.cityarray[i]['txt_city_district'] != distrct[i]){
                    // distrct.push(this.cityarray[i])
                    distrct.push(this.cityarray[i]['txt_city_district']);
                }
                // distrct.push(this.cityarray[i]['txt_city_district']);

            }
            this.cityarray=g;
            sessionStorage.citylist=JSON.stringify(g);
            this.districtarray=distrct;
            sessionStorage.districtlist=JSON.stringify(distrct);
            console.log(sessionStorage.districtlist,'session');


            console.log(g,'jj');
            if (type == 'proposer') {
                this.proposerPinList = successData.ResponseObject;
                this.proposer.controls['statepermanent'].patchValue(this.proposerPinList[0].txt_state);
                this.proposer.controls['districtpermanent'].patchValue(this.proposerPinList[0].txt_city_district);
                this.proposer.controls['citypermanent'].patchValue(this.proposerPinList[0].txt_pincode_locality);
            } else if (type == 'comm') {
                this.proposerComList = successData.ResponseObject;
                this.proposer.controls['statecom'].patchValue(this.proposerComList[0].txt_state);
                this.proposer.controls['districtcom'].patchValue(this.proposerComList[0].txt_city_district);
                this.proposer.controls['citycom'].patchValue(this.proposerComList[0].txt_pincode_locality);
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
                if (sessionStorage.proposerAge >= 18) {
                    stepper.next();
                    this.topScroll();
                } else {
                    this.toastr.error('Proposer Age should be greater than 18.')
                }
            } else {
                this.toastr.error('Please Fill All The Mandtory Fields');

            }
        }
        if (type == 'stepper2') {
            console.log('wwwww');
            sessionStorage.stepper2Details = '';
            sessionStorage.stepper2Details = JSON.stringify(value);
            this.addOns.controls['NomineeName'].patchValue('');
            this.addOns.controls['NomineeAge'].patchValue('');
            this.addOns.controls['appointeename'].patchValue('');
            this.addOns.controls['appointeerelation'].patchValue('');
            // if (this.vechicle.valid) {
                stepper.next();
                this.topScroll();
            // } else {
            //     this.toastr.error('Please fill the Mandatory Fields')

            // }
        }
        if (type == 'stepper3') {
            sessionStorage.stepper3Details = '';
            sessionStorage.stepper3Details = JSON.stringify(value);


            // if (this.addOns.valid) {
                stepper.next();
                this.topScroll();

            // }else{
            //     this.toastr.error('Please fill the Mandatory Fields')

            // }
        }
        if(type == 'stepper4'){
            sessionStorage.stepper4Details='';
            sessionStorage.stepper4Details=JSON.stringify(value);

            // console.log(this.proposerFormData,'form');
            // console.log(this.proposerFormData.title,'titt');
            console.log('inn');
            // if(this.BankDetails.valid){
                this.createproposal(stepper);
                this.topScroll();
            // }
        }


    }
    sessionstorage(){
        if (sessionStorage.citylist != '' && sessionStorage.citylist != undefined) {
            this.cityarray = JSON.parse(sessionStorage.citylist)
        }
        if (sessionStorage.districtlist != '' && sessionStorage.districtlist != undefined) {
            this.districtarray = JSON.parse(sessionStorage.districtlist)
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
                uniqueid: this.getstepper1.uniqueid,
                Lgcode: this.getstepper1.Lgcode,

            })
        }
        if (sessionStorage.company != '' && sessionStorage.company != undefined) {
            this.companyList = JSON.parse(sessionStorage.company)
            console.log('innnworld');
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
            })
        }
    }

    createproposal(stepper){
        let stringToSplit ;
        stringToSplit=this.vechicle.controls['regno'].value;
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
            this.vechicle.controls['regno'].patchValue(regno);
            console.log(regno, 'reg');
            console.log(this.addOns.controls['ElecticalAccessoryIDV'].value, 'check');
        }
        const data={

            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '4',
            "pos_status": "0",
            "enquiry_id": this.carEquiryId,
            "created_by": "",
            "proposal_id": "",
            "motorproposalObj": {
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
                    "AgreementType": [],
                    "FinancierCode": [],
                    "BranchName": [],
                    "PreviousPolicy_CorporateCustomerId_Mandatary": this.vechicle.controls['Previouscompany'].value ,
                    "PreviousPolicy_NCBPercentage": this.vechicle.controls['ncb'].value,
                    "PreviousPolicy_PolicyEndDate": this.datepipe.transform(this.vechicle.controls['previousenddate'].value,'dd/MM/y'),
                    "PreviousPolicy_PolicyNo": this.vechicle.controls['previouspolicyno'].value,
                    "PreviousPolicy_PolicyClaim": this.vechicle.controls['previouspolicyclaim'].value,
                    "BusinessType_Mandatary": "Roll Over",
                    "VehicleModelCode": "26114",
                    "DateofDeliveryOrRegistration": this.datepipe.transform(this.vechicle.controls['Vehicleregdate'].value,'dd/MM/y'),
                    "YearOfManufacture": this.vechicle.controls['manufactureyear'].value,
                    "Registration_No": this.vechicle.controls['regno'].value,
                    "EngineNumber": this.vechicle.controls['engine'].value,
                    "ChassisNumber": this.vechicle.controls['chassis'].value,
                    // "RTOLocationCode": "10406",
                    "Vehicle_IDV": this.vehicleidv
            },

            "Req_PvtCar": {
                "POSP_CODE": [],
                    "POLICY_TENURE": "1",
                    "ExtensionCountryCode": this.addOns.controls['extentioncountry'].value,
                    "ExtensionCountryName": [],
                    "BreakIN_ID": [],
                    "Effectivedrivinglicense": this.addOns.controls['drivinglicence'].value,
                    "NumberOfEmployees": "0",
                    "BiFuelType": this.addOns.controls['biofuel'].value,
                    "BiFuel_Kit_Value": this.addOns.controls['biofuelkit'].value,
                    "LLPaiddriver": this.addOns.controls['IsPaidDriver'].value==true ?'1':'0',
                    "PAPaiddriverSI":this.addOns.controls['paiddriversi'].value ==true ?'1':'0' ,
                    "Owner_Driver_Nominee_Name": this.addOns.controls['NomineeName'].value,
                    "Owner_Driver_Nominee_Age": this.addOns.controls['NomineeAge'].value,
                    "Owner_Driver_Nominee_Relationship": this.addOns.controls['nomineeRelation'].value,
                    "Owner_Driver_Appointee_Name": this.addOns.controls['appointeename'].value,
                    "Owner_Driver_Appointee_Relationship": this.addOns.controls['appointeerelation'].value,
                    "IsZeroDept_Cover": this.addOns.controls['zerodept'].value=='true' ?'1':'0',
                    "ElecticalAccessoryIDV":  this.addOns.controls['ElecticalAccessoryIDV'].value ==true ?'1':'0',
                    "NonElecticalAccessoryIDV": this.addOns.controls['NonElecticalAccessoryIDV'].value==true ?'1':'0',
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
                    "Towing_Limit": [],
                    "IsEMIProtector_Cover": this.addOns.controls['IsEMIprotector_Cover'].value ==true ?'1':'0',
                    "NoOfEmi": [],
                    "EMIAmount": "0",
                    "NoofUnnamedPerson":this.addOns.controls['NoofUnnamedPerson'].value ==true ?'1':'0' ,
                    "UnnamedPersonSI": this.addOns.controls['UnnamedPersonSI'].value,
                    "Voluntary_Excess_Discount":this.addOns.controls['VoluntaryExcessDiscount'].value ,
                    "IsLimitedtoOwnPremises": this.addOns.controls['IsLimitedtoOwnPremises'].value==true ?'1':'0',
                    "TPPDLimit": this.addOns.controls['TPPDLimit'].value,
                    "NoofnamedPerson": this.addOns.controls['NoofnamedPerson'].value==true ?'1':'0',
                    "namedPersonSI": this.addOns.controls['UnnamedPersonSI'].value==true ?'1':'0',
                    "NamedPersons": [],
                    "AutoMobile_Assoication_No": [],
                    "CPA_Tenure": "1"
            },
            "Payment_Details": {
                "GC_PaymentID": [],
                    "BANK_NAME": this.BankDetails.controls['Bankname'].value,
                    "BANK_BRANCH_NAME": this.BankDetails.controls['Branch'].value,
                    "PAYMENT_MODE_CD":this.BankDetails.controls['paymentmode'].value ,
                    "PAYER_TYPE": this.BankDetails.controls['Payertype'].value,
                    "PAYMENT_AMOUNT": "25176",
                    "INSTRUMENT_NUMBER": this.BankDetails.controls['refrenceno'].value,
                    "PAYMENT_DATE": this.datepipe.transform(this.BankDetails.controls['Paymentdate'].value,'dd/MM/y')

        }
        }

        };
        this.Setting.loadingSpinner = true;
        this.bikeInsurance.proposalHdfc(data).subscribe(
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
    idvinput(idv){
        if(idv<7000){
            this.toastr.error('IDV Should Not Less Than 7000');
        }
    }
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

}
