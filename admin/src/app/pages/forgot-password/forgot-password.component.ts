import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {AuthService} from './../../shared/services/auth.service';
import {LoginService} from './../../shared/services/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router,
                public loginService: LoginService, public authService: AuthService, private route: ActivatedRoute) {
        this.settings = this.appSettings.settings;
        this.response = [];

        this.form = this.fb.group({
            'mobile': ['', Validators.compose([Validators.required])]
        });
    }

    public forgot(): void {
        if (this.form.valid) {
            this.settings.loadingSpinner = true;
            sessionStorage.username = this.form.controls['mobile'].value;
            const data = {
                'mobile': this.form.controls['mobile'].value,
                "platform": "web",
                "roleid": 2
               // "patientid": 90
            };

            this.loginService.generateOtp(data).subscribe(
                (successData) => {
                    this.loginSuccess(successData);

                    console.log(successData,'successData');
                },
                (error) => {
                    this.loginFailure(error);
                }
            );
        }
    }

    ngOnInit() {
  }
    public loginSuccess(successData) {
        this.settings.loadingSpinner = false;
        this.response = successData;
        console.log(successData);
        // this.authService.setToken(this.response.age, this.response.patientid, this.response.token, this.response.familycode, this.response.roleid);
        this.router.navigate(['/confirmpassword']);
    }

    public loginFailure(error) {

        this.settings.loadingSpinner = false;
        console.log(error.status);
        if (error.status === 401) {
            this.status = error.status;
            this.authService.clearToken();
        } else if (error.status === 403) {
            this.status = error.status;
            this.authService.clearToken();
        }

        // need to display a toast
    }

}
