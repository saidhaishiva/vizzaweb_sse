import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
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
declare const global: any;
// tslint:disable-next-line:variable-name
const MouseEvent = (global as any).MouseEvent as MouseEvent;

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
    // public BankDetails: FormGroup;
    public proposerComList: any;
    public previouspolicy: any;
    public vehicledata: any;
    public financeList: any;
    public bikeEnquiryId: any;
    public getstepper1: any;
    public getstepper2: any;
    public getstepper3: any;
    // public getstepper4: any;
    public nomineename: any;
    public proposerFormData: any;
    public vehicalFormData: any;
    public previousFormData: any;
    // public bankFormData: any;
    public buyBikeDetails: any;
    public RegDateage: any;
    public regvalue: any;
    public countryList: any;
    public summaryData: any;
    public Proposalnumber: any;
    public PaymentRedirect: any;
    public PaymentReturn: any;
    public ProposalId: any;
    public cityarray: any;
    public districtarray: any;
    public payment: any;
    public vehicleidv: any;
    public citylist: any;
    public districtlist: any;
    public tommarrow: any;
    public gggg: any;
    public tod: any;
    public financeTypeTrue: boolean;
    public financeTypeName: boolean;
    public companylogo: any;
    public currentStep: any;
    public altererror: any;
    public pinerror: any;
    public pinerrorpermanent: any;
    public response: any;
    public personalCitys: any;
    public residenceCitys: any;
    public personaldistricts: any;
    public residenceDistricts: any;
    public premiumType: any;
    public vehicleRegNumber: any;
    public vehicleRegNo: any;
    public buyProductDetails: any;
    public finlist: any;
    public sameasper: boolean;
    public nomineeAge : any;
    public lesserDate:any;
    public nilDepValue:any;
    public coverPremium:any;
    public Electical_Acc_Premium:any;
    public Elec_ZD_Premium:any;
    public NonElectical_Acc_Premium:any;
    public NonElec_ZD_Premium:any;
    public LimitedtoOwnPremises_OD_Premium:any;
    public LimitedtoOwnPremises_TP_Premium:any;
    public Basic_OD_Premium:any;
    public Basic_TP_Premium:any;
    public PaidDriver_Premium:any;
    public AntiTheftDisc_Premium:any;
    public PAOwnerDriver_Premium:any;
    public HandicapDisc_Premium:any;
    public BiFuel_Kit_TP_Premium:any;
    public BiFuel_Kit_OD_Premium:any;
    public returntoinvoice:any;
    public emerengy_assitance:any;
    public zero_depression:any;
    public compulsory_ownerdriver:any;


    public financiercodevalue: any;
    public antitheftdisc = 'false';
    public handicapdic = 'false';

    photos = [];
    photosBuffer = [];
    bufferSize = 50;
    numberOfItemsFromEndBeforeFetchingMore = 10;
    loading = false;

    constructor(public fb: FormBuilder, public appsetting: AppSettings, public config: ConfigurationService, public route: ActivatedRoute, public validation: ValidationService, private toastr: ToastrService, public bikeInsurance: BikeInsuranceService, public authservice: AuthService, public datepipe: DatePipe) {
        this.financeTypeTrue = false;
        this.financeTypeName = false;
        this.sameasper = false;

        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if (params.stepper == true || params.stepper == 'true') {
                stepperindex = 3;
                if (sessionStorage.summaryDatabikeHdfc != '' && sessionStorage.summaryDatabikeHdfc != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryDatabikeHdfc);
                    this.premiumType = JSON.parse(sessionStorage.packae_list);
                    this.PaymentRedirect = this.summaryData.PaymentRedirect;
                    this.PaymentReturn = this.summaryData.PaymentReturn;
                    this.proposerFormData = JSON.parse(sessionStorage.stepper1Details);
                    this.vehicalFormData = JSON.parse(sessionStorage.stepper2Details);
                    this.previousFormData = JSON.parse(sessionStorage.stepper3Details);
                    // this.bankFormData = JSON.parse(sessionStorage.stepper4Details);
                    this.ProposalId = sessionStorage.hdfcBikeproposalID;
                }
            }
        });
        console.log(stepperindex, 'stepperindex');
        this.currentStep = stepperindex;
        this.Setting = appsetting.settings;
        this.webhost = this.config.getimgUrl();
        this.Setting.HomeSidenavUserBlock = false;
        this.Setting.sidenavIsOpened = false;
        this.Setting.sidenavIsPinned = false;
        var today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.tommarrow = this.today.setDate(this.today.getDate() + 1);
        this.tommarrow = this.datepipe.transform(this.tommarrow, 'dd/MM/y');
        var todaydate = new Date();
        this.gggg = new Date(todaydate.getFullYear(), todaydate.getMonth(), todaydate.getDate());
        this.tod = this.datepipe.transform(this.gggg, 'dd/MM/y');
        const lateDate = todaydate.getFullYear()-3;
        this.lesserDate = new Date(lateDate, todaydate.getMonth(), todaydate.getDate());
        String;
        this.tod = this.tod.substring(0, 10);
        this.nilDepValue=false;

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
            personalPan: ['', Validators.required],
            sameAsAddress: [''],
            address4: ['', Validators.required],
            address5: ['', Validators.required],
            address6: [''],
            pincode1: ['', Validators.required],
            issameascmmunication: [''],
            titlevalue: [''],
            uniqueid: [''],
            Lgcode: [''],

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
            Financetype: false,
            Agreement: [''],
            financiercode: '',
            fibranchname: [''],
            Previouscompanyvalue: [''],
            financiercodevalue: [''],
            previouspolicyclaim: ['', Validators.required],
            Financetyp: ['']

        });
        this.addOns = this.fb.group({
            extentioncountry: [''],
            compul: [''],
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
            // OtherLoadDiscRate: [''],
            pacovername: [''],
            pasuminsured: [''],
            pacover: [''],
            totalElectricPremium: [''],
            totalElectricPremium1: [''],
            totalNonElectricPremium: [''],
            totalNonElectricPremium1: [''],
            totalPaidDriverPremium: [''],
            totalAntitheftdiscPremium: [''],
            totalbiofuelkitPremium: [''],
            totalbiofuelkitPremium1: [''],
            totalHandicapDiscFlagPremium: [''],
            totalZerodeptPremium: [''],
            totalLimitedtoOwnPremium: [''],
            totalLimitedtoOwnPremium1: [''],
            emergencyassistance: [''],
            emergencyassistancePremium: [''],
            returntoinvoice: [''],
            returntoinvoicePremium: [''],
            // totalLoadDiscPremium: 0,
        });
        // this.BankDetails = this.fb.group({
        // banknamelist:[''],
        // Bankname: ['', Validators.required],
        // Branch: ['', Validators.required],
        // Payertype: ['', Validators.required],
        // paymentmode: ['', Validators.required],
        // refrenceno: ['', Validators.required],
        // Paymentdate: ['', Validators.required],
        // Banknamevalue: ['']


        // });


    }

    ngOnInit() {
        this.changeGender();
        this.previouscompany();
        this.bankname();
        this.financiername();
        this.extensioncountry();
        this.sessionData();
        this.vehicledata = JSON.parse(sessionStorage.vehicledetails);
        this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        this.buyBikeDetails = JSON.parse(sessionStorage.enquiryFormData);
        this.buyProductDetails = JSON.parse(sessionStorage.buyProductDetails);
        this.addOns.controls['extentioncountry'].patchValue('No Extension');
        console.log(this.addOns.controls['extentioncountry'].value,'11111')
        this.vechicle.controls['vechicleidv'].patchValue(this.buyProductDetails.Idv);
        console.log(this.vechicle.controls['vechicleidv'].value,'12233333');
// this.summaryData=JSON.parse(sessionStorage.summaryData);
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
        console.log(this.vehicledata, 'iie');
        this.vechicle.controls['engine'].patchValue(this.vehicledata.engine_no);
        this.vechicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
        console.log(this.vehicledata.previous_claim_YN, 'llll');
        this.vechicle.controls['previouspolicyclaim'].patchValue(this.buyBikeDetails.previous_claim_YN == '1' ? 'YES' : 'NO');
        console.log(this.buyBikeDetails, 'bjsjjhjdhj');
        // this.vehicledetails = JSON.parse(sessionStorage.bikeListDetails);
        this.vehicleidv = JSON.parse(sessionStorage.buyProductDetails);
        this.companylogo = this.vehicleidv.company_logo;
        console.log(this.vehicleidv.Comprehensive_premium, 'idv');
        this.vechicle.controls['vehiclemodel'].patchValue(this.vehicledata.vehicle_model);
        this.vechicle.controls['Vehicleregdate'].patchValue(this.datepipe.transform(this.vehicledata.registration_date, 'y-MM-dd'));
        this.vechicle.controls['regno'].patchValue(this.vehicleRegNumber);
        this.vechicle.controls['manufactureyear'].patchValue(this.vehicledata.manu_yr);
        // this.vechicle.controls['Previouscompany'].patchValue(this.vehicledata.prev_insurance_name);
        this.vechicle.controls['ncb'].patchValue(this.vehicledata.ncb_percent);
        this.vechicle.controls['previousenddate'].patchValue(this.datepipe.transform(this.vehicledata.previous_policy_expiry_date, 'y-MM-dd'));
        if (this.vechicle.controls['Vehicleregdate'].value) {
            let regno = '';
            console.log(this.vehicledata.registration_date,'this.vehicledata.registration_date...')
            regno = this.datepipe.transform(this.datepipe.transform(this.vehicledata.registration_date), 'yyyy-MM-dd');
            console.log(regno,'regno...')
            this.RegDateage = this.regdatecalculate(regno);
        }
        console.log(this.vehicledata.type,'456789')
        if (this.vehicledata.type == 'new') {
            this.regvalue = 'New Vehicle';
            this.validationForNew(this.regvalue);
        } else if (this.vehicledata.type != 'new'){
            this.regvalue = 'Roll Over';
            this.validationForNew(this.regvalue);
        }
        this.altererror = '';

       this.nilDepDateValidation();


    }

    nilDepDateValidation() {
        let valueDil=this.datepipe.transform(this.lesserDate, 'y-MM-dd')
        console.log(this.lesserDate,'lesserDate....')
        console.log(valueDil,'valueDil....')
        // let valuessss=(valueDil > this.carListDetails.registration_date );
        console.log(this.buyBikeDetails.registration_date,'55555555555555....')
        // console.log(valuessss,'valuessss....')

        if(valueDil < this.buyBikeDetails.registration_date ){
            this.nilDepValue=true;
            // alert('in')
        }else{
            // alert('out')
            this.nilDepValue=false;
        }
        console.log(this.nilDepValue,'nilDepValue....')
    }
    compulsory(){
        this.addOns.controls['compul'].patchValue(this.compulsory_ownerdriver);
    }
    // dropdownForBank(value,type){
    //
    //     if(value.length >'5'&& type =='bank'){
    //         const data = {
    //             'platform': 'web',
    //             'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    //             'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    //         };
    //         this.bikeInsurance.hdfcGetBankNameList(data).subscribe(
    //             (successData) => {
    //                 this.banksuccess(successData);
    //             },
    //             (error) => {
    //                 this.failureSuccess(error);
    //             }
    //         );
    //     }
    // }

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
                this.failureTitleSuccess(error);
            }
        );
    }
    public titlesucccess(successData) {
        if (successData.IsSuccess) {

            this.titleList = successData.ResponseObject;
        }
    }
    public failureTitleSuccess(error) {
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
                this.failureCompanySuccess(error);
            }
        );
    }
    public companysucccess(successData) {
        if (successData.IsSuccess) {

            this.companyList = successData.ResponseObject;
            sessionStorage.companylist = JSON.stringify(this.companyList);

        }
    }
    public failureCompanySuccess(error) {
    }

    extensioncountry() {
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
                this.failureCountrySuccess(error);
            }
        );
    }
    public countrysucccess(successData) {
        if (successData.IsSuccess) {

            this.countryList = successData.ResponseObject;
        }
    }
    public failureCountrySuccess(error) {
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
                this.failureBankSuccess(error);
            }
        );
    }
    public banksuccess(successData) {
        if (successData.IsSuccess) {
            this.bankList = successData.ResponseObject;
        }
    }
    public failureBankSuccess(error) {
    }

    financiername() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'

        }
        this.bikeInsurance.hdfcGetFinancierNameLists(data).subscribe(
            (successData) => {
                this.financesuccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }

    public financesuccess(successData) {
        if (successData.IsSuccess == true) {
            // this.financeList = successData.ResponseObject;
            this.finlist = successData.ResponseObject.bankdetails;
            // this.photos = successData.ResponseObject.bankdetails;
            // console.log(this.finlist,'finlist');
            // this.photosBuffer = this.photos.slice(0, this.bufferSize);
            // console.log(this.photosBuffer,'photos');
            this.financierListname();
        }else{
            this.toastr.error(successData.ErrorObject);
        }
    }

    public failureSuccess(error) {

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
    //
    // public titlesucccess(successData) {
    //     this.titleList = successData.ResponseObject;
    // }
    //
    // public companysucccess(successData) {
    //     this.companyList = successData.ResponseObject;
    //     sessionStorage.companylist = JSON.stringify(this.companyList);
    //
    // }
    //
    // public banksuccess(successData) {
    //     this.bankList = successData.ResponseObject;
    // }
    //
    // public financesuccess(successData) {
    //     this.financeList = successData.ResponseObject;
    // }
    //
    // public countrysucccess(successData) {
    //     this.countryList = successData.ResponseObject;
    // }
    //
    // public failureSuccess(error) {
    // }


    ///change title value
    changeTitle() {
        this.proposer.controls['titlevalue'].patchValue(this.titleList[this.proposer.controls['title'].value]);
    }

    changeInsuranceCompany() {
        this.vechicle.controls['Previouscompanyvalue'].patchValue(this.companyList[this.vechicle.controls['Previouscompany'].value]);

    }

    // changefinancecompany() {
    //     this.vechicle.controls['financiercodevalue'].patchValue(this.financeList[this.vechicle.controls['financiercode'].value]);
    //
    // }
    changefinancecompany() {
        this.vechicle.controls['financiercodevalue'].patchValue(this.finlist[this.vechicle.controls['financiercode'].value]);

    }

    // changebankname() {
    //     this.BankDetails.controls['Banknamevalue'].patchValue(this.bankList[this.BankDetails.controls['Bankname'].value]);
    // }

    // changeextensioncountry() {
    //     this.addOns.controls['extentioncountryvalue'].patchValue(this.countryList[this.addOns.controls['extentioncountry'].value]);
    //     console.log(this.addOns.controls['extentioncountryvalue'].value);
    // }

    validationForNew(value) {
        console.log(value, 'valuecore');
        if (value == 'New Vehicle') {
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


    //
    //stepper
    nextTab(stepper, value, type) {
        if (type == 'stepper1') {
            console.log(value, 'value');
            // this.proposerData = value;
            sessionStorage.stepper1Details = '';
            sessionStorage.stepper1Details = JSON.stringify(value);
            console.log(sessionStorage, 'storage');
            // this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
            console.log(this.proposer.valid, 'valid');
            if (this.proposer.valid) {
                if (sessionStorage.proposerAge >= 18) {

                    if (this.altererror == '') {
                        stepper.next();
                        this.topScroll();
                    }
                } else {
                    this.toastr.error('Proposer Age should be greater than 18.');
                }
            } else {
                this.toastr.error('Please Fill All The Mandtory Fields');

            }
        }
        if (type == 'stepper2') {
            sessionStorage.stepper2Details = '';
            sessionStorage.stepper2Details = JSON.stringify(value);
            // this.addOns.controls['NomineeName'].patchValue('');
            // this.addOns.controls['NomineeAge'].patchValue('');
            // this.addOns.controls['appointeename'].patchValue('');
            // this.addOns.controls['appointeerelation'].patchValue('');
            if (this.vechicle.valid) {
                // if(this.vechicle.controls['vechicleidv'].value > 7000 || this.vechicle.controls['vechicleidv'].value=='' ) {
                stepper.next();
                this.topScroll();
                this.getCover();
                this.returntoinvoiceChangeAmount();
                this.zerodeptChangeAmount();
                this.emergencyassistanceChangeAmount();

                // }else{
                //     this.toastr.error('IDV Should Not Less Than 7000');
                // }
            } else {
                this.toastr.error('Please fill the Mandatory Fields');

            }
        }
        if (type == 'stepper3') {
            sessionStorage.stepper3Details = '';
            sessionStorage.stepper3Details = JSON.stringify(value);


            if (this.addOns.valid) {
                this.createproposal(stepper);
                this.topScroll();
            } else {
                this.toastr.error('Please fill the Mandatory Fields');

            }
        }
        // if (type == 'stepper4') {
        //     sessionStorage.stepper4Details = '';
        //     sessionStorage.stepper4Details = JSON.stringify(value);
        //
        //     // console.log(this.proposerFormData,'form');
        //     // console.log(this.proposerFormData.title,'titt');
        //     console.log('inn');
        //     if (this.BankDetails.valid) {
        //         this.createproposal(stepper);
        //         this.topScroll();
        //     }
        // }


    }

    ChangeGender() {
        if (this.proposer.controls['title'].value == 'Mr') {
            this.proposer.controls['gender'].patchValue('MALE');
        } else {
            this.proposer.controls['gender'].patchValue('FEMALE');
        }
    }

    sessionData() {
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
                uniqueid: this.getstepper1.uniqueid,
                Lgcode: this.getstepper1.Lgcode,

            });
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
                previousenddate: this.datepipe.transform(this.getstepper2.previousenddate, 'y-MM-dd'),
                previouspolicyno: this.getstepper2.previouspolicyno,
                vechicleidv: this.getstepper2.vechicleidv,
                Previouscompanyvalue: this.getstepper2.Previouscompanyvalue,
                financiercodevalue: this.getstepper2.financiercodevalue,
                previouspolicyclaim: this.getstepper2.previouspolicyclaim,

            });
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
                // OtherLoadDiscRate: this.getstepper3.OtherLoadDiscRate,
                pacovername: this.getstepper3.pacovername,
                pasuminsured: this.getstepper3.pasuminsured,
                pacover: this.getstepper3.pacover,
                totalElectricPremium: this.getstepper3.totalElectricPremium,
                totalElectricPremium1: this.getstepper3.totalElectricPremium1,
                totalNonElectricPremium: this.getstepper3.totalNonElectricPremium,
                totalNonElectricPremium1: this.getstepper3.totalNonElectricPremium1,
                totalPaidDriverPremium: this.getstepper3.totalPaidDriverPremium,
                totalAntitheftdiscPremium: this.getstepper3.totalAntitheftdiscPremium,
                totalHandicapDiscFlagPremium: this.getstepper3.totalHandicapDiscFlagPremium,
                totalbiofuelkitPremium: this.getstepper3.totalbiofuelkitPremium,
                totalbiofuelkitPremium1: this.getstepper3.totalbiofuelkitPremium1,
                totalZerodeptPremium: this.getstepper3.totalZerodeptPremium,
                totalLimitedtoOwnPremium: this.getstepper3.totalLimitedtoOwnPremium,
                totalLimitedtoOwnPremium1: this.getstepper3.totalLimitedtoOwnPremium1,
                // totalLoadDiscPremium: this.getstepper3.totalLoadDiscPremium,


            });
        }
        // if (sessionStorage.stepper4Details != '' && sessionStorage.stepper4Details != undefined) {
        //     this.getstepper4 = JSON.parse(sessionStorage.stepper4Details);
        //     this.BankDetails = this.fb.group({
        //         // Bankname: this.getstepper4.Bankname,
        //         // Branch: this.getstepper4.Branch,
        //         paymentmode: this.getstepper4.paymentmode,
        // Payertype: this.getstepper4.Payertype,
        // refrenceno: this.getstepper4.refrenceno,
        //         // Paymentdate: this.datepipe.transform(this.getstepper4.Paymentdate, 'y-MM-dd'),
        //         // Banknamevalue: this.getstepper4.Banknamevalue,
        //         // banknamelist: this.getstepper4.banknamelist,
        //     });
        // }
    }

    //proposal creation

    onsubmit(value1) {
        console.log(this.addOns.controls['NomineeName'].value, 'sdfsadf');
        if (this.addOns.controls['NomineeName'].value != '') {
            this.addOns.controls['NomineeAge'].setValidators([Validators.required]);
            this.addOns.controls['NomineeAge'].updateValueAndValidity();
            this.addOns.controls['nomineeRelation'].setValidators([Validators.required]);
            this.addOns.controls['nomineeRelation'].updateValueAndValidity();

        }
        else if (this.addOns.controls['NomineeName'].value == '') {
            this.addOns.controls['NomineeAge'].patchValue('');
            this.addOns.controls['NomineeAge'].setValidators(null);
            this.addOns.controls['NomineeAge'].updateValueAndValidity();
            this.addOns.controls['nomineeRelation'].patchValue('');
            this.addOns.controls['nomineeRelation'].setValidators(null);
            this.addOns.controls['nomineeRelation'].updateValueAndValidity();

        }
        if (this.addOns.controls['NomineeAge'].value < 18) {
            this.addOns.controls['appointeename'].setValidators([Validators.required]);
            this.addOns.controls['appointeename'].updateValueAndValidity();
            this.addOns.controls['appointeerelation'].setValidators([Validators.required]);
            this.addOns.controls['appointeerelation'].updateValueAndValidity();

        }
        if (this.addOns.controls['NomineeAge'].value > 18 || this.addOns.controls['NomineeAge'].value == '') {
            this.addOns.controls['appointeename'].patchValue('');
            this.addOns.controls['appointeename'].setValidators(null);
            this.addOns.controls['appointeename'].updateValueAndValidity();
            this.addOns.controls['appointeerelation'].patchValue('');
            this.addOns.controls['appointeerelation'].setValidators(null);
            this.addOns.controls['appointeerelation'].updateValueAndValidity();
        }
    }

    ONcheck(event) {
        if (event.checked == true) {
            this.addOns.controls['pacovername'].setValidators([Validators.required]);
            this.addOns.controls['pacovername'].updateValueAndValidity();
            this.addOns.controls['pasuminsured'].setValidators([Validators.required]);
            this.addOns.controls['pasuminsured'].updateValueAndValidity();

        } else if (event.checked == false) {
            this.addOns.controls['pacovername'].patchValue('');
            this.addOns.controls['pacovername'].setValidators(null);
            this.addOns.controls['pacovername'].updateValueAndValidity();
            this.addOns.controls['pasuminsured'].patchValue('');
            this.addOns.controls['pasuminsured'].setValidators(null);
            this.addOns.controls['pasuminsured'].updateValueAndValidity();

        }
    }

    bioFuelValidation(event) {
        if (this.addOns.controls['biofuel'].value != '') {
            this.addOns.controls['biofuelkit'].setValidators([Validators.required]);
        } else {
            this.addOns.controls['biofuelkit'].patchValue('');
            this.addOns.controls['biofuelkit'].setValidators(null);
        }
        this.addOns.controls['biofuelkit'].updateValueAndValidity();

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
    bifuelValue(){
        this.addOns.controls['totalbiofuelkitPremium'].patchValue(this.BiFuel_Kit_OD_Premium);
        this.addOns.controls['totalbiofuelkitPremium1'].patchValue(this.BiFuel_Kit_TP_Premium);
    }



    // if(this.nomineename !=''){
    //     console.log('qqqqq');
    // else if (this.nomineename == '') {
    //         this.addOns.controls['NomineeAge'].patchValue('');
    //
    // }

    changeValidation(event) {

        if (event.checked == true) {
            this.financeTypeTrue = true;
            this.financeTypeName = true;
            this.vechicle.controls['Agreement'].setValidators([Validators.required]);
            this.vechicle.controls['financiercode'].setValidators([Validators.required]);
            this.vechicle.controls['fibranchname'].setValidators([Validators.required]);
        } else if (event.checked != true) {
            this.financeTypeTrue = false;
            this.financeTypeName = false;
            this.vechicle.controls['Agreement'].patchValue('');
            this.vechicle.controls['financiercode'].patchValue('');
            this.vechicle.controls['fibranchname'].patchValue('');
            this.vechicle.controls['Agreement'].setValidators([]);
            this.vechicle.controls['financiercode'].setValidators([]);
            this.vechicle.controls['fibranchname'].setValidators([]);
        }

        this.vechicle.controls['Agreement'].updateValueAndValidity();
        this.vechicle.controls['financiercode'].updateValueAndValidity();
        this.vechicle.controls['fibranchname'].updateValueAndValidity();
    }


    //

    //dob

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
    //     console.log(event, 'event')
    //     console.log(type, 'type')
    //     if (event.value != null) {
    //         let selectedDate = '';
    //         this.proposerAge = '';
    //         let dob = '';
    //         if (typeof event.value._i == 'string') {
    //             const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    //             console.log(pattern, 'pattern')
    //             console.log(event.value._i, 'event.value._i')
    //             let selDate = event.value._i;
    //             let dateValue = this.datepipe.transform(selDate, 'y-MM-dd');
    //             if (pattern.test(dateValue) && dateValue.length == 10) {
    //                 if (type == 'proposor') {
    //                     this.personalDobError = '';
    //                 } else if (type == 'nominee') {
    //                     this.personalDobError = '';
    //                 }
    //                 // else if (type == 'bank'&& this.BankDetails.controls['Paymentdate'].value._i!=this.tod) {
    //                 //     this.personalDobError = 'Enter todays Date';
    //                 // } else if (type == 'bank'&& this.BankDetails.controls['Paymentdate'].value._i == this.tod) {
    //                 //     console.log('ii');
    //                 //     console.log('ppp');
    //                 //     this.personalDobError = '';
    //                 // }
    //                 else if (type == 'bank') {
    //                     this.personalDobError = '';
    //                 }
    //             } else {
    //                 if (type == 'proposor') {
    //                     this.personalDobError = 'Enter Valid Dob';
    //                 } else if (type == 'insurer') {
    //                     this.personalDobError = 'Enter Valid Dob';
    //                 } else if (type == 'bank') {
    //                     this.personalDobError = 'Enter Valid Date';
    //                 }
    //             }
    //             // selectedDate = event.value._i;
    //             let seltDate = event.value._i;
    //             selectedDate = this.datepipe.transform(seltDate, 'dd/MM/y');
    //             console.log(selectedDate, 'selectedDate')
    //             console.log(event.value, 'eventvalue in date')
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             console.log(dob, 'dobbbbbbbbinEventValue')
    //             if (selectedDate.length == 10 && type == 'proposor') {
    //                 // alert('inn')
    //                 this.proposerAge = this.ageCalculate(dob);
    //                 console.log(this.proposerAge, 'this.proposerAgethis.proposerAge')
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

    }

    getPostalCode(pin, type) {
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

    contains(v) {
        for (var i = 0; i < v.length; i++) {
            if (this[i] === v) return true;
        }
        return false;
    };


    proposerpincodeListFailure(error) {

    }

    electricChange(){
        if(this.addOns.controls.ElecticalAccessoryIDV.value){
            this.addOns.controls['totalElectricPremium'].setValidators([Validators.required]);
            this.addOns.controls['totalElectricPremium1'].setValidators([Validators.required]);
            this.getCover();

        } else {
            this.addOns.controls['totalElectricPremium'].patchValue('');
            this.addOns.controls['totalElectricPremium1'].patchValue('');
            this.addOns.controls['totalElectricPremium'].setValidators(null);
            this.addOns.controls['totalElectricPremium1'].setValidators(null);

        }
        this.addOns.controls['totalElectricPremium'].updateValueAndValidity();
        this.addOns.controls['totalElectricPremium1'].updateValueAndValidity();
    }

    electricalNonChange(){
        if(this.addOns.controls.NonElecticalAccessoryIDV.value){
            this.addOns.controls['totalNonElectricPremium'].setValidators([Validators.required]);
            this.addOns.controls['totalNonElectricPremium1'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalNonElectricPremium'].patchValue('');
            this.addOns.controls['totalNonElectricPremium1'].patchValue('');
            this.addOns.controls['totalNonElectricPremium'].setValidators(null);
            this.addOns.controls['totalNonElectricPremium1'].setValidators(null);

        }
        this.addOns.controls['totalNonElectricPremium'].updateValueAndValidity();
        this.addOns.controls['totalNonElectricPremium1'].updateValueAndValidity();
    }
    antitheftdiscChange(){
        if(this.antitheftdisc != 'false'){
            this.addOns.controls['totalAntitheftdiscPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalAntitheftdiscPremium'].patchValue('');
            this.addOns.controls['totalAntitheftdiscPremium'].setValidators(null);

        }
        this.addOns.controls['totalAntitheftdiscPremium'].updateValueAndValidity();
    }
    antitheftdiscAmount(){
        this.addOns.controls['totalAntitheftdiscPremium'].patchValue(this.AntiTheftDisc_Premium)
    }
    HandicapDiscFlagChange(){
        if(this.handicapdic != 'false'){
            this.addOns.controls['totalHandicapDiscFlagPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalHandicapDiscFlagPremium'].patchValue('');
            this.addOns.controls['totalHandicapDiscFlagPremium'].setValidators(null);

        }
        this.addOns.controls['totalHandicapDiscFlagPremium'].updateValueAndValidity();
    }
    HandicapDiscFlagAmount(){
        this.addOns.controls['totalHandicapDiscFlagPremium'].patchValue(this.HandicapDisc_Premium)
    }
    paidDriverChange(){
        if(this.addOns.controls.IsPaidDriver.value == true){
            this.addOns.controls['totalPaidDriverPremium'].setValidators([Validators.required]);
            // this.addOns.controls['totalPaidDriverPremium'].patchValue(this.PaidDriver_Premium);
            this.getCover();

        } else {
            this.addOns.controls['totalPaidDriverPremium'].patchValue('');
            this.addOns.controls['totalPaidDriverPremium'].setValidators(null);

        }
        this.addOns.controls['totalPaidDriverPremium'].updateValueAndValidity();
    }
    paidDriverAmount(){
        this.addOns.controls['totalPaidDriverPremium'].patchValue(this.PaidDriver_Premium)
    } returntoinvoiceChange(){
        if(this.addOns.controls.returntoinvoice.value == true){
            this.addOns.controls['returntoinvoicePremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['returntoinvoicePremium'].patchValue('');
            this.addOns.controls['returntoinvoicePremium'].setValidators(null);

        }
        this.addOns.controls['returntoinvoicePremium'].updateValueAndValidity();
    }
    returntoinvoiceChangeAmount(){
        this.addOns.controls['returntoinvoicePremium'].patchValue(this.returntoinvoice)
    }emergencyassistanceChange(){
        if(this.addOns.controls['emergencyassistance'].value == true){
            this.addOns.controls['emergencyassistancePremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['emergencyassistancePremium'].patchValue('');
            this.addOns.controls['emergencyassistancePremium'].setValidators(null);

        }
        this.addOns.controls['emergencyassistancePremium'].updateValueAndValidity();
    }
    emergencyassistanceChangeAmount(){
        this.addOns.controls['emergencyassistancePremium'].patchValue(this.emerengy_assitance)
    }
    zerodeptChange(){
        if(this.addOns.controls.zerodept.value == true){
            this.addOns.controls['totalZerodeptPremium'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalZerodeptPremium'].patchValue('');
            this.addOns.controls['totalZerodeptPremium'].setValidators(null);

        }
        this.addOns.controls['totalZerodeptPremium'].updateValueAndValidity();
    }
    zerodeptChangeAmount(){
        this.addOns.controls['totalZerodeptPremium'].patchValue(this.zero_depression)

    }
    limitedtoOwnChange(){
        if(this.addOns.controls.IsLimitedtoOwnPremises.value == true){
            this.addOns.controls['totalLimitedtoOwnPremium'].setValidators([Validators.required]);
            this.addOns.controls['totalLimitedtoOwnPremium1'].setValidators([Validators.required]);
            this.getCover();
        } else {
            this.addOns.controls['totalLimitedtoOwnPremium'].patchValue('');
            this.addOns.controls['totalLimitedtoOwnPremium1'].patchValue('');
            this.addOns.controls['totalLimitedtoOwnPremium'].setValidators(null);
            this.addOns.controls['totalLimitedtoOwnPremium1'].setValidators(null);

        }
        this.addOns.controls['totalLimitedtoOwnPremium'].updateValueAndValidity();
        this.addOns.controls['totalLimitedtoOwnPremium1'].updateValueAndValidity();
    }
    // loadDiscRateChange(){
    //     if(this.addOns.controls.OtherLoadDiscRate.value == true){
    //         this.addOns.controls['totalLoadDiscPremium'].patchValue(0);
    //         this.addOns.controls['totalLoadDiscPremium'].setValidators([Validators.required]);
    //
    //     } else {
    //         this.addOns.controls['totalLoadDiscPremium'].patchValue('');
    //         this.addOns.controls['totalLoadDiscPremium'].setValidators(null);
    //
    //     }
    //     this.addOns.controls['totalLoadDiscPremium'].updateValueAndValidity();
    // }


    getCover() {
        let stringToSplit;
        stringToSplit = this.vehicledata.vehicle_no.toUpperCase();
        var pos = stringToSplit.search('-');
        if (pos == -1) {
            let x = stringToSplit.slice(0, 2);
            let y = stringToSplit.slice(2, 4);
            let oo = stringToSplit.slice(5, 6);
            let w = '';
            let z = stringToSplit.slice(4, 6);

            w = stringToSplit.slice(6);
            let regno = x.concat('-', y, '-', z, '-', w);
            this.vehicleRegNo=regno;
            }
        console.log(this.RegDateage);
        console.log(this.tod);
        console.log(this.companyList[this.vechicle.controls['Previouscompany'].value]);
        console.log(this.vehicleRegNo,'vehicleRegNo...')
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'enquiry_id': this.bikeEnquiryId,
            'created_by': '',
            'policy_type': this.premiumType == 'ThridParty_premium' ? 'ThridParty_Premium' : 'Comprehensive_Premium',
            'proposal_id': sessionStorage.hdfcBikeproposalID == '' || sessionStorage.hdfcBikeproposalID == undefined ? '' : sessionStorage.hdfcBikeproposalID,
            'motorproposalObj': {
                'Customer_Details': {
                    'Customer_FirstName': this.proposer.controls['firstName'].value,
                    'Customer_MiddleName': this.proposer.controls['middleName'].value,
                    'Customer_LastName': this.proposer.controls['lastName'].value,
                    'Customer_DateofBirth': this.datepipe.transform(this.proposer.controls['dob'].value, 'dd/MM/y'),
                    'Customer_Email': this.proposer.controls['email'].value,
                    'Customer_Mobile': this.proposer.controls['mobile'].value,
                    'Customer_Telephone': this.proposer.controls['alternateContact'].value,
                    'Customer_PanNo': this.proposer.controls['personalPan'].value,
                    'Customer_Salutation': this.proposer.controls['title'].value,
                    'Customer_Gender': this.proposer.controls['gender'].value,
                    'Customer_Perm_Address1': this.proposer.controls['address'].value,
                    'Customer_Perm_Address2': this.proposer.controls['address2'].value,
                    'Customer_Perm_Apartment': this.proposer.controls['address3'].value,
                    'Customer_Perm_Street': this.proposer.controls['landmarkpermanent'].value,
                    'Customer_Perm_CityDistrictCode': '',
                    'Customer_Perm_CityDistrict': this.proposer.controls['districtpermanent'].value,
                    'Customer_Perm_StateCode': '',
                    'Customer_Perm_State': this.proposer.controls['statepermanent'].value,
                    'Customer_Perm_PinCode': this.proposer.controls['pincode'].value,
                    'Customer_Perm_PinCodeLocality': this.proposer.controls['citypermanent'].value,
                    'Customer_Mailing_Address1': this.proposer.controls['address4'].value,
                    'Customer_Mailing_Address2': this.proposer.controls['address5'].value,
                    'Customer_Mailing_Apartment': this.proposer.controls['address6'].value,
                    'Customer_Mailing_Street': this.proposer.controls['landmarkcom'].value,
                    'Customer_Mailing_CityDistrictCode': '',
                    'Customer_Mailing_CityDistrict': this.proposer.controls['districtcom'].value,
                    'Customer_Mailing_StateCode': '',
                    'Customer_Mailing_State': this.proposer.controls['statecom'].value,
                    'Customer_Mailing_PinCode': this.proposer.controls['pincode1'].value,
                    'Customer_Mailing_PinCodeLocality': this.proposer.controls['citycom'].value,
                    'Customer_GSTIN_Number': this.proposer.controls['gstNumber'].value,
                    'Customer_GSTIN_State': ''
                },
                'Policy_Details': {
                    'PolicyStartDate': this.tommarrow,
                    'PreviousPolicyEndDate': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['previousenddate'].value, 'dd/MM/y') : '',
                    'ProposalDate': this.tod,

                    "AgreementType": this.vechicle.controls['Agreement'].value,
                    "FinancierCode": this.vechicle.controls['financiercode'].value,
                    "BranchName": this.vechicle.controls['fibranchname'].value,
                    'PreviousPolicy_CorporateCustomerId_Mandatary': this.regvalue != 'New Vehicle' ? this.vechicle.controls['Previouscompany'].value : '',
                    'PreviousPolicy_NCBPercentage': this.regvalue != 'New Vehicle' ? this.vechicle.controls['ncb'].value : '',
                    'PreviousPolicy_PolicyEndDate': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['previousenddate'].value, 'dd/MM/y') : '',
                    'PreviousPolicy_PolicyNo': this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyno'].value : '',
                    'PreviousPolicy_PolicyClaim': this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyclaim'].value : '',
                    'BusinessType_Mandatary': this.RegDateage,
                    'DateofDeliveryOrRegistration': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['Vehicleregdate'].value, 'dd/MM/y') : this.tod,
                    'YearOfManufacture': this.vechicle.controls['manufactureyear'].value,
                    'Registration_No': this.regvalue != 'New Vehicle' ? this.vehicleRegNo : '',
                    'EngineNumber': this.vechicle.controls['engine'].value,
                    'ChassisNumber': this.vechicle.controls['chassis'].value,
                    'Vehicle_IDV': this.vehicleidv.Idv,
                },
                'Req_TW': {




                    // 'ExtensionCountryCode': '',
                    // 'POLICY_TENURE': this.addOns.controls['policytenture'].value,
                    // 'ExtensionCountryName': this.addOns.controls['extentioncountryvalue'].value,
                    // 'Effectivedrivinglicense': this.addOns.controls['drivinglicence'].value,
                    'Paiddriver': this.addOns.controls['IsPaidDriver'].value == true ? '1' : '0',
                    // 'BiFuelType': this.addOns.controls['biofuel'].value,
                    // 'BiFuel_Kit_Value': this.addOns.controls['biofuelkit'].value,
                    'Paiddriver_Si': '',
                    'Owner_Driver_Nominee_Name': this.addOns.controls['NomineeName'].value,
                    'Owner_Driver_Nominee_Age': this.addOns.controls['NomineeAge'].value,
                    'Owner_Driver_Nominee_Relationship': this.addOns.controls['nomineeRelation'].value,
                    'Owner_Driver_Appointee_Name': this.addOns.controls['appointeename'].value,
                    'Owner_Driver_Appointee_Relationship': this.addOns.controls['appointeerelation'].value,
                    'IsZeroDept_Cover': this.addOns.controls['zerodept'].value == true ? '1' : '0',
                    "IsRTI_Cover":this.addOns.controls['returntoinvoice'].value == true ? '1' : '0',

                    "IsEA_Cover":this.addOns.controls['emergencyassistance'].value == true ? '1' : '0',
                    // 'ElecticalAccessoryIDV': this.addOns.controls['ElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['ElecticalAccessoryIDV'].value,
                    // 'NonElecticalAccessoryIDV': this.addOns.controls['NonElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['NonElecticalAccessoryIDV'].value,
                    // 'IsLimitedtoOwnPremises': this.addOns.controls['IsLimitedtoOwnPremises'].value == true ? '1' : '0',
                    // // 'OtherLoadDiscRate': this.addOns.controls['OtherLoadDiscRate'].value == true ? '1' : '0',
                    // 'AntiTheftDiscFlag': this.addOns.controls['Antitheftdiscflag'].value,
                    // 'HandicapDiscFlag': this.addOns.controls['HandicapDiscFlag'].value,
                    // 'UnnamedPersonSI': this.addOns.controls['pasuminsured'].value,
                    // 'NoofUnnamedPerson': this.addOns.controls['pacovername'].value
                },
            }
        };
        // this.Setting.loadingSpinner = true;
        this.bikeInsurance.hdfcCoverPremium(data).subscribe(
            (successData) => {
                this.coverPremiumsuccess(successData);
            },
            (error) => {
                this.coverPremiumFailure(error);
            }
        );
    }
    public coverPremiumsuccess(successData) {
        // this.Setting.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            this.coverPremium = successData.ResponseObject;
            console.log(this.coverPremium,'coverPremium');
            this.Electical_Acc_Premium=this.coverPremium.Electical_Acc_Premium;
            this.Elec_ZD_Premium=this.coverPremium.Elec_ZD_Premium;
            this.NonElectical_Acc_Premium=this.coverPremium.NonElectical_Acc_Premium;
            this.NonElec_ZD_Premium=this.coverPremium.NonElec_ZD_Premium;
            this.LimitedtoOwnPremises_OD_Premium=this.coverPremium.LimitedtoOwnPremises_OD_Premium;
            this.LimitedtoOwnPremises_TP_Premium=this.coverPremium.LimitedtoOwnPremises_TP_Premium;
            this.Basic_OD_Premium=this.coverPremium.Basic_OD_Premium;
            this.Basic_TP_Premium=this.coverPremium.Basic_TP_Premium;
            this.PAOwnerDriver_Premium=this.coverPremium.PAOwnerDriver_Premium;
            this.PaidDriver_Premium=this.coverPremium.PaidDriver_Premium;
            this.AntiTheftDisc_Premium=this.coverPremium.AntiTheftDisc_Premium;
            this.HandicapDisc_Premium=this.coverPremium.HandicapDisc_Premium;
            this.BiFuel_Kit_OD_Premium=this.coverPremium.BiFuel_Kit_OD_Premium;
            this.BiFuel_Kit_TP_Premium=this.coverPremium.BiFuel_Kit_TP_Premium;
            this.returntoinvoice=this.coverPremium.returntoinvoice;
            this.emerengy_assitance=this.coverPremium.emerengy_assitance;
            this.zero_depression=this.coverPremium.zero_depression;
            this.compulsory_ownerdriver=this.coverPremium.compulsory_ownerdriver;
            // sessionStorage.compulsory_ownerdriver =
            // console.log(compulsory_ownerdriver,'compulsory_ownerdriver')
            this.compulsory();

            this.electrical();
            this.electricalzd();
            this.nonelectrical();
            this.nonelectricalZD();
            this.paidDriverAmount();
            this.HandicapDiscFlagAmount();
            this.limitedOD();
            this.limitedTP();
            this.antitheftdiscAmount();
            this.bifuelValue();
            this.returntoinvoiceChangeAmount();
            this.zerodeptChangeAmount();
            this.emergencyassistanceChangeAmount();
            this.isTotalPaidDriver();

        }
        else{
            this.toastr.error(successData.ErrorObject);
        }
    }

    public coverPremiumFailure(error) {
    }
    electrical(){
        this.addOns.controls['totalElectricPremium1'].patchValue(this.Electical_Acc_Premium);

    }
    electricalzd(){
        this.addOns.controls['totalElectricPremium'].patchValue(this.Elec_ZD_Premium );

    }
    nonelectrical(){
        this.addOns.controls['totalNonElectricPremium'].patchValue(this.NonElectical_Acc_Premium );

    }
    nonelectricalZD(){
    this.addOns.controls['totalNonElectricPremium1'].patchValue(this.NonElec_ZD_Premium );

}
limitedOD(){
    this.addOns.controls['totalLimitedtoOwnPremium'].patchValue(this.LimitedtoOwnPremises_OD_Premium );

}
limitedTP(){
    this.addOns.controls['totalLimitedtoOwnPremium1'].patchValue(this.LimitedtoOwnPremises_TP_Premium );

}
    isTotalPaidDriver() {
        this.addOns.controls['totalPaidDriverPremium'].patchValue(this.PaidDriver_Premium);
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

    Regdate($event) {
        if ($event.value != '') {
            let regno = '';
            regno = this.datepipe.transform($event.value, 'y-MM-dd');
            console.log(regno, 'reg date');
        }
    }

    //create proposal
    createproposal(stepper: MatStepper) {
        let stringToSplit;
        stringToSplit = this.vehicledata.vehicle_no.toUpperCase();
        var pos = stringToSplit.search('-');
        if (pos == -1) {
            let x = stringToSplit.slice(0, 2);
            let y = stringToSplit.slice(2, 4);
            let oo = stringToSplit.slice(5, 6);
            let w = '';
            let z = stringToSplit.slice(4, 6);
            // if (!isNaN(oo)) {
            //     let j = stringToSplit.slice(4, 5);
            //     w = stringToSplit.slice(5);
            //     let regno = x.concat('-', y, '-', j, '-', w);
            //     this.vechicle.controls['regno'].patchValue(regno);
            //
            //
            // } else
            //     {
            w = stringToSplit.slice(6);
            let regno = x.concat('-', y, '-', z, '-', w);
           this.vehicleRegNo=regno;
           // }

            // let x = stringToSplit.slice(0, 2);
            // let y = stringToSplit.slice(2, 4);
            // let o=stringToSplit.slice(4,5);
            // if(isNaN(o)){
            // }
            // let z = stringToSplit.slice(4, 6);
            // let w = stringToSplit.slice(6);
            // let regno = x.concat('-', y, '-', z, '-', w);

        }
        console.log(this.RegDateage);
        console.log(this.tod);
        console.log(this.companyList[this.vechicle.controls['Previouscompany'].value]);

        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosUserId() : '4',
            'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            'enquiry_id': this.bikeEnquiryId,
            'created_by': '',
            'policy_type': this.premiumType == 'ThridParty_premium' ? 'ThridParty_Premium' : 'Comprehensive_Premium',
            'proposal_id': sessionStorage.hdfcBikeproposalID == '' || sessionStorage.hdfcBikeproposalID == undefined ? '' : sessionStorage.hdfcBikeproposalID,
            'motorproposalObj': {
                // 'TransactionID':this.buyProductDetails.TransactionID,
                'Customer_Details': {
                    'Customer_FirstName': this.proposer.controls['firstName'].value,
                    'Customer_MiddleName': this.proposer.controls['middleName'].value,
                    'Customer_LastName': this.proposer.controls['lastName'].value,
                    'Customer_DateofBirth': this.datepipe.transform(this.proposer.controls['dob'].value, 'dd/MM/y'),
                    'Customer_Email': this.proposer.controls['email'].value,
                    'Customer_Mobile': this.proposer.controls['mobile'].value,
                    'Customer_Telephone': this.proposer.controls['alternateContact'].value,
                    'Customer_PanNo': this.proposer.controls['personalPan'].value,
                    'Customer_Salutation': this.proposer.controls['title'].value,
                    'Customer_Gender': this.proposer.controls['gender'].value,
                    'Customer_Perm_Address1': this.proposer.controls['address'].value,
                    'Customer_Perm_Address2': this.proposer.controls['address2'].value,
                    'Customer_Perm_Apartment': this.proposer.controls['address3'].value,
                    'Customer_Perm_Street': this.proposer.controls['landmarkpermanent'].value,
                    'Customer_Perm_CityDistrictCode': '',
                    'Customer_Perm_CityDistrict': this.proposer.controls['districtpermanent'].value,
                    'Customer_Perm_StateCode': '',
                    'Customer_Perm_State': this.proposer.controls['statepermanent'].value,
                    'Customer_Perm_PinCode': this.proposer.controls['pincode'].value,
                    'Customer_Perm_PinCodeLocality': this.proposer.controls['citypermanent'].value,
                    'Customer_Mailing_Address1': this.proposer.controls['address4'].value,
                    'Customer_Mailing_Address2': this.proposer.controls['address5'].value,
                    'Customer_Mailing_Apartment': this.proposer.controls['address6'].value,
                    'Customer_Mailing_Street': this.proposer.controls['landmarkcom'].value,
                    'Customer_Mailing_CityDistrictCode': '',
                    'Customer_Mailing_CityDistrict': this.proposer.controls['districtcom'].value,
                    'Customer_Mailing_StateCode': '',
                    'Customer_Mailing_State': this.proposer.controls['statecom'].value,
                    'Customer_Mailing_PinCode': this.proposer.controls['pincode1'].value,
                    'Customer_Mailing_PinCodeLocality': this.proposer.controls['citycom'].value,
                    'Customer_GSTIN_Number': this.proposer.controls['gstNumber'].value,
                    'Customer_GSTIN_State': ''
                },
                'Policy_Details': {
                    'PolicyStartDate': this.tommarrow,
                    'PreviousPolicyEndDate': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['previousenddate'].value, 'dd/MM/y') : '',
                    'ProposalDate': this.tod,

                    "AgreementType": this.vechicle.controls['Agreement'].value,
                    "FinancierCode": this.vechicle.controls['financiercode'].value,
                    // "FinancierCode": '',
                    "BranchName": this.vechicle.controls['fibranchname'].value,
                    'PreviousPolicy_CorporateCustomerId_Mandatary': this.regvalue != 'New Vehicle' ? this.vechicle.controls['Previouscompany'].value : '',
                    'PreviousPolicy_NCBPercentage': this.regvalue != 'New Vehicle' ? this.vechicle.controls['ncb'].value : '',
                    'PreviousPolicy_PolicyEndDate': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['previousenddate'].value, 'dd/MM/y') : '',
                    'PreviousPolicy_PolicyNo': this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyno'].value : '',
                    'PreviousPolicy_PolicyClaim': this.regvalue != 'New Vehicle' ? this.vechicle.controls['previouspolicyclaim'].value : '',
                    'BusinessType_Mandatary': this.RegDateage,
                    // "VehicleModelCode": "17586",
                    'DateofDeliveryOrRegistration': this.regvalue != 'New Vehicle' ? this.datepipe.transform(this.vechicle.controls['Vehicleregdate'].value, 'dd/MM/y') : this.tod,
                    'YearOfManufacture': this.vechicle.controls['manufactureyear'].value,
                    'Registration_No': this.regvalue != 'New Vehicle' ? this.vehicleRegNo : '',
                    'EngineNumber': this.vechicle.controls['engine'].value,
                    'ChassisNumber': this.vechicle.controls['chassis'].value,
                    // "RTOLocationCode": "22189",
                    'Vehicle_IDV': this.vehicleidv.Idv,
                },
                'Req_TW': {
                    // 'ExtensionCountryCode': '',
                    // 'POLICY_TENURE': this.addOns.controls['policytenture'].value,
                    // 'ExtensionCountryName': this.addOns.controls['extentioncountryvalue'].value,
                    // 'Effectivedrivinglicense': this.addOns.controls['drivinglicence'].value,
                    'Paiddriver': this.addOns.controls['IsPaidDriver'].value == true ? '1' : '0',
                    // 'BiFuelType': this.addOns.controls['biofuel'].value,
                    // 'BiFuel_Kit_Value': this.addOns.controls['biofuelkit'].value,
                    'Paiddriver_Si': '',
                    'Owner_Driver_Nominee_Name': this.addOns.controls['NomineeName'].value,
                    'Owner_Driver_Nominee_Age': this.addOns.controls['NomineeAge'].value,
                    'Owner_Driver_Nominee_Relationship': this.addOns.controls['nomineeRelation'].value,
                    'Owner_Driver_Appointee_Name': this.addOns.controls['appointeename'].value,
                    'Owner_Driver_Appointee_Relationship': this.addOns.controls['appointeerelation'].value,
                    'IsZeroDept_Cover': this.addOns.controls['zerodept'].value == true ? '1' : '0',
                    "IsRTI_Cover":this.addOns.controls['returntoinvoice'].value == true ? '1' : '0',

                    "IsEA_Cover":this.addOns.controls['emergencyassistance'].value == true ? '1' : '0',
                    // 'ElecticalAccessoryIDV': this.addOns.controls['ElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['ElecticalAccessoryIDV'].value,
                    // 'NonElecticalAccessoryIDV': this.addOns.controls['NonElecticalAccessoryIDV'].value == '' ? '0' : this.addOns.controls['NonElecticalAccessoryIDV'].value,
                    // 'IsLimitedtoOwnPremises': this.addOns.controls['IsLimitedtoOwnPremises'].value == true ? '1' : '0',
                    // // 'OtherLoadDiscRate': this.addOns.controls['OtherLoadDiscRate'].value == true ? '1' : '0',
                    // 'AntiTheftDiscFlag': this.addOns.controls['Antitheftdiscflag'].value,
                    // 'HandicapDiscFlag': this.addOns.controls['HandicapDiscFlag'].value,
                    // 'UnnamedPersonSI': this.addOns.controls['pasuminsured'].value,
                    // 'NoofUnnamedPerson': this.addOns.controls['pacovername'].value
                },


                // 'Payment_Details': {
                //      "GC_PaymentID": "",
                //     "BANK_NAME":  this.BankDetails.controls['Bankname'].value,
                //      "BANK_BRANCH_NAME": this.BankDetails.controls['Branch'].value,
                //     "PAYMENT_MODE_CD": this.BankDetails.controls['paymentmode'].value,
                //     "PAYER_TYPE": this.BankDetails.controls['Payertype'].value,
                //     'PAYMENT_AMOUNT': this.vehicleidv.Comprehensive_premium,
                //     this.vehicleidv.Comprehensive_premium,
                //      this.vehicleidv.Comprehensive_premium,
                //     'INSTRUMENT_NUMBER': this.BankDetails.controls['refrenceno'].value,
                //     'PAYMENT_DATE': this.datepipe.transform(this.BankDetails.controls['Paymentdate'].value, 'dd/MM/y'),
                //
                // }
            }

        };
        this.Setting.loadingSpinner = true;
        this.bikeInsurance.proposalHdfc(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                console.log(error);

            }
        );

    }

    proposalSuccess(successData, stepper) {
        this.Setting.loadingSpinner = false;
        this.proposerFormData = this.proposer.value;
        console.log(this.proposerFormData);
        if (successData.IsSuccess) {
            stepper.next();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryDatabikeHdfc = JSON.stringify(this.summaryData);
            console.log(this.summaryData, 'summary');
            this.Proposalnumber = this.summaryData.Proposal_Number;
            this.PaymentRedirect = this.summaryData.PaymentRedirect;
            this.PaymentReturn = this.summaryData.PaymentReturn;
            sessionStorage.hdfcBikeproposalID = this.summaryData.ProposalId;
            this.proposerFormData = this.proposer.value;
            sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
            console.log(this.proposerFormData.title, 'tile');
            this.vehicalFormData = this.vechicle.value;
            console.log(this.vehicalFormData, 'vec');
            this.previousFormData = this.addOns.value;
            console.log(this.previousFormData, 'pre');
            // this.bankFormData = this.BankDetails.value;
            // console.log(this.bankFormData, 'bank');
            console.log(stepper, '111');

        } else {
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


    proposalFailure(error) {
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

    //
    ageCalculate(dob) {
        let today = new Date();
        console.log(today, 'todaytoday')
        let birthDate = new Date(dob);
        console.log(birthDate, 'birthDatebirthDate')
        let age = today.getFullYear() - birthDate.getFullYear();
        console.log(age, 'ageage')
        let m = today.getMonth() - birthDate.getMonth();
        console.log(m, 'mmm')
        let dd = today.getDate() - birthDate.getDate();
        console.log()
        if (m < 0 || m == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1;
            console.log(age, 'age')
        }
        console.log(age, 'ageageage')
        return age;
    }

    // idvinput(idv) {
    //     if (idv < 7000) {
    //         this.toastr.error('IDV Should Not Less Than 7000');
    //     }
    // }

    alternatecontact(value, event) {
        console.log(event);
        if (this.proposer.controls['mobile'].value == value) {
            this.altererror = 'Enter Alternate Contact';
        } else if (this.proposer.controls['mobile'].value != value) {
            this.altererror = '';
        }
        if (value.search('-') == -1 && value != '') {
            this.altererror = 'Enter Valued Format Of Telephone Number';

        } else if (value.search('-') != -1) {
            this.altererror = '';
            console.log(value);
            if (value.length < 8) {
                this.altererror = 'Enter Valued Format Of Telephone Number';

            } else {
                this.altererror = '';
            }
        }
        if (value.search('-') > 8 && value != '') {
            this.altererror = ' Enter Valid Area Code ';
        } else if (value.search('-')! > 8) {
            this.altererror = '';
        }
    }

    //

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

