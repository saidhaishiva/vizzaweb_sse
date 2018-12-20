import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {ProposalService} from '../../shared/services/proposal.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
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
  selector: 'app-reliagretravelproposal',
  templateUrl: './reliagretravelproposal.component.html',
  styleUrls: ['./reliagretravelproposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReliagretravelproposalComponent implements OnInit {
    public religarePersonal: FormGroup;
    public insureReligareArray: FormGroup;
    public nomineeDetails: FormGroup;
    public today: any;
    public personalDobError: any;
    public religareTravelproposerAge: any;
    public pin: any;
    public title: any;
    public personalTravelCitys: any;
    public responseReligareTravel: any;
    public personalReligareTravelData: any;
    public AcceptDeclaration: any;
    public getTravelPremiumList: any;
    public insureReligarePerson: any;
    public items: any;
    public step: any;
    public insurerData: any;
    public religareTravel1: any;
    public religareTravel2: any;
    public lastStepper: any;
    public back: any;
    public getReligareTravelNomineeData: any;
    public religareTravelProposalID: any;
    public settings: any;
    public insuretravelRelationList: any;
    public religareTravelQuestionsList: any;
    public partyQuestionDOList: any;
    public insurerTravelCitys: any;
    public index: any;
    public iPersonalCitys: any;
    public response: any;
    public personalTravelResCitys: any;
    public tripStatus: any;
    public enquiryId: any;
    public stepback: any;
    public summaryData: any;
    public proposalId: any;
    public totalReligareData: any;
    public proposerInsureData: any;
    public getAge: any;
    public arr: any;
    public medicalStatus: any;

    constructor(public travelservice: TravelService, public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.arr = [];

        this.religarePersonal = this.fb.group({
            religarePersonalTitle: ['', Validators.required],
            religarePersonalFirstname: new FormControl(''),
            religarePersonalLastname: new FormControl(''),
            religarePersonalGender: ['', Validators.compose([Validators.required])],
            religarePersonalDob: ['', Validators.compose([Validators.required])],
            religarePersonalGst: ['', Validators.compose([Validators.minLength(15)])],
            religarePersonalAddress: ['', Validators.required],
            religarePersonalAddress2: '',
            religarePersonalPincode: ['', Validators.required],
            religarePersonalCity: ['', Validators.required],
            religarePersonalState: ['', Validators.required],
            religarePersonalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            religarePersonalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],

        });
        this.nomineeDetails = this.fb.group({
            'religareTravelNomineeName': ['', Validators.required],
            'religareTravelRelationship': ['', Validators.required]
        });


    }

    // title change function
    changeGender() {
        if (this.religarePersonal.controls['religarePersonalTitle'].value == 'MR') {
            this.religarePersonal.controls['religarePersonalGender'].patchValue('Male');
        } else {
            this.religarePersonal.controls['religarePersonalGender'].patchValue('Female');
        }
    }

    //  Title change Function in insured
    insureChangeGender(index) {
        if (this.insureReligareArray['controls'].items['controls'][index]['controls'].insurerReligareTitle.value == 'MR') {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].insurerReligareGender.patchValue('Male');
        } else {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].insurerReligareGender.patchValue('Female');
        }
    }

    // accept only character
    public typeValidate(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // accept only number
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    ngOnInit() {
        // this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        console.log(this.getTravelPremiumList, 'this.getTravelPremiumList');
        this.insureReligarePerson = [{'type': 'self', 'age': '27'},
            {'type': 'Spouse', 'age': '30'}];
        console.log(this.insureReligarePerson, 'this.insureReligarePerson');
        this.insureReligareArray = this.fb.group({
            items: this.fb.array([])
        });
        this.enquiryId = sessionStorage.enquiryId;

        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.items = this.insureReligareArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureReligareArray['controls'].items['controls'][i]['controls'].type.setValue(this.insureReligarePerson[i].type);
        }
        console.log(this.insureReligareArray, 'insureReligareArray');
        console.log(this.items, 'items');
        this.RelationShipListTravel();
        this.religareTravelQuestions();
        this.sessionData();
    }

    setStep(index: number) {
        this.step = index;
    }

    quesback() {
        this.back = false;
        console.log(this.back);
    }


    prevStep() {
        this.step--;
    }

    // insure page

    initItemRows() {
        return this.fb.group(
            {
                insurerReligareTitle: ['', Validators.required],
                insurerReligareFirstName: new FormControl(''),
                insurerReligareLastName: new FormControl(''),
                insurerReligareDob: ['', Validators.required],
                insurerReligareGender: ['', Validators.compose([Validators.required])],
                insurerRelationship: ['', Validators.required],
                insurerDobError: '',
                insurerDobValidError: '',
                insurerReligareGst: ['', Validators.compose([Validators.minLength(15)])],
                insurerReligareAddress: ['', Validators.required],
                insurerReligareAddress2: '',
                insurerReligarePincode: ['', Validators.required],
                insurerReligareCity: ['', Validators.required],
                insurerReligareState: ['', Validators.required],
                insurerReligareEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                insurerReligareMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                type: '',
                ins_age: ''
            }
        );
    }

