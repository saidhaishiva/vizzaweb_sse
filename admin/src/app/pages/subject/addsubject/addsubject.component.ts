import { Component, OnInit, Inject } from '@angular/core';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {ToastrService} from 'ngx-toastr';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ConfigurationService} from '../../../shared/services/configuration.service';
import {CategoryService} from '../../../shared/services/category.service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.scss']
})
export class AddsubjectComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    public response: any;
    categoryList: any;
    rows = [];
    temp = [];
  constructor(public dialogRef: MatDialogRef<AddsubjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              , public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService, public auth: AuthService,
              public config: ConfigurationService, public categoryService: CategoryService, public fb: FormBuilder) {
      this.settings = this.appSettings.settings;
      this.dialogRef.disableClose = true;
      this.form = this.fb.group({
          'categoryid': ['', Validators.compose([Validators.required])],
          'subjectname': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      });
  }
    onNoClick(): void {
        this.dialogRef.close();
    }
  ngOnInit() {
      this.getCategoryList();
  }
    public addSubject(): void {

        if (this.form.valid) {

            const data = {
                'categoryid': this.form.controls['categoryid'].value,
                'subjectname': this.form.controls['subjectname'].value,
                'adminid': this.auth.getAdminId(),
                'platform': 'web'
            };
            console.log(data);
            this.settings.loadingSpinner = true ;
            this.categoryService.addSubject(data).subscribe(
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
            this.toastr.success(successData.ResponseObject,'Added Successfully');
        }else {
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
        console.log(data);
        this.settings.loadingSpinner = true;
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
        this.settings.loadingSpinner = false;
    }
}
