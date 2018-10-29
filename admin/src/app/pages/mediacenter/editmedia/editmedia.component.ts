import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BranchService} from '../../../shared/services/branch.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
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
  selector: 'app-editmedia',
  templateUrl: './editmedia.component.html',
  styleUrls: ['./editmedia.component.scss'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class EditmediaComponent implements OnInit {
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
    fileUploadPath: any;
    getDetails: any;
    mediaid: any;
    refDateError: any;
    postDateError: any;
    editList: any;
    editcenter: any;
  constructor(public config: ConfigurationService, public common:CommonService, public auth: AuthService, public fb: FormBuilder, public branchservice: BranchService,public datepipe: DatePipe, private toastr: ToastrService,public router: Router,public route: ActivatedRoute,
  ) {
    //   this.fileUploadPath = this.getDetails.image_path;
      this.route.params.forEach((params: Params) => {
          this.mediaid = params.id;
      });
      console.log( this.mediaid , ' this.mediaid ');
    this.webhost = this.config.getimgUrl();
    //   this.mediaimage = '';
      this.form =  this.fb.group({
          'referenceby': ['', Validators.required],
          'referencedate': ['', Validators.required],
          'postdays': ['', Validators.required],
          'postdate':  ['', Validators.compose([Validators.required])],
          'content':  ['', Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
      this.update();
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


        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }

    public fileUploadFailure(error) {
        console.log(error);
    }
    edit(row) {
        let rdate = this.datepipe.transform(this.form.controls['referencedate'].value, 'y-MM-dd');
        let pdate = this.datepipe.transform(this.form.controls['postdate'].value, 'y-MM-dd');
  console.log(row, 'kkk');
        const data ={
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'content': this.form.controls['content'].value,
            'refrence_date':rdate,
            'refrence_by': this.form.controls['referenceby'].value,
            'publish_date': pdate,
            'post_days': this.form.controls['postdays'].value,
            'id': this.mediaid

        }
        console.log(data);
        this.branchservice.editCenter(data).subscribe(
            (successData) => {
                this.editCenterSuccess(successData);
            },
            (error) => {
                this.editCenterFailure(error);
            }
        );
    }
    public editCenterSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            // this.dialogRef.close(true);
            this.editList = successData.ResponseObject;
        }
        // console.log(this.editList, 'this.editList');
    }
    public editCenterFailure(error) {
        console.log(error);
    }
    chooseDate(event, type) {
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

    update() {
        let rdate = this.datepipe.transform(this.form.controls['referencedate'].value, 'y-MM-dd');
        let pdate = this.datepipe.transform(this.form.controls['postdate'].value, 'y-MM-dd');
        const data ={
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'mediaid': this.mediaid

        }
        console.log(data, 'fghjk');
        this.branchservice.updateCenter(data).subscribe(
            (successData) => {
                this.updateSuccess(successData);
            },
            (error) => {
                this.updateFailure(error);
            }
        );
    }
    public updateSuccess(successData) {
        if (successData.IsSuccess) {
           this.editcenter = successData.ResponseObject[0];
                this.form.controls['referenceby'].setValue(this.editcenter.refrence_by);
                this.form.controls['referencedate'].setValue(this.editcenter.refrence_date);
                this.form.controls['postdays'].setValue(this.editcenter.post_days);
                 this.form.controls['postdate'].setValue(this.editcenter.publish_date);
                  this.form.controls['content'].setValue(this.editcenter.content);
        }
        console.log( this.editcenter, ' this.editcenter');
    }
    public updateFailure(error) {
        console.log(error);
    }
}
