import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TravelService} from '../../shared/services/travel.service';
import {ProposalService} from '../../shared/services/proposal.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../app.settings';
import {MatDialog, MatStepper} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {CommonService} from '../../shared/services/common.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
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
  selector: 'app-reliagretravelproposal',
  templateUrl: './reliagretravelproposal.component.html',
  styleUrls: ['./reliagretravelproposal.component.scss']
})
export class ReliagretravelproposalComponent implements OnInit {
    public religarePersonal: FormGroup;
    public today: any;
    public personalDobError: any;
    public religareTravelproposerAge: any;
    public pin: any;
    public title: any;
    public personalTravelCitys: any;
    public responseReligareTravel: any;
    public personalReligareTravelData: any;
    public AcceptDeclaration: any;
  constructor(public travelservice: TravelService, public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,
    public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public auth: AuthService, public http: HttpClient, @Inject(LOCALE_ID) private locale: string) {
      let today = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());




      this.religarePersonal = this.fb.group({
          religarePersonalTitle: ['', Validators.required],
          religarePersonalFirstname: new FormControl(''),
          religarePersonalLastname: new FormControl(''),
          religarePersonalGender: ['', Validators.compose([Validators.required])],
          religarePersonalDob: ['', Validators.compose([Validators.required])],
          religarePersonalrelationship: 'SELF',
          religarePersonalGst: ['', Validators.compose([Validators.minLength(15)])],
          religarePersonalAddress: ['', Validators.required],
          religarePersonalAddress2: ['', Validators.required],
          religarePersonalPincode: ['', Validators.required],
          religarePersonalCity: ['', Validators.required],
          religarePersonalState: ['', Validators.required],
          religarePersonalEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          religarePersonalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
          travelDeclaration: ['', Validators.required]

      });



  }
  // title change function
    changeGender() {
        if (this.religarePersonal.controls['religarePersonalTitle'].value == 'MR'){
            this.religarePersonal.controls['religarePersonalGender'].patchValue('Male');
        } else {
            this.religarePersonal.controls['personalGreligarePersonalGenderender'].patchValue('Female');
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
    ngOnInit() {
  }
// dob validation
    addEvent(event, i, type) {
        if (event.value != null) {
            let selectedDate = '';
            this.religareTravelproposerAge = '';
            let dob = '';
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (pattern.test(event.value._i) && event.value._i.length == 10) {
                    if (type == 'insurer') {
                        // this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
                    } else {
                        this.personalDobError = '';
                    }

                } else {
                    if (type == 'insurer') {
                        // this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('Enter Valid Date');
                    } else {
                        this.personalDobError = 'Enter Valid Date';
                    }

                }
                selectedDate = event.value._i;
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                console.log(dob,'dob');
                if (selectedDate.length == 10) {
                    this.religareTravelproposerAge = this.ageCalculate(dob);
                }

            } else if (typeof event.value._i == 'object') {
                // dob = this.datepipe.transform(event.value, 'MMM d, y');
                dob = this.datepipe.transform(event.value, 'y-MM-dd');
                if (dob.length == 10) {
                    this.religareTravelproposerAge = this.ageCalculate(dob);
                }
                this.personalDobError = '';


            // if (this.proposerAge && type == 'insurer') {
            //     console.log(dob, 'dobdob');
            //     this.insureArray['controls'].items['controls'][i]['controls'].passportExpiry.patchValue(dob);
            //     this.insureArray['controls'].items['controls'][i]['controls'].insurerExpiryValidError.patchValue('');
            } else {
                sessionStorage.proposerAgeReligareTravel = this.religareTravelproposerAge;
            }

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
    // postal code in religareproposal
    getPostal(pin, title) {
        this.pin = pin;
        this.title = title;
        console.log(this.title, 'kjhjkghkhk')
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4',
            'pincode': this.pin
        }
        if (this.pin.length == 6) {
            this.proposalservice.getPostalReligare(data).subscribe(
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
        if (this.title == 'personal') {
            this.personalTravelCitys = [];
            this.responseReligareTravel = successData.ResponseObject;
            if (successData.IsSuccess) {
                this.religarePersonal.controls['religarePersonalState'].setValue(this.responseReligareTravel[0].state);
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city});
                }
            } else if (successData.IsSuccess != true) {
                this.religarePersonal.controls['religarePersonalState'].setValue('');
                for (let i = 0; i < this.responseReligareTravel.length; i++) {
                    this.personalTravelCitys.push({city: this.responseReligareTravel[i].city = ''});
                }
                this.toastr.error('In valid Pincode');
            }
        }
    }
    //     if (this.title == 'residence') {
    //         this.residenceCitys = [];
    //         this.rResponse = successData.ResponseObject;
    //         if (successData.IsSuccess) {
    //             this.personal.controls['residenceState'].setValue(this.rResponse[0].state);
    //             for (let i = 0; i < this.rResponse.length; i++) {
    //                 this.residenceCitys.push({city: this.rResponse[i].city});
    //             }
    //         } else if(successData.IsSuccess != true) {
    //             this.personal.controls['residenceState'].setValue('');
    //             for (let i = 0; i < this.rResponse.length; i++) {
    //                 this.residenceCitys.push({city: this.rResponse[i].city = ''});
    //             }
    //             this.toastr.error('In valid Pincode');
    //         }
    //     }
    // }
    public getpostalFailure(error) {
        console.log(error);
    }
    // // travel proposal
    acceptDeclaration() {
        console.log(this.religarePersonal.controls['travelDeclaration'].value, 'value');
        if (this.religarePersonal.controls['travelDeclaration'].value) {
            this.AcceptDeclaration = true;
        } else {
            this.AcceptDeclaration = false;
        }
    }
    personalDetails(stepper: MatStepper, value) {
        sessionStorage.stepper1DetailsForTravel = '';
        sessionStorage.stepper1DetailsForTravel = JSON.stringify(value);
        this.personalReligareTravelData = value;
        // this.personalData.personalDob = this.datepipe.transform(this.personalData.personalDob, 'MMM d, y');
        console.log(this.personalReligareTravelData, 'first');
        if (this.personalReligareTravelData.valid) {
            if (sessionStorage.proposerAgeForTravel >= 18) {
                stepper.next();
            } else {
                this.toastr.error('Proposer age should be 18 or above');
            }
        }
    }
    }

