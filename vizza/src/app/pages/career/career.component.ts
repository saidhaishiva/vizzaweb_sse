import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {CommonService} from '../../shared/services/common.service';
import {ValidationService} from '../../shared/services/validation.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
form: FormGroup;
webhost: any;
    size: any;
    settings: any;
    getUrl1: any;
    url: any;
    getUrl: any;
    fileUploadPath: any;
  constructor(public fb: FormBuilder, public config: ConfigurationService,public validation: ValidationService,  public appSettings: AppSettings, public common: CommonService) {
      this.webhost = this.config.getimgUrl();
      this.settings = this.appSettings.settings;
    this.form = this.fb.group({
        'name': ['', Validators.required],
        'mobileno':  ['', Validators.required],
        'email':  ['', Validators.required],
        'upload': '',
        'profile':'',
        'cover':''
    });
  }

  ngOnInit() {
  }
update() {
    const data = {
        'platform': 'web',
        'applied_type': '1',
        'applicant_name': this.form.controls['name'].value,
        'applicant_email': this.form.controls['email'].value,
        'applicant_resume':this.form.controls['upload'].value,
    };
    this.settings.loadingSpinner = true;
    this.common.careerupdate(data).subscribe(
        (successData) => {
            this.updateSuccess(successData);
        },
        (error) => {
            this.updateFailure(error);
        }
    );
}
    updateSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            alert();
        } else {
            // this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    updateFailure(error) {
        this.settings.loadingSpinner = false;
    }
// upload file
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
            'flag': 'careers'
        };
        this.common.fileUploadCareer(data).subscribe(
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
            console.log( this.fileUploadPath,' this.fileUploadPath');


        } else {
            // this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
    }
    // onsubmit() {
    //     const data = {
    //         'platform': 'web',
    //         'applied_type': '0',
    //         'applicant_name': this.form.controls['name'].value,
    //         'applicant_email': this.form.controls['email'].value,
    //         'applicant_resume': "uploads/careers/raj.txt",
    //         'father_name': this.form.controls['fathername'].value,
    //         'mobile_no': this.form.controls['mobileno'].value,
    //         'address': this.form.controls['address'].value,
    //         'dob': this.form.controls['dob'].value,
    //         'age':  this.form.controls['age'].value,
    //         'gender':  this.form.controls['gender'].value,
    //         'education_hsc_details':  this.form.controls['educationhsc'].value,
    //         'education_ug_details':  this.form.controls['educationug'].value,
    //         'education_pg_details':  this.form.controls['educationpg'].value,
    //         'experience1':  this.form.controls['experience1'].value,
    //         'experience2': '',
    //         'experience3': '',
    //         'applicant_skills':  this.form.controls['applicantskills'].value,
    //     };
    //     this.settings.loadingSpinner = true;
    //     this.common.careerupdate(data).subscribe(
    //         (successData) => {
    //             this.updatedSuccess(successData);
    //         },
    //         (error) => {
    //             this.updatedFailure(error);
    //         }
    //     );
    // }
    // updatedSuccess(successData) {
    //     this.settings.loadingSpinner = false;
    //     if (successData.IsSuccess) {
    //     } else {
    //         // this.toastr.error(successData.ErrorObject, 'Failed');
    //     }
    // }
    //
    // updatedFailure(error) {
    //     this.settings.loadingSpinner = false;
    // }

    // validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }
    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }
}

