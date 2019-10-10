import {Component, OnInit, ViewChild} from '@angular/core';
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
    today: any;
    maxDate: any;
    companyList : any;

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
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.commentBox = false;
        this.selectDate = '';
        this.allImage = [];
    }

    ngOnInit() {
        this.getPolicyTypes();
        this.getcompanyList();
        this.uploadTypeTest = true;
        this.filePath = '';
        this.imageSrc = '';
        this.fileUploadPath = '';
        this.fileUploadPathPDF= '';
        this.fileUploadPathDOC= '';
        this.fileUploadPathDOCX= '';
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
    renewExixtingPolicy(values){
            const data = {
                'platform': 'web',
                'user_id': this.auth.getPosUserId() != null  ? this.auth.getPosUserId() : '0',
                'role_id': this.auth.getPosRoleId() != 0  ? this.auth.getPosRoleId() : '4',
                'proposal_name': this.form.controls['Proposername'].value,
                'company_name': this.form.controls['insurecompanyname'].value,
                'policy_type': this.form.controls['insurepolicytype'].value,
                'mobile': this.form.controls['Proposermobile'].value,
                'policy_number': this.form.controls['insurepolicyno'].value,
                'premium_amount' : this.form.controls['insurepremiumamount'].value
            };
            this.common.policyRenewExixting(data).subscribe(
                (successData) => {
                    this.policyRenewalSuccess(successData);
                },
                (error) => {
                    this.policyRenewalFailure(error);
                }
            );
        }
    policyRenewalSuccess(successData) {
        if (successData. IsSuccess== true) {
            this.toastr.success(successData.ResponseObject);
            this.form.reset();
            this.myForm.resetForm();
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    policyRenewalFailure(error) {
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
        const data = {
            'platform': 'web',
            'image_path': '',
            'file_type': '2'
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
    renewExixtingPolicyUpload(){
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
}

