import {Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ComparelistComponent} from '../../health-insurance/comparelist/comparelist.component';


@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.scss']
})
export class ResultpageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ComparelistComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }
    onNoClick() {
    this.dialogRef.close();
    }

}
