
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {ProposalService} from '../../shared/services/proposal.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
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
    selector: 'app-hdfc-health-insurance',
    templateUrl: './hdfc-health-insurance.component.html',
    styleUrls: ['./hdfc-health-insurance.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class HdfcHealthInsuranceComponent implements OnInit {
    public hdfcPersonal: FormGroup;
    public hdfcInsureArray: FormGroup;
    public nomineeDetails: FormGroup;
    public today: any;
    public personalDobError: any;
    public hdfcHealthProposerAge: any;
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
    public hdfcStep1: any;
    public hdfcStep2: any;
    public lastStepper: any;
    public back: any;
    public hdfcHealthNomineeDetails: any;
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
    public pincodeValid: any;
    public mobileotpgenerate: any;
    public otpvalidation: any;
    public checkotpvalidation: any;
    public checkotp: any;

    constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
                public config: ConfigurationService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.IsCustomerAcceptedPPCPED = false;
        this.pincodeValid = true;
        this.arr = [];
        this.webhost = this.config.getimgUrl();


        let today = new Date();
        this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        this.hdfcPersonal = this.fb.group({
            title: ['', Validators.required],
            firstname: new FormControl(''),
            lastname: new FormControl(''),
            gender: ['', Validators.required],
            dob: ['', Validators.compose([Validators.required])],
            address1: ['', Validators.required],
            address2: '',
            address3: '',
            pincode: '',
            otp: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
            mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
            accepted: '',
            paymentmode: ['', Validators.required]

        });
        this.nomineeDetails = this.fb.group({
            'nomineeName': ['', Validators.required],
            'nomineeRelationship': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.sameAsinsure = true;
        this.getHdfcHealthPremiumList = JSON.parse(sessionStorage.buyProductdetails);
        console.log(this.getHdfcHealthPremiumList, 'this.getHdfcHealthPremiumListbuyProductdetails');
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        console.log(this.getFamilyDetails, 'getFamilyDetails');

        this.insurePersons = this.getFamilyDetails.family_members;

        console.log(this.insurePersons, 'this.insurePersons');
        this.hdfcInsureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.insurePersons.length; i++) {
            this.items = this.hdfcInsureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].type.setValue(this.insurePersons[i].type);
        }
        console.log(this.hdfcInsureArray, 'hdfcInsureArray');
        console.log(this.items, 'items');
        this.titleLists();
        this.getStateList();
        this.RelationShipListHdfc();
        this.nomineeRelationShipListHdfc();
        this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(true);
        this.sessionData();

    }

    // title change function
    // changeGender() {
    //     if (this.hdfcPersonal.controls['title'].value == 'MR') {
    //         this.hdfcPersonal.controls['gender'].patchValue('Male');
    //     } else {
    //         this.hdfcPersonal.controls['gender'].patchValue('Female');
    //     }
    // }
    // //  Title change Function in insured
    // insureChangeGender(index) {
    //     if (this.hdfcInsureArray['controls'].items['controls'][index]['controls'].title.value == 'MR') {
    //         this.hdfcInsureArray['controls'].items['controls'][index]['controls'].gender.patchValue('Male');
    //     } else {
    //         this.hdfcInsureArray['controls'].items['controls'][index]['controls'].gender.patchValue('Female');
    //     }
    // }
    sameasInsurerDetails(event) {
        console.log(this.sameAsinsure, 'event.sameAsinsure.checked');
        sessionStorage.sameAsinsure = this.sameAsinsure;
        if (this.sameAsinsure) {
            // this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(true);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue(this.hdfcPersonal.controls['title'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue(this.hdfcPersonal.controls['firstname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue(this.hdfcPersonal.controls['lastname'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].gender.patchValue(this.hdfcPersonal.controls['gender'].value);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue(this.hdfcPersonal.controls['dob'].value);


        } else {
            // this.hdfcInsureArray['controls'].items['controls'][0]['controls'].sameasInsurer.patchValue(false);
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].title.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].firstname.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].lastname.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].gender.patchValue('');
            this.hdfcInsureArray['controls'].items['controls'][0]['controls'].dob.patchValue('');
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

    // insure form group
    initItemRows() {
        return this.fb.group(
            {
                title: ['', Validators.required],
                firstname: new FormControl(''),
                lastname: new FormControl(''),
                dob: ['', Validators.required],
                gender: ['', Validators.required],
                relationship: ['', Validators.required],
                preexdisease: '',
                insurerDobError: '',
                insurerDobValidError: '',
                sameasInsurer: false,
                type: '',
                ins_age: ''
            }
        );
    }

    // dob validation
    addEvent(event, i, type, formtype) {
        if (event.value != null) {
            let selectedDate = '';
            this.hdfcHealthProposerAge = '';
            let dob = '';
            let insurerAge;
            console.log(event.value, 'event.value._i');
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (formtype == 'insurer') {
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                    } else if (formtype == 'personal') {
                        this.personalDobError = '';
                    }
                } else {
                    console.log(event.value._i.length, 'length');
                    if (formtype == 'insurer') {
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('Enter Valid Date');
                    } else if (formtype == 'personal') {
                        this.personalDobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob, 'dob');
                if (selectedDate.length == 10) {
                    if (formtype == 'personal') {
                        this.personalDobError = '';
                        this.hdfcHealthProposerAge = this.ageCalculate(dob);
                        this.ageData(this.hdfcHealthProposerAge, formtype);
                    } else if (formtype == 'insurer') {
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        insurerAge = this.DobDaysCalculate(dob);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(insurerAge);
                        this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
                    }
                    console.log(this.hdfcHealthProposerAge, ' this.hdfcHealthProposerAge');
                    console.log(insurerAge, ' this.insurerAgeinsurerAgeinsurerAge');

                }

            } else if (typeof event.value._i == 'object') {
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob.length, 'dob.length');
                if (dob.length == 10) {
                    if (formtype == 'personal') {
                        this.personalDobError = '';
                        this.hdfcHealthProposerAge = this.ageCalculate(dob);
                        this.ageData(this.hdfcHealthProposerAge, formtype);
                    } else if (formtype == 'insurer') {
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue('');
                        insurerAge = this.DobDaysCalculate(dob);
                        console.log(insurerAge, 'insurerAge');
                        sessionStorage.hdfcHealthInsurerAge = insurerAge;
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(insurerAge);
                        this.ageValidationInsurer(i, type);
                        this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(dob);
                    }
                }
            }

        }
    }

    // ageValidationInsurer(i, type) {
    //   console.log(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value, 'ppopoopo');
    //     if(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 18) {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Insured age should be 18 or above');
    //     } else {
    //         this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
    //     }
    // }

    ageValidationInsurer(i, type) {
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Self') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 18');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Self') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 18 && type == 'Spouse') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 18');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 18 && type == 'Spouse') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
            this.arr.push(this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value);
        }
        let smallest = this.arr[0];
        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i] < smallest) {
                smallest = this.arr[i];
            }
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Son') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Son age should be above 91 days');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 91 && type == 'Son') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value < 91 && type == 'Daughter') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Daughter age should be above 91 days');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 91 && type == 'Daughter') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Mother age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Mother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == 'Father') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Father age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == 'Father') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Sister') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Sister age should be above 1');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Sister') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 1 && type == 'Brother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Brother age should be above 1');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 1 && type == 'Brother') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Father In Law age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Father In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }
        if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(' Mother In Law age should be above 36');
        } else if (this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.value > 36 && type == ' Mother In Law') {
            this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        }

        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Self age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Self' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }
        // if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value <= 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom') {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('Spouse age should be above 46');
        // } else if(this.insureArray['controls'].items['controls'][i]['controls'].ins_age.value > 46 && type == 'Spouse' && this.buyProductdetails.product_name == 'Care Freedom')  {
        //     this.insureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue('');
        // }

        console.log(smallest, 'smallest');
    }


    ageData(age, type) {
        console.log(age, 'ageageage');
        if (age && type == 'personal') {
            sessionStorage.hdfcHealthProposerAge = age;
            if (age > 45) {
                console.log(age, ' this.age ');
                this.IsCustomerAcceptedPPCPED = true;
                this.hdfcPersonal.controls['accepted'].setValidators([Validators.required]);
            } else {
                this.IsCustomerAcceptedPPCPED = false;
                this.hdfcPersonal.controls['accepted'].setValidators(null);
            }
        } else {
        }
    }

    checkAccepted() {
        console.log(this.hdfcPersonal.controls['accepted'].value, 'pp');
        if (this.hdfcPersonal.controls['accepted'].value) {
            // this.IsCustomerAcceptedPPCPED = true;
            this.IsCustomerAccepted = false;
            //   this.hdfcPersonal.controls['accepted'].patchValue(true);
        } else {
            this.IsCustomerAccepted = true;
            // this.IsCustomerAcceptedPPCPED = false;
            //  this.hdfcPersonal.controls['accepted'].patchValue(false);

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

    DobDaysCalculate(dob) {
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

    // city lists
    selectedSate(event, type, i) {
        console.log(event, 'pppp');
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'State': '',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        }
        if (type == 'insurer') {
            data.State = event.state;
        } else {
            data.State = event.state;
        }
        this.proposalservice.getHdfcCityLists(data).subscribe(
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
        this.proposalservice.getHdfcStateLists(data).subscribe(
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

    // Title List
    titleLists() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.getTitleLists(data).subscribe(
            (successData) => {
                this.titleListsSuccess(successData);
            },
            (error) => {
                this.titleListsFailure(error);
            }
        );
    }

    public titleListsSuccess(successData) {
        if (successData.IsSuccess) {
            this.titleList = successData.ResponseObject;
            console.log(this.titleList, 'this.titleList');
            for (let i = 0; i < this.titleList.length; i++) {
                this.titleList[i].last = 'last';

            }
        }
    }

    public titleListsFailure(error) {
        console.log(error);
    }

// RelationShip List
    RelationShipListHdfc() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.hdfcRelationshipList(data).subscribe(
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
            this.insuredHdfcRelationList = successData.ResponseObject;

        }
    }

    public relationShipFailure(error) {
        console.log(error);
    }

    pincodevalidationHdfc(pin) {
        this.pin = pin;
        if (pin == '') {
            this.pincodeValid = true;
        }
        console.log(this.pin, ' this.pin this.pin');
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'Pincode': this.pin
        };
        if (this.pin.length == 6) {
            this.proposalservice.getHdfcPincodeLists(data).subscribe(
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

    // Nominee RelationShip List
    nomineeRelationShipListHdfc() {
        const data = {
            'platform': 'web',
            'user_id': this.auth.getPosUserId(),
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'
        };
        this.proposalservice.hdfcNomineeRelationshipList(data).subscribe(
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

    personalDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcStep1 = '';
        sessionStorage.hdfcStep1 = JSON.stringify(value);
        this.hdfcpersonalValues = value;
        console.log(this.hdfcpersonalValues, 'first');
        console.log(this.hdfcPersonal.valid, 'this.hdfcPersonal.valid');
        if (this.hdfcPersonal.valid) {
            if (sessionStorage.hdfcHealthProposerAge >= 18) {
                if (this.pincodeValid) {
                    this.sameasInsurerDetails('event');
                    stepper.next();
                } else {
                    this.toastr.error('Enter valid pincode');
                }
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }

        } else {
            if (value.accepted) {
                this.IsCustomerAccepted = false;
            } else {
                this.IsCustomerAccepted = true;
            }
        }
    }

    // otp validate
    otpValidate(value) {
        console.log(value,'valuevalue');
        this.mobileotpgenerate = value;
        console.log( this.mobileotpgenerate,' this.mobileotpgenerate');

        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'mobile': this.hdfcPersonal.controls['mobile'].value,
        }
        if (this.mobileotpgenerate.length == 10) {
            this.proposalservice.mobileotp(data).subscribe(
                (successData) => {
                    this.mobileotpSuccess(successData);
                },
                (error) => {
                    this.mobileotpFailure(error);
                }
            );
        }
    }
    public mobileotpSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.toastr.success(successData.ResponseObject);
            this.otpvalidation = successData.ResponseObject;

        }

    }


    public mobileotpFailure(error) {
    }
// check otp
    checkotpValidate(value) {
        this.checkotp = value;
        console.log(  this.checkotp,'  this.checkotp');
        const data = {
            'enquiry_id': this.getFamilyDetails.enquiry_id,
            'otp': this.hdfcPersonal.controls['otp'].value,
        }
        if (this.checkotp.length == 6) {
            this.proposalservice.checkotp(data).subscribe(
                (successData) => {
                    this.checkotpSuccess(successData);
                },
                (error) => {
                    this.checkotpFailure(error);
                }
            );
        }
    }
    public checkotpSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.checkotpvalidation = successData.ResponseObject;

        } else {
            this.toastr.error(successData.ErrorObject);

        }

    }


    public checkotpFailure(error) {
    }



    // insured page
    InsureDetails(stepper: MatStepper, value) {
        sessionStorage.hdfcStep2 = '';
        sessionStorage.hdfcStep2 = JSON.stringify(value);
        this.insurerData = value;
        if (this.hdfcInsureArray.valid) {
            console.log(value, 'ffffflll');
            let validData = false;
            for (let i = 0; i < value.items.length; i++) {
                if (value.items[i].insurerDobError != '') {
                    validData = false;
                    break;
                } else if (value.items[i].insurerDobError == '') {
                    validData = true;
                }
            }
            console.log(validData, 'validDatavalidData');

            if (validData) {
              stepper.next();
            } else {
                //  this.toastr.error('Insured age should be 18 or above');
            }

        }
    }
    // Nominee Details
    addNomineeDetails(stepper: MatStepper, value) {
        console.log(value);
        sessionStorage.hdfcHealthNomineeDetails = '';
        sessionStorage.hdfcHealthNomineeDetails = JSON.stringify(value);
        if (this.nomineeDetails.valid) {
            this.createProposal(stepper);
        }
        this.lastStepper = stepper;
    }

// proposal Creation
    createProposal(stepper){

        for(let i=0; i < this.insurerData.items.length; i++) {
            this.insurerData.items[i].NomineeName = this.nomineeDetails.controls['nomineeName'].value;
            this.insurerData.items[i].NomineeRelationship = this.nomineeDetails.controls['nomineeRelationship'].value;
        }
            const data = {
                'platform': 'web',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'enquiry_id': this.getFamilyDetails.enquiry_id,
                'proposal_id': sessionStorage.hdfc_health_proposal_id == '' || sessionStorage.hdfc_health_proposal_id == undefined ? '' : sessionStorage.hdfc_health_proposal_id,
                'InsuranceDetails': {
                    'CustDetails': {
                        'Title': this.hdfcpersonalValues.title,
                        'ApplFirstName': this.hdfcpersonalValues.firstname,
                        'ApplLastName': this.hdfcpersonalValues.lastname,
                        'ApplDOB': this.datepipe.transform(this.hdfcpersonalValues.dob, 'y-MM-dd'),
                        'ApplGender': this.hdfcpersonalValues.gender,
                        'Address1': this.hdfcpersonalValues.address1,
                        'Address2': this.hdfcpersonalValues.address2,
                        'Address3': this.hdfcpersonalValues.address3,
                        'State': this.hdfcpersonalValues.state,
                        'City': this.hdfcpersonalValues.city,
                        'Pincode': this.hdfcpersonalValues.pincode,
                        'EmailId': this.hdfcpersonalValues.email,
                        'MobileNo': this.hdfcpersonalValues.mobile,
                        'IsCustomerAcceptedPPCPED': this.hdfcpersonalValues.accepted ? 1 : '',
                        'IsProposerSameAsInsured': this.sameAsinsure ? 'Y' : 'N' ,
                        'UIDNo': "" //OTP Value
                    },
                    'PlanDetails': {
                        'PlanCd': this.getHdfcHealthPremiumList.plan_code,
                    },
                    'PaymentDetails': {
                        'PaymentMode': this.hdfcpersonalValues.paymentmode,
                    },
                    'Member': {
                        'InsuredDetails': this.insurerData.items
                    }
                }

            }
            console.log(data, 'data22');

            this.settings.loadingSpinner = true;
            this.proposalservice.createHdfcHealthProposal(data).subscribe(
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
        if (successData.IsSuccess == true) {
            this.toastr.success('Proposal created successfully!!');
            stepper.next();
            this.summaryData = successData.ResponseObject;
            console.log(this.summaryData);
            sessionStorage.hdfc_health_proposal_id = successData.ResponseObject.ProposalId;
            this.insurerDtails = successData.ResponseObject.InsurePolicyholderDetails;
            this.nomineeDtails = successData.ResponseObject.InsurePolicyholderDetails[0];
            this.proposalDtails = successData.ResponseObject.ProposalDetails;
            this.fullName = this.proposalDtails.fname +' '+ this.proposalDtails.lname;
            this.totalAmount = parseFloat(this.proposalDtails.totalPremium);
            console.log(this.proposalDtails, 'proposalDtails');
            console.log(this.insurerDtails, 'insurerDtailsinsurerDtails');

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    public proposalFailure(error) {

    }
// sessionData
    sessionData() {
        if (sessionStorage.hdfcStep1 != '' && sessionStorage.hdfcStep1 != undefined) {
            console.log(JSON.parse(sessionStorage.hdfcStep1), 'sessionStorage.hdfcStep1');
            this.hdfcStep1 = JSON.parse(sessionStorage.hdfcStep1);
            this.hdfcPersonal = this.fb.group({
                title: this.hdfcStep1.title,
                firstname: this.hdfcStep1.firstname,
                lastname: this.hdfcStep1.lastname,
                dob: new FormControl(new Date(this.hdfcStep1.dob)),
                gender: this.hdfcStep1.gender,
                address1: this.hdfcStep1.address1,
                address2: this.hdfcStep1.address2,
                address3: this.hdfcStep1.address3,
                pincode: this.hdfcStep1.pincode,
                state: this.hdfcStep1.state,
                city: this.hdfcStep1.city,
                email: this.hdfcStep1.email,
                mobile: this.hdfcStep1.mobile,
                accepted: this.hdfcStep1.accepted,
                paymentmode: this.hdfcStep1.paymentmode,
                otp: this.hdfcStep1.otp
            });
            if (this.hdfcStep1.state != '') {
                this.selectedSate(this.hdfcPersonal.value, 'personal', 'index');
                this.hdfcPersonal.controls['city'].patchValue(this.hdfcStep1.city);
            }
            if (this.hdfcStep1.dob != '') {
                let dob = this.datepipe.transform(this.hdfcStep1.dob, 'y-MM-dd');
                this.hdfcHealthProposerAge = this.ageCalculate(dob);
                this.ageData(this.hdfcHealthProposerAge, 'personal');
                if (this.hdfcHealthProposerAge > 45) {
                    this.checkAccepted();
                }
            }
            if (sessionStorage.pincodeValid != '' && sessionStorage.pincodeValid != undefined) {
                this.pincodeValid =  sessionStorage.pincodeValid;
            }

        }
        if (sessionStorage.hdfcStep2 != '' && sessionStorage.hdfcStep2 != undefined) {
            console.log(JSON.parse(sessionStorage.hdfcStep2), 'sessionStoragehdfcStep2');
            this.hdfcStep2 = JSON.parse(sessionStorage.hdfcStep2);
            for (let i = 0; i < this.hdfcStep2.items.length; i++) {
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].title.patchValue(this.hdfcStep2.items[i].title);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].firstname.patchValue(this.hdfcStep2.items[i].firstname);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].lastname.patchValue(this.hdfcStep2.items[i].lastname);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].gender.patchValue(this.hdfcStep2.items[i].gender);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].dob.patchValue(this.hdfcStep2.items[i].dob);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].relationship.patchValue(this.hdfcStep2.items[i].relationship);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].ins_age.patchValue(this.hdfcStep2.items[i].ins_age);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].preexdisease.patchValue(this.hdfcStep2.items[i].preexdisease);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobError.patchValue(this.hdfcStep2.items[i].insurerDobError);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].insurerDobValidError.patchValue(this.hdfcStep2.items[i].insurerDobValidError);
                this.hdfcInsureArray['controls'].items['controls'][i]['controls'].sameasInsurer.patchValue(this.hdfcStep2.items[i].sameasInsurer);
            }

        }
        // if (sessionStorage.ReligareTravelDetails3 != '' && sessionStorage.ReligareTravelDetails3 != undefined) {
        //     console.log(JSON.parse(sessionStorage.ReligareTravelDetails3), 'sessionStorage.proposal3Detail');
        //     // this.getStepper3 = JSON.parse(sessionStorage.proposal3Detail);
        //     this.religareTravelQuestionsList = JSON.parse(sessionStorage.ReligareTravelDetails3);
        //     console.log(this.religareTravelQuestionsList, 'sessionStorage.this.personalAccidentQuestionsList');
        //
        // } else {
        //     // this. religareQuestions();
        // }
        if (sessionStorage.hdfcHealthNomineeDetails != '' && sessionStorage.hdfcHealthNomineeDetails != undefined) {
            console.log(JSON.parse(sessionStorage.hdfcHealthNomineeDetails), 'sessionStorage.hdfcHealthNomineeDetails');
            this.hdfcHealthNomineeDetails = JSON.parse(sessionStorage.hdfcHealthNomineeDetails);
            this.nomineeDetails = this.fb.group({
                nomineeName: this.hdfcHealthNomineeDetails.nomineeName,
                nomineeRelationship: this.hdfcHealthNomineeDetails.nomineeRelationship
            });
        }
        if (sessionStorage.sameAsinsure != '' && sessionStorage.sameAsinsure != undefined) {
            this.sameAsinsure = sessionStorage.sameAsinsure;
            this.sameasInsurerDetails(this.sameAsinsure);

        }
    }
}




