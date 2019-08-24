import {Component, Inject, OnInit} from '@angular/core';
import {Settings} from '../../../app.settings.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {ValidationService} from '../../../shared/services/validation.service';
import {AppSettings} from '../../../app.settings';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {HealthService} from '../../../shared/services/health.service';
import {ToastrService} from 'ngx-toastr';
import {TermLifeCommonService} from '../../../shared/services/term-life-common.service';

@Component({
  selector: 'app-term-view-keyfeatures',
  templateUrl: './term-view-keyfeatures.component.html',
  styleUrls: ['./term-view-keyfeatures.component.scss']
})
export class TermViewKeyfeaturesComponent implements OnInit {
  webhost: any;
  compareDetails: any;
  keyFeatureNames: any;
  id : any;
  productId : any;
  getKeyList : any;
  productDocLists : any;
  bgColor : any;
  value : any;
  id1 : any;
  testPath : any;
  selectedClaimDetails : any;
  public settings: Settings;

  public form: FormGroup;
  data1: any;
  size: any;
  getUrl1: any;
  getUrl: any;
  url: any;
  fileUploadPath: any;
  productName: any;
  productLogo: any;
  sumInsuredAmount: any;
  step: any;
  scheme: any;

  constructor(public dialogRef: MatDialogRef<TermViewKeyfeaturesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, public validation: ValidationService,public appSettings: AppSettings, public config: ConfigurationService, public common: TermLifeCommonService, public fb: FormBuilder, public toastr: ToastrService) {
    console.log(data, 'data');
    this.productId = data.productId;
    console.log(this.productId, 'this.productId');
    this.productName = data.productName;
    this.productLogo = data.productLogo;
    this.webhost = this.config.getimgUrl();
    this.testPath = '/uploads/religare1120002190099_1539679118.pdf';
    // this.id = 0;
    // this.value = '<p>List</p><ul><li>Test 1</li><li>Test 2</li><li>Test 3</li><li>Test 4</li></ul>';
    this.settings = this.appSettings.settings;

    this.fileUploadPath = '';

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      'subject': ['', Validators.compose([Validators.required])],
      'message': ['', Validators.compose([Validators.required])],
      'profile': ['',Validators.compose( [Validators.required])]

    });
  }

  ngOnInit() {
    let maxAge = '';
    if (sessionStorage.setAllProductLists != undefined && sessionStorage.setAllProductLists != '') {
      let setAllProductLists = JSON.parse(sessionStorage.setAllProductLists);
      this.sumInsuredAmount = setAllProductLists[0].suminsured_amount;
    }
    // if (sessionStorage.allPolicyDetails != undefined && sessionStorage.allPolicyDetails != '') {
    //   let allPolicyDetails = JSON.parse(sessionStorage.allPolicyDetails);
    //   let ages = [];
    //   for (let i = 0; i < allPolicyDetails.length; i++) {
    //     for (let j = 0; j < allPolicyDetails[i].family_members.length; j++) {
    //       ages.push(allPolicyDetails[i].family_members[j].age);
    //     }
    //   }
    //   maxAge = Math.max.apply(null, ages);
    // }
    this.viewKeyFeatures();
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  addClass(id: any, type) {
    this.id = id;
    if (type == 1){
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }
  selectedproducs(id: any, type) {
    this.id = id;
    if (type == 1){
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }
  nameValidate(event: any){
    this.validation.nameValidate(event);
  }

  // Number validation
  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  idValidate(event: any){
    this.validation.idValidate(event);
  }
  onSelectedIndexChange(index) {
    console.log(index, 'ind');
    if (index == 0) {
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
    } else if (index == 1) {
      // for (let i = 0; i < this.getKeyList.length; i++) {
      //     if(this.getKeyList[i].kf_type == 2) {
      //         this.id = this.getKeyList[i];
      //     }
      // }
      // const getIndex = this.getKeyList.findIndex( list => list.type == 2);
      // this.id = getIndex;
      this.id1 = 0;
    } else if (index == 2) {
      this.selectedClaimDetails = 'form2';
      const getIndex = this.getKeyList.findIndex( list => list.type == 2);
      this.id = getIndex;
    }

  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }

  viewKeyFeatures() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'.toString(),
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'.toString(),
      'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0'.toString(),
      "product_id": this.productId.toString()
    };
    this.settings.loadingSpinner = true;
    this.common.termviewKeyFeatureList(data).subscribe(
        (successData) => {
          this.viewKeySuccess(successData);
        },
        (error) => {
          this.viewKeyFailure(error);
        }
    );
  }
  public viewKeySuccess(successData) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      this.getKeyList = successData.ResponseObject.key_features;
      this.productDocLists = successData.ResponseObject.product_docs;
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
      this.bgColor = 'true';
    }
  }
  public viewKeyFailure(error) {
    this.settings.loadingSpinner = false;
  }
  selectClaim(value) {
    this.selectedClaimDetails = value;
  }

  readUrl(event: any) {
    this.size = event.srcElement.files[0].size;
    console.log(this.size);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.getUrl1 = [];
        this.url = event.target.result;
        this.getUrl = this.url.split(',');
        this.getUrl1.push(this.url.split(','));
        this.onUploadFinished(this.getUrl);

      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onUploadFinished(event) {
    this.getUrl = event[1];
    const data1 = {
      'platform': 'web',
      'flag':'healthInsurance',
      'uploadtype': 'single',
      'images': this.getUrl,
    };
    console.log(data1, 'dfdfdsfdsfdsfds');
    this.common.fileUpload(data1).subscribe(
        (successData) => {
          this.fileUploadSuccess(successData);
        },
        (error) => {
          this.fileUploadFailure(error);
        }
    );
  }
  public fileUploadSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.fileUploadPath = successData.ResponseObject.imagePath;


    } else {
      this.toastr.error(successData.ErrorObject, 'Failed');
    }
  }
  public fileUploadFailure(error) {
    console.log(error);
  }
  // public contactDetails(): void {
  //   if (this.form.valid) {
  //     const data = {
  //       'name': this.form.controls['name'].value,
  //       'email': this.form.controls['email'].value,
  //       'subject': this.form.controls['subject'].value,
  //       'message': this.form.controls['message'].value,
  //       'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
  //       'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
  //       'platform': 'web',
  //       'uploaded_doc': this.fileUploadPath
  //     };
  //     this.common.contactDetails(data).subscribe(
  //         (successData) => {
  //           this.getDetailsSuccess(successData);
  //         },
  //         (error) => {
  //           this.getDetailsFailure(error);
  //         }
  //     );
  //   }
  // }
  // public getDetailsSuccess(successData) {
  //   this.settings.loadingSpinner = false;
  //   if (successData.IsSuccess == true) {
  //     this.dialogRef.close()
  //     this.toastr.success('Health Claim is created successfully!!');
  //
  //     this.data1 = successData.ResponseObject;
  //   } else {
  //     this.toastr.error(successData.ErrorObject);
  //   }
  // }
  //
  // // handle error data
  //
  // public getDetailsFailure(error) {
  //   this.settings.loadingSpinner = false;
  // }
}
