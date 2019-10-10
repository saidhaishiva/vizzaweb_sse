import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AuthService} from '../../shared/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { CommonService} from '../../shared/services/common.service';
import { AppSettings} from '../../app.settings';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ComparelistComponent} from '../health-insurance/comparelist/comparelist.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public url: any;
    public uploadAddressProofName: any;
    public uploadType: any;
    public getBase64: any;
    public data: any;
    public getUrl: any;
    public fileDetails: any;
    public allImage: any;

    public uploadTypeTest: any;
    public allowedExtensionsPDF: any;
    public allowedExtensionsDOC: any;
    public allowedExtensionsDOCX: any;
    public fileUploadPathPDF: any;
    public fileUploadPathDOC: any;
    public fileUploadPathDOCX: any;
    public filePath: any;
    imageSrc: string;

    @ViewChild('myForm') myForm: NgForm;

    constructor(public dialogRef: MatDialogRef<ComparelistComponent>,
              @Inject(MAT_DIALOG_DATA)  public data1: any,  public fb: FormBuilder, public commonService: CommonService, public auth: AuthService, public toastr: ToastrService, public appSettings: AppSettings,public common: CommonService) {
      this.settings = this.appSettings.settings;
      this.allImage = [];


      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
          'subject': ['', Validators.compose([Validators.required])],
          'message': ['', Validators.compose([Validators.required])],
          // 'profile': ['',Validators.compose( [Validators.required])]

      });
  }

  ngOnInit() {
      this.uploadTypeTest= true;
      this.imageSrc = '';
      this.uploadType = '';
      this.getBase64 = '';
      this.uploadAddressProofName = '';
      this.fileUploadPathPDF= '';
      this.fileUploadPathDOC= '';
      this.fileUploadPathDOCX= '';
  }
    public contactDetails(): void {
        if(this.uploadType == '' ){
            this.uploadTypeTest= false;
        }else {
        if (this.form.valid) {
                const data = {
                    'name': this.form.controls['name'].value,
                    'email': this.form.controls['email'].value,
                    'subject': this.form.controls['subject'].value,
                    'message': this.form.controls['message'].value,
                    'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                    'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                    'platform': 'web',
                    'base64': this.getBase64,
                    'file_ext': this.uploadType
                };
            this.settings.loadingSpinner = true;
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
    }
    public getDetailsSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close();
            this.data = successData.ResponseObject;
            this.toastr.success('Contact details added successfully');
            this.form.reset();
            this.myForm.resetForm();
            this.imageSrc = '';
            this.uploadAddressProofName = '';
            this.getBase64 = '';
            this.fileUploadPathPDF= '';
            this.fileUploadPathDOC= '';
            this.fileUploadPathDOCX= '';
        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    // handle error data

    public getDetailsFailure(error) {
        // console.log(error);
        this.settings.loadingSpinner = false;
    }

    uploadProof(event: any) {
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
            this.imageSrc = '';
        }else if(this.allowedExtensionsDOC.exec(this.uploadAddressProofName)){
            this.fileUploadPathDOC= 'doc';
            this.fileUploadPathPDF= '';
            this.fileUploadPathDOCX= '';
            this.imageSrc = '';
        }else if(this.allowedExtensionsDOCX.exec(this.uploadAddressProofName)){
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
    onUploadFinished( basecode) {
        this.getBase64 = basecode[0][1];
    }


}
