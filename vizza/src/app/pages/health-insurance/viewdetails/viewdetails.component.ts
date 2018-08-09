import {Component, Inject, OnInit} from '@angular/core';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComparelistComponent} from '../comparelist/comparelist.component';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
    webhost: any;
    compareDetails: any;
    keyFeatureNames: any;
    constructor(public dialogRef: MatDialogRef<ViewdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService) {
      this.webhost = this.config.getimgUrl();

  }

  ngOnInit() {
  }
    onNoClick(): void {
        this.dialogRef.close()
    }
}
