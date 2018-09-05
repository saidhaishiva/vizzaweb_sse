import { Component, OnInit, Inject } from '@angular/core';
import { Settings} from '../../../app.settings.model';
import { AppSettings} from '../../../app.settings';
import { ToastrService} from 'ngx-toastr';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { CategoryService} from '../../../shared/services/category.service';
import { AuthService} from '../../../shared/services/auth.service';
import { ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.scss']
})
export class UpdatecategoryComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    rows = [];
    public response: any;
    getDetails: any;
    public Status: any;

  constructor(public dialogRef: MatDialogRef<UpdatecategoryComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public categoryService: CategoryService, public auth: AuthService, public appSettings: AppSettings, private toastr: ToastrService  ) {
      this.settings = this.appSettings.settings;
      this.dialogRef.disableClose = true;
      this.getDetails = this.data;
      console.log(this.getDetails, 'this.getDetails');
      this.form = this.fb.group({
          'categoryname': ['', Validators.compose([Validators.required])],
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
      this.form.controls['categoryname'].patchValue(this.getDetails.category_name);
  }
    public editCategory(): void {
        if (this.form.valid) {
            const data = {
                'categoryname': this.form.controls['categoryname'].value,
                'adminid':  this.auth.getAdminId(),
                'categoryid': this.getDetails.category_id,
                'platform': 'web'
            };
            console.log(data);
            this.settings.loadingSpinner = true;
            this.categoryService.editCategory(data).subscribe(
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
            this.toastr.success(successData.ResponseObject,'Updated Succesfully');
        } else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public getCategoryFailure(error) {
        this.settings.loadingSpinner = false;
    }
}
