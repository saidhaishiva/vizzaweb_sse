import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-addfamilymembers',
  templateUrl: './addfamilymembers.component.html',
  styleUrls: ['./addfamilymembers.component.scss']
})
export class AddfamilymembersComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AddfamilymembersComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
