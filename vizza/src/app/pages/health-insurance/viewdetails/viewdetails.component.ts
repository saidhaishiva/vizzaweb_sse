import {Component, Inject, OnInit} from '@angular/core';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComparelistComponent} from '../comparelist/comparelist.component';
import {CommonService} from '../../../shared/services/common.service';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
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
    public settings: Settings;

    constructor(public dialogRef: MatDialogRef<ViewdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService,public appSettings: AppSettings, public config: ConfigurationService, public common: CommonService) {
        this.settings = this.appSettings.settings;
        this.productId = data;
        this.webhost = this.config.getimgUrl();
        this.testPath = '/uploads/religare1120002190099_1539679118.pdf';
       // this.id = 0;
       // this.value = '<p>List</p><ul><li>Test 1</li><li>Test 2</li><li>Test 3</li><li>Test 4</li></ul>';
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
            console.log('inn');
            this.bgColor = 'false';

        }
    }
    selectedproducs(id: any, type) {
        this.id = id;
        if (type == 1){
            this.bgColor = 'true';
        } else {
            console.log('inn');
            this.bgColor = 'false';

        }
    }
    onSelectedIndexChange(index) {
        console.log(index, 'ind');
        if (index == 1) {
            // for (let i = 0; i < this.getKeyList.length; i++) {
            //     if(this.getKeyList[i].kf_type == 2) {
            //         this.id = this.getKeyList[i];
            //     }
            // }
            // const getIndex = this.getKeyList.findIndex( list => list.type == 2);
            // this.id = getIndex;
            this.id1 = 0;
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
        this.common.viewKeyFeatureList(data).subscribe(
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
       // console.log(this.id, 'this.id');
    }
    public viewKeyFailure(error) {
        this.settings.loadingSpinner = false;
    }
}
