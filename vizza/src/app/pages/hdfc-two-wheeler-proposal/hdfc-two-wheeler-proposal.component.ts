import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AppSettings} from '../../app.settings';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ActivatedRoute} from '@angular/router';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-hdfc-two-wheeler-proposal',
  templateUrl: './hdfc-two-wheeler-proposal.component.html',
  styleUrls: ['./hdfc-two-wheeler-proposal.component.scss']
})
export class HdfcTwoWheelerProposalComponent implements OnInit {

  public today: any;
  public setting: any;
  public webhost: any;
  public customerDetails: any;
  public proposerAge: any;
  public personalDobError: any;
  public titleList: any;

  constructor(public fb: FormBuilder ,public appsetting: AppSettings,public config: ConfigurationService, public route: ActivatedRoute , public validation: ValidationService ,private toastr: ToastrService, public bikeInsurance: BikeInsuranceService , public authservice: AuthService , public datepipe: DatePipe) {

    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.setting = appsetting.settings;
    this.webhost = this.config.getimgUrl();

    this.customerDetails = this.fb.group({
      firstName : ['' , Validators.required],
      lastName : ['',Validators.required],
      middleName : [''],
      dob : ['' , Validators.required],
      title : ['' , Validators.required],
      address : ['' , Validators.required],
      paddress : ['' , Validators.required],
      raddress : ['' , Validators.required],
      address2 : ['' , Validators.required],
      paddress2 : ['' , Validators.required],
      raddress2 : ['' , Validators.required],
      pincode : ['' , Validators.required],
      ppincode : ['' , Validators.required],
      rpincode : ['' , Validators.required],
      state : ['' , Validators.required],
      stateId : ['' ],
      titleValue : ['' ],
      pstate : ['' , Validators.required],
      pstateId : ['' ],
      rstate : ['' , Validators.required],
      rstateId : ['' ],
      city : ['' , Validators.required],
      cityId : [''],
      pcity : ['' , Validators.required],
      pcityId : [''],
      rcity : ['' , Validators.required],
      rcityId : [''],
      district : ['' , Validators.required],
      districtId : [''],
      pdistrict : ['' , Validators.required],
      pdistrictId : [''],
      rdistrict : ['' , Validators.required],
      rdistrictId : [''],
      landmark : [''],
      plandmark : [''],
      rlandmark : [''],
      address3 : [''],
      paddress3 : [''],
      raddress3 : [''],
      alternateContact : [''],
      gstNumber : [''],
      sameAsAddress : [''],
      regSameAscommAddress : [''],
      regSameAspermAddress : [''],
      gender : ['' , Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],

      mobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
    });
  }

  ngOnInit() {
    this.changeGender();
  }


  //service

  // title change function
  changeGender() {
    const data = {
      'platform': 'web',
      'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
      'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
    };
    this.bikeInsurance.hdfcGetTitleList(data).subscribe(
        (successData) => {
          this.titlesucccess(successData);
        },
        (error) => {
          this.failureSuccess(error);
        }
    );
  }
  public titlesucccess(successData){
    this.titleList = successData.ResponseObject;
  }
  public failureSuccess(error) {
  }


  ///change title value
  changeTitle(){
    this.customerDetails.controls['titleValue'].patchValue(this.titleList[this.customerDetails.controls['title'].value]);
  }


  //
  //stepper
  nextTab(stepper,value,type) {

    if (type == 'stepper1') {
      // this.proposerData = value;
      sessionStorage.stepper1Details = '';
      sessionStorage.stepper1Details = JSON.stringify(value);
      // this.riskDetails.controls['IDV'].patchValue(this.buyBikeDetails.Idv);
      if (this.customerDetails.valid) {
        if (sessionStorage.proposerAge >= 18) {
          stepper.next();
          this.topScroll();
        } else {
          this.toastr.error('Proposer Age should be greater than 18.')
        }
      } else {
        this.toastr.error('Please fill the Mandatory Fields')

      }
      // } else if (type == 'stepper2') {
      //   sessionStorage.stepper2Details = '';
      //   sessionStorage.stepper2Details = JSON.stringify(value);
      //   if (this.riskDetails.valid) {
      //     stepper.next();
      //     this.topScroll();
      //   }else{
      //     this.toastr.error('Please fill the Mandatory Fields')
      //
      //   }
      // } else if (type == 'stepper3') {
      //   sessionStorage.stepper3Details = '';
      //   sessionStorage.stepper3Details = JSON.stringify(value);
      //   if (this.coverDetails.valid) {
      //     stepper.next();
      //     this.topScroll();
      //
      //   }else{
      //     this.toastr.error('Please fill the Mandatory Fields')
      //
      //   }
      // }

      // this.proposerFormData = this.relianceProposal.value;
      // this.riskFormData = this.riskDetails.value;
      // this.coverFormData = this.coverDetails.value;
      // this.previousFormData = this.previousInsurance.value;

      // this.summaryData = true;


    }
  }

  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }



  //

  //dob
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
          } else if (type == 'nominee') {
            this.personalDobError = '';
          }
        } else {
          if (type == 'proposor') {
            this.personalDobError = 'Enter Valid Dob';
          } else if (type == 'insurer') {
            this.personalDobError = 'Enter Valid Dob';
          }
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10 && type == 'proposor') {
          this.proposerAge = this.ageCalculate(dob);
          this.personalDobError = '';
          // sessionStorage.proposerAgeForTravel = this.proposerAge;
        }
      }
      if (type == 'proposor') {
        console.log(this.proposerAge, 'age');
        sessionStorage.proposerAge = this.proposerAge;
      }
    }
  }

  //
  ageCalculate(dob) {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    let dd = today.getDate()- birthDate.getDate();
    if( m < 0 || m == 0 && today.getDate() < birthDate.getDate()){
      age = age-1;
    }
    return age;
  }
  //

  nameValidate(event: any){
    this.validation.nameValidate(event);
  }

  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }
}
