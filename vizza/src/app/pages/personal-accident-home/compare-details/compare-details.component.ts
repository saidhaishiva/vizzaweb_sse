import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfigurationService} from '../../../shared/services/configuration.service';

@Component({
  selector: 'app-compare-details',
  templateUrl: './compare-details.component.html',
  styleUrls: ['./compare-details.component.scss']

})
export class CompareDetailsComponent implements OnInit {
    compareDetails: any;
    keyFeatureNames: any;
    webhost: any;
  constructor( public dialogRef: MatDialogRef<CompareDetailsComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService) {
      this.webhost = this.config.getimgUrl();
      this.compareDetails = this.data.comparedata;
      for (let i = 0; i < this.data.comparedata.productdetails.length; i++) {
          this.keyFeatureNames = [];
          for (let j = 0; j < this.data.comparedata.productdetails[0].key_features.length; j++) {
              this.keyFeatureNames.push(this.data.comparedata.productdetails[0].key_features[j].key_features_name);
          }
      }
  }

  ngOnInit() {
  }
    onNoClick(): void {
        this.dialogRef.close()
    }
}
