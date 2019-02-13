import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
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
  selector: 'app-travel-hdfc-proposal',
  templateUrl: './travel-hdfc-proposal.component.html',
  styleUrls: ['./travel-hdfc-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TravelHdfcProposalComponent implements OnInit {
    public hdfcTravel: FormGroup;
    public hdfcInsuredTravel: FormGroup;
    public nomineeTravelDetails: FormGroup;
    public settings: any;
    public webhost: any;
    public titleList: any;
    public hdfcTravelproposerAge: any;
    public personalDobError: any;
    public pin: any;
    public pincodeValid: any;
    public hdfcTravelStates: any;
    public hdfcTravelCity: any;
    public hdfcTravel1: any;
    public hdfcTravel2: any;
    public getTravelPremiumList: any;
    public insuredTravelPerson: any;
    public getallTravelPremiumList: any;
    public items: any;
    public insuredRelationshipDetails: any;
    public declinedetails: boolean;
    public restrictiondetails: boolean;
    public getpedDetails: boolean;
    public arr: any;
    public hdfcTravelProposerAge: any;
    public nomineeRelationshipDetails: any;
    public insuredTravelData: any;
    public summaryData: any;
    public lastStepper: any;
    public hdfc_Travel_proposal_id: any;
    public getAge: any;
    public getDays: any;
    public totalInsureDetails: any;
    public hdfcTravel3: any;
    public sameAsinsure: any;
    public declaration: any;
    public fullName: any;
    public totalAmount: any;
    // public sameInsurer: any;
    public decline: any;


    constructor(public travelservice: TravelService, public validation: ValidationService, public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.totalInsureDetails = [];
        this.decline = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.hdfcTravel = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            middlename: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            stdcode: '',
            telephoneNo: '',
            stdcodeoffice: '',
            telephoneNooffice: '',
            paymentmode: '',
            physicianName: '',
            physicianMobile: '',
            declineinsurance: 'False',
            declineReson: '',
            restrictionbyinsurance: 'False',
            restrictionbyinsurancedetails: '',
            gst: '',
            ped: 'None',
            IsCustomerAuthenticationDone: "1",
            AuthenticationType: "OTP",
            UIDNo: "",// otp value
            IsProposerSameAsInsured: "false",
            IsCustomerAcceptedPED: "true",
            rolecd: 'PROPOSER'
        });
        this.nomineeTravelDetails = this.fb.group({
            'NomineeName': ['', Validators.required],
            'NomineeRelation': ['', Validators.required]
        });
        this.pincodeValid = false;
        this.declinedetails = false;
        this.restrictiondetails = false;
        this.hdfc_Travel_proposal_id = 0;

    }

    ngOnInit() {
        this.titleproposer();
        this.getStateList();
        this.getPedList();
        this.insuredRelationshipList();
        this.nomineeRelationshipList();
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        let allLists = JSON.parse(sessionStorage.allTravelPremiumLists);
        this.getallTravelPremiumList = allLists[sessionStorage.changedTabIndex];
        console.log(this.getallTravelPremiumList, 'this.getallTravelPremiumList');
        this.insuredTravelPerson = this.getTravelPremiumList.family_details;
        this.hdfcInsuredTravel = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.insuredTravelPerson.length; i++) {
            this.items = this.hdfcInsuredTravel.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].type.patchValue(this.insuredTravelPerson[i].type);
        }
        this.sessionData();

    }
    // session Storage
    sessionData() {
        if (sessionStorage.hdfcTravelDetails1 != '' && sessionStorage.hdfcTravelDetails1 != undefined) {
            this.hdfcTravel1 = JSON.parse(sessionStorage.hdfcTravelDetails1);
            if (this.hdfcTravel1.pincode != '') {
                this.pincodevalidationHdfc(this.hdfcTravel1.pincode);
            }
            this.getPedList();

            this.hdfcTravel = this.fb.group({
                title: this.hdfcTravel1.title,
                firstname: this.hdfcTravel1.firstname,
                middlename: this.hdfcTravel1.middlename,
                lastname: this.hdfcTravel1.lastname,
                dob: this.datepipe.transform(this.hdfcTravel1.dob, 'y-MM-dd'),
                gender: this.hdfcTravel1.gender,
                address1: this.hdfcTravel1.address1,
                address2: this.hdfcTravel1.address2,
                address3: this.hdfcTravel1.address3,
                pincode: this.hdfcTravel1.pincode,
                city: this.hdfcTravel1.city,
                state: this.hdfcTravel1.state,
                stdcode: this.hdfcTravel1.stdcode,
                telephoneNo: this.hdfcTravel1.telephoneNo,
                stdcodeoffice: this.hdfcTravel1.stdcodeoffice,
                paymentmode: this.hdfcTravel1.paymentmode,
                telephoneNooffice: this.hdfcTravel1.telephoneNooffice,
                physicianName: this.hdfcTravel1.physicianName,
                physicianMobile: this.hdfcTravel1.physicianMobile,
                email: this.hdfcTravel1.email,
                declineinsurance: this.hdfcTravel1.declineinsurance,
                declineReson: this.hdfcTravel1.declineReson,
                restrictionbyinsurance: this.hdfcTravel1.restrictionbyinsurance,
                restrictionbyinsurancedetails: this.hdfcTravel1.restrictionbyinsurancedetails,
                gst: this.hdfcTravel1.gst,
                sameAsProposer: this.hdfcTravel1.sameAsProposer,
                mobile: this.hdfcTravel1.mobile,
                ped: this.hdfcTravel1.ped,
                rolecd: this.hdfcTravel1.rolecd == null ? 'PROPOSER' : 'PROPOSER'

            });
            this.getCityList(this.hdfcTravel1.city);
            this.declinereason();
            this.restrictionReson();


        }
        if (sessionStorage.hdfcTravelDetails2 != '' && sessionStorage.hdfcTravelDetails2 != undefined) {
            this.hdfcTravel2 = JSON.parse(sessionStorage.hdfcTravelDetails2);
            this.insuredRelationshipList();
            for (let i = 0; i < this.hdfcTravel2.items.length; i++) {
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsTitle.patchValue(this.hdfcTravel2.items[i].InsTitle);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsFirstName.patchValue(this.hdfcTravel2.items[i].InsFirstName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsLastName.patchValue(this.hdfcTravel2.items[i].InsLastName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsMiddleName.patchValue(this.hdfcTravel2.items[i].InsMiddleName);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsGender.patchValue(this.hdfcTravel2.items[i].InsGender);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(this.hdfcTravel2.items[i].InsDOB);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredRelation.patchValue(this.hdfcTravel2.items[i].InsuredRelation);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.hdfcTravel2.items[i].InsuredAge);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.hdfcTravel2.items[i].insurerDobValidError);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].PassportNo.patchValue(this.hdfcTravel2.items[i].PassportNo);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].sameAsProposer.patchValue(this.hdfcTravel2.items[i].sameAsProposer);
                this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.hdfcTravel2.items[i].sameasreadonly);


            }
            if (this.hdfcTravel2.items[0].sameAsProposer != '' && this.hdfcTravel2.items[0].sameAsProposer != undefined) {
                this.sameasInsurerDetails();
            }

        }
        let insuretravelDetails = this.totalInsureDetails;

        if (sessionStorage.hdfcTravelDetails3 != '' && sessionStorage.hdfcTravelDetails3 != undefined) {
            this.hdfcTravel3 = JSON.parse(sessionStorage.hdfcTravelDetails3);
            console.log(this.hdfcTravel3,'this.hdfcTravel3');
            this.nomineeTravelDetails = this.fb.group({
                NomineeName: this.hdfcTravel3.NomineeName,
                NomineeRelation: this.hdfcTravel3.NomineeRelation
            });
        }
        if (sessionStorage.hdfc_Travel_proposal_id != '' && sessionStorage.hdfc_Travel_proposal_id != undefined) {
            this.hdfc_Travel_proposal_id = sessionStorage.hdfc_Travel_proposal_id;
        }
    }

    // validation
    nameValidate(event: any){
        this.validation.nameValidate(event);
    }
    // Dob validation
    dobValidate(event: any){
        this.validation.dobValidate(event);
    }
    // Number validation
    numberValidate(event: any){
        this.validation.numberValidate(event);
    }
    idValidate(event: any){
        this.validation.idValidate(event);
    }
    canDeactivate() {
        return this.hdfc_Travel_proposal_id;
    }
    initItemRows() {
        return this.fb.group(
            {
                InsTitle: ['', Validators.required],
                InsFirstName: new FormControl(''),
                InsLastName: new FormControl(''),
                InsMiddleName: new FormControl(''),
                InsDOB: ['', Validators.required],
                InsGender: ['', Validators.compose([Validators.required])],
                InsuredRelation: ['', Validators.required],
                InsuredAge: '',
                insurerDobError: '',
                insurerDobValidError: '',
                PassportNo: ['', Validators.compose([Validators.minLength(7)])],
                rolecd: 'PRIMARY',
                type: '',
                sameAsProposer: false,
                sameasreadonly: false,

            }
        );
    }

