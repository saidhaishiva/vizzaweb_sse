import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';
import {ValidationService} from '../../shared/services/validation.service';
import { AppSettings } from '../../app.settings';
@Component({

    selector: 'app-health-landing',
    templateUrl: './health-landing.component.html',
    styleUrls: ['./health-landing.component.scss']

})

export class HealthLandingComponent implements OnInit {

    public form: FormGroup;
    public healthLandingSubmit: any;
    public settings: any;
    public healthLandingPage: any;

​constructor(public fb: FormBuilder,public common: HealthService, public toastr: ToastrService , public router: Router, public validation: ValidationService,public appSettings: AppSettings) {

        this.healthLandingPage=true;
        this.settings = this.appSettings.settings;
        this.settings.HomeSidenavUserBlock = false;
        this.settings.sidenavIsOpened = false;
        this.settings.fixedHeader=false,
        this.settings.sidenavIsPinned = false;

        this.form = this.fb.group({
            'firstName': ['', Validators.required],
            'mobile': [null, Validators.compose([Validators.pattern('[6-9]\\d{9}')])],
            'emailId': [null, Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],
        });


}

​ngOnInit() {

    // this.landingSubmit()

}

​

landingSubmit(value) {

    if(this.form.valid){
        const data = {
            "platform":"web",
            "name" : this.form.controls['firstName'].value,
            "email_id" : this.form.controls['emailId'].value,
            "mobile_no": this.form.controls['mobile'].value,
            "city": "fftfty",
            "insurance_type":"health"
        }
        // alert("2")
        this.settings.loadingSpinner = true;
        this.common.healthLandingProposal(data).subscribe(
            (successData) => {
                this.healthLandingSuccess(successData);
                },
            (error) => {
                this.healthLandingFailure(error);
            });
    }
    else{
        this.toastr.error('All Fields Are Mandatory');
    }
}
public healthLandingSuccess(successData) {
     this.settings.loadingSpinner = false;
​       if (successData.IsSuccess == true) {
            this.healthLandingSubmit =  successData.ResponseObject;
            this.toastr.success(this.healthLandingSubmit);
            this.router.navigate(['/home']);
       } else {
        // this.toastr.error(successData.ErrorObject);
        this.toastr.error('Please Enter Correct Format ');
    }

}
public healthLandingFailure(error) {

}

​//validation

    nameValidate(event: any) {
    this.validation.nameValidate(event);
    }

​numberValidate(event: any) {
    this.validation.numberValidate(event);
}

​

}
