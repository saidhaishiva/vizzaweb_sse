import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {CommonService} from '../../shared/services/common.service';
import {ValidationService} from '../../shared/services/validation.service';
import {split} from 'ts-node/dist';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ViewChild} from '@angular/core';

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
    job: any;
    uploadAddressProofName: any;
    getBase64: any;
   uploadType: any;
   uploadTypeTest: any;
    // imageSrc: string;

    public allowedExtensionsPDF: any;
    public allowedExtensionsDOC: any;
    public allowedExtensionsDOCX: any;
    public fileUploadPathPDF: any;
    public fileUploadPathDOC: any;
    public fileUploadPathDOCX: any;
    public filePath: any;

    @ViewChild('myForm') myForm: NgForm;

  constructor(public fb: FormBuilder, public config: ConfigurationService,public validation: ValidationService,  private toastr: ToastrService, public appSettings: AppSettings, public common: CommonService, public router: Router) {
      this.webhost = this.config.getimgUrl();
      this.settings = this.appSettings.settings;
    this.form = this.fb.group({
        'name': ['', Validators.required],
        'mobileno':  ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
        'email':  ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
        'profile':'',
        'cover':''
    });
  }

  ngOnInit() {
      this.jobProfile();
      this.uploadTypeTest= true;
      // this.imageSrc = '';
      this.uploadType = '';
      this.getBase64 = '';
      this.uploadAddressProofName = '';
      this.fileUploadPathPDF= '';
      this.fileUploadPathDOC= '';
      this.fileUploadPathDOCX= '';
  }

  update(value: NgForm) {
      console.log(this.getBase64,'this.getBase64this.getBase64')
    console.log(value,'ddddd');
    console.log(this.uploadType,'ddddd');
        if(this.uploadType == '' ){
            this.uploadTypeTest= false;
        }else{
            this.uploadTypeTest= true;
            const data = {
                'platform': 'web',
                'applicant_name': this.form.controls['name'].value,
                'applicant_email': this.form.controls['email'].value,
                'applicant_mobile': this.form.controls['mobileno'].value,
                'job_role': this.form.controls['profile'].value,
                'cover_letter': this.form.controls['cover'].value,
                'base64': this.getBase64,
                'file_ext': this.uploadType
            };
            // this.settings.loadingSpinner = true;
            this.common.careerupdate(data).subscribe(
                (successData) => {
                    this.updateSuccess(successData);
                },
                (error) => {
                    this.updateFailure(error);
                }
            );
        }

    }
    // }


    updateSuccess(successData) {
        // this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.toastr.success(successData.ResponseObject);
            this.form.reset();
            this.myForm.resetForm();
            // this.imageSrc = '';
            this.uploadType = '';
            this.getBase64 = '';
            this.uploadAddressProofName = '';
            this.fileUploadPathPDF= '';
            this.fileUploadPathDOC= '';
            this.fileUploadPathDOCX= '';
        }
        this.uploadAddressProofName ='';
    }

    updateFailure(error) {
        // this.settings.loadingSpinner = false;
    }
    // job profile
    jobProfile() {
        const data = {
            'platform': 'web',
        };
        this.settings.loadingSpinner = true;
        this.common.jobDescription(data).subscribe(
            (successData) => {
                this.profileSuccess(successData);
            },
            (error) => {
                this.profileFailure(error);
            }
        );
    }
    profileSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.job = successData.ResponseObject;
            console.log(this.job,'jghghgkj');
        }
    }

    profileFailure(error) {
        this.settings.loadingSpinner = false;
    }


    uploadProof(event: any) {
      console.log(this.allowedExtensionsPDF, 'allowedExtensionsPDFallowedExtensionsPDF');
        this.allowedExtensionsPDF = /(\.pdf)$/i;
        this.allowedExtensionsDOC = /(\.doc)$/i;
        this.allowedExtensionsDOCX = /(\.docx)$/i;

        let getUrlEdu = [];
        // let typeList = [];
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
                getUrlEdu.push(this.url.split(','));
                this.onUploadFinished(getUrlEdu);
            };
            reader.readAsDataURL(event.target.files[i]);
        }
        this.uploadAddressProofName = event.target.files[0].name;
      this.uploadType =  event.target.files[0].type;
      this.uploadTypeTest = true;
        if(this.allowedExtensionsPDF.exec(this.uploadAddressProofName)){
            this.fileUploadPathPDF= 'pdf';
            this.fileUploadPathDOC= '';
            this.fileUploadPathDOCX= '';
            // this.imageSrc = '';
        }else if(this.allowedExtensionsDOC.exec(this.uploadAddressProofName)){
            this.fileUploadPathDOC= 'doc';
            this.fileUploadPathPDF= '';
            this.fileUploadPathDOCX= '';
            // this.imageSrc = '';
        }else if(this.allowedExtensionsDOCX.exec(this.uploadAddressProofName)){
            this.fileUploadPathDOCX= 'docx';
            this.fileUploadPathPDF= '';
            this.fileUploadPathDOC= '';
            // this.imageSrc = '';
        }
        // else {
        //     if (event.target.files && event.target.files[0]) {
        //         const file = event.target.files[0];
        //
        //         const reader = new FileReader();
        //         reader.onload = e => this.imageSrc = reader.result;
        //
        //         reader.readAsDataURL(file);
        //         this.fileUploadPathPDF= '';
        //         this.fileUploadPathDOC= '';
        //         this.fileUploadPathDOCX= '';
        //
        //     }
        // }
    }
    onUploadFinished( basecode) {
        this.getBase64 = basecode[0][1];
    }

    // validation
    numberValidate(event: any) {
        this.validation.numberValidate(event);
    }
    nameValidate(event: any) {
        this.validation.nameValidate(event);
    }
}

