import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {HealthService} from '../../shared/services/health.service';
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
  selector: 'app-travel-reliagre-proposal',
  templateUrl: './travel-religare-proposal.component.html',
  styleUrls: ['./travel-religare-proposal.component.scss'],
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
    public acceptSummaryDeclaration: boolean;

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
    public webhost: any;
public productid: any;
public getallTravelPremiumList: any;
public questions_list: any;
public questionsListTravel: any;
public inputReadonly: boolean;
public studentdetails: boolean;
public isDisable: boolean;
public religare_Travel_proposal_id: any;
public sameinsure: any;
public allLists: any;
public addon: any;

    constructor(public travelservice: TravelService,public validation: ValidationService, public proposalservice: HealthService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.arr = [];
        this.sameinsure = false;
        this.studentdetails = false;
        this.inputReadonly = false;
    this.isDisable = false;
        this.acceptSummaryDeclaration = false;
        this.webhost = this.config.getimgUrl();
        this.religare_Travel_proposal_id ='0';
        this.religarePersonal = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            passport: ['', Validators.compose([Validators.minLength(10)])],
            address1: ['', Validators.required],
            address2: '',
            pincode: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            raddress1: ['', Validators.required],
            raddress2: '',
            pannumber: '',
            adharnumber: '',
            phone: '',
            sameAsProposer:false,
            rpincode: ['', Validators.required],
            rcity: ['', Validators.required],
             rstate: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            rolecd: 'PROPOSER',
            sponserdob: '',
            sponsername: '',
            universityname: '',
            universityaddress: '',
            guidetitle: '',
            guidefirstname: '',
            guidelastname: '',
            guideAddress: '',
            coursedetails: '',
            studentRelationShip: '',
            addon:''
        });
        this.nomineeDetails = this.fb.group({
            'religareTravelNomineeName': '',
            'religareTravelRelationship': ''
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
        this.allLists = JSON.parse(sessionStorage.allTravelPremiumLists);
        this.getallTravelPremiumList = this.allLists[sessionStorage.changedTabIndex];
        console.log(this.getTravelPremiumList, 'this.getTravelPremiumList');
        if(this.allLists[0].insurance_type == 'Student'){
            this.studentdetails = true;
        } else {
            this.studentdetails = false;

        }
        this.insureReligarePerson =  this.allLists[0].family_members;
        console.log(this.insureReligarePerson, 'this.insureReligarePerson');
        this.insureReligareArray = this.fb.group({
            items: this.fb.array([])
        });

        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.items = this.insureReligareArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureReligareArray['controls'].items['controls'][i]['controls'].type.patchValue(this.insureReligarePerson[i].type);
        }

        console.log(this.insureReligareArray, 'insureReligareArray');
        console.log(this.items, 'items');
        this.RelationShipListTravel();
        this.religareTravelQuestions();
        this.sessionData();
        this.getAddon();
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
                passport: ['', Validators.compose([Validators.minLength(10)])],
                address1: ['', Validators.required],
                address2: '',
                pincode: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                raddress1: ['', Validators.required],
                raddress2: '',
                pannumber: '',
                adharnumber: '',
                sameAsInsurer: false,
                sameAsInsuredProposer: false,
                rpincode: ['', Validators.required],
                rcity: ['', Validators.required],
                rstate: ['', Validators.required],
                email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
                mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                type: '',
                phone: '',
                sameasreadonly:false,
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
                    this.personalDobError = '';

                } else {
                    this.personalDobError = 'Enter Valid Date';
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
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.religareTravelproposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';
            }
            console.log(this.religareTravelproposerAge, ' this.religareTravelproposerAge ');

            sessionStorage.proposerAgeReligareTravel = this.religareTravelproposerAge;
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
            if (this.getAge) {
            console.log(this.getAge, 'newwagee11');
            console.log(dob, 'dob2');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.getAge);
            this.ageValidationInsurer(i, type);
            }

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
        if(value.checked){
            this.religareTravelQuestionsList[index].status = 'Yes';
        } else {
            this.religareTravelQuestionsList[index].status = 'No';

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
                this.religareTravelQuestionsList[i].status = 'No';
                if (this.religareTravelQuestionsList[i].main_qustion == 0) {
                    this.religareTravelQuestionsList[i].showQuesion = true;
                }
            }
        }
    }

    public religareTravelQuestionsFailure(error) {
        console.log(error);
    }

