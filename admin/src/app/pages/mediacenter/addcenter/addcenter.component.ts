import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../../shared/services/configuration.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
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
  selector: 'app-addcenter',
  templateUrl: './addcenter.component.html',
  styleUrls: ['./addcenter.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    ]
})
export class AddcenterComponent implements OnInit {
    public form : FormGroup;
    webhost: any;
    getUrl: any;
    image: any;
    getUrl1: any;
    size: number;
    url: string;
    selectedtab: number;
    type: any;
    fileDetails: any;
    mediaimage: any;
    refDateError: any;
    postDateError: any;
    fileUploadPath: any;
    today: any;
  constructor(public config: ConfigurationService, public auth: AuthService, public fb: FormBuilder,public common: CommonService,private toastr: ToastrService, public datepipe: DatePipe, public router: Router) {
      this.webhost = this.config.getimgUrl();
      this.mediaimage = '';
      this.today = new Date();

      this.form =  this.fb.group({
          'referenceby': ['', Validators.required],
          'referencedate': ['', Validators.required],
          'postdays': ['', Validators.required],
          'postdate':  ['', Validators.compose([Validators.required])],
          'content':  ['', Validators.compose([Validators.required])]
      });
  }


  ngOnInit() {
  }
    readUrl(event: any, type) {
        this.type = type;
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
        const data = {
            'platform': 'web',
            'uploadtype': 'single',
            'images': this.getUrl,
        };
        console.log(data, 'dfdfdsfdsfdsfds');
        this.common.fileUpload(data).subscribe(
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
            this.mediaimage = this.fileUploadPath;
            console.log( this.mediaimage, ' this.mediaimage');

            if (this.type == 'mediaimage') {
                this.mediaimage = this.fileUploadPath;

            }
        } else {
            // this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
        console.log(error);
    }
    add(val) {
        let rdate = this.datepipe.transform(this.form.controls['referencedate'].value, 'y-MM-dd');
        let pdate = this.datepipe.transform(this.form.controls['postdate'].value, 'y-MM-dd');

        const data ={
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'content': this.form.controls['content'].value,
            'refrence_date':rdate,
            'refrence_by': this.form.controls['referenceby'].value,
            'publish_date': pdate,
            'post_days': this.form.controls['postdays'].value
        }
        console.log(data);
        this.common.addCenter(data).subscribe(
            (successData) => {
                this.addCenterSuccess(successData);
            },
            (error) => {
                this.addCenterFailure(error);
            }
        );
    }
    public addCenterSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.router.navigate(['/mediacenter']);
        }
    }
    public addCenterFailure(error) {
        console.log(error);
    }
    chooseDate(event, type) {
        console.log(event, 'event');
        // this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (type == 'refDate') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.refDateError = '';
                    } else {
                        this.refDateError = 'Enter Valid Date';
                    }
                    let selectedDate;
                    selectedDate = event.value._i;
                } else {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.postDateError = '';
                    } else {
                        this.postDateError = 'Enter Valid Date';
                    }
                    let selectedDate;
                    selectedDate = event.value._i;
                }

            } else if (typeof event.value._i == 'object') {
                if (type == 'postDate') {
                    this.refDateError = '';
                } else {
                    this.postDateError = '';

                }
            }
        }
    }
    public dobkeyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9/\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
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


}
