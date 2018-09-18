import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {emailValidator} from '../../theme/utils/app-validators';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import { LoginService } from '../../shared/services/login.service';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

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
           this.router.navigate(['/pos-profile']);
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
            this.data = successData.ResponseObject.pos_details;
            this.authService.setToken(this.data.pos_email, this.data.pos_firstname, this.data.pos_id, this.data.pos_lastname, this.data.pos_mobileno, this.data.pos_roleid, successData.ResponseObject.Accesstoken, this.data.pos_status);
            this.authService.setSessionData('posStatus', this.data.pos_status);
            this.authService.setSessionData('trainingStatus', this.data.training_status);
            this.authService.setSessionData('examStatus', this.data.exam_status);
            this.authService.setSessionData('documentStatus', this.data.doc_verified_status);
            // training_status
            this.settings.userId = this.authService.getPosUserId();
            this.settings.username = this.authService.getPosFirstName() +' '+ this.authService.getPosLastName();
            this.router.navigate(['/home']);
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