// title for proposer
    titleproposer() {
        const data = {
            'platform': 'web',
        };
        this.travelservice.titleListProposer(data).subscribe(
            (successData) => {
                this.titleSuccess(successData);
            },
            (error) => {
                this.titleFailure(error);
            }
        );
    }

    public titleSuccess(successData) {
        if (successData.IsSuccess) {
            this.titleList = successData.ResponseObject;

        }
    }

    public titleFailure(error) {
    }


    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.hdfcTravelproposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.personalDobError = '';

                } else {
                    this.personalDobError = 'Enter Valid Date';
                }

                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.hdfcTravelproposerAge = this.ageCalculate(dob);

                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.hdfcTravelproposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';
            }

            sessionStorage.proposerAgeHdfcTravel = this.hdfcTravelproposerAge;
        }
    }


    addEventInsurer(event, i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            this.getAge = '';
            this.getDays;
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid DOB');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    this.getDays = this.ageCalculateInsurer(dob);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);


                } else {
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue('');
                }
            } else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    this.getDays = this.ageCalculateInsurer(dob);
                    this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.patchValue(dob);
                }

            }

        }
        let length = this.datepipe.transform(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsDOB.value, 'y-MM-dd');
        // let length =  this.insureArray['controls'].items['controls'][i]['controls'].proposerDob.value;
        if (length.length == 10) {
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
            // this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue(this.getAge);
            // this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
            this.ageValidation(i, type);
        } else {

            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.patchValue('');
        }
    }


    ageValidation(i, type) {

        if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value <= 18 && type == 'Self') {
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
        } else if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value > 18 && type == 'Self') {
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value);
        }
        if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value <= 18 && type == 'Spouse') {
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
        } else if (this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value > 18 && type == 'Spouse') {
            this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsuredTravel['controls'].items['controls'][i]['controls'].InsuredAge.value);
        }
        let smallest = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i] < smallest) {
                smallest = this.arr[i];
            }
        }
    }

    ageCalculate(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        return year_age;
    }

    ageCalculateInsurer(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let Bob_days = Math.ceil(differenceInMilisecond / (1000 * 60 * 60 * 24));
        return Bob_days;

    }


    declinereason() {
        if (this.hdfcTravel.controls['declineinsurance'].value == 'True') {
            this.declinedetails = true;
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].declineReson.setValidators([Validators.required]);

        } else {
            this.declinedetails = false;
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].declineReson.setValidators(null);

        }
    }

    restrictionReson() {
        if (this.hdfcTravel.controls['restrictionbyinsurance'].value == 'True') {
            this.restrictiondetails = true;
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].restrictionbyinsurancedetails.setValidators([Validators.required]);

        } else {
            this.restrictiondetails = false;
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].restrictionbyinsurancedetails.setValidators(null);

        }
    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    // pincode validation

    pincodevalidationHdfc(pin) {
        this.pin = pin;
        if (pin == '') {
            this.pincodeValid = true;
        }
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'Pincode': this.pin
        };
        if (this.pin.length == 6) {
            this.travelservice.pincodevalidate(data).subscribe(
                (successData) => {
                    this.pincodeSuccess(successData);
                },
                (error) => {
                    this.pincodeFailure(error);
                }
            );
        }
    }

    public pincodeSuccess(successData) {
        if (successData.IsSuccess) {
            this.pincodeValid = true;
        } else {
            this.pincodeValid = false;
            this.toastr.error(successData.ErrorObject);
            // this.hdfcPersonal.controls['pincode'].setValue('');
        }
        sessionStorage.pincodeValid = this.pincodeValid;

    }

    public pincodeFailure(successData) {
    }

    getStateList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.statevalidate(data).subscribe(
            (successData) => {
                this.getStateSuccess(successData);
            },
            (error) => {
                this.getStateFailure(error);
            }
        );
    }

    public getStateSuccess(successData) {
        if (successData.IsSuccess) {
            this.hdfcTravelStates = successData.ResponseObject;
        }
    }

    public getStateFailure(error) {
    }

    getCityList(value) {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'state_id': this.hdfcTravel.controls['state'].value,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.travelservice.cityvalidate(data).subscribe(
            (successData) => {
                this.getCitySuccess(successData);
            },
            (error) => {
                this.getCityFailure(error);
            }
        );
    }

    public getCitySuccess(successData) {
        if (successData.IsSuccess) {
            this.hdfcTravelCity = successData.ResponseObject;
        }
    }

    public getCityFailure(error) {
    }

