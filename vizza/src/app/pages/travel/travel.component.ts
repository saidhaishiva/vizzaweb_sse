import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent implements OnInit {

    setArray: any;
    setArray1: any;
    setArray2: any;
    value: any;
    showFamily: boolean;
    showGroup: boolean;
    showstudent: boolean;
    Child3BTn: boolean;
    FatherBTn: boolean;
    MotherBTn: boolean;
    AddFamilyBTN: boolean;
    Member5BTn: boolean;
    Member6BTn: boolean;
    Member7BTn: boolean;
    Member8BTn: boolean;
    Student5BTn: boolean;
    Student6BTn: boolean;
    Student7BTn: boolean;
    Student8BTn: boolean;

    count: any;

    constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService, public toast: ToastrService, public auth: AuthService) {

        this.setArray = [];
        this.setArray1 = [];
        this.setArray2 = [];

        this.setArray = [
            {name: 'Self', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Child1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Child2', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
        this.setArray1 = [
            {name: 'Member1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member2', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member3', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member4', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
        this.setArray2 = [
            {name: 'Student1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student2', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student3', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student4', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];

    }

    ngOnInit() {
        this.Child3BTn = false;
        this.FatherBTn = false;
        this.MotherBTn = false;
        this.AddFamilyBTN = true;
        this.Member5BTn = false;
        this.Member6BTn = false;
        this.Member7BTn = false;
        this.Member8BTn = false;
        this.Student5BTn = false;
        this.Student6BTn = false;
        this.Student7BTn = false;
        this.Student8BTn = false;


        this.count = 0;
    }

    onItemChange(event){
        console.log(event, 'value');
        if (event == 1) {
            this.showFamily = true;
            this.showGroup = false;
            this.showstudent = false;
        }
        if (event == 2) {
            this.showGroup = true;
            this.showFamily = false;
            this.showstudent = false;
        }
        if (event == 3) {
            this.showstudent = true;
            this.showGroup = false;
            this.showFamily = false;
        }
    }

    addFamily(value){
        this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        if (value == 'Child3'){
            this.Child3BTn = true;
        }
        else if(value == 'Father'){
            this.FatherBTn = true;
        }
        else if(value == 'Mother'){
            this.MotherBTn = true;
        }
    }


    addMembers(value){
        this.setArray1.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        if (value == 'Member5'){
            this.Member5BTn = true;
        }
        else if(value == 'Member6'){
            this.Member6BTn = true;
        }
        else if(value == 'Member7'){
            this.Member7BTn = true;
        }
        else if(value == 'Member8'){
            this.Member8BTn = true;
        }
    }

    addStudents(value){
        this.setArray2.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        if (value == 'Student5'){
            this.Student5BTn = true;
        }
        else if(value == 'Student6'){
            this.Student6BTn = true;
        }
        else if(value == 'Student7'){
            this.Student7BTn = true;
        }
        else if(value == 'Student8'){
            this.Student8BTn = true;
        }
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

}
