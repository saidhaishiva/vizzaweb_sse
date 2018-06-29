import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddfamilymembersComponent} from './addfamilymembers/addfamilymembers.component';
import {CommonService} from '../../shared/services/common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    setArray: any;
    fatherBTn: boolean;
    motherBtn: boolean;
    fatherInLawBTn: boolean;
    motherInLawBtn: boolean;
    sonBtn: boolean;
    daugtherBtn: boolean;
    closeIcon: boolean;

    index: any;
    member: any;
    memberLength: any;
    auto: boolean;
    finalData: any;
    sumerror: boolean;
    pinerror: boolean;
    suminsure: any;
    pin: any;
    sonStatus: any;
    daugtherStatus: any;


    constructor(public appSettings: AppSettings, public fb: FormBuilder, public dialog: MatDialog, public common: CommonService ) {
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'pincode': ['', Validators.required],
            'suminsure': ['', Validators.required],
            'familymember': ['', Validators.required],

        });
        this.sumerror = false;
        this.pinerror = false;
        this.setArray = [];
        this.memberLength = [];
        this.finalData = [];

        this.setArray = [{
                name: 'Self',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Spouse',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Son',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            },
            {
                name: 'Daughter',
                age: '',
                disabled: false,
                checked: false,
                auto: true,
                error: ''
            }
            ];
    }
    ngOnInit() {
        this.fatherBTn = false;
        this.motherBtn = false;
        this.fatherInLawBTn = false;
        this.motherInLawBtn = false;
        this.sonBtn = true;
        this.daugtherBtn = true;
        this.closeIcon = true;
        this.sonStatus = 'false';
        this.daugtherStatus = 'false';


    }



    ckeckedUser(value, index) {
        this.memberLength = [];
        if (value) {
            this.setArray[index].auto = false;

            for (let i = 0; i < this.setArray.length; i++) {
                let length = this.setArray.length - 1;
                console.log(length, 'length');
                if (this.setArray[i].checked) {
                    console.log(this.setArray[i], 'this.setArray');
                    if (this.setArray[i].name == 'Son' || this.setArray[i].name == 'Daughter') {
                        this.memberLength.push(this.setArray[i]);
                    }
                }
            }

            console.log(this.memberLength.length, 'testy');
            if (this.memberLength.length >= 2) {
                this.setArray[2].auto = true;
                this.setArray[3].auto = true;
            }

        } else {
            this.setArray[index].auto = true;

                if (this.setArray[index].name == 'Father') {
                    this.fatherBTn = false;
                } else if (this.setArray[index].name == 'Mother') {
                    this.motherBtn = false;
                } else if (this.setArray[index].name == 'Father In Law') {
                    this.fatherInLawBTn = false;
                } else if (this.setArray[index].name == 'Mother In Law') {
                    this.motherInLawBtn = false;
                } else {
                    console.log(this.setArray, 'this.setArray');
                    for (let i = 0; i < this.setArray.length; i++) {
                        let length = this.setArray.length - 1;
                        console.log(length, 'length');
                        if (this.setArray[i].checked) {
                            console.log(this.setArray[i], 'this.setArray');

                            if (this.setArray[i].name == 'Son') {
                                this.setArray[i].auto = false;
                                this.setArray[length].disabled = false;
                                this.setArray[i].disabled = false;

                                // this.setArray[length].auto = false;
                            }
                            if (this.setArray[i].name == 'Daughter') {
                                this.setArray[i].auto = false;
                                this.setArray[length - 1].disabled = false;
                                this.setArray[i].disabled = false;

                            }
                        } else {


                        }
                    }
                }


            if (index > 3) {
                this.setArray.splice(index, 1);
            }




        }
    }
    addUser(index) {
        console.log(index, 'index');
        this.setArray[index].auto = true;
        this.setArray.push({name: (index == 2) ? 'Son' : 'Daughter', age: '', disabled: false, checked: true, auto: true, error: ''});
        for (let i = 0; i < this.setArray.length; i ++) {
            let length = this.setArray.length - 1;
            console.log(length, 'length');
            if (this.setArray[i].checked) {
                if (this.setArray[length].name == 'Son') {
                    this.setArray[index].disabled = true;
                    this.setArray[index + 1].disabled = true;
                    this.setArray[index + 1].checked = false;
                    this.setArray[index + 1].auto = true;

                }
                if (this.setArray[length].name == 'Daughter') {
                    this.setArray[index].disabled = true;
                    this.setArray[index - 1].disabled = true;
                    this.setArray[index - 1].checked = false;
                    this.setArray[index - 1].auto = true;
                }
            }
        }

    }
    addOthers(value) {
        this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: true, error: ''});
        if (value == 'Father') {
            this.fatherBTn = true;
        } else if (value == 'Mother') {
            this.motherBtn = true;
        } else if (value == 'Father In Law') {
            this.fatherInLawBTn = true;
        } else if (value == 'Mother In Law') {
            this.motherInLawBtn = true;
        }
}


    insureList() {
        console.log(this.pin);
        if (this.suminsure == '' || this.suminsure == undefined) {
            this.sumerror = true;
        } else {
            this.sumerror = false;
        }
        if (this.pin == '' || this.pin == undefined) {
            this.pinerror = true;
        } else {
            this.pinerror = false;
        }

        this.finalData = [];
        for (let i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i].checked) {

                if (this.setArray[i].age == '') {
                    this.setArray[i].error = 'Required';
                } else {
                    this.setArray[i].error = '';

                    this.finalData.push({type: this.setArray[i].name, age: this.setArray[i].age });

                }
            }
        }