// star-health-proposal 1 page
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
        console.log(  this.personalReligareTravelData,'  kjhkjgkj');
        for (let i = 0; i < this.insureReligarePerson.length; i++) {
            this.personalReligareTravelData.type = this.insureReligarePerson[i].type;
        }
        console.log( this.personalReligareTravelData, ' tlllllllllllllllllllllllllllllll');
        this.proposerInsureData.push(this.personalReligareTravelData);
        if (this.insureReligareArray.valid) {
            console.log(this.insureReligareArray,'this.insureReligareArraythis.insureReligareArray');
            for (let i = 0; i < this.insureReligarePerson.length; i++) {
                this.insurerData.items[i].type = this.insureReligarePerson[i].type;
            }
            console.log(this.insurerData, 'insurerDatainsurerData');
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
                            'identity_number': this.proposerInsureData[i].passport,
                            'identity_type': this.proposerInsureData[i].religarePersonalpassport != '' ? 'passport' : ''
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
                    'prop_dob': this.datepipe.transform(this.proposerInsureData[i].dob, 'dd/MM/yyyy'),
                    'prop_gender': this.proposerInsureData[i].gender,
                    'relationship_cd': this.proposerInsureData[i].type == "Student1" ? 'Self' : this.proposerInsureData[i].type,
                    'role_cd': this.proposerInsureData[i].rolecd
                });
            }
            console.log( this.totalReligareData, ' this.totalReligareData this.totalReligareData this.totalReligareData');
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
    sameAddress(values){
    if ( this.religarePersonal.controls['sameAsProposer'].value) {
        this.inputReadonly = true;
        this.sameinsure = values.checked;
        this.religarePersonal.controls['raddress1'].patchValue(this.religarePersonal.controls['address1'].value);
        this.religarePersonal.controls['raddress2'].patchValue(this.religarePersonal.controls['address2'].value);
        this.religarePersonal.controls['rcity'].patchValue(this.religarePersonal.controls['city'].value);
        this.religarePersonal.controls['rpincode'].patchValue(this.religarePersonal.controls['pincode'].value);
        this.religarePersonal.controls['rstate'].patchValue(this.religarePersonal.controls['state'].value);

    } else {
        this.inputReadonly = false;
        this.religarePersonal.controls['raddress1'].patchValue('');
        this.religarePersonal.controls['raddress2'].patchValue('');
        this.religarePersonal.controls['rcity'].patchValue('');
        this.religarePersonal.controls['rpincode'].patchValue('');
        this.religarePersonal.controls['rstate'].patchValue('');

    }

}
    sameInsureAddress(values,i){
        if( this.insureReligareArray['controls'].items['controls'][i]['controls'].sameAsInsurer.value){
            this.getPostal(this.religareTravel1.pincode, 'personal');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].raddress1.patchValue(this.insureReligareArray['controls'].items['controls'][i]['controls'].address1.value);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].raddress2.patchValue(this.insureReligareArray['controls'].items['controls'][i]['controls'].address2.value);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rpincode.patchValue(this.insureReligareArray['controls'].items['controls'][i]['controls'].pincode.value);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rcity.patchValue(this.insureReligareArray['controls'].items['controls'][i]['controls'].city.value);
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rstate.patchValue(this.insureReligareArray['controls'].items['controls'][i]['controls'].state.value);

        } else {
            this.insureReligareArray['controls'].items['controls'][i]['controls'].raddress1.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].raddress2.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rpincode.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rcity.patchValue('');
            this.insureReligareArray['controls'].items['controls'][i]['controls'].rstate.patchValue('');
        }
    }
    sameInsuredProposer(){

        if (this.insureReligareArray['controls'].items['controls'][0]['controls'].sameAsInsuredProposer.value) {
            console.log(this.insureReligareArray['controls'].items['controls'][0]['controls'].sameAsInsuredProposer.value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(true);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameAsInsurer.disable();

            this.insureReligareArray['controls'].items['controls'][0]['controls'].title.patchValue(this.religarePersonal.controls['title'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.religarePersonal.controls['firstname'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.religarePersonal.controls['lastname'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.religarePersonal.controls['dob'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].gender.patchValue(this.religarePersonal.controls['gender'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationship.patchValue('21');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].email.patchValue(this.religarePersonal.controls['email'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].mobile.patchValue(this.religarePersonal.controls['mobile'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].passport.patchValue(this.religarePersonal.controls['passport'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].raddress1.patchValue(this.religarePersonal.controls['raddress1'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].raddress2.patchValue(this.religarePersonal.controls['raddress2'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rpincode.patchValue(this.religarePersonal.controls['rpincode'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rcity.patchValue(this.religarePersonal.controls['rcity'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rstate.patchValue(this.religarePersonal.controls['rstate'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].address1.patchValue(this.religarePersonal.controls['address1'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].address2.patchValue(this.religarePersonal.controls['address2'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pincode.patchValue(this.religarePersonal.controls['pincode'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].city.patchValue(this.religarePersonal.controls['city'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].state.patchValue(this.religarePersonal.controls['state'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pannumber.patchValue(this.religarePersonal.controls['pannumber'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].adharnumber.patchValue(this.religarePersonal.controls['adharnumber'].value);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].phone.patchValue(this.religarePersonal.controls['phone'].value);
        } else {
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameasreadonly.patchValue(false);
            this.insureReligareArray['controls'].items['controls'][0]['controls'].sameAsInsurer.enable();

            this.insureReligareArray['controls'].items['controls'][0]['controls'].title.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].firstname.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].lastname.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].dob.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].gender.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].relationship.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].email.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].mobile.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].passport.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].raddress1.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].raddress2.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rpincode.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rcity.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].rstate.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].address1.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].address2.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pincode.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].city.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].state.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].pannumber.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].adharnumber.patchValue('');
            this.insureReligareArray['controls'].items['controls'][0]['controls'].phone.patchValue('');

        }
    }


// Medical Details
    medicalHistoryDetails(stepper: MatStepper) {
        sessionStorage.ReligareTravelDetails3 = '';
        sessionStorage.ReligareTravelDetails3 = JSON.stringify(this.religareTravelQuestionsList);
        console.log( sessionStorage.ReligareTravelDetails3 , ' sessionStorage.ReligareTravelDetails3 ');
       this.partyQuestionDOList = [];
       this.questionsListTravel = [];
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
            if(this.religareTravelQuestionsList[i].checked == true){
                count++;
                this.questionsListTravel.push({
                    'questionCd': this.religareTravelQuestionsList[i].question_code,
                    'questionSetCd': this.religareTravelQuestionsList[i].question_set_code,
                    'response': this.religareTravelQuestionsList[i].checked ? 'YES' : 'NO'
                });
            }
        }
        console.log(count, 'countcount');

        for (let i = 0; i < this.totalReligareData.length; i++) {
            this.totalReligareData[i].medical_status =  this.partyQuestionDOList.response ? 'Yes' : 'No'
        }

        for (let i = 0; i < this.totalReligareData.length; i++) {
            this.totalReligareData[i].questions_list =  this.questionsListTravel
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

// star-health-proposal Creation Page
    religareTravelproposal() {
            let mcondition = this.religareTravelQuestionsList.filter(data => data.status == 'Yes');
            const data = {
                'platform': 'web',
                'travel_type':this.allLists[0].insurance_type,
                'proposal_id': sessionStorage.religare_Travel_proposal_id ? sessionStorage.religare_Travel_proposal_id : this.religare_Travel_proposal_id,
                'product_id': this.getTravelPremiumList.product_id,
                'enquiry_id': this.getTravelPremiumList.enquiry_id,
                'trip_start_on': this.datepipe.transform( this.getTravelPremiumList.start_date , 'dd/MM/yyyy'),
                'trip_end_on': this.datepipe.transform( this.getTravelPremiumList.end_date , 'dd/MM/yyyy'),
                'group_name': 'Group A',
                'coverType': 'INDIVIDUAL',
                'businessTypeCd': 'NEWBUSINESS',
                'baseAgentId': '20572800',
                'baseProductId': this.getTravelPremiumList.plan_id,
                'trip_type': 'Single',
                'company_name': this.getTravelPremiumList.company_name,
                'suminsured_amount': this.getTravelPremiumList.suminsured_amount,
                'proposer_insurer_details': this.totalReligareData,
                'fieldAgree': 'YES',
                'fieldAlerts': 'YES',
                'fieldTc': 'YES',
                'field20': '10',
                'tripStart': 'YES',
                'travel_geography_code': this.getTravelPremiumList.geography_code,
                'maxTripPeriod':this.getTravelPremiumList.trip_duration,
                'plan_id': this.getTravelPremiumList.plan_id,
                'policy_term':this.getTravelPremiumList.trip_duration,
                'scheme_id': '',
                'terms_condition': '1',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                'nominee_name':this.nomineeDetails.controls['religareTravelNomineeName'].value,
                'nominee_relationship': this.nomineeDetails.controls['religareTravelNomineeName'].value,
                'medical_status': mcondition != '' ? 'Yes' : 'No',
                'sponser_dob':this.religarePersonal.controls['sponserdob'].value ? this.religarePersonal.controls['sponserdob'].value : '',
                'sponser_name':this.religarePersonal.controls['sponsername'].value ? this.religarePersonal.controls['sponsername'].value : '',
                'student_relationship': this.religarePersonal.controls['studentRelationShip'].value,
                'university_name':this.religarePersonal.controls['universityname'].value ? this.religarePersonal.controls['universityname'].value : '',
                'address':this.religarePersonal.controls['guideAddress'].value,
                'title':this.religarePersonal.controls['guidetitle'].value ? this.religarePersonal.controls['guidetitle'].value : '',
                'course_details':this.religarePersonal.controls['coursedetails'].value,
                'field11':'',
                'university_address':this.religarePersonal.controls['universityaddress'].value ? this.religarePersonal.controls['universityaddress'].value : '',
                'gfirstname':this.religarePersonal.controls['guidefirstname'].value ? this.religarePersonal.controls['guidefirstname'].value : '',
                'glastname':this.religarePersonal.controls['guidelastname'].value ? this.religarePersonal.controls['guidelastname'].value : '',
                'addons': this.religarePersonal.controls['addon'].value ?  this.religarePersonal.controls['addon'].value :'',

            };

            console.log(data, 'fghj');


            this.settings.loadingSpinner = true;
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
            sessionStorage.religare_Travel_proposal_id = this.proposalId;
            //console.log(this.proposalId, 'this.summaryDatathis.summaryDatathis.summaryData');
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error){

    }
    getAddon() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',

        }

        this.travelservice.addOn(data).subscribe(
            (successData) => {
                this.AddonSuccess(successData);
            },
            (error) => {
                this.AddonFailure(error);
            }
        );
    }

    public AddonSuccess(successData) {
        if (successData.IsSuccess) {
            this.addon = successData.ResponseObject;
            console.log(this.addon, 'this.addon');
        }
    }

    public AddonFailure(error) {
        console.log(error);
    }
    addonItem(event: any, i){
        if (event.checked) {

        } else {

        }
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
                pannumber: this.religareTravel1.pannumber,
                adharnumber: this.religareTravel1.adharnumber,
                email: this.religareTravel1.email,
                sameAsProposer: this.religareTravel1.sameAsProposer,
                sponserdob:  new FormControl(new Date(this.religareTravel1.sponserdob)),
                sponsername: this.religareTravel1.sponsername,
                universityname: this.religareTravel1.universityname,
                universityaddress: this.religareTravel1.universityaddress,
                guidetitle: this.religareTravel1.guidetitle,
                guidefirstname: this.religareTravel1.guidefirstname,
                guidelastname: this.religareTravel1.guidelastname,
                studentRelationShip: this.religareTravel1.studentRelationShip,
                coursedetails: this.religareTravel1.coursedetails,
                guideAddress: this.religareTravel1.guideAddress,
                mobile: this.religareTravel1.mobile,
                passport: this.religareTravel1.passport,
                phone: this.religareTravel1.phone,
                addon: this.religareTravel1.addon,
                rolecd: this.religareTravel1.rolecd == null ? 'PROPOSER' : 'PROPOSER',

            });

        }
        if (sessionStorage.ReligareTravelDetails2 != '' && sessionStorage.ReligareTravelDetails2 != undefined) {
            console.log(JSON.parse(sessionStorage.ReligareTravelDetails2), 'sessionStorage');
            this.religareTravel2 = JSON.parse(sessionStorage.ReligareTravelDetails2);
            console.log( this.religareTravel2, 'this.religareTravel2');
          // /  if (this.religareTravel2.religarePersonalPincode != '') {
          //       this.getPostalInsurer(this.religareTravel2.insurerReligarePincode,'i', 'insurer');
          //   //
          //   }
            for (let i = 0; i < this.religareTravel2.items.length; i++) {
                this.insureReligareArray['controls'].items['controls'][i]['controls'].title.patchValue(this.religareTravel2.items[i].title);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.religareTravel2.items[i].firstname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.religareTravel2.items[i].lastname);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].gender.patchValue(this.religareTravel2.items[i].gender);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.religareTravel2.items[i].dob);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.religareTravel2.items[i].relationship);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].passport.patchValue(this.religareTravel2.items[i].passport);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].address1.patchValue(this.religareTravel2.items[i].address1);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].pincode.patchValue(this.religareTravel2.items[i].pincode);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].city.patchValue(this.religareTravel2.items[i].city);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].state.patchValue(this.religareTravel2.items[i].state);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].raddress1.patchValue(this.religareTravel2.items[i].raddress1);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].rpincode.patchValue(this.religareTravel2.items[i].rpincode);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].rcity.patchValue(this.religareTravel2.items[i].rcity);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].rstate.patchValue(this.religareTravel2.items[i].rstate);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].email.patchValue(this.religareTravel2.items[i].email);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].mobile.patchValue(this.religareTravel2.items[i].mobile);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].sameAsInsurer.patchValue(this.religareTravel2.items[i].sameAsInsurer);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].sameAsInsuredProposer.patchValue(this.religareTravel2.items[i].sameAsInsuredProposer);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].sameasreadonly.patchValue(this.religareTravel2.items[i].sameasreadonly);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].pannumber.patchValue(this.religareTravel2.items[i].pannumber);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].adharnumber.patchValue(this.religareTravel2.items[i].adharnumber);
                this.insureReligareArray['controls'].items['controls'][i]['controls'].phone.patchValue(this.religareTravel2.items[i].phone);
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
            if (sessionStorage.religare_Travel_proposal_id != '' && sessionStorage.religare_Travel_proposal_id != undefined) {
                this.religare_Travel_proposal_id = sessionStorage.religare_Travel_proposal_id;
                console.log(this.religare_Travel_proposal_id, 'this.religarePAProposal');
            }
        }
    }
    addonList(value){
        if(value.checked){
            this.toastr.error('Your SumInsured Amount should be different');
        }
    }
}



