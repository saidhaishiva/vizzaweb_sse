import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Settings} from '../../app.settings.model';
import {AppSettings} from '../../app.settings';
import { ConfigurationService } from '../../shared/services/configuration.service';
import { listTransition } from '../../theme/utils/app-animation';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { CommonService } from '../../shared/services/common.service';
import {DocumentViewComponent} from './document-view/document-view.component';

declare var google: any;

@Component({
    selector: 'app-posprofile',
    templateUrl: './posprofile.component.html',
    styleUrls: ['./posprofile.component.scss'],
    animations: [ listTransition ],
    host: {
        '[@listTransition]': ''
    }
})
export class PosprofileComponent implements OnInit {
    public settings: Settings;
    public personal: any;
    public webhost: any;
    public sideNav: any;
    public currentTab: any;
    public selectedTab: any;
    public examSchedule: any;
    public examStatus: any;
    public trainingStatus: any;
    public documentStatus: any;
    public trainingDetails: any;
    public examDetails: any;
    public recentMark: any;
    public posStatus: any;
    public startTrainingDate: any;
    public posDataAvailable : boolean;

    @ViewChild('sidenav') sidenav: any;
    public sidenavOpen:boolean = true;

    constructor(public route: ActivatedRoute, public auth: AuthService, public common: CommonService, public appSettings: AppSettings, public config: ConfigurationService, public dialog: MatDialog, public router: Router) {
        this.webhost = this.config.getimgUrl();
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.examStatus = this.auth.getSessionData('examStatus');
        this.trainingStatus = sessionStorage.trainingStatus;
        this.documentStatus = this.auth.getSessionData('documentStatus');
        this.posStatus = this.auth.getSessionData('posStatus');

        this.sideNav = [];
        console.log(this.documentStatus, 'this.documentStatus');
        this.posDataAvailable = false;
        this.currentTab = 'personal';
        this.getPosProfile();


    }

    ngOnInit() {


        this.getTrainingDetails();
        this.getExamDetails();
        // this.settings.loadingSpinner = false;
        this.currentTab = 'Personal';
        if (this.documentStatus != 2 || this.documentStatus == 2) {
            this.sideNav = [{
                'name': 'Personal',
                'value': 'active',
                'selected': false
            }, {
                'name': 'Contact',
                'value': 'active',
                'selected': false
            },{
                'name': 'Documents',
                'value': 'active',
                'selected': false
            },
                {
                    'name': 'Bank Details',
                    'value': 'active',
                    'selected': false
                },
                {
                    'name': 'Education',
                    'value': 'active',
                    'selected': false
                }];
        }
        if (this.documentStatus == 2 ) {
            this.sideNav.push({
                    'name': 'Training',
                    'value': 'active',
                    'selected': false
                },
                {
                    'name': 'Examination',
                    'value': 'active',
                    'selected': false
                });

        }

        if (this.documentStatus == 2 && this.trainingStatus == 1) {
            this.sideNav.push({'name': 'Certificate of Training', 'value': 'active', 'selected': false});
        }
        if (this.documentStatus == 2 && this.examStatus == 2) {
            this.sideNav.push({'name': 'Certificate of Examination', 'value': 'active', 'selected': false});
        }
        if (this.posStatus == 1 ) {
            this.sideNav.push(
                {
                    'name': 'Appointment Letter',
                    'value': 'active',
                    'selected': false
                },
                {
                    'name': 'Agreement Letter',
                    'value': 'active',
                    'selected': false
                },);
        }
        // if (this.documentStatus == 2) {
        //     this.sideNav = [{
        //         'name': 'Personal',
        //         'value': 'active',
        //         'selected': false
        //     },{
        //         'name': 'Contact',
        //         'value': 'active',
        //         'selected': false
        //     },
        //         {
        //             'name': 'Documents',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Bank Details',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Education',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Training',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Examination',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Approval Letter',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Appointment Letter',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Certificate of Training',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Certificate of Examination',
        //             'value': 'active',
        //             'selected': false
        //         },
        //         {
        //             'name': 'Payment Options',
        //             'value': 'active',
        //             'selected': false
        //         }
        //     ];
        // }


        this.sideNav[0].selected = true;
    }

