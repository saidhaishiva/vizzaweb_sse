import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import { AppSettings } from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
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
  selector: 'app-religare',
  templateUrl: './religare.component.html',
  styleUrls: ['./religare.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ReligareComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public insureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public lastStepper: any;
    public paymentGatewayData: any;
    public webhost: any;
    public proposalId: any;
    public settings: Settings;
    public pin: any;
    public response: any;
    public personalCitys: any;
    public areaName: any;
    public areaNames: any;
    public title: any;
    public residenceCitys: any;
    public cityTitle: any;
    public rAreaNames: any;
    public rAreaName: any;
    public rResponse: any;
    public summaryCity: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public sumAreaName: any;
    public sumAreaNameComm: any;
    public setDateAge: any;
    public personalAge: any;
    public occupationCode: any;
    public religareQuestionsList: any;
    public items: any;
    public step: any;
    public questionEmpty: any;
    public proposerInsureData: any;
    public insurerData: any;
    public totalReligareData: any;
    public getStepper1: any;
    public getStepper2: any;
    public itemss: any[] = [1];

    constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.stopNext = false;
        this.declaration = false;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.webhost = this.config.getimgUrl();
        this.selectDate = '';
        this.proposalId = 0;
        this.step = 0;
        this.proposerInsureData = [];
        this.totalReligareData = [];
        this.personal = this.fb.group({
            personalTitle: ['', Validators.required],
            personalFirstname: new FormControl(''),
            personalLastname: ['', Validators.required],
            personalGender: ['', Validators.compose([Validators.required])],
            personalDob: ['', Validators.compose([Validators.required])],
            personalOccupationCode: ['', Validators.required],
            personalOccupation: ['', Validators.required],
            personalrelationship: ['', Validators.required],
            personalIncome: ['', Validators.required],
            personalAadhar: ['', Validators.compose([Validators.minLength(12)])],
            personalPan: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            personalGst: ['', Validators.compose([Validators.minLength(15)])],
            personalAddress: ['', Validators.required],
            previousinsurance: '',
            personalAddress2: ['', Validators.required],
            personalPincode: ['', Validators.required],
            personalCity: ['', Validators.required],
            personalState: ['', Validators.required],
            personalEmail: ['', Validators.required],
            personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            personalAltnumber: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
            residenceAddress: ['', Validators.required],
            residenceAddress2: ['', Validators.required],
            residencePincode: ['', Validators.required],
            residenceCity: ['', Validators.required],
            residenceState: ['', Validators.required],
            sameas: '',
            rolecd: 'PROPOSER',
            relationshipcd: 'SELF'

        });
        this.nomineeDetails = this.fb.group({
            'religareNomineeName': ['', Validators.required],
            'religareRelationship': ['', Validators.required]
        });
    }


    ngOnInit() {
        this.setOccupationListCode();
        this.religareQuestions();
        this.setOccupationList();
        this.setRelationship();
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.itemss.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
        }
        this.sessionData();

        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');

    }

    setStep(index: number) {
        this.step = index;
    }

    prevStep() {
        this.step--;
    }

    //Insure Details
    religareInsureDetails(stepper: MatStepper, value) {
        console.log(value);
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        this.insurerData = value;
        if (this.insureArray.valid) {
            this.totalReligareData = [];
            for (let i = 0; i < this.insurerData.items.length; i++) {
                this.proposerInsureData.push(this.insurerData.items[i]);
            }
            stepper.next();
    for (let i = 0; i < this.proposerInsureData.length; i++) {
    this.totalReligareData.push({
        'title': this.proposerInsureData[i].personalTitle,
        'proposer_fname': this.proposerInsureData[i].personalFirstname,
        'proposer_lname': this.proposerInsureData[i].personalLastname,
        'prop_email_list': [{
            'email': this.proposerInsureData[i].personalEmail,
            'email_type': 'PERSONAL'
        }],
        'prop_contact_list': [{
            'contact_no': this.proposerInsureData[i].personalMobile,
            'contact_type': 'MOBILE',
            'std_code': '91'
        }],
        'prop_identity_list': [],
        'proposer_res_address1': this.proposerInsureData[i].residenceAddress,
        'proposer_res_address2': this.proposerInsureData[i].residenceAddress2,
        'proposer_res_area': this.proposerInsureData[i].residenceCity,
        'proposer_res_city': this.proposerInsureData[i].residenceCity,
        'proposer_res_state': this.proposerInsureData[i].residenceState,
        'proposer_res_pincode': this.proposerInsureData[i].residencePincode,
        'proposer_comm_address1': this.proposerInsureData[i].personalAddress,
        'proposer_comm_address2': this.proposerInsureData[i].personalAddress2,
        'proposer_comm_area': this.proposerInsureData[i].personalCity,
        'proposer_comm_city': this.proposerInsureData[i].personalCity,
        'proposer_comm_state': this.proposerInsureData[i].personalState,
        'proposer_comm_pincode': this.proposerInsureData[i].personalPincode,
        'prop_dob': this.proposerInsureData[i].personalDob,
        'prop_gender': this.proposerInsureData[i].personalGender,
        'relationship_cd': this.proposerInsureData[i].relationshipcd,
        'role_cd': this.proposerInsureData[i].rolecd,
        'questions_list': [{
            'question_id': '',
            'question_cd': '',
            'question_set_cd': '',
            'response': ''
        }]
    });
        if (this.proposerInsureData[i].personalAltnumber !='') {
            this.totalReligareData[i].prop_contact_list.push({
                'contact_no': this.proposerInsureData[i].personalAltnumber,
                'contact_type': 'RESEDENTIAL',
                'std_code': '91'
            });
        }
        if (this.proposerInsureData[i].personalAadhar !='') {
            this.totalReligareData[i].prop_identity_list.push({
                'identity_number': this.proposerInsureData[i].personalAadhar,
                'identity_type': 'AADHAR'
            });
        }
        if (this.proposerInsureData[i].personalGst !='') {
            this.totalReligareData[i].prop_identity_list.push( {
                'identity_number': this.proposerInsureData[i].personalGst,
                'identity_type': 'GST'
            });
        }
        if (this.proposerInsureData[i].personalPan !='') {
            this.totalReligareData[i].prop_identity_list.push( {
                'identity_number': this.proposerInsureData[i].personalPan,
                'identity_type': 'PAN'
            });
        }
        console.log(this.totalReligareData, 'this.totalReligareDatathis.totalReligareData');
        }
        }
    }
    initItemRows() {
        return this.fb.group(
            {
                personalTitle: ['', Validators.required],
                personalFirstname: new FormControl(''),
                personalLastname: ['', Validators.required],
                personalDob: ['', Validators.compose([Validators.required])],
                personalGender: ['', Validators.compose([Validators.required])],
                personalOccupationCode: ['', Validators.required],
                personalOccupation: ['', Validators.required],
                personalrelationship: ['', Validators.required],
                personalIncome: ['', Validators.required],
                personalAadhar: ['', Validators.compose([Validators.required, Validators.minLength(12)])],
                personalPan: ['', Validators.compose([Validators.minLength(10)])],
                personalGst: ['', Validators.compose([Validators.minLength(15)])],
                personalAddress: ['', Validators.required],
                previousinsurance: '',
                personalAddress2: ['', Validators.required],
                personalPincode: ['', Validators.required],
                personalCity: ['', Validators.required],
                personalState: ['', Validators.required],
                personalEmail: ['', Validators.required],
                personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
                personalAltnumber: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
                residenceAddress: ['', Validators.required],
                residenceAddress2: ['', Validators.required],
                residencePincode: ['', Validators.required],
                residenceCity: ['', Validators.required],
                residenceState: ['', Validators.required],
                sameas: '',
                rolecd: 'PRIMARY',
                relationshipcd: 'SELF'
            }
        );
    }
    //Nominee Details
    religareNomineeDetails(stepper: MatStepper, value) {
        console.log(value);
        if (this.nomineeDetails.valid) {
            this.proposal();
        }
    }
    //Personal Details
    personalDetails(value) {
        console.log(value, 'value');
        this.personalData = value;
        this.personalData.rolecd = 'PROPOSER';
        this.personalData.relationshipcd = 'SELF';
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);

        if (this.personal.valid) {
            this.proposerInsureData = [];
            if (sessionStorage.proposerAge >= 18) {
                this.proposerInsureData.push(this.personalData);
                this.step++;
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    religareQuestion(stepper: MatStepper) {
        this.questionEmpty = false;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            if (this.religareQuestionsList[i].answer == '') {
                this.questionEmpty = false;
                break;
            } else {
                this.questionEmpty = true;
            }
        }
        if (this.questionEmpty) {
                stepper.next();

            } else {
                this.toastr.error('Please fill the all Answers');

            }
    }
    getCityId(title) {
        this.cityTitle = title;
        const data = {
            'platform': 'web',
            'pincode': this.cityTitle == 'personal' ? this.personal.controls['personalPincode'].value : this.personal.controls['residencePincode'].value,
            'city_id': this.cityTitle == 'personal' ? this.personal.controls['personalCity'].value : this.personal.controls['residenceCity'].value
        }

        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCitySuccess(successData);
            },
            (error) => {
                this.getCityFailure(error);
            }
        );
    }

    public getCitySuccess(successData) {
        if (successData.IsSuccess == true) {
            if (this.cityTitle == 'personal') {
                this.areaNames = successData.ResponseObject;
                this.areaName = this.areaNames.area;
            } else if (this.cityTitle == 'residence') {
                this.rAreaNames = successData.ResponseObject;
                this.rAreaName = this.rAreaNames.area;
            }
        }
    }

    public getCityFailure(error) {
        console.log(error);
    }




    sameAddress(values: any, index) {

        console.log(values.checked, 'jjjjj');
        if (values.checked) {
          console.log(values.checked);
        // console.log(this.insureArray.controls.items.value[index]['InsurerAddress'], 'pppppppppppppp');
        // console.log(this.insureArray.controls.items, 'rrrrrrrr');
            // (<FormControl>this.insureArray['personalFirstname']).setValue('llplllp');
            // this.setAddress = this.insureArray.controls.items.value[index]['InsurerAddress'];
          //  console.log(this.insureArray.controls.items.value[index], 'setaddress');
          //  this.insureArray.controls.items['InsurerResidenceAddress'].updateValue('llllpop');
         //   this.insureArray.controls['personalFirstname'].updateValue('llllpop');
           // (<FormControl>this.form.controls['power']).updateValue(data);
            //   this.insureArray.patchValue({items: 'selected.id'});



            this.getPostal(this.personal.controls['personalPincode'].value, 'residence');
            this.getCityIdF2('residence', this.personal.controls['personalCity'].value, this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
            this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
            this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
            this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
            this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
        } else {
            this.personal.controls['residenceAddress'].setValue('');
            this.personal.controls['residenceAddress2'].setValue('');
            this.personal.controls['residenceCity'].setValue('');
            this.personal.controls['residencePincode'].setValue('');
            this.personal.controls['residenceState'].setValue('');
        }

    }

    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    // addEventInsurer(event, i) {
    //     this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd-MM-y');
    //     console.log(this.familyMembers[i].ins_dob);
    //
    //     //Calculate Age
    //     this.ageCheck = this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //     let age = this.ageCalculate(this.ageCheck);
    //     this.familyMembers[i].ins_age = age;
    //
    //     console.log(event.value);
    //     if (event.value.length == 10) {
    //         this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd/MM/y');
    //         console.log(this.familyMembers[i].ins_dob);
    //     }
    //
    // }
    //
    //
    // changeEventInsurer(event, i) {
    //     console.log(event.value, 'pop');
    //     if (event.value.length == 10) {
    //         this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd/MM/y');
    //         console.log(this.familyMembers[i].ins_dob);
    //     }
    //
    // }

    addEvent(event) {
        this.selectDate = event.value;
        console.log(this.selectDate);
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.personalAge = this.ageCalculate(this.setDateAge);
        sessionStorage.setItem('proposerAge', this.personalAge);
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

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            console.log(JSON.parse(sessionStorage.stepper1Details), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.personal = this.fb.group({
                personalTitle: this.getStepper1.personalTitle,
                personalFirstname: this.getStepper1.personalFirstname,
                personalLastname: this.getStepper1.personalLastname,
                personalDob: this.getStepper1.personalDob,
                personalOccupation: this.getStepper1.personalOccupation,
                personalIncome: this.getStepper1.personalIncome,
                personalArea: this.getStepper1.personalArea,
                residenceArea: this.getStepper1.residenceArea,
                personalAadhar: this.getStepper1.personalAadhar,
                personalrelationship: this.getStepper1.personalrelationship,
                personalGender: this.getStepper1.personalGender,
                personalOccupationCode: this.getStepper1.personalOccupationCode,
                personalPan: this.getStepper1.personalPan,
                personalGst: this.getStepper1.personalGst,
                socialStatus: this.getStepper1.socialStatus,
                socialAnswer1: this.getStepper1.socialAnswer1,
                socialAnswer2: this.getStepper1.socialAnswer2,
                socialAnswer3: this.getStepper1.socialAnswer3,
                socialAnswer4: this.getStepper1.socialAnswer4,
                personalAddress: this.getStepper1.personalAddress,
                previousinsurance: this.getStepper1.previousinsurance,
                personalAddress2: this.getStepper1.personalAddress2,
                personalPincode: this.getStepper1.personalPincode,
                personalCity: this.getStepper1.personalCity,
                personalState: this.getStepper1.personalState,
                personalEmail: this.getStepper1.personalEmail,
                personalMobile: this.getStepper1.personalMobile,
                personalAltnumber: this.getStepper1.personalAltnumber,
                residenceAddress: this.getStepper1.residenceAddress,
                residenceAddress2: this.getStepper1.residenceAddress2,
                residencePincode: this.getStepper1.residencePincode,
                residenceCity: this.getStepper1.residenceCity,
                residenceState: this.getStepper1.residenceState,
                illnessCheck: this.getStepper1.illnessCheck,
                rolecd: this.getStepper1.rolecd,
                relationshipcd: this.getStepper1.relationshipcd,
                sameas: this.getStepper1.sameas
            });


            // this.insureArray = this.fb.group({
            //     items: this.fb.array([{
            //         personalTitle: this.getStepper2.personalTitle,
            //         personalFirstname: this.getStepper2.personalFirstname,
            //         personalLastname: this.getStepper2.personalLastname,
            //         personalDob: this.getStepper2.personalDob,
            //         personalOccupation: this.getStepper2.personalOccupation,
            //         personalIncome: this.getStepper2.personalIncome,
            //         personalArea: this.getStepper2.personalArea,
            //         residenceArea: this.getStepper2.residenceArea,
            //         personalAadhar: this.getStepper2.personalAadhar,
            //         personalrelationship: this.getStepper2.personalrelationship,
            //         personalGender: this.getStepper2.personalGender,
            //         personalOccupationCode: this.getStepper1.personalOccupationCode,
            //         personalPan: this.getStepper2.personalPan,
            //         personalGst: this.getStepper2.personalGst,
            //         socialStatus: this.getStepper2.socialStatus,
            //         socialAnswer1: this.getStepper2.socialAnswer1,
            //         socialAnswer2: this.getStepper2.socialAnswer2,
            //         socialAnswer3: this.getStepper2.socialAnswer3,
            //         socialAnswer4: this.getStepper2.socialAnswer4,
            //         personalAddress: this.getStepper2.personalAddress,
            //         previousinsurance: this.getStepper2.previousinsurance,
            //         personalAddress2: this.getStepper2.personalAddress2,
            //         personalPincode: this.getStepper2.personalPincode,
            //         personalCity: this.getStepper2.personalCity,
            //         personalState: this.getStepper2.personalState,
            //         personalEmail: this.getStepper2.personalEmail,
            //         personalMobile: this.getStepper2.personalMobile,
            //         personalAltnumber: this.getStepper2.personalAltnumber,
            //         residenceAddress: this.getStepper2.residenceAddress,
            //         residenceAddress2: this.getStepper2.residenceAddress2,
            //         residencePincode: this.getStepper2.residencePincode,
            //         residenceCity: this.getStepper2.residenceCity,
            //         residenceState: this.getStepper2.residenceState,
            //         illnessCheck: this.getStepper2.illnessCheck,
            //         sameas: this.getStepper2.sameas
            //     }])
            // });
        }
    }


    //Create Proposal
    proposal() {
        const data = {
            'platform': 'web',
            'proposal_id': '1',
            'enquiry_id': '1',
            'group_name': 'Group A',
            'company_name': 'Religare',
            'suminsured_amount': '500000',
            'proposer_insurer_details' : this.totalReligareData,
            'product_id': '4',
            'policy_term': '3',
            'scheme_id': '1',
            'terms_condition': '1',
            'role_id': '4',
            'user_id': '0',
            'pos_status': '0'
        };
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
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData, 'this.summaryDatathis.summaryDatathis.summaryData')
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            this.lastStepper.next();
            if (this.summaryData.prop_res_pincode) {
                this.getPostalSummary(this.summaryData.prop_res_pincode, 'residence');
                this.getCityIdF2(this.sumTitle, this.summaryData.prop_res_city, this.sumPin);
            }
            if (this.summaryData.prop_comm_pincode) {
                this.getPostal(this.summaryData.prop_comm_pincode, 'personal');
                this.getCityIdSumm(this.title, this.summaryData.prop_comm_city, this.pin);
            }

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

//Summary residence detail
    public proposalFailure(error) {
        console.log(error);
    }

    getCityIdF2(title, cid, pincode) {
        const data = {
            'platform': 'web',
            'pincode': pincode,
            'city_id': cid
        }
        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCityResistSuccess(successData);
            },
            (error) => {
                this.getCityResistFailure(error);
            }
        );
    }

    public getCityResistSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.rAreaNames = successData.ResponseObject;
            this.rAreaName = this.rAreaNames.area;
            if (this.sumTitle == 'residence') {
                for (let i = 0; i < this.rAreaName.length; i++) {
                    if (this.rAreaName[i].areaID == this.summaryData.prop_res_area) {
                        this.sumAreaName = this.rAreaName[i].areaName;
                    }

                }
            }
        }
    }

    public getCityResistFailure(error) {
        console.log(error);
    }

