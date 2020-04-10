import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {AuthService} from '../../shared/services/auth.service';
import {WINDOW} from '@ng-toolkit/universal';
import {ValidationService} from '../../shared/services/validation.service';
import {ToastrService} from 'ngx-toastr';
import {ProposalmessageComponent} from '../star-health-proposal/proposalmessage/proposalmessage.component';
import {MatStepper} from '@angular/material';

@Component({
  selector: 'app-star-covid-proposal',
  templateUrl: './star-covid-proposal.component.html',
  styleUrls: ['./star-covid-proposal.component.scss']
})
export class StarCovidProposalComponent implements OnInit {
  public personal: FormGroup;
  public isLinear = false;
  public stepperindex: any;
  public currentStep: any;
  public today: any;
  public dobError: any;
  public datepipe: any;
  public personalAge: any;
  public gstListType: any;
  public previousinsurance: any;
  public residenceCitys: any;
  public rAreaNames: any;
  public areaNames: any;
  public response: any;
  public personalCitys: any;
  public cityList: any;
  public rCitysList: any;
  public inputReadonly: any;
  public socialNo: any;
  public stopNext: boolean;
  public personalData: boolean;
  public step: any;


  constructor( @Inject(WINDOW) private window: Window, public fb: FormBuilder, public healthService: HealthService, public common: HealthService,private toastr: ToastrService, public router: Router, public route: ActivatedRoute, public validation: ValidationService , public auth: AuthService,) {
    this.stepperindex = 0;
    this.route.params.forEach((params) => {
      if (params.stepper == true || params.stepper == 'true') {
        this.stepperindex = 3;
        if (sessionStorage.summaryData != '' && sessionStorage.summaryData != undefined) {

        }
      }
    });

    this.currentStep = this.stepperindex;
    let today  = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.stopNext=false;
    this.step = 0;

    this.personal = this.fb.group({
      personalTitle: ['', Validators.required],
      personalFirstname: ['', Validators.required],
      personalLastname: ['', Validators.required],
      personalDob: ['', Validators.compose([Validators.required])],
      personalEmail: ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
      personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}')])],
      personalPan: ['', Validators.compose([ Validators.minLength(10)])],
      personalgstIdType: '',
      personalGst: ['', Validators.compose([ Validators.minLength(15)])],
      personalAadhar: ['', Validators.compose([ Validators.minLength(4)])],
      eiaNumber: '',
      personalIncome: [''],
      previousinsuranceChecked: '',
      previousinsurance: '',
      personalAddress: ['', Validators.required],
      personalAddress2: ['', Validators.required],
      personalPincode: '',
      personalCity: ['', Validators.required],
      personalCityName: '',
      personalArea: ['', Validators.required],
      personalAreaName: '',
      personalState: ['', Validators.required],
      residenceAddress: '',
      residenceAddress2: '',
      residencePincode:'',
      residenceCity: '',
      residenceCityName: '',
      residenceArea: '',
      residenceAreaName: '',
      residenceState: '',
      socialStatus: '',
      socialAnswer1: '',
      socialAnswer2: '',
      socialAnswer3: '',
      socialAnswer4: '',
      illnessCheck: '',

      sameas: ''
    });

  }

  ngOnInit() {
    this.gstIdList();
    this.previousinsurance = [
      'IFFCO TOKIO GeneralInsurance Co. Ltd.',
      'Liberty GeneralInsurance Co. Ltd.',
      'Shriram GeneralInsurance Co. Ltd.',
      'Reliance GeneralInsurance Co. Ltd',
      'DHFL GeneralInsurance Co. Ltd.',
      'Bajaj Allianz Allianz GeneralInsurance Co. Ltd.',
      'Edelweiss GeneralInsurance Co.Ltd.',
      'Kotak Mahindra GeneralInsurance Co. Ltd.',
      'Go Digit GeneralInsurance Co. Ltd.',
      'Royal Sundaram GeneralInsurance Co. Ltd.',
      'Exports Credit Guarantee of India Co. Ltd',
      'The New India Assurance Co. Ltd.',
      'Tata AIG GeneralInsurance Company Limited',
      'National Insurance Co. Ltd.',
      'Universal Sompo GeneralInsurance Co. Ltd.',
      'Agriculture Insurance Company of India Ltd.',
      'Acko GeneralInsurance Co. Ltd.',
      'SBI GeneralInsurance Co. Ltd.',
      'Bharti AXA GeneralInsurance Co. Ltd.',
      'ICICI LOMBARD GeneralInsurance Co. Ltd.',
      'Magma HDI GeneralInsurance Co. Ltd.',
      'HDFC ERGO GeneralInsurance Co.Ltd.',
      'United India Insurance Co. Ltd.',
      'The Oriental Insurance Co. Ltd.',
      'Future Generali India Insurance Co. Ltd.',
      'Cholamandalam MS GeneralInsurance Co. Ltd.',
      'Raheja QBE GeneralInsurance Co. Ltd.',
      'Star Health & Allied Insurance Co.Ltd.',
      'Apollo Munich Health Insurance Co. Ltd',
      'Religare Health Insurance Co. Ltd',
      'Max Bupa Health Insurance Co. Ltd',
      'CIGNA TTK Health Insurance Co. Ltd.',
      'Aditya Birla Health Insurance Co. Ltd.'
    ];
  }

  // Name validation
  nameValidate(event: any){
    this.validation.nameValidate(event);
  }
  // Dob validation
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }
  // Number validation
  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  idValidate(event: any){
    this.validation.idValidate(event);

  }
  topScroll() {
    document.getElementById('main-content').scrollTop = 0;
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  backAll(){
    this.topScroll();
    this.prevStep();
  }

  // proposer dob
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

  gstIdList() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'

    }
    this.healthService.getGstId(data).subscribe(
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
  resetofgstType() {
    this.personal.controls['personalgstIdType'].patchValue('');
  }

  PreviousInsure(value) {
    if (value.value == 'true') {
      this.personal.controls['previousinsurance'].setValue('');
    } else {
      this.personal.controls['previousinsurance'].setValue('No');
    }
  }

  sameAddress(values: any) {
    if (values.checked) {
      this.inputReadonly = true;
      this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
      this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
      this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
      this.rAreaNames = JSON.parse(sessionStorage.areaNames);

      sessionStorage.residenceCitys = JSON.stringify(this.residenceCitys);
      sessionStorage.rAreaNames = JSON.stringify(this.rAreaNames);

    } else {
      this.inputReadonly = false;
      this.personal.controls['residenceAddress'].setValue('');
      this.personal.controls['residenceAddress2'].setValue('');
      this.personal.controls['residenceCity'].setValue('');
      this.personal.controls['residencePincode'].setValue('');
      this.personal.controls['residenceState'].setValue('');
      this.personal.controls['residenceCity'].setValue('');
      this.personal.controls['residenceArea'].setValue('');
      sessionStorage.residenceCitys = '';
      sessionStorage.rAreaNames = '';
      this.residenceCitys = {};
      this.rAreaNames = {};
      // if (sessionStorage.residenceCitys != '' && sessionStorage.residenceCitys != undefined) {
      //     this.residenceCitys = JSON.parse(sessionStorage.residenceCitys);
      //     this.rAreaNames = JSON.parse(sessionStorage.rAreaNames);
      // } else {
      //     this.residenceCitys = [];
      //     this.rAreaNames = [];
      // }
    }
  }

  typeAddressDeatils() {
    if (this.personal.controls['sameas'].value) {
      this.residenceCitys = JSON.parse(sessionStorage.personalCitys);
      this.rAreaNames = JSON.parse(sessionStorage.areaNames);
      this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
      this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
      this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
      this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
      this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
      this.personal.controls['residenceArea'].setValue(this.personal.controls['personalArea'].value);
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
      this.typeAddressDeatils();
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
      // const dialogRef = this.dialog.open(ProposalmessageComponent, {
      //   width: '500px'
      // });
      // dialogRef.afterClosed().subscribe(result => {
        this.stopNext = true;
      // });
    } else {
      this.stopNext = false;
    }
  }

  personalDetails(stepper: MatStepper, value) {
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper1Details = JSON.stringify(value);
    this.personalData = value;
    console.log(this.personalData,'this.personalData...')
    if (this.personal.valid) {
      if (sessionStorage.proposerAge >= 18 && sessionStorage.proposerAge < 90) {
        if(this.personal.controls['socialStatus'].value == true || this.personal.controls['socialStatus'].value == 'true') {
          if(value.socialAnswer1 == '1' || value.socialAnswer2 == '1' || value.socialAnswer3 =='1' || value.socialAnswer4 == '1'){
            if((this.personal.controls['personalgstIdType'].value == '' && this.personal.controls['personalGst'].value == '') || (this.personal.controls['personalgstIdType'].value != '' && this.personal.controls['personalGst'].value != '')) {
              stepper.next();
              this.topScroll();
              this.nextStep();
              // this.healthStarTrue1 = false;
            } else {
              if(this.personal.controls['personalgstIdType'].value != '' || this.personal.controls['personalGst'].value != ''){
                this.toastr.error('Enter GST Number');
              }
            }
          } else {
            this.toastr.error('Select any one Social Status');
          }
        } else {
          stepper.next();
          this.topScroll()
          this.nextStep();
        }
      } else {
        this.toastr.error('Proposer age should be greater than 18 and less than 90');
      }
    }
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