    viewDetail(i, value) {
        // this.sideNav[i].selected = true;
        this.selectedTab = i;
        this.currentTab = value;
        let trainingStatus = sessionStorage.trainingStatus;
        let examStatus = sessionStorage.examStatus;
        sessionStorage.currentTab = this.currentTab;

        if (value == 'Training') {
            if (trainingStatus == 0) {
                this.settings.loadingSpinner = true;
                this.router.navigate(['/training']);
            }
        } else if (value == 'Examination') {

            if (trainingStatus == 0) {
                this.examSchedule = 'Please complete training before applying the exam';
            } else if (examStatus == '0') {
                this.router.navigate(['/startexam']);
            }
        }
    }

    public getPosProfile() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getPosProfile(data).subscribe(

            (successData) => {
                this.getPosProfileSuccess(successData);

            },
            (error) => {
                this.getPosProfileFailure(error);
            }
        );
    }
    getPosProfileSuccess(successData) {
        console.log(successData, 'datadatadatadatadatadatadata');
        if (successData.IsSuccess) {
            this.personal = successData.ResponseObject;
            this.posStatus = this.personal.pos_status;
            this.posDataAvailable = true;
            this.auth.setSessionData('documentStatus', this.personal.doc_verified_status);
            console.log(this.personal.exam_status, 'statuse');
            if (this.personal.exam_status == 2) {
                this.auth.setSessionData('examStatus', this.personal.exam_status);
            }

        }
    }

    getPosProfileFailure(error) {
        console.log(error);
    }
    viewImage(path, title) {
        const dialogRef = this.dialog.open(DocumentViewComponent, {
            width: '800px',
            data: {'img': path, 'title': title}

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    public getTrainingDetails() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getTrainingDetails(data).subscribe(
            (successData) => {
                this.getTrainingDetailSuccess(successData);

            },
            (error) => {
                this.getTrainingDetailFailure(error);
            }
        );
    }
    getTrainingDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.trainingDetails = successData.ResponseObject;
            if (typeof (this.trainingDetails) != 'string') {

                for (let i = 0; i < this.trainingDetails.length; i++) {
                    let num = this.trainingDetails[i].entry_time;
                    let hours = (num / 60);
                    let rhours = Math.floor(hours);
                    let minutes = (hours - rhours) * 60;
                    let rminutes = Math.round(minutes);
                    this.trainingDetails[i].time = rhours + " hour(s) and " + rminutes + " minute(s).";
                }


                // let len = successData.ResponseObject.length -1;
                this.startTrainingDate = this.trainingDetails[0].training_attend_date;
            }
        }
    }
    getTrainingDetailFailure(error) {
        console.log(error);
    }
    public getExamDetails() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getPosRoleId(),
            'userid': this.auth.getPosUserId(),
            'pos_id': this.auth.getPosUserId()
        };
        this.common.getExamDetails(data).subscribe(
            (successData) => {
                this.getExamDetailSuccess(successData);

            },
            (error) => {
                this.getExamDetailFailure(error);
            }
        );
    }
    getExamDetailSuccess(successData) {
        console.log(successData);
        if (successData.IsSuccess) {
            this.examDetails = successData.ResponseObject;
            let len = successData.ResponseObject.length -1;
            this.recentMark = this.examDetails[len].percentage_in_exam;
        }
    }
    getExamDetailFailure(error) {
        console.log(error);
    }
    // print the Appointment letter
    printAppointment () {
        let printContents, popupWin;
        printContents = document.getElementById('appointment').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the training letter
    printTraining () {
        let printContents, popupWin;
        printContents = document.getElementById('training').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }
    // print the examination letter
    printExamination () {
        let printContents, popupWin;
        printContents = document.getElementById('examination').innerHTML;
        popupWin = window.open('', '_blank', 'top=100,left=0, bottom=100,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head >
         <style>
        </style>
        </head>
       <body onload="window.print();window.close()" >${printContents}
       </body>
        
      
      </html>`
        );
        popupWin.document.close();
    }


}


