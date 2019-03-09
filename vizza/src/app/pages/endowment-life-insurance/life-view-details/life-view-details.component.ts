import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../shared/services/auth.service';
import {LifeService} from '../../../shared/services/life.service';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HealthService} from '../../../shared/services/health.service';

@Component({
  selector: 'app-life-view-details',
  templateUrl: './life-view-details.component.html',
  styleUrls: ['./life-view-details.component.scss']
})
export class LifeViewDetailsComponent implements OnInit {
  public getKeyList : any;
  public id : any;
  public productDocLists : any;
  public bgColor : any;
  public productId : any;
  public id1 : any;
  public selectedClaimDetails : any;
  public settings: Settings;
  public webhost: any;
  public testPath : any;

  public form: FormGroup;
  public data1: any;
  public size: any;
  public getUrl1: any;
  public getUrl: any;
  public url: any;
  public fileUploadPath: any;


  constructor( public dialogRef : MatDialogRef<LifeViewDetailsComponent>,
      @Inject(MAT_DIALOG_DATA)public data: any, public toastr : ToastrService, public auth : AuthService,public life:LifeService,public appSettings: AppSettings,public config: ConfigurationService, public fb: FormBuilder) {
    this.settings = this.appSettings.settings;
    this.productId = data.productId;
    this.webhost = this.config.getimgUrl();
    this.testPath = '/uploads/religare1120002190099_1539679118.pdf';
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
    this.viewKeyFeatures(this.productId);
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
  onSelectedIndexChange(index) {
    console.log(index, 'ind');
    if (index == 0) {
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
    }else if (index == 1) {
      this.id1 = 0;
    } else if (index == 2) {
      this.selectedClaimDetails = 'form1';
      const getIndex = this.getKeyList.findIndex( list => list.type == 2);
      this.id = getIndex;
    }
  }

  viewKeyFeatures(value) {
    console.log(this.productId,'valuevalue');
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': value

    };
    this.settings.loadingSpinner = true;
    this.life.getKeyFeatureDetails(data).subscribe(
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
      console.log(successData.ResponseObject,'successData.ResponseObject');
      this.getKeyList = successData.ResponseObject.key_features;
      console.log(this.getKeyList,'this.getKeyList');
      this.productDocLists = successData.ResponseObject.productDocument;
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
      this.bgColor = 'true';
    }
    console.log(this.getKeyList, 'getKeyListgetKeyList');
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
      'uploadtype': 'single',
      'images': this.getUrl,
    };
    console.log(data1, 'dfdfdsfdsfdsfds');
    this.life.fileUpload(data1).subscribe(
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
  public contactDetails(): void {
    if (this.form.valid) {
      const data = {
        'name': this.form.controls['name'].value,
        'email': this.form.controls['email'].value,
        'subject': this.form.controls['subject'].value,
        'message': this.form.controls['message'].value,
        'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
        'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
        'platform': 'web',
        'uploaded_doc': this.fileUploadPath
      };
      this.life.contactDetails(data).subscribe(
          (successData) => {
            this.getDetailsSuccess(successData);
          },
          (error) => {
            this.getDetailsFailure(error);
          }
      );
    }
  }
  public getDetailsSuccess(successData) {
    this.settings.loadingSpinner = false;
    if (successData.IsSuccess) {
      console.log(successData.ResponseObject, 'successData.ResponseObject');
      this.data1 = successData.ResponseObject;
    } else {
      this.toastr.success('Contact details added successfully');
    }
  }

  // handle error data

  public getDetailsFailure(error) {
    console.log(error);
    this.settings.loadingSpinner = false;
  }

}
