import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Settings} from '../../app.settings.model';
import {LoginService} from '../../shared/services/login.service';
import {AuthService} from '../../shared/services/auth.service';
import {AppSettings} from '../../app.settings';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dm-login',
  templateUrl: './dm-login.component.html',
  styleUrls: ['./dm-login.component.scss']
})
export class DmLoginComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public status: any;
    conps: boolean;
    newps: boolean;
    hide = true;
    data: any;
    constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private route: ActivatedRoute, public loginService: LoginService, public authService: AuthService,  public toast: ToastrService,) {
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
        if ( this.settings.userId > 0) {
            this.router.navigate(['/dm-profile']);
        }
    }
  ngOnInit() {
  }
    public login(): void {
        if (this.form.valid) {
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
        console.log(successData);
        if (successData.IsSuccess) {
            this.data = successData.ResponseObject.dm_details;
            this.authService.setTokenDm(this.data.dm_email, this.data.dm_firstname, this.data.dm_id, this.data.dm_lastname, this.data.dm_mobileno, this.data.dm_roleid, successData.ResponseObject.Accesstoken, this.data.dm_status);
            this.authService.setSessionData('dmStatus', this.data.dm_status);
            this.authService.setSessionData('dmTrainingStatus', this.data.training_status);
            this.authService.setSessionData('dmExamStatus', this.data.exam_status);
            this.authService.setSessionData('dmDocumentStatus', this.data.doc_verified_status);
            // training_status
            this.settings.userId = this.authService.getDmUserId();
            this.settings.username = this.authService.getDmFirstName() +' '+ this.authService.getDmLastName();
            this.router.navigate(['/dm-profile']);
        } else {
            this.toast.error(successData.ErrorObject);
        }
    }

    public loginFailure(error) {
        console.log(error);
    }
    public changeTheme(theme) {
        this.settings.theme = theme;
    }

}
