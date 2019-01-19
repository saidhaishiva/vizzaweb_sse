import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HealthService} from '../../shared/services/health.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import { Router } from '@angular/router';

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
  selector: 'app-hdfc-personalaccident',
  templateUrl: './hdfc-personalaccident.component.html',
  styleUrls: ['./hdfc-personalaccident.component.scss']
})

export class HdfcPersonalaccidentComponent implements OnInit {
    public hdfcPersonal: FormGroup;
    public hdfcInsureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public today: any;
    public personalDobError: any;
    public hdfcPAProposerAge: any;
    public pin: any;
    public title: any;
    public personalHdfcHealthCitys: any;
    public insuredHdfcHealthCitys: any;
    public declaration: any;
    public hdfcpersonalValues: any;
    public AcceptDeclaration: any;
    public getHdfcHealthPremiumList: any;
    public insurePersons: any;
    public items: any;
    public step: any;
    public insurerData: any;
    public hdfcPAStep1: any;
    public lastStepper: any;
    public back: any;
    public hdfcPANomineeDetails: any;
    public totalAmount: any;
    public settings: any;
    public insuredHdfcRelationList: any;
    public nomineeHdfcRelationList: any;
    public summaryData: any;
    public partyQuestionDOList: any;
    public titleList: any;
    public hdfcHealthCitys: any;
    public hdfcHealthStates: any;
    public IsCustomerAccepted: any;
    public getFamilyDetails: any;
    public arr: any;
    public insurerDtails: any;
    public proposalDtails: any;
    public nomineeDtails: any;
    public webhost: any;
    public sameAsinsure: any;
    public fullName: any;
    public IsCustomerAcceptedPPCPED: boolean;
    public occupationCode: any;
    public getBuyDetails: any;
    public getAllPremiumDetails: any;
    public pincodePAValid: any;
    public proposerAgeHDFCPA: any;
    constructor( public personalacccidentservice: PersonalAccidentService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                 public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string, public route: Router) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.IsCustomerAcceptedPPCPED = false;
        this.arr = [];
        this.pincodePAValid = true;

        this.webhost = this.config.getimgUrl();


        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.hdfcPersonal = this.fb.group({
            title:['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            midname: '',
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
            phone: '',
            paymentmode: ['', Validators.required],
            dependant:['', Validators.required],
            medicalcondition:['', Validators.required],
            nationality:['', Validators.required],
            occupation:['', Validators.required],
            preexisting:''
        });
        this.nomineeDetails = this.fb.group({
            'nomineeName': ['', Validators.required],
            'nomineeRelationship': ['', Validators.required]
        });
    }
    ngOnInit() {
        this.getBuyDetails = JSON.parse(sessionStorage.pAccidentProposalList);
        this.getAllPremiumDetails = JSON.parse(sessionStorage.personalPremiumLists);
        this.getStateList();
        this.nomineeRelationShipListHdfc();
        this.sessionData();
        this.getStateList();
        this.setOccupationList();

    }

