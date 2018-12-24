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
  selector: 'app-bajaj-alianz',
  templateUrl: './bajaj-alianz.component.html',
  styleUrls: ['./bajaj-alianz.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class BajajAlianzComponent implements OnInit {
    public proposer: FormGroup;
    public insureArray: FormGroup;
    public minDate: any;
    public stopNext: any;
    public hideQuestion: any;
    public declaration: any;
    public settings: Settings;
    public webhost: any;
    public selectDate: any;
    public proposalId: any;
    public step: any;
    public buyProductdetails: any;
    public enquiryId: any;
    public groupName: any;
    public occupationList: any;
    public relationshipList: any;
    public insureRelation: any;
    public nomeeRelation: any;
    public summaryData: any;

    public getStepper2: any;
    public getStepper1: any;
    public proposerData: any;
    public lastStepper: any;

    public setDate: any;
    public setDateAge: any;
    public dob: any;
    public dobError: any;
    public insureAge: any;
    public getFamilyDetails: any;
    public items: any;
    public insurePersons: any;
    public insurerData: any;
    public totalInsureDetails: any;
    public RediretUrlLink: any;

  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
              public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
      const minDate = new Date();
      this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      this.stopNext = false;
      this.hideQuestion = false;
      this.declaration = false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.selectDate = '';
      this.proposalId = 0;
      this.step = 0;
      this.totalInsureDetails = [];

      this.proposer = this.fb.group({
          rolecd: 'PROPOSER',
          proposerTitle: ['',Validators.required],
          proposerFirstname: ['',Validators.required],
          proposerMidname: '',
          proposerLastname: ['',Validators.required],
          proposerGender: ['', Validators.compose([Validators.required])],
          proposerDob: ['', Validators.compose([Validators.required])],
          proposerEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          proposerMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
          // aadharnumber: ['', Validators.compose([Validators.required])],
          // proposerPan: ['', Validators.compose([ Validators.minLength(10), Validators.required])],
          proposerPhone: '',
          proposerAddress: ['',Validators.required],
          proposerAddress2:'',
          proposerPincode: ['', Validators.required],
          proposerNationality: ['', Validators.required],
          proposerState: ['', Validators.required],
          proposerDistrict: ['', Validators.required],
          proposerCity: ['', Validators.required],
          proposerArea: ['', Validators.required],
          proposerPIName:['', Validators.required],
          proposerPIAddress:['', Validators.required],
          proposerPItDate: ['', Validators.compose([Validators.required])],
          proposerPINumber: ['', Validators.required],
          proposerPIClaims: ['', Validators.required],
          sameas: false,
          type: ''
      });
      this.insureArray = this.fb.group({

      });
  }
    changeGender() {
        if (this.proposer.controls['proposerTitle'].value == 'MR'){
            this.proposer.controls['proposerGender'].patchValue('Male');
        } else {
            this.proposer.controls['proposerGender'].patchValue('Female');
        }
    }
    insureChangeGender(index) {
        if (this.insureArray['controls'].items['controls'][index]['controls'].insureTitle.value == 'MR') {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Male');
        } else {
            this.insureArray['controls'].items['controls'][index]['controls'].insureGender.patchValue('Female');
        }
    }

    ngOnInit() {
        this.setOccupationList();
        this.setrelationshipList();
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.insurePersons = this.getFamilyDetails.family_members;
        this.insureArray = this.fb.group({
            items: this.fb.array([])
        });
        for (let i = 0; i < this.getFamilyDetails.family_members.length; i++) {
            this.items = this.insureArray.get('items') as FormArray;
            this.items.push(this.initItemRows());
            this.insureArray['controls'].items['controls'][i]['controls'].type.setValue(this.getFamilyDetails.family_members[i].type);
        }
        this.sessionData();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
  }

    initItemRows() {
        return this.fb.group(
            {
                rolecd: 'PRIMARY',
                insureTitle: ['', Validators.required],
                insureName: ['', Validators.required],
                insureDob: ['', Validators.compose([Validators.required])],
                insureGender: ['', Validators.compose([Validators.required])],
                insureAge: ['', Validators.compose([Validators.required])],
                insureHeight: ['', Validators.compose([Validators.required])],
                insureWeight: ['', Validators.compose([Validators.required])],
                insureoccupation: ['', Validators.required],
                insurerelationship: ['', Validators.required],
                insureGMIncome: ['', Validators.required],
                bajajNomineeName: ['', Validators.required],
                bajajRelationship: ['', Validators.required],
                insurePEDisease: 'No',
                insureAsthma: 'No',
                insureDisordr: 'No',
                insureHeartDisease: 'No',
                insureHypertension: 'No',
                insureDiabetes: 'No',
                insureObesity: 'No',
                insureSmoking: 'No',
                insureCName:'',
                insurePItDate:'',
                insurePINumber:'',
                insureSInsurance:'',
                type: '',
                insureDobError: '',
                ins_days: '',
                ins_age: ''

            }
        );
    }

    //Personal Details
    proposerDetails(stepper: MatStepper, value) {
        this.proposerData = value;
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        if (this.proposer.valid) {
            if (sessionStorage.proposerAge >= 18) {
                    stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }

    //Insure Details
    bajajInsureDetails(stepper: MatStepper, id, value, key) {
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper2Details = JSON.stringify(value);
        if (this.insureArray.valid) {
            this.insurerData = value.items;
            this.totalInsureDetails = [];
            for (let i = 0; i < this.insurePersons.length; i++) {
                this.totalInsureDetails.push({
                    'membername': this.insurerData[i].insureName,
                    'memrelation': this.insurerData[i].insurerelationship,
                    'memdob': this.insurerData[i].insureDob,
                    'memage': this.insurerData[i].insureAge,
                    'memgender': this.insurerData[i].insureGender,
                    'memheightcm': this.insurerData[i].insureHeight,
                    'memweightkg': this.insurerData[i].insureWeight,
                    'memoccupation': this.insurerData[i].insureoccupation,
                    'memgrossmonthlyincome': this.insurerData[i].insureGMIncome,
                    'memnomineename': this.insurerData[i].bajajNomineeName,
                    'memnomineerelation': this.insurerData[i].bajajRelationship,
                    'memcompname': this.insurerData[i].insureCName,
                    'memprvpolno': this.insurerData[i].insurePINumber,
                    'memprvexpdate': this.insurerData[i].insurePItDate,
                    'memprvsi': this.insurerData[i].insureSInsurance,
                    'mempreexistdisease': this.insurerData[i].insureHeartDisease == 'Yes' ? '1' : '0',
                    'memsmkertbco': this.insurerData[i].insureSmoking == 'Yes' ? '1' : '0',
                    'memasthma': this.insurerData[i].insureAsthma == 'Yes' ? '1' : '0',
                    'memcholstrldisordr': this.insurerData[i].insureDisordr == 'Yes' ? '1' : '0',
                    'memheartdisease': this.insurerData[i].insureHeartDisease == 'Yes' ? '1' : '0',
                    'memhypertension': this.insurerData[i].insureHypertension == 'Yes' ? '1' : '0',
                    'memdiabetes': this.insurerData[i].insureDiabetes == 'Yes' ? '1' : '0',
                    'memobesity': this.insurerData[i].insureObesity == 'Yes' ? '1' : '0',
                    'membmi': '',
                    'memspecialcondition': 'NA',
                    'memaddflag': 'Y'
                });
            }
            let ageValidate = [];
            for (let i = 0; i< this.insurerData.length; i++){
                if ( this.insureArray['controls'].items['controls'][i]['controls'].insureDobError.value  != '') {
                    ageValidate.push(1);

                } else{
                    ageValidate.push(0);
                }
            }
            if(!ageValidate.includes(1)){
                this.lastStepper = stepper;
                this.proposal();
            }

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


    addEvent(event, title, index) {
        let dd = event.value;
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');
        this.setDateAge = this.datepipe.transform(this.selectDate, 'y-MM-dd');
        this.insureAge = this.ageCalculate(this.setDateAge);
        if(title == 'proposer'){
            sessionStorage.setItem('proposerAge', this.insureAge);
        } else if(title == 'insurer') {
            sessionStorage.setItem('insureAge', this.insureAge);
            this.insureArray['controls'].items['controls'][index]['controls'].insureAge.patchValue(sessionStorage.insureAge);
            // this.insureArray['controls'].items['controls'][index]['controls'].proposerPItDate.patchValue(sessionStorage.proposerPItDate);
            // this.insureArray['controls'].items['controls'][index]['controls'].insurePItDate.patchValue(sessionStorage.insurePItDate);
        }
        if (event.value != null) {
            let selectedDate = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    this.dobError = '';
                } else {
                    this.dobError = 'Enter Valid Date';
                }
                selectedDate = event.value._i;
                // this.dob = event.value._i;

                let dob = this.datepipe.transform(event.value, 'y-MM-dd');
                this.dob = dob;
                if (selectedDate.length == 10) {
                    this.ageCalculate(dob);
                } else {
                }

            } else if (typeof event.value._i == 'object') {

                this.dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (this.dob.length == 10) {
                    this.ageCalculate(this.datepipe.transform(event.value, 'y-MM-dd'));
                } else {

                }

                this.dobError = '';
                let date = event.value._i.date;
                if (date.toString().length == 1) {
                    date = '0' + date;
                }
                let month = (parseInt(event.value._i.month) + 1).toString();

                if (month.length == 1) {
                    month = '0' + month;
                }
                let year = event.value._i.year;
                this.dob = date + '-' + month + '-' + year;
            }
        }

    }

    public onCharacter(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[a-zA-Z]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }

    ageCalculate(dob) {
        const mdate = dob.toString();
        const yearThen = parseInt(mdate.substring(8, 10), 10);
        const monthThen = parseInt(mdate.substring(5, 7), 10);
        const dayThen = parseInt(mdate.substring(0, 4), 10);
        const todays = new Date();
        const birthday = new Date(dayThen, monthThen - 1, yearThen);
        const differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        const yearAge = Math.floor(differenceInMilisecond / 31536000000);
        return yearAge;
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getBajajOccupation(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }

    public occupationListSuccess(successData) {
        this.occupationList = successData.ResponseObject;
    }

    public occupationListFailure(error) {
    }

    setrelationshipList() {
        const data = {
            'platform': 'web',
            'product_id': '1',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getBajajRelationship(data).subscribe(
            (successData) => {
                this.relationListSuccess(successData);
            },
            (error) => {
                this.relationListFailure(error);
            }
        );

    }

    public relationListSuccess(successData) {
        this.relationshipList = successData.ResponseObject;
             this.insureRelation = [];
            this.nomeeRelation = [];
        for (let i = 0; i < this.relationshipList.length; i++) {
            if(this.relationshipList[i].show_prop_relationship == 1) {
                this.insureRelation.push(
                    {
                    'relationship_name': this.relationshipList[i].relationship_name,
                    'relationship_id': this.relationshipList[i].relationship_id
                    });
            }
            if(this.relationshipList[i].show_nominee_relationship == 1) {
                this.nomeeRelation.push(
                    {
                    'relationship_name': this.relationshipList[i].relationship_name,
                    'relationship_id': this.relationshipList[i].relationship_id
                });
            }

        }
    }

    public relationListFailure(error) {
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details);
            this.proposer = this.fb.group({
                rolecd: this.getStepper1.rolecd,
                proposerTitle: this.getStepper1.proposerTitle,
                proposerFirstname: this.getStepper1.proposerFirstname,
                proposerMidname: this.getStepper1.proposerMidname,
                proposerLastname: this.getStepper1.proposerLastname,
                proposerGender: this.getStepper1.proposerGender,
                proposerDob: this.getStepper1.proposerDob,
                proposerEmail: this.getStepper1.proposerEmail,
                proposerMobile: this.getStepper1.proposerMobile,
                // aadharnumber: this.getStepper1.aadharnumber,
                // proposerPan: this.getStepper1.proposerPan,
                proposerPhone: this.getStepper1.proposerPhone,
                proposerAddress: this.getStepper1.proposerAddress,
                proposerAddress2: this.getStepper1.proposerAddress2,
                proposerPincode: this.getStepper1.proposerPincode,
                proposerNationality: this.getStepper1.proposerNationality,
                proposerState: this.getStepper1.proposerState,
                proposerDistrict: this.getStepper1.proposerDistrict,
                proposerCity: this.getStepper1.proposerCity,
                proposerArea: this.getStepper1.proposerArea,
                proposerPIName: this.getStepper1.proposerPIName,
                proposerPIAddress: this.getStepper1.proposerPIAddress,
                proposerPItDate: this.getStepper1.proposerPItDate,
                proposerPINumber: this.getStepper1.proposerPINumber,
                proposerPIClaims: this.getStepper1.proposerPIClaims,
            })
        }
        if (sessionStorage.stepper2Details != '' && sessionStorage.stepper2Details != undefined) {
            this.getStepper2 = JSON.parse(sessionStorage.stepper2Details);
            for (let i = 0; i < this.getStepper2.items.length; i++) {
                this.insureArray['controls'].items['controls'][i]['controls'].insureTitle.patchValue(this.getStepper2.items[i].insureTitle);
                this.insureArray['controls'].items['controls'][i]['controls'].insureName.patchValue(this.getStepper2.items[i].insureName);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDob.patchValue(this.getStepper2.items[i].insureDob);
                this.insureArray['controls'].items['controls'][i]['controls'].insureGender.patchValue(this.getStepper2.items[i].insureGender);
                this.insureArray['controls'].items['controls'][i]['controls'].insureAge.patchValue(this.getStepper2.items[i].insureAge);
                this.insureArray['controls'].items['controls'][i]['controls'].insureHeight.patchValue(this.getStepper2.items[i].insureHeight);
                this.insureArray['controls'].items['controls'][i]['controls'].insureWeight.patchValue(this.getStepper2.items[i].insureWeight);
                this.insureArray['controls'].items['controls'][i]['controls'].insureoccupation.patchValue(this.getStepper2.items[i].insureoccupation);
                this.insureArray['controls'].items['controls'][i]['controls'].insurerelationship.patchValue(this.getStepper2.items[i].insurerelationship);
                this.insureArray['controls'].items['controls'][i]['controls'].insureGMIncome.patchValue(this.getStepper2.items[i].insureGMIncome);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePEDisease.patchValue(this.getStepper2.items[i].insurePEDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDisordr.patchValue(this.getStepper2.items[i].insureDisordr);
                this.insureArray['controls'].items['controls'][i]['controls'].insureHeartDisease.patchValue(this.getStepper2.items[i].insureHeartDisease);
                this.insureArray['controls'].items['controls'][i]['controls'].insureHypertension.patchValue(this.getStepper2.items[i].insureHypertension);
                this.insureArray['controls'].items['controls'][i]['controls'].insureDiabetes.patchValue(this.getStepper2.items[i].insureDiabetes);
                this.insureArray['controls'].items['controls'][i]['controls'].insureObesity.patchValue(this.getStepper2.items[i].insureObesity);
                this.insureArray['controls'].items['controls'][i]['controls'].insureSmoking.patchValue(this.getStepper2.items[i].insureSmoking);
                this.insureArray['controls'].items['controls'][i]['controls'].insureCName.patchValue(this.getStepper2.items[i].insureCName);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePItDate.patchValue(this.getStepper2.items[i].insurePItDate);
                this.insureArray['controls'].items['controls'][i]['controls'].insurePINumber.patchValue(this.getStepper2.items[i].insurePINumber);
                this.insureArray['controls'].items['controls'][i]['controls'].insureSInsurance.patchValue(this.getStepper2.items[i].insureSInsurance);
                this.insureArray['controls'].items['controls'][i]['controls'].bajajNomineeName.patchValue(this.getStepper2.items[i].bajajNomineeName);
                this.insureArray['controls'].items['controls'][i]['controls'].bajajRelationship.patchValue(this.getStepper2.items[i].bajajRelationship);
            }
        }
    }
    boolenHide(change: any, id, key){
        if(key == 'insurePEDisease' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insurePEDisease.patchValue('');
        }
        if(key == 'insureAsthma' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureAsthma.patchValue('');
        }
        if(key == 'insureDisordr' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureDisordr.patchValue('');
        }
        if(key == 'insureHeartDisease' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureHeartDisease.patchValue('');
        }
        if(key == 'insureHypertension' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureHypertension.patchValue('');
        }
        if(key == 'insureDiabetes' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureDiabetes.patchValue('');
        }
        if(key == 'insureObesity' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureObesity.patchValue('');
        }
        if(key == 'insureSmoking' && change.value == 'No') {
            this.insureArray['controls'].items['controls'][id]['controls'].insureSmoking.patchValue('');
        }
    }

    //create poposal
    proposal(){
        this.settings.loadingSpinner = true;
        const data  = {
            'platform': 'web',
                'product_id': this.buyProductdetails.product_id,
                'proposal_id': sessionStorage.proposalID ? sessionStorage.proposalID.toString(): this.proposalId.toString(),
                'enquiry_id': this.enquiryId,
                'company_name': 'bajajalianz',
                'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'transactionid': '',
                'tycpdetails': {
                'beforetitle': this.proposerData.proposerTitle,
                    'contact1': this.proposerData.proposerMobile,
                    'dateofbirth': this.proposerData.proposerDob,
                    'sex': this.proposerData.proposerGender,
                    'telephone': this.proposerData.proposerPhone,
                    'email': this.proposerData.proposerEmail,
                    'firstname': this.proposerData.proposerFirstname,
                    'surname': this.proposerData.proposerLastname,
                    'middlename': this.proposerData.proposerMidname
            },
            'tycpaddrlist': [{
                'postcode': this.proposerData.proposerPincode,
                'addressline1': this.proposerData.proposerAddress,
                'addressline2': this.proposerData.proposerAddress2,
                'areaname': this.proposerData.proposerArea,
                'cityname': this.proposerData.proposerCity,
                'countryname': this.proposerData.proposerNationality,
                'state': this.proposerData.proposerState
            }],
                'previnsdtls': {
                'previnsname': this.proposerData.proposerPIName,
                    'previnsaddress': this.proposerData.proposerPIAddress,
                    'previnspolicyno': this.proposerData.proposerPINumber,
                    'prevpolicyexpirydate': this.proposerData.proposerPItDate,
                    'noofclaims': this.proposerData.proposerPIClaims
            },
            'hcpdtmemlist': this.totalInsureDetails,
                'hcpdtmemcovlist': [{
                'memiptreatsi': this.buyProductdetails.suminsured_amount
            }]
        };
        this.proposalservice.getbajajProposal(data).subscribe(
            (successData) => {
                this.proposalSuccess(successData);
            },
            (error) => {
                this.proposalFailure(error);
            });
    }
    proposalSuccess(successData){
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
                this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            let getdata=[];
            this.RediretUrlLink = this.summaryData.payment_url;
            this.proposalId = this.summaryData.proposal_id;
            sessionStorage.proposalID = this.proposalId;
            this.lastStepper.next();
        } else{
            this.toastr.error(successData.ResponseObject.ErrorObject);
        }
    }

    proposalFailure(error){
        this.settings.loadingSpinner = false;
    }

    add(event){
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }
}
