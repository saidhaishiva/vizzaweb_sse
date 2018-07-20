import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service'
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
    checked: boolean;
    totalProposal: any;
    totalGroup: any;
    totalGroupLength: any;
    isLinear = false;
    questionData: any;
    checkQuestion: any;
    totalCheckQues: any;
    question: any;
    totalQuestionList: any;
  constructor(public proposalservice: ProposalService, private toastr: ToastrService) {
      this.totalProposal = [];
      this.totalCheckQues = [];
      this.totalQuestionList = [];
  }

    ngOnInit() {
      this.groupList();
      this.questionList();
    }
    //MEDICAL AND LIFESTYLE DETAILS
    questionList() {
        const data = {
            'platform': 'web',
            'user_id': '0',
            'role_id': '4'
        }
        this.proposalservice.getQuestionList(data).subscribe(
            (successData) => {
                this.questionListSuccess(successData);
            },
            (error) => {
                this.questionListFailure(error);
            }
        );
    }
    public questionListSuccess(successData) {
        console.log(successData.ResponseObject);
        this.questionData = successData.ResponseObject;
        for (let i = 0; i < successData.ResponseObject.length; i++ ) {
            this.checkQuestion = successData.ResponseObject[i][0].question_heading;
            this.totalCheckQues.push(this.checkQuestion);
            for (let q = 0; q < successData.ResponseObject[i].length; q++ ) {
                this.question = successData.ResponseObject[i][q].questions_list;
                this.totalQuestionList.push( this.question);
            }

        }
        console.log(this.totalCheckQues, 'jkhsdfkhsdkfhsdk');
        console.log(this.totalQuestionList, 'jkhsdfkhsddfgdfgdfgdfgdfgkfhsdk');


    }
    public questionListFailure(error) {
        console.log(error);
    }

    groupList() {
       const data = {
            'platform': 'web',
            'enquiry_id': '10',
            'shortlisted_by': '0',
            'role_id': '4'
        }
        this.proposalservice.getShortlistedProduct(data).subscribe(
            (successData) => {
                this.shortlistedProductSuccess(successData);
            },
            (error) => {
                this.shortlistedProductFailure(error);
            }
        );
    }
    public shortlistedProductSuccess(successData) {
        this.totalGroup = successData.ResponseObject;
        this.totalGroupLength = successData.ResponseObject.length;
        for (let i = 0; i <  this.totalGroup.length; i++) {
            //Personal Details
            this.totalGroup[i].pname = '';
            this.totalGroup[i].pdob = '';
            this.totalGroup[i].page = '';
            this.totalGroup[i].poccupation = '';
            this.totalGroup[i].pincome = '';
            this.totalGroup[i].paadhar = '';
            this.totalGroup[i].ppan = '';
            this.totalGroup[i].paddress = '';
            this.totalGroup[i].ppincode = '';
            this.totalGroup[i].pcity = '';
            this.totalGroup[i].pemail = '';
            this.totalGroup[i].ppmobile = '';
            this.totalGroup[i].paltnumber = '';
            //Nominee Details
            this.totalGroup[i].nname = '';
            this.totalGroup[i].nnage = '';
            this.totalGroup[i].nrelationship = '';
            this.totalGroup[i].aname = '';
            this.totalGroup[i].aage = '';
            this.totalGroup[i].arelationship = '';
            this.totalGroup[i].policynumber = '';
            this.totalGroup[i].previousinsurer = '';
            this.totalGroup[i].anyclaims = '';
            //Insured Details
            for (let j = 0; j < this.totalGroup[i].family_members.length; j++) {
                this.totalGroup[i].family_members[j].insurname = '';
                this.totalGroup[i].family_members[j].insurdob = '';
                this.totalGroup[i].family_members[j].insurage = '';
                this.totalGroup[i].family_members[j].insurweight = '';
                this.totalGroup[i].family_members[j].insurheight = '';
                this.totalGroup[i].family_members[j].insuroccupation = '';
                this.totalGroup[i].family_members[j].insurincome = '';
                this.totalGroup[i].family_members[j].insurrelationship = '';
            }
        }
    }
    public shortlistedProductFailure(error) {
        console.log(error);
    }
    nextStep(stepper: MatStepper, index, jindex, key){
      //Personal Details
        if (key == 'Personal Details') {
            if (this.totalGroup[index].paltnumber != '' && this.totalGroup[index].ppmobile != '' && this.totalGroup[index].pemail != '' && this.totalGroup[index].pcity != '' && this.totalGroup[index].ppincode != '' && this.totalGroup[index].paddress != '' && this.totalGroup[index].ppan != '' && this.totalGroup[index].paadhar != '' && this.totalGroup[index].pname != '' && this.totalGroup[index].pdob != '' && this.totalGroup[index].page != '' && this.totalGroup[index].poccupation != '' && this.totalGroup[index].poccupation != '' && this.totalGroup[index].pincome != '') {
                stepper.next();

            } else {
                this.toastr.error('Please fill the empty fields', key);
            }
        }
    //Insured Details
        if (key == 'Insured Details') {
            if (this.totalGroup[index].family_members[jindex].insurname != '' && this.totalGroup[index].family_members[jindex].insurdob != '' && this.totalGroup[index].family_members[jindex].insurage != '' && this.totalGroup[index].family_members[jindex].insurweight != '' && this.totalGroup[index].family_members[jindex].insurheight != '' && this.totalGroup[index].family_members[jindex].insuroccupation != '' && this.totalGroup[index].family_members[jindex].insurincome != '' && this.totalGroup[index].family_members[jindex].insurrelationship != '') {
                stepper.next();

            } else {
                this.toastr.error('Please fill the empty fields', key);
            }
        }
        //Nominee Details
        if (key == 'Nominee Details') {
            if (this.totalGroup[index].nname != '' && this.totalGroup[index].nnage != '' && this.totalGroup[index].nrelationship != '' && this.totalGroup[index].aname != '' && this.totalGroup[index].aage != '' && this.totalGroup[index].arelationship != '' && this.totalGroup[index].policynumber != '' && this.totalGroup[index].previousinsurer != '' && this.totalGroup[index].anyclaims != '') {
                stepper.next();

            } else {
                this.toastr.error('Please fill the empty fields', key);
            }
        }
        console.log(this.totalGroup, 'totallllll');
    }
  proposal() {
          const data = {}

          this.proposalservice.getProposal(data).subscribe(
              (successData) => {
                  this.proposalSuccess(successData);
              },
              (error) => {
                  this.proposalFailure(error);
              }
          );

      console.log(this.totalGroup, 'totallllll');

}
    public proposalSuccess(successData) {
        console.log(successData);
    }
    public proposalFailure(error) {
        console.log(error);


    }
    applyToAll(value) {
      console.log(value);

    }

}
