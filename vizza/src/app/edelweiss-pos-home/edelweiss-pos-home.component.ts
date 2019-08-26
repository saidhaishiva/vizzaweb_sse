import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
import {ConfigurationService} from '../shared/services/configuration.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material';
import {ValidationService} from '../shared/services/validation.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import { MY_FORMATS} from '../pages/edelweiss-term-life/edelweiss-term-life.component';
import  { AuthService } from '../shared/services/auth.service';
import { TermLifeCommonService } from '../shared/services/term-life-common.service';
import * as moment from 'moment';
import { Settings} from '../app.settings.model';
import {AppSettings} from '../app.settings';
import {MetaService} from '../shared/services/meta.service';



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
  public metaTermLife: any;
  public metaTitle: any;
  public suminsuredvalue: any;
  public premiumdata: any;
  public policydata: any;

  constructor(public fb: FormBuilder, public router: Router, public commonservices: CommonService, public datepipe: DatePipe, public route: ActivatedRoute, public toastr: ToastrService, public dialog: MatDialog, public config: ConfigurationService, public validation: ValidationService, public auth: AuthService, public commontermlyf: TermLifeCommonService, public appSettings: AppSettings, public meta: MetaService) {
    this.edelweisspos = this.fb.group({
      edelsuminsure: '' ,
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

  public metaDetailSuccess(successData) {
    console.log(successData.ResponseObject);
    this.metaTermLife = successData.ResponseObject;
    this.metaTitle = this.metaTermLife[0].title;
    console.log(this.metaTermLife[0].title, 'titl')
  }

  public metaDetailFailure(error) {
    console.log(error);
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
    console.log(this.suminsuredvalue, 'dd');
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

  TermLifeInsurer() {
    const dialogRef = this.dialog.open(TermLifeInsurer, {
      width: '1200px',
    });
    dialogRef.disableClose = true;
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

@Component({
  selector: 'termlifeinsurer',
  template: `
        <div class="container">
        <div  class="row text-justify">

            <div class="col-sm-2">
            </div>
            <div class="col-sm-8">
                <h4 class="text-center" style="color: #9ECB3B "><img src="assets/img/term-life-insurance.png" class="logo-size"> About Term Life Insurance</h4>
            </div>
            <div class="col-sm-2 text-right">
                <mat-icon (click)="onNoClick()" style="cursor: pointer">close</mat-icon>
            </div>
            <p>Term Insurance policies otherwise called as Protection plans only cover the risk of death for the specific period of policy. In case of death of insured during the policy period, the suminsured is paid to the nominated person in the policy.</p>
            <p>There is no payment paid if the insured survives after the maturity of term insurance. The term insurance is a pure life insurance and acts as a complete security to the policy holders nominees.</p>
            <p>If a house has been purchased on loan that can be secured by a term insurance, children education can be secured by a term insurance, in other words if planned well in the unfortunate event of death the nominees continue to live in the same life style we provided when we are alive. The Premium rates are very low in this plan since it covers the riskonly. Premium can be paid Single or yearly or half yearly.</p>
            <p>In whole life plans also the risk of death alone can be covered and the nominee receives the sum insured. This premium can also be paid as quarterly or half yearly or annual mode.</p>
         </div>
        </div>`,
})
export class TermLifeInsurer {

  constructor(
      public dialogRef: MatDialogRef<TermLifeInsurer>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
