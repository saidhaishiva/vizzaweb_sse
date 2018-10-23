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

    selfArray: any;
    familyArray: any;
    studentArray: any;
    value: any;
    showSelf: boolean;
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
        this.showSelf = true;
        this.showGroup = false;
        this.showstudent = false;
        this.selfDetails();
        this.familyDetails();
        this.studentDetails();

    }

    ngOnInit() {
        this.Child3BTn = true;
        this.FatherBTn = true;
        this.MotherBTn = true;
        this.AddFamilyBTN = true;
        this.Member5BTn = true;
        this.Member6BTn = true;
        this.Member7BTn = true;
        this.Member8BTn = true;
        this.Student5BTn = true;
        this.Student6BTn = true;
        this.Student7BTn = true;
        this.Student8BTn = true;
        this.count = 0;
    }
    selfDetails() {
        this.selfArray = [
            {name: 'Self', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Child1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Child2', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
    }
    familyDetails() {
        this.familyArray = [
            {name: 'Member1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member2', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member3', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Member4', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
    }
    studentDetails() {
        this.studentArray = [
            {name: 'Student1', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student2', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student3', age: '', disabled: false, checked: false, auto: false, error: ''},
            {name: 'Student4', age: '', disabled: false, checked: false, auto: false, error: ''}
        ];
    }


    onSelectedIndexChange(event){
        console.log(event, 'value');
        if (event == 0) {
            this.selfDetails();
            this.showSelf = true;
            this.showGroup = false;
            this.showstudent = false;
        }
        if (event == 1) {
            this.familyDetails();
            this.showGroup = true;
            this.showSelf = false;
            this.showstudent = false;
        }
        if (event == 2) {
            this.studentDetails();
            this.showstudent = true;
            this.showGroup = false;
            this.showSelf = false;
        }
    }
    ckeckedUser(index, checked, name) {
        if (checked) {
            this.selfArray[index].checked = true;
            this.familyArray[index].checked = true;
            this.studentArray[index].checked = true;
        } else {
            this.selfArray[index].checked = false;
            this.familyArray[index].checked = false;
            this.studentArray[index].checked = false;

            this.selfArray.splice(index, 1);
            this.familyArray.splice(index, 1);
            this.studentArray.splice(index, 1);
            this.contrlButtons(name, checked);
        }
        console.log(this.selfArray, 'this.selfArray11');
    }
    addFamily(value){
        this.selfArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        this.contrlButtons(value, true);
        console.log(this.selfArray, 'this.selfArray');
    }
    contrlButtons(value, checked) {
        if (checked) {
            if (value == 'Child3'){
                this.Child3BTn = false;
            }
            else if(value == 'Father'){
                this.FatherBTn = false;
            }
            else if(value == 'Mother'){
                this.MotherBTn = false;
            } else  if (value == 'Member5'){
                this.Member5BTn = false;
            }
            else if(value == 'Member6'){
                this.Member6BTn = false;
            }
            else if(value == 'Member7'){
                this.Member7BTn = false;
            }
            else if(value == 'Member8'){
                this.Member8BTn = false;
            } else  if (value == 'Student5'){
                this.Student5BTn = false;
            }
            else if(value == 'Student6'){
                this.Student6BTn = false;
            }
            else if(value == 'Student7'){
                this.Student7BTn = false;
            }
            else if(value == 'Student8'){
                this.Student8BTn = false;
            }
        } else {
            if (value == 'Child3'){
                this.Child3BTn = true;
            }
            else if(value == 'Father'){
                this.FatherBTn = true;
            }
            else if(value == 'Mother'){
                this.MotherBTn = true;
            } else  if (value == 'Member5'){
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
            } else  if (value == 'Student5'){
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
    }
    typeAge(checked, index, value) {
        if (value != '') {
            this.selfArray[index].checked = true;
            this.familyArray[index].checked = true;
            this.studentArray[index].checked = true;
        } else {
            this.selfArray[index].checked = false;
            this.familyArray[index].checked = false;
            this.studentArray[index].checked = false;
        }
    }
    addFamilyMembers(value){
        this.familyArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        this.contrlButtons(value, true);
    }
    addStudents(value){
        this.studentArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        this.contrlButtons(value, true);
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

}
