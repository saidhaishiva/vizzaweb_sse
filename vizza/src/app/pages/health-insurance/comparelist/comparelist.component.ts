import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ConfigurationService} from '../../../shared/services/configuration.service';

@Component({
  selector: 'app-comparelist',
  templateUrl: './comparelist.component.html',
  styleUrls: ['./comparelist.component.scss']
})
export class ComparelistComponent implements OnInit {
    compareDetails: any;
    keyFeatureNames: any;
    webhost: any;
    type: any;
  constructor(
      public dialogRef: MatDialogRef<ComparelistComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService) {
      this.webhost = this.config.getimgUrl();
      this.compareDetails = this.data.comparedata;
      this.type = this.data.type;
      console.log(this.compareDetails, 'this.data.comparedata');
      console.log(this.type, 'this.type');
      console.log(this.data, 'this.type');

      for (let i = 0; i < this.data.comparedata.productdetails.length; i++) {
          this.keyFeatureNames = [];
        for (let j = 0; j < this.data.comparedata.productdetails[0].key_features.length; j++) {
            this.keyFeatureNames.push(this.data.comparedata.productdetails[0].key_features[j].key_features_name);
        }
    }
    console.log(this.keyFeatureNames, 'this.keyFeatureNames');
  }

  ngOnInit() {
  }
  onNoClick(): void {
      this.dialogRef.close()
  }

}
