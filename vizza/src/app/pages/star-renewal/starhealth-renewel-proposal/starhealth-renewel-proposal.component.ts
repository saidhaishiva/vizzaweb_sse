import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WINDOW} from '@ng-toolkit/universal';
import {HealthService} from '../../../shared/services/health.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidationService} from '../../../shared/services/validation.service';
import {DatePipe, Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {AppSettings} from '../../../app.settings';
import {MatDialog} from '@angular/material';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ProposalmessageComponent} from '../../star-health-proposal/proposalmessage/proposalmessage.component';

@Component({
  selector: 'app-starhealth-renewel-proposal',
  templateUrl: './starhealth-renewel-proposal.component.html',
  styleUrls: ['./starhealth-renewel-proposal.component.scss']
})
export class StarhealthRenewelProposalComponent implements OnInit {
  public personal: FormGroup;
  public nomineeDate: FormGroup;
  public isLinear = false;
  public dobError:any;
  public personalAge:any;
  public occupationList:any;
  public stepperindex:any;
  public mobileNumber:any;
  public response:any;
  public personalCitys:any;
  public cityList:any;
  public residenceCitys:any;
  public rCitysList:any;
  public areaNames:any;
  public rAreaNames:any;
  public inputReadonly:any;
  public socialNo:any;
  public stopNext:any;
  currentStep: any;
  public gstListType: any;
  public today: any;
  public company_name: any;
  public proposer_dob: any;
  public policy_no: any;
  public renewalPolicy: any;
  public policy_id: any;
  public renewalPolicyValues: any;
  public ageSetting: any;
  public relationshipList: any;
  public eventClaimValue: any;

  constructor(@Inject(WINDOW) private window: Window, public proposalservice: HealthService,public route: ActivatedRoute ,public validation: ValidationService, public datepipe: DatePipe, private toastr: ToastrService, public appSettings: AppSettings, public dialog: MatDialog,public router: Router,public location :Location,
              public config: ConfigurationService, public common: HealthService, public fb: FormBuilder, public auth: AuthService, public http:HttpClient, @Inject(LOCALE_ID) private locale: string) {
    this.company_name= sessionStorage.company_name;
    this.proposer_dob=sessionStorage.proposer_dob ;
    this.policy_no= sessionStorage.policy_no ;
    this.stepperindex = 0;
    this.mobileNumber = 'true';
    this.currentStep = this.stepperindex;
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.ageSetting=false;
    this.eventClaimValue=false;

    this.personal = this.fb.group({
      personalTitle: ['', Validators.required],
      personalFirstname: ['', Validators.required],
      personalLastname: ['', Validators.required],
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      personalAadhar: ['', Validators.compose([ Validators.minLength(4)])],
      personalPan: ['', Validators.compose([ Validators.minLength(10)])],
      personalgstIdType:'',
      personalGst: ['', Validators.compose([ Validators.minLength(15)])],
      isEIA:'',
      personalAddress: ['', Validators.required],
      personalAddress2: ['', Validators.required],
      personalPincode: ['', Validators.required],
      personalCity: ['', Validators.required],
      personalState: ['', Validators.required],
      personalArea: ['', Validators.required],
      personalCityName: '',
      personalAreaName: '',
      nomineeName: ['', Validators.required],
      nomineeAge: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      nomineeClaim: ['', Validators.required],
      nomineeName1: '',
      nomineeAge1: '',
      nomineeRelation1: '',
      nomineeClaim1: '',
      appointee: '',
      appointeAge: '',
      appointeRelation: '',

      socialStatus: '',
      socialAnswer1: '',
      socialAnswer2: '',
      socialAnswer3: '',
      socialAnswer4: '',
      illnessCheck: '',

    });

  }

  ngOnInit() {
    this.starrenewal();
    this.gstIdList();
    this.setRelationship();

  }



  starrenewal(){
    const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() != 0  ? this.auth.getPosRoleId() : '4',
        "pos_status":"0",
        'company_name': this.company_name,
        'proposer_dob': this.datepipe.transform(this.proposer_dob, 'y-MM-dd'),
        'policy_no': this.policy_no,
      };
      console.log(data,'data');

