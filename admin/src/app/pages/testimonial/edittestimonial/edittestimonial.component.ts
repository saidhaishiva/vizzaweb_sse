import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';
import {BranchService} from '../../../shared/services/branch.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfigurationService } from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-edittestimonial',
  templateUrl: './edittestimonial.component.html',
  styleUrls: ['./edittestimonial.component.scss']
})
export class EdittestimonialComponent implements OnInit {
  public form: FormGroup;
  public response: any;
  public status: any;
  public settings: Settings;
  public profile: any;
  public responsedata: any;
  loadingIndicator: boolean = true;
  public fileUploadPath: any;
  getDetails: any;
  webhost: any;
  type: any;
  size: any;
  getUrl1: any;
  url: any;
  getUrl: any;

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<EdittestimonialComponent>, public auth: AuthService, public branchservice: BranchService, private toastr: ToastrService, public appSettings: AppSettings,
              @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService  ) {
    this.getDetails = data;
    console.log(this.getDetails);
    this.webhost = this.config.getimgUrl();
    this.profile = this.getDetails.profile_pic;

    this.form = this.fb.group({
      'comments': ['', Validators.compose([Validators.required])],
      'name': ['', Validators.compose([Validators.required])],
      'designation': ['', Validators.compose([Validators.required])],
      'company': ['', Validators.compose([Validators.required])],
    });
    this.dialogRef.disableClose = true;

  }

  ngOnInit() {
    this.form.controls['comments'].setValue(this.getDetails.comments);
    this.form.controls['name'].setValue(this.getDetails.customer_name);
    this.form.controls['designation'].setValue(this.getDetails.designation);
    this.form.controls['company'].setValue(this.getDetails.company_name);
  }

  close(): void {
    this.dialogRef.close();
  }

  edit() {
    if (this.form.valid) {
      const data = {
        'platform': 'web',
        'role_id': '1',
        'testemonial_id': this.getDetails.id,
        'customer_name': this.form.controls['name'].value,
        'designation': this.form.controls['designation'].value,
        'company_name': this.form.controls['company'].value,
        'profile_pic': this.getDetails.profile_pic,
        'comments': this.form.controls['comments'].value,
        'testemonial_status': this.getDetails.status,
      };
      console.log(data,'editdata');
      this.loadingIndicator = true;
      this.branchservice.editTestimonial(data).subscribe(
          (successData) => {
            this.editPosSuccess(successData);
          },
          (error) => {
            this.editPosFailure(error);
          }
      );
    }
  }

  public editPosSuccess(success) {
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.toastr.success(success.ResponseObject);
      this.dialogRef.close(success.IsSuccess);
    } else {
      this.toastr.error(success.ErrorObject);

    }
  }

  public editPosFailure(error) {
    this.settings.loadingSpinner = false;
    if (error.status === 401) {
      this.status = error.status;
    }

  }

  readUrl(event: any, type) {
    this.type = type;
    this.size = event.srcElement.files[0].size;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.getUrl1 = [];
        this.url = event.target.result;
        this.getUrl = this.url.split(',');
        this.getUrl1.push(this.url.split(','));
        this.onUploadFinished(this.getUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  onUploadFinished(event) {
    this.getUrl = event[1];
    const data = {
      'platform': 'web',
      'uploadtype': 'single',
      'images': this.getUrl,
    };
    console.log(data, 'dfdfdsfdsfdsfds');
    this.branchservice.fileUpload(data).subscribe(
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
      if (this.type == 'profile') {
        this.profile = this.fileUploadPath;

      }
    } else {
      this.toastr.error(successData.ErrorObject, 'Failed');
    }
  }

  public fileUploadFailure(error) {
    console.log(error);
  }

  public keyPress(event: any) {
    if (event.charCode !== 0) {
      const pattern =/[0-9 ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }
  public onChar(event: any) {
    if (event.charCode !== 0) {
      const pattern = /[a-zA-Z]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }

}
