import { Component, OnInit } from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AuthService} from '../../shared/services/auth.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonService} from '../../shared/services/common.service';
import { AppSettings} from '../../app.settings';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    data: any;
  constructor(public fb: FormBuilder, public commonService: CommonService, public auth: AuthService, public toastr: ToastrService, public appSettings: AppSettings) {
      this.settings = this.appSettings.settings;
      console.log(this.settings);
      this.form = this.fb.group({
          'name': ['', Validators.compose([Validators.required])],
          'email': ['', Validators.compose([Validators.required])],
          'subject': ['', Validators.compose([Validators.required])],
          'message': ['', Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
  }
    public contactDetails(): void {
        if (this.form.valid) {
            const data = {
                'name': this.form.controls['name'].value,
                'email': this.form.controls['email'].value,
                'subject': this.form.controls['subject'].value,
                'message': this.form.controls['message'].value,
                'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
                'pos_status': this.auth.getPosStatus() ? this.auth.getPosStatus() : 0,
                'platform': 'web'
            };
            console.log(data);
            this.commonService.contactDetails(data).subscribe(
                (successData) => {
                    this.getDetailsSuccess(successData);
                },
                (error) => {
                    this.getDetailsFailure(error);
                }
            );
        }
    }
    public getDetailsSuccess(successData) {
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            console.log(successData.ResponseObject, 'successData.ResponseObject');
            this.data = successData.ResponseObject;
        } else {
            this.toastr.success('Contact details added successfully');
        }
    }

    // handle error data

    public getDetailsFailure(error) {
        console.log(error);
        this.settings.loadingSpinner = false;
    }
}
