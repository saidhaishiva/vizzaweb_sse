import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn, FormControl} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProposalmessageComponent} from './proposalmessage/proposalmessage.component';
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
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
    providers: [

        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
})
export class ProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public checked: boolean;
    public isLinear = false;
    public illnessCheck: boolean;
    public socialStatus: boolean;
    public nomineeAdd: boolean;
    public nomineeRemove: boolean;
    public familyMembers: any;
    public nomineeDate: any;
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
    public illness: any;
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
    public socialNo: any;
    public summaryCity: any;
    public rSummaryCity: any;
    public sumTitle: any;
    public sumPin: any;
    public sumAreaName: any;
    public sumAreaNameComm: any;
    public ageCheck: any;
    public getStepper1: any;
    public illnesStatus: any;
    public insureStatus: any;
    public errorMessage: any;
    public dobError: any;
    public setDateAge: any;
    public personalAge: any;
    public mobileNumber: any;
    public ageRestriction: string;
    public insurerDobError: string;
    public previousInsuranceStatus: string;

  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
              public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http:HttpClient, @Inject(LOCALE_ID) private locale: string) {



      let today  = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.illnessCheck = false;
      this.socialStatus = true;
      this.stopNext = false;
      this.nomineeAdd = true;
      this.nomineeRemove = true;
      this.declaration = false;
      this.illness = false;
      this.settings = this.appSettings.settings;
      this.settings.HomeSidenavUserBlock = false;
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.webhost = this.config.getimgUrl();
      this.selectDate = '';
      this.proposalId = 0;
      this.mobileNumber = 'true';
      this.ageRestriction = 'true';
      this.personal = this.fb.group({
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalDob: ['', Validators.compose([Validators.required])],
          personalOccupation: ['', Validators.required],
          personalIncome: [''],
          personalArea: ['', Validators.required],
          residenceArea: '',
          personalAadhar: ['', Validators.compose([Validators.required, Validators.minLength(12)])],
          personalPan: ['', Validators.compose([ Validators.minLength(10)])],
          personalGst: ['', Validators.compose([ Validators.minLength(15)])],
          socialStatus: '',
          socialAnswer1: '',
          socialAnswer2: '',
          socialAnswer3: '',
          socialAnswer4: '',
          personalAddress: ['', Validators.required],
          previousinsurance: '',
          previousinsuranceChecked: '',
          personalAddress2: ['', Validators.required],
          personalPincode: ['', Validators.required],
          personalCity: ['', Validators.required],
          personalState: ['', Validators.required],
          personalEmail: ['', Validators.required],
          personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
          personalAltnumber: '',
          residenceAddress: '',
          residenceAddress2: '',
          residencePincode: '',
          residenceCity: '',
          residenceState: '',
          illnessCheck: '',
          sameas: ''

      });

      // this.http.get('http://localhost:4203/assets/mockjson/sample.json').subscribe(
      //     (successData) => {
      //         this.testProposalSuccess(successData);
      //     },
      //     (error) => {
      //         this.proposalFailure(error);
      //     }
      // );

      // this.personal = this.fb.group({
      //     personalTitle: [''],
      //     personalFirstname: [''],
      //     personalLastname: [''],
      //     personalDob: [''],
      //     personalOccupation: [''],
      //     personalIncome: [''],
      //     personalAadhar: [''],
      //     personalPan: [''],
      //     personalGst: [''],
      //     socialStatus: '',
      //     socialAnswer1: '',
      //     socialAnswer2: '',
      //     socialAnswer3: '',
      //     socialAnswer4: '',
      //     personalAddress: [''],
      //     previousinsurance: '',
      //     personalAddress2: '',
      //     personalPincode: [''],
      //     personalCity: [''],
      //     personalState: [''],
      //     personalEmail: [''],
      //     personalMobile: [''],
      //     personalAltnumber: [''],
      //     residenceAddress: '',
      //     residenceAddress2: '',
      //     residencePincode: '',
      //     residenceCity: '',
      //     residenceState: '',
      //     residenceEmail: '',
      //     residenceMobile: [''],
      //     residenceAltnumber: [''],
      //     illnessCheck: ''
      //
      // });
  }

    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
        this.setOccupationList();
        this.setRelationship();
        if (sessionStorage.changedTabDetails != '' || sessionStorage.changedTabDetails != undefined ) {
            this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        }
        if (sessionStorage.familyMembers == '' || sessionStorage.familyMembers == undefined ) {
            this.groupList();
        } else {
            console.log('family membersssssssssss');
            this.familyMembers  = JSON.parse(sessionStorage.familyMembers);
        }
        console.log(sessionStorage.nomineeDate, 'sessionStorage.nomineeDate');
        if (sessionStorage.nomineeDate == '' || sessionStorage.nomineeDate == undefined) {
            this.nomineeDate = [{
                nominee: [{
                    nname: '',
                    nage: '',
                    nrelationship: '',
                    nclaim: '',
                    aname: '',
                    aage: '',
                    arelationship: '',
                    removeBtn: true,
                    addBtn: false,
                    ageSetting: true,
                    colorStatus: 'red'

                }]
            }];
        } else {
            this.nomineeDate = JSON.parse(sessionStorage.nomineeDate);
        }
        this.sessionData();
    }

    canDeactivate() {
      return this.proposalId;
    }


    criticalIllness(values: any) {
      if (values.checked) {
          const dialogRef = this.dialog.open(ProposalmessageComponent, {
              width: '500px'
          });
          dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              this.stopNext = true;
          });
      } else {
          this.stopNext = false;
      }
    }
    changeSocialStatus(result) {
      this.socialStatus = this.personal.controls['socialStatus'].value;
        let btn = this.personal.controls['socialStatus'].value;
      console.log(btn, 'this.result');
      if (btn == 'true') {
          this.personal.controls['socialAnswer1'].setValue('0');
          this.personal.controls['socialAnswer2'].setValue('0');
          this.personal.controls['socialAnswer3'].setValue('0');
          this.personal.controls['socialAnswer4'].setValue('0');
          this.socialNo = '';
      } else {
          this.socialNo = false;
      }
    }
    groupList() {
      this.familyMembers = this.getFamilyDetails.family_members;
      console.log(this.familyMembers);
        for (let i = 0; i < this.familyMembers.length; i++ ) {
            this.familyMembers[i].ins_name = '';
            this.familyMembers[i].ins_dob = '';
            this.familyMembers[i].ins_gender = '';
            this.familyMembers[i].ins_illness = 'No';
            this.familyMembers[i].ins_weight = '';
            this.familyMembers[i].ins_height = '';
            this.familyMembers[i].ins_occupation_id = '';
            this.familyMembers[i].insurincome = '';
            this.familyMembers[i].ins_relationship = '';
            this.familyMembers[i].ins_hospital_cash = '1';
            this.familyMembers[i].ins_engage_manual_labour = 'Nill';
            this.familyMembers[i].ins_engage_winter_sports = 'Nill';
            this.familyMembers[i].ins_personal_accident_applicable = '0';
            this.familyMembers[i].ins_suminsured_indiv = this.buyProductdetails.suminsured_id;
        }

    }
    addNominee(value) {
      if (value == 'add' && this.nomineeDate[0].nominee.length != 2) {
          this.nomineeDate[0].nominee.push({
              nname: '',
              nage: '',
              nrelationship: '',
              nclaim: '',
              aname: '',
              aage: '',
              arelationship: '',
              removeBtn: false,
              addBtn: true,
              ageSetting: true,
              colorStatus: 'green'

          });
          this.nomineeAdd = true;
          this.nomineeRemove = false;
      } if (value == 'delete') {
          if (this.nomineeDate[0].nominee.length == 2) {
              this.nomineeDate[0].nominee.splice(1, 1);
              this.nomineeAdd = false;
              this.nomineeRemove = true;
              this.nomineeDate[0].nominee[0].removeBtn = true;
              this.nomineeDate[0].nominee[0].addBtn = false;
          }
      }
        sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);

    }
    claimPercent(percent) {
      console.log(this.nomineeDate[0].nominee.length);
        if (this.nomineeDate[0].nominee.length == 1) {
            if (percent >= 100) {
                this.nomineeDate[0].nominee[0].addBtn = true;
            } else {
                this.nomineeDate[0].nominee[0].addBtn = false;
            }

        } else {
            this.nomineeAdd = true;

        }
        sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);
    }

    sessionData() {
        if (sessionStorage.stepper1Details != '' && sessionStorage.stepper1Details != undefined) {
        console.log(JSON.parse(sessionStorage.stepper1Details), 'sessionStorage.stepper1Details');
            this.getStepper1 = JSON.parse(sessionStorage.stepper1Details)
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
                personalPan: this.getStepper1.personalPan,
                personalGst: this.getStepper1.personalGst,
                socialStatus: this.getStepper1.socialStatus,
                socialAnswer1: this.getStepper1.socialAnswer1,
                socialAnswer2: this.getStepper1.socialAnswer2,
                socialAnswer3: this.getStepper1.socialAnswer3,
                socialAnswer4: this.getStepper1.socialAnswer4,
                personalAddress: this.getStepper1.personalAddress,
                previousinsurance: this.getStepper1.previousinsurance,
                previousinsuranceChecked: this.getStepper1.previousinsuranceChecked,
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
                sameas: this.getStepper1.sameas

            });
            if (this.getStepper1.previousinsuranceChecked) {
                this.previousInsuranceStatus = this.getStepper1.previousinsuranceChecked;
            }
            if (this.getStepper1.socialStatus == false) {
                // if (JSON.parse(this.getStepper1.socialStatus)) {
                    this.personal.controls['socialAnswer1'].reset();
                    this.personal.controls['socialAnswer2'].reset();
                    this.personal.controls['socialAnswer3'].reset();
                    this.personal.controls['socialAnswer4'].reset();
                // }
            }

            console.log(this.getStepper1.socialStatus, 'socialStatus');
            if (this.getStepper1.socialStatus == false) {
                this.socialStatus = true;
            } else {
                this.socialStatus = false;
            }
            if (sessionStorage.proposalID != '' && sessionStorage.proposalID != undefined) {
                this.proposalId = sessionStorage.proposalID;
                console.log(this.proposalId, 'this.proposalId');
            }

            if (this.getStepper1.personalPincode != '') {
                this.getPostal(this.getStepper1.personalPincode, 'personal');
                this.getCityId('personal');
                this.personal.controls['personalPincode'].setValue(this.getStepper1.personalPincode);
                this.personal.controls['personalState'].setValue(this.getStepper1.personalState);
                this.personal.controls['personalCity'].setValue(this.getStepper1.personalCity);
                this.personal.controls['personalArea'].setValue(this.getStepper1.personalArea);

                setTimeout(() =>{
                    if (this.getStepper1.sameas) {
                        this.getPostal(this.getStepper1.personalPincode, 'residence');
                        this.getCityIdF2('residence', this.getStepper1.personalCity, this.getStepper1.personalPincode);
                        this.personal.controls['residencePincode'].setValue(this.getStepper1.personalPincode);
                        this.personal.controls['residenceState'].setValue(this.getStepper1.personalState);
                        this.personal.controls['residenceCity'].setValue(this.getStepper1.personalCity);
                        this.personal.controls['residenceArea'].setValue(this.getStepper1.personalArea);
                    }
                    if (this.getStepper1.sameas == false && this.getStepper1.residencePincode != '') {
                        this.getPostal(this.getStepper1.residencePincode, 'residence');
                        this.getCityIdF2('residence', this.getStepper1.residenceCity, this.getStepper1.residencePincode);
                        this.personal.controls['residencePincode'].setValue(this.getStepper1.residencePincode);
                        this.personal.controls['residenceState'].setValue(this.getStepper1.residenceState);
                        this.personal.controls['residenceCity'].setValue(this.getStepper1.residenceCity);
                        this.personal.controls['residenceArea'].setValue(this.getStepper1.residenceArea);
                    }
                    // else {
                    //     this.personal.controls['residenceAddress'].setValue('');
                    //     this.personal.controls['residenceAddress2'].setValue('');
                    //     this.personal.controls['residenceCity'].setValue('');
                    //     this.personal.controls['residencePincode'].setValue('');
                    //     this.personal.controls['residenceState'].setValue('');
                    //     this.personal.controls['residenceArea'].setValue('');
                    // }
                },2000);

            }
            if (sessionStorage.mobileNumber != '' ) {
                this.mobileNumber = sessionStorage.mobileNumber;
                console.log(this.mobileNumber, 'iii');
            } else {
                console.log(this.mobileNumber, 'iii');

                this.mobileNumber = 'true';
            }

        }
        if (sessionStorage.familyMembers != '' && sessionStorage.familyMembers != undefined) {
            this.familyMembers = JSON.parse(sessionStorage.familyMembers);
           // let date = this.familyMembers[0].ins_dob.split('-');
           // date = date[0] +'/'+ date[1] +'/'+ date[2];
            console.log(this.familyMembers, 'this.date');
            if (sessionStorage.ageRestriction != undefined) {
                this.ageRestriction = sessionStorage.ageRestriction;
            } else {
                this.ageRestriction = 'true';
            }
        }
        if (sessionStorage.nomineeDate != '' && sessionStorage.nomineeDate != undefined) {
            this.nomineeDate = JSON.parse(sessionStorage.nomineeDate);
        }


    }
    alternateChange(event) {
      if (event.target.value.length == 10) {
          if(event.target.value == this.personal.get('personalMobile').value) {
                this.mobileNumber = 'Alternate number should be different from mobile number';
          } else {
              this.mobileNumber = '';
          }
      } else {
          // this.mobileNumber = 'false';
      }
      sessionStorage.mobileNumber = this.mobileNumber;
    }
    previousInsurance() {
      this.previousInsuranceStatus = this.personal.get('previousinsuranceChecked').value;
    }
    changeOccupation() {
        // if (this.buyProductdetails.product_id == 8 || this.buyProductdetails.product_id == 9) {
        //     console.log('in');
        //     this.personal.get('personalAadhar').setValidators(null);
        //
        // } else {
        //     this.personal.get('personalAadhar').setValidators([Validators.required]);
        //     console.log('out');
        // }
        // this.personal.get('personalAadhar').updateValueAndValidity();
    }
    //Personal Details
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper1Details = JSON.stringify(value);
        this.personalData = value;

        if (this.personal.valid) {
            console.log(value, 'value');
                if (sessionStorage.proposerAge >= 18) {
                    console.log(this.mobileNumber, 'tyu');
                    if (this.mobileNumber == '') {
                        console.log('in');
                        stepper.next();
                    } else if(this.mobileNumber == 'true') {
                        stepper.next();
                        console.log('ouy');
                    }
                } else {
                    this.toastr.error('Proposer age should be 18 or above');
                }
        }
    }
    //Insured Details
    InsureDetails(stepper: MatStepper, index, key) {
        sessionStorage.familyMembers = JSON.stringify(this.familyMembers);
        // if (this.ageRestriction == '') {
          this.illnesStatus = false;
          console.log(this.familyMembers, 'ghdfkljghdfkljghkldfjghdfkljgh');
          if (key == 'Insured Details') {
              for (let i = 0; i < this.familyMembers.length; i++) {
                  if (this.familyMembers[i].ins_name != '' && this.familyMembers[i].ins_dob != '' && this.familyMembers[i].ins_gender != '' && this.familyMembers[i].ins_weight != '' && this.familyMembers[i].ins_height != '' && this.familyMembers[i].ins_occupation_id != '' && this.familyMembers[i].ins_relationship != '') {
                      this.errorMessage = false;
                      if (this.familyMembers[i].ins_illness != 'No') {
                          this.illnesStatus = true;
                          break;
                      } else {
                          this.illnesStatus = false;
                      }
                  } else {
                      this.errorMessage = true;
                      break;
                  }
              }
              if (this.errorMessage) {
                  this.toastr.error('Please fill the empty fields', key);
              } else if (this.illnesStatus) {
                  this.toastr.error('Please fill the empty fields', key);
              } else if (this.illnesStatus == false) {
                  console.log('tyy');
                  for (let i = 0; i < this.familyMembers.length; i++) {
                      if (this.buyProductdetails.product_id == 6) {
                          this.insureStatus = false;
                          if (this.familyMembers[i].ins_hospital_cash != '') {
                              if (i == this.familyMembers.length - 1) {
                                  this.insureStatus = true;
                              }
                          } else {
                              this.errorMessage = true;
                              break;
                          }

                      } else if (this.buyProductdetails.product_id == 9 || this.buyProductdetails.product_id == 8) {
                          console.log('p8 || p9');
                          this.errorMessage = false;
                          this.insureStatus = false;
                          if (this.familyMembers[i].ins_age >= 18 || this.familyMembers[i].ins_age == '') {
                              if (this.familyMembers[i].ins_personal_accident_applicable == '1') {
                                  if (this.familyMembers[i].ins_engage_manual_labour != '' && this.familyMembers[i].ins_engage_winter_sports != '' && this.familyMembers[i].ins_personal_accident_applicable != '') {
                                      if (i == this.familyMembers.length - 1) {
                                          this.insureStatus = true;
                                      }
                                  } else {
                                      this.errorMessage = true;
                                      break;
                                  }
                              } else {
                                  if (i == this.familyMembers.length - 1) {
                                      this.insureStatus = true;
                                  }
                              }
                          } else {
                              if (i == this.familyMembers.length - 1) {
                                  this.insureStatus = true;
                              }
                          }
                      } else {
                          if (i == this.familyMembers.length - 1) {
                              this.insureStatus = true;
                          }
                      }
                  }
              } else {
              }
          }
          if (this.errorMessage) {
              this.toastr.error('Please fill the empty fields', key);
          }
        console.log(this.ageRestriction, 'ageRestriction');

        if (this.insureStatus) {
              if (this.ageRestriction == '') {
                  stepper.next();
              } else if (this.ageRestriction == 'true') {
                  stepper.next();
              }
          }

      // }
        console.log(this.illnesStatus, 'ilness');
        console.log(this.errorMessage, 'errorMessage');
        console.log(this.insureStatus, 'insureStatus');

    }
    typeAge(value, index, ci) {
        if (value > 18) {
            this.nomineeDate[index].nominee[ci].ageSetting = false;
        } else {
            this.nomineeDate[index].nominee[ci].ageSetting = true;
        }
    }
    //Nominee Details
    nomineeDetails(stepper: MatStepper, index, key) {
      sessionStorage.nomineeDate = JSON.stringify(this.nomineeDate);
      this.lastStepper = stepper;
        if (key == 'Nominee Details') {
            for (let i = 0; i < this.nomineeDate[index].nominee.length; i++) {
                if (this.nomineeDate[index].nominee[i].nname != '' &&
                    this.nomineeDate[index].nominee[i].nage != '' &&
                    this.nomineeDate[index].nominee[i].nrelationship != '' &&
                    this.nomineeDate[index].nominee[i].nclaim != '') {
                    if (this.nomineeDate[index].nominee[i].nage < 18) {
                        if (this.nomineeDate[index].nominee[i].aname != '' &&
                            this.nomineeDate[index].nominee[i].aage != '' &&
                            this.nomineeDate[index].nominee[i].arelationship != '') {
                            this.proposal();

                        } else {
                            if (i == this.nomineeDate[index].nominee.length - 1) {
                                this.toastr.error('Please fill the empty fields', key);
                            }
                        }
                    } else {
                        this.proposal();

                    }
                } else {
                    if (i == this.nomineeDate[index].nominee.length - 1) {
                        this.toastr.error('Please fill the empty fields', key);
                    }
                }

            }
        }
        console.log(this.nomineeDate, 'this.nomineeDate');
    }




    getCityId(title) {
      this.cityTitle = title;
        console.log(this.cityTitle, 'this.cityTitlethis.cityTitle');

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


    illnessStatus(values: any, index) {
        if (values.checked) {
            this.familyMembers[index].ins_illness = '';
            this.familyMembers[index].illness = true;
        } else {
            this.familyMembers[index].illness = false;
            this.familyMembers[index].ins_illness = 'No';

        }

}


    personalAccident(values: any, index) {
        if (values.value == 1) {
            for (let i = 0; i < this.familyMembers.length; i++) {
                if (i != index) {
                    this.familyMembers[i].ins_accident_status = true;
                }
            }
        } else {
            for (let i = 0; i < this.familyMembers.length; i++) {
                this.familyMembers[i].ins_accident_status = false;
            }
        }

        if (values.value == '1') {
            this.familyMembers[index].ins_engage_manual_labour = '';
            this.familyMembers[index].ins_engage_winter_sports = '';

        } else {
            this.familyMembers[index].ins_engage_manual_labour = 'Nill';
            this.familyMembers[index].ins_engage_winter_sports = 'Nill';

        }



    }
    sameAddress(values: any) {
      console.log(this.personal.controls['personalCity'].value);
      if (values.checked) {
          this.getPostal(this.personal.controls['personalPincode'].value, 'residence');
          this.getCityIdF2('residence', this.personal.controls['personalCity'].value, this.personal.controls['personalPincode'].value);
          this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
          this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
          this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
          this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
          this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
          this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
          this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
      } else {
          this.personal.controls['residenceAddress'].setValue('');
          this.personal.controls['residenceAddress2'].setValue('');
          this.personal.controls['residenceCity'].setValue('');
          this.personal.controls['residencePincode'].setValue('');
          this.personal.controls['residenceState'].setValue('');
          this.personal.controls['residenceArea'].setValue('');
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

    addEventInsurer(event, i) {
        console.log(this.datepipe.transform(event.value, 'dd-MM-y'), 'iii');
        if (this.datepipe.transform(event.value, 'dd-MM-y') == null) {
            this.insurerDobError = '';
        }
        if (event.value._i.length == 10) {
            this.insurerDobError = '';
            this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd-MM-y');
            //Calculate Age
            this.ageCheck = this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'y-MM-dd');
            let age = this.ageCalculate(this.ageCheck);
            this.familyMembers[i].ins_age = age;
            if (this.buyProductdetails.company_name == 'Star Health') {
                if (this.buyProductdetails.product_id == 10) {
                    if (age < 60 || age > 75) {
                        this.ageRestriction = 'Senior citizen age should be greater than 60 and should not be greater than 75'
                    } else {
                        this.ageRestriction = '';
                    }
                } else {
                    if (age > 75) {
                        this.ageRestriction = 'Insurer age should not be greater than 75'
                    } else {
                        this.ageRestriction = '';
                    }
                }

            }

        } else if (event.value._i.length > 10) {
            this.insurerDobError = 'Enter valid dob';
        } else {
            this.insurerDobError = 'Enter valid dob';
        }
        sessionStorage.ageRestriction = this.ageRestriction;
    }

    addEventInsurerSelect(event, i) {
        const length = this.datepipe.transform(event.value, 'dd-MM-y').length;
        if (this.datepipe.transform(event.value, 'dd-MM-y') == null) {
            this.insurerDobError = '';
        }
        if (length == 10) {
            this.insurerDobError = '';
            this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd-MM-y');
            //Calculate Age
            this.ageCheck = this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'y-MM-dd');
            let age = this.ageCalculate(this.ageCheck);
            this.familyMembers[i].ins_age = age;
            if (this.buyProductdetails.company_name == 'Star Health') {
                if (this.buyProductdetails.product_id == 10) {
                    if (age < 60 || age > 75) {
                        this.ageRestriction = 'Senior citizen age should be greater than 60 and should not be greater than 75'
                    } else {
                        this.ageRestriction = '';
                    }
                } else {
                    if (age > 75) {
                        this.ageRestriction = 'Insurer age should not be greater than 75'
                    } else {
                        this.ageRestriction = '';
                    }
                }

            }

        } else {
            this.insurerDobError = 'Enter valid dob';
        }
        sessionStorage.ageRestriction = this.ageRestriction;
    }



    // changeEventInsurer(event, i) {
    //     if (event.value.length == 10) {
    //         this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd/MM/y');
    //         console.log(this.familyMembers[i].ins_dob);
    //     }
    //
    // }
    addEvent(event, i) {
        this.setDate = this.datepipe.transform(event.value, 'dd-MM-y');
        if (this.setDate == null) {
            this.dobError = '';
        }
        this.setDateAge = this.datepipe.transform(event.value, 'y-MM-dd');
        if (event.value._i.length == 10) {
            this.dobError = '';
            this.personalAge = this.ageCalculate(this.setDateAge);
        }  else if (event.value._i.length > 10) {
            this.dobError = 'Enter valid dob';
        } else {
            this.dobError = 'Enter valid dob';
        }
        sessionStorage.setItem('proposerAge' , this.personalAge);
    }
    addEventSelect(event, i) {
        this.setDate = this.datepipe.transform(event.value, 'dd-MM-y');
        console.log(this.setDate, 'this.setDate');
        if (this.setDate == null) {
            this.dobError = '';
        }
        this.setDateAge = this.datepipe.transform(event.value, 'y-MM-dd');
        if (this.setDate.length == 10) {
            this.dobError = '';
            this.personalAge = this.ageCalculate(this.setDateAge);
        }  else {
            this.dobError = 'Enter valid dob';
        }
        sessionStorage.setItem('proposerAge' , this.personalAge);
    }


    ageCalculate(dob) {
        let mdate = dob.toString();
        let yearThen = parseInt(mdate.substring( 8,10), 10);
        let monthThen = parseInt(mdate.substring(5,7), 10);
        let dayThen = parseInt(mdate.substring(0,4), 10);
        let todays = new Date();
        let birthday = new Date( dayThen, monthThen-1, yearThen);
        let differenceInMilisecond = todays.valueOf() - birthday.valueOf();
        let year_age = Math.floor(differenceInMilisecond / 31536000000);
        return year_age;
    }



    //Create Proposal
  proposal() {
      const data = [{
              'platform': 'web',
          'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'proposal_id' : this.proposalId,
              'enquiry_id': this.enquiryId,
              'group_name':  this.groupName,
              'company_name': this.buyProductdetails.company_name,
              'product_id': this.buyProductdetails.product_id,
              'policy_type_name': this.buyProductdetails.prod_shortform,
              'policy_category': 'fresh',
              'policy_started_on': this.personalData.personalDob,
              'policy_end_on': this.personalData.personalDob,
              'policy_period': '1',
              'sum_insured_id': this.buyProductdetails.suminsured_id,
              'scheme_id': this.buyProductdetails.scheme,
              'title': this.personalData.personalTitle,
              'proposer_fname': this.personalData.personalFirstname,
              'proposer_lname': this.personalData.personalLastname,
              'proposer_email': this.personalData.personalEmail,
              'proposer_mobile': this.personalData.personalMobile,
              'proposer_alternate_mobile': this.personalData.personalAltnumber,
              'proposer_res_address1': this.personalData.residenceAddress,
              'proposer_res_address2': this.personalData.residenceAddress2,
              'proposer_res_area': this.personalData.residenceArea.toString(),
              'proposer_res_city': this.personalData.residenceCity.toString(),
              'proposer_res_state': this.personalData.residenceState,
              'proposer_res_pincode': this.personalData.residencePincode,
              'proposer_comm_address1': this.personalData.personalAddress,
              'proposer_comm_address2': this.personalData.personalAddress2,
              'proposer_comm_area': this.personalData.personalArea.toString(),
              'proposer_comm_city': this.personalData.personalCity.toString(),
              'proposer_comm_state': this.personalData.personalState,
              'proposer_comm_pincode': this.personalData.personalPincode,
              'prop_dob': this.datepipe.transform(this.personalData.personalDob, 'dd/MM/y') ,
              'prop_occupation': this.personalData.personalOccupation,
              'prop_annual_income': this.personalData.personalIncome,
              'prop_pan_no': this.personalData.personalPan,
              'prop_aadhar_no': this.personalData.personalAadhar,
              'gst_id_no': this.personalData.personalGst,
              'exist_health_ins_covered_persons_details': '',
              'have_eia_no': '1',
              'eia_no': '',
              'previous_medical_insurance': this.personalData.previousinsurance,
              'critical_illness': 'NO   ',
              'social_status': this.personalData.socialStatus ? 1 : 0,
              'social_status_bpl': this.personalData.socialAnswer1 == '' || this.personalData.socialAnswer1 == null ? 0 : this.personalData. socialAnswer1,
              'social_status_disabled': this.personalData.socialAnswer2 == '' || this.personalData.socialAnswer2 == null ? 0 : this.personalData. socialAnswer2,
              'social_status_informal': this.personalData.socialAnswer3 == '' || this.personalData.socialAnswer3  == null ? 0 : this.personalData. socialAnswer3 ,
              'social_status_unorganized': this.personalData.socialAnswer4 == '' || this.personalData.socialAnswer4 == null ? 0 : this.personalData. socialAnswer4,
              'nominee_name_one': this.nomineeDate[0].nominee[0].nname,
              'nominee_age_one': this.nomineeDate[0].nominee[0].nage,
              'nominee_relationship_one': this.nomineeDate[0].nominee[0].nrelationship,
              'nominee_percentclaim_one': this.nomineeDate[0].nominee[0].nclaim,
              'appointee_name_one': this.nomineeDate[0].nominee[0].aname,
              'appointee_age_one': this.nomineeDate[0].nominee[0].aage,
              'appointee_relationship_one': this.nomineeDate[0].nominee[0].arelationship,
              'nominee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nname : '',
              'nominee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nage : '',
              'nominee_relationship_two': this.nomineeDate[0].nominee.length > 1 ?  this.nomineeDate[0].nominee[1].nrelationship : '',
              'nominee_percentclaim_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nclaim : '',
              'appointee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aname : '',
              'appointee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aage : '',
              'appointee_relationship_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].arelationship : '',
              'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
              'created_by': '0',
              'insured_details': this.familyMembers
          }];
          this.proposalservice.getProposal(data).subscribe(
              (successData) => {
                  this.proposalSuccess(successData);
              },
              (error) => {
                  this.proposalFailure(error);
              }
          );

}
    public proposalSuccess( successData) {
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
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
                for (let i =0; i < this.rAreaName.length; i++) {
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
                for (let i =0; i < this.rAreaName.length; i++) {
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
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.common.getPostal(data).subscribe(
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
                this.response = successData.ResponseObject;
                this.personal.controls['personalState'].setValue(this.response.state_name);
                this.personalCitys = this.response.city;
                console.log(this.personalCitys, 'this.personalCitys');
                for (let i = 0; i < this.personalCitys.length; i++) {
                    if ( this.personalCitys[i].city_id == this.summaryData.prop_comm_city ) {
                        this.summaryCity = this.personalCitys[i].city_name;
                    }
                }
            }
            if (this.title == 'residence') {
                this.rResponse = successData.ResponseObject;
                this.personal.controls['residenceState'].setValue(this.rResponse.state_name);
                this.residenceCitys = this.rResponse.city;
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
                    if ( this.residenceCitys[i].city_id == this.summaryData.prop_res_city) {
                        this.rSummaryCity = this.residenceCitys[i].city_name;

                    }
                }
            }


        }
    }

    public PostalSummaryFailure(error) {
        console.log(error);
    }

    // public testProposalSuccess( successData) {
    //     console.log(successData);
    //     if (successData.IsSuccess) {
    //         this.toastr.success('Proposal created successfully!!');
    //         this.summaryData = successData.ResponseObject;
    //         console.log(this.summaryData);
    //         this.lastStepper.next();
    //
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }


    public payNow() {
        const data = {
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'platform': 'web',
            'reference_id' :  this.summaryData.proposal_details[0].referenceId,
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
            'product_id': this.buyProductdetails.product_id,
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

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
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
