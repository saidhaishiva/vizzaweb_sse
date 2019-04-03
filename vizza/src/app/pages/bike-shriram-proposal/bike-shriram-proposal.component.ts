import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {MatStepper} from '@angular/material';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
@Component({
  selector: 'app-bike-shriram-proposal',
  templateUrl: './bike-shriram-proposal.component.html',
  styleUrls: ['./bike-shriram-proposal.component.scss']
})
export class BikeShriramProposalComponent implements OnInit {
  public proposer: FormGroup;
  public shriramProposer: any;
  public pinProposerList: any;
  public settings: Settings;

  constructor(public fb: FormBuilder, public validation: ValidationService, public appSettings: AppSettings, public personalservice: PersonalAccidentService ) {
    this.proposer = this.fb.group({
      title: ['', Validators.required],
      firstname: new FormControl(''),
      middlename: new FormControl(''),
      lastname: new FormControl(''),
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pincode: ['', Validators.required]
     });

    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
  }

  // title change function
  changeGender() {
    if (this.proposer.controls['title'].value == 'MR') {
      this.proposer.controls['gender'].patchValue('Male');
    } else {
      this.proposer.controls['gender'].patchValue('Female');
    }
  }

  ngOnInit() {


  }

  // session Data
  sessionData() {
    if (sessionStorage.shriramProposer != '' && sessionStorage.shriramProposer != undefined) {
      this.shriramProposer = JSON.parse(sessionStorage.shriramProposer);
      if (this.shriramProposer.pincode != '') {
        this.getinsuredPostalCode(this.shriramProposer.pincode);
      }
      this.proposer = this.fb.group({
        title: this.shriramProposer.title,
        firstname: this.shriramProposer.firstname,
        middlename: this.shriramProposer.middlename,
        lastname: this.shriramProposer.lastname,
        gender: this.shriramProposer.gender,
        email: this.shriramProposer.email,
        mobile: this.shriramProposer.mobile,
        pincode: this.shriramProposer.pincode

      })

    }
  }

  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }
  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }


  public proposerDetails(stepper: MatStepper, value) {
    console.log(value, 'valuevalue');
    sessionStorage.shriramProposerDetail = '';
    sessionStorage.shriramProposerDetail = JSON.stringify(value);
    console.log(this.proposer.valid, 'check');

  }
  // insured pin validate
  getinsuredPostalCode(pin) {
    const data = {
      'platform': 'web',
      'postalcode': pin
    };
    if (pin.length == 6) {
      this.personalservice.pinPaList(data).subscribe(
          (successData) => {
            this.pinProposerListSuccess(successData);
          },
          (error) => {
            this.pinProposerListFailure(error);
          }
      );
    }
  }

  public pinProposerListSuccess(successData) {
    if (successData.IsSuccess) {
      this.pinProposerList = successData.ResponseObject;
    }
  }

  public pinProposerListFailure(error) {
  }
}
