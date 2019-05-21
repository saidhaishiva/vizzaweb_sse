import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ValidationService} from '../../shared/services/validation.service';
import {ActivatedRoute} from '@angular/router';
import {element} from 'protractor';
import {TermLifeCommonService} from '../../shared/services/term-life-common.service';
import * as moment from 'moment';
import {Http} from '@angular/http';
import {AgeValidate} from '../health-insurance/health-insurance.component';
import {CommonService} from '../../shared/services/common.service';


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
  selector: 'app-life-bajaj-proposal',
  templateUrl: './life-bajaj-proposal.component.html',
  styleUrls: ['./life-bajaj-proposal.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class LifeBajajProposalComponent implements OnInit {
  public proposer: FormGroup;
  public questions: FormGroup;
  public nomineeDetail: FormGroup;
  public bankDetail: FormGroup;
  public apointeeDetails: FormGroup;
  public itemsNominee: any;
  public proposerdateError: any;
  public settings: Settings;
  public bajajAge: any;
  public spouseAge:any;
  public nomineeAge: any;
  public paIdProofList: any;
  public ageProofList: any;
  public maritalStatusList: any;
  public languageList: any;
  public proposerTypeList: any;
  public docLanguageList: any;
  public primiumpayList: any;
  public nationalityList: any;
  public citizenshipList: any;
  public countryList: any;
  public TitleList: any;
  public weightList: any;
  public occupationList: any;
  public politicalDetails: boolean;
  public showAppointee: boolean;
  public MainQuesList: any;
  public SubQuesList: any;
  public questionId: any;
  public status: any;
  public subQuestionText: any;
  public sampleee: any;
  public mobilecode: any;
  public nomineeRelationList: any;
  public pincodeList:any;
  public lifeBajajProposal:any;
  public nRelationName:any;
  public getNomineeDetails:any;
  public lifePremiumList:any;
  public today:any;
  public getEnquiryDetials:any;
  public idProofList:any;
  public incomeProofList:any;
  public ageProofsList:any;
  public educationList:any;
  public summaryData:any;
  public proposerFormData:any;
  public bankDetailFormData:any;
  public nomineeDetailFormData:any;
  public spouseDobError:any;
  public nomineeDobValidError:any;
  public proposalNextList:any;
  public proposalFormPdf:any;
  public appointeeDobValidError:any;

  public getDays:any;
  public getAge:any;
  public slectedIndex:any;
  public declaration: any;
  public requestedUrl: any;
  public diseaseLists: any;
  public enquiryFormData: any;
  public setQuestionDetails: any;
  public apointeRelationList:any;
  public relationInsured:any;
  public incomeList: boolean;
  public proposalGenStatus: boolean;
  public optGenStatus: boolean;
  public optValidStatus: boolean;
  public skipUploadStatus: boolean;
  public fileUploadStatus: boolean;
  public otpValList: any;
  public otpGenList: any;
  public otpCode: any;
  public getUrl: any;
  public fileDetails: any;
  public allImage: any;
  public url: any;
  public fileUploadPath: any;
    public webhost: any;
    public uploadIdProofName: any;
    public uploadAgeProofName: any;
    public uploadAddressProofName: any;
    public currentStep: any;
    public documentPath: any;


    constructor(public Proposer: FormBuilder,public http : Http, public dialog: MatDialog, public datepipe: DatePipe, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService,) {
        this.requestedUrl = '';
        let stepperindex = 0;
        this.route.params.forEach((params) => {
            if(params.stepper == true || params.stepper == 'true') {
                stepperindex = 6;
                if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {
                    let summaryData = JSON.parse(sessionStorage.summaryData);
                    this.summaryData = summaryData;
                    this.requestedUrl = summaryData.biUrlLink;
                    this.proposerFormData = JSON.parse(sessionStorage.proposerFormData);
                    this.bankDetailFormData = JSON.parse(sessionStorage.bankDetailFormData);
                    this.nomineeDetailFormData = JSON.parse(sessionStorage.nomineeDetailFormData);
                }

            }
        });
        this.currentStep = stepperindex;

      let today = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.webhost = this.config.getimgUrl();

      this.proposer = this.Proposer.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      midName: '',
      lastName: ['', Validators.required],
      gender: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      age: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
      alterMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      annualIncome: '',
      occupationList: ['', Validators.compose([Validators.required])],
      height: ['', Validators.compose([Validators.minLength(3)])],
      weight: '',
      inbetweenweight: '',
      weightChangedreason: '',
      weightChanged: '',
      weightChangedName: '',
      weightChangedReasonName: '',
      aadharNum: '',
      spouseDob: '',
      maritalStatusName: '',
      occupationListName: '',
      proposerTypeName: '',
      language2Name: '',
      languageName: '',
      premiumPayTermName: '',
      nationalityName: '',
      citizenshipName: '',
      spouseName: '',
      spouseBirthPlace: '',
      countryOfResidName: '',
      motherName: '',
      fatherName: '',
      ifYesGiveDetails: '',
      panNum:['', Validators.compose([ Validators.minLength(10)])],
      politicallyExposedPerson: '',
      countryIpMailing: '',
      relation: '',
      citizenship: '',
      pob: '',
      countryOfResid: '',
      nationality: '',
      // premiumfreq: '',
      // premiumPayTerm: '',
      // lifeBenefit: '',
      language2: '',
      proposerType: '',
      language: '',
      IpRelation:'',
      // benefitTerm: '',
      comDoorNo:'',
      comBuildingNumber:'',
      comPlotNumber:'',
      comLandmark:'',
      comPlace:'',
      comDistrict:'',
      pincode: '',
      city: '',
      state: '',
      sameAsProposer: '',
      sameAsInsured: 'true',
      perDoorNo:'',
      perBuildingNumber:'',
      perPlotNumber:'',
      perLandmark:'',
      perPlace:'',
      perDistrict:'',
      rpincode: '',
      rcity: '',
      rstate: '',
      department:'',
      officeName:'',
      officeAddress1:'',
      officeAddress2:'',
      officeAddress3:'',
      officeDistrict:'',
      officeState:'',
      officePincode:'',
      officeNumber:'',
      addressProof:'',
      addressProofName:'',

      ageProof:'',
      incomeProof:'',
      incomeProofName:'',
      idProof:'',
      idProofName:'',
      ageProofName:'',
      educationName:'',
      education:'',




    });
    this.proposer.controls['sameAsInsured'].patchValue(true);
    // this.nomineeDetail = this.Proposer.group({
    //   nName: ['', Validators.required],
    //   nDob: ['', Validators.required],
    //   nBirthPlace: ['', Validators.required],
    //   nRelation: ['', Validators.required],
    // });
    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.politicalDetails = false;

    this.nomineeDetail = this.Proposer.group({
      itemsNominee: this.Proposer.array([])
      // nnName: ['', Validators.required],
      // nDob: ['', Validators.required],
      // nBirthPlace: ['', Validators.required],
      // nRelation:['', Validators.required],
      // nRelationName:'',
      // nomineeDobValidError: ''

    });

    this.bankDetail = this.Proposer.group({
      accountHolderName:'',
      bankName:['', Validators.required],
      branchName:'',
      accountNo:'',
      accountType:'',
      ifscCode:'',
      micrCode:'',

    });

    this.questions = this.Proposer.group({});
    this.setQuestionDetails = [];
    this.allImage = [];
    this.proposalNextList = '';
    this.otpGenList = '';
    this.otpValList = '';
    this.proposalGenStatus = true;
    this.optGenStatus = true;
    this.optValidStatus = true;
      this.skipUploadStatus = true;
        this.fileUploadStatus = true;




        const data = {
            "user_id": "0",
            "role_id": "4",
            "pos_status": "0",
            "platform": "web",
            "policy_id": "8",
            "Persons": [{
                "Documents": [],
                "Type": "PH"
            }]
        };

        let test = [{
            "base64": "sdws",
            "proofType": "age_proof",
            "fileExt": "png"
        },
            {
                "base64": "uytrfds",
                "proofType": "id_proof",
                "fileExt": "png"
            }
        ];

        data.Persons[0].Documents = test;

        console.log(data, 'datadata');
  }


  ngOnInit() {
      this.enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
      this.lifePremiumList = JSON.parse(sessionStorage.lifePremiumList);
      console.log(this.lifePremiumList, 'kjhgdhgh');

    this.getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);

    this.paIdList();
    this.ageProof();
    this.maritalStatus();
    this.cLanguageList();
    this.proposerType();
    this.docLanguage();
    this.primiumList();
    this.nationality();
    this.citizenship();
    this.country();
    this.title();
    this.weightChanged();
    this.nomineeRelation();
    this.occupation();
    this.getageProof();
    this.getIdProof();
    this.education();
    this.getApointeeRelation();
    this.getDiseaseList();
    this.samerelationShip();

    if (sessionStorage.lifeQuestions == '' || sessionStorage.lifeQuestions == undefined) {
        this.mainQuestion();
    }

          //NOMINEE Details
    // this.itemsNominee = this.nomineeDetail.get('itemsNominee') as FormArray;
    // this.itemsNominee.push(this.nomineeItems());
    //
    // console.log(this.itemsNominee,'var');
    // console.log(this.nomineeDetail.get('itemsNominee')['controls'],'controls');

    for (let i = 0; i < 1; i++) {
      this.itemsNominee = this.nomineeDetail.get('itemsNominee') as FormArray;
      this.itemsNominee.push(this.nomineeItems());
    }


    this.sessionData();


  }

  nomineeItems() {
    return this.Proposer.group({
      nnName: '',
      nDob: '',
      nBirthPlace:'',
      nRelation: '',
      nRelationName: '',
      nomineeDobValidError:'',
      appointeeDobValidError:'',
      sharePercentage:'',
      aName: '',
      appointeeDob:'',
      appointeeRelationToNominee:'',
      relationToInsured:'',
      relationToInsuredName:''
    });
  }

  // add NOmineee
  addNominee(event) {
    console.log(this.itemsNominee.value, 'val');
    console.log(this.itemsNominee.valid, 'valddd');
    if(this.itemsNominee.valid) {
      this.itemsNominee.push(this.nomineeItems());
    }
    // if (this.itemsNominee.length < 2) {
    //   this.itemsNominee.push(this.nomineeItems());
    // }
  }

  removeNominee(event, index) {
    if (index == 1) {
      this.itemsNominee.removeAt(1);
    }

  }


  sameAddress(evnt) {
    if (evnt.checked) {
      this.proposer.controls['perDoorNo'].patchValue(this.proposer.controls['comDoorNo'].value);
      this.proposer.controls['perBuildingNumber'].patchValue(this.proposer.controls['comBuildingNumber'].value);
      this.proposer.controls['perLandmark'].patchValue(this.proposer.controls['comLandmark'].value);
      this.proposer.controls['perPlotNumber'].patchValue(this.proposer.controls['comPlotNumber'].value);
      this.proposer.controls['perPlace'].patchValue(this.proposer.controls['comPlace'].value);
      this.proposer.controls['perDistrict'].patchValue(this.proposer.controls['comDistrict'].value);
      this.proposer.controls['rpincode'].patchValue(this.proposer.controls['pincode'].value);
      this.proposer.controls['rcity'].patchValue(this.proposer.controls['city'].value);
      this.proposer.controls['rstate'].patchValue(this.proposer.controls['state'].value);


    } else {
      this.proposer.controls['perDoorNo'].patchValue('');
      this.proposer.controls['perBuildingNumber'].patchValue('');
      this.proposer.controls['perPlotNumber'].patchValue('');
      this.proposer.controls['perLandmark'].patchValue('');
      this.proposer.controls['perPlace'].patchValue('');
      this.proposer.controls['perDistrict'].patchValue('');
      this.proposer.controls['rpincode'].patchValue('');
      this.proposer.controls['rcity'].patchValue('');
      this.proposer.controls['rstate'].patchValue('');


    }
  }
  typeAddress(event) {
      console.log(event.checked, 'hh');
    if(this.proposer.controls['sameAsProposer'].value) {
      this.proposer.controls['perDoorNo'].patchValue(this.proposer.controls['comDoorNo'].value);
      this.proposer.controls['perBuildingNumber'].patchValue(this.proposer.controls['comBuildingNumber'].value);
      this.proposer.controls['perLandmark'].patchValue(this.proposer.controls['comLandmark'].value);
      this.proposer.controls['perPlotNumber'].patchValue(this.proposer.controls['comPlotNumber'].value);
      this.proposer.controls['perPlace'].patchValue(this.proposer.controls['comPlace'].value);
      this.proposer.controls['perDistrict'].patchValue(this.proposer.controls['comDistrict'].value);
      this.proposer.controls['rpincode'].patchValue(this.proposer.controls['pincode'].value);
      this.proposer.controls['rcity'].patchValue(this.proposer.controls['city'].value);
      this.proposer.controls['rstate'].patchValue(this.proposer.controls['state'].value);


    }
  }


  //  validation functions
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
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

  idValidate(event: any) {
    this.validation.idValidate(event);
  }
  addressValidate(event: any) {
    this.validation.addressValidate(event);
  }
  // addressValidate(event: any){
  //   this.validation.passportIssue(event);
  //
  // }
  ifscValidate(event: any) {
      if (event.charCode !== 0) {
          const pattern = /^[A-Za-z]{4}0[A-Z0-9]{6}$/;
          const inputChar = String.fromCharCode(event.charCode);
          if (!pattern.test(inputChar)) {
              event.preventDefault();
          }
      }

  }

  // proposer page
  changeGender() {
    if (this.proposer.controls['title'].value == 'MR') {
      this.proposer.controls['gender'].patchValue('MALE');
    } else {
      this.proposer.controls['gender'].patchValue('FEMALE');
    }
  }

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

  // addEvent(event, type) {
  //   if (event.value != null) {
  //     let selectedDate = '';
  //     this.bajajAge = '';
  //     let dob = '';
  //     if (typeof event.value._i == 'string') {
  //       const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  //       if (pattern.test(event.value._i) && event.value._i.length == 10) {
  //         this.proposerdateError = '';
  //       } else {
  //         this.proposerdateError = 'Enter Valid Date';
  //       }
  //       selectedDate = event.value._i;
  //       dob = this.datepipe.transform(event.value, 'y-MM-dd');
  //       if (selectedDate.length == 10) {
  //         this.bajajAge = this.ageCalculate(dob);
  //         console.log(this.bajajAge, 'agre');
  //         sessionStorage.bajajproposerAge = this.bajajAge;
  //         console.log(sessionStorage.bajajproposerAge, 'sessionStorage.bajajproposerAge');
  //         this.proposer.controls['age'].patchValue(this.bajajAge);
  //       }
  //
  //     } else if (typeof event.value._i == 'object') {
  //       dob = this.datepipe.transform(event.value, 'y-MM-dd');
  //       if (dob.length == 10) {
  //         this.bajajAge = this.ageCalculate(dob);
  //         sessionStorage.insuredAgePA = this.bajajAge;
  //         this.proposer.controls['age'].patchValue(this.bajajAge);
  //       }
  //       this.proposerdateError = '';
  //     }
  //     if (type == 'nominee') {
  //       this.nomineeAge = this.ageCalculate(dob);
  //       console.log(this.nomineeAge,'nomineeage');
  //       if (this.nomineeAge < 18) {
  //         this.show = true;
  //       } else {
  //         this.show = false;
  //       }
  //     }
  //
  //     //sessionStorage.insuredAgePA = this.bajajAge;
  //
  //   }
  // }
  //

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.bajajAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.proposerdateError = '';
        } else {
          this.proposerdateError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.bajajAge = this.ageCalculate(dob);
          sessionStorage.bajajproposerAge = this.bajajAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.bajajAge = this.ageCalculate(dob);
          sessionStorage.bajajproposerAge = this.bajajAge;

        }
        this.proposerdateError = '';
      }
      if(this.bajajAge!='')
      {
        this.proposer.controls['age'].patchValue(this.bajajAge);
      }

    }
  }


  addEventSpouse(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.spouseAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.spouseDobError = '';
        } else {
          this.spouseDobError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.spouseAge = this.ageCalculate(dob);
          sessionStorage.spouseAge = this.spouseAge;

        }

      } else if (typeof event.value._i == 'object') {
        // dob = this.datepipe.transform(event.value, 'MMM d, y');
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.spouseAge = this.ageCalculate(dob);
          sessionStorage.spouseAge = this.spouseAge;

        }
        this.spouseDobError = '';
      }

    }
  }


  addEventNominee(event, i, type) {
      if(type == 'nominee') {
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
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');

            } else {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('Enter Valid DOB');
            }

            selectedDate = event.value._i;

            if (selectedDate.length == 10) {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
              this.getAge = this.ageCalculate(dob);
              this.getDays = this.ageCalculateInsurer(dob_days);
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(dob);

            }

          }
          else if (typeof event.value._i == 'object') {
            if (dob.length == 10) {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue('');
              this.getAge = this.ageCalculate(dob);
              this.getDays = this.ageCalculateInsurer(dob_days);
            }
          }
        }
        console.log(this.getAge, 'this.getAgethis.getAge');
        sessionStorage.nomineAge = this.getAge;
        if (this.getAge < 18) {
          this.showAppointee = true;
        } else {
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeRelationToNominee.patchValue('');
          this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue('');
          this.showAppointee = false;
        }
      } else if(type == 'appointee') {

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
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');

            } else {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('Enter Valid DOB');
            }

            selectedDate = event.value._i;

            if (selectedDate.length == 10) {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');
              this.getAge = this.ageCalculate(dob);
              this.getDays = this.ageCalculateInsurer(dob_days);
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(dob);

            }

          }
          else if (typeof event.value._i == 'object') {
            if (dob.length == 10) {
              this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue('');
              this.getAge = this.ageCalculate(dob);
              this.getDays = this.ageCalculateInsurer(dob_days);
            }
          }
        }

      }
    }




    // if (i == 'nominee') {
    //         this.nomineeAge = this.ageCalculate();
    //         console.log(this.nomineeAge,'nomineeage');
    //         if (this.nomineeAge < 18) {
    //           this.show = true;
    //         } else {
    //           this.show = false;
    //         }
    //       }
    //
    ageCalculateInsurer(getDays) {
      let a = moment(getDays, 'DD/MM/YYYY');
      let b = moment(new Date(), 'DD/MM/YYYY');
      let days = b.diff(a, 'days');
      return days;
    }
  // personal details
  proposerDetails(stepper, value) {
    console.log(value);
    sessionStorage.stepperDetails1 = JSON.stringify(value);

    console.log(value, 'valuevalue');
    console.log(this.proposer.valid, 'this.proposer.valid');
    if (this.proposer.valid) {
      if(sessionStorage.bajajproposerAge >= 18){

        if(this.proposer.controls['occupationList'].value =="T" || this.proposer.controls['occupationList'].value =="N" || this.proposer.controls['occupationList'].value == "U")
        {
          this.toastr.error('Sorry, you are not allowed to purchase policy .Please Change the Occupation');
        }else {
          let validMarital = true;
          if(this.proposer['controls'].maritalStatus.value == 'M'){
            if(this.proposer.controls['spouseBirthPlace'].value == '' || this.proposer.controls['spouseName'].value == '' || this.proposer.controls['spouseDob'].value == '') {
              validMarital = false;
              this.toastr.error('Proposer age should be greater than equal to 18');
            } else {
              validMarital = true;
            }
          }

          if(validMarital) {
            stepper.next();
            this.topScroll();
          }

        }

      } else {
          this.toastr.error('Proposer age should be greater than equal to 18');
      }

    }
    // else {
    //   this.toastr.error('error')
    // }
  }
  sameInsured(value){

    if(value.checked) {
      this.proposer.controls['IpRelation'].patchValue('');
    }
  }
