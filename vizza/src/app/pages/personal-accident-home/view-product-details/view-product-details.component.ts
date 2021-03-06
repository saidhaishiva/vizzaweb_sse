import {Component, Inject, OnInit} from '@angular/core';
import {Settings} from '../../../app.settings.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {AppSettings} from '../../../app.settings';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {CommonService} from '../../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {PersonalAccidentService} from '../../../shared/services/personal-accident.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.scss']
})
export class ViewProductDetailsComponent implements OnInit {
    webhost: any;
    compareDetails: any;
    keyFeatureNames: any;
    id : any;
    productId : any;
    getKeyList : any;
    productDocLists : any;
    bgColor : any;
    value : any;
    id1 : any;
    testPath : any;
    selectedClaimDetails : any;
    public settings: Settings;

    public form: FormGroup;
    data1: any;
    size: any;
    getUrl1: any;
    getUrl: any;
    url: any;
    fileUploadPath: any;
    productName: any;

    constructor(public dialogRef: MatDialogRef<ViewProductDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService,public appSettings: AppSettings, public config: ConfigurationService, public common: CommonService, public fb: FormBuilder, public toastr: ToastrService, public personalService: PersonalAccidentService,) {
        this.settings = this.appSettings.settings;
        this.productId = data.productId;
        this.productName = data.productName;
        this.webhost = this.config.getimgUrl();
        this.testPath = '/uploads/religare1120002190099_1539679118.pdf';
        // this.id = 0;
        // this.value = '<p>List</p><ul><li>Test 1</li><li>Test 2</li><li>Test 3</li><li>Test 4</li></ul>';

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


        this.viewKeyFeatures(this.productId);
    }
    onNoClick(): void {
        this.dialogRef.close()
    }
    addClass(id: any, type) {
        this.id = id;
        if (type == 1){
            this.bgColor = 'true';
        } else {
            this.bgColor = 'false';

        }
    }
    selectedproducs(id: any, type) {
        this.id = id;
        if (type == 1){
            this.bgColor = 'true';
        } else {
            this.bgColor = 'false';

        }
    }
    onSelectedIndexChange(index) {
        if (index == 0) {
            const getIndex = this.getKeyList.findIndex( list => list.type == 1);
            this.id = getIndex;
        } else if (index == 1) {
            // for (let i = 0; i < this.getKeyList.length; i++) {
            //     if(this.getKeyList[i].kf_type == 2) {
            //         this.id = this.getKeyList[i];
            //     }
            // }
            // const getIndex = this.getKeyList.findIndex( list => list.type == 2);
            // this.id = getIndex;
            this.id1 = 0;
        } else if (index == 2) {
            this.selectedClaimDetails = 'form1';
            const getIndex = this.getKeyList.findIndex( list => list.type == 2);
            this.id = getIndex;
        }

    }
    viewKeyFeatures(value) {
        const data = {
            'platform': 'web',
            'userid': 1,
            'roleid': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
            'productid': value

        };
        this.settings.loadingSpinner = true;
        this.personalService.viewKeyFeatureList(data).subscribe(
            (successData) => {
                this.viewKeySuccess(successData);
            },
            (error) => {
                this.viewKeyFailure(error);
            }
        );
    }
    public viewKeySuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.getKeyList = successData.ResponseObject.key_features;
            this.productDocLists = successData.ResponseObject.product_docs;
            const getIndex = this.getKeyList.findIndex( list => list.type == 1);
            this.id = getIndex;
            this.bgColor = 'true';
            // for (let i = 0; i < this.getKeyList.length; i++) {
            //     if(this.getKeyList[i].kf_type == 2) {
            //         this.id = i;
            //     }
            // }
        }
    }
    public viewKeyFailure(error) {
        this.settings.loadingSpinner = false;
    }
    selectClaim(value) {
        this.selectedClaimDetails = value;
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
        const data1 = {
            'platform': 'web',
            'uploadtype': 'single',
            'images': this.getUrl,
        };
        this.common.fileUpload(data1).subscribe(
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
            const data1 = {
                'name': this.form.controls['name'].value,
                'email': this.form.controls['email'].value,
                'subject': this.form.controls['subject'].value,
                'message': this.form.controls['message'].value,
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                'platform': 'web',
                'uploaded_doc': this.fileUploadPath
            };
            this.common.contactDetails(data1).subscribe(
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
            this.data1 = successData.ResponseObject;
        } else {
            this.toastr.success('Contact details added successfully');
        }
    }

    // handle error data

    public getDetailsFailure(error) {
        this.settings.loadingSpinner = false;
    }
}
