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
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {TravelService} from '../../shared/services/travel.service';


export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss'],
  providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
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
    sumInsuredAmountLists: any;
    currentTab: any;
    maxDate: any;
    startDateError: any;
    endDateError: any;
    today: any;

    selectedAmount: any;
    travelType: any;
    startDate: any;
    endDate: any;
    travelPlan: any;
    medicalCondition: any;
    finalData: any;
    sumerror: any;
    duration: any;

    constructor(public appSettings: AppSettings, public router: Router, public config: ConfigurationService, public fb: FormBuilder, public dialog: MatDialog, public travel: TravelService, public toast: ToastrService, public auth: AuthService, public datePipe : DatePipe) {
        this.showSelf = true;
        this.showGroup = false;
        this.showstudent = false;
        this.selfDetails();
        this.familyDetails();
        this.studentDetails();
        this.currentTab = 'self';
        this.today = new Date();

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
        this.sumInsuredAmonut();
    }
    selfDetails() {
        this.selfArray = [
            {name: 'Self', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Spouse', age: '', disabled: false, checked: false, required: false, error: ''},
            {name: 'Child1', age: '', disabled: false, checked: false, required: false, error: ''},
            {name: 'Child2', age: '', disabled: false, checked: false, required: false, error: ''}
        ];
    }
    familyDetails() {
        this.familyArray = [
            {name: 'Member1', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Member2', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Member3', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Member4', age: '', disabled: false, checked: false, required: true, error: ''}
        ];
    }
    studentDetails() {
        this.studentArray = [
            {name: 'Student1', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Student2', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Student3', age: '', disabled: false, checked: false, required: true, error: ''},
            {name: 'Student4', age: '', disabled: false, checked: false, required: true, error: ''}
        ];
    }
    // this function will get the sum insured amounts
    public sumInsuredAmonut(): void {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
            'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0'
        };
        this.travel.getTravelSumInsuredAmount(data).subscribe(
            (successData) => {
                this.getSumInsuredAmountSuccess(successData);
            },
            (error) => {
                this.getSumInsuredAmountFailure(error);
            }
        );
    }
    public getSumInsuredAmountSuccess(successData) {
        if (successData.IsSuccess) {
            this.sumInsuredAmountLists = successData.ResponseObject;
        }
    }
    public getSumInsuredAmountFailure(error) {
        console.log(error, 'error');
    }
    refresh() {
        this.selectedAmount = '';
        this.travelType = '';
        this.travelPlan = '';
        this.duration = '';
        this.medicalCondition = '';
        this.Child3BTn = false;
        this.FatherBTn = false;
        this.MotherBTn = false;
        this.Member5BTn = false;
        this.Member6BTn = false;
        this.Member7BTn = false;
        this.Member8BTn = false;
        this.Student5BTn = false;
        this.Student6BTn = false;
        this.Student7BTn = false;
        this.Student8BTn = false;
        this.selfDetails();
        this.familyDetails();
        this.studentDetails();

    }

    onSelectedIndexChange(event){
        console.log(event, 'value');
        this.currentTab = '';
        if (event == 0) {
            this.currentTab = 'self';
            this.selfDetails();
            this.showSelf = true;
            this.showGroup = false;
            this.showstudent = false;
            this.travelType = '';
            this.travelPlan = '';
            this.medicalCondition = '';
        }
        if (event == 1) {
            this.currentTab = 'family';
            this.familyDetails();
            this.showGroup = true;
            this.showSelf = false;
            this.showstudent = false;
            this.travelType = '';
            this.travelPlan = '';
            this.medicalCondition = '';
        }
        if (event == 2) {
            this.currentTab = 'students';
            this.studentDetails();
            this.showstudent = true;
            this.showGroup = false;
            this.showSelf = false;
            this.travelType = '';
            this.travelPlan = '';
            this.medicalCondition = '';
        }
    }
    ckeckedUser(index, checked, name) {
        console.log(this.currentTab, 'this.currentTab');

        if (checked) {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = true;
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = true;
            } else if (this.currentTab == 'students') {
                this.studentArray[index].checked = true;
            }
        } else {
            if (this.currentTab == 'self') {
                this.selfArray[index].checked = false;
                if (this.selfArray.length > 4) this.selfArray.splice(index, 1);
            } else if (this.currentTab == 'family') {
                this.familyArray[index].checked = false;
                if (this.familyArray.length > 4) this.familyArray.splice(index, 1);
            } else if (this.currentTab == 'students') {
                this.studentArray[index].checked = false;
                if (this.studentArray.length > 4) this.studentArray.splice(index, 1);
            }
            this.contrlButtons(name, checked);
        }
    }
    addFamily(value){
        this.selfArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
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
        this.familyArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
        this.contrlButtons(value, true);
    }
    addStudents(value){
        this.studentArray.push({name: value, age: '', disabled: false, checked: true, required: false, error: ''});
        this.contrlButtons(value, true);
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    chooseDate(event, type) {
        console.log(event, 'event');
        this.maxDate = '';
        if (event.value != null) {
            if (typeof event.value._i == 'string') {
                const pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
                if (type == 'sDate') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.startDateError = '';
                    } else {
                        this.startDateError = 'Enter Valid Date';
                    }
                } else if (type == 'eDate') {
                    if (pattern.test(event.value._i) && event.value._i.length == 10) {
                        this.endDateError = '';
                    } else {
                        this.endDateError = 'Enter Valid Date';
                    }
                }
                let selectedDate;
                selectedDate = event.value._i;
                console.log(selectedDate, 'selectedDate');
                if (selectedDate.length == 10) {
                    if (type == 'sDate') {
                        console.log('inst');
                        this.maxDate = event.value;
                    }
                }
            } else if (typeof event.value._i == 'object') {
                if (type == 'sDate') {
                    this.startDateError = '';
                } else if (type == 'eDate') {
                    this.endDateError = '';
                }
                console.log(event.value, 'event.value');
                if (type == 'sDate') {
                    console.log('inobt');
                    this.maxDate = event.value;
                }
            }
            console.log(this.maxDate, 'maxDate22');
        }
    }

    submit(groupname) {
        console.log(groupname, 'groupname');
        this.finalData = [];
        if (this.selectedAmount == '' || this.selectedAmount == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        let memberValid = false;
        if (groupname == 'self') {
            if (!this.selfArray[0].checked) {
                this.selfArray[0].error = 'Required';
                memberValid = true;
            } else {
                for (let i = 0; i < this.selfArray.length; i++) {
                    if (this.selfArray[i].checked) {
                        if (this.selfArray[i].age == '') {
                            this.selfArray[i].error = 'Required';
                            memberValid = true;
                            break;
                        } else {
                            this.selfArray[i].error = '';
                            memberValid = false;
                            this.finalData.push({type: this.selfArray[i].name, age: this.selfArray[i].age });
                        }
                    }
                }
            }

        } else if (groupname == 'family') {
            for (let i = 0; i < 4; i++) {
                if (!this.familyArray[i].checked) {
                    this.familyArray[i].error = 'Required';
                }
            }
            for (let i = 0; i < this.familyArray.length; i++) {
                if (this.familyArray[i].checked) {
                    if (this.familyArray[i].age == '') {
                        this.familyArray[i].error = 'Required';
                    } else {
                        this.familyArray[i].error = '';
                        this.finalData.push({type: this.familyArray[i].name, age: this.familyArray[i].age});
                    }
                }
            }
        } else if (groupname == 'students') {
            for (let i = 0; i < 4; i++) {
                if (!this.studentArray[i].checked) {
                    this.studentArray[i].error = 'Required';
                }
            }
            for (let i = 0; i < this.studentArray.length; i++) {
                if (this.studentArray[i].checked) {
                    if (this.studentArray[i].age == '') {
                        this.studentArray[i].error = 'Required';
                    } else {
                        this.studentArray[i].error = '';
                        this.finalData.push({type: this.studentArray[i].name, age: this.studentArray[i].age});
                    }
                }
            }
        }

       // console.log(this.familyArray, 'this.familyArray');
        //
       // console.log(this.studentArray, 'this.studentArray');
        if (!memberValid) {
            let sDate = this.datePipe.transform(this.startDate, 'y-MM-dd');
            let eDate = this.datePipe.transform(this.endDate, 'y-MM-dd');
            let fDate = this.datePipe.transform(this.startDate, 'MM/dd/yyyy');
            let tDate = this.datePipe.transform(this.endDate, 'MM/dd/yyyy');
            console.log(fDate);
            console.log(tDate);
            let diff = Date.parse(tDate) - Date.parse(fDate);
            let days =  Math.floor(diff / 86400000);
            console.log(this.travelType, 'tyy');
            const data = {
                'platform': 'web',
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
                'user_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '0',
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : '0',
                'sum_insured': this.selectedAmount,
                'family_members': this.finalData,
                'travel_plan': this.travelPlan,
                'travel_time_type': this.travelType,
                'enquiry_id': '',
                'start_date': sDate,
                'end_date': eDate,
                'day_count': days,
                'duration': this.duration ? this.duration : '',
                'travel_type': groupname,
                'medical_condition': this.medicalCondition
            }
            console.log(data, 'this.datadata');
            this.travel.getTravelPremiumCal(data).subscribe(
                (successData) => {
                    this.getTravelPremiumCalSuccess(successData);
                },
                (error) => {
                    this.getTravelPremiumCalFailure(error);
                }
            );
        }

    }
    public getTravelPremiumCalSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            sessionStorage.premiumLists = JSON.stringify(successData.ResponseObject);
            this.router.navigate(['/travelpremium']);
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }
    public getTravelPremiumCalFailure(error) {

    }

}

