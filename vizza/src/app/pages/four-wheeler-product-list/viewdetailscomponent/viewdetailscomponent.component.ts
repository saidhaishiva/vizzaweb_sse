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
import {BikeInsuranceService} from '../../../shared/services/bike-insurance.service';
@Component({
  selector: 'app-viewdetailscomponent',
  templateUrl: './viewdetailscomponent.component.html',
  styleUrls: ['./viewdetailscomponent.component.scss']
})
export class ViewdetailscomponentComponent implements OnInit {
  webhost: any;
  compareDetails: any;
  keyFeatureNames: any;
  id: any;
  productId: any;
  getKeyList: any;
  productDocLists: any;
  bgColor: any;
  value: any;
  id1: any;
  testPath: any;
  selectedClaimDetails: any;
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

  constructor(public dialogRef: MatDialogRef<ViewdetailscomponentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, public validation: ValidationService, public appSettings: AppSettings, public config: ConfigurationService, public common: BikeInsuranceService, public fb: FormBuilder, public toastr: ToastrService) {
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
    if (type == 1) {
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }

  selectedproducs(id: any, type) {
    this.id = id;
    if (type == 1) {
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }

  nameValidate(event: any) {
    this.validation.nameValidate(event);
  }

  // Number validation
  numberValidate(event: any) {
    this.validation.numberValidate(event);
  }

  idValidate(event: any) {
    this.validation.idValidate(event);
  }

  onSelectedIndexChange(index) {
    console.log(index, 'ind');
    if (index == 0) {
      const getIndex = this.getKeyList.findIndex(list => list.type == 1);
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
      this.selectedClaimDetails = 'form1';
      const getIndex = this.getKeyList.findIndex(list => list.type == 2);
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
    this.common.viewKeyFeatureList(data).subscribe(
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
      const getIndex = this.getKeyList.findIndex(list => list.type == 1);
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
}
