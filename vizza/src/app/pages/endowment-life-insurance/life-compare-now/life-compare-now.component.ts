import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';
import {LifeCallBackComponent} from '../life-call-back/life-call-back.component';


@Component({
  selector: 'app-life-compare-now',
  templateUrl: './life-compare-now.component.html',
  styleUrls: ['./life-compare-now.component.scss']
})
export class LifeCompareNowComponent implements OnInit {
  public compareDetails:any;
  constructor(public dialogRef : MatDialogRef<LifeCompareNowComponent>,
      @Inject(MAT_DIALOG_DATA)public data: any, public auth:AuthService,public dialog: MatDialog) {
    this.compareDetails = this.data;
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
  callBack(value){
      this.dialogRef.close(value);
  }
}