// dob validation
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.religareTravelproposerAge = '';
            let dob = '';
            console.log(event.value, 'event.value._i');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (type == 'insurer') {
                        //  this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
                    } else {
                        console.log('dsdfdfsddsf');
                        this.personalDobError = '';
                    }

                } else {
                    if (type == 'insurer') {
                        //  this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('Enter Valid Date');
                    } else {
                        this.personalDobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob, 'dob');
                if (selectedDate.length == 10) {
                    console.log('ui');
                    this.religareTravelproposerAge = this.ageCalculate(dob);
                    console.log(this.religareTravelproposerAge, ' this.religareTravelproposerAge');

                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.religareTravelproposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';
            }
            console.log(this.religareTravelproposerAge, ' this.religareTravelproposerAge ');


            if (this.religareTravelproposerAge && type == 'insurer') {
                console.log(dob, 'dobdob');
                //  this.insureReligareArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(dob);
                //  this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
            } else {
                sessionStorage.proposerAgeReligareTravel = this.religareTravelproposerAge;
            }

        }
    }

    // age calculation
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
// dob insurer
    addEventInsurer(event,  i, type) {
        if (event.value != null) {
            let selectedDate = '';
            let dob = '';
            this.getAge = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                } else {
                    this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            } else if (typeof event.value._i == 'object') {

                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob, 'dob11');

                if (dob.length == 10) {
                    this.getAge = this.ageCalculateInsurer(dob);
                }

            }
            // if (this.getAge) {
            console.log(this.getAge, 'newwagee11');
            console.log(dob, 'dob2');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareDob.patchValue(dob);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
            this.ageValidationInsurer(i, type);
            // }

        }
        sessionStorage.InsurerAgeReligareTravel = this.getAge;


    }
    ageCalculateInsurer(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring(8, 10), 10);
        let monthThen = parseInt(mdate.substring(5, 7), 10);
        let dayThen = parseInt(mdate.substring(0, 4), 10);
        let todays = new Date();
        let birthday = new Date(dayThen, monthThen - 1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        let day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);
        let month_age = Math.floor(day_age/30);
        console.log(month_age, 'month_agepppp');
        return month_age;
    }
    ageValidationInsurer(i, type) {
        if(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_age.value < 5) {
            this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insurer Date of birth date should be atleast 5 months old');
        } else {
            this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
    }
    //
    public dobkeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    // postal code in religareproposal
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
        console.log(this.title, 'kjhjkghkhk');
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalSuccess(successData);
                },
                (error) => {
                    this.getpostalFailure(error);
                }
            );
        }
    }

    public getpostalSuccess(successData) {
        if (successData.IsSuccess) {
            if (this.title == 'personal') {
                this.personalTravelCitys = [];
                this.responseReligareTravel = successData.ResponseObject;
                this.religarePersonal.controls['religarePersonalState'].setValue(this.responseReligareTravel[0].state);
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.religarePersonal.controls['religarePersonalState'].setValue('');
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
            if (this.title == 'residence') {
                this.personalTravelResCitys = [];
                this.responseReligareTravel = successData.ResponseObject;
                this.religarePersonal.controls['religarePersonalPState'].setValue(this.responseReligareTravel[0].state);
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelResCitys.push({city: this.responseReligareTravel[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.religarePersonal.controls['religarePersonalPState'].setValue('');
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelResCitys.push({city: this.responseReligareTravel[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
        }
    }

    public getpostalFailure(error) {
        console.log(error);
    }

    getPostalInsurer(pin, i, title) {
        alert();
        this.pin = pin;
        console.log(this.pin, 'this.pin');
        this.title = title;
        this.index = i;
        console.log(this.title, 'kjhjkghkhk');
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        console.log(data, 'datadata');
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
                (successData) => {
                    this.getpostalInsureSuccess(successData);
                },
                (error) => {
                    this.getpostalInsureFailure(error);
                }
            );
        }
    }

    public getpostalInsureSuccess(successData) {
        if (successData.IsSuccess) {
            if (this.title == 'insurer') {
                this.iPersonalCitys = [];
                this.response = successData.ResponseObject;
                this.religarePersonal.controls['religarePersonalState'].setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.iPersonalCitys.push({city: this.response[i].city});
                }
                console.log(this.iPersonalCitys, 'this.iPersonalCitys ');
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].insurerReligareState.setValue(this.response[0].state);
            }
        } else if (successData.IsSuccess != true) {
            this.toastr.error('In valid Pincode');
            this.religarePersonal.controls['religarePersonalState'].setValue('');
            for (let i = 0; i < this.response.length; i++) {
                this.iPersonalCitys.push({city: this.response[i].city = ''});
            }
            this.insureReligareArray['controls'].items['controls'][this.index]['controls'].insurerReligareState.setValue('');

        }
    }

    public getpostalInsureFailure(error) {
        console.log(error);
    }


// RelationShip List
    RelationShipListTravel() {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pos_status': '0'
        };
        this.travelservice.religareTravelRelationshipList(data).subscribe(
            (successData) => {
                this.relationShipSuccess(successData);
            },
            (error) => {
                this.relationShipFailure(error);
            }
        );
    }

    public relationShipSuccess(successData) {
        if (successData.IsSuccess) {
            this.insuretravelRelationList = successData.ResponseObject;

        }
    }

    public relationShipFailure(error) {
        console.log(error);
    }

    // OuestionList
    changereligareTravelQuestions(value, index) {
        console.log(index, 'index');
        if (index == 0) {
            if (value.checked) {
                for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                    if (this.religareTravelQuestionsList[i].main_qustion == 1) {
                        console.log('in');
                        this.religareTravelQuestionsList[i].showQuesion = true;
                    }
                }
            } else {
                for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                    if (this.religareTravelQuestionsList[i].main_qustion == 1) {
                        this.religareTravelQuestionsList[i].showQuesion = false;
                    }
                }
            }
        }
        console.log(this.religareTravelQuestionsList, 'this.religareTravelQuestionsLis');


    }

    religareTravelQuestions() {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pos_status': '0'
        };
        this.travelservice.religareTravelQuestionList(data).subscribe(
            (successData) => {
                this.religareTravelQuestionsSuccess(successData);
            },
            (error) => {
                this.religareTravelQuestionsFailure(error);
            }
        );

    }

    public religareTravelQuestionsSuccess(successData) {
        if (successData.IsSuccess) {
            this.religareTravelQuestionsList = successData.ResponseObject;
            for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
                // this.religareTravelQuestionsList[i].main_qustion = '0';
                this.religareTravelQuestionsList[i].checked = false;
                if (this.religareTravelQuestionsList[i].main_qustion == 0) {
                    this.religareTravelQuestionsList[i].showQuesion = true;
                }
            }
        }
    }

    public religareTravelQuestionsFailure(error) {
        console.log(error);
    }

