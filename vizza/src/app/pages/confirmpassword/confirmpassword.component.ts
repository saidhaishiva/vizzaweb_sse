import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {matchingPasswords} from "../../theme/utils/app-validators";
import {LoginService} from "../../shared/services/login.service";
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-verifyassistant',
    templateUrl: './confirmpassword.component.html',
    styleUrls: ['./confirmpassword.component.scss']
})
export class ConfirmpasswordComponent implements OnInit {

    public settings: Settings;
    public form: FormGroup;
    hide = true;
    messagelink: any;
    formhide: any;

    constructor(public appSettings: AppSettings, public router: Router, public fb: FormBuilder, public loginService: LoginService, private toastr: ToastrService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.form = this.fb.group({
            'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            'otp': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'newpassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirmpassword': ['', Validators.compose([Validators.required])]
        }, {validator: matchingPasswords('newpassword', 'confirmpassword')});
    }

    ngOnInit() {
        this.messagelink = true;
        this.formhide = false;
    }

    ngAfterViewInit() {
        this.settings.loadingSpinner = false;
    }

    changePassword() {
            if(this.form.valid) {
                const data = {
                    'mobilenumber': this.form.controls['mobilenumber'].value,
                    'otp': this.form.controls['otp'].value,
                    'password': this.form.controls['newpassword'].value,
                    'platform': 'web',
                };
                this.settings.loadingSpinner = true;
                this.loginService.changePassword(data).subscribe(
                    (successData) => {
                        this.changePasswordSuccess(successData);
                    },
                    (error) => {
                        this.changePasswordFailure(error);
                    }
                );
            }
    }

    public changePasswordSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.messagelink = false;
            this.formhide = true;
            this.toastr.success(successData.ResponseObject.msg, 'Success');
            this.router.navigate(['/pos'])
        } else {
            this.toastr.error(successData.ErrorObject, 'Failed');
            this.settings.loadingSpinner = false;
        }
    }

    public changePasswordFailure(error) {

        this.settings.loadingSpinner = false;
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

    public resendRequest(): void {
            this.settings.loadingSpinner = true;
            sessionStorage.username = this.form.controls['mobilenumber'].value;
            const data = {
                'mobile': this.form.controls['mobilenumber'].value,
                'platform': 'web',

            };

            this.loginService.doForgot(data).subscribe(
                (successData) => {
                    this.resendRequestSuccess(successData);
                },
                (error) => {
                    this.resendRequestFailure(error);
                }
            );
    }
    public resendRequestSuccess(successData) {
        this.settings.loadingSpinner = false;
        if(successData.IsSuccess) {
            this.toastr.success('OTP sent successfully');
        }else{
            this.toastr.warning(successData.ErrorObject, 'Failed');
        }

    }

    public resendRequestFailure(error) {
        this.settings.loadingSpinner = false;
        }
}
