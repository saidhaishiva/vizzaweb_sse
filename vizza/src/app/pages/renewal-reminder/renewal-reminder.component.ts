import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {ViewChild} from '@angular/core';
import {ValidationService} from '../../shared/services/validation.service';

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
  selector: 'app-renewal-reminder',
  templateUrl: './renewal-reminder.component.html',
  styleUrls: ['./renewal-reminder.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RenewalReminderComponent implements OnInit {
  public form: FormGroup;
  public setDate: any;
  public selectDate: any;
  public settings: Settings;
  commentBox: boolean;
  testimonialLists: any;
  companyList: any;
  comments: any;
  webhost: any;
  policyTypes: any;
  paymentFrequency: any;
  allImage: any;
  fileDetails: any;
  url: any;
  getUrl: any;
  today: any;
  maxDate: any;
  sdateError: any;
  edateError: any;

  public fileUploadPath: any;
  public uploadTypeTest: boolean;
  public allowedExtensionsPDF: any;
  public allowedExtensionsDOC: any;
  public allowedExtensionsDOCX: any;
  public fileUploadPathPDF: any;
  public fileUploadPathDOC: any;
  public fileUploadPathDOCX: any;
  public filePath: any;
  imageSrc: string;


  @ViewChild('myForm') myForm: NgForm;

  constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe ,public validation: ValidationService, public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public common: CommonService, public dialog: MatDialog) {
    this.form =  this.fb.group({
      'insurename': ['', Validators.compose([Validators.required])],
      'startdate': ['', Validators.compose([Validators.required])],
      'enddate': ['', Validators.compose([Validators.required])],
      'insureemail': ['', Validators.compose([Validators.required,Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'insurepolicytype':  ['', Validators.compose([Validators.required])],
      'insuremobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
      'insurepolicyno': ['', Validators.compose([Validators.required])],
      'insurepremiumamount': ['', Validators.compose([Validators.required])],
      'insurecompanyname': ['',Validators.compose([Validators.required])],
      'paymentfrequeny': ['',Validators.compose([Validators.required])],
    });

    this.settings = this.appSettings.settings;
    this.webhost = this.config.getimgUrl();
    this.settings.HomeSidenavUserBlock = false;
    this.settings.sidenavIsOpened = false;
    this.settings.sidenavIsPinned = false;
    this.commentBox = false;
    this.selectDate = '';
    this.allImage = [];
    let today = new Date();
    this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());


    this.paymentFrequency = [
      {'id': 1, 'name': 'Annually'},
      {'id': 2, 'name': 'Half Yearly'},
      {'id': 3, 'name': 'Quarterly'},
      {'id': 4, 'name': 'Monthly'}
    ];

  }

  ngOnInit() {
    this.getPolicyTypes();
    this.getcompanyList();
    this.uploadTypeTest= true;
    this.uploadTypeTest = true;
    this.filePath = '';
    this.fileUploadPath = '';
    this.fileUploadPathPDF= '';
    this.fileUploadPathDOC= '';
    this.fileUploadPathDOCX= '';
    this.imageSrc = '';

  }


  addEvent(event) {
    this.selectDate = event.value;
    this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
  }
  chooseDate(event, type) {
    this.maxDate = '';
    if (event.value != null) {
      if (typeof event.value._i == 'string') {
        const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if(type == 'sDate'){
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.sdateError = '';
          } else {
            this.sdateError = 'Enter Valid Date';
          }
        }else{
          if (pattern.test(event.value._i) && event.value._i.length == 10) {
            this.edateError = '';
          } else {
              this.edateError = 'Enter Valid Date';
          }
        }

        let selectedDate;
        selectedDate = event.value._i;

        if (selectedDate.length == 10) {
          if (type == 'sDate') {
            this.maxDate = event.value;
          }
        }
      } else if (typeof event.value._i == 'object') {
        this.sdateError = '';
        if (type == 'sDate') {
          this.maxDate = event.value;
        }
      }
    }
  }



  renewal(values){
    if (this.form.valid) {
      let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
      let edate = this.datepipe.transform(this.form.controls['enddate'].value, 'y-MM-dd');
      const data = {
        'platform': 'web',
        'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
        'role_id': this.auth.getPosRoleId() != 0  ? this.auth.getPosRoleId() : '4',
        'insure_name': this.form.controls['insurename'].value,
        'insure_start_date': sdate,
        'insure_end_date': edate,
        'insure_email': this.form.controls['insureemail'].value,
        'insure_policy_type': this.form.controls['insurepolicytype'].value,
        'insure_mobile': this.form.controls['insuremobile'].value,
        'insure_policy_no': this.form.controls['insurepolicyno'].value,
        'insure_premium_amount' : this.form.controls['insurepremiumamount'].value,
        'insure_company_name': this.form.controls['insurecompanyname'].value,
        'insure_payment_frequency': this.form.controls['paymentfrequeny'].value
      };

      this.common.policyRenewalRemainder(data).subscribe(
          (successData) => {
            this.policyRenewalSuccess(successData);
          },
          (error) => {
            this.policyRenewalFailure(error);
          }
      );
    }
  }
  policyRenewalSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.toastr.success(successData.ResponseObject);
      this.form.reset();
      this.myForm.resetForm();
    } else {
      this.toastr.error(successData.ErrorObject);
    }
  }
  policyRenewalFailure(error) {
  }



  getcompanyList() {
    const data = {
      'platform': 'web',
      "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '4',
      "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '0',
      "insure_company_type_id": '2'
    };
    this.common.getcompanyList(data).subscribe(
        (successData) => {
          this.setcompanyListSuccess(successData);
        },
        (error) => {
          this.setcompanyListFailure(error);
        }
    );
  }
  public setcompanyListSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.companyList = successData.ResponseObject;
    }
  }
  public setcompanyListFailure(error) {
  }



  getPolicyTypes() {
    const data = {
      'platform': 'web',
      "user_id": this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
      "role_id": this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4'
    }
    this.common.policyTypes(data).subscribe(
        (successData) => {
          this.getpolicytypeSuccess(successData);
        },
        (error) => {
          this.getpolicytypeFailure(error);
        }
    );
  }
  public getpolicytypeSuccess(successData) {
    if (successData.IsSuccess) {
      this.policyTypes = successData.ResponseObject;
    }
  }

  public getpolicytypeFailure(error) {
  }
  public keyPress(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);

      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

  public data(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[a-zA-Z\\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }



  readUrl(event: any) {
    this.filePath = event.target.files[0].name;
    this.allowedExtensionsPDF = /(\.pdf)$/i;
    this.allowedExtensionsDOC = /(\.doc)$/i;
    this.allowedExtensionsDOCX = /(\.docx)$/i;

    this.getUrl = '';
    let getUrlEdu = [];
    this.fileDetails = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.fileDetails.push({'image': this.fileUploadPath, 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
    }
    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        getUrlEdu.push(this.url.split(','));
        this.onUploadFinished(getUrlEdu);
      };
      reader.readAsDataURL(event.target.files[i]);
    }
    if(this.allowedExtensionsPDF.exec(this.filePath)){
      this.fileUploadPathPDF= 'pdf';
      this.fileUploadPathDOC= '';
      this.fileUploadPathDOCX= '';
      this.imageSrc = '';
    }else if(this.allowedExtensionsDOC.exec(this.filePath)){
      this.fileUploadPathDOC= 'doc';
      this.fileUploadPathPDF= '';
      this.fileUploadPathDOCX= '';
      this.imageSrc = '';
    }else if(this.allowedExtensionsDOCX.exec(this.filePath)){
      this.fileUploadPathDOCX= 'docx';
      this.fileUploadPathPDF= '';
      this.fileUploadPathDOC= '';
      this.imageSrc = '';
    }else {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result as string;

        reader.readAsDataURL(file);
        this.fileUploadPathPDF= '';
        this.fileUploadPathDOC= '';
        this.fileUploadPathDOCX= '';
      }
    }
  }
  onUploadFinished(event) {
    this.allImage.push(event);
  }
  onUpload() {
    console.log(this.allImage.length,'this.allImage.length');
    const data = {
      'platform': 'web',
      'image_path': '',
      'file_type': '1'
    };
    let length = this.allImage.length-1;
    for (let k = 0; k < this.allImage[length].length; k++) {
      this.fileDetails[k].image = this.allImage[length][k][1];
    }
    data.image_path = this.fileDetails;
    this.common.fileUploadPolicyHome(data).subscribe(
        (successData) => {
          this.fileUploadSuccess(successData);
        },
        (error) => {
          this.fileUploadFailure(error);
        }
    );
  }
  public fileUploadSuccess(successData) {
    if (successData.IsSuccess) {
      this.uploadTypeTest = true;
      this.toastr.success( successData.ResponseObject.message);
    } else {
      this.toastr.error(successData.ErrorObject, 'Failed');
    }
  }
  public fileUploadFailure(error) {
  }
  renewalReminderUpload(){
    if(this.filePath == '' ){
      this.uploadTypeTest= false;
    }else{
      this.onUpload();
      this.uploadTypeTest = true;
      this.imageSrc = '';
      this.fileUploadPathPDF= '';
      this.fileUploadPathDOC= '';
      this.fileUploadPathDOCX= '';
      this.filePath= '';
    }
  }

  //
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }

}
