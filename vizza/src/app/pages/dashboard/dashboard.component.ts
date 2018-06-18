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
    setArray: any;
    addonce: boolean;
    addonce1: boolean;
    relation: any;
    addonce2: boolean;
    addonce3: boolean;
    closeIcon: boolean;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public dialog: MatDialog) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'pincode': ['', Validators.required],
            'suminsure': ['', Validators.required],
            'familymember': ['', Validators.required],

        });
        this.setArray = [];
    }

    ngOnInit() {
        this.Relation();
        this.addonce = false;
        this.addonce1 = false;
        this.addonce2 = false;
        this.addonce3 = false;
        this.closeIcon = true;
    }

    insureList(data) {
        console.log(data);

    }

     Relation() {
        this.setArray.push({
            name: 'Self',
            age: ''
             },
            {
                name: 'Spouse',
                age: '',
                disabled: false
            },
            {
                name: 'Son',
                age: '',
                disabled: false
            },
            {
                name: 'Daughter',
                age: '',
                disabled: false
            }
        );
    }
    addClone(value) {
        this.closeIcon = false;
        this.setArray.push({name: value, age: '', disabled: true});
        for (let i = 0; i < this.setArray.length; i ++) {
            if (this.setArray[i].name == value) {
                if (value == 'Father') {
                    this.addonce = true;
                } else if (value == 'Mother') {
                    this.addonce1 = true;
                } else if (value == 'Father In Law') {
                    this.addonce2 = true;
                } else if (value == 'Mother In Law') {
                    this.addonce3 = true;
                }
            }
        }
        console.log(this.setArray);
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
