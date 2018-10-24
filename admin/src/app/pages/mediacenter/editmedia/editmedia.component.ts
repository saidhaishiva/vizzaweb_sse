import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {AuthService} from '../../../shared/services/auth.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BranchService} from '../../../shared/services/branch.service';

@Component({
  selector: 'app-editmedia',
  templateUrl: './editmedia.component.html',
  styleUrls: ['./editmedia.component.scss']
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
  constructor(public config: ConfigurationService, public common:CommonService, public auth: AuthService, public fb: FormBuilder, public branchservice: BranchService,private toastr: ToastrService, public dialogRef: MatDialogRef<EditmediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.getDetails = data;
      this.fileUploadPath = this.getDetails.image_path;

    this.webhost = this.config.getimgUrl();
      this.mediaimage = '';
      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'profile': ['',Validators.compose( [Validators.required])]
      });
      this.dialogRef.disableClose = true;

  }
    close(): void {
        this.dialogRef.close();
    }
  ngOnInit() {
      // this.form.controls['profile'].setValue(this.getDetails.image_path);
      this.form.controls['name'].setValue(this.getDetails.center);
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
    edit() {
        const data ={
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'center': this.form.controls['name'].value,
            'image_path': this.fileUploadPath,
            'id': this.getDetails.id

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
            this.dialogRef.close(true);
        }
    }
    public editCenterFailure(error) {
        console.log(error);
    }

}