// get ped list
    getPedList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.pedList(data).subscribe(
            (successData) => {
                this.getPedSuccess(successData);
            },
            (error) => {
                this.getPedFailure(error);
            }
        );
    }

    public getPedSuccess(successData) {
        if (successData.IsSuccess) {
            this.getpedDetails = successData.ResponseObject;
        }
    }

    public getPedFailure(error) {
    }

    // insured relationship
    insuredRelationshipList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.realtionshipList(data).subscribe(
            (successData) => {
                this.insuredRelationshipListSuccess(successData);
            },
            (error) => {
                this.insuredRelationshipListFailure(error);
            }
        );
    }

    public insuredRelationshipListSuccess(successData) {
        if (successData.IsSuccess) {
            this.insuredRelationshipDetails = successData.ResponseObject;
        }
    }

    public insuredRelationshipListFailure(error) {
    }

    // insured relationship
    nomineeRelationshipList() {
        const data = {
            'platform': 'web',
        }
        this.travelservice.nomineerealtionshipList(data).subscribe(
            (successData) => {
                this.nomineeRelationshipListSuccess(successData);
            },
            (error) => {
                this.nomineeRelationshipListFailure(error);
            }
        );
    }

    public nomineeRelationshipListSuccess(successData) {
        if (successData.IsSuccess) {
            this.nomineeRelationshipDetails = successData.ResponseObject;
        }

    }

    public nomineeRelationshipListFailure(error) {
    }

    // proposer Details
    proposerDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails1 = '';
        sessionStorage.hdfcTravelDetails1 = JSON.stringify(value);
        if (this.hdfcTravel.valid) {
            if (sessionStorage.proposerAgeHdfcTravel >= 18) {
                if (this.hdfcTravel.controls['ped'].value == 'None') {
                    stepper.next();

                } else {
                    this.toastr.error('Existing Disease should Not allow For this insurance');
                }

            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }

        }
    }

