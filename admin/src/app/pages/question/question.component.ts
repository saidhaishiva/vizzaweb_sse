import { Component, OnInit ,Inject} from '@angular/core';
import { Settings} from '../../app.settings.model';
import { AppSettings} from '../../app.settings';
import { ToastrService} from 'ngx-toastr';
import {FormGroup, FormBuilder,  Validators} from '@angular/forms';
import { AuthService} from '../../shared/services/auth.service';
import { CategoryService} from '../../shared/services/category.service';
import { ActivatedRoute,Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    rows = [];
    subjectList: any;
    categoryList: any;
    selectedCategory: any;
    categoryid: any;
    subjectid: any;
    getDetails: any;
    selected = [];
    Status: any;

  constructor( public appSettings: AppSettings,  private toastr: ToastrService, public auth: AuthService,
               public config: ConfigurationService, public categoryService: CategoryService, public fb: FormBuilder) {
    this.settings = this.appSettings.settings;
      this.form = this.fb.group({
          'subjectid': ['', Validators.compose([Validators.required])],
          'question': ['', Validators.compose([Validators.required])],
          'optionA': ['', Validators.compose([Validators.required])],
          'optionB': ['', Validators.compose([Validators.required])],
          'optionC': ['', Validators.compose([Validators.required])],
          'optionD': ['', Validators.compose([Validators.required])],
          'optionE': ['', Validators.compose([Validators.required])],
          'correctanswer': ['', Validators.compose([Validators.required])],
          'status':['',Validators.compose([Validators.required])]
      });

  }

  ngOnInit() {
      this.getCategoryList();
      this.getSubjects('0');
      this.Status = [
          {value: '0', viewValue: 'Inactive'},
          {value: '1', viewValue: 'Active'}
      ];
      this.form.controls['status'].patchValue(this.Status[1].value);
      this.form.controls['subjectid'].patchValue(this.subjectid);
  }
    public addQuestions(): void {

        this.settings.loadingSpinner = true;
            const data = {
                'subjectid': this.subjectid,
                'question': this.form.controls['question'].value,
                'optionA': this.form.controls['optionA'].value,
                'optionB': this.form.controls['optionB'].value,
                'optionC': this.form.controls['optionC'].value,
                'optionD': this.form.controls['optionD'].value,
                'optionE': this.form.controls['optionE'].value,
                'correctanswer': this.form.controls['correctanswer'].value,
                'status': this.form.controls['status'].value,
                'adminid': this.auth.getAdminId(),
                'platform': 'web'
            };
            console.log(data);

            this.categoryService.addQuestions(data).subscribe(
                (successData) => {
                    this.getQuestionsSuccess(successData);
                },
                (error) => {
                    this.getQuestionsFailure(error);
                }
            );

    }
    public getQuestionsSuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
                this.toastr.success(successData.ResponseObject,'Added Successfully');
        }else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public getQuestionsFailure(error) {
        this.settings.loadingSpinner = false;
    }
    getSubjects(selected) {
        console.log(this.selectedCategory, 'pop');
        this.getSubjectList(selected);
    }

    public getSubjectList(values) {

        console.log(values, 'values');

          this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
            'categoryid': values == '0' ? []: [values]
        };
        this.categoryService.getSubjectList(data).subscribe(
            (successData) => {
                this.getSubjectSuccess(successData);

            },
            (error) => {
                this.getSubjectFailure(error);
            }
        );
    }
    public getSubjectSuccess(successData) {
        this.settings.loadingSpinner = false;
        this.subjectList = successData.ResponseObject;
    }
    public getSubjectFailure(error) {
        this.settings.loadingSpinner = false;
    }

    public getCategory(selected) {
        this.getSubjectList(selected);

    }
    public getCategoryList() {
        //  this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web'
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
