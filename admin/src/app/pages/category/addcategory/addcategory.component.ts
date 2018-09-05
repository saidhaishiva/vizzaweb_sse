import { Component, OnInit, Inject } from '@angular/core';
import { Settings} from '../../../app.settings.model';
import { AppSettings} from '../../../app.settings';
import { ToastrService} from 'ngx-toastr';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {CategoryService} from '../../../shared/services/category.service';
import {ActivatedRoute,Router} from '@angular/router';
import {AddsubjectComponent} from '../../subject/addsubject/addsubject.component';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    public Status: any;

  constructor(public dialogRef: MatDialogRef<AddsubjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
      , public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService, public auth: AuthService,
              public config: ConfigurationService, public categoryService: CategoryService, public fb: FormBuilder) {
      this.settings = this.appSettings.settings;
      this.dialogRef.disableClose = true;
      console.log(data,'data');
      this.form = this.fb.group({
          'categoryname': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
          'status':['',Validators.compose([Validators.required])]

      });
      this.Status = [
          {value: '0', viewValue: 'Inactive'},
          {value: '1', viewValue: 'Active'}
      ];
      this.form.controls['status'].patchValue(this.Status[1].value);
  }
    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit() {
  }

    public addCategory(): void {
        if (this.form.valid) {

            const data = {
                'categoryname': this.form.controls['categoryname'].value,
                'adminid': this.auth.getAdminId(),
                'platform': 'web'
            };
            console.log(data);
            this.settings.loadingSpinner = true;
            this.categoryService.addCategory(data).subscribe(
                (successData) => {
                    this.getCategorySuccess(successData);
                },
                (error) => {
                    this.getCategoryFailure(error);
                }
            );
        }
    }
    public getCategorySuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close(true);
            this.response = successData.ResponseObject;
            this.toastr.success(successData.ResponseObject,'Added Successfully');
        }else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public getCategoryFailure(error) {
        this.settings.loadingSpinner = false;
    }
}
