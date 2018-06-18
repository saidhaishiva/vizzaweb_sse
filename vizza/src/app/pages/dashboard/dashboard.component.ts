import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddfamilymembersComponent} from './addfamilymembers/addfamilymembers.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'pincode': ['', Validators.required],
            'suminsure': ['', Validators.required],

        });
    }

    ngOnInit() {
    }

    insureList(data) {
        console.log(data);

    }
    openDialog() {
        let dialogRef = this.dialog.open(AddfamilymembersComponent, {
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