    // title change function
    changeGender() {
        if (this.hdfcPersonal.controls['title'].value == 'MR') {
            this.hdfcPersonal.controls['gender'].patchValue('Male');
        } else {
            this.hdfcPersonal.controls['gender'].patchValue('Female');
        }
    }
    //  Title change Function in insured
    insureChangeGender(index) {
        if (this.hdfcInsureArray['controls'].items['controls'][index]['controls'].title.value == 'MR') {
            this.hdfcInsureArray['controls'].items['controls'][index]['controls'].gender.patchValue('Male');
        } else {
            this.hdfcInsureArray['controls'].items['controls'][index]['controls'].gender.patchValue('Female');
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
    occupationDetails() {

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
    // dob validation
    // addEvent(event,i, type, formtype) {
    //     if (event.value != null) {
    //         let selectedDate = '';
    //         this.hdfcPAProposerAge = '';
    //         let dob = '';
    //         let insurerAge;
    //         console.log(event.value, 'event.value._i');
    //         if (typeof event.value._i == 'string') {
    //             const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    //             if (pattern.test(event.value._i) && event.value._i.length == 10) {
    //                 // if (formtype == 'insurer') {
    //                 //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
    //                 // } else
    //                     if (formtype == 'personal') {
    //                     this.personalDobError = '';
    //                 }
    //             } else {
    //                 console.log(event.value._i.length, 'length');
    //                 // if (formtype == 'insurer') {
    //                 //     this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
    //                 // } else
    //                     if (formtype == 'personal') {
    //                     this.personalDobError = 'Enter Valid Date';
    //                 }
    //
    //             }
    //             selectedDate = event.value._i;
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             console.log(dob, 'dob');
    //             if (selectedDate.length == 10) {
    //                 if (formtype == 'personal') {
    //                     this.personalDobError = '';
    //                     this.hdfcPAProposerAge = this.ageCalculate(dob);
    //                 }
    //
    //                 console.log(this.hdfcPAProposerAge, ' this.hdfcPAProposerAge');
    //                 console.log(insurerAge, ' this.insurerAgeinsurerAgeinsurerAge');
    //
    //             }
    //
    //         } else if (typeof event.value._i == 'object') {
    //             dob = this.datepipe.transform(event.value, 'y-MM-dd');
    //             console.log(dob.length, 'dob.length');
    //             if (dob.length == 10) {
    //                 if (formtype == 'personal') {
    //                     this.personalDobError = '';
    //                     this.hdfcPAProposerAge = this.ageCalculate(dob);
    //                 }
    //             }
    //         }
    //
    //
    //     }
    // }
    // ageValidationInsurer(i, type) {
    //   console.log(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value, 'ppopoopo');
    //     if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18) {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insured age should be 18 or above');
    //     } else {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    //     }
    // }

    //
    //     console.log(smallest, 'smallest');
    // }
    //


    // ageData(age, type) {
    //     console.log(age, 'ageageage');
    //     if (age && type == 'personal') {
    //         sessionStorage.hdfcPAProposerAge = age;
    //         if (age > 45) {
    //             console.log(age ,' this.age ');
    //             this.IsCustomerAcceptedPPCPED = true;
    //             this.hdfcPersonal.controls['accepted'].setValidators([Validators.required]);
    //         } else {
    //             this.IsCustomerAcceptedPPCPED = false;
    //             this.hdfcPersonal.controls['accepted'].setValidators(null);
    //         }
    //     } else {
    //     }
    // }
    // checkAccepted(){
    //     console.log(this.hdfcPersonal.controls['accepted'].value, 'pp');
    //     if (this.hdfcPersonal.controls['accepted'].value) {
    //         // this.IsCustomerAcceptedPPCPED = true;
    //         this.IsCustomerAccepted = false;
    //         //   this.hdfcPersonal.controls['accepted'].patchValue(true);
    //     } else {
    //         this.IsCustomerAccepted = true;
    //         // this.IsCustomerAcceptedPPCPED = false;
    //         //  this.hdfcPersonal.controls['accepted'].patchValue(false);
    //
    //     }
    //
    // }
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
    // city lists
    selectedSate(event, type, i) {
        console.log(event, 'pppp');
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'State': this.hdfcPersonal.controls['state'].value,
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.personalacccidentservice.getHdfcCityLists(data).subscribe(
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
            this.hdfcHealthCitys = successData.ResponseObject;
        }
    }
    public getCityFailure(error) {
        console.log(error);
    }
    // state lists
    getStateList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        this.personalacccidentservice.getHdfcStateLists(data).subscribe(
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
            this.hdfcHealthStates = successData.ResponseObject;
        }
    }
    public getStateFailure(error) {
        console.log(error);
    }
    occupationChangeList(val) {
        if(val == 0){
            this.toastr.error('Personal Accident is not allowed this occupation');

        } else {
        }
    }




    // Nominee RelationShip List
    nomineeRelationShipListHdfc() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.personalacccidentservice.getHdfcNomineeRelationLists(data).subscribe(
            (successData) => {
                this.hdfcNomineeRelationshipSuccess(successData);
            },
            (error) => {
                this.hdfcNomineeRelationshipFailure(error);
            }
        );
    }
    public hdfcNomineeRelationshipSuccess(successData) {
        if (successData.IsSuccess) {
            this.nomineeHdfcRelationList = successData.ResponseObject;
        }
    }
    public hdfcNomineeRelationshipFailure(error) {
        console.log(error);
    }
    pincodevalidationHdfc(pin) {
        this.pin = pin;
        console.log( this.pin, ' this.pin this.pin');
        if (pin == '') {
            this.pincodePAValid = true;
        }
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'Pincode': this.pin
        };
        if (this.pin.length == 6) {
            this.personalacccidentservice.getHdfcPincodeLists(data).subscribe(
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
            this.pincodePAValid = true;

        } else {
            this.pincodePAValid = false;
            this.toastr.error(successData.ErrorObject);
        }
        sessionStorage.pincodePAValid = this.pincodePAValid;

    }
    public pincodeFailure(successData) {
    }
    // occupation List
    setOccupationList() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
        }
        this.personalacccidentservice.hdfcOccupationList(data).subscribe(
            (successData) => {
                this.occupationCodeSuccess(successData);
            },
            (error) => {
                this.occupationCodeFailure(error);
            }
        );

    }


    public occupationCodeSuccess(successData) {
        this.occupationCode = successData.ResponseObject;
        console.log(  this.occupationCode, '  this.occupationCode');

    }

    public occupationCodeFailure(error) {
    }
    addEvent(event, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.proposerAgeHDFCPA = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if(type == 'personal'){
                        this.personalDobError = '';
                    }
                } else {
                    if(type == 'personal'){
                        this.personalDobError = 'Enter Valid Date';
                    }
                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (selectedDate.length == 10) {
                    if(type == 'personal'){
                        this.personalDobError = '';
                        this.hdfcPersonal.controls['dob'].patchValue(dob);
                        this.proposerAgeHDFCPA = this.ageCalculate(dob);
                    }

                }
            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    if(type == 'personal'){
                        this.personalDobError = '';
                        this.hdfcPersonal.controls['dob'].patchValue(dob);
                        this.proposerAgeHDFCPA = this.ageCalculate(dob);
                    }
                }

            }
            if(type == 'personal') {
                sessionStorage.proposerAgeHDFCPA = this.proposerAgeHDFCPA;
            }

        }


    }
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcPAStep1 = '';
        sessionStorage.hdfcPAStep1 = JSON.stringify(value);
        this.hdfcpersonalValues = value;
        console.log(this.hdfcpersonalValues, 'first');
        console.log(this.hdfcPersonal.valid, 'this.hdfcPersonal.valid');
        if (this.hdfcPersonal.valid) {
                if (this.pincodePAValid) {
                stepper.next();
            } else {
                this.toastr.error('Enter Valid Pincode');
            }
        }
    }
    // proposerAgeHDFCPA
    // Nominee Details
    addNomineeDetails(stepper: MatStepper, value) {
        console.log(value);
        sessionStorage.hdfcPANomineeDetails = '';
        sessionStorage.hdfcPANomineeDetails = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            this.createProposal(stepper);
        }
        this.lastStepper = stepper;
    }