samerelationShip(){
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getRelationshipList(data).subscribe(
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
          this.relationInsured = successData.ResponseObject;
          console.log(this.relationInsured, 'relatrion');
        }
      }

    public relationShipFailure(error) {
      }

  //Bank Details
  bankDetailNext(stepper, value) {
    console.log(value);
    sessionStorage.lifeBajajBankDetails = JSON.stringify(value);
    console.log(sessionStorage.lifeBajajBankDetails, 'session');
    if (this.bankDetail.valid) {
        this.proposal(stepper);
    }
  }

  medicalHistoryDetails(stepper: MatStepper) {

    sessionStorage.lifeQuestions = '';
    sessionStorage.lifeQuestions = JSON.stringify(this.MainQuesList);

    console.log(this.MainQuesList, 'lisyduhs');
      this.setQuestionDetails = [];
      let setMainRes = '';
      let setSubRes = '';
      for (let i = 0; i < this.MainQuesList.length; i++) {
          if(this.MainQuesList[i].feild == 'NUMBER' || this.MainQuesList[i].feild == 'TEXT' || this.MainQuesList[i].feild == 'Dropdown') {
              setMainRes =  this.MainQuesList[i].fieldValue;
          } else if(this.MainQuesList[i].feild == 'Y/N') {
              setMainRes =  this.MainQuesList[i].checked ? 'Y' : 'N';
          }
          this.setQuestionDetails.push({
              "questionId": this.MainQuesList[i].qus_id,
              "subQuestionId": this.MainQuesList[i].sub_qus_id,
              "questionFlag": this.MainQuesList[i].qus_flag,
              "detailAnswer": '',
              "answer": setMainRes
          });
      }
      for (let i = 0; i < this.MainQuesList.length; i++) {
        let details = [];
        for (let j = 0; j < this.MainQuesList[i].SubQuesList.length; j++) {
            details.push(this.MainQuesList[i].SubQuesList[j].subQuestionText);
          this.setQuestionDetails[i].detailAnswer = details.toString();
        }

      }
      let subQuedtionValid = true;
      for (let i = 0; i < this.MainQuesList.length; i++) {

          if(this.MainQuesList[i].checked) {
            for (let j = 0; j < this.MainQuesList[i].SubQuesList.length; j++) {
              if(this.MainQuesList[i].SubQuesList[j].subQuestionText == '') {
                subQuedtionValid = false;
              }
            }
          }
      }
      console.log(subQuedtionValid, 'subQuedtionValid');

      console.log(this.setQuestionDetails,'setQuestionDetailssetQuestionDetails');

      stepper.next();
      this.topScroll();



      //   if (medicalStatus.includes('Yes')) {
    //   // this.toastr.error('This medical questions is unable to proceed');
    //   this.toastr.error('Since you have selected Pre-Existing Disease. You are not allowed to purchase this policy.');
    // } else {
    //   stepper.next();
    //   // this.nextStep();
    //
    // }

  }


  //nominee details
  nomineeDetailNext(stepper, value) {
    console.log(value);
    sessionStorage.lifeBajaiNomineeDetails = JSON.stringify(value);
    console.log(value, 'valuevalue');
    console.log(sessionStorage.nomineAge, 'sessionStorage.nomineAge');
    console.log(this.nomineeDetail.valid, 'this.nomineeDetail.valid');
      if (this.nomineeDetail.valid) {
          if (sessionStorage.nomineAge < 18) {
            if(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aName.value !='' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value !='' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeRelationToNominee.value !='' && this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].relationToInsured.value !='' ) {
                stepper.next();
                this.topScroll();
            } else {
                this.toastr.error('Please fill the appointee details');
            }
          } else {
              stepper.next();
              this.topScroll();
          }
      }
  }

  //services
  paIdList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getAddressProof(data).subscribe(
        (successData) => {
          this.paIdProofListSuccess(successData);
        },
        (error) => {
          this.paIdProofListFailure(error);
        }
    );
  }

  // addressproof
  public paIdProofListSuccess(successData) {
    if (successData.IsSuccess) {
      this.paIdProofList = successData.ResponseObject;
      console.log(this.paIdProofList, 'dfgh');
    }
  }

  public paIdProofListFailure(error) {
  }

  // this function will get age proof list
  ageProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getAgeProof(data).subscribe(
        (successData) => {
          this.ageProofListSuccess(successData);
        },
        (error) => {
          this.ageProofListFailure(error);
        }
    );
  }

  public ageProofListSuccess(successData) {
    if (successData.IsSuccess) {
      this.ageProofList = successData.ResponseObject;
      console.log(this.ageProofList, '7656');
    }
  }

  public ageProofListFailure(error) {
  }

  // this function will get Marital status list
  maritalStatus() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getMaritalStatus(data).subscribe(
        (successData) => {
          this.maritalListSuccess(successData);
        },
        (error) => {
          this.maritalListFailure(error);
        }
    );
  }

  public maritalListSuccess(successData) {
    if (successData.IsSuccess) {
      this.maritalStatusList = successData.ResponseObject;
      console.log(this.maritalStatusList, '7656');
    }
  }

  public maritalListFailure(error) {
  }

  // this function will get communication language list
  cLanguageList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getLanguage(data).subscribe(
        (successData) => {
          this.languageListSuccess(successData);
        },
        (error) => {
          this.languageListFailure(error);
        }
    );
  }

  public languageListSuccess(successData) {
    if (successData.IsSuccess) {
      this.languageList = successData.ResponseObject;
      console.log(this.languageList, '7656');
    }
  }

  public languageListFailure(error) {
  }

  // this function will get proposer type
  proposerType() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getProposerType(data).subscribe(
        (successData) => {
          this.proposerTypeSuccess(successData);
        },
        (error) => {
          this.proposerTypeFailure(error);
        }
    );
  }

  public proposerTypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.proposerTypeList = successData.ResponseObject;
      console.log(this.proposerTypeList, 'pro');
    }
  }

  public proposerTypeFailure(error) {
  }


  // this function will Document Language List
  docLanguage() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getDocLanguage(data).subscribe(
        (successData) => {
          this.docLanguageSuccess(successData);
        },
        (error) => {
          this.docLanguageFailure(error);
        }
    );
  }

  public docLanguageSuccess(successData) {
    if (successData.IsSuccess) {
      this.docLanguageList = successData.ResponseObject;
      console.log(this.docLanguageList, 'pro');
    }
  }

  public docLanguageFailure(error) {
  }