//Summary personal detail
    getCityIdSumm(title, cid, pincode) {
        const data = {
            'platform': 'web',
            'pincode': pincode,
            'city_id': cid
        }
        this.common.getArea(data).subscribe(
            (successData) => {
                this.getCityIdSummSuccess(successData);
            },
            (error) => {
                this.getCityIdSummFailure(error);
            }
        );
    }

    public getCityIdSummSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.rAreaNames = successData.ResponseObject;
            this.rAreaName = this.rAreaNames.area;
            if (this.title == 'personal') {
                for (let i = 0; i < this.rAreaName.length; i++) {
                    if (this.rAreaName[i].areaID == this.summaryData.prop_comm_area) {
                        this.sumAreaNameComm = this.rAreaName[i].areaName;
                    }

                }
            }
        }
    }

    public getCityIdSummFailure(error) {
        console.log(error);
    }


//personal city detail
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
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

        if (successData.IsSuccess == true) {
            if (this.title == 'personal') {
                this.personalCitys = [];
                this.response = successData.ResponseObject;
                this.personal.controls['personalState'].setValue(this.response[0].state);
                for (let i = 0; i < this.response.length; i++) {
                    this.personalCitys.push({city: this.response[i].city});
                    // if (this.personalCitys[i].city == this.summaryData.prop_comm_city) {
                    //     this.summaryCity = this.personalCitys[i].city;
                    // }
                }
            }
            if (this.title == 'residence') {
                this.residenceCitys = [];
                this.rResponse = successData.ResponseObject;
                this.personal.controls['residenceState'].setValue(this.rResponse[0].state);
                for (let i = 0; i < this.rResponse.length; i++) {
                    this.residenceCitys.push({city: this.rResponse[i].city});
                }
            }


        }
    }

    public getpostalFailure(error) {
        console.log(error);
    }



