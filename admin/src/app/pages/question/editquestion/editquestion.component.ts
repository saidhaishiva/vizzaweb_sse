import { Component, OnInit ,  Inject} from '@angular/core';
import { Settings} from '../../../app.settings.model';
import { AuthService} from '../../../shared/services/auth.service';
import { CategoryService} from '../../../shared/services/category.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {AppSettings} from '../../../app.settings';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-editquestion',
  templateUrl: './editquestion.component.html',
  styleUrls: ['./editquestion.component.scss']
})
export class EditquestionComponent implements OnInit {
    public form: FormGroup;
    public settings: Settings;
    rows = [];
    public response: any;
    getQuestions: any;
    subjectList: any;
    selected : any;
    Status: any;

  constructor(public dialogRef: MatDialogRef<EditquestionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public appSettings: AppSettings, public fb: FormBuilder, public auth: AuthService, public categoryService: CategoryService, private toastr: ToastrService) {
      this.settings = this.appSettings.settings;
      console.log(this.data,'asdsadasd');
      this.getQuestions= data;
      this.form = this.fb.group({
          'subjectid': ['', Validators.compose([Validators.required])],
          'questions': ['', Validators.compose([Validators.required])],
          'optionA': ['', Validators.compose([Validators.required])],
          'optionB': ['', Validators.compose([Validators.required])],
          'optionC': ['', Validators.compose([Validators.required])],
          'optionD': ['', Validators.compose([Validators.required])],
          'optionE': ['', Validators.compose([Validators.required])],
          'correctanswer': ['', Validators.compose([Validators.required])],
          'status': ['', Validators.compose([Validators.required])],
      });
  }
    onNoClick(): void {
        this.dialogRef.close();
    }
  ngOnInit() {
      this.Status = [
          {value: '0', viewValue: 'Inactive'},
          {value: '1', viewValue: 'Active'}
      ];
      this.form.controls['status'].patchValue(this.Status[1].value);

      this.form.controls['questions'].patchValue(this.getQuestions.question);
      this.form.controls['optionA'].patchValue(this.getQuestions.option_a);
      this.form.controls['optionB'].patchValue(this.getQuestions.option_b);
      this.form.controls['optionC'].patchValue(this.getQuestions.option_c);
      this.form.controls['optionD'].patchValue(this.getQuestions.option_d);
      this.form.controls['optionE'].patchValue(this.getQuestions.option_e);
      this.form.controls['correctanswer'].patchValue(this.getQuestions.correct_answer);
      this.form.controls['status'].patchValue(this.getQuestions.question_status);
  }

    public editQuestions(): void {

            const data = {
                'questions': this.form.controls['questions'].value,
                'adminid':  this.auth.getAdminId(),
                'questionid': this.getQuestions.question_id,
                'subjectid': this.getQuestions.subject_id,
                'question': this.form.controls['questions'].value,
                'optionA': this.form.controls['optionA'].value,
                'optionB': this.form.controls['optionB'].value,
                'optionC': this.form.controls['optionC'].value,
                'optionD': this.form.controls['optionD'].value,
                'optionE': this.form.controls['optionE'].value,
                'correctanswer': this.form.controls['correctanswer'].value,
                'status': this.form.controls['status'].value,
                'platform': 'web'
            };
            console.log(data);
            this.settings.loadingSpinner = true;
            this.categoryService.editQuestions(data).subscribe(
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
            this.dialogRef.close(true);
            this.response = successData.ResponseObject;
            this.toastr.success(successData.ResponseObject,'Updated Successfully');
        } else {
            this.toastr.error(successData.ErrorObject,'Failed');
        }
    }
    public getQuestionsFailure(error) {
        this.settings.loadingSpinner = false;

    }
}