// this function will Document Language List
  primiumList() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getDocLanguage(data).subscribe(
        (successData) => {
          this.primiumListSuccess(successData);
        },
        (error) => {
          this.primiumListFailure(error);
        }
    );
  }

  public primiumListSuccess(successData) {
    if (successData.IsSuccess) {
      this.primiumpayList = successData.ResponseObject;
      console.log(this.primiumpayList, 'pro');
    }
  }

  public primiumListFailure(error) {
  }

  nationality() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getNationality(data).subscribe(
        (successData) => {
          this.nationalityListSuccess(successData);
        },
        (error) => {
          this.nationalityListFailure(error);
        }
    );
  }

  public nationalityListSuccess(successData) {
    if (successData.IsSuccess) {
      this.nationalityList = successData.ResponseObject;
      console.log(this.nationalityList, 'pro');
    }
  }

  public nationalityListFailure(error) {
  }

  citizenship() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getCitizeship(data).subscribe(
        (successData) => {
          this.citizenshipListSuccess(successData);
        },
        (error) => {
          this.citizenshipListFailure(error);
        }
    );
  }

  public citizenshipListSuccess(successData) {
    if (successData.IsSuccess) {
      this.citizenshipList = successData.ResponseObject;
      console.log(this.citizenshipList, 'pro');
    }
  }

  public citizenshipListFailure(error) {
  }


  country() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getCountry(data).subscribe(
        (successData) => {
          this.countrySuccess(successData);
        },
        (error) => {
          this.countryFailure(error);
        }
    );
  }

  public countrySuccess(successData) {
    if (successData.IsSuccess) {
      this.countryList = successData.ResponseObject;
      console.log(this.countryList, 'pro');
    }
  }

  public countryFailure(error) {
  }
  education() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getEducation(data).subscribe(
        (successData) => {
          this.educationSuccess(successData);
        },
        (error) => {
          this.educationFailure(error);
        }
    );
  }

  public educationSuccess(successData) {
    if (successData.IsSuccess) {
      this.educationList = successData.ResponseObject;
      console.log(this.educationList, 'pro');
    }
  }

  public educationFailure(error) {
  }

  weightChanged() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getWeightChanged(data).subscribe(
        (successData) => {
          this.weightSuccess(successData);
        },
        (error) => {
          this.weightFailure(error);
        }
    );
  }

  public weightSuccess(successData) {
    if (successData.IsSuccess) {
      this.weightList = successData.ResponseObject;
      console.log(this.weightList, 'pro');
    }
  }

  public weightFailure(error) {
  }

  title() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getTitle(data).subscribe(
        (successData) => {
          this.TitleListSuccess(successData);
        },
        (error) => {
          this.TitleListFailure(error);
        }
    );
  }

  public TitleListSuccess(successData) {
    if (successData.IsSuccess) {
      this.TitleList = successData.ResponseObject;
      console.log(this.TitleList, 'title');
    }
  }

  public TitleListFailure(error) {
  }

  occupation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getOccupation(data).subscribe(
        (successData) => {
          this.occupationListSuccess(successData);
        },
        (error) => {
          this.occupationListFailure(error);
        }
    );
  }

  public occupationListSuccess(successData) {
    if (successData.IsSuccess) {
      this.occupationList = successData.ResponseObject;
      console.log(this.occupationList, 'pro');
    }
  }

  public occupationListFailure(error) {
  }

  nomineeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getnamineeRelation(data).subscribe(
        (successData) => {
          this.nomineeRelationSuccess(successData);
        },
        (error) => {
          this.nomineeRelationFailure(error);
        }
    );
  }

  public nomineeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.nomineeRelationList = successData.ResponseObject;
      console.log(this.nomineeRelationList, 'pro');
    }
  }

  public nomineeRelationFailure(error) {
  }

  getageProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.ageProof(data).subscribe(
        (successData) => {
          this.ageProofsSuccess(successData);
        },
        (error) => {
          this.ageProofsFailure(error);
        }
    );
  }

  public ageProofsSuccess(successData) {
    if (successData.IsSuccess) {
      this.ageProofsList = successData.ResponseObject;
      console.log(this.ageProofsList, 'pro');
    }
  }

  public ageProofsFailure(error) {
  }


  getProposalNext(stepper) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': '0',
      'policy_id': this.getEnquiryDetials.policy_id
    };
      this.settings.loadingSpinner = true;
      this.termService.getProposalNext(data).subscribe(
        (successData) => {
          this.ProposalNextSuccess(successData,stepper);
        },
        (error) => {
          this.ProposalNextFailure(error);
        }
    );
  }

  public ProposalNextSuccess(successData,stepper) {
      this.settings.loadingSpinner = false;
      if (successData.IsSuccess) {
        // this.toastr.success(successData.ResponseObject);

        stepper.next();
          this.topScroll();
          this.proposalGenStatus = false;
          this.proposalNextList = successData.ResponseObject;
          this.proposalFormPdf = this.proposalNextList.proposal_form;
          this.otpGen();
      } else {
            this.proposalGenStatus = true;
        this.toastr.error(successData.ErrorObject);

      }
  }
  public ProposalNextFailure(error) {
      this.settings.loadingSpinner = false;
  }
  getIdProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.idProof(data).subscribe(
        (successData) => {
          this.idProofSuccess(successData);
        },
        (error) => {
          this.idProofFailure(error);
        }
    );
  }

  public idProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.idProofList = successData.ResponseObject;
      console.log(this.idProofList, 'pro');
    }
  }

  public idProofFailure(error) {
  }

  getIncomeProof() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'occupation_id': this.proposer.controls['occupationList'].value
    }
    this.termService.incomeProof(data).subscribe(
        (successData) => {
          this.incomeProofSuccess(successData);
        },
        (error) => {
          this.incomeProofFailure(error);
        }
    );
  }

  public incomeProofSuccess(successData) {
    if (successData.IsSuccess) {
      this.incomeProofList = successData.ResponseObject;
        this.incomeList = true;
      console.log(this.incomeProofList, 'pro');
    } else {
      this.incomeList = false;

    }
  }

  public incomeProofFailure(error) {
  }

  otpGen() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'policy_id':this.getEnquiryDetials.policy_id,
    }
    this.termService.otpGeneration(data).subscribe(
        (successData) => {
          this.otpGenerationlListSuccess(successData);
        },
        (error) => {
          this.otpGenerationListFailure(error);
        }
    );
  }

  public otpGenerationlListSuccess(successData) {
    if (successData.IsSuccess) {
        this.toastr.success(successData.ResponseObject);
        this.optGenStatus = false;
      this.otpGenList = successData.ResponseObject;

        let dialogRef = this.dialog.open(BajajLifeOpt, {
            width: '1200px'
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
          if(result) {

          }

        });

    } else {
        this.optGenStatus = true;
        this.toastr.error(successData.ErrorObject);
    }
  }

  public otpGenerationListFailure(error) {
  }


  getApointeeRelation() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pos_status': this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      'occupation_id': this.proposer.controls['occupationList'].value
    }
    this.termService.apointeRelation(data).subscribe(
        (successData) => {
          this.apointeeRelationSuccess(successData);
        },
        (error) => {
          this.apointeeRelationFailure(error);
        }
    );
  }

  public apointeeRelationSuccess(successData) {
    if (successData.IsSuccess) {
      this.apointeRelationList = successData.ResponseObject;
      console.log(this.apointeRelationList, 'pro');
    }
  }

  public apointeeRelationFailure(error) {
  }

  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      'pincode': pin
    }
    if(pin.length == 6) {
        this.termService.getPincode(data).subscribe(
            (successData) => {
                this.pincodeListSuccess(successData, title);
            },
            (error) => {
                this.pincodeListFailure(error);
            }
        );
    }
  }

  public pincodeListSuccess(successData, title) {
    if (successData.IsSuccess) {
      this.pincodeList = successData.ResponseObject;
      if(title == 'personal') {
        this.proposer.controls['city'].setValue(this.pincodeList.city);
        this.proposer.controls['state'].setValue(this.pincodeList.state);
      } else {
        this.proposer.controls['rcity'].setValue(this.pincodeList.city);
        this.proposer.controls['rstate'].setValue(this.pincodeList.state);
      }
      console.log(this.pincodeList, 'pro');
    } else {
      this.toastr.error('In valid Pincode');
      if(title == 'personal') {
        this.proposer.controls['city'].setValue('');
        this.proposer.controls['state'].setValue('');
      } else {
        this.proposer.controls['rcity'].setValue('');
        this.proposer.controls['rstate'].setValue('');
      }

    }
  }

  public pincodeListFailure(error) {
  }


  politicalReson() {
    console.log(this.proposer.controls['politicallyExposedPerson'].value, 'reson');
    if (this.proposer.controls['politicallyExposedPerson'].value == 'Yes') {
      this.politicalDetails = true;
    } else {
      this.politicalDetails = false;

    }
  }

  mainQuestion() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    }
    this.termService.getMainQues(data).subscribe(
        (successData) => {
          console.log('ok');
          this.MainQuesSuccess(successData);
        },
        (error) => {
          this.MainQuesFailure(error);
        }
    );
  }

  public MainQuesSuccess(successData) {
    if (successData.IsSuccess) {
      this.MainQuesList = successData.ResponseObject;
      console.log(this.MainQuesList, 'pro');
      for (let i = 0; i < this.MainQuesList.length; i++) {
        this.MainQuesList[i].fieldValue = '';
        this.MainQuesList[i].checked = false;
        this.MainQuesList[i].SubQuesList = [];
      }
      console.log(this.MainQuesList, 'MainQuesList');

    }
  }

  public MainQuesFailure(error) {
  }

  questionYes(items, value, index) {
    console.log(index, 'index');
    this.slectedIndex = index;
    if (value.checked) {
      if (items.is_sub_question == '1') {
        const data = {
          'platform': 'web',
          'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
          'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
          'questionid': items.id
        }
        this.termService.getSubQues(data).subscribe(
            (successData) => {
              this.SubQuesSuccess(successData, index);
            },
            (error) => {
              this.SubQuesFailure(error);
            }
        );
      } else {
        this.MainQuesList[index].SubQuesList = [];
      }
    } else {
      this.MainQuesList[index].SubQuesList = [];
    }
  }

  public SubQuesSuccess(successData, index) {
    if (successData.IsSuccess) {
      this.MainQuesList[index].SubQuesList = successData.ResponseObject;
      for (let i = 0; i < this.MainQuesList[index].SubQuesList.length; i++) {
        this.MainQuesList[index].SubQuesList[i].subQuestionText = '';
        this.MainQuesList[index].SubQuesList[i].checked = false;
      }
      console.log(this.MainQuesList, 'MainQuesList');
    }
  }

  public SubQuesFailure(error) {
  }
    getDiseaseList() {
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
        }
        this.termService.diseaseList(data).subscribe(
            (successData) => {
                this.diseaseListSuccess(successData);
            },
            (error) => {
                this.diseaseListFailure(error);
            }
        );
    }
    public diseaseListSuccess(successData) {
        if (successData.IsSuccess) {
            this.diseaseLists = successData.ResponseObject;
            console.log(this.diseaseLists, 'DiseaseLists');
        }
    }
    public diseaseListFailure(error) {
    }




  changeWeightChanged() {
    this.proposer.controls['weightChangedReasonName'].patchValue(this.weightList[this.proposer.controls['weightChangedreason'].value]);
  }

  changeMarital() {
    this.proposer.controls['maritalStatusName'].patchValue(this.maritalStatusList[this.proposer.controls['maritalStatus'].value]);
  }

  occupationListCode() {

      if(this.proposer.controls['occupationList'].value =="T" || this.proposer.controls['occupationList'].value =="N" || this.proposer.controls['occupationList'].value == "U")
      {
        this.toastr.error('Sorry, you are not allowed to purchase policy ');
      }else {
        this.proposer.controls['occupationListName'].patchValue(this.occupationList[this.proposer.controls['occupationList'].value]);
        this.getIncomeProof();
      }



  }

  changeApointee() {
    this.proposer.controls['relationToInsuredName'].patchValue(this.languageList[this.proposer.controls['relationToInsured'].value]);

  }

  changeLanguage() {
    this.proposer.controls['languageName'].patchValue(this.languageList[this.proposer.controls['language'].value]);

  }

  changeProposerType() {
    this.proposer.controls['proposerTypeName'].patchValue(this.proposerTypeList[this.proposer.controls['proposerType'].value]);
  }

  changeDocLanguage() {
    this.proposer.controls['language2Name'].patchValue(this.docLanguageList[this.proposer.controls['language2'].value]);
  }

  // changePremiumPayTerm() {
  //   this.proposer.controls['premiumPayTermName'].patchValue(this.primiumpayList[this.proposer.controls['premiumPayTerm'].value]);
  //
  // }

  changeNationality() {
    this.proposer.controls['nationalityName'].patchValue(this.nationalityList[this.proposer.controls['nationality'].value]);

  }

  changeCountry() {
    this.proposer.controls['countryOfResidName'].patchValue(this.countryList[this.proposer.controls['countryOfResid'].value]);

  }

  changeCitizenship() {
    this.proposer.controls['citizenshipName'].patchValue(this.citizenshipList[this.proposer.controls['citizenship'].value]);

  }
  changeAgeProof(){
    this.proposer.controls['ageProofName'].patchValue(this.ageProofsList[this.proposer.controls['ageProof'].value]);

  }
  changeIncomeProof(){
    this.proposer.controls['incomeProofName'].patchValue(this.incomeProofList[this.proposer.controls['incomeProof'].value]);

  }
  changeIdProof(){
    this.proposer.controls['idProofName'].patchValue(this.idProofList[this.proposer.controls['idProof'].value]);

  }
  changeEducation(){
    this.proposer.controls['educationName'].patchValue(this.educationList[this.proposer.controls['education'].value]);

  }
  changeAddressProof(){
    this.proposer.controls['addressProofName'].patchValue(this.paIdProofList[this.proposer.controls['addressProof'].value]);

  }
  changeNomineeRelation() {
    // console.log(this.nomineeDetail['controls'].itemsNominee['controls'].nRelation.value);
    // this.nomineeDetail.controls['nRelationName'].patchValue(this.nomineeRelationList[this.nomineeDetail.controls['nRelation'].value]);

  }


  // proposal Creation

  proposal(stepper) {
    console.log(this.proposer.controls['sameAsInsured'].value, 'kjkkj');
    const data = {
      "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
      "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
      "platform": "web",
      "product_id": this.lifePremiumList.product_id,
      "suminsured_amount":  sessionStorage.selectedAmountTravel,
      "policy_id": this.getEnquiryDetials.policy_id,
      "insurer_proposer": {
        "title": this.proposer.controls['title'].value,
        "firstName": this.proposer.controls['firstName'].value,
        "middleName": this.proposer.controls['midName'].value,
        "lastName": this.proposer.controls['lastName'].value,
        "dob":this.datepipe.transform(this.proposer.controls['dob'].value,'yyyy/MM/dd'),
        "age": this.proposer.controls['age'].value,
        "gender": this.proposer.controls['gender'].value,
        "mobile": this.proposer.controls['mobile'].value,
        "email": this.proposer.controls['email'].value,
        "alternate_contact": this.proposer.controls['alterMobile'].value,
        "maritalStatus": this.proposer.controls['maritalStatus'].value,
        "annualIncome": this.proposer.controls['annualIncome'].value,
        "occupation": this.proposer.controls['occupationList'].value,
        "education": this.proposer.controls['education'].value,
        "height": this.proposer.controls['height'].value,
        "weight": this.proposer.controls['weight'].value,
        "ifPastSixWeightChange":this.proposer.controls['weightChanged'].value,
        "changedWeight":this.proposer.controls['inbetweenweight'].value,
        "weightChangedReason":this.proposer.controls['weightChangedreason'].value,
        "aadhaar": this.proposer.controls['aadharNum'].value,
        "pan": this.proposer.controls['panNum'].value,

        "smoker": "N",
        "sameAsProposer": this.proposer.controls['sameAsInsured'].value == 'true'  || this.proposer.controls['sameAsInsured'].value == true ? "Y":"N" ,
        "modeOfComm": "E",
        "commMail/SMS": "",
        "preferredLanguage": this.proposer.controls['language'].value,
        "proposer_type": this.proposer.controls['proposerType'].value,
        "documentLanguage": this.proposer.controls['language2'].value,
        "lifeBenefit": '1',
        "benefitTerm": this.enquiryFormData.lifePolicy,
        "premiumPaymentTerm": this.enquiryFormData.lifeBenefitTerm,
        "premiumFrequency": this.enquiryFormData.lifePayment,
        "nationality": this.proposer.controls['nationality'].value,
        "countryOfResidence": this.proposer.controls['countryOfResid'].value,
        "placeOfBirth": this.proposer.controls['pob'].value,
        "cititzenship": this.proposer.controls['citizenship'].value,
        "IpRelation": this.proposer.controls['sameAsInsured'].value == 'true' || this.proposer.controls['sameAsInsured'].value == true ? 'SELF' : this.proposer.controls['IpRelation'].value,
        "CountryIpMailing":"IN",
        "politicallyExposedPerson": this.proposer.controls['politicallyExposedPerson'].value,
        "ifYesGiveDetails": this.proposer.controls['ifYesGiveDetails'].value,
      },
      "family_details": {
        "fatherName": this.proposer.controls['fatherName'].value,
        "motherName": this.proposer.controls['motherName'].value,
        "spouseBirthPlace": this.proposer.controls['spouseBirthPlace'].value,
        "spouseName": this.proposer.controls['spouseName'].value == null ? '' : this.proposer.controls['spouseName'].value,
        "spouseDob":this.datepipe.transform(this.proposer.controls['spouseDob'].value,'yyyy/MM/dd')== null ? '' : this.datepipe.transform(this.proposer.controls['spouseDob'].value,'yyyy/MM/dd'),
      },
      "nominee_details": {
        "nominee1Name": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nnName.value,
        "nominee1BirthPlace": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nBirthPlace.value,
        "nominee1Dob":  this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nDob.value,'yyyy/MM/dd'),
        "nominee1Relation": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].nRelation.value,
        "nominee2Name": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nRelation.value : '',
        "nominee2BirthPlace":this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nBirthPlace.value : '',
        "nominee2Dob": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nDob.value : '',
        "nominee2Relation": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].nRelation.value : '',
        "sharePercentage": this.nomineeDetail.value.itemsNominee.length > 1 ? this.nomineeDetail['controls'].itemsNominee['controls'][1]['controls'].sharePercentage.value : '',
        "appointeeName": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].aName.value,
        "appointeeDob":this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value,'yyyy/MM/dd')== null ? '': this.datepipe.transform(this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeDob.value,'yyyy/MM/dd'),
        "appointeeRelationToNominee": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].appointeeRelationToNominee.value,
        "RelationToInsured": this.nomineeDetail['controls'].itemsNominee['controls'][0]['controls'].relationToInsured.value
      },

      "address_details": {
        "comDoorNo": this.proposer.controls['comDoorNo'].value,
        "comBuildingNumber": this.proposer.controls['comBuildingNumber'].value,
        "comPlotNumber":this.proposer.controls['comPlotNumber'].value,
        "comLandmark": this.proposer.controls['comLandmark'].value,
        "comPlace": this.proposer.controls['comPlace'].value,
        "comDistrict": this.proposer.controls['comDistrict'].value,
        "comState": this.proposer.controls['state'].value,
        "comPincode": this.proposer.controls['pincode'].value,
        "perDoorNo": this.proposer.controls['perDoorNo'].value,
        "perBuildingNumber": this.proposer.controls['perBuildingNumber'].value,
        "perPlotNumber": this.proposer.controls['perPlotNumber'].value,
        "perLandmark": this.proposer.controls['perLandmark'].value,
        "perPlace": this.proposer.controls['perPlace'].value,
        "perDistrict": this.proposer.controls['perDistrict'].value,
        "perState": this.proposer.controls['rstate'].value,
        "perPincode": this.proposer.controls['rpincode'].value,
        "comSameAsPer": this.proposer.controls['sameAsProposer'].value ? "Y" : "N",

      },



      "bank_deatils": {
        "accountHolderName": this.bankDetail.controls['accountHolderName'].value,
        "bankName": this.bankDetail.controls['bankName'].value,
        "branchName": this.bankDetail.controls['branchName'].value,
        "accountNo": this.bankDetail.controls['accountNo'].value,
        "accountType": this.bankDetail.controls['accountType'].value,
        "ifscCode": this.bankDetail.controls['ifscCode'].value,
        "micrCode": this.bankDetail.controls['micrCode'].value,
      },
      "office_details": {
        "department":this.proposer.controls['department'].value == null ? '' : this.proposer.controls['department'].value,
        "officeName": this.proposer.controls['officeName'].value ==null ? '' : this.proposer.controls['officeName'].value,
        "officeAddress1": this.proposer.controls['officeAddress1'].value ==null ? '':this.proposer.controls['officeAddress1'].value,
        "officeAddress2": this.proposer.controls['officeAddress2'].value ==null ?'':this.proposer.controls['officeAddress2'].value,
        "officeAddress3": this.proposer.controls['officeAddress3'].value == null ? '' :this.proposer.controls['officeAddress3'].value,
        "officeDistrict": this.proposer.controls['officeDistrict'].value == null ? '':this.proposer.controls['officeDistrict'].value,
        "officeState": this.proposer.controls['officeState'].value == null ? '':this.proposer.controls['officeState'].value,
        "officePincode": this.proposer.controls['officePincode'].value == null ? '' :this.proposer.controls['officePincode'].value,
        "officeNumber": this.proposer.controls['officeNumber'].value == null ? '': this.proposer.controls['officeNumber'].value,
      },
      "other_details": {
        "addressProof": this.proposer.controls['addressProof'].value,
        "ageProof": this.proposer.controls['ageProof'].value,
        "incomeProof": this.proposer.controls['incomeProof'].value,
        "idProof": this.proposer.controls['idProof'].value,
      },
      "question_details": this.setQuestionDetails
    }
    console.log(data,'fileeee');
    this.settings.loadingSpinner = true;
    this.termService.proposalCreation(data).subscribe(
        (successData) => {
          this.proposalSuccess(successData,stepper);
        },
        (error) => {
          this.proposalFailure(error);
        }
    );
  }
  public proposalSuccess(successData, stepper){
    this.settings.loadingSpinner = false;

    if(successData.IsSuccess){
      stepper.next();
      this.topScroll();
      this.toastr.success('Proposal created successfully!!');
      this.summaryData = successData.ResponseObject;
      this.requestedUrl = this.summaryData.biUrlLink;
      this.proposerFormData = this.proposer.value;
      this.bankDetailFormData = this.bankDetail.value;
      this.nomineeDetailFormData = this.nomineeDetail.value.itemsNominee;
      sessionStorage.summaryData = JSON.stringify(this.summaryData);
      sessionStorage.proposerFormData = JSON.stringify(this.proposerFormData);
      sessionStorage.bankDetailFormData = JSON.stringify(this.bankDetailFormData);
      sessionStorage.nomineeDetailFormData = JSON.stringify(this.nomineeDetailFormData);
      console.log(this.proposerFormData,'proposerFormData');
      this.downloadFile(this.requestedUrl);

    } else {
        this.toastr.error(successData.ErrorObject, 'Failed');
    }

  }
  public proposalFailure(error){

  }
  downloadFile(value) {
      this.termService.downloadPdfNew().subscribe(
          (successData) => {
            console.log(successData, 'successDatasuccessData');

          },
          (error) => {
          }
      );



      // this.http.get(
      //     'https://balicuat.bajajallianz.com/lifeinsurance/traditionalProds/generatePdf.do?p_in_obj_1.stringval2=BI_PDF&p_in_var_2=1000000102').subscribe(
      //     (response) => {
      //         var mediaType = 'application/pdf';
      //         var blob = new Blob([response._body], {type: mediaType});
      //         var filename = 'test.pdf';
      //         saveAs(blob, filename);
      //     });
  }






  // session Data
  sessionData() {

    if (sessionStorage.stepperDetails1 != '' && sessionStorage.stepperDetails1 != undefined) {
      let lifeBajaj1 = JSON.parse(sessionStorage.stepperDetails1);
      this.proposer = this.Proposer.group({
        title: lifeBajaj1.title,
        firstName: lifeBajaj1.firstName,
        midName: lifeBajaj1.midName,
        lastName: lifeBajaj1.lastName,
        gender: lifeBajaj1.gender,
        dob: this.datepipe.transform(lifeBajaj1.dob, 'y-MM-dd'),
        age: lifeBajaj1.age,
        email: lifeBajaj1.email,
        mobile: lifeBajaj1.mobile,
        alterMobile: lifeBajaj1.alterMobile,
        IpRelation: lifeBajaj1.IpRelation,
        maritalStatus: lifeBajaj1.maritalStatus,
        annualIncome: lifeBajaj1.annualIncome,
        occupationList: lifeBajaj1.occupationList,
        education:lifeBajaj1.education,
        educationName:lifeBajaj1.educationName,
        // benefitTerm: lifeBajaj1.benefitTerm,
        height: lifeBajaj1.height,
        weight: lifeBajaj1.weight,
        inbetweenweight: lifeBajaj1.inbetweenweight,
        weightChanged: lifeBajaj1.weightChanged,
        weightChangedreason: lifeBajaj1.weightChangedreason,
        weightChangedName: lifeBajaj1.weightChangedName,
        weightChangedReasonName: lifeBajaj1.weightChangedReasonName,
        countryOfResidName: lifeBajaj1.countryOfResidName,
        citizenshipName: lifeBajaj1.citizenshipName,
        aadharNum: lifeBajaj1.aadharNum,
        comDoorNo: lifeBajaj1.comDoorNo,
        comBuildingNumber: lifeBajaj1.comBuildingNumber,
        comPlotNumber: lifeBajaj1.comPlotNumber,
        comLandmark: lifeBajaj1.comLandmark,
        comPlace: lifeBajaj1.comPlace,
        comDistrict: lifeBajaj1.comDistrict,
        pincode: lifeBajaj1.pincode,
        city: lifeBajaj1.city,
        state: lifeBajaj1.state,
        sameAsProposer: lifeBajaj1.sameAsProposer,
        sameAsInsured: lifeBajaj1.sameAsInsured,
        perDoorNo: lifeBajaj1.perDoorNo,
        perBuildingNumber: lifeBajaj1.perBuildingNumber,
        perPlotNumber: lifeBajaj1.perPlotNumber,
        perLandmark: lifeBajaj1.perLandmark,
        perPlace: lifeBajaj1.perPlace,
        perDistrict: lifeBajaj1.perDistrict,
        rpincode: lifeBajaj1.rpincode,
        rcity: lifeBajaj1.rcity,
        rstate: lifeBajaj1.rstate,
        spouseDob: this.datepipe.transform(lifeBajaj1.spouseDob, 'y-MM-dd'),
        maritalStatusName: lifeBajaj1.maritalStatusName,
        occupationListName: lifeBajaj1.occupationListName,
        languageName: lifeBajaj1.languageName,
        proposerTypeName: lifeBajaj1.proposerTypeName,
        premiumPayTermName: lifeBajaj1.premiumPayTermName,
        nationalityName: lifeBajaj1.nationalityName,
        language2Name: lifeBajaj1.language2Name,
        spouseName: lifeBajaj1.spouseName,
        spouseBirthPlace: lifeBajaj1.spouseBirthPlace,
        motherName: lifeBajaj1.motherName,
        fatherName: lifeBajaj1.fatherName,
        ifYesGiveDetails: lifeBajaj1.ifYesGiveDetails,
        panNum: lifeBajaj1.panNum,
        politicallyExposedPerson: lifeBajaj1.politicallyExposedPerson,
        countryIpMailing: lifeBajaj1.countryIpMailing,
        relation: lifeBajaj1.relation,
        citizenship: lifeBajaj1.citizenship,
        pob: lifeBajaj1.pob,
        countryOfResid: lifeBajaj1.countryOfResid,
        nationality: lifeBajaj1.nationality,
        // premiumfreq: lifeBajaj1.premiumfreq,
        // premiumPayTerm: lifeBajaj1.premiumPayTerm,
        // lifeBenefit: lifeBajaj1.lifeBenefit,
        language2: lifeBajaj1.language2,
        proposerType: lifeBajaj1.proposerType,
        language: lifeBajaj1.language,
        department:lifeBajaj1.department,
        officeName:lifeBajaj1.officeName,
        officeAddress1:lifeBajaj1.officeAddress1,
        officeAddress2:lifeBajaj1.officeAddress2,
        officeAddress3:lifeBajaj1.officeAddress3,
        officeDistrict:lifeBajaj1.officeDistrict,
        officeState:lifeBajaj1.officeState,
        officePincode:lifeBajaj1.officePincode,
        officeNumber:lifeBajaj1.officeNumber,
        addressProof:lifeBajaj1.addressProof,
        addressProofName:lifeBajaj1.addressProofName,
        ageProof:lifeBajaj1.ageProof,
        incomeProof:lifeBajaj1.incomeProof,
        idProof:lifeBajaj1.idProof,
        idProofName:lifeBajaj1.idProofName,
        ageProofName:lifeBajaj1.ageProofName,
        incomeProofName:lifeBajaj1.incomeProofName,
      });
    }

    if (sessionStorage.lifeBajajBankDetails != '' && sessionStorage.lifeBajajBankDetails != undefined) {
        let lifeBajajBankDetails = JSON.parse(sessionStorage.lifeBajajBankDetails);
        this.bankDetail = this.Proposer.group({
          accountHolderName: lifeBajajBankDetails.accountHolderName,
          bankName: lifeBajajBankDetails.bankName,
          branchName: lifeBajajBankDetails.branchName,
          accountNo: lifeBajajBankDetails.accountNo,
          accountType: lifeBajajBankDetails.accountType,
          ifscCode: lifeBajajBankDetails.ifscCode,
          micrCode: lifeBajajBankDetails.micrCode,
        });
    }
    if (sessionStorage.lifeQuestions != '' && sessionStorage.lifeQuestions != undefined) {
        this.MainQuesList = JSON.parse(sessionStorage.lifeQuestions);
    }
     if (sessionStorage.lifeBajaiNomineeDetails!= '' && sessionStorage.lifeBajaiNomineeDetails != undefined) {
          let nomineeDetails = JSON.parse(sessionStorage.lifeBajaiNomineeDetails);
          console.log(nomineeDetails, 'nlifeBajajnlifeBajaj');
          for (let i = 0; i < nomineeDetails.itemsNominee.length; i++) {
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nnName.patchValue(nomineeDetails.itemsNominee[i].nnName);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nDob.patchValue(nomineeDetails.itemsNominee[i].nDob);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nBirthPlace.patchValue(nomineeDetails.itemsNominee[i].nBirthPlace);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nRelation.patchValue(nomineeDetails.itemsNominee[i].nRelation);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].nomineeDobValidError.patchValue(nomineeDetails.itemsNominee[i].nomineeDobValidError);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].sharePercentage.patchValue(nomineeDetails.itemsNominee[i].sharePercentage);

            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].aName.patchValue(nomineeDetails.itemsNominee[i].aName);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDob.patchValue(nomineeDetails.itemsNominee[i].appointeeDob);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeRelationToNominee.patchValue(nomineeDetails.itemsNominee[i].appointeeRelationToNominee);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].appointeeDobValidError.patchValue(nomineeDetails.itemsNominee[i].appointeeDobValidError);

            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsured.patchValue(nomineeDetails.itemsNominee[i].relationToInsured);
            this.nomineeDetail['controls'].itemsNominee['controls'][i]['controls'].relationToInsuredName.patchValue(nomineeDetails.itemsNominee[i].relationToInsuredName);
          }
      }
      if (sessionStorage.nomineAge!= '' && sessionStorage.nomineAge != undefined) {
          if (sessionStorage.nomineAge < 18) {
              this.showAppointee = true;
          } else {
              this.showAppointee = false;
          }
      }
  }

    viewDocs() {
        let dialogRef = this.dialog.open(LifeDocuments, {
            width: '1200px'
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    uploadProof(event: any, type) {


        let getUrlEdu = [];
        this.fileDetails = [];
        if(type == 'address_proof') {

            for (let i = 0; i < event.target.files.length; i++) {
                this.fileDetails.push({
                    'base64': '',
                    'proofType': type,
                    'fileExt': event.target.files[i].type,
                    'name': event.target.files[i].name
                });
            }
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.url = event.target.result;
                    getUrlEdu.push(this.url.split(','));
                    this.onUploadFinished(this.fileDetails, getUrlEdu);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
            this.uploadAddressProofName = this.fileDetails[0].name;

        } else if(type == 'age_proof') {

            for (let i = 0; i < event.target.files.length; i++) {
                this.fileDetails.push({
                    'base64': '',
                    'proofType': type,
                    'fileExt': event.target.files[i].type,
                    'name': event.target.files[i].name
                });
            }
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.url = event.target.result;
                    getUrlEdu.push(this.url.split(','));
                    this.onUploadFinished(this.fileDetails, getUrlEdu);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
            this.uploadAgeProofName = this.fileDetails[0].name;

        } else if(type == 'id_proof') {

            for (let i = 0; i < event.target.files.length; i++) {
                this.fileDetails.push({
                    'base64': '',
                    'proofType': type,
                    'fileExt': event.target.files[i].type,
                    'name': event.target.files[i].name
                });
            }
            for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.url = event.target.result;
                    getUrlEdu.push(this.url.split(','));
                    this.onUploadFinished(this.fileDetails, getUrlEdu);
                };
                reader.readAsDataURL(event.target.files[i]);
            }
            this.uploadIdProofName = this.fileDetails[0].name;
        }

    }
    onUploadFinished(values, basecode) {
        console.log(basecode, 'this.eventeventevent');
        values[0].base64 = basecode[0][1];

        console.log(values, 'valuesvalues');

        for (let k = 0; k < values.length; k++) {
            if (this.allImage.indexOf(values[k].name) == -1) {
                this.allImage.push(values[k]);
            }
        }
        console.log(this.allImage, 'this.fileDetails');



    }

    uploadAll() {
        console.log(this.allImage, 'this.fileDetails2323');

        const data = {
            "user_id": this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            "role_id": this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            "pos_status": this.authservice.getPosStatus() ? this.authservice.getPosStatus() : '0',
            "platform": "web",
            "policy_id": this.getEnquiryDetials.policy_id,
            "Persons": [{
                "Documents": this.allImage,
                "Type": "PH"
            }]
        };

        console.log(data, 'dattattatata');
        this.termService.fileUpload(data).subscribe(
            (successData) => {
                this.fileUploadSuccess(successData);
            },
            (error) => {
                this.fileUploadFailure(error);
            }
        );
    }


    public fileUploadSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.documentPath = successData.ResponseObject.filePath;
            this.toastr.success(successData.ResponseObject.message, 'Success');
            this.fileUploadStatus = false;
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
            this.fileUploadStatus = true;
        }
    }

    public fileUploadFailure(error) {
        console.log(error);
    }
    skipUplod(){
      this.skipUploadStatus = false;
    }
  nextDocUpload(stepper) {
    stepper.next();
    this.topScroll();
  }

}

