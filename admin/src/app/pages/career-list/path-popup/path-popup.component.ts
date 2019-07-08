import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-path-popup',
  templateUrl: './path-popup.component.html',
  styleUrls: ['./path-popup.component.scss']
})
export class PathPopupComponent implements OnInit {
public form : FormGroup
  constructor(public fb : FormBuilder,   public dialogRef: MatDialogRef<PathPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  this.form = this.fb.group({
    name:'',
    email:'',
    mobile: '',
    status:'',
    createdDate: '',

  })
  }

  ngOnInit() {
  }
  close(): void {
    this.dialogRef.close();
  }
}