// proposal 1 page
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.ReligareTravelDetails1 = '';
        sessionStorage.ReligareTravelDetails1 = JSON.stringify(value);
        this.personalReligareTravelData = value;
        console.log(this.personalReligareTravelData, 'first');
        console.log(this.religarePersonal.valid, 'this.religarePersonal.valid');
        if (this.religarePersonal.valid) {
            if (sessionStorage.proposerAgeReligareTravel >= 18) {
                stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

    // insured page
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.ReligareTravelDetails2 = '';
        sessionStorage.ReligareTravelDetails2 = JSON.stringify(value);
        this.insurerData = value;
        console.log(value, 'ffffflll');
        this.proposerInsureData = [];
        this.totalReligareData = [];
        this.proposerInsureData.push(this.personalReligareTravelData);
        if (this.insureReligareArray.valid) {
            for (let i = 0; i < this.insureReligarePerson.length; i++) {
                this.insurerData.items[i].type = this.insureReligarePerson[i].type;
            }
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.proposerInsureData.push(this.insurerData.items[i]);
            }

            for (let i = 0; i < this.proposerInsureData.length; i++) {
                this.totalReligareData.push({
                    'title': this.proposerInsureData[i].insurerReligareTitle,
                    'proposer_fname': this.proposerInsureData[i].insurerReligareFirstName,
                    'proposer_lname': this.proposerInsureData[i].insurerReligareLastName,
                    'prop_email_list': [{
                        'email': this.proposerInsureData[i].insurerReligareEmail,
                        'email_type': 'PERSONAL'
                    }],
                    'prop_contact_list': [{
                        'contact_no': this.proposerInsureData[i].insurerReligareMobile,
                        'contact_type': 'MOBILE',
                        'std_code': '91'
                    }],
                    'prop_identity_list': [
                        {
                            'identity_number': this.proposerInsureData[i].insurerReligareGst,
                            'identity_type': this.proposerInsureData[i].insurerReligareGst != '' ? 'GST' : ''
                        }
                    ],
                    'proposer_res_address1': this.proposerInsureData[i].residenceAddress,
                    'proposer_res_address2': this.proposerInsureData[i].residenceAddress2,
                    'proposer_res_area': this.proposerInsureData[i].residenceCity,
                    'proposer_res_city': this.proposerInsureData[i].residenceCity,
                    'proposer_res_state': this.proposerInsureData[i].residenceState,
                    'proposer_res_pincode': this.proposerInsureData[i].residencePincode,
                    'proposer_comm_address1': this.proposerInsureData[i].insurerReligareAddress,
                    'proposer_comm_address2': this.proposerInsureData[i].insurerReligareAddress2,
                    'proposer_comm_area': this.proposerInsureData[i].insurerReligareCity,
                    'proposer_comm_city': this.proposerInsureData[i].insurerReligareCity,
                    'proposer_comm_state': this.proposerInsureData[i].insurerReligareState,
                    'proposer_comm_pincode': this.proposerInsureData[i].insurerReligarePincode,
                    'prop_dob': this.proposerInsureData[i].insurerReligareDob,
                    'prop_gender': this.proposerInsureData[i].insurerReligareGender,
                });
            }
            if (sessionStorage.InsurerAgeReligareTravel >= 5) {
                stepper.next();
            } else {
                this.toastr.error('Insured age should be 5 Month or above');
            }

        }
    }