if(this.finalData != '' && this.suminsure != '' && this.pin != '' ){
    console.log(this.finalData, 'total array');

        const data = {
            'platform': 'web',
            'postalcode': this.pin,
            'sum_insured': this.suminsure,
            'family_details': this.finalData
        };
        this.common.getPolicyQuotation(data).subscribe(
            (successData) => {
                this.PolicyQuotationSuccess(successData);
            },
            (error) => {
                this.PolicyQuotationFailure(error);
            }
        );
}


    }
    public PolicyQuotationSuccess(successData) {
        console.log(successData, 'successsssssssssssssssssssssss');
    }

    public PolicyQuotationFailure(error) {
        console.log(error);
    }
    addClone(value) {
        this.closeIcon = false;
        this.setArray.push({name: value, age: '', disabled: false, checked: true, auto: false, error: ''});
        console.log(this.setArray, 'this.setArray');
        this.memberLength = [];
        for (let i = 0; i < this.setArray.length; i ++) {
            if (this.setArray[i].checked) {
                console.log(this.setArray[i].name, 'pop');

                if (this.setArray[i].name == 'Son') {
                    this.sonStatus = 'true';
                    this.setArray[3].disabled = true;
                }
                if (this.setArray[i].name == 'Daughter') {
                    this.daugtherStatus = 'true';
                    this.setArray[2].disabled = true;
                }
                console.log(this.memberLength, 'this.memberLength');
            }


        }
        if (this.sonStatus == 'true' && this.daugtherStatus == 'true') {
            this.daugtherBtn = true;
            this.sonBtn = true;

        } else if (this.sonStatus == 'false' && this.daugtherStatus == 'false') {
            this.daugtherBtn = true;
            this.sonBtn = true;

        } else if (this.sonStatus == 'true' && this.daugtherStatus == 'false') {
            this.sonBtn = false;
            this.daugtherBtn = true;

        }  else if (this.sonStatus == 'false' && this.daugtherStatus == 'true') {
            this.sonBtn = true;
            this.daugtherBtn = false;

        }






            // if (this.memberLength.length >= 2) {
            //     this.sonBtn = true;
            //     this.daugtherBtn = true;
            // } else {
            //     this.sonBtn = false;
            //     this.daugtherBtn = false;
            // }
            // if (this.setArray[i].name == value) {
            //     if (this.setArray[i].name == 'Son' && this.memberLength.length <= 2) {
            //         console.log(this.memberLength, 'length');
            //         // this.memberLength.push(this.memberLength.length);
            //         // if (this.memberLength.length == 2) {
            //             this.setArray[2].checked = true;
            //             this.setArray[3].checkdisabled = true;
            //
            //         // }
            //     } else if (this.setArray[i].name == 'Daughter' && this.memberLength.length <= 2 ) {
            //         // this.memberLength.push(this.memberLength.length);
            //         // if (this.memberLength.length == 2) {
            //             this.setArray[3].checked = true;
            //             this.setArray[2].checkdisabled = true;
            //         // }
            //     }
            //     if (value == 'Father') {
            //         this.fatherBTn = true;
            //     } else if (value == 'Mother') {
            //         this.motherBtn = true;
            //     } else if (value == 'Father In Law') {
            //         this.fatherInLawBTn = true;
            //     } else if (value == 'Mother In Law') {
            //         this.motherInLawBtn = true;
            //     }
            //     // else if (value == 'Son') {
            //     //     this.addonce4 = true;
            //     //     this.addonce5 = true;
            //     // } else if (value == 'Daughter') {
            //     //     this.addonce5 = true;
            //     //     this.addonce4 = true;
            //     // }
            // }
       // }
        }

    deleteMembers(value, i) {
        console.log(value, 'value');
        if (value) {
            console.log(this.setArray, 'this.setArray');
            this.memberLength = [];
            for (let j = 0; j < this.setArray.length; j++) {
                if (this.setArray[j].checked) {
                    console.log(this.setArray[j].name, 'pop');
                    if (this.setArray[j].name == 'Son') {
                        this.setArray[j].sonStatus = true;
                        this.memberLength.push(this.setArray[j]);
                    }  else if (this.setArray[j].name == 'Daughter') {
                        // this.daugtherBtn = true;
                        this.setArray[j].daugtherStatus = true;
                        }
                }
            }
        } else {

            if (this.setArray.length > 4) {
                this.setArray.splice(i, 1);
            }
            this.memberLength.splice(i, 1);
            this.memberLength = [];
            for (let j = 0; j < this.setArray.length; j++) {
                if (this.setArray[j].checked) {
                } else {
                    if (this.setArray[j].name == 'Son') {
                        this.setArray[j].sonStatus = false;
                    }  else if (this.setArray[j].name == 'Daughter') {
                        this.setArray[j].daugtherStatus = false;
                    }

                }
            }
        }
        console.log(this.setArray, 'this.setArray23');
        for (let k = 0; k < this.setArray.length; k++) {

            if (this.setArray[k].sonStatus == true && this.setArray[k].daugtherStatus == true) {
                this.daugtherBtn = true;
                this.sonBtn = true;
                alert('a');

            } else if (this.setArray[k].sonStatus == false && this.setArray[k].daugtherStatus == false) {
                this.daugtherBtn = true;
                this.sonBtn = true;
                alert('b');


            } else if (this.setArray[k].sonStatus == true && this.setArray[k].daugtherStatus== false) {
                alert('c');
                this.sonBtn = false;
                this.daugtherBtn = true;

            } else if (this.setArray[k].sonStatus == false && this.setArray[k].daugtherStatus == true) {
                alert('d');

                this.sonBtn = true;
                this.daugtherBtn = false;

            }

        }

        console.log(this.setArray, 'this.setArray2553');

        // if (value == true) {
        //     this.member = this.setArray[i].name;
        //     this.auto = this.setArray[i].auto;
        //     this.setArray[i].error = '';
        //     if (this.member == 'Father') {
        //         this.addonce = false;
        //     } else if (this.member == 'Mother') {
        //         this.addonce1 = false;
        //     } else if (this.member == 'Father In Law') {
        //         this.addonce2 = false;
        //     } else if (this.member == 'Mother In Law') {
        //         this.addonce3 = false;
        //     } else if (this.member == 'Son' && this.auto == false) {
        //         this.setArray[3].checkdisabled = false;
        //         this.setArray[2].checked = false;
        //         this.addonce4 = false;
        //         this.addonce5 = false;
        //     } else if (this.member == 'Daughter' && this.auto == false) {
        //         this.setArray[2].checkdisabled = false;
        //         this.setArray[3].checked = false;
        //
        //         this.addonce5 = false;
        //         this.addonce4 = false;
        //
        //     }
        //     if (!this.setArray[i].auto) {
        //         this.setArray.splice(i, 1);
        //
        //     }
        // } else {
        //     console.log(this.memberLength, 'this.memberLength');
        //     if (this.memberLength) {
        //         this.addonce4 = false;
        //         this.addonce5 = false;
        //     }
        //
        //     this.memberLength = [];
        // }
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
