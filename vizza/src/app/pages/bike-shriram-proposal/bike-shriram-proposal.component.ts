import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';
import {MatStepper} from '@angular/material';
import {PersonalAccidentService} from '../../shared/services/personal-accident.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {BikeInsuranceService} from '../../shared/services/bike-insurance.service';
@Component({
  selector: 'app-bike-shriram-proposal',
  templateUrl: './bike-shriram-proposal.component.html',
  styleUrls: ['./bike-shriram-proposal.component.scss']
})
export class BikeShriramProposalComponent implements OnInit {
  public proposer: FormGroup;
  public vehical:FormGroup;
  public previousInsure:FormGroup;
  public nomineeDetail: FormGroup;
  public minDate: any;
  public maxdate: any;
  public shriramProposer: any;
  public pinProposerList: any;
  public settings: Settings;
  public proposerRatioDetail: boolean;
  public driverAgeDetail: boolean;
  public insurerdateError: any;
  public proposerAgeP: any;
  public insuredAgeP: any;
  public maxStartdate: any;
  public pannumberP: boolean;
  public bikeCityList: any;
  public bkVehicleList: any;
  public bikeProposerAge: any;
  public proposerdateError: any;
  public nomineeRelation: any;

  constructor(public fb: FormBuilder, public validation: ValidationService, public datepipe: DatePipe, public authservice: AuthService, private toastr: ToastrService,  public appSettings: AppSettings, public bikeInsurance: BikeInsuranceService ) {

    const minDate = new Date();
    this.minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    this.maxdate = this.minDate;

    this.settings = this.appSettings.settings;
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.proposerRatioDetail = false;
    this.driverAgeDetail = false;
    this.proposerAgeP = '';
    this.insuredAgeP = '';
    this.maxStartdate = '';
    this.pannumberP = false;

    this.proposer = this.fb.group({
      title: ['', Validators.required],
      name: new FormControl(''),
      dob: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      pincode: ['', Validators.required],
      radio: ' ',
      alterMobile: '',
      proposerFax: '',
      proposerPan: ['', Validators.compose([ Validators.minLength(10)])],
      proposerGst: ['', Validators.compose([Validators.minLength(15)])],
      address: ['', Validators.required],
      address2: '',
      address3: '',
      state: ['', Validators.required],
      city: ['', Validators.required],
      breakIn:''
    });
    this.vehical = this.fb.group({
      vehicleType: ['', Validators.required],
      vehicleTypeName: '',
      vehicleIDV: '',
      noEmpCoverLL: '',
      vehicleColour: '',
      driverAge: '',
      BreakIn: '',
      nilDepreciationCover: '',
      unnamedPassenger: '',
      unnamedPassengerSI: '',
      electricalAccess: '',
      electricalAccessSI: '',
      nonElectricalAccess: '',
      nonElectricalAccessSI: '',
      pdConductorCleaner: '',
      pdConductorCleanerSI: '',
      pdCount: '',
      pConductorCount: '',
      pCleanerCount: '',
      eleAccessRemark: '',
      nonEleAccessRemark: '',
      specifiedPersonField: '',
      paOWexclusion: '',
      paOWexReason: '',
      vehiclePurpose: ' ',
      convertNoteNo: '',
      convertNoteDt:'',

    });
    this.previousInsure = this.fb.group({
      policyNumber: '',
      previousInsure: '',
      policyUwYear: '',
      policySi: '',
      previousPolicyType: '',
      policyNilDescription: '',
      previousPolicyNcb: '',
      policyClaim:''

    });


    this.nomineeDetail = this.fb.group({
      nomineeName:'',
      nomineeAge:'',
      nomineeRelationship:'',
      appointeeName:'',
      appointeeRelationship:''
    });



  }

  ngOnInit() {
    this.nomineeRelationShip();
  }



  // FIRST STEPPER

  // title change function
      changeGender() {
        if (this.proposer.controls['title'].value == 'MR') {
          this.proposer.controls['gender'].patchValue('Male');
        } else {
          this.proposer.controls['gender'].patchValue('Female');
        }
      }


    // AGE VALIDATION
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


