import { Component, OnInit } from '@angular/core';
import {LearningcenterService} from '../../shared/services/learningcenter.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-insurance-dictionary',
  templateUrl: './insurance-dictionary.component.html',
  styleUrls: ['./insurance-dictionary.component.scss']
})
export class InsuranceDictionaryComponent implements OnInit {
  getinsurancedicList: any;
  searchval: any;
  value: any;
  search: any;
  getinsurancediccontent: any;
  dictionary:any;

  constructor(public learning: LearningcenterService, public auth: AuthService) { }

  ngOnInit() {
    this.value='A';
    this.insurancedic();
    this.dictionary=false;
  }
  updateFilter(event) {
    this.search = event.target.value.toLowerCase();
    console.log(this.search, 'val');
    this.insurancedic();


  }
  insurancebuttonclick(event){
    // alert('1')
    console.log(event,'87345678');
    console.log(event.target.value,'87345678');
    this.value= event.target.value;
    this.insurancedic();

  }

  //Risk Details
  insurancedic() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'alphabets':this.value,
      'search': this.search
    }
    this.learning.getinsurancedic(data).subscribe(
        (successData) => {
          this.getinsurancedicSuccess(successData);
        },
        (error) => {
          this.getinsurancedicFailure(error);
        }
    );

  }

  public getinsurancedicSuccess(successData) {
    if (successData.IsSuccess == true) {
      this.dictionary=false;
      this.dictionary='';
      this.getinsurancedicList = successData.ResponseObject;
      console.log(this.getinsurancedicList, 'this.getinsurancedicList');
      this.getinsurancediccontent = successData.ResponseObject.content;
      console.log(this.getinsurancediccontent, 'this.getinsurancediccontent');

    }else{
      this.dictionary= true;
      this.dictionary= 'No data found';


    }


    // for (let i = 0; i < this.faqQuestionsList.length; i++) {
    //   console.log(this.faqQuestionsList[i].contents, "12345678");
    //
    //
    //   for (let j = 0; j < this.faqQuestionsList[i].contents.length; j++) {
    //     for(let k = 0; k < this.faqQuestionsList[i].contents[j].content_ans.length; k++){
    //
    //     }
    //     //
    //     // this.faq_question=this.faqQuestionsList[i].contents[j].content_ans;
    //     // console.log(this.faq_question, "12345678");
    //     //
    //     //
    //     // this.faq_question=this.faq_question.replace(new RegExp('•', 'g'), "<br _ngcontent-vizza-app-c14>");
    //     // console.log(this.faq_question, "12345678");
    //     //
    //
    //
    //
    //   }
    // }
  }

  public getinsurancedicFailure(error) {
  }
}
