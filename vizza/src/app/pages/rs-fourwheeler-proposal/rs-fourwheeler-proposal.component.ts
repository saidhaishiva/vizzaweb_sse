import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-rs-fourwheeler-proposal',
  templateUrl: './rs-fourwheeler-proposal.component.html',
  styleUrls: ['./rs-fourwheeler-proposal.component.scss']
})
export class RsFourwheelerProposalComponent implements OnInit {
  public proposer: FormGroup;
  public vehical: FormGroup;
  public previousInsure: FormGroup;
  public nomineeDetail: FormGroup;



  constructor(public fb: FormBuilder, ) {


    this.proposer = this.fb.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      occupation: ' ',
      address: ['', Validators.required],
      address2: ['', Validators.required],
      address3: '',
      address4: '',
      pincode: ['', Validators.required],
      state: '',
      stateName: '',
      city: '',
      cityName: '',
      raddress: ['', Validators.required],
      raddress2: ['', Validators.required],
      raddress3: '',
      raddress4: '',
      rpincode: ['', Validators.required],
      rstate: '',
      rcity: '',
      rstateName: '',
      rcityName: '',
      sameas: '',
      phoneNumber:  ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      stdCode: ''
    });

    this.vehical = this.fb.group({
      vehicleMostlyDrivenOn: ['', Validators.required],
      vehicleRegisteredName: '' ,
      // registrationchargesRoadtax: ['', Validators.required],
      coverelectricalaccesss: '',
      drivingExperience: '',
      averageMonthlyMileageRun: ['', Validators.required],
      companyName: '',
      idv: '',
      isTwoWheelerFinancedValue: '',
      financierName: '',
      isTwoWheelerFinanced: '',
      hypothecationType: '',
      typeOfCover: '',
      vechileOwnerShipChanged: 'No',

      electricalAccess : new FormArray([
        // this.create()
      ]),
      // nonelectricalAccess : new FormArray([
      //   this.createnonElectrical()
      // ]),
    });

    this.previousInsure = this.fb.group({
      policyNumber: '',
      previousInsured: '',
      previousdob:'',
      isPreviousPolicyHolder:'',
      voluntary:'',
      claimAmount:'',
      previousPolicyType: '',
      personalAccidentCover: '',
      accidentPaid: '',
    });
    this.nomineeDetail = this.fb.group({
      nomineeName: '',
      nomineeAge: '',
      nomineeRelationship: '',
      appointeeName: '',
      appointeeRelationship: '',
      appointeeAge: ''
    });

  }

  ngOnInit() {
  }

}
