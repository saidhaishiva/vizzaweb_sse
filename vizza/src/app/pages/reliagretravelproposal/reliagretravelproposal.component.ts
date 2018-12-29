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
    public rPersonalCitys: any;
    public responseres: any;
public productid: any;
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
            title: ['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            gst: ['', Validators.compose([Validators.minLength(15)])],
            address1: ['', Validators.required],
            address2: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            raddress1: ['', Validators.required],
            raddress2: '',
            rpincode: ['', Validators.required],
            rcity: ['', Validators.required],
             rstate: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            rolecd: 'PROPOSER',


        });
        this.nomineeDetails = this.fb.group({
            'religareTravelNomineeName': ['', Validators.required],
            'religareTravelRelationship': ['', Validators.required]
        });


    }

    // title change function
    changeGender() {
        if (this.religarePersonal.controls['title'].value == 'MR') {
            this.religarePersonal.controls['gender'].patchValue('Male');
        } else {
            this.religarePersonal.controls['gender'].patchValue('Female');
        }
    }

    //  Title change Function in insured
    insureChangeGender(index) {
        if (this.insureReligareArray['controls'].items['controls'][index]['controls'].title.value == 'MR') {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].gender.patchValue('Male');
        } else {
            this.insureReligareArray['controls'].items['controls'][index]['controls'].gender.patchValue('Female');
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
        this.getTravelPremiumList = JSON.parse(sessionStorage.travelPremiumList);
        console.log(this.getTravelPremiumList, 'this.getTravelPremiumList');
        this.insureReligarePerson =  this.getTravelPremiumList.family_details;
        console.log(this.insureReligarePerson, 'this.insureReligarePerson');
        this.insureReligareArray = this.fb.group({
            items: this.fb.array([])
        });

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
                title: ['', Validators.required],
                firstname: new FormControl(''),
                lastname: new FormControl(''),
                dob: ['', Validators.required],
                gender: ['', Validators.compose([Validators.required])],
                relationship: ['', Validators.required],
                insurerDobError: '',
                insurerDobValidError: '',
                gst: ['', Validators.compose([Validators.minLength(15)])],
                address1: ['', Validators.required],
                address2: '',
                pincode: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                raddress1: ['', Validators.required],
                raddress2: '',
                rpincode: ['', Validators.required],
                rcity: ['', Validators.required],
                rstate: ['', Validators.required],
                email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                type: '',
                rolecd: 'PRIMARY',
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
            this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
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
                this.religarePersonal.controls['state'].setValue(this.responseReligareTravel[0].state);
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.religarePersonal.controls['state'].setValue('');
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
            if (this.title == 'residence') {
                this.personalTravelResCitys = [];
                this.responseReligareTravel = successData.ResponseObject;
                this.religarePersonal.controls['rstate'].setValue(this.responseReligareTravel[0].state);
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelResCitys.push({city: this.responseReligareTravel[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.religarePersonal.controls['rstate'].setValue('');
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
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.iPersonalCitys.push({city: this.response[i].city});
                }
                console.log(this.iPersonalCitys, 'this.iPersonalCitys ');
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue(this.response[0].state);
            } else if (successData.IsSuccess != true) {
                this.toastr.error('In valid Pincode');
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue('');
                for (let i = 0; i < this.response.length; i++) {
                    this.iPersonalCitys.push({city: this.response[i].city = ''});
                }
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].state.setValue('');

            }
            if(this.title == 'permment') {
                this.rPersonalCitys = [];
                this.responseres = successData.ResponseObject;
                console.log(this.responseres, 'this.responseres');
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue(this.responseres[0].state);
                for (let i = 0; i < this.responseres.length; i++) {
                    this.rPersonalCitys.push({city: this.responseres[i].city});
                }
                console.log(this.rPersonalCitys, 'this.iPersonalCitys ');
            } else if (successData.IsSuccess != true) {
                this.toastr.error('In valid Pincode');
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue('');
                for (let i = 0; i < this.responseres.length; i++) {
                    this.rPersonalCitys.push({city: this.responseres[i].city = ''});
                }
                this.insureReligareArray['controls'].items['controls'][this.index]['controls'].rstate.setValue('');

            }
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
        console.log(this.insurerData, 'this.insurerData');
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

            console.log(this.proposerInsureData, 'this.proposerInsureData9');


            for (let i = 0; i < this.proposerInsureData.length; i++) {
                this.totalReligareData.push({
                    'title': this.proposerInsureData[i].title,
                    'proposer_fname': this.proposerInsureData[i].firstname,
                    'proposer_lname': this.proposerInsureData[i].lastname,
                    'prop_email_list': [{
                        'email': this.proposerInsureData[i].email,
                        'email_type': 'PERSONAL'
                    }],
                    'prop_contact_list': [{
                        'contact_no': this.proposerInsureData[i].mobile,
                        'contact_type': 'MOBILE',
                        'std_code': '91'
                    }],
                    'prop_identity_list': [
                        {
                            'identity_number': this.proposerInsureData[i].gst,
                            'identity_type': this.proposerInsureData[i].religarePersonalGst != '' ? 'GST' : ''
                        }
                    ],
                    'proposer_res_address1': this.proposerInsureData[i].address1,
                    'proposer_res_address2': this.proposerInsureData[i].address2,
                    'proposer_res_area': this.proposerInsureData[i].city,
                    'proposer_res_city': this.proposerInsureData[i].city,
                    'proposer_res_state': this.proposerInsureData[i].state,
                    'proposer_res_pincode': this.proposerInsureData[i].pincode,
                    'proposer_comm_address1': this.proposerInsureData[i].raddress1,
                    'proposer_comm_address2': this.proposerInsureData[i].raddress2,
                    'proposer_comm_area': this.proposerInsureData[i].rcity,
                    'proposer_comm_city': this.proposerInsureData[i].rcity,
                    'proposer_comm_state': this.proposerInsureData[i].rstate,
                    'proposer_comm_pincode': this.proposerInsureData[i].rpincode,
                    'prop_dob': this.datepipe.transform(this.proposerInsureData[i].dob, 'MMM d, y'),
                    'prop_gender': this.proposerInsureData[i].gender,
                    'relationship_cd': this.proposerInsureData[i].type,
                    'role_cd': 'PROPOSER'
                });
            }
            let ageValidate = [];
            for (let i = 0; i < this.insurerData.items.length; i++) {
                if (this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.value != '') {
                    ageValidate.push(1);
                } else if (this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobError.value == '') {
                    ageValidate.push(2);
                }
            }
            if (ageValidate.includes(1)) {
                this.toastr.error('Insurer Date of birth date should be atleast 5 months old');
            } else if (ageValidate.includes(2)) {
                stepper.next();

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
                'product_id': this.getTravelPremiumList.product_id,
                'enquiry_id': this.getTravelPremiumList.enquiry_id,
                'trip_start_on': this.getTravelPremiumList.start_date,
                'trip_end_on': this.getTravelPremiumList.end_date,
                'group_name': 'Group A',
                'coverType': 'INDIVIDUAL',
                'businessTypeCd': 'NEWBUSINESS',
                'baseAgentId': '40001007',
                'trip_type': '40001007',
                'company_name': this.getTravelPremiumList.company_name,
                'suminsured_amount': this.getTravelPremiumList.suminsured_amount,
                'proposer_insurer_details': this.totalReligareData,
                'fieldAgree': 'YES',
                'fieldAlerts': 'YES',
                'fieldTc': 'YES',
                'field20': '10',
                'tripStart': 'YES',
               'travel_geography_code': '',
                'plan_id': this.getTravelPremiumList.plan_id,
                'policy_term':this.getTravelPremiumList.policy_term,
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
            this.travelservice.createReligareTravelProposal(data).subscribe(
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
            if (this.religareTravel1.pincode != '') {
                this.getPostal(this.religareTravel1.pincode, 'personal');
            }
            this.religarePersonal = this.fb.group({
                title: this.religareTravel1.title,
                firstname: this.religareTravel1.firstname,
                lastname: this.religareTravel1.lastname,
                dob: new FormControl(new Date(this.religareTravel1.dob)),
                gender: this.religareTravel1.gender,
                address1: this.religareTravel1.address1,
                address2: this.religareTravel1.address2,
                pincode: this.religareTravel1.pincode,
                city: this.religareTravel1.city,
                state: this.religareTravel1.state,
                raddress1: this.religareTravel1.raddress1,
                raddress2: this.religareTravel1.raddress2,
                rpincode: this.religareTravel1.rpincode,
                rcity: this.religareTravel1.rcity,
                rstate: this.religareTravel1.rstate,
                email: this.religareTravel1.email,
                mobile: this.religareTravel1.mobile,
                gst: this.religareTravel1.gst
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
                this.insureReligareArray['controls'].items['controls'][i]['controls'].title.patchValue(this.religareTravel2.items[i].title);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.religareTravel2.items[i].firstname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.religareTravel2.items[i].lastname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].gender.patchValue(this.religareTravel2.items[i].gender);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.religareTravel2.items[i].dob);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.religareTravel2.items[i].relationship);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].gst.patchValue(this.religareTravel2.items[i].gst);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].address1.patchValue(this.religareTravel2.items[i].address1);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].pincode.patchValue(this.religareTravel2.items[i].pincode);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].city.patchValue(this.religareTravel2.items[i].city);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].state.patchValue(this.religareTravel2.items[i].state);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].email.patchValue(this.religareTravel2.items[i].email);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].mobile.patchValue(this.religareTravel2.items[i].mobile);
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



