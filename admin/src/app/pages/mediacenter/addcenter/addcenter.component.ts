import { Component, OnInit } from '@angular/core';
import {ConfigurationService} from '../../../shared/services/configuration.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-addcenter',
  templateUrl: './addcenter.component.html',
  styleUrls: ['./addcenter.component.scss']
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
    fileUploadPath: any;
  constructor(public config: ConfigurationService, public fb: FormBuilder,public common: CommonService,private toastr: ToastrService, public dialogRef: MatDialogRef<AddcenterComponent>) {
      this.webhost = this.config.getimgUrl();
      this.mediaimage = '';

      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'profile': ['',Validators.compose( [Validators.required])]
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
add() {
const data ={
    'platform': 'web',
    'center': this.form.controls['name'].value,
    'image_path': this.mediaimage
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
        this.dialogRef.close(true);
    }
}
public addCenterFailure(error) {
    console.log(error);
}


}
