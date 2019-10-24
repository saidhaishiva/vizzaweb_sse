import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { ValidationService } from '../../shared/services/validation.service';
import { BikeInsuranceService } from '../../shared/services/bike-insurance.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { ToastrService} from 'ngx-toastr';
import { AuthService} from '../../shared/services/auth.service';
import { DatePipe} from '@angular/common';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { ActivatedRoute } from '@angular/router';

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
    selector: 'app-bike-tataaig-proposal',
    templateUrl: './bike-tataaig-proposal.component.html',
    styleUrls: ['./bike-tataaig-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class BikeTataaigProposalComponent implements OnInit {

    public proposer: FormGroup;
    public vehicle: FormGroup;
    public previouspolicy: FormGroup;
    public nominee: FormGroup;
    public settings: Settings;
    public currentStep: any;
    public minDate: any;
    public proposerdateError: any;
    // public preNamelist: any;
    public proposerGenderlist: any;
    public relationlist: any;
    public getstepper1: any;
    public getstepper2: any;
    public getstepper3: any;
    public getstepper4: any;
    public proposerPinList: any;
    public prepolicyPinList: any;
    public summaryData: any;
    public proposerFormData: any;
    public vehicalFormData: any;
    public previousFormData: any;
    public nomineeFormData: any;
    public ProposalId: any;
    public webhost: any;
    public buyBikeDetails: any;
    public enquiryFormData: any;
    public bikeEnquiryId: any;
    public banklist: any;
    public Quotelist: any;
    public quotationNo: any;
    public QuoteAss: any;
    public QuoteAntitheft: any;
    public QuoteThirdPartres:any;
    public Quotedepreciation:any;
    public QuoteConsumableexpense:any;
    public QuoteReturninvoice:any;
    public QuoteRoadsideassistance:any;
    public electriaccSuminsured:any;
    public nonElectriaccSuminsured:any;
    public declaration: any;
    public PaymentRedirect: any;
    public PaymentReturn: any;
    public vehicledata: any;
    public poldate: any;
    public Proposalnumber: any;
    public bikeProposerAge: any;
    public coverlist: any;
    public agecount: any;
    public premium: any;
    public config: any;
    public productlist: any;
    public errortoaster: boolean;
    public bankValid: boolean;
    public finlist: any;
    public finArray: any;
    public errorMsg: any;
    public errorNonMsg: any;
    photos = [];
    photosBuffer = [];
    bufferSize = 50;
    numberOfItemsFromEndBeforeFetchingMore = 10;
    loading = false;


    constructor(public fb: FormBuilder, public validation: ValidationService, public bikeinsurance: BikeInsuranceService, public appSettings: AppSettings, public toastr: ToastrService, public authservice: AuthService, public datepipe: DatePipe, public configr: ConfigurationService, public route: ActivatedRoute) {
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if (params.stepper == true || params.stepper == 'true') {
                stepperindex = 4;
                if (sessionStorage.summaryDatabiketata != '' && sessionStorage.summaryDatabiketata != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryDatabiketata);
                    this.PaymentRedirect = this.summaryData.PaymentRedirect;
                    this.PaymentReturn = this.summaryData.PaymentReturn;
                    this.proposerFormData = JSON.parse(sessionStorage.tatabikeproposer);
                    this.vehicalFormData = JSON.parse(sessionStorage.tatabikevehicle);
                    this.previousFormData = JSON.parse(sessionStorage.tatabikeprepolicy);
                    this.nomineeFormData = JSON.parse(sessionStorage.tatabikenominee);
                    this.Proposalnumber = sessionStorage.tataBikeproposalnumber;
                }
            }
        });
        this.currentStep = stepperindex;
        this.settings = this.appSettings.settings;
        this.webhost = this.configr.getimgUrl();
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        const miniDate = new Date();
        this.minDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
        console.log(this.minDate, 'tdy');
        // this.config = {
        //     displayKey: "bankName",
        //     search: true,
        //     limitTo: 10,
        //     // searchOnKey: 'city'
        // };
        this.bankValid = false;
        this.errorMsg = false;
        this.errorNonMsg = false;
        this.finArray=[];

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
            Addressfour: '',
            proposerPincode: ['', Validators.required],
            proposerState: ['', Validators.required],
            proposerDistrict: ['', Validators.required],
            proposerCity: ['', Validators.required],
            driveflag: ['', Validators.required],
            driveFirstname: '',
            driveLastname: '',
            driveGender: '',
            driveAge: '',
            drivingexp: '',
            drivemaritalStatus: '',
        });
        this.previouspolicy = this.fb.group({
            // preflag: ['', Validators.required],
            // preName: '',
            // preNamevalue: '',
            prepolno: '',
            preAddressone: ['', Validators.required],
            preAddresstwo: '',
            preAddressthree: '',
            prepincode: '',
            preState: '',
            preDistrict: '',
            preCity: '',
            ispreviousPolicy:'',
        });

        this.vehicle = this.fb.group({
            engine: ['', Validators.required],
            chassis: ['', Validators.required],
            Financetype: false,
            banktype: '',
            bankName: '',
            bankNamevalue: '',
            Address: '',
            coverdrive: ['', Validators.required],
            coverdrivevalue: '',
            Associationmember: false,
            Associationamount:'',
            // Voluntary: '',
            Antitheft: false,
            Antitheftamount:'',
            Tppdrestrict: false,
            Tppdrestrictamount:'',
            depreciation: false,
            depreciationamount:'',
            Consumableexpense: false,
            Consumableexpenseamount:'',
            Returninvoice: false,
            Returninvoiceamount:'',
            Roadsideassistance: false,
            Roadsideassistanceamount:'',
            elecAccessories: false,
            elecAccessoriesSI:'',
            elecAccessoriesAmount:'',
            nonElectricAcess: false,
            nonElectricAcessSI:'',
            nonElectricAcessSIAmount:'',
        });



        this.nominee = this.fb.group({
            nomineeName: ['', Validators.required],
            nomineeAge: ['', Validators.required],
            nomineerelation: ['', Validators.required],
        })

    }

    ngOnInit() {
        this.vehicle.controls['Associationmember'].value == false;
        this.getGenderlist();
        // this.chaneauto();
        // this.chaneanti();
        // this.chanetpp();
        // this.chanedepre();
        // this.chanecon();
        // this.chaneret();
        // this.chaneroad();
        // this.getNamelist();
        this.financiertype();
        this.coverdriveList();
        this.sessionData();
        this.vehicledata = JSON.parse(sessionStorage.vehicledetails);
        console.log(this.vehicledata);
        this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
        this.enquiryFormData = JSON.parse(sessionStorage.bikeListDetails);
        console.log(this.enquiryFormData, 'enquiry data');
        this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        let engineno = this.vehicledata.engine_no.toUpperCase();
        let chassisno = this.vehicledata.chassis_no.toUpperCase();
        this.vehicle.controls['engine'].patchValue(engineno);
        this.vehicle.controls['chassis'].patchValue(chassisno);
        this.premium = sessionStorage.packae_list;
        if (this.premium != 'Comprehensive_premium') {
            this.vehicle.controls['coverdrive'].patchValue('ODD01');
        }
        const poldate = new Date(this.vehicledata.previous_policy_expiry_date);
        console.log(poldate, 'poldate');
        this.poldate = new Date(poldate.getFullYear(), poldate.getMonth(), poldate.getDate() + 1);
        console.log(this.poldate, 'policy date');
        // if (this.enquiryFormData.business_type != '1') {
        //     this.previouspolicy.controls['preflag'].patchValue('Y');
        // }

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

    // Number validation
    numValidate(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar) || event.target.value.length >= 2) {
                event.preventDefault();
            }
        }
    }

    idValidate(event: any) {
        this.validation.idValidate(event);
    }

    // space
    space(event: any) {
        this.validation.space(event);
    }

    onpaste(event: any) {
        this.validation.paste(event);
    }

    firstname(event) {
        this.proposer.controls['driveFirstname'].patchValue(event.target.value);
    }

    lastname(event) {
        this.proposer.controls['driveLastname'].patchValue(event.target.value);
    }

    maritial() {
        this.proposer.controls['drivemaritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value);
        const data = {
            'platform': 'web',
            'marital_status': this.proposer.controls['maritalStatus'].value == 'single' ? 'Y' : 'N',
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
        sessionStorage.relation = JSON.stringify(this.relationlist);
    }

    nomineeRelationFailure(error) {

    }


    addEvent(event: any) {
        if (event.value != null) {
            let selectedDate = '';
            this.bikeProposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.proposerdateError = '';
                } else {
                    this.proposerdateError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.bikeProposerAge = this.ageCalculate(dob);
                    console.log(this.bikeProposerAge, 'agein');
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.proposerdateError = '';
                    this.bikeProposerAge = this.ageCalculate(dob);
                }
            }
            sessionStorage.bikeproposerAge = this.bikeProposerAge;
            this.proposer.controls['driveAge'].patchValue(sessionStorage.bikeproposerAge);
        }
    }

    // AGE VALIDATION
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
    amount_automobile() {
        console.log(this.vehicle.controls['Associationmember'].value,'required Asso')
        if (this.vehicle.controls['Associationmember'].value == true) {
            this.vehicle.controls['Associationamount'].setValidators([Validators.required]);
            this.vehicle.controls['Associationamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Associationamount'].clearValidators();
            this.vehicle.controls['Associationamount'].updateValueAndValidity();
        }
    }
    chaneauto()
    {
        this.vehicle.controls['Associationamount'].patchValue(this.QuoteAss);
        // console.log(this.Quotelist.productlist.addons.Automobile_Association_Membership,'quoteValueeee')
        console.log(this.QuoteAss,'quoteValueesssss')
        // console.log( this.vehicle.controls['Associationamount'].value,'quoteListsss')

    }
    amount_Antitheft() {
        if (this.vehicle.controls['Antitheft'].value == true) {
            this.vehicle.controls['Antitheftamount'].setValidators([Validators.required]);
            this.vehicle.controls['Antitheftamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Antitheftamount'].clearValidators();
            this.vehicle.controls['Antitheftamount'].updateValueAndValidity();
        }
    }
    chaneanti()
    {
        this.vehicle.controls['Antitheftamount'].patchValue(this.QuoteAntitheft);
        console.log(this.vehicle.controls['Antitheftamount'].value,'Antitheftamount')

    }
    amount_Tppdrestrict() {
        if (this.vehicle.controls['Tppdrestrict'].value == true) {
            this.vehicle.controls['Tppdrestrictamount'].setValidators([Validators.required]);
            this.vehicle.controls['Tppdrestrictamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Tppdrestrictamount'].clearValidators();
            this.vehicle.controls['Tppdrestrictamount'].updateValueAndValidity();
        }
    }
    chanetpp()
    {
        this.vehicle.controls['Tppdrestrictamount'].patchValue(this.QuoteThirdPartres);
        console.log(this.vehicle.controls['Tppdrestrictamount'].value,'Tppdrestrictamount')

    }
    amount_depreciation() {
        if (this.vehicle.controls['depreciation'].value == true) {
            this.vehicle.controls['depreciationamount'].setValidators([Validators.required]);
            this.vehicle.controls['depreciationamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['depreciationamount'].clearValidators();
            this.vehicle.controls['depreciationamount'].updateValueAndValidity();
        }
    }
    chanedepre()
    {
        this.vehicle.controls['depreciationamount'].patchValue(this.Quotedepreciation);
        console.log( this.vehicle.controls['depreciationamount'].value,'depreciationamount')

    }
    amount_Consumableexpense() {
        if (this.vehicle.controls['Consumableexpense'].value == true) {
            this.vehicle.controls['Consumableexpenseamount'].setValidators([Validators.required]);
            this.vehicle.controls['Consumableexpenseamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Consumableexpenseamount'].clearValidators();
            this.vehicle.controls['Consumableexpenseamount'].updateValueAndValidity();
        }
    }
    chanecon()
    {
        this.vehicle.controls['Consumableexpenseamount'].patchValue(this.QuoteConsumableexpense);
        console.log(this.vehicle.controls['Consumableexpenseamount'].value,'Consumableexpenseamount')

    }
    amount_Returninvoice() {
        if (this.vehicle.controls['Returninvoice'].value == true) {
            this.vehicle.controls['Returninvoiceamount'].setValidators([Validators.required]);
            this.vehicle.controls['Returninvoiceamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Returninvoiceamount'].clearValidators();
            this.vehicle.controls['Returninvoiceamount'].updateValueAndValidity();
        }
    }
    chaneret()
    {
        this.vehicle.controls['Returninvoiceamount'].patchValue(this.QuoteReturninvoice);
        console.log(this.vehicle.controls['Returninvoiceamount'].value,'Returninvoiceamount')

    }
    amount_Roadsideassistance() {
        if (this.vehicle.controls['Roadsideassistance'].value == true) {
            this.vehicle.controls['Roadsideassistanceamount'].setValidators([Validators.required]);
            this.vehicle.controls['Roadsideassistanceamount'].updateValueAndValidity();
        } else {
            this.vehicle.controls['Roadsideassistanceamount'].clearValidators();
            this.vehicle.controls['Roadsideassistanceamount'].updateValueAndValidity();
        }
    }
    chaneroad()
    {
        this.vehicle.controls['Roadsideassistanceamount'].patchValue(this.QuoteRoadsideassistance);
        console.log(this.vehicle.controls['Roadsideassistanceamount'].value,'Roadsideassistanceamount')

    }
    electriAccess() {
        if (this.vehicle.controls['elecAccessories'].value == true) {
            this.vehicle.controls['elecAccessoriesSI'].patchValue(this.vehicle.controls['elecAccessoriesSI'].value),
            this.vehicle.controls['elecAccessoriesSI'].setValidators([Validators.required]);

        } else {
            this.vehicle.controls['elecAccessoriesSI'].patchValue(''),
            this.vehicle.controls['elecAccessoriesSI'].clearValidators();

        }
        this.vehicle.controls['elecAccessoriesSI'].updateValueAndValidity();
    }
    electricReq() {
        if (this.vehicle.controls['elecAccessoriesSI'].value ) {
            this.vehicle.controls['elecAccessoriesAmount'].patchValue(this.vehicle.controls['elecAccessoriesAmount'].value),
                this.vehicle.controls['elecAccessoriesAmount'].setValidators([Validators.required]);

        } else {
            this.vehicle.controls['elecAccessoriesAmount'].patchValue(''),
                this.vehicle.controls['elecAccessoriesAmount'].clearValidators();

        }
        this.vehicle.controls['elecAccessoriesAmount'].updateValueAndValidity();
    }
    eAcessSIChange()
    {
        this.vehicle.controls['elecAccessoriesAmount'].patchValue(this.electriaccSuminsured);
        console.log(this.QuoteRoadsideassistance,'quoteValueesssss')

    }
    nonelectricAccess() {
        if (this.vehicle.controls['nonElectricAcess'].value == true) {
            this.vehicle.controls['nonElectricAcessSI'].patchValue(this.vehicle.controls['nonElectricAcessSI'].value),
                this.vehicle.controls['nonElectricAcessSI'].setValidators([Validators.required]);

        } else {
            this.vehicle.controls['nonElectricAcessSI'].patchValue(''),
                this.vehicle.controls['nonElectricAcessSI'].clearValidators();

        }
        this.vehicle.controls['nonElectricAcessSI'].updateValueAndValidity();
    }
    electricNonReq() {
        if (this.vehicle.controls['nonElectricAcessSI'].value ) {
            this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(this.vehicle.controls['nonElectricAcessSIAmount'].value),
                this.vehicle.controls['nonElectricAcessSIAmount'].setValidators([Validators.required]);

        } else {
            this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(''),
                this.vehicle.controls['nonElectricAcessSIAmount'].clearValidators();

        }
        this.vehicle.controls['nonElectricAcessSIAmount'].updateValueAndValidity();
    }
    nEAcessChange()
    {
        this.vehicle.controls['nonElectricAcessSIAmount'].patchValue(this.nonElectriaccSuminsured);
        console.log(this.QuoteRoadsideassistance,'quoteValueesssss')

    }
    // previousChange() {
    //
    //     if (this.previouspolicy.controls['ispreviousPolicy'].value == 'Yes') {
    //         this.vehicle.controls['depreciation'].patchValue(this.vehicle.controls['depreciation'].value);
    //         this.vehicle.controls['Returninvoice'].patchValue(this.vehicle.controls['Returninvoice'].value);
    //
    //
    //         this.vehicle.controls['depreciation'].setValidators([Validators.required]);
    //         this.vehicle.controls['Returninvoice'].setValidators([Validators.required]);
    //     } else {
    //         // this.vehicle.controls['depreciation'].patchValue(false);
    //         // this.vehicle.controls['Returninvoice'].patchValue(false);
    //
    //         this.vehicle.controls['depreciation'].setValidators(null);
    //         this.vehicle.controls['Returninvoice'].setValidators(null);
    //
    //     }
    //     this.vehicle.controls['depreciation'].updateValueAndValidity();
    //     this.vehicle.controls['Returninvoice'].updateValueAndValidity();
    //     console.log(this.vehicle.controls['depreciation'].value,'depreciation......');
    //     console.log(this.vehicle.controls['Returninvoice'].value,'Returninvoice......');
    //
    // }

    // chanelectriAccess()
    // {
    //     this.vehicle.controls['elecAccessoriesAmount'].patchValue(this.electriaccSuminsured);
    //     console.log(this.vehicle.controls['elecAccessoriesAmount'].value,'elecAccessoriesAmount')
    //
    // }

    choosegen() {
        if(this.proposer.controls['proposerTitle'].value == 'Mr.') {
            this.proposer.controls['proposerGender'].patchValue('MALE');
            this.proposer.controls['driveGender'].patchValue('MALE')
        }
        else if(this.proposer.controls['proposerTitle'].value == 'Mrs.' || this.proposer.controls['proposerTitle'].value == 'Miss.' ) {
            this.proposer.controls['proposerGender'].patchValue('FEMALE');
            this.proposer.controls['driveGender'].patchValue('FEMALE')
        }
    }


    electriError(){
        if(this.vehicle.controls['elecAccessoriesSI'].value <= 15000 ){
            this.errorMsg=false;
            this.errorMsg='';
        }else{

            this.errorMsg=true;
            this.errorMsg = 'Sum Insured should be less then or equal to 15000';
        }
    }
    nonelectriError(){
        if( this.vehicle.controls['nonElectricAcessSI'].value <= 15000){
            this.errorNonMsg=false;
            this.errorNonMsg='';
        }else{

            this.errorNonMsg=true;
            this.errorNonMsg = 'Sum Insured should be less then or equal to 15000';
        }
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

    // //PreviousPolicy NameList
    // getNamelist() {
    //     const data = {
    //         'platform': 'web',
    //         'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    //         'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    //     };
    //     this.bikeinsurance.NameList(data).subscribe(
    //         (successData) => {
    //             this.prepolicyNameListSuccess(successData);
    //         },
    //         (error) => {
    //             this.prepolicyNameListFailure(error);
    //         }
    //     );
    // }
    //
    // prepolicyNameListSuccess(successData) {
    //     this.preNamelist = successData.ResponseObject;
    // }
    //
    // prepolicyNameListFailure(error) {
    //
    // }

    // selectopt() {
    //     this.previouspolicy.controls['preNamevalue'].patchValue(this.preNamelist[this.previouspolicy.controls['preName'].value]);
    //     console.log(this.previouspolicy.controls['preNamevalue'].value,'name');
    // }
    financiertype() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'

        }
        this.bikeinsurance.Finacetype(data).subscribe(
            (successData) => {
                this.financesuccess(successData);
            },
            (error) => {
                this.failureSuccess(error);
            }
        );
    }

    public financesuccess(successData) {
        // if (successData.IsSuccess == true) {
        //     this.errortoaster = true;
        //     this.finlist = successData.ResponseObject;
        //     this.photos = successData.ResponseObject.financerdetails;
        //     // console.log(this.finlist,'finlist');
        //     // for(let i=0;i < this.finlist.length;i++){
        //     // this.finArray.push(this.finlist[i])
        //     //     // this.photos=this.finArray[i].id;
        //     //     this.photos=this.finArray[i].name;
        //     // // console.log(this.photos,'55555555');
        //     // // console.log(this.finArray[i].id,'1111111111111');
        //     // // console.log(this.finArray[i].name,'2222222222222');
        //     //
        //     this.photosBuffer = this.photos.slice(0, this.bufferSize);
        //     console.log(this.photosBuffer,'photos');
        //     // }
        if (successData.IsSuccess == true) {
            this.finlist = successData.ResponseObject.financerdetails;
            // this.finlist = successData.ResponseObject;
            // this.photos = successData.ResponseObject.financerdetails;
            console.log(this.finlist,'finlist');
            // this.photosBuffer = this.photos.slice(0, this.bufferSize);
            // console.log(this.photosBuffer,'photos');
            this.financierListname();
        }
        else{
           this.errortoaster = false;
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
            'financial_code':this.vehicle.controls['bankName'].value
        }
        this.bikeinsurance.tataFinancierName(data).subscribe(
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
    // financiertype() {
    //     // console.log(event.length, 'length');
    //     // if (event.length >= 3) {
    //     //     if (this.vehicle.controls['banktype'].value == 'bank' || this.vehicle.controls['banktype'].value == 'nonbank financier') {
    //             const data = {
    //                 'platform': 'web',
    //                 'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
    //                 'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
    //                 // 'type': this.vehicle.controls['banktype'].value,
    //                 // 'name': event,
    //             };
    //             this.bikeinsurance.Finacetype(data).subscribe(
    //                 (successData) => {
    //                     this.FinanceSuccess(successData);
    //                 },
    //                 (error) => {
    //                     this.FinanceFailure(error);
    //                 }
    //             );
    //         // }
    //     // }
    // }
    //
    //
    // FinanceSuccess(successData) {
    //     if (successData.IsSuccess == true) {
    //        this.errortoaster = true;
    //     this.photos = successData.ResponseObject;
    //     console.log(this.photos, 'ddddddd');
    //         // this.photos = successData.ResponseObject.bankdetails;
    //         console.log(this.photos,'photos');
    //         this.photosBuffer = this.photos.slice(0, this.bufferSize);
    //         console.log(this.photosBuffer,'photos');
    //     } else {
    //         this.errortoaster = false;
    //         this.toastr.error(successData.ErrorObject);
    //     }
    //     console.log(this.errortoaster,'errortoaster');
    // }
    //
    // FinanceFailure(error) {
    //
    // }
    onScrollToEnd() {
        this.fetchMore();
    }

    onScroll({ end }) {
        if (this.loading || this.photos.length <= this.photosBuffer.length) {
            return;
        }

        if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
            this.fetchMore();
        }
    }

    private fetchMore() {
        const len = this.photosBuffer.length;
        const more = this.photos.slice(len, this.bufferSize + len);
        this.loading = true;
        // using timeout here to simulate backend API delay
        setTimeout(() => {
            this.loading = false;
            this.photosBuffer = this.photosBuffer.concat(more);
        }, 200)
    }

    // PACover_for_OwnerDriver for Addons
    coverdriveList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        };
        this.bikeinsurance.coverdrive(data).subscribe(
            (successData) => {
                this.coverdriveSuccess(successData);
            },
            (error) => {
                this.coverdriveFailure(error);
            }
        );
    }

    coverdriveSuccess(successData) {
        this.coverlist = successData.ResponseObject;
    }

    coverdriveFailure(error) {

    }

    covervalue() {

        this.vehicle.controls['coverdrivevalue'].patchValue(this.coverlist[this.vehicle.controls['coverdrive'].value]);

    }

    chooseflag(event: any) {
        if (this.proposer.controls['driveflag'].value == 'Y') {
            this.proposer.controls['driveFirstname'].patchValue(this.proposer.controls['proposerFirstname'].value);
            this.proposer.controls['driveLastname'].patchValue(this.proposer.controls['proposerLastname'].value);
            this.proposer.controls['driveGender'].patchValue(this.proposer.controls['proposerGender'].value);
            this.proposer.controls['drivemaritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value);
            // this.proposer.controls['driveFirstname'].setValidators([Validators.required]);
            // this.proposer.controls['driveLastname'].setValidators([Validators.required]);
            // this.proposer.controls['driveGender'].setValidators([Validators.required]);
            // this.proposer.controls['driveAge'].setValidators([Validators.required]);
            this.proposer.controls['drivingexp'].setValidators([Validators.required]);
            // this.proposer.controls['drivemaritalStatus'].setValidators([Validators.required]);
        } else if (this.proposer.controls['driveflag'].value == 'N') {
            // this.proposer.controls['driveFirstname'].patchValue('');
            // this.proposer.controls['driveLastname'].patchValue('');
            // this.proposer.controls['driveGender'].patchValue('');
            // this.proposer.controls['driveAge'].patchValue('');
            // this.proposer.controls['drivingexp'].patchValue('');
            // this.proposer.controls['drivemaritalStatus'].patchValue('');
            // this.proposer.controls['driveFirstname'].setValidators(null);
            // this.proposer.controls['driveLastname'].setValidators(null);
            // this.proposer.controls['driveGender'].setValidators(null);
            // this.proposer.controls['driveAge'].setValidators(null);
            this.proposer.controls['drivingexp'].setValidators(null);
            // this.proposer.controls['drivemaritalStatus'].setValidators(null);
        }
        // this.proposer.controls['driveFirstname'].updateValueAndValidity();
        // this.proposer.controls['driveLastname'].updateValueAndValidity();
        // this.proposer.controls['driveGender'].updateValueAndValidity();
        // this.proposer.controls['driveAge'].updateValueAndValidity();
        this.proposer.controls['drivingexp'].updateValueAndValidity();
        // this.proposer.controls['drivemaritalStatus'].updateValueAndValidity();
    }

    check(event) {
        // if (event.checked == true) {
        //     this.vehicle.controls['banktype'].setValidators([Validators.required]);
        //     this.vehicle.controls['bankName'].setValidators([Validators.required]);
        //     this.vehicle.controls['Address'].setValidators([Validators.required]);
        // } else if (event.checked != true) {
        //     this.vehicle.controls['banktype'].patchValue('');
        //     this.vehicle.controls['bankName'].patchValue('');
        //     this.vehicle.controls['Address'].patchValue('');
        //     this.vehicle.controls['banktype'].setValidators(null);
        //     this.vehicle.controls['bankName'].setValidators(null);
        //     this.vehicle.controls['Address'].setValidators(null);
        // }
        // this.vehicle.controls['banktype'].updateValueAndValidity();
        // this.vehicle.controls['bankName'].updateValueAndValidity();
        // this.vehicle.controls['Address'].updateValueAndValidity();
    }

    // changeflag(event: any) {
    //     if (this.previouspolicy.controls['preflag'].value == 'Y') {
    //         // this.previouspolicy.controls['preName'].setValidators([Validators.required]);
    //         this.previouspolicy.controls['prepolno'].setValidators([Validators.required]);
    //     } else if (this.previouspolicy.controls['preflag'].value == 'N') {
    //         // this.previouspolicy.controls['preName'].patchValue('');
    //         this.previouspolicy.controls['preName'].setValidators(null);
    //         this.previouspolicy.controls['prepolno'].setValidators(null);
    //     }
    //     this.previouspolicy.controls['preName'].updateValueAndValidity();
    //     this.previouspolicy.controls['prepolno'].updateValueAndValidity();
    // }

    proposerDetails(stepper: MatStepper, value) {
        sessionStorage.tatabikeproposer = '';
        sessionStorage.tatabikeproposer = JSON.stringify(value);
        if (this.proposer.valid) {
                if (sessionStorage.bikeproposerAge >= 18) {
                    this.agecount = sessionStorage.bikeproposerAge;
                    let exp = this.agecount - 18;
                    if (this.proposer.controls['drivingexp'].value <= exp) {
                        console.log(value, 'proposer');
                        stepper.next();
                        this.topScroll();
                    } else {
                        this.toastr.error('Invalid Driving Experience');
                    }
                } else {
                    this.toastr.error('Proposer Age should be 18 or above');
                }
        } else {
            this.toastr.error('Please Fill All The Mandatory Fields');
        }
    }

    vehicleDetails(stepper: MatStepper, value) {
        sessionStorage.tatabikevehicle = '';
        sessionStorage.tatabikevehicle = JSON.stringify(value);
        if (this.vehicle.valid ) {
            if(this.vehicle.controls['elecAccessoriesSI'].value <= 15000 && this.vehicle.controls['nonElectricAcessSI'].value <= 15000){
            console.log(value, 'vehicle');
            stepper.next();
            this.topScroll();
        }else{
                this.toastr.error('Sum Insured should be less then or equal to 15000');
            }
        }
        else {
            this.toastr.error('Please Fill All The Mandatory Fields');
        }
    }

    prepolicyDetails(stepper: MatStepper, value) {
        sessionStorage.tatabikeprepolicy = '';
        sessionStorage.tatabikeprepolicy = JSON.stringify(value);
        if (this.previouspolicy.valid) {
            if (this.enquiryFormData.business_type != '1') {
                if (this.previouspolicy.controls['prepolno'].value != '') {
                    console.log(value, 'prepolicy');
                    stepper.next();
                    this.topScroll();
                } else {
                    this.toastr.error('Policy No should not be empty');
                }
            }
        }
    }

    nomineeDetails(stepper: MatStepper, value) {
        sessionStorage.tatabikenominee = '';
        sessionStorage.tatabikenominee = JSON.stringify(value);
        if (this.nominee.valid) {
            if (this.nominee.controls['nomineeAge'].value >= 18) {
                // this.QuoteList(stepper);
                this.createproposal(stepper);
            }else{
                this.toastr.error('Nominee Age should Be 18 or above');
            }
        }
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    sessionData() {
        if(sessionStorage.relation != '' && sessionStorage.relation != undefined) {
            this.relationlist = JSON.parse(sessionStorage.relation );
        }
        if (sessionStorage.tatabikeproposer != '' && sessionStorage.tatabikeproposer != undefined) {
            this.getstepper1 = JSON.parse(sessionStorage.tatabikeproposer);
            this.proposer = this.fb.group({
                proposerTitle: this.getstepper1.proposerTitle,
                proposerFirstname: this.getstepper1.proposerFirstname,
                proposerMidname: this.getstepper1.proposerMidname,
                proposerLastname: this.getstepper1.proposerLastname,
                proposerGender: this.getstepper1.proposerGender,
                proposerDob: this.datepipe.transform(this.getstepper1.proposerDob, 'y-MM-dd'),
                maritalStatus: this.getstepper1.maritalStatus,
                proposerMobile: this.getstepper1.proposerMobile,
                proposerEmail: this.getstepper1.proposerEmail,
                proposerAadhar: this.getstepper1.proposerAadhar,
                Addressone: this.getstepper1.Addressone,
                Addresstwo: this.getstepper1.Addresstwo,
                Addressthree: this.getstepper1.Addressthree,
                Addressfour: this.getstepper1.Addressfour,
                proposerPincode: this.getstepper1.proposerPincode,
                proposerState: this.getstepper1.proposerState,
                proposerDistrict: this.getstepper1.proposerDistrict,
                proposerCity: this.getstepper1.proposerCity,
                driveflag: this.getstepper1.driveflag,
                driveFirstname: this.getstepper1.driveFirstname,
                driveLastname: this.getstepper1.driveLastname,
                driveGender: this.getstepper1.driveGender,
                driveAge: this.getstepper1.driveAge,
                drivingexp: this.getstepper1.drivingexp,
                drivemaritalStatus: this.getstepper1.drivemaritalStatus,
            })
        }
        if (sessionStorage.tatabikevehicle != '' && sessionStorage.tatabikevehicle != undefined) {
            this.getstepper3 = JSON.parse(sessionStorage.tatabikevehicle);
            this.vehicle = this.fb.group({
                engine: this.getstepper3.engine,
                chassis: this.getstepper3.chassis,
                Financetype: this.getstepper3.Financetype,
                banktype: this.getstepper3.banktype,
                bankName: this.getstepper3.bankName,
                bankNamevalue: this.getstepper3.bankNamevalue,
                Address: this.getstepper3.Address,
                coverdrive: this.getstepper3.coverdrive,
                coverdrivevalue: this.getstepper3.coverdrivevalue,
                Associationmember: this.getstepper3.Associationmember,
                Associationamount: this.getstepper3.Associationamount,
                // Voluntary: this.getstepper3.Voluntary,
                Antitheft: this.getstepper3.Antitheft,
                Antitheftamount: this.getstepper3.Antitheftamount,
                Tppdrestrict: this.getstepper3.Tppdrestrict,
                Tppdrestrictamount: this.getstepper3.Tppdrestrictamount,
                depreciation: this.getstepper3.depreciation,
                depreciationamount: this.getstepper3.depreciationamount,
                Consumableexpense: this.getstepper3.Consumableexpense,
                Consumableexpenseamount: this.getstepper3.Consumableexpenseamount,
                Returninvoice: this.getstepper3.Returninvoice,
                Returninvoiceamount: this.getstepper3.Returninvoiceamount,
                Roadsideassistance: this.getstepper3.Roadsideassistance,
                Roadsideassistanceamount: this.getstepper3.Roadsideassistanceamount,
                elecAccessories:this.getstepper3.elecAccessories,
                elecAccessoriesSI:this.getstepper3.elecAccessoriesSI,
                elecAccessoriesAmount:this.getstepper3.elecAccessoriesAmount,
                nonElectricAcess: this.getstepper3.nonElectricAcess,
                nonElectricAcessSI:this.getstepper3.nonElectricAcessSI,
                nonElectricAcessSIAmount:this.getstepper3.nonElectricAcessSIAmount,

            })
        }
        if (sessionStorage.tatabikeprepolicy != '' && sessionStorage.tatabikeprepolicy != undefined) {
            this.getstepper2 = JSON.parse(sessionStorage.tatabikeprepolicy);
            this.previouspolicy = this.fb.group({
                // preflag: this.getstepper2.preflag,
                // preName: this.getstepper2.preName,
                // preNamevalue: this.getstepper2.preNamevalue,
                prepolno: this.getstepper2.prepolno,
                preAddressone: this.getstepper2.preAddressone,
                preAddresstwo: this.getstepper2.preAddresstwo,
                preAddressthree: this.getstepper2.preAddressthree,
                prepincode: this.getstepper2.prepincode,
                preState: this.getstepper2.preState,
                preDistrict: this.getstepper2.preDistrict,
                preCity: this.getstepper2.preCity,
                ispreviousPolicy: this.getstepper2.ispreviousPolicy,
            })
        }
        if (sessionStorage.tatabikenominee != '' && sessionStorage.tatabikenominee != undefined) {
            this.getstepper4 = JSON.parse(sessionStorage.tatabikenominee);
            this.nominee = this.fb.group({
                nomineeName: this.getstepper4.nomineeName,
                nomineeAge: this.getstepper4.nomineeAge,
                nomineerelation: this.getstepper4.nomineerelation,
            })
        }
    }

    QuoteList() {
        console.log(this.vehicle.controls['Associationmember'].value, 'Associationmember');
        const data = {

            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'enquiry_id': this.bikeEnquiryId,
            'company_id': "13",
            'package_type': this.premium,
            'Idv': this.buyBikeDetails.Idv,
            'revised_idv': this.buyBikeDetails.Idv,
            'PACover_for_OwnerDriver': this.vehicle.controls['coverdrive'].value == '' ? 'ODD01' : this.vehicle.controls['coverdrive'].value,
            'Automobile_Association_Membership': this.vehicle.controls['Associationmember'].value == true ? 'Y' : 'N',
            // 'Voluntary_Deductibles': this.vehicle.controls['Voluntary'].value == true ? 'Y' : 'N',
            'Anti_theft_device': this.vehicle.controls['Antitheft'].value == true ? 'Y' : 'N',
            'TPPD_Restricted': this.vehicle.controls['Tppdrestrict'].value == true ? 'Y' : 'N',
            'Depreciation_ReImbursement': this.vehicle.controls['depreciation'].value == true ? 'Y' : 'N',
            'Consumables_expenses': this.vehicle.controls['Consumableexpense'].value == true ? 'Y' : 'N',
            'Return_to_Invoice': this.vehicle.controls['Returninvoice'].value == true ? 'Y' : 'N',
            'Roadside_Assistance': this.vehicle.controls['Roadsideassistance'].value == true ? 'Y' : 'N',
            "Electrical_accessories":this.vehicle.controls['elecAccessories'].value == true ? 'Y' : 'N',
            "Electrical_Accessories_SI": this.vehicle.controls['elecAccessoriesSI'].value,
            "Non_Electrical_Accessories":this.vehicle.controls['nonElectricAcess'].value == true ? 'Y' : 'N',
            "Non_Electrical_Accessories_SI":this.vehicle.controls['nonElectricAcessSI'].value,
        };
        this.bikeinsurance.QuoteList(data).subscribe(
            (successData) => {
                this.QuoteSuccess(successData );
            },
            (error) => {
                this.QuoteFailure(error);
            }
        );
    }

    QuoteSuccess(successData) {

            if (successData.IsSuccess == true) {
                this.errortoaster = true;
            this.Quotelist = successData.ResponseObject;
            console.log(this.Quotelist, 'quotationdata');
            this.quotationNo=this.Quotelist.productlist.quotation_no;
            console.log(this.quotationNo, 'quotationNo');
            this.QuoteAss=this.Quotelist.productlist.addons.Automobile_Association_Membership;
            this.QuoteAntitheft=this.Quotelist.productlist.addons.Anti_theft_device;
            this.QuoteThirdPartres=this.Quotelist.productlist.addons.TPPD_Restricted;
            this.Quotedepreciation=this.Quotelist.productlist.addons.Depreciation_ReImbursement;
            this.QuoteConsumableexpense=this.Quotelist.productlist.addons.Consumables_expenses;
            this.QuoteReturninvoice=this.Quotelist.productlist.addons.Return_to_Invoice;
            this.QuoteRoadsideassistance=this.Quotelist.productlist.addons.Roadside_Assistance;
            this.electriaccSuminsured=this.Quotelist.productlist.addons.Electrical_accessories;
            this.nonElectriaccSuminsured=this.Quotelist.productlist.addons.NonElectrical_accessories;
            console.log(this.QuoteAss,'amount')
            this.chaneauto();
            this.chaneanti();
            this.chanetpp();
            this.chanedepre();
            this.chanecon();
            this.chaneret();
            this.chaneroad();
            this.eAcessSIChange();
            this.nEAcessChange();
            // this.createproposal(stepper);
            }else{
                this.errortoaster = false;
                this.toastr.error(successData.ErrorObject);
            }
    }

    QuoteFailure(error) {

    }

    //Proposal Creation
    createproposal(stepper: MatStepper) {
        const data = {
            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "enquiry_id": this.bikeEnquiryId,
            "created_by": "",
            "proposal_id": sessionStorage.tataBikeproposalID == '' || sessionStorage.tataBikeproposalID == undefined ? '' : sessionStorage.tataBikeproposalID,
            'package_type': this.premium,
            "motorproposalObj": {
                "quotation_no": this.quotationNo,
                "pol_sdate": this.enquiryFormData.business_type == '1' ? this.datepipe.transform(this.minDate, 'yMMdd') : this.datepipe.transform(this.poldate, 'yMMdd'),
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
                    "address_4": this.proposer.controls['Addressfour'].value,
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
                    "flag": this.enquiryFormData.business_type == '1'? 'N' : 'Y',
                    // "name": this.previouspolicy.controls['preName'].value == null ? '' : this.previouspolicy.controls['preName'].value,
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
                "nominee": {
                    "name": this.nominee.controls['nomineeName'].value,
                    "age": this.nominee.controls['nomineeAge'].value,
                    "relation": this.nominee.controls['nomineerelation'].value
                },
                "driver": {
                    "flag": this.proposer.controls['driveflag'].value,
                    "fname": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveFirstname'].value : '',
                    "lname": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveLastname'].value : '',
                    "gender": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveGender'].value : '',
                    "age": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['driveAge'].value : '',
                    "drivingexp": this.proposer.controls['drivingexp'].value,
                    "marital_status": this.proposer.controls['driveflag'].value == 'Y' ? this.proposer.controls['drivemaritalStatus'].value : '',
                }
            }
        };
        console.log(data, 'dataproposal');
        this.settings.loadingSpinner = true;
        this.bikeinsurance.proposal(data).subscribe(
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
            this.topScroll();
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryDatabiketata = JSON.stringify(this.summaryData );
            console.log(this.summaryData, 'summary');
            this.Proposalnumber = this.summaryData.Proposal_Number;
            sessionStorage.tataBikeproposalnumber =  this.summaryData.Proposal_Number;
            this.PaymentRedirect = this.summaryData.PaymentRedirect;
            this.PaymentReturn = this.summaryData.PaymentReturn;
            sessionStorage.tataBikeproposalID = this.summaryData.ProposalId;
            this.proposerFormData = this.proposer.value;
            this.vehicalFormData = this.vehicle.value;
            this.previousFormData = this.previouspolicy.value;
            this.nomineeFormData = this.nominee.value;
        } else {
            if (successData.ErrorDes) {
                this.toastr.error(successData.ErrorDes);
                console.log(successData.ErrorDes, 'errordes');
                this.settings.loadingSpinner = false;
            } else {
                this.toastr.error(successData.ErrorObject);
                console.log(successData.ErrorObject, 'errorobj');
                this.settings.loadingSpinner = false;
            }
        }
    }

    proposalFailure(error) {
    }
    changefinancecompany() {
        this.vehicle.controls['bankNamevalue'].patchValue(this.photos[this.vehicle.controls['bankName'].value]);

        console.log(this.vehicle.controls['bankNamevalue'].value,'000000000.....');
        console.log(this.finlist[this.vehicle.controls['bankName'].value],'11111111111111111111....');
        this.vehicle.controls['bankNamevalue'].patchValue(this.banklist[this.vehicle.controls['bankName'].value]);
console.log(this.vehicle.controls['bankNamevalue'].value,'2222222222....');
console.log(this.banklist[this.vehicle.controls['bankName'].value],'33333333....');
    }
}