//summary city detail
    getPostalSummary(pin, title) {
        this.sumPin = pin;
        this.sumTitle = title;
        console.log(this.sumPin, 'pin');
        console.log(this.title, 'sumTitle1');
        const data = {
            'platform': 'web',
            'pincode': this.sumPin
        }
        if (this.pin.length == 6) {
            this.common.getPostal(data).subscribe(
                (successData) => {
                    this.PostalSummarySuccess(successData);
                },
                (error) => {
                    this.PostalSummaryFailure(error);
                }
            );
        }
    }

    public PostalSummarySuccess(successData) {
        if (successData.IsSuccess == true) {
            if (this.sumTitle == 'residence') {
                this.rResponse = successData.ResponseObject;
                this.residenceCitys = this.rResponse.city;
                for (let i = 0; i < this.residenceCitys.length; i++) {
                    if (this.residenceCitys[i].city_id == this.summaryData.prop_res_city) {
                        this.rSummaryCity = this.residenceCitys[i].city_name;

                    }
                }
            }


        }
    }

    public PostalSummaryFailure(error) {
        console.log(error);
    }



    religareQuestions() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getReligareQuestions(data).subscribe(
            (successData) => {
                this.religareQuestionsSuccess(successData);
            },
            (error) => {
                this.religareQuestionsFailure(error);
            }
        );

    }

    public religareQuestionsSuccess(successData) {
        console.log(successData.ResponseObject);
        this.religareQuestionsList = successData.ResponseObject;
        for (let i = 0; i < this.religareQuestionsList.length; i++) {
            this.religareQuestionsList[i].answer = '';
        }


    }

    public religareQuestionsFailure(error) {
        console.log(error);
    }




    public payNow() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'reference_id': this.summaryData.proposal_details[0].referenceId,
            'proposal_id': sessionStorage.proposalID,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.settings.loadingSpinner = true;
        this.proposalservice.getPolicyToken(data).subscribe(
            (successData) => {
                this.getPolicyTokenSuccess(successData);
            },
            (error) => {
                this.getPolicyTokenFailure(error);
            }
        );
    }

    public getPolicyTokenSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.paymentGatewayData = successData.ResponseObject;
            console.log(this.paymentGatewayData);
            window.location.href = this.paymentGatewayData.payment_gateway_url;
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getPolicyTokenFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationList = successData.ResponseObject;
    }

    public occupationListFailure(error) {
        console.log(error);
    }


    setOccupationListCode() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getOccupationCode(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }

    public occupationCodeSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationCode = successData.ResponseObject;
    }

    public occupationCodeFailure(error) {
        console.log(error);
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getRelationshipList(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess(successData);
            },
            (error) => {
                this.setRelationshipFailure(error);
            }
        );
    }

    public setRelationshipSuccess(successData) {
        console.log(successData.ResponseObject);
        this.relationshipList = successData.ResponseObject;
    }

    public setRelationshipFailure(error) {
        console.log(error);
    }
}
