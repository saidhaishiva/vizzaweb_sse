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
    public declaration: any;
    public PaymentRedirect: any;
    public PaymentReturn: any;
    public vehicledata: any;
    public poldate: any;
    public Proposalnumber: any;
    public bikeProposerAge: any;
    public coverlist: any;
    public agecount: any;

    constructor(public fb: FormBuilder, public validation: ValidationService, public bikeinsurance: BikeInsuranceService, public appSettings: AppSettings, public toastr: ToastrService, public authservice: AuthService, public datepipe: DatePipe, public config: ConfigurationService, public route: ActivatedRoute) {
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if (params.stepper == true || params.stepper == 'true') {
                stepperindex = 4;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.ProposalId = this.summaryData.ProposalId;
                    this.PaymentRedirect = this.summaryData.PaymentRedirect;
                    this.PaymentReturn = this.summaryData.PaymentReturn;
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.vehicalFormData = JSON.parse(sessionStorage.vehicalFormData);
                    this.previousFormData = JSON.parse(sessionStorage.previousFormData);
                    this.nomineeFormData = JSON.parse(sessionStorage.nomineeFormData);
                    sessionStorage.tataBikeproposalID = this.ProposalId;
                }
            }
        });
        this.currentStep = stepperindex;
        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        const miniDate = new Date();
        this.minDate = new Date(miniDate.getFullYear(), miniDate.getMonth(), miniDate.getDate());
        this.maxdate = this.minDate;
        console.log(this.minDate, 'tdy');

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
            coverdrivevalue: '',
            Associationmember: '',
            Voluntary: '',
            Antitheft: '',
            Tppdrestrict: '',
            depreciation: '',
            Consumableexpense: '',
            Returninvoice: '',
            Roadsideassistance: '',
        });

        this.previouspolicy = this.fb.group({
            preflag: ['', Validators.required],
            precode: '',
            preName: '',
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
            nomieeName: ['', Validators.required],
            nomineeAge: ['', Validators.required],
            nomineerelation: ['', Validators.required],
        })

    }

    ngOnInit() {
        this.getGenderlist();
        this.getNamelist();
        this.getCodelist();
        this.getRelationList();
        this.coverdriveList();
        this.sessionData();
        this.vehicledata = JSON.parse(sessionStorage.vehicledetails);
        console.log(this.vehicledata);
        this.buyBikeDetails = JSON.parse(sessionStorage.buyProductDetails);
        this.enquiryFormData = JSON.parse(sessionStorage.bikeListDetails);
        console.log(this.enquiryFormData, 'enquiry data');
        this.bikeEnquiryId = sessionStorage.bikeEnquiryId;
        this.vehicle.controls['engine'].patchValue(this.vehicledata.engine_no);
        this.vehicle.controls['chassis'].patchValue(this.vehicledata.chassis_no);
        const poldate = new Date(this.vehicledata.previous_policy_expiry_date);
        console.log(poldate, 'poldate');
        this.poldate = new Date(poldate.getFullYear(), poldate.getMonth(), poldate.getDate() + 1);
        console.log(this.poldate, 'policy date');
        if (this.enquiryFormData.business_type != '1') {
            this.previouspolicy.controls['preflag'].patchValue('Y');
        }
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

    addEvent(event: any, type) {
        console.log(type);
        if (event.value != null) {
            let dob = '';
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
                if(type == 'proposer') {
                    dob = this.datepipe.transform(event.value, 'y-MM-dd');
                    this.bikeProposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.bikeProposerAge;
                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
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
                if(type == 'proposer') {
                    dob = this.datepipe.transform(event.value, 'y-MM-dd');
                    console.log(dob, 'ageob');
                    this.bikeProposerAge = this.ageCalculate(dob);
                    sessionStorage.proposerAge = this.bikeProposerAge;
                }
            }
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
        console.log(event.length, 'length');
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
        console.log(this.banklist, 'ddddddd');
    }

    FinanceFailure(error) {

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

    select() {
        this.vehicle.controls['coverdrivevalue'].patchValue(this.coverlist[this.vehicle.controls['coverdrive'].value]);
    }

    chooseflag(event: any) {
        if (this.proposer.controls['driveflag'].value == 'Y') {
            this.proposer.controls['driveFirstname'].patchValue(this.proposer.controls['proposerFirstname'].value);
            this.proposer.controls['driveLastname'].patchValue(this.proposer.controls['proposerLastname'].value);
            this.proposer.controls['driveGender'].patchValue(this.proposer.controls['proposerGender'].value);
            this.proposer.controls['driveAge'].patchValue(sessionStorage.proposerAge);
            this.proposer.controls['drivemaritalStatus'].patchValue(this.proposer.controls['maritalStatus'].value);
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
        if (event.checked == true) {
            this.vehicle.controls['banktype'].setValidators([Validators.required]);
            this.vehicle.controls['bankName'].setValidators([Validators.required]);
            this.vehicle.controls['Address'].setValidators([Validators.required]);
        } else if (event.checked != true) {
            this.vehicle.controls['banktype'].patchValue('');
            this.vehicle.controls['bankName'].patchValue('');
            this.vehicle.controls['Address'].patchValue('');
            this.vehicle.controls['banktype'].setValidators(null);
            this.vehicle.controls['bankName'].setValidators(null);
            this.vehicle.controls['Address'].setValidators(null);
        }
        this.vehicle.controls['banktype'].updateValueAndValidity();
        this.vehicle.controls['bankName'].updateValueAndValidity();
        this.vehicle.controls['Address'].updateValueAndValidity();
    }

    changeflag(event: any) {
        if (this.previouspolicy.controls['preflag'].value == 'Y') {
            this.previouspolicy.controls['precode'].setValidators([Validators.required]);
            this.previouspolicy.controls['preName'].setValidators([Validators.required]);
            this.previouspolicy.controls['prepolno'].setValidators([Validators.required]);
        } else if (this.previouspolicy.controls['preflag'].value == 'N') {
            this.previouspolicy.controls['precode'].patchValue('');
            this.previouspolicy.controls['preName'].patchValue('');
            this.previouspolicy.controls['precode'].setValidators(null);
            this.previouspolicy.controls['preName'].setValidators(null);
            this.previouspolicy.controls['prepolno'].setValidators(null);
        }
        this.previouspolicy.controls['precode'].updateValueAndValidity();
        this.previouspolicy.controls['preName'].updateValueAndValidity();
        this.previouspolicy.controls['prepolno'].updateValueAndValidity();
    }

    proposerDetails(stepper: MatStepper, value) {
        sessionStorage.tatabikeproposer = '';
        sessionStorage.tatabikeproposer = JSON.stringify(value);
        if (this.proposer.valid) {
            if (sessionStorage.proposerAge >= 18) {
                this.agecount = sessionStorage.proposerAge;
                let age = this.agecount - 18;
                if (this.proposer.controls['drivingexp'].value <= age) {
                    console.log(value, 'proposer');
                    stepper.next();
                } else {
                    this.toastr.error('Invalid DrivingExperience');
                }
            } else {
                this.toastr.error('Proposer Should Be Greater than 18 and Above');
            }
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

    sessionData() {
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
        if (sessionStorage.tatavehicle != '' && sessionStorage.tatavehicle != undefined) {
            this.getstepper2 = JSON.parse(sessionStorage.tatavehicle);
            this.vehicle = this.fb.group({
                engine: this.getstepper2.engine,
                chassis: this.getstepper2.chassis,
                Financetype: this.getstepper2.Financetype,
                banktype: this.getstepper2.banktype,
                bankName: this.getstepper2.bankName,
                Address: this.getstepper2.Address,
                autoflag: this.getstepper2.autoflag,
                autoNumber: this.getstepper2.autoNumber,
                autoName: this.getstepper2.autoName,
                autoDob: this.datepipe.transform(this.getstepper2.autoDob, 'y-MM-dd'),
                coverdrive: this.getstepper2.coverdrive,
                coverdrivevalue: this.getstepper2.coverdrivevalue,
                Associationmember: this.getstepper2.Associationmember,
                Voluntary: this.getstepper2.Voluntary,
                Antitheft: this.getstepper2.Antitheft,
                Tppdrestrict: this.getstepper2.Tppdrestrict,
                depreciation: this.getstepper2.depreciation,
                Consumableexpense: this.getstepper2.Consumableexpense,
                Returninvoice: this.getstepper2.Returninvoice,
                Roadsideassistance: this.getstepper2.Roadsideassistance,

            })
        }
        if (sessionStorage.tataprepolicy != '' && sessionStorage.tataprepolicy != undefined) {
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
        }
        if (sessionStorage.tatanominee != '' && sessionStorage.tatanominee != undefined) {
            this.getstepper4 = JSON.parse(sessionStorage.tatanominee);
            this.nominee = this.fb.group({
                nomieeName: this.getstepper4.nomieeName,
                nomineeAge: this.getstepper4.nomineeAge,
                nomineerelation: this.getstepper4.nomineerelation,
            })
        }
    }

    QuoteList(stepper) {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'enquiry_id': this.bikeEnquiryId,
            'company_id': "13",
            'Idv': this.buyBikeDetails.Idv,
            'revised_idv': this.buyBikeDetails.Idv,
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
        this.bikeinsurance.QuoteList(data).subscribe(
            (successData) => {
                this.QuoteSuccess(successData, stepper);
            },
            (error) => {
                this.QuoteFailure(error);
            }
        );
    }

    QuoteSuccess(successData, stepper) {
        if (successData.IsSuccess) {
            this.Quotelist = successData.ResponseObject;
            console.log(this.Quotelist, 'quotationdata');
            this.createproposal(stepper);
        }
    }

    QuoteFailure(error) {

    }

    //Proposal Creation
    createproposal(stepper: MatStepper) {
        console.log(this.previouspolicy.controls['preflag'].value, 'preflag');
        console.log(this.vehicle.controls['autoDob'].value, 'expry date');
        const data = {
            "platform": "web",
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "enquiry_id": this.bikeEnquiryId,
            "created_by": "",
            "proposal_id": sessionStorage.tataBikeproposalID == '' || sessionStorage.tataBikeproposalID == undefined ? '' : sessionStorage.tataBikeproposalID,
            "motorproposalObj": {
                "quotation_no": this.Quotelist.productlist.quotation_no,
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
                    "flag": this.previouspolicy.controls['preflag'].value == null || this.previouspolicy.controls['preflag'].value == '' ? 'N' : this.previouspolicy.controls['preflag'].value,
                    "code": this.previouspolicy.controls['precode'].value == null ? '' : this.previouspolicy.controls['precode'].value,
                    "name": this.previouspolicy.controls['preName'].value == null ? '' : this.previouspolicy.controls['preName'].value,
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
                    "expiry_date": this.vehicle.controls['autoDob'].value == null || this.vehicle.controls['autoDob'].value == '' ? '' : this.datepipe.transform(this.vehicle.controls['autoDob'].value, 'yMMdd'),
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
        console.log(data, 'dataproposal');
        sessionStorage.bikeproposaldata = JSON.stringify(data);
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
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'summary');
            this.Proposalnumber = this.summaryData.Proposal_Number;
            console.log(this.Proposalnumber, 'pronum');
            this.PaymentRedirect = this.summaryData.PaymentRedirect;
            console.log(this.PaymentRedirect, 'redirect');
            this.PaymentReturn = this.summaryData.PaymentReturn;
            sessionStorage.tataBikeproposalID = this.summaryData.ProposalId;
            this.proposerFormData = this.proposer.value;
            this.vehicalFormData = this.vehicle.value;
            this.previousFormData = this.previouspolicy.value;
            this.nomineeFormData = this.nominee.value;
        } else {
            alert('in');
            console.log(successData.ErrorObject, 'error');
            this.toastr.error(successData.ErrorObject);
            this.settings.loadingSpinner = false;
        }
    }

    proposalFailure(error) {
    }
}
