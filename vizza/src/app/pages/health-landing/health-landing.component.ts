import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {HealthService} from '../../shared/services/health.service';

@Component({
  selector: 'app-health-landing',
  templateUrl: './health-landing.component.html',
  styleUrls: ['./health-landing.component.scss']
})
export class HealthLandingComponent implements OnInit {
public form: FormGroup;
public healthLandingSubmit: any;


  constructor(public fb: FormBuilder,public common: HealthService, public toastr: ToastrService , public router: Router) {
    this.form = this.fb.group({
      'firstName': ['', Validators.required],
      'mobile': ['', Validators.required],
      'emailId': ['', Validators.compose([Validators.required, Validators.pattern("^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")])],


    });
  }

  ngOnInit() {
  }

  landingSubmit() {

    const data = {
      "platform":"web",
      "name" : this.form.controls['firstName'].value,
      "email_id" : this.form.controls['emailId'].value,
      "mobile_no": this.form.controls['mobile'].value,
      "city": "fftfty",
      "insurance_type":"health"
    }
    this.common.healthLandingProposal(data).subscribe(
        (successData) => {
          this.healthLandingSuccess(successData);
        },
        (error) => {
          this.healthLandingFailure(error);
        }
    );
  }
  public healthLandingSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.healthLandingSubmit =  successData.ResponseObject;
      this.toastr.success(this.healthLandingSubmit);
      this.router.navigate(['/home']);
    } else {
      this.toastr.error(successData.ErrorObject);
    }


  }
  public healthLandingFailure(error) {
  }


}
