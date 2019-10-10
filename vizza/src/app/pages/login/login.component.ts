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
    conps: boolean;
    newps: boolean;
    hide = true;
    data: any;
    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private route: ActivatedRoute, public loginService: LoginService, public authService: AuthService) {
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.sidenavIsPinned = false;
        this.response = [];
        this.conps = true;
        this.newps = true;
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });
    }


    ngOnInit() {
        sessionStorage.setFamilyDetails = '';
        sessionStorage.setInsuredAmount = '';
        sessionStorage.setPincode = '';
        sessionStorage.setPage = '';
        sessionStorage.policyLists = '';
        sessionStorage.sideMenu = '';
        sessionStorage.sonBTn = '';
        sessionStorage.daughterBTn = '';
        sessionStorage.fatherBTn = '';
        sessionStorage.motherBtn = '';
        sessionStorage.fatherInLawBTn = '';
        sessionStorage.motherInLawBtn = '';

    }

    public login(): void {
        if (this.form.valid) {
            const data = {
                'username': this.form.controls['username'].value,
                'password': this.form.controls['password'].value,
                'platform': 'web',
            };
            this.settings.loadingSpinner = true;
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
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);

            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
    public loginSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.data = successData.ResponseObject.pos_details;
            this.authService.setToken(this.data.pos_email, this.data.pos_firstname, this.data.pos_id, this.data.pos_lastname, this.data.pos_mobileno, this.data.pos_roleid, successData.ResponseObject.Accesstoken,  this.data.pos_status, this.data.pos_userid)
            this.router.navigate(['/home']);
        }
    }

    public loginFailure(error) {
        this.settings.loadingSpinner = false;
    }
    public changeTheme(theme) {
        this.settings.theme = theme;
    }

}
