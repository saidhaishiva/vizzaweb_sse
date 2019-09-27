import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComparelistComponent} from '../comparelist/comparelist.component';
import {ConfigurationService} from '../../../shared/services/configuration.service';


@Component({
  selector: 'app-grouppopup',
  templateUrl: './grouppopup.component.html',
  styleUrls: ['./grouppopup.component.scss']
})
export class GrouppopupComponent implements OnInit {
    compareDetails: any;
  constructor(
      public dialogRef: MatDialogRef<ComparelistComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, public config: ConfigurationService) {
      this.topScroll();
      this.compareDetails = this.data.comparedata;
      console.log(this.compareDetails, 'this.data.comparedata');
  }

  ngOnInit() {
      this.topScroll();
      // alert('hello');
  }
    onNoClick(): void {
        this.dialogRef.close();
        this.topScroll();
    }
    topScroll() {
        document.getElementById('main-content').scrollTop = 0;
    }
}