@Component({
    selector: 'lifedocuments',
    template: `
        <div fxLayout="column">
            <div class="container">
                <div class="row">
                <div mat-dialog-content class="col-sm-12">
                    <h4>Declaration: </h4>
                    <p>i) Declaration & Authorisation: I/We hereby declare and agree that </p>
                    <div >
                        <p>(a) I/We have read the application/the same was interpreted to me /us by the person filling the Proposal Form whose name is mentioned herein above, and the answers entered in the application are mine / ours;
                        </p>
                        <p>(b) I/We hereby certify that I have signed on the Proposal form after fully understanding the content and purport of the nature of the information asked for in this Proposal Form and confirm that each of the above answers is full, complete, and true to the best of my knowledge and nothing has been concealed and suppressed or declared false. I/We understand that Bajaj Allianz Life Insurance Company Ltd. (hereafter called the company) believing on the answers, will rely and act on them in utmost good faith, without verification or confirmation of any of my answers.
                        </p>
                        <p>(c) Such application shall not be considered as effected by reason of any money paid or settlement made in payment of or on account of any premium paid, until this application is received by the Company and is finally approved by an authorized officer of the Company during my/our lifetime;
                        </p>
                        <p>
                            (d) Any personal information collected or held by the Company (whether contained in the this application or otherwise obtained) may be held, used and disclosed by the Company to reinsurance companies, claims investigation companies and industry association / federation for doing claim analysis.
                        </p>
                    </div>
                    <p>
                        ii) I/We hereby irrevocably authorize (a) any organization, institution or individual that has any record of knowledge of my the insured health and medical history or any treatment or advise that has been or may hereafter be consulted or other personal information to disclose to the Company such information and such information shall only be used to decide on the terms of acceptance of this proposal or any claim arising out of the policy of insurance issued in accordance with this proposal. This authorization shall bind my/the insured successors and usages and remain valid not withstanding my/ the insured death or incapacity in so far as legally possible. A photocopy of all relevant information/documents collected on the basis of this authorization shall be valid as the original.
                    </p>
                    <p>
                        iii) And I/We further agree that if after the date of submission of the proposal but before the communication to me/us of issuance of the First Premium Receipt on acceptance of proposal (a) any change in my/insured occupation or any adverse circumstances connected with my/insured financial position or the general health of myself/insured or that of any members of my family, occurs or (b) if a proposal for assurance or any application for revival of a policy on my life made to any office of the Company or any other Company has been withdrawn or dropped, deferred or accepted at an increased premium or subject to a lien or on terms other than as proposed I/we shall forthwith intimate the same to the company in writing to reconsider the terms of acceptance of assurance. In the case of fraud or misrepresentation by me, I/We understand that action will be taken or the policy will be cancelled in accordance with the provisions of Section 45 of the Insurance Act, 1938, as amended from time to time
                    </p>
                    <p>
                        iv)Notwithstanding my registration with the Access Provider under Fully/Partially blocked category, I hereby waive all objections and authorize Bajaj Allianz Life Insurance Company Limited (hereinafter referred to as Company) to call or send SMS on the telephone number mentioned in this proposal form or any other telephone number as may be provided to the Company by me or send emails or communicate through any other means and contact me, through its representatives, for any matter (including ascertaining of feedback) relating to this proposal for insurance or any matter concerning the policy of insurance which may be issued pursuant to this proposal for insurance. I further authorize the Company to mail all service related communications to the email id as mentioned in the application form (applicable only if email id provided).
                    </p>
                    <p>
                        v) Commencement of Cover: I/We understand that the cover applied for under this application will commence after consideration of my/ our application and realization of the required premium. I/We have seen, understood and agree to the companies benefit illustration given to me/us along with this proposal form.
                    </p>
                    <p>
                        vi) I/ we declare that money used by me/ us to pay the premiums under the policy is acquired by legal means and confirms to the AML guidelines as they are updated from time to time. If the proposers signature is in vernacular then the Proposed Insured / Proposer should declare below in his / her own handwriting (in the same language in which the proposal is signed) that the replies were given after fully and properly understanding the questions and declarations mentioned in the proposal form as well as all other supplementary documents incidental to availing this policy of insurance.
                    </p>

                    <p> I/We fully understand that any personal information collected or held by the Company, may be held, used and disclosed by the Company to reinsurance companies, claims investigation agencies, credit/claim/fraud bureaus or service providers or repositories, and relevant industry associations /federations for the purpose of underwriting or claims processing or for any analysis and to the Bajaj Group of companies for receiving information and offers on various products and services offerings.
                    </p>


                </div>
            </div>
            <div mat-dialog-actions style="justify-content: center">
                 <button mat-button class="secondary-bg-color" (click)="onClick(true)" >Ok</button>
            </div>
        </div>
      </div>
    `
})
export class LifeDocuments {
    agemsg: any;
    constructor(
        public dialogRef: MatDialogRef<LifeDocuments>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    onClick(result) {
        if(result == true){
            this.dialogRef.close(result);
        } else {
            this.dialogRef.close(result);
        }
    }
}

@Component({
    selector: 'bajajlifeopt',
    template: `
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center w-100">
                    <mat-form-field class="w-50">
                        <input matInput placeholder="OTP"  [(ngModel)]="otpCode" (keypress)="numberValidate($event)"  autocomplete="off" >
                    </mat-form-field>
                </div>
                <!--<div class="col-md-12">-->
                    <!--<div class="proposal-buttom mb-3 text-center w-100">-->
                        <!--<button mat-raised-button color="primaryBlue" (click)="otpVal(stepper)">Submit</button>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </div>
        <div mat-dialog-actions style="justify-content: center">
            <button mat-button class="secondary-bg-color" (click)="otpVal()" >Ok</button>
        </div>
    `
})
export class BajajLifeOpt {
    otpCode: any;
    constructor(
        public dialogRef: MatDialogRef<BajajLifeOpt>,
        @Inject(MAT_DIALOG_DATA) public data: any, public route: ActivatedRoute, public common: CommonService, public validation: ValidationService, public appSettings: AppSettings, private toastr: ToastrService, public config: ConfigurationService, public authservice: AuthService, public termService: TermLifeCommonService) {
        this.otpCode = '';

    }
  // // Number validation
  // numberValidate(event: any) {
  //   this.validation.numberValidate(event);
  // }

    onNoClick(): void {
        this.dialogRef.close(true);
    }

    otpVal() {
        let getEnquiryDetials = JSON.parse(sessionStorage.getEnquiryDetials);
        const data = {
            'platform': 'web',
            'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
            'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4',
            'policy_id': getEnquiryDetials.policy_id,
            'otp': this.otpCode
        }
        this.termService.otpValidation(data).subscribe(
            (successData) => {
                this.otpValidationListSuccess(successData);
            },
            (error) => {
                this.otpValidationListFailure(error);
            }
        );
    }

    public otpValidationListSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.dialogRef.close(true);
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public otpValidationListFailure(error) {
    }

    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }
}




