import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Settings} from '../../app.settings.model';
import {LoginService} from '../../shared/services/login.service';
import {AuthService} from '../../shared/services/auth.service';
import {AppSettings} from '../../app.settings';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dm-forgotpassword',
  templateUrl: './dm-forgotpassword.component.html',
  styleUrls: ['./dm-forgotpassword.component.scss']
})
export class DmForgotpasswordComponent implements OnInit {

    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router,
                public loginService: LoginService, public authService: AuthService, private route: ActivatedRoute, public toastr: ToastrService ) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.response = [];

        this.form = this.fb.group({
            'mobilenumber': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
        });
    }

    ngAfterViewInit(){
        this.settings.loadingSpinner = false;
    }

    ngOnInit() {
    }
    public forgot(): void {
        if (this.form.valid) {
            this.settings.loadingSpinner = true;
            sessionStorage.username = this.form.controls['mobilenumber'].value;
            const data = {
                'mobile': this.form.controls['mobilenumber'].value,
                'platform': 'web',

            };

            this.loginService.dmForgot(data).subscribe(
                (successData) => {
                    this.forgotSuccess(successData);
                },
                (error) => {
                    this.forgotFailure(error);
                }
            );
        }
    }
    public forgotSuccess(successData) {
        this.settings.loadingSpinner = false;
        this.response = successData;
        if(successData.IsSuccess) {
            this.toastr.success('OTP sent successfully');
            this.router.navigate(['/dm-confirmpassword']);
        }else{
            this.toastr.warning(successData.ErrorObject, 'Failed');
        }

    }

    public forgotFailure(error) {
        this.settings.loadingSpinner = false;
        if (error.status === 401) {
            this.status = error.status;
            this.authService.clearToken();
        } else if (error.status === 403) {
            this.status = error.status;
            this.authService.clearToken();
        }

        // need to display a toast
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

}
