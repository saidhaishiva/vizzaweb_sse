import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {AuthService} from './../../shared/services/auth.service';
import {LoginService} from './../../shared/services/login.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;
    newps = true;
    conps = true;

    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router,
                public loginService: LoginService, public authService: AuthService, private route: ActivatedRoute, public toaster: ToastrService) {
        this.settings = this.appSettings.settings;
        this.response = [];

        this.form = this.fb.group({
            'otp': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required])],
            'confirmPassword': ['', Validators.compose([Validators.required])]
        }, {validator: matchingPasswords('password', 'confirmPassword')});

    }

    public confirm(): void {
        if (this.form.valid) {

            this.settings.loadingSpinner = true;
            console.log(sessionStorage.token,'ppp');
            const data = {
                'mobilenumber': sessionStorage.username,
                'otp': this.form.controls['otp'].value,
                'password': this.form.controls['confirmPassword'].value,
                "platform": "web"
               // "patientid": 90
            };

            this.loginService.doConfirm(data).subscribe(
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
         if(successData.IsSuccess){
             this.toaster.success(successData.ResponseObject.msg, 'Success!!!');
             this.router.navigate(['/login']);
         } else {
             this.toaster.error(successData.ErrorObject,'Failed');
         }

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
