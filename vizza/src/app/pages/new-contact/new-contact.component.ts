import {Component, OnInit} from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AuthService} from '../../shared/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService} from '../../shared/services/common.service';
import { AppSettings} from '../../app.settings';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  public form: FormGroup;
  public settings: Settings;
  data: any;
  size: any;
  getUrl1: any;
  getUrl: any;
  url: any;
  fileUploadPath: any;
  constructor(public fb: FormBuilder, public commonService: CommonService, public auth: AuthService, public toastr: ToastrService, public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    this.fileUploadPath = '';

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required])],
      'subject': ['', Validators.compose([Validators.required])],
      'message': ['', Validators.compose([Validators.required])],
      'profile': ['',Validators.compose( [Validators.required])]

    });
  }

  ngOnInit() {
  }
  readUrl(event: any) {
    this.size = event.srcElement.files[0].size;
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
    const data = {
      'platform': 'web',
      'uploadtype': 'single',
      'images': this.getUrl,
    };
    this.commonService.fileUpload(data).subscribe(
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
      this.commonService.contactDetails(data).subscribe(
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
      this.data = successData.ResponseObject;
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
