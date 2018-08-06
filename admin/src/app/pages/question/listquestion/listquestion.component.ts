import { Component, OnInit } from '@angular/core';
import { Settings} from '../../../app.settings.model';
import { AppSettings} from '../../../app.settings';
import { ToastrService} from 'ngx-toastr';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { AuthService} from '../../../shared/services/auth.service';
import { CategoryService} from '../../../shared/services/category.service';
import { EditquestionComponent} from '../editquestion/editquestion.component';


@Component({
  selector: 'app-listquestion',
  templateUrl: './listquestion.component.html',
  styleUrls: ['./listquestion.component.scss']
})
export class ListquestionComponent implements OnInit {
    public settings: Settings;
    rows = [];
    subjectList: any;
    categoryList: any;
    temp = [];
    quesList: any;
    selectedCategory: any;
    categoryid: any;
    subjectid: any;
    getDetails: any;
    selectedSubject: any;


  constructor( public appSettings: AppSettings,  private toastr: ToastrService, public dialog: MatDialog, public auth: AuthService, public categoryService: CategoryService) {
      this.settings = this.appSettings.settings;
     //this.selectedSubject = '';
  }

  ngOnInit() {
      this.getCategoryList();
      //this.getSubjects('0');
        //this.getQuestions();
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
        console.log( successData.ResponseObject);
        this.settings.loadingSpinner = false;
        this.subjectList = successData.ResponseObject;
        this.selectedSubject = this.subjectList[0]['subject_id'];
        console.log(this.rows, 'this.rowsthis.rowsthis.rows');
        this.getQuestionList(this.selectedSubject);
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
    getSubjects(selected) {
        console.log(this.selectedCategory, 'pop');
        this.getSubjectList(selected);
    }

    public getCategorySuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        this.categoryList = successData.ResponseObject;
        this.selectedCategory = this.categoryList[0]['category_id'];
        this.getSubjects(this.selectedCategory);

    }
    public getCategoryFailure(error) {
    }

    getQuestions(){
        this.getQuestionList(this.selectedSubject);
    }
    getQuestionList(subjectId){
        this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
            'subjectid': subjectId
        };
        this.categoryService.getQuestionList(data).subscribe(
            (successData) => {
                this.getQuestionSuccess(successData);

            },
            (error) => {
                this.getQuestionFailure(error);
            }
        );
    }
    public getQuestionSuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        this.quesList = successData.ResponseObject;
        this.rows = this.quesList;

    }
    public getQuestionFailure(error) {
        this.settings.loadingSpinner = false;
    }
    openEdit(value): void {
        console.log(value, 'value');
        let dialogRef = this.dialog.open(EditquestionComponent, {
            width: '500px',
            data: value
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
            if (result) {
                this.getQuestions();
            }
        });

    }
    public deleteQuestion(value) {
        // this.settings.loadingSpinner = true;
        const data = {
            'adminid': this.auth.getAdminId(),
            'platform': 'web',
            'questionid': value.question_id,
        };
        this.categoryService.deleteQuestion(data).subscribe(
            (successData) => {
                this.deleteQuestionSuccess(successData);
            },
            (error) => {
                this.deleteQuestionFailure(error);
            }
        );
    }
    public deleteQuestionSuccess(successData) {
        console.log(successData, 'successData');
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            this.getQuestionList(this.selectedSubject);
            this.toastr.success(successData.ResponseObject,'Deleted Successfully');
        }else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public deleteQuestionFailure(error) {
    }
}
