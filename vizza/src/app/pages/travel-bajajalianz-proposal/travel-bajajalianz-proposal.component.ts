import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import { TravelService } from '../../shared/services/travel.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ToastrService} from 'ngx-toastr';
// import {assertLessThan} from '@angular/core/src/render3/assert';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {validateValue} from '@angular/flex-layout';
import {AuthService} from '../../shared/services/auth.service';
import {log} from 'util';
import {ActivatedRoute} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import * as moment from 'moment';


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
  selector: 'app-travel-bajajalianz-proposal',
  templateUrl: './travel-bajajalianz-proposal.component.html',
  styleUrls: ['./travel-bajajalianz-proposal.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class TravelBajajalianzProposalComponent implements OnInit {

    public setting: any;
    public bajajProposal: FormGroup;
    public bajajInsuredTravel: FormGroup;
    public getMaritalDetails: any;
    public getRelationDetails: any;
    public pincodeValid: any;
    public getTravelPremiumList: any;
    public getEnquiryDetails: any;
    public insureReligarePerson: any;
    public proposerData: any;
    public insurerData: any;
    public insuredDataArray: any;
    public getStepper1: any;
    public getStepper2: any;
    public showInsure: any;
    public studentdetails: boolean;
    public bajajTravelMobileTrue0: boolean;
    public bajajTravelMobileTrue1: boolean;
    public bajajTravelMobileTrue2: boolean;
    public today: any;
    public items: any;
    public proposerAge: any;
    public inusurerAge: any;
    public personalDobError: any;
    public proposalId: any;
    public proposerFormData: any;
    public insuredFormData: any;
    public summaryData: any;
    public getAge: any;
    public step: any;
    public getDays: any;
    public getProposerAgeDays: any;
    public showInsureSummary: boolean;
    public webhost: any;
    public acceptSummaryDeclaration: any;
    public placeOfVisit: any;
    public purposeOfVisitss: any;
    // public bajajTravelMobileTrue0 = boolean;

    constructor(public appsetting: AppSettings,public auth: AuthService,public route: ActivatedRoute,public config: ConfigurationService, private toastr: ToastrService, public travelservice: TravelService, public fb: FormBuilder, public datepipe: DatePipe, public validation: ValidationService) {

        this.setting = appsetting.settings;
        this.today = new Date();
        this.step = 0;
        this.bajajTravelMobileTrue0 = false;
        this.bajajTravelMobileTrue1 = true;
        this.bajajTravelMobileTrue2 = true;
        this.bajajProposal = this.fb.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            middlename: [''],
            lastName: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            telephone: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            passportNumber: ['', Validators.required],
            streetName: ['', Validators.required],
            fax: [''],
            building: ['', Validators.required],
            country: ['', Validators.required],
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            nationality: ['', Validators.required],
            assigneeName: ['', Validators.required],
        });

        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 2;
                if(sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined){
                    this.summaryData = JSON.parse(sessionStorage.summaryData);
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.insuredFormData = JSON.parse(sessionStorage.insuredFormData);
                }

            }
        });
        this.webhost = this.config.getimgUrl();

    }

    ngOnInit() {

        //services
        this.maritalStatus();
        this.setting.loadingSpinner = false;

        //get family float nd premium list details
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        this.purposeOfVisitss = sessionStorage.travelType;

        let enqList = JSON.parse(sessionStorage.enquiryDetailsTravel);
        this.getEnquiryDetails = enqList[0];
        if (this.getEnquiryDetails.travel_user_type == 'family') {
            this.showInsure = true;
            this.showInsureSummary = true;
        } else {
            this.showInsure = false;
            this.showInsureSummary = false;
        }
        this.insureReligarePerson = this.getEnquiryDetails.family_members;

        /// insured Details form array
        this.bajajInsuredTravel = this.fb.group({
            items: this.fb.array([])
        });
        // this.insureReligarePerson.length
        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.items = this.bajajInsuredTravel.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].type.setValue(this.getEnquiryDetails.family_members[i].type);

        }
        this.session();


    }

    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }

    setStep(index) {
        if(this.showInsure) {
            this.step = index + 1;
        } else {
            this.step = index;
        }
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }


    backAll(){
        this.topScroll();
        this.prevStep();
    }



    initItemRows() {
        return this.fb.group(
            {
                assigneeName: ['', Validators.required],
                relation: ['', Validators.required],
                name: ['', Validators.required],
                passportNo: ['', Validators.required],
                age: ['', Validators.required],
                sex: ['', Validators.required],
                idob: ['', Validators.required],
                insurerDobError: [''],
                insurerDobValidError: [''],
                ins_days: [''],
                type: [''],
                ins_age: [''],


            }
        );
    }

    //change gender details
    changeGender() {
        if (this.bajajProposal.controls['title'].value == 'Mr') {
            this.bajajProposal.controls['gender'].patchValue('Male');
        } else if ( this.bajajProposal.controls['title'].value == 'Mrs') {
            this.bajajProposal.controls['gender'].patchValue('Female');
        }else{
            this.bajajProposal.controls['gender'].patchValue('Female');
        }
    }

    /// stepper

    nextTab(stepper, value, type) {
        console.log(this.bajajProposal.controls['dob'].value,'valueeeeeeee');
        this.proposerData = value;
        sessionStorage.stepper1bajajDetails = '';
        sessionStorage.stepper1bajajDetails = JSON.stringify(value);
        let dob_days = '';
        dob_days = this.datepipe.transform(this.bajajProposal.controls['dob'].value, 'dd-MM-y');
        this.getProposerAgeDays = this.DobDaysCalculate(dob_days);
        console.log(this.getProposerAgeDays,'agedaysss');
        if (this.bajajProposal.valid) {
            if(this.getProposerAgeDays > 6573 ){
                stepper.next();
                this.nextStep();
                this.sameasInsurerDetails(0);
                this.getRelation();
            } else{
                this.toastr.error('Age should be 18 years and above');
            }
            // this.bajajTravelMobileTrue1 = false;
            // this.bajajTravelMobileTrue2 = false;

        } else{
            this.toastr.error('Please enter all the  fields');
        }
    }

    // patch same proposar details to first insured
    sameasInsurerDetails(id) {
        console.log(sessionStorage.proposerAge,'ageeeeeeeeee');
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].assigneeName.patchValue(this.bajajProposal.controls.assigneeName.value);
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].relation.patchValue('SELF');
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].name.patchValue(this.bajajProposal.controls.firstName.value +' '+ this.bajajProposal.controls.middlename.value + ' ' + this.bajajProposal.controls.lastName.value);
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].passportNo.patchValue(this.bajajProposal.controls.passportNumber.value);
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].sex.patchValue(this.bajajProposal.controls.gender.value);
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].idob.patchValue(this.bajajProposal.controls.dob.value);
            this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].age.patchValue(sessionStorage.proposerAge);
        }

    // session
    session() {
        if (sessionStorage.travelPlan != '' && sessionStorage.travelPlan != undefined) {
            this.placeOfVisit = JSON.parse(sessionStorage.travelPlan);
        }
        if (sessionStorage.stepper1bajajDetails != '' && sessionStorage.stepper1bajajDetails != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1bajajDetails);
            this.bajajProposal = this.fb.group({
                title: this.getStepper1.title,
                firstName: this.getStepper1.firstName,
                lastName: this.getStepper1.lastName,
                middlename: this.getStepper1.middlename,
                fax: this.getStepper1.fax,
                telephone: this.getStepper1.telephone,
                gender: this.getStepper1.gender,
                dob: this.datepipe.transform(this.getStepper1.dob, 'y-MM-dd'),
                email: this.getStepper1.email,
                mobile: this.getStepper1.mobile,
                passportNumber: this.getStepper1.passportNumber,
                streetName: this.getStepper1.streetName,
                building: this.getStepper1.building,
                country: this.getStepper1.country,
                pincode: this.getStepper1.pincode,
                city: this.getStepper1.city,
                state: this.getStepper1.state,
                maritalStatus: this.getStepper1.maritalStatus,
                nationality: this.getStepper1.nationality,
                assigneeName: this.getStepper1.assigneeName,
            });
        }
        if (sessionStorage.stepper2bajajDetails != '' && sessionStorage.stepper2bajajDetails != undefined){
            this.getStepper2 = JSON.parse(sessionStorage.stepper2bajajDetails);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                if( i > 0 ){
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].assigneeName.patchValue(this.getStepper2.items[i].assigneeName);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].relation.patchValue(this.getStepper2.items[i].relation);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].name.patchValue(this.getStepper2.items[i].name);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].passportNo.patchValue(this.getStepper2.items[i].passportNo);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].sex.patchValue(this.getStepper2.items[i].sex);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].idob.patchValue(this.datepipe.transform(this.getStepper2.items[i].idob, 'y-MM-dd'));
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].age.patchValue(this.getStepper2.items[i].age);
                }
                }
        }

    }

    // get pincode details
    pincodevalidationBajaj(pin) {
        if (pin == '') {
            this.pincodeValid = true;
        }
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'postcode': pin
        };
        if (pin.length == 6) {
            this.travelservice.pincodeDetails(data).subscribe(
                (successData) => {
                    this.pincodeDetailsSuccess(successData);
                },
                (error) => {
                    this.pincodeDetailsFailure(error);
                }
            );
        }
    }

    public pincodeDetailsSuccess(successData) {
        if (successData.IsSuccess) {
            this.pincodeValid = true;
            this.bajajProposal.controls['city'].patchValue(successData.ResponseObject['city']);
            this.bajajProposal.controls['state'].patchValue(successData.ResponseObject['state']);
            this.bajajProposal.controls['country'].patchValue('India');
        } else {
            this.pincodeValid = false;
            this.toastr.error(successData.ErrorObject);
        }
    }
    public pincodeDetailsFailure(successData) {
    }

    //get relationship details
    getRelation() {
        const data = {
            "platform": "web",
            "role_id": "2",
            "user_id": "10"
        };
        this.travelservice.getRelationDetails(data).subscribe((successData) => {
                this.relationDetailsSuccess(successData);
            },
            (error) => {
                this.relationDetailsFailure(error);
            });
    }

    public relationDetailsSuccess(successData) {
        if (successData.IsSuccess) {
            this.getRelationDetails = successData.ResponseObject;
        }
    }

    public relationDetailsFailure(error) {

    }

    /// get marital status details
    maritalStatus() {
        const data = {
            'platform': 'web',
        };
        this.travelservice.getMaritalStatus(data).subscribe(
            (successData) => {
                this.getMaritalStatusSuccess(successData);
            },
            (error) => {
                this.getMaritalStatusFailure(error);
            }
        );
    }

    public getMaritalStatusSuccess(successData) {
        if (successData.IsSuccess) {
            this.getMaritalDetails = successData.ResponseObject;

        }
    }

    public getMaritalStatusFailure(error) {
    }

    // create proposal
    createProposal(stepper, value,type) {
        console.log(this.bajajProposal.controls['dob'].value,'dob valuee');
        console.log(value,'value');

        if(this.getEnquiryDetails.travel_user_type == 'family') {
            sessionStorage.stepper2bajajDetails = '';
            sessionStorage.stepper2bajajDetails = JSON.stringify(value);
            this.insurerData = value;
            this.insuredDataArray = [];
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.insuredDataArray.push({
                    'pvassignee': this.insurerData.items[i].assigneeName,
                    'pvrelation': this.insurerData.items[i].relation,
                    'pvname': this.insurerData.items[i].name,
                    'pvpassportNo': this.insurerData.items[i].passportNo,
                    'pvage': this.insurerData.items[i].age,
                    'pvsex': this.insurerData.items[i].sex,
                    'pvdob': this.datepipe.transform(this.insurerData.items[i].idob, 'y-MM-dd')
                });
            }
        } else{
            sessionStorage.stepper1bajajDetails = '';
            sessionStorage.stepper1bajajDetails = JSON.stringify(value);
            this.insuredDataArray = [];
        }
        const data = {
            "platform": "web",
            "proposal_id": sessionStorage.bajajTravelproposalID != '' && sessionStorage.bajajTravelproposalID !=undefined ? sessionStorage.bajajTravelproposalID : '',
            "enquiry_id": this.getEnquiryDetails.enquiry_id,
            'purposeOf_visit': this.purposeOfVisitss ? this.purposeOfVisitss : 'student',
            "role_id": this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            "user_id": this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            "pos_status": this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'product_id': this.getTravelPremiumList.product_id,
            'sum_insured_amount': this.getTravelPremiumList.sum_insured_amount,
            "totalPremium": this.getTravelPremiumList.total_premium,
            "serviceTax": this.getTravelPremiumList.serviceTax,
            "premium": this.getTravelPremiumList.premium,
            "productId": this.getTravelPremiumList.product_id,
            "planName": this.getTravelPremiumList.plan,
            "sumInsured": this.getTravelPremiumList.sum_insured_amount,
            "pTrvPartnerDtls_inout": {
                "sex": this.bajajProposal.controls['gender'].value,
                "state": this.bajajProposal.controls['state'].value,
                "lastname": this.bajajProposal.controls['lastName'].value,
                "middlename": this.bajajProposal.controls['middlename'].value,
                "city": this.bajajProposal.controls['city'].value,
                "title": this.bajajProposal.controls['title'].value,
                "maritalstatus": this.bajajProposal.controls['maritalStatus'].value,
                "streetname": this.bajajProposal.controls['streetName'].value,
                "building": this.bajajProposal.controls['building'].value,
                "passportno": this.bajajProposal.controls['passportNumber'].value,
                "assigneeName": this.bajajProposal.controls['assigneeName'].value,
                "firstname": this.bajajProposal.controls['firstName'].value,
                "country": this.bajajProposal.controls['country'].value,
                "pincode": this.bajajProposal.controls['pincode'].value,
                "nationality": this.bajajProposal.controls['nationality'].value,
                "email": this.bajajProposal.controls['email'].value,
                "dob": this.datepipe.transform(this.bajajProposal.controls['dob'].value, 'y-MM-dd'),
                "mobileNo": this.bajajProposal.controls['mobile'].value,
                "telephone": this.bajajProposal.controls['telephone'].value,
                "fax": this.bajajProposal.controls['fax'].value
                // "1983-09-25"
            },
            "pTrvPolDtls_inout": {
                "areaplan": this.getTravelPremiumList.area,
                "travelplan": this.getTravelPremiumList.plan,
                "familyFlag": this.getEnquiryDetails.travel_user_type == 'family' ? 'Y':'N',
                "toDate": this.getEnquiryDetails.end_date,
                "fromDate": this.getEnquiryDetails.start_date
            },
            "pFamilyInfoList_inout": {
                "WeoTrvFamilyParamInUser": this.insuredDataArray
            }
        };
        if(type =='insurer'){
            let ageValidate = [];
            for (let i = 0; i< this.insureReligarePerson.length; i++){
                if ( this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.value  == '') {
                    ageValidate.push(1);
                } else{
                    ageValidate.push(0);
                }
            }
            if (this.bajajProposal.valid && this.bajajInsuredTravel.valid && ageValidate.includes(1)) {
                    this.setting.loadingSpinner = true;
                    this.travelservice.getProposal(data).subscribe(
                        (successData) => {
                            this.getProposalSuccess(successData,stepper);
                        },
                        (error) => {
                            this.getProposalFailure(error);
                        }
                    );
            }else{
                this.toastr.error('please enter all the fields');

            }
        } else if (this.getEnquiryDetails.travel_user_type == 'student'){
            if (this.bajajProposal.valid) {
                let dob_days = '';
                dob_days = this.datepipe.transform(this.bajajProposal.controls['dob'].value, 'dd-MM-y');
                let getProposerAgeDays = this.DobDaysCalculate(dob_days);
                let ageValidStatus = true;

                //may 30 1983....
                //16 YEARS that is 5843 days ,,,max 35 yrs11 mnths ,30 days that is 13148.

                if(getProposerAgeDays > 5843 && getProposerAgeDays < 13149){
                    ageValidStatus = true;
                } else{
                    ageValidStatus = false;
                    this.toastr.error('student Age should be 16 years to 35 years');
                }
                if(ageValidStatus) {
                    this.setting.loadingSpinner = true;
                    this.travelservice.getProposal(data).subscribe(
                        (successData) => {
                            this.getProposalSuccess(successData,stepper);
                        },
                        (error) => {
                            this.getProposalFailure(error);
                        }
                    );
                }

            } else {
                this.toastr.error('please enter all the fields');

            }
        } else{
            if (this.bajajProposal.valid) {
                let dob_days = '';
                dob_days = this.datepipe.transform(this.bajajProposal.controls['dob'].value, 'dd-MM-y');
                let getProposerAgeDays = this.DobDaysCalculate(dob_days);
                let ageValidStatus = true;

                console.log(getProposerAgeDays,'agedays');
                if(this.getTravelPremiumList.plan_name1 == 'Senior Citizen'){
                    if(getProposerAgeDays > 22279 && getProposerAgeDays < 25932 ){
                        ageValidStatus = true;
                    } else{
                        ageValidStatus = false;
                        this.toastr.error('Senior Citizen Age should be 61 years to 70 years');
                    }
                }else{
                    if(getProposerAgeDays > 180 && getProposerAgeDays < 22280  ){
                        ageValidStatus = true;
                    } else{
                        ageValidStatus = false;
                        //5motns ,26 days that is 177 days ,,,max 60 yrs 11 mnts ,30 days that is 22279.
                        this.toastr.error('Age should be 6 months to 60 years');
                    }
                }

                if(ageValidStatus) {
                    this.setting.loadingSpinner = true;
                    this.travelservice.getProposal(data).subscribe(
                        (successData) => {
                            this.getProposalSuccess(successData,stepper);
                        },
                        (error) => {
                            this.getProposalFailure(error);
                        }
                    );
                }

            } else {
                this.toastr.error('please enter all the fields');

            }
        }

    }

    getProposalSuccess(successData,stepper) {
        this.setting.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            sessionStorage.summaryData = JSON.stringify(this.summaryData);
            this.proposalId = this.summaryData.policy_id;
            sessionStorage.bajajTravelproposalID = this.proposalId;
             this.proposerFormData = this.bajajProposal.value;
             this.insuredFormData = this.bajajInsuredTravel.value.items;
             sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
             sessionStorage.insuredFormData = JSON.stringify(this.insuredFormData);
             stepper.next();
             this.topScroll();
            this.nextStep();
            this.bajajTravelMobileTrue2 = false;

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    getProposalFailure(error) {

    }

// date picker
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAge = '';
            let dob = '';
            let dob_days = '';
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
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
                    this.proposerAge = this.ageCalculate(dob);
                    this.getDays = this.DobDaysCalculate(dob_days);
                    sessionStorage.proposerAge = this.proposerAge;
                }
            } else if (typeof event.value._i == 'object') {
                this.personalDobError = '';
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
                if (dob.length == 10) {
                    this.proposerAge = this.ageCalculate(dob);
                    this.getDays = this.DobDaysCalculate(dob_days);
                    sessionStorage.proposerAge = this.proposerAge;

                }
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

    addEventInsurer(event, i, type) {

        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            let dob_days = '';
            this.getAge = '';
            this.getDays;
            dob = this.datepipe.transform(event.value, 'y-MM-dd');
            dob_days = this.datepipe.transform(event.value, 'dd-MM-y');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                console.log(selectedDate.length, 'selectedDateselectedDate');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    console.log(this.getAge,'agee');
                    this.getDays = this.DobDaysCalculate(dob_days);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].idob.patchValue(dob);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].age.patchValue(this.getAge);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }else if (typeof event.value._i == 'object') {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                if (dob.length == 10) {
                    this.getAge = this.ageCalculate(dob);
                    console.log(this.getAge,'agee');
                    this.getDays = this.DobDaysCalculate(dob_days);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].idob.patchValue(dob);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].age.patchValue(this.getAge);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.patchValue(this.getDays);
                } else {
                    this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
                }
            }
            console.log(this.getAge, 'abcd');

            // if(!this.getAge) {
                this.ageValidation(i, type);
            // }
        }

    }


    DobDaysCalculate(getDays) {
        let a = moment(getDays, 'DD/MM/YYYY');
        let b = moment(new Date(), 'DD/MM/YYYY');
        let days = b.diff(a, 'days');
        return days;
    }

    ageValidation(i, type) {
        console.log(type,'hfgjfj');

        if(this.getEnquiryDetails.travel_user_type == 'family'){
            console.log(type);
            console.log('in');
            console.log(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value,'valueeee');
            // 6 months to 21 years 11 months 30 days that is 8034 days..
            // if(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 181 && this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 8035 && type == 'Child1' ) {
            //     this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            // } else {
            //     this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 6 months to 21 years');
            // }
            // if(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 181 && this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 8035 && type == 'Child2' ) {
            //     this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            // } else {
            //     this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 6 months to 21 years');
            // }
            if((this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 181 && type == 'Child1') || (this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 8034 && type == 'Child1')) {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 6 months to 21 years');
            } else if(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 181 && type == 'Child1')  {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }


            if((this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 181 && type == 'Child2') || (this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 8034 && type == 'Child2')) {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 6 months to 21 years');
            } else if(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 181 && type == 'Child2')  {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }

            if((this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value < 6574 && type == 'Spouse') || (this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value > 22279 && type == 'Spouse')) {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Age should be 18 years to 60 years');
            } else if(this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].ins_days.value >= 6574 && type == 'Spouse')  {
                this.bajajInsuredTravel['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            }
        }

    }



    /// validation
    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }

    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }

    dobValidate(event: any) {
        this.validation.dobValidate(event);
    }

    idValidate(event: any){
        this.validation.idValidate(event);
    }

}


