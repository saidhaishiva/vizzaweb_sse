import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-life-compare-now',
  templateUrl: './life-compare-now.component.html',
  styleUrls: ['./life-compare-now.component.scss']
})
export class LifeCompareNowComponent implements OnInit {

  constructor(public dialogRef : MatDialogRef<LifeCompareNowComponent>,
      @Inject(MAT_DIALOG_DATA)public auth:AuthService) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