// insured Details
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails2 = '';
        sessionStorage.hdfcTravelDetails2 = JSON.stringify(value);
        // this.sameInsurer = this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.value;
        // this.nomineeTravelDetails.controls['NomineeRelation'].patchValue('');
        this.insuredTravelData = value;
        if (this.hdfcInsuredTravel.valid) {
            stepper.next();

        }
    }

    // nominee Details
    nomineeDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcTravelDetails3 = '';
        sessionStorage.hdfcTravelDetails3 = JSON.stringify(value);
        if(this.nomineeTravelDetails.valid){
                this.createProposal(stepper);
                this.lastStepper = stepper;
        }

    }

    sameasInsurerDetails() {

        if (this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameAsProposer.value) {
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsTitle.patchValue(this.hdfcTravel.controls['title'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsFirstName.patchValue(this.hdfcTravel.controls['firstname'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsLastName.patchValue(this.hdfcTravel.controls['lastname'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsMiddleName.patchValue(this.hdfcTravel.controls['middlename'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsGender.patchValue(this.hdfcTravel.controls['gender'].value);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue(this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'));
            let age = this.ageCalculate(this.datepipe.transform(this.hdfcTravel.controls['dob'].value, 'y-MM-dd'));
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredAge.patchValue(age);
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.patchValue('Self');
        } else {
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);

            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsTitle.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsFirstName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsLastName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsMiddleName.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsGender.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsDOB.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredRelation.patchValue('');
            this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].InsuredAge.patchValue('');

        }

    }


    // proposal craetion
    createProposal(stepper) {
        console.log(this.getallTravelPremiumList);
        let insuretravelDetails = this.totalInsureDetails;
        for (let i = 0; i < this.insuredTravelData.items.length; i++) {
            this.insuredTravelData.items[i].NomineeName = this.nomineeTravelDetails.controls['NomineeName'].value;
            this.insuredTravelData.items[i].NomineeRelation = this.nomineeTravelDetails.controls['NomineeRelation'].value;
        }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.getTravelPremiumList.enquiry_id,
            'proposal_id': sessionStorage.hdfc_Travel_proposal_id ? sessionStorage.hdfc_Travel_proposal_id : this.hdfc_Travel_proposal_id,
            "InsuranceDetails": {
                "PlanDetails": {
                    'TotalSumInsured': this.getallTravelPremiumList.suminsured_amount,//From main page
                    'PlanCd': this.getTravelPremiumList.product_code,
                    'DepartureDate': this.getallTravelPremiumList.start_date,
                    'ArrivalDate': this.getallTravelPremiumList.end_date,
                    'TravelDays': this.getallTravelPremiumList.day_count.toString(),
                    'purposeofvisitcd': "Business",
                    'PlacesVisitedCd': "London",
                    'NoOfAdults': this.getallTravelPremiumList.adult_count,
                    'NoOfKids': this.getallTravelPremiumList.child_count,
                    'FloaterPlan': this.getallTravelPremiumList.scheme,
                    'DependentParent': "None",
                    'NoOfAdditionalKids': "0"
                },
                "PaymentDetails": {
                    'PaymentOption': this.hdfcTravel.controls['paymentmode'].value,
                },
                "CustDetails": {
                    'Title': this.hdfcTravel.controls['title'].value,
                    'FirstName': this.hdfcTravel.controls['firstname'].value,
                    'MiddleName': this.hdfcTravel.controls['middlename'].value,
                    'LastName': this.hdfcTravel.controls['lastname'].value,
                    'DOB': this.hdfcTravel.controls['dob'].value,
                    'Gender': this.hdfcTravel.controls['gender'].value,
                    'Address1': this.hdfcTravel.controls['address1'].value,
                    'Address2': this.hdfcTravel.controls['address2'].value,
                    'Address3': this.hdfcTravel.controls['address3'].value,
                    'StateCode': this.hdfcTravel.controls['state'].value,
                    'CityCode': this.hdfcTravel.controls['city'].value,
                    'Pincode': this.hdfcTravel.controls['pincode'].value,
                    'STDCodeResi': this.hdfcTravel.controls['stdcode'].value,
                    'TelResi': this.hdfcTravel.controls['telephoneNo'].value,
                    'STDCodeOff': this.hdfcTravel.controls['stdcodeoffice'].value,
                    'TelOff': this.hdfcTravel.controls['telephoneNooffice'].value,
                    'MobileNumber': this.hdfcTravel.controls['mobile'].value,
                    'OverseasNo': "",
                    'Email': this.hdfcTravel.controls['email'].value,
                    'ExistingAliments': "",//Master
                    'PhysicianName': this.hdfcTravel.controls['physicianName'].value,
                    'PhysicianNo': this.hdfcTravel.controls['physicianMobile'].value,
                    'DeclineInsurance': this.hdfcTravel.controls['declineinsurance'].value,
                    'DeclineReason': this.hdfcTravel.controls['declineReson'].value,
                    'RestrictionByIns': this.hdfcTravel.controls['restrictionbyinsurance'].value,
                    'RestrictionByInsDetails': this.hdfcTravel.controls['restrictionbyinsurancedetails'].value,
                    'GSTINNO': this.hdfcTravel.controls['gst'].value,
                    'IsCustomerAuthenticationDone': "1",
                    'AuthenticationType': "OTP",
                    'UIDNo': "",
                    'IsProposerSameAsInsured': this.hdfcInsuredTravel['controls'].items['controls'][0]['controls'].sameAsProposer.value.toString(),
                    'IsCustomerAcceptedPED': "false"
                },
                "Member": {
                    "InsuredDetails": this.insuredTravelData.items

                }
            }
        }
        this.settings.loadingSpinner = true;
        this.travelservice.createHdfcTravelProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData,);
            },

            (error) => {
                this.proposalFailure(error);
            }
        );

    }

    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess == true) {
            this.toastr.success('Proposal created successfully!!');
            this.lastStepper.next();

            this.summaryData = successData.ResponseObject;
            this.fullName = this.summaryData.ProposalDetails.fname + ' ' + this.summaryData.ProposalDetails.lname;
            this.totalAmount = parseFloat(this.summaryData.ProposalDetails.totalPremium);

            sessionStorage.hdfc_Travel_proposal_id = successData.ResponseObject.ProposalId;
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public proposalFailure(error) {

    }
}
