import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../shared/services/auth.service';
import {LifeService} from '../../../shared/services/life.service';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';

@Component({
  selector: 'app-life-view-details',
  templateUrl: './life-view-details.component.html',
  styleUrls: ['./life-view-details.component.scss']
})
export class LifeViewDetailsComponent implements OnInit {
  public getKeyList : any;
  public id : any;
  public productDocLists : any;
  public bgColor : any;
  public productId : any;
  public id1 : any;
  public selectedClaimDetails : any;
  public settings: Settings;


  constructor( public dialogRef : MatDialogRef<LifeViewDetailsComponent>,
      @Inject(MAT_DIALOG_DATA)public data: any, public toastr : ToastrService, public auth : AuthService,public life:LifeService,public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    this.productId = data.productId;
  }

  ngOnInit() {
    this.viewKeyFeatures();
    console.log(this.productId,'this.productIdthis.productId');
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
  onSelectedIndexChange(index) {
    console.log(index, 'ind');
    if (index == 0) {
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
    }else if (index == 1) {
      this.id1 = 0;
    } else if (index == 2) {
      this.selectedClaimDetails = 'form1';
      const getIndex = this.getKeyList.findIndex( list => list.type == 2);
      this.id = getIndex;
    }
  }

  viewKeyFeatures() {
    console.log(this.productId,'valuevalue');
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'product_id': this.productId

    };
    this.settings.loadingSpinner = true;
    this.life.getKeyFeatureDetails(data).subscribe(
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
      console.log(successData.ResponseObject,'successData.ResponseObject');
      this.getKeyList = successData.ResponseObject.key_features;
      console.log(this.getKeyList,'this.getKeyList');
      this.productDocLists = successData.ResponseObject.productDocument;
      const getIndex = this.getKeyList.findIndex( list => list.type == 1);
      this.id = getIndex;
      this.bgColor = 'true';
    }
    console.log(this.getKeyList, 'getKeyListgetKeyList');
  }
  public viewKeyFailure(error) {
    this.settings.loadingSpinner = false;
  }

}
