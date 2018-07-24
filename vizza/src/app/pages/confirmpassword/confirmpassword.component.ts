import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {matchingPasswords} from "../../theme/utils/app-validators";
import {LoginService} from "../../shared/services/login.service";
import {ToastrService} from 'ngx-toastr';

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

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public loginService: LoginService, private toastr: ToastrService) {
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

    verifyAssistant() {
        if (this.form.valid) {
            this.settings.loadingSpinner = true;
            const data = {
                'mobile': this.form.controls['mobilenumber'].value,
                'otpcode': this.form.controls['otp'].value,
                'password': this.form.controls['newpassword'].value,
                'platform': 'web',
            };

            this.loginService.getVerifyAssistant(data).subscribe(
                (successData) => {
                    this.verifyAssistantSuccess(successData);

                    console.log(successData, 'successData');
                },
                (error) => {
                    this.verifyAssistantFailure(error);
                }
            );
        }
    }

    public verifyAssistantSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            this.messagelink = false;
            this.formhide = true;
        } else {
            this.toastr.error(successData.ErrorObject);
            this.settings.loadingSpinner = false;
        }
    }

    public verifyAssistantFailure(error) {

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

    resendRequest() {
        const data = {
            'mobile': this.form.controls['mobilenumber'].value,
            'platform': 'web',
        };
        this.loginService.getResendRequest(data).subscribe(
            (successData) => {
                this.resendRequestSuccess(successData);

                console.log(successData, 'successData');
            },
            (error) => {
                this.resendRequestFailure(error);
            }
        );

    }

    public resendRequestSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success('Request Sent Successfully');

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public resendRequestFailure(error) {
        this.toastr.error('Invalid credentials', 'Request Failed');
    }
}
