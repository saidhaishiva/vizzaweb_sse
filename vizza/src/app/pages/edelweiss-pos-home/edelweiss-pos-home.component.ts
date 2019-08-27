import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {ValidationService} from '../../shared/services/validation.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../edelweiss-term-life/edelweiss-term-life.component';
import {AuthService} from '../../shared/services/auth.service';
import * as moment from 'moment';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';



@Component({
  selector: 'app-edelweiss-pos-home',
  templateUrl: './edelweiss-pos-home.component.html',
  styleUrls: ['./edelweiss-pos-home.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EdelweissPosHomeComponent implements OnInit {
  public edelweisspos: FormGroup;
  public setDate: any;
  public age: any;
  public selectDate: any;
  public productName: any;
  public pin: any;
  public title: any;
  public response: any;
  public pincodeErrors: boolean;
  public show: boolean;
  public today: any;
  public companyList: any;
  public dobError: any;
  public edelEnqAge: any;
  public webhost: any;
  public settings: Settings;
  public metaTitle: any;
  public suminsuredvalue: any;
  public premiumdata: any;
  public policydata: any;

  constructor(public fb: FormBuilder, public router: Router, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public config: ConfigurationService, public validation: ValidationService, public auth: AuthService, public appSettings: AppSettings) {
    this.edelweisspos = this.fb.group({
      edelsuminsure: '',
      edeldob: ['', Validators.required],
      edelGender: ['', Validators.required],
      edelpolicy: '',
      edelpremium: '',
      edelPayment: '',
      edelPincode: ['', Validators.required]
    })
  }

  ngOnInit() {
    sessionStorage.enquiryFromDetials = '';
    sessionStorage.getEnquiryDetials = '';
    sessionStorage.allProductLists = '';
    this.show = this.config.getTermLife();
    this.setDate = Date.now();
    this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
    this.route.params.forEach((params) => {
      console.log(params.id);
      this.productName = params.id;
    });
    this.sessionData();
    this.getsuminsuredlist();
    this.premiumlist();
    this.policylist();
  }

  sessionData() {
    if (sessionStorage.enquiryFormData != '' && sessionStorage.enquiryFormData != undefined) {
      let enquiryFormData = JSON.parse(sessionStorage.enquiryFormData);
      this.edelweisspos = this.fb.group({
        edelsuminsure: enquiryFormData.edelsuminsure,
        edeldob: this.datepipe.transform(enquiryFormData.edeldob, 'y-MM-dd'),
        edelGender: enquiryFormData.edelGender,
        edelpolicy: enquiryFormData.edelpolicy,
        edelpremium: enquiryFormData.edelpremium,
        edelPayment: enquiryFormData.edelPayment,
        edelPincode: enquiryFormData.edelPincode,
      });
    }
    if (sessionStorage.pincodeErrors != '' && sessionStorage.pincodeErrors != undefined) {
      this.pincodeErrors = JSON.parse(sessionStorage.pincodeErrors);
    }
    if (sessionStorage.dobError != '' && sessionStorage.dobError != undefined) {
      this.dobError = sessionStorage.dobError;
    }

  }

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
      this.edelEnqAge = '';
      let dob = '';
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (pattern.test(event.value._i) && event.value._i.length == 10) {
          this.dobError = '';
        } else {
          this.dobError = 'Enter Valid Date';
        }
        selectedDate = event.value._i;
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (selectedDate.length == 10) {
          this.edelEnqAge = this.ageCalculate(dob);
          sessionStorage.edelEnqAge = this.edelEnqAge;

        }
      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.edelEnqAge = this.ageCalculate(dob);
          sessionStorage.edelEnqAge = this.edelEnqAge;
        }
        this.dobError = '';
      }
      sessionStorage.dobError = this.dobError;
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

  getsuminsuredlist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonservices.suminsuredlist(data).subscribe(
        (successData) => {
          this.suminsuredlistSuccess(successData);

        },
        (error) => {
          this.suminsuredlistFailure(error);
        });
  }

  public suminsuredlistSuccess(successData) {
    this.suminsuredvalue = successData.ResponseObject;
  }

  public suminsuredlistFailure(error) {
    console.log(error);
  }

  premiumlist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonservices.premiumlist(data).subscribe(
        (successData) => {
          this.premiumlistSuccess(successData);

        },
        (error) => {
          this.premiumlistFailure(error);
        });
  }

  public premiumlistSuccess(successData) {
    this.premiumdata = successData.ResponseObject;
  }

  public premiumlistFailure(error) {
    console.log(error);
  }

  policylist() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
    };
    this.commonservices.policylist(data).subscribe(
        (successData) => {
          this.policylistSuccess(successData);

        },
        (error) => {
          this.policylistFailure(error);
        });
  }

  public policylistSuccess(successData) {
    this.policydata = successData.ResponseObject;
  }

  public policylistFailure(error) {
    console.log(error);
  }

  getPincodeDetails(pin) {
    const data = {
      'platform': 'web',
      'postalcode': pin
    };
    if (pin.length == 6) {
      this.commonservices.getPincodeDetails(data).subscribe(
          (successData) => {
            this.getPincodeDetailsSuccess(successData);
          },
          (error) => {
            this.getPincodeDetailsFailure(error);
          }
      );
    }
  }

  public getPincodeDetailsSuccess(successData) {
    if (successData) {
      this.pincodeErrors = false;
    } else {
      this.toastr.error(successData.ErrorObject);
      this.pincodeErrors = true;
    }
    sessionStorage.pincodeErrors = this.pincodeErrors;
  }

  public getPincodeDetailsFailure(error) {
    console.log(error);
  }

  public keyPress(event: any) {
    if (event.key == '0') {
      if (event.target.value.length == 0) {
        event.preventDefault();
      }
    } else if (event.charCode !== 0) {
      const pattern = /[0-9\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }
  }

  typingPolicyTerm() {
    // this.TermLife.controls['lifePolicy'].patchValue(this.TermLife.controls['lifeBenefitTerm'].value);
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

  productListEnquiry(value) {
    sessionStorage.enquiryFormData = JSON.stringify(value);
    console.log(this.edelweisspos.valid, 'this.TermLife.valid');
    if (this.edelweisspos.valid) {
      let valid = false;
      if (this.pincodeErrors == false) {
        valid = true;
      }
      if (valid) {
        if (sessionStorage.edelEnqAge >= 18) {
          const data = {
            'platform': 'web',
            'created_by': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'sum_assured_id': this.edelweisspos.controls['edelsuminsure'].value,
            'age': sessionStorage.edelEnqAge,
            'dob': this.datepipe.transform(this.edelweisspos.controls['edeldob'].value, 'y-MM-dd'),
            'gender': this.edelweisspos.controls['edelGender'].value,
            'policy_paying_term': this.edelweisspos.controls['edelpolicy'].value,
            'benefit_term': this.edelweisspos.controls['edelpremium'].value,
            'payment_mode': this.edelweisspos.controls['edelPayment'].value,
            'pincode': this.edelweisspos.controls['edelPincode'].value
          };
          console.log(data, 'dattttaaaaa');
          this.commonservices.edelweissenquiry(data).subscribe(
              (successData) => {
                this.edelweissenquirySuccess(successData, data);
              },
              (error) => {
                this.edelweissenquiryFailure(error);
              }
          );
        } else {
          this.toastr.error('Age should be 18 or above');
        }
      }
    } else {
      this.toastr.error('Please fill the all mandatory fields');
    }
  }

  edelweissenquirySuccess(successData, data) {
    console.log(successData);
    if (successData.IsSuccess) {
      sessionStorage.enquiryFromDetials = JSON.stringify(data);
      sessionStorage.getEnquiryDetials = JSON.stringify(successData.ResponseObject);
      this.router.navigate(['/edelweiss-premium-list']);
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }

  edelweissenquiryFailure(error) {
    console.log(error)
  }
}
