import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-renew-existing-policy',
  templateUrl: './renew-existing-policy.component.html',
  styleUrls: ['./renew-existing-policy.component.scss']
})
export class RenewExistingPolicyComponent implements OnInit {
    public form: FormGroup;
    public setDate: any;
    public selectDate: any;
    public settings: Settings;
    commentBox: boolean;
    comments: any;
    webhost: any;
    policyTypes: any;
    allImage: any;
    fileDetails: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    today: any;
    maxDate: any;
    companyList : any;
    constructor(public auth: AuthService, public fb: FormBuilder, public datepipe: DatePipe , public appSettings: AppSettings, public toastr: ToastrService, public config: ConfigurationService, public common: CommonService, public dialog: MatDialog) {
        this.form =  this.fb.group({
            'Proposername': ['', Validators.compose([Validators.required])],
            'insurepolicytype':  ['', Validators.compose([Validators.required])],
            'Proposermobile': ['', Validators.compose([Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.minLength(10)])],
            'insurepolicyno': ['', Validators.compose([Validators.required])],
            'insurepremiumamount': ['', Validators.compose([Validators.required])],
            'insurecompanyname': ['',Validators.compose([Validators.required])],
        });

        this.settings = this.appSettings.settings;
        this.webhost = this.config.getimgUrl();
        this.settings.HomeSidenavUserBlock = true;
        this.settings.sidenavIsOpened = true;
        this.settings.sidenavIsPinned = true;
        this.commentBox = false;
        this.selectDate = '';
        this.fileUploadPath = '';
        this.allImage = [];
    }

    ngOnInit() {
        this.getPolicyTypes();
        this.getcompanyList();
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
    // renewal(values){
    //     if (this.form.valid) {
    //         let sdate = this.datepipe.transform(this.form.controls['startdate'].value, 'y-MM-dd');
    //         let edate = this.datepipe.transform(this.form.controls['enddate'].value, 'y-MM-dd');
    //         const data = {
    //             'platform': 'web',
    //             'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
    //             'role_id': this.auth.getPosRoleId() != null  ? this.auth.getPosRoleId() : '4',
    //             'insure_name': this.form.controls['insurename'].value,
    //             'insure_start_date': sdate,
    //             'insure_end_date': edate,
    //             'insure_email': this.form.controls['insureemail'].value,
    //             'insure_policy_type': this.form.controls['insurepolicytype'].value,
    //             'insure_mobile': this.form.controls['insuremobile'].value,
    //             'insure_policy_no': this.form.controls['insurepolicyno'].value,
    //             'insure_premium_amount' : this.form.controls['insurepremiumamount'].value,
    //             'insure_company_name': this.form.controls['insurecompanyname'].value,
    //             'insure_payment_frequency': this.form.controls['paymentfrequeny'].value
    //         };
    //
    //         this.common.policyRenewal(data).subscribe(
    //             (successData) => {
    //                 this.policyRenewalSuccess(successData);
    //             },
    //             (error) => {
    //                 this.policyRenewalFailure(error);
    //             }
    //         );
    //     }
    // }
    // policyRenewalSuccess(successData) {
    //     if (successData.IsSuccess) {
    //         this.toastr.success(successData.ResponseObject);
    //         this.form =  this.fb.group({
    //             'insurename': '',
    //             'startdate': '',
    //             'enddate': '',
    //             'insureemail': '',
    //             'insurepolicytype':  '',
    //             'insuremobile': '',
    //             'insurepolicyno': '',
    //             'insurepremiumamount': '',
    //             'insurecompanyname': '',
    //             'paymentfrequeny': ''
    //         });
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    // policyRenewalFailure(error) {
    // }
    readUrl(event: any) {
        this.getUrl = '';
        let getUrlEdu = [];
        this.fileDetails = [];
        for (let i = 0; i < event.target.files.length; i++) {
            this.fileDetails.push({'image': '', 'size': event.target.files[i].size, 'type': event.target.files[i].type, 'name': event.target.files[i].name});
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

    }
    onUploadFinished(event) {
        this.allImage.push(event);
    }
    onUpload() {
        const data = {
            'platform': 'web',
            'image_path': ''
        };
        let length = this.allImage.length-1;
        for (let k = 0; k < this.allImage[length].length; k++) {
            this.fileDetails[k].image = this.allImage[length][k][1];
        }
        data.image_path = this.fileDetails;
        this.common.fileUploadPolicy(data).subscribe(
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
            this.fileUploadPath = successData.ResponseObject.imagePath;
            this.toastr.success( successData.ResponseObject.message);
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
        }
    }
    public fileUploadFailure(error) {
    }
}

