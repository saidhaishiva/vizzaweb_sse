import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {DatePipe} from '@angular/common';
import { TravelService } from '../../shared/services/travel.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatStepper} from '@angular/material';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {ToastrService} from 'ngx-toastr';
import {assertLessThan} from '@angular/core/src/render3/assert';
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
  public nomineeDetails: FormGroup;
  public bajajInsuredTravel: FormGroup;
  public getMaritalDetails: any;
  public getRelationDetails: any;
  public pincodeValid: any;
  public today: any;



    public items: any;
  public proposerAge: any;

  public personalDobError: any;

  constructor(public appsetting: AppSettings ,private toastr: ToastrService, public travelservice: TravelService, public fb: FormBuilder , public datepipe: DatePipe, public validation: ValidationService) {
    this.setting = appsetting.settings;
    this.today = new Date();
    this.bajajProposal = this.fb.group({
      title: ['', Validators.required],
      firstName : ['' , Validators.required],
      lastName: ['', Validators.required],
      gender: ['' , Validators.required],
      dob: ['' , Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      passportNumber: ['', Validators.required],
      streetName: ['', Validators.required],
        building: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      nationality: ['', Validators.required],
      assigneeName:['', Validators.required],
    });
  }

  ngOnInit() {
    this.setting.loadingSpinner = false;
    this.maritalStatus();

      this.bajajInsuredTravel = this.fb.group({
          items: this.fb.array([])
      });
      for (let i= 0;i<3;i++){
          this.items = this.bajajInsuredTravel.get('items') as FormArray;
          this.items.push(this.initItemRows());
      }

  }

  // get pincode details

    pincodevalidationBajaj(pin) {
      console.log(pin,'pin');
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

    // getRELATIONSHIP

    getRelation(){
      const data ={
          "platform":"web",
          "role_id":"2",
          "user_id":"10"
      };
      this.travelservice.getRelationDetails(data).subscribe((successData)=>{
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

    public relationDetailsFailure(error){

    }

  /// get marital status
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
            console.log(this.getMaritalDetails);

        }
    }
    public getMaritalStatusFailure(error) {
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
            }
        );
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }


    sameasInsurerDetails(id){
      console.log(this.bajajProposal.controls.assigneeName.value);
        // console.log(this.bajajInsuredTravel.controls.items['controls'].assigneeName);
        console.log(id);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].assigneeName.patchValue(this.bajajProposal.controls.assigneeName.value);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].relation.patchValue('SELF');
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].name.patchValue(this.bajajProposal.controls.firstName.value + this.bajajProposal.controls.lastName.value);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].passportNo.patchValue(this.bajajProposal.controls.passportNumber.value);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].sex.patchValue(this.bajajProposal.controls.gender.value);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].idob.patchValue(this.bajajProposal.controls.dob.value);
          this.bajajInsuredTravel['controls'].items['controls'][id]['controls'].age.patchValue(this.proposerAge);
    }



    createProposal(value){
    console.log(value.assigneeName);
    const data = {
        pTrvPartnerDtls_inout:{
            "platform":"web",
            "title": value.title,
            "firstname": value.firstName,
            "lastname": value.lastName,
            "sex": value.gender,
            "dob": value.dob ,
            "maritalstatus": value.maritalStatus,
            "passportno": value.passportNumber,
            "email": value.email,
            "occupation": value.occupation,
            "assigneeName": value.assigneeName,
            "state": value.state,
            "city": value.city,
            "streetname": value.streetName,
            "building": "BANGLOW NO 47",
            "country": value.country,
            "pincode": value.pin,
            "nationality": "Indian",
            "mobileNo": "8440226688"
        },
        pTrvPolDtls_inout:{
            "areaplan": "ExcludingUSA",
            "travelplan": "Travel Elite Silver",
            "returnpath": "http://13.127.24.123/vizza/api/index.php/travel/bajajalianz/get_payment_details?",
            "familyFlag": "N",
            "toDate": "18-MAY-2019",
            "fromDate": "08-MAY-2019"
        }
    }
  }

  changeGender() {
    if (this.bajajProposal.controls['title'].value == 'Mr') {
      this.bajajProposal.controls['gender'].patchValue('Male');
    } else {
      this.bajajProposal.controls['gender'].patchValue('Female');
    }
  }

// date picker
  addEvent(event, type) {
    if (event.value != null) {
      let selectedDate = '';
      this.proposerAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
          const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          if (type == 'proposor') {
            this.personalDobError = '';
          }else if(type == 'insurer'){
              this.personalDobError = '';
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          }else if ( type == 'insurer'){
              this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
            // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }else if(selectedDate.length ==10 && type == 'insurer') {
            this.proposerAge = this.ageCalculate(dob);
          }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
            this.personalDobError = '';
            // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }else {
            this.proposerAge = this.ageCalculate(dob);

        }

      }

    }
  }

  // stepper
  stepper1(stepper: MatStepper, value) {
    // this.personalData = value;
    if (this.bajajProposal.valid) {
        stepper.next();
      } else {
      alert('error');
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


  /// validation
  nameValidate(event: any){
    this.validation.nameValidate(event);
  }

  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }
  idValidate(event: any){
    this.validation.idValidate(event);
  }

   jj = {
    "pfullTermPremium": "0",
    "telephone3": "2757577477",
    "ptotalPremium": "0",
    "telephone2": "2121217777",
    "nationalId": "",
    "userid": "webservice@vizzainsurance.com",
    "ppremiumPayerId": "0",
    "partnerRef": "P",
    "psubagentCode": "0",
    "pdealerCode": "0",
    "ploading": "0",
    "pfamilyFlag": "N",
    "pserviceTaxAmt": "0",
    "ppartnerId": "0",
    "pdiscount": "0",
    "fax": "",
    "countryCode": "",
    "postcode": "411006",
    "pproduct": "9910",
    "pfromDate": "15-jul-2013",
    "pcompref": "0",
    "taxId": "0",
    "pruralFlag": "N",
    "pcoverNoteNo": "0",
    "quality": "0",
    "ptravelplan": "Travel Care",
    "pserviceCharge": "0",
    "ppaymentMode": "Agent Float",
    "language": "",
    "pspCondition": "0",
    "pareaplan": "WORLDWIDE EXCLUDING USA AND CANADA",
    "ppremiumPayerFlag": "N",
    "pmasterpolicyno": "0",
    "institutionName": "",
    "partId": "0",
    "addId": "0",
    "partnerType": "P",
    "ptermStartDate": "15-JUL-2013",
    "regNumber": "0",
    "plocationCode": "0",
    "pempno": "0",
    "policyNo": "0",
    "pdateOfBirth": "12-jan-1986",
    "afterTitle": "",
    "pintermediaryCode": "0",
    "ptermEndDate": "22-Jul-2013",
    "ptoDate": "22-Jul-2013",
    "pdestination": "0",
    "puserName": "webservice@vizzainsurance.com",
    "pspDiscountAmt": "0",
    "pspDiscount": "0",
    "checkBox": "0",
    "pcoOrgUnit": "0",
    "telephone": "1232758787"
  }
}