// Medical Details
    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.ReligareTravelDetails3 = '';
        sessionStorage.ReligareTravelDetails3 = JSON.stringify(this.religareTravelQuestionsList);
        console.log( sessionStorage.ReligareTravelDetails3 , ' sessionStorage.ReligareTravelDetails3 ');
        this.partyQuestionDOList = [];
        stepper.next();

        let count = 0;
        for (let i = 0; i < this.religareTravelQuestionsList.length; i++) {
            if (this.religareTravelQuestionsList[i].checked == true) {
                count++;
                this.partyQuestionDOList.push({
                    'questionCd': this.religareTravelQuestionsList[i].question_code,
                    'questionSetCd': this.religareTravelQuestionsList[i].question_name,
                    'response': this.religareTravelQuestionsList[i].checked ? 'YES' : 'NO'
                });
            }
        }
        console.log(count, 'countcount');

        for (let i = 0; i < this.totalReligareData.length; i++) {
            this.totalReligareData[i].medical_status =  this.partyQuestionDOList.response ? 'Yes' : 'No'
        }

        console.log(this.partyQuestionDOList, ' this.getFilterData ');

    }

    // Nominee Details

    religareNomineeDetails(stepper: MatStepper, value) {
        console.log(value);
        if (this.nomineeDetails.valid) {
            sessionStorage.ReligareTravelNomineeDetails = '';
            sessionStorage.ReligareTravelNomineeDetails = JSON.stringify(value);
            this.religareTravelproposal();
        }
        this.lastStepper = stepper;

    }

// proposal Creation Page
    religareTravelproposal() {
        const data = {
            'platform': 'web',
            'proposal_id': '0',
            'enquiry_id': this.enquiryId,
            'group_name': 'Group A',
            'company_name': 'Religare',
            'suminsured_amount': '',
            'proposer_insurer_details': this.totalReligareData,
            'plan_id': '',
            'policy_term': '',
            'scheme_id': '',
            'terms_condition': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'nominee_name': this.nomineeDetails.controls['religareTravelNomineeName'].value,
            'nominee_relationship': this.nomineeDetails.controls['religareTravelRelationship'].value,
            'medical_status': this.partyQuestionDOList.includes('Yes') ? 'Yes' : 'No'
        };
        console.log(data, 'fghj');


        // this.settings.loadingSpinner = true;
        this.proposalservice.getReligareProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );

    }

    public proposalSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;

            console.log(this.summaryData, 'this.summaryData,this.summaryDatathis.summaryDatathis.summaryDatathis.summaryData');
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalTravelID = this.proposalId;
            //console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error){

    }


