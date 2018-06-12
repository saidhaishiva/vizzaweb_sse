import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import { LoginService } from '../../shared/services/login.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;
    userpermission: any;
    conps: boolean;
    newps: boolean;
    hide = true;
    roleid: any;
    clinicList: any;
    public loginResponse: any;
    public loginAssistantResponse: any;
    public assistantRoleid: any;
    public getSelfdoctor: any;
    public selectedDoctor: any;
    public getAssistantData: any;
    public activeAssistantLists: any;
    public getSelfDoctorDetails: Array<any>;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private route: ActivatedRoute, public loginService: LoginService, public authService: AuthService) {
        // this.settings = this.appSettings.settings;
        this.response = [];
        this.conps = true;
        this.newps = true;
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });
    }


    /**
     *
     */
    ngOnInit() {
        // this.settings.loadingSpinner = false;
        // this.authService.checkAuthentication();
    }

    /**
     *
     */
    public login(): void {
        if (this.form.valid) {
            // this.settings.loadingSpinner = true;
            const data = {
                'username': this.form.controls['username'].value,
                'password': this.form.controls['password'].value,
                'platform': 'web',
            };
            this.loginService.doLogin(data).subscribe(
                (successData) => {
                    this.loginSuccess(successData);
                },
                (error) => {
                    this.loginFailure(error);
                }
            );
        }
    }

    /**
     *
     * @param roleId
     * @param userId
     * @param doctorId
     */
    public assistingDetails(roleId, userId, doctorId, isActive): void {
        // const data = {
        //     'doctorid': doctorId,
        //     'userid': userId,
        //     'roleid': roleId,
        //     'assistantid': this.authService.getUserId() ?  this.authService.getUserId() : '',
        //     'platform': 'web',
        // };
        // this.settings.loadingSpinner = true;
        // this.loginService.assisting(data).subscribe(
        //     (successData) => {
        //         this.assistingSuccess(successData, isActive);
        //     },
        //     (error) => {
        //         this.assistingFailure(error);
        //     }
        // );
    }

    /**
     *
     * @param successData
     */
    public assistingSuccess(successData, isActive) {
        // this.settings.loadingSpinner = false;
        // this.response = successData;
        // console.log(this.response, 'this.response');
        //
        // this.clinicList = [];
        // if (this.response.IsSuccess) {
        //
        //     this.getAssistantData = this.response.ResponseObject.assistantData;
        //     this.activeAssistantLists = [];
        //     for (let i = 0; i < this.getAssistantData.length; i ++) {
        //         if (this.getAssistantData[i].status == 1) {
        //             this.activeAssistantLists.push(this.getAssistantData[i]);
        //         }
        //     }
        //     console.log(this.activeAssistantLists, 'this.activeAssistantLists');
        //
        //     this.authService.setSessionData('assistingDoctorList', JSON.stringify(this.activeAssistantLists));
        //     this.settings.assistantList = JSON.parse(this.authService.getSessionData('assistingDoctorList'));
        //
        //     if (this.authService.getSessionData('selfdoctor') != '0') {
        //         this.authService.setSessionData('selectedSelfDoctor', this.authService.getSessionData('selfdoctor'));
        //     } else {
        //         this.authService.setToken(
        //             this.getAssistantData[0].doctor_id,
        //             this.getAssistantData[0].doctorname,
        //             this.authService.getRoleId(),
        //             this.authService.getUserId(),
        //             this.authService.getAccessToken(),
        //             this.authService.getAssistantName()
        //         );
        //         for ( let i = 0; i < this.getAssistantData[0].permissions.length; i++) {
        //             if (this.getAssistantData[0].permissions[i] == 1) {
        //                 this.authService.setSessionData('juniorDoctor', true);
        //                 for ( let j = 0; j < this.getAssistantData[0].subpermissions.length; j++) {
        //                     if (this.getAssistantData[0].subpermissions[j] == 1) {
        //                         this.authService.setSessionData('confirmPrescription', true);
        //                     } else if (this.getAssistantData[0].subpermissions[j] == 2) {
        //                         this.authService.setSessionData('signPrescription', true);
        //                     }
        //                 }
        //
        //             } else if (this.getAssistantData[0].permissions[i] == 2) {
        //                 this.authService.setSessionData('reportsQueries', true);
        //             } else if (this.getAssistantData[0].permissions[i] == 3) {
        //                 this.authService.setSessionData('manageRecords', true);
        //             } else if (this.getAssistantData[0].permissions[i] == 4) {
        //                 this.authService.setSessionData('appoinmentsAvailability', true);
        //             }
        //         }
        //         for ( let i = 0; i < this.getAssistantData[0].clinic_id.length; i++) {
        //             this.clinicList.push(this.getAssistantData[0].clinic_id[i]);
        //         }
        //         this.authService.setSessionData('clinicPermissionList', JSON.stringify(this.clinicList));
        //     }
        //     console.log(isActive, 'isActive');
        //     if (isActive == 1) {
        //         this.router.navigate(['/dashboard']);
        //     } else {
        //         this.router.navigate(['/users']);
        //     }
        //
        // }
    }

    /**
     *
     * @param error
     */
    public assistingFailure(error) {
        // this.settings.loadingSpinner = false;
        // if (error.status === 401) {
        //     this.status = error.status;
        //     this.authService.clearToken();
        // } else if (error.status === 403) {
        //     this.status = error.status;
        //     this.authService.clearToken();
        // }
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                // invalid character, prevent input
                event.preventDefault();
            }
        }
    }

    /**
     *
     * @param successData
     */
    public loginSuccess(successData) {
        console.log(successData);
        this.router.navigate(['/dashboard']);
    }

    public loginFailure(error) {
   console.log(error);
    }
    public changeTheme(theme) {
        this.settings.theme = theme;
    }

}