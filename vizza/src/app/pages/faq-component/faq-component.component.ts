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
  public step: any;
  // step  = false;
  searchval: any;
  search: any;
  faqsearchList: any;
  faq_question: any;


  constructor(public learning: LearningcenterService, public auth: AuthService) {
  }

  ngOnInit() {
    this.faqQuestions();
    // this.faqsearch();
  }

  setStep(index: number) {
    this.step = index;
  }

  addClass(id: any, type) {
    this.id = id;
    console.log(id, 'idddd')
    if (type == id) {
      this.bgColor = 'true';
    } else {
      console.log('inn');
      this.bgColor = 'false';

    }
  }

  updateFilter(event) {
    const search = event.target.value.toLowerCase();
    console.log(this.search, 'val');

  }

  //Risk Details
  faqQuestions() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'search': this.searchval

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
    console.log(this.faqQuestionsList, 'this.faqQuestionsList')

    for (let i = 0; i < this.faqQuestionsList.length; i++) {

      for (let j = 0; j < this.faqQuestionsList[i].contents; j++) {
        this.faq_question=this.faqQuestionsList[i].contents[j].content_qstn;
        // alert('1')
        console.log(this.faqQuestionsList[i].contents[j].content_qstn, "09876546789");
        console.log(this.faqQuestionsList[i].contents[j].content_ans, "qnhaSAFFDG");

      }
    }
  }

  public getfaqQuestionsFailure(error) {
  }
// //Risk Details
//   faqsearch() {
//     const data = {
//       'platform': 'web',
//       'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
//       'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
//       'search': this.searchval
//     }
//     this.learning.getfaqsearch(data).subscribe(
//         (successData) => {
//           this.getfaqsearchSuccess(successData);
//         },
//         (error) => {
//           this.getfaqsearchFailure(error);
//         }
//     );
//
//   }
//
//   public getfaqsearchSuccess(successData) {
//     this.faqsearchList = successData.ResponseObject;
//     console.log(this.faqsearchList, 'this.faqsearchList')
//
//
//
//   }
//
//   public getfaqsearchFailure(error) {
//   }

}
