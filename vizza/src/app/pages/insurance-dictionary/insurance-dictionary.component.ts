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
  getinsurancedicsearch: any;
  dictionary:any;

  constructor(public learning: LearningcenterService, public auth: AuthService) {
    this.searchval='';
    this.search='';
  }

  ngOnInit() {
    this.value='A';
    this.insurancedic();
    this.insurancedicSearch();
    this.dictionary=false;
  }
  updateFilter(event) {

    this.search = event.target.value.toLowerCase();
    console.log(this.search, 'val');
    this.insurancedicSearch();


  }
  insurancebuttonclick(event){
    // alert('1')
    // console.log(event,'87345678');
    // console.log(event.target.value,'87345678');
    this.value= event.target.value;
    this.searchval='';
    this.search='';
    this.insurancedic();

  }

  //Risk Details
  insurancedic() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'alphabets':this.value,
      'search': ''
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
      this.dictionary = false;
      this.dictionary = '';
      this.getinsurancedicList = successData.ResponseObject;
      console.log(this.getinsurancedicList, 'this.getinsurancedicList');
      this.getinsurancediccontent = successData.ResponseObject.content;
      console.log(this.getinsurancediccontent, 'this.getinsurancediccontent');
      for (let i = 0; i < this.getinsurancedicList.length; i++) {
        console.log(this.getinsurancedicList.content[i], "12345678");
      }
    }else {
      this.dictionary = true;
      this.dictionary = 'No data found';

    }
  }



  public getinsurancedicFailure(error) {
  }//search Details
  insurancedicSearch() {
    const data = {
      'platform': 'web',
      'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
      'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4',
      'alphabets':'',
      'search': this.search
    }
    this.learning.getinsurancedicsearch(data).subscribe(
        (successData) => {
          this.getinsurancedicsearchSuccess(successData);
        },
        (error) => {
          this.getinsurancedicsearchFailure(error);
        }
    );

  }

  public getinsurancedicsearchSuccess(successData) {
    if (successData.IsSuccess == true) {

      // this.getinsurancedicsearch = successData.ResponseObject;
      this.getinsurancediccontent = successData.ResponseObject.content;
      console.log(this.getinsurancedicsearch, 'this.getinsurancedicsearch');

    }
  }



  public getinsurancedicsearchFailure(error) {
  }
}
