import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-proposalmessage',
  templateUrl: './proposalmessage.component.html',
  styleUrls: ['./proposalmessage.component.scss']
})
export class ProposalmessageComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<ProposalmessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
   }

}
