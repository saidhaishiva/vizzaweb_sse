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
  faqQuestionsListContent: any;
  ans: any;
  dictionary:any;


  constructor(public learning: LearningcenterService, public auth: AuthService) {
  }

  ngOnInit() {
    // this.faqQuestions();
    this.faqsearch();

    this.dictionary=false;
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
     this.search = event.target.value.toLowerCase();
    console.log(this.search, 'val');
this.faqsearch();
this.faqQuestions();
  }

  //Risk Details
  faqQuestions() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'search':  this.search


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
    if (successData.IsSuccess == true) {
      this.dictionary = false;
      this.dictionary = '';
      this.faqQuestionsList = successData.ResponseObject;
      this.faqQuestionsListContent = successData.ResponseObject.contents;
      console.log(this.faqQuestionsList, 'this.faqQuestionsList')

      for (let i = 0; i < this.faqQuestionsList.length; i++) {
        console.log(this.faqQuestionsList[i].contents, "12345678");


        for (let j = 0; j < this.faqQuestionsList[i].contents.length; j++) {
          for (let k = 0; k < this.faqQuestionsList[i].contents[j].content_ans.length; k++) {

          }
          //
          // this.faq_question=this.faqQuestionsList[i].contents[j].content_ans;
          // console.log(this.faq_question, "12345678");
          //
          //
          // this.faq_question=this.faq_question.replace(new RegExp('•', 'g'), "<br _ngcontent-vizza-app-c14>");
          // console.log(this.faq_question, "12345678");
          //


        }
      }
    }else{
      this.dictionary = true;
      this.dictionary = 'No data found';
    }

  }
  public getfaqQuestionsFailure(error) {
  }
// //Risk Details
  faqsearch() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'search': this.search
    }
    this.learning.getfaqsearch(data).subscribe(
        (successData) => {
          this.getfaqsearchSuccess(successData);
        },
        (error) => {
          this.getfaqsearchFailure(error);
        }
    );

  }

  public getfaqsearchSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.dictionary = false;
      this.dictionary = '';
      this.faqQuestionsList = successData.ResponseObject;
      console.log(this.faqsearchList, 'this.faqsearchList')
      for (let i = 0; i < this.faqQuestionsList.length; i++) {
        console.log(this.faqQuestionsList[i].contents, "12345678");


        for (let j = 0; j < this.faqQuestionsList[i].contents.length; j++) {
          for (let k = 0; k < this.faqQuestionsList[i].contents[j].content_ans.length; k++) {

          }
        }
      }


    }else{
      this.dictionary = true;
      this.dictionary = 'No data found';
    }
  }
  public getfaqsearchFailure(error) {
  }

}