// star-health-proposal Creation
    createProposal(stepper){
        //
        // for(let i=0; i < this.insurerData.items.length; i++) {
        //     this.insurerData.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
        //     this.insurerData.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
        // }
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'enquiry_id': this.getAllPremiumDetails.enquiry_id,
            'proposal_id': sessionStorage.hdfc_PA_proposal_id == '' || sessionStorage.hdfc_PA_proposal_id == undefined ? '' : sessionStorage.hdfc_PA_proposal_id,
            'InsuranceDetails': {
                'CustDetails': {
                    'TittleCode': this.hdfcpersonalValues.title,
                    'ApplFirstName': this.hdfcpersonalValues.firstname,
                    'ApplMiddleName': this.hdfcpersonalValues.midname,
                    'ApplLastName': this.hdfcpersonalValues.lastname,
                    'ApplDOB': this.datepipe.transform(this.hdfcpersonalValues.dob, 'dd/MM/yyyy'),
                    'ApplGender': this.hdfcpersonalValues.gender,
                    'Address1': this.hdfcpersonalValues.address1,
                    'Address2': this.hdfcpersonalValues.address2,
                    'Address3': this.hdfcpersonalValues.address3,
                    'State': this.hdfcpersonalValues.state,
                    'City': this.hdfcpersonalValues.city,
                    'Pincode': this.hdfcpersonalValues.pincode,
                    'EmailId': this.hdfcpersonalValues.email,
                    'MobileNo': this.hdfcpersonalValues.mobile,
                    'PhoneNo': this.hdfcpersonalValues.phone
                },
                'PlanDetails': {
                    // 'PlanCd': this.getBuyDetails.plan_code,
                    'PlanCd': this.getBuyDetails.plan_code,//From Premium Calculaction
                    'DependantParents': this.hdfcpersonalValues.dependant,
                    'IndianNational': this.hdfcpersonalValues.nationality
                },
                'PaymentDetails': {
                    'PaymentMode': this.hdfcpersonalValues.paymentmode,
                },
                'Member': {
                    'InsuredDetails': {
                        'FirstName':  this.hdfcpersonalValues.firstname,
                        'MiddleName': this.hdfcpersonalValues.midname,
                        'LastName': this.hdfcpersonalValues.lastname,
                        'DOB':this.datepipe.transform(this.hdfcpersonalValues.dob, 'dd/MM/yyyy'),
                        'RelationShip': "I",//Static
                        'Gender': this.hdfcpersonalValues.gender,
                        'NomineeName': this.nomineeDetails.controls['nomineeName'].value,
                        'NomineeRelationship': this.nomineeDetails.controls['nomineeRelationship'].value,//Master
                        'PreExistingDisease': this.hdfcpersonalValues.preexisting,
                        'Occupation': 'None of the above'
                    }
                }
            }

        }
        console.log(data, 'data22');

        this.settings.loadingSpinner = true;
        this.personalacccidentservice.getHdfcProposalCreation(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData, stepper);
            },
            (error) => {
                this.proposalFailure(error);
            }
        );





    }


    public proposalSuccess(successData, stepper) {
        console.log(successData,'successData');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            stepper.next();
            this.summaryData = successData.ResponseObject;
            this.proposalDtails =this.summaryData.ProposalDetails;
            this.fullName = this.proposalDtails.fname +' '+ this.proposalDtails.lname;
            this.totalAmount = parseFloat(this.proposalDtails.totalPremium);
            this.insurerDtails = successData.ResponseObject.InsureDetails;
            sessionStorage.hdfc_PA_proposal_id = successData.ResponseObject.ProposalId;


            console.log(this.summaryData, '  this.summaryData');
            console.log(this.summaryData.PaymentActionUrl, 'jhghfghfjgh');
            // this.nomineeDtails = successData.ResponseObject.InsurePolicyholderDetails[0];

            console.log(this.proposalDtails, 'proposalDtails');
            console.log(this.insurerDtails, 'insurerDtailsinsurerDtails');

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {

    }
    // redirect() {
    //     this.route.navigate([this.summaryData.PaymentActionUrl]);
    // }
// sessionData
    sessionData() {
        if (sessionStorage.hdfcPAStep1 != '' && sessionStorage.hdfcPAStep1 != undefined) {
            console.log(JSON.parse(sessionStorage.hdfcPAStep1), 'sessionStorage.hdfcPAStep1');
            this.setOccupationList();
            this.hdfcPAStep1 = JSON.parse(sessionStorage.hdfcPAStep1);
            this.hdfcPersonal = this.fb.group({
                firstname: this.hdfcPAStep1.firstname,
                lastname: this.hdfcPAStep1.lastname,
                midname: this.hdfcPAStep1.midname,
                dob: new FormControl(new Date(this.hdfcPAStep1.dob)),
                gender: this.hdfcPAStep1.gender,
                address1: this.hdfcPAStep1.address1,
                address2: this.hdfcPAStep1.address2,
                address3: this.hdfcPAStep1.address3,
                pincode: this.hdfcPAStep1.pincode,
                state: this.hdfcPAStep1.state,
                city: this.hdfcPAStep1.city,
                email: this.hdfcPAStep1.email,
                mobile: this.hdfcPAStep1.mobile,
                phone: this.hdfcPAStep1.phone,
                paymentmode: this.hdfcPAStep1.paymentmode,
                dependant: this.hdfcPAStep1.dependant,
                OccupationList: this.hdfcPAStep1.OccupationList,
                medicalcondition: this.hdfcPAStep1.medicalcondition,
                nationality: this.hdfcPAStep1.nationality,
                occupation: this.hdfcPAStep1.occupation,
                preexisting: this.hdfcPAStep1.preexisting
            });
            if (this.hdfcPAStep1.state != '') {
                this.selectedSate(this.hdfcPersonal.value, 'personal', 'index');
                this.hdfcPersonal.controls['city'].patchValue(this.hdfcPAStep1.city);
            }
            if (this.hdfcPAStep1.dob != '') {
                let dob = this.datepipe.transform(this.hdfcPAStep1.dob, 'y-MM-dd');
                this.hdfcPAProposerAge = this.ageCalculate(dob);
                // this.ageData(this.hdfcPAProposerAge, 'personal');
                // if (this.hdfcPAProposerAge > 45) {
                //     this.checkAccepted();
                // }
            }

            if (sessionStorage.pincodePAValid != '' && sessionStorage.pincodePAValid != undefined) {
                this.pincodePAValid =  sessionStorage.pincodePAValid;
            }

        }
        if (sessionStorage.hdfcPANomineeDetails != '' && sessionStorage.hdfcPANomineeDetails != undefined) {
            console.log(JSON.parse(sessionStorage.hdfcPANomineeDetails), 'sessionStorage.hdfcPANomineeDetails');
            this.hdfcPANomineeDetails = JSON.parse(sessionStorage.hdfcPANomineeDetails);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.hdfcPANomineeDetails.nomineeName,
                nomineeRelationship: this.hdfcPANomineeDetails.nomineeRelationship
            });
        }

    }
}