      this.common.starpolicyRenewalRemainder(data).subscribe(
          (successData) => {
            this.starpolicyRenewalSuccess(successData);
          },
          (error) => {
            this.starpolicyRenewalFailure(error);
          }
      );
  }
  starpolicyRenewalSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.renewalPolicy=successData.ResponseObject;
      this.policy_id=successData.ResponseObject.Renewal_id;
      this.renewalPolicyValues=successData.ResponseObject.result;
    }
  }
  starpolicyRenewalFailure(error) {
  }

  gstIdList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.proposalservice.getGstId(data).subscribe(
        (successData) => {
          this.gstSuccess(successData);
        },
        (error) => {
          this.gstFailure(error);
        }
    );
  }
  public gstSuccess(successData) {
    if (successData.IsSuccess) {
      this.gstListType = successData.ResponseObject;
      console.log(this.gstListType,'this.gstListType' );
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  public gstFailure(error) {
  }


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

  addEvent(event) {
    if (event.value != null) {
      let selectedDate = '';
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
          this.personalAge = this.ageCalculate(dob);
        }

      } else if (typeof event.value._i == 'object') {
        dob = this.datepipe.transform(event.value, 'y-MM-dd');
        if (dob.length == 10) {
          this.personalAge = this.ageCalculate(dob);
        }
        this.dobError = '';
      }
      sessionStorage.setItem('proposerAge' , this.personalAge);
    }
  }

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

  // setOccupationList() {
  //   const data = {
  //     'platform': 'web',
  //     'product_id': this.buyProductdetails.product_id,
  //     'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
  //     'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
  //   }
  //   this.proposalservice.getOccupationList(data).subscribe(
  //       (successData) => {
  //         this.occupationListSuccess(successData);
  //       },
  //       (error) => {
  //         this.occupationListFailure(error);
  //       }
  //   );
  //
  // }
  // public occupationListSuccess(successData) {
  //   if (successData.IsSuccess) {
  //     this.occupationList = successData.ResponseObject;
  //   }
  // }
  // public occupationListFailure(error) {
  //   console.log(error);
  // }

  alternateChange(event) {
    if (event.target.value.length == 10) {
      if(event.target.value == this.personal.get('personalMobile').value) {
        this.mobileNumber = 'Alternate number should be different from mobile number';
      } else {
        this.mobileNumber = '';
      }
    } else {
      this.mobileNumber = '';
    }
    sessionStorage.mobileNumber = this.mobileNumber;
  }

  PreviousInsure(value) {
    if (value.value == 'true') {
      this.personal.controls['previousinsurance'].setValue('');
    } else {
      this.personal.controls['previousinsurance'].setValue('No');
    }
  }

  // pincode list
  getPostal(pin, title) {
    const data = {
      'platform': 'web',
      'pincode': pin
    }
    if (pin.length == 6) {
      this.common.getPostal(data).subscribe(
          (successData) => {
            this.getpostalSuccess(successData,title);
          },
          (error) => {
            this.getpostalFailure(error);
          }
      );
    }
  }
  public getpostalSuccess(successData,title) {
    if (successData.IsSuccess == true) {
      this.response = successData.ResponseObject;
      if (title == 'personal') {
        if (Object.keys(this.response).length === 0) {
          this.personal.controls['personalState'].setValue('');
          this.personal.controls['personalCity'].setValue('');
          this.personal.controls['personalArea'].setValue('');
          this.personalCitys = {};
          this.cityList = {};
        } else {
          this.personal.controls['personalState'].setValue(this.response.state);
          this.personalCitys = this.response.city;
          this.cityList = this.response.city;
        }
        sessionStorage.personalCitys = JSON.stringify(this.personalCitys);
      } else if (title == 'residence') {
        if (Object.keys(this.response).length === 0) {
          this.personal.controls['residenceCity'].setValue('');
          this.personal.controls['residenceState'].setValue('');
          this.personal.controls['residenceArea'].setValue('');
          this.residenceCitys = {};
          this.rCitysList = {};
        } else {
          this.personal.controls['residenceState'].setValue(this.response.state);
          this.residenceCitys = this.response.city;
          this.rCitysList = this.response.city;
        }
        sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
      }
    } else {
      this.toastr.error('In valid Pincode');
      if (title == 'personal') {
        this.personalCitys = {};
        this.cityList = {};
        sessionStorage.personalCitys = '';
        this.personal.controls['personalState'].setValue('');
        this.personal.controls['personalArea'].setValue('');
        this.personal.controls['personalCity'].setValue('');
      } else if (title == 'residence') {
        this.residenceCitys = {};
        this.rCitysList = {};
        sessionStorage.residenceCitys = '';
        this.personal.controls['residenceCity'].setValue('');
        this.personal.controls['residenceState'].setValue('');
        this.personal.controls['residenceArea'].setValue('');
      }
    }
  }
  public getpostalFailure(error) {
    console.log(error);
  }
  // get all areas
  getAreas(title, type) {
    if(type == 'manual') {
      // this.typeAddressDeatils();
    }
    const data = {
      'platform': 'web',
      'pincode': title == 'personal' ? this.personal.controls['personalPincode'].value : this.personal.controls['residencePincode'].value,
      'city_id': title == 'personal' ? this.personal.controls['personalCity'].value : this.personal.controls['residenceCity'].value
    }
    this.common.getArea(data).subscribe(
        (successData) => {
          this.getCitySuccess(successData, title);
        },
        (error) => {
          this.getCityFailure(error);
        }
    );
  }
  public getCitySuccess(successData, title) {
    if (successData.IsSuccess == true) {
      if (title == 'personal') {
        this.areaNames = successData.ResponseObject;
        sessionStorage.areaNames = JSON.stringify(this.areaNames);
      } else if (title == 'residence') {
        this.rAreaNames = successData.ResponseObject;
        sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);
      }
    }
  }
  public getCityFailure(error) {
    console.log(error);
  }

  typeAge() {
    if (this.personal.controls['nomineeAge'].value < 18 && this.personal.controls['nomineeAge'].value != '') {
      this.ageSetting = true;
    } else {
      this.ageSetting = false;

    }
  }

  setRelationship() {
    const data = {
      'platform': 'web',
      // 'product_id': this.buyProductdetails.product_id,
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
    if (successData.IsSuccess) {
      this.relationshipList = successData.ResponseObject;
      console.log(this.relationshipList,'relationshipList.......')
    }
  }
  public setRelationshipFailure(error) {
    console.log(error);

  }

  claimPercent() {
    if(this.personal.controls['nomineeRelation'].value < 100 && this.personal.controls['nomineeRelation'].value != '' ){
      this.eventClaimValue=true;

    }else if(this.personal.controls['nomineeRelation'].value >= 100 || this.personal.controls['nomineeRelation'].value == ''){
      this.eventClaimValue=false;
      this.personal.controls['nomineeName1'].patchValue('');
      this.personal.controls['nomineeAge1'].patchValue('');
      this.personal.controls['nomineeRelation1'].patchValue('');
      this.personal.controls['nomineeClaim1'].patchValue('');
    }
  }

  // sameAddress(values: any) {
  //   if (values.checked) {
  //     this.inputReadonly = true;
  //     this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
  //     this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
  //     this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
  //     this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
  //     this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
  //     this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
  //     this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
  //     this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
  //     this.rAreaNames = JSON.parse(sessionStorage.areaNames);
  //
  //     sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
  //     sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);
  //
  //   } else {
  //     this.inputReadonly = false;
  //     this.personal.controls['residenceAddress'].setValue('');
  //     this.personal.controls['residenceAddress2'].setValue('');
  //     this.personal.controls['residenceCity'].setValue('');
  //     this.personal.controls['residencePincode'].setValue('');
  //     this.personal.controls['residenceState'].setValue('');
  //     this.personal.controls['residenceCity'].setValue('');
  //     this.personal.controls['residenceArea'].setValue('');
  //     sessionStorage.residenceCitys = '';
  //     sessionStorage.rAreaNames = '';
  //     this.residenceCitys = {};
  //     this.rAreaNames = {};
  //
  //   }
  // }
  // typeAddressDeatils() {
  //   if (this.personal.controls['sameas'].value) {
  //     this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
  //     this.rAreaNames = JSON.parse(sessionStorage.areaNames);
  //     this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
  //     this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
  //     this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
  //     this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
  //     this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
  //     this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
  //   }
  // }

  changeSocialStatus(event:any) {
    if (event.checked==true) {
      this.socialNo = false;
    }else{
      this.personal.controls['socialAnswer1'].setValue('0');
      this.personal.controls['socialAnswer2'].setValue('0');
      this.personal.controls['socialAnswer3'].setValue('0');
      this.personal.controls['socialAnswer4'].setValue('0');
      this.socialNo = '';
    }
  }
  criticalIllness(values: any) {
    if (values.checked) {
      const dialogRef = this.dialog.open(ProposalmessageComponent, {
        width: '500px'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.stopNext = true;
      });
    } else {
      this.stopNext = false;
    }
  }


  resetofgstType() {
    this.personal.controls['personalgstIdType'].patchValue('');
  }
  changeOccupation() {
    this.personal.controls['personalOccupationName'].patchValue(this.occupationList[this.personal.controls['personalOccupation'].value]);
  }
  changeCity() {
    this.personal.controls['personalCityName'].patchValue(this.personalCitys[this.personal.controls['personalCity'].value]);

  }
  changeArea(){
    this.personal.controls['personalAreaName'].patchValue(this.areaNames[this.personal.controls['personalArea'].value]);
  }
  changeresCity(){
    this.personal.controls['residenceCityName'].patchValue(this.residenceCitys[this.personal.controls['residenceCity'].value]);
  }
  changeresArea(){
    this.personal.controls['residenceAreaName'].patchValue(this.rAreaNames[this.personal.controls['residenceArea'].value]);
  }

}