// sessionData
    sessionData() {
        if (sessionStorage.ReligareTravelDetails1 != '' && sessionStorage.ReligareTravelDetails1 != undefined) {
            console.log(JSON.parse(sessionStorage.ReligareTravelDetails1), 'sessionStorage.ReligareTravelDetails1');
            this.religareTravel1 = JSON.parse(sessionStorage.ReligareTravelDetails1);
            if (this.religareTravel1.religarePersonalPincode != '') {
                this.getPostal(this.religareTravel1.religarePersonalPincode, 'personal');
            }
            this.religarePersonal = this.fb.group({
                religarePersonalTitle: this.religareTravel1.religarePersonalTitle,
                religarePersonalFirstname: this.religareTravel1.religarePersonalFirstname,
                religarePersonalLastname: this.religareTravel1.religarePersonalLastname,
                religarePersonalDob: new FormControl(new Date(this.religareTravel1.religarePersonalDob)),
                religarePersonalGender: this.religareTravel1.religarePersonalGender,
                religarePersonalAddress: this.religareTravel1.religarePersonalAddress,
                religarePersonalAddress2: this.religareTravel1.religarePersonalAddress2,
                religarePersonalPincode: this.religareTravel1.religarePersonalPincode,
                religarePersonalCity: this.religareTravel1.religarePersonalCity,
                religarePersonalState: this.religareTravel1.religarePersonalState,
                religarePersonalEmail: this.religareTravel1.religarePersonalEmail,
                religarePersonalMobile: this.religareTravel1.religarePersonalMobile,
                religarePersonalGst: this.religareTravel1.religarePersonalGst
            });

        }
        if (sessionStorage.ReligareTravelDetails2 != '' && sessionStorage.ReligareTravelDetails2 != undefined) {
            console.log(JSON.parse(sessionStorage.ReligareTravelDetails2), 'sessionStorage');
            this.religareTravel2 = JSON.parse(sessionStorage.ReligareTravelDetails2);
            console.log( this.religareTravel2, 'this.religareTravel2');
            // if (this.religareTravel2.religarePersonalPincode != '') {
            //     this.getPostalInsurer(this.religareTravel2.insurerReligarePincode,'i', 'insurer');
            //
            // }
            for (let i = 0; i < this.religareTravel2.items.length; i++) {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareTitle.patchValue(this.religareTravel2.items[i].insurerReligareTitle);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareFirstName.patchValue(this.religareTravel2.items[i].insurerReligareFirstName);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareLastName.patchValue(this.religareTravel2.items[i].insurerReligareLastName);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareGender.patchValue(this.religareTravel2.items[i].insurerReligareGender);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareDob.patchValue(this.religareTravel2.items[i].insurerReligareDob);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerRelationship.patchValue(this.religareTravel2.items[i].insurerRelationship);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareGst.patchValue(this.religareTravel2.items[i].insurerReligareGst);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareAddress.patchValue(this.religareTravel2.items[i].insurerReligareAddress);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligarePincode.patchValue(this.religareTravel2.items[i].insurerReligarePincode);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareCity.patchValue(this.religareTravel2.items[i].insurerReligareCity);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareState.patchValue(this.religareTravel2.items[i].insurerReligareState);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareEmail.patchValue(this.religareTravel2.items[i].insurerReligareEmail);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerReligareMobile.patchValue(this.religareTravel2.items[i].insurerReligareMobile);
            }

            if (sessionStorage.ReligareTravelDetails3 != '' && sessionStorage.ReligareTravelDetails3 != undefined) {
                console.log(JSON.parse(sessionStorage.ReligareTravelDetails3), 'sessionStorage.proposal3Detail');
                this.religareTravelQuestionsList = JSON.parse(sessionStorage.ReligareTravelDetails3);
                console.log(this.religareTravelQuestionsList, 'sessionStorage.this.personalAccidentQuestionsList');

            } else {
                this.religareTravelQuestions();
            }
            if (sessionStorage.ReligareTravelNomineeDetails != '' && sessionStorage.ReligareTravelNomineeDetails != undefined) {
                console.log(JSON.parse(sessionStorage.ReligareTravelNomineeDetails), 'sessionStorage.ReligareTravelNomineeDetails');
                this.getReligareTravelNomineeData = JSON.parse(sessionStorage.ReligareTravelNomineeDetails);
                this.nomineeDetails = this.fb.group({
                    religareTravelNomineeName: this.getReligareTravelNomineeData.religareTravelNomineeName,
                    religareTravelRelationship: this.getReligareTravelNomineeData.religareTravelRelationship
                });
            }
            if (sessionStorage.ReligareTravelProposalID != '' && sessionStorage.ReligareTravelProposalID != undefined) {
                this.religareTravelProposalID = sessionStorage.ReligareTravelProposalID;
                console.log(this.religareTravelProposalID, 'this.religarePAProposal');
            }
        }
    }
}



