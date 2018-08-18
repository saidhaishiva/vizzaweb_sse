import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../../app.settings';
import {Settings} from '../../app.settings.model';
import {ToastrService} from 'ngx-toastr';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public settings: Settings;
    commentBox: boolean;
    testimonialLists: any;
    comments: any;

  constructor(public appSettings: AppSettings, public toastr: ToastrService, public common: CommonService) {
      this.settings = this.appSettings.settings;
      // this.settings.HomeSidenavUserBlock = false;
      // this.settings.sidenavIsOpened = false;
      // this.settings.sidenavIsPinned = false;
      console.log(this.settings, 'this.settings');
      this.commentBox = false;
  }

  ngOnInit() {
      sessionStorage.nomineeDate = '';
      sessionStorage.familyMembers = '';
      sessionStorage.stepper1Details = '';

      sessionStorage.setPage = '';
      sessionStorage.sideMenu = false;
      sessionStorage.setFamilyDetails = '';
      sessionStorage.setInsuredAmount = '';
      sessionStorage.setPincode = '';
      sessionStorage.setPage = '';
      sessionStorage.policyLists = '';
      sessionStorage.sideMenu = '';
      sessionStorage.sonBTn = '';
      sessionStorage.daughterBTn = '';
      sessionStorage.fatherBTn = '';
      sessionStorage.motherBtn = '';
      sessionStorage.fatherInLawBTn = '';
      sessionStorage.motherInLawBtn = '';
      sessionStorage.changedTabDetails = '';
      sessionStorage.changeSuninsuredAmount = '';
      sessionStorage.changedTabIndex = '';
      sessionStorage.shorListTab = '';
      sessionStorage.enquiryId = '';
      sessionStorage.proposalId = '';
      sessionStorage.mobileNumber = '';
      sessionStorage.ageRestriction = '';
      this.testimonialList();
  }
    testiComments() {
      this.commentBox = true;
    }
    onNoClick() {
        this.commentBox = false;
    }



    testimonialList() {
        const data = {
            'platform': 'web'
        }
        this.common.getTestimonialList(data).subscribe(
            (successData) => {
                this.testimonialListSuccess(successData);
            },
            (error) => {
                this.testimonialListFailure(error);
            }
        );
    }
    public testimonialListSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.testimonialLists = successData.ResponseObject;
            console.log(this.testimonialLists);

        }
    }
    public testimonialListFailure(error) {
        console.log(error);
    }

    submit() {
        const data = {
            'platform': 'web',
            'customer_name': 'Kamal',
            'comments': this.comments
        }
        this.common.addTestimonial(data).subscribe(
            (successData) => {
                this.addtestimonialSuccess(successData);
            },
            (error) => {
                this.addtestimonialFailure(error);
            }
        );
    }
    public addtestimonialSuccess(successData) {
        if (successData.IsSuccess == true) {
            this.toastr.success(successData.ResponseObject);
            this.commentBox = false;
            this.comments = '';
            this.testimonialList();
        }
    }
    public addtestimonialFailure(error) {
        console.log(error);
    }

}
