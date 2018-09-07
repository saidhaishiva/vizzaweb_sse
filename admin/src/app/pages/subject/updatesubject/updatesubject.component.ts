import { Component, OnInit,Inject } from '@angular/core';
import { Settings} from '../../../app.settings.model';
import { AppSettings} from '../../../app.settings';
import { ToastrService} from 'ngx-toastr';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { CategoryService} from '../../../shared/services/category.service';
import { AuthService} from '../../../shared/services/auth.service';
import { ActivatedRoute,Router} from '@angular/router';
import {UpdatecategoryComponent} from '../../category/updatecategory/updatecategory.component';
@Component({
  selector: 'app-updatesubject',
  templateUrl: './updatesubject.component.html',
  styleUrls: ['./updatesubject.component.scss']
})
export class UpdatesubjectComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    rows = [];
    categoryList: any;
    public response: any;
    getDetails: any;

  constructor(public dialogRef: MatDialogRef<UpdatesubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public categoryService: CategoryService, public auth: AuthService, public appSettings: AppSettings, private toastr: ToastrService  ) {
      this.settings = this.appSettings.settings;
      this.dialogRef.disableClose = true;
      this.getDetails = data;
      console.log(this.getDetails, 'this.getDetails');
      this.form = this.fb.group({
          'categoryid': ['', Validators.compose([Validators.required])],
          'subjectname': ['', Validators.compose([Validators.required])]
      });
      this.getCategoryList();

  }
    onNoClick(): void {
        this.dialogRef.close();
    }
  ngOnInit() {
      this.form.controls['categoryid'].patchValue([this.getDetails.category_id]);
      this.form.controls['subjectname'].patchValue(this.getDetails.subject_name);
  }
    public editSubject(): void {
        if (this.form.valid) {
            const data = {
                'subjectname': this.form.controls['subjectname'].value,
                'adminid':  this.auth.getAdminId(),
                'categoryid': this.form.controls['categoryid'].value,
                'subjectid': this.getDetails.subject_id,
                'platform': 'web'
            };
            console.log(data);
            this.settings.loadingSpinner = true;
            this.categoryService.editSubject(data).subscribe(
                (successData) => {
                    this.getSubjectSuccess(successData);
                },
                (error) => {
                    this.getSubjectFailure(error);
                }
            );
        }
    }
    public getSubjectSuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.dialogRef.close(true);
            this.response = successData.ResponseObject;
            this.toastr.success(successData.ResponseObject);
        } else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public getSubjectFailure(error) {
        this.settings.loadingSpinner = false;

    }
    public getCategoryList() {
        // this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
        };
        this.categoryService.getCategoryList(data).subscribe(
            (successData) => {
                this.getCategorySuccess(successData);

            },
            (error) => {
                this.getCategoryFailure(error);
            }
        );
    }
    public getCategorySuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        this.categoryList = successData.ResponseObject;
        this.rows = this.categoryList;
        console.log(this.rows, 'this.rowsthis.rowsthis.rows');

    }
    public getCategoryFailure(error) {
    }
}
