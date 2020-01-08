import { Component, OnInit } from '@angular/core';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {AuthService} from '../../shared/services/auth.service';



@Component({
  selector: 'app-faq-component',
  templateUrl: './faq-component.component.html',
  styleUrls: ['./faq-component.component.scss']
})
export class FaqComponentComponent implements OnInit {
  public faqQuestionsList: any;
  public id: any;
  public bgColor: any;
  panelOpenState = false;


  constructor(public learning: LearningcenterService,public auth: AuthService) { }

  ngOnInit() {
    this.faqQuestions();
  }

  addClass(id: any,type) {
    this.id = id;
    console.log(id,'idddd')
    if (type == id){
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }

  //Risk Details
  faqQuestions() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
    }
    this.learning.getfaqQuestions(data).subscribe(
        (successData) => {
          this.getfaqQuestionsSuccess(successData);
        },
        (error) => {
          this.getfaqQuestionsFailure(error);
        }
    );

  }

  public getfaqQuestionsSuccess(successData) {
    this.faqQuestionsList = successData.ResponseObject;
    console.log(this.faqQuestionsList,'this.faqQuestionsList')

    for (let i = 0; i < this.faqQuestionsList.length; i++) {

      for (let j = 0; j < this.faqQuestionsList[i].contents[j]; j++) {
        // alert('1')
        console.log(this.faqQuestionsList[i].contents[j].content_qstn,"09876546789");
        console.log(this.faqQuestionsList[i].contents[j].content_ans,"qnhaSAFFDG");
      //
      //   for (let k = 0; k < this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group.length; k++) {
      //     this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].existingSince = '';
      //     this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].diseasesDescription = '';
      //     this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].dobError = '';
      //     this.religareQuestionsList[i].sub_questions_list[j].question_details.family_group[k].status = false;
      //
      //   }
      }
    }
    // sessionStorage.religareQuestionsList = JSON.stringify(this.religareQuestionsList);
  }
  public getfaqQuestionsFailure(error) {
  }


}