  // date input
         addEvent(event, type) {
              if (event.value != null) {
                let selectedDate = '';
                this.bikeProposerAge = '';
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
                    this.bikeProposerAge = this.ageCalculate(dob);
                    console.log(this.bikeProposerAge,'agre');
                    sessionStorage.bkShriramProposerAge = this.bikeProposerAge;
                    console.log(sessionStorage.bkShriramProposerAge,'sessionStorage.bkShriramProposerAge');
                    this.proposer.controls['age'].patchValue(this.bikeProposerAge);
                  }

                } else if (typeof event.value._i == 'object') {
                  // dob = this.datepipe.transform(event.value, 'MMM d, y');
                  dob = this.datepipe.transform(event.value, 'y-MM-dd');
                  if (dob.length == 10) {
                    this.bikeProposerAge = this.ageCalculate(dob);
                    sessionStorage.insuredAgePA = this.bikeProposerAge;
                    this.proposer.controls['age'].patchValue(this.bikeProposerAge);
                  }
                  this.proposerdateError = '';
                }
                //sessionStorage.insuredAgePA = this.bikeProposerAge;

              }
          }
  // // PINCODE
  //           getinsuredPostalCode(pin) {
  //             const data = {
  //               'platform': 'web',
  //               'postalcode': pin
  //             };
  //             if (pin.length == 6) {
  //               this.personalservice.pinPaList(data).subscribe(
  //                   (successData) => {
  //                     this.pinProposerListSuccess(successData);
  //                   },
  //                   (error) => {
  //                     this.pinProposerListFailure(error);
  //                   }
  //               );
  //             }
  //           }
  //
  //           public pinProposerListSuccess(successData) {
  //             if (successData.IsSuccess) {
  //               this.pinProposerList = successData.ResponseObject;
  //             }
  //           }
  //
  //           public pinProposerListFailure(error) {
  //           }

            driverAgeList() {
              console.log(this.proposer.controls['driverAge'].value,'eeeeeeeeeeeeeeee')
              if (this.proposer.controls['driverAge'].value == 'Yes') {
                this.driverAgeDetail = true;
              } else {
                this.driverAgeDetail = false;
              }
            }
  // CITY
  //         onChangecityListInsuredPa(){
  //           const data = {
  //             'platform': 'web',
  //             'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
  //             'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
  //           }
  //           this.bikeInsurance.getNomineeRelationship(data).subscribe(
  //               (successData) => {
  //                 this.nomineeRelationSuccess(successData);
  //               },
  //               (error) => {
  //                 this.nomineeRelationFailure(error);
  //               }
  //           );
  //         }
  //           public nomineeRelationSuccess(successData){
  //             this.nomineeRelation = successData.ResponseObject;
  //
  //           }
  //           public nomineeRelationFailure(error){
  //           }
      changeCity() {
        this.proposer.controls['proposerbkCityName'].patchValue(this.bikeCityList[this.proposer.controls['proposerbkCity'].value]);

      }
      changevehicle() {
        this.proposer.controls['vehicleTypeName'].patchValue(this.bkVehicleList[this.proposer.controls['vehicleType'].value]);

      }

  // NEXT BUTTON

        public proposerDetails(stepper: MatStepper, value) {
          console.log(value, 'eeeeeeeeeee');
          sessionStorage.stepper1 = '';
          sessionStorage.stepper1 = JSON.stringify(value);
          console.log(this.proposer.valid, 'checked');
          stepper.next();

        }

 // SECOND STEPPER
     // PURPOSE lIST
          vehiclePurposeList() {
            console.log(this.proposer.controls['vehiclePurpose'].value,'eeeeeeeeeeeeeeee')
            if (this.proposer.controls['vehiclePurpose'].value == 'Yes') {
              this.proposerRatioDetail = true;
            } else {
              this.proposerRatioDetail = false;
            }
          }
  // NEXT BUTTON
          vehicalDetails(stepper: MatStepper, value){
              sessionStorage.stepper2 = '';
              sessionStorage.stepper2 = JSON.stringify(value);
              stepper.next();
          }



  // THIRD STEPPER

        previousDetails(stepper: MatStepper, value){
          sessionStorage.stepper3 = '';
          sessionStorage.stepper3 = JSON.stringify(value);
          stepper.next();
        }
//  fFOURTH sTEPPER (NOMINEE)

        //RELATIONSHIP
          nomineeRelationShip(){
            const data = {
              'platform': 'web',
              'user_id': this.authservice.getPosUserId() ? this.authservice.getPosUserId() : '0',
              'role_id': this.authservice.getPosRoleId() ? this.authservice.getPosRoleId() : '4'
            }
              this.bikeInsurance.getNomineeRelationship(data).subscribe(
                  (successData) => {
                    this.nomineeRelationSuccess(successData);
                  },
                  (error) => {
                    this.nomineeRelationFailure(error);
                  }
              );
            }
            public nomineeRelationSuccess(successData){
                this.nomineeRelation = successData.ResponseObject;
                console.log(this.nomineeRelation,'this.nomineeRelation');
            }
            public nomineeRelationFailure(error){
            }

  // VALIDATION
          numberValidate(event: any) {
            this.validation.numberValidate(event);
          }
          nameValidate(event: any) {
            this.validation.nameValidate(event);
          }
          // Dob validation
          dobValidate(event: any) {
            this.validation.dobValidate(event);
          }
          spac(event: any){
            this.validation.spac(event);

          }
          idValidate(event: any) {
            this.validation.idValidate(event);
          }
        topScroll() {
          document.getElementById('main-content').scrollTop = 0;
        }

  // session Data
  sessionData() {
    if (sessionStorage.shriramProposer != '' && sessionStorage.shriramProposer != undefined) {
      this.shriramProposer = JSON.parse(sessionStorage.shriramProposer);
      // if (this.shriramProposer.pincode != '') {
      //   this.getinsuredPostalCode(this.shriramProposer.pincode);
      // }
      this.proposer = this.fb.group({
        title: this.shriramProposer.title,
        name: this.shriramProposer.name,
        gender: this.shriramProposer.gender,
        dob : this.shriramProposer.dob,
        email: this.shriramProposer.email,
        mobile: this.shriramProposer.mobile,
        pincode: this.shriramProposer.pincode,
        proposerRadio: this.shriramProposer.proposerRadio,
        radio: this.shriramProposer.radio,
        alterMobile : this.shriramProposer.alterMobile,
        personalFax: this.shriramProposer.personalFax,
        proposerPan: this.shriramProposer.proposerPan,
        proposerGst: this.shriramProposer.proposerGst,
        proposerAddress: this.shriramProposer.proposerAddress,
        proposerAddress2: this.shriramProposer.proposerAddress2,
        proposerAddress3: this.shriramProposer.proposerAddress3,
        proposerbkState: this.shriramProposer.proposerbkState,
        proposerbkCity: this.shriramProposer.proposerbkCity,


      })

    }
  }

}
