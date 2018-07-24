import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProposalmessageComponent} from './proposalmessage/proposalmessage.component';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
    public personal: FormGroup;
    public checked: boolean;
    public totalProposal: any;
    public isLinear = false;
    public illnessCheck: boolean;
    public socialStatus: boolean;
    public nomineeAdd: boolean;
    public nomineeRemove: boolean;
    public familyMembers: any;
    public nomineeDate: any;
    public setDate: any;
    public selectDate: any;
    public stopNext: boolean;
    public buyProductdetails: any;
    public groupName: any;
    public getFamilyDetails: any;
    public enquiryId: any;
    public personalData: any;
    public occupationList: any;
    public relationshipList: any;
  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public dialog: MatDialog, public fb: FormBuilder, public auth: AuthService) {
      this.totalProposal = [];
      this.illnessCheck = false;
      this.socialStatus = true;
      this.stopNext = false;
      this.nomineeAdd = false;
      this.nomineeRemove = true;
      this.personal = this.fb.group({
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalDob: ['', Validators.required],
          personalAge: ['', Validators.required],
          personalOccupation: ['', Validators.required],
          personalIncome: ['', Validators.required],
          personalAadhar: ['', Validators.compose([ Validators.minLength(12)])],
          personalPan: ['', Validators.compose([ Validators.minLength(10)])],
          personalGst: ['', Validators.compose([ Validators.minLength(15)])],
          socialStatus: '',
          socialAnswer1: '',
          socialAnswer2: '',
          socialAnswer3: '',
          socialAnswer4: '',
          personalAddress: ['', Validators.required],
          previousinsurance: ['', Validators.required],
          personalAddress2: '',
          personalPincode: ['', Validators.required],
          personalCity: ['', Validators.required],
          personalState: ['', Validators.required],
          personalEmail: ['', Validators.required],
          personalMobile: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
          personalAltnumber: ['', Validators.compose([ Validators.minLength(10)])],
          residenceAddress: '',
          residenceAddress2: '',
          residencePincode: '',
          residenceCity: '',
          residenceState: '',
          residenceEmail: '',
          residenceMobile: ['', Validators.compose([ Validators.minLength(10)])],
          residenceAltnumber: ['', Validators.compose([ Validators.minLength(10)])],
          illnessCheck: ''
      });
  }
    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
        this.setOccupationList()
        this.setRelationship()
        this.groupList();
    }
    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'y-MM-dd');
    }
    criticalIllness(values: any) {
      if (values.checked) {
          const dialogRef = this.dialog.open(ProposalmessageComponent, {
              width: '300px'
          });
          dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              this.stopNext = true;
          });
      } else {
          this.stopNext = false;
      }
    }
    cgangeSocialStatus(result) {
      this.socialStatus = this.personal.controls['socialStatus'].value;
    }
    groupList() {
      this.familyMembers = this.getFamilyDetails.family_members;
      console.log(this.familyMembers);
        for (let i = 0; i < this.familyMembers.length; i++ ) {
            this.familyMembers[i].ins_name = '';
            this.familyMembers[i].ins_dob = '';
            this.familyMembers[i].ins_age = '';
            this.familyMembers[i].ins_gender = '';
            this.familyMembers[i].ins_illness = '';
            this.familyMembers[i].ins_weight = '';
            this.familyMembers[i].ins_height = '';
            this.familyMembers[i].ins_occupation_id = '';
            this.familyMembers[i].insurincome = '';
            this.familyMembers[i].ins_relationship = '';
            this.familyMembers[i].ins_hospital_cash = '';
            this.familyMembers[i].ins_engage_manual_labour = '';
            this.familyMembers[i].ins_engage_winter_sport = '';
            this.familyMembers[i].ins_personal_accident_applicable = '';
        }
        this.nomineeDate = [{
            nominee: [{
                nname: '',
                nage: '',
                nrelationship: '',
                nclaim: '',
                aname: '',
                aage: '',
                arelationship: '',
            }],
            policynumber: '',
            anyclaims: ''
            }];
    }

    addNominee(value) {
      if (value == 'add' && this.nomineeDate[0].nominee.length != 2) {
          this.nomineeDate[0].nominee.push({
              nname: '',
              nage: '',
              nrelationship: '',
              nclaim: '',
              aname: '',
              aage: '',
              arelationship: ''
          });
          this.nomineeAdd = true;
          this.nomineeRemove = false;
      } else if (value == 'delete') {
          if (this.nomineeDate[0].nominee.length == 2)
          this.nomineeDate[0].nominee.splice(0,1);
          this.nomineeAdd = false;
          this.nomineeRemove = true;
      }
    }
    claimPercent(percent) {
      if (percent >= 100) {
          this.nomineeAdd = true;
          this.nomineeRemove = true;

      } else {
          this.nomineeAdd = false;
          this.nomineeRemove = true;
      }
    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
      this.personalData = value;
        if (this.personal.valid) {
            console.log(value, 'value');
            this.personalData.personalDob = this.setDate;
            console.log(this.personalData.personalDob, 'this.personalData.personalDobthis.personalData.personalDob')
            this.totalProposal.push(this.personalData);
            stepper.next();
        }
    }
    //Insured Details
    InsureDetails(stepper: MatStepper, index, key) {
      console.log( this.familyMembers, 'pop');
        if (key == 'Insured Details') {
            if (this.familyMembers[index].ins_name != '' &&
                this.familyMembers[index].ins_dob != '' &&
                this.familyMembers[index].ins_age != '' &&
                this.familyMembers[index].ins_gender != '' &&
                this.familyMembers[index].ins_illness != '' &&
                this.familyMembers[index].ins_weight != '' &&
                this.familyMembers[index].ins_height != '' &&
                this.familyMembers[index].ins_occupation_id != '' &&
                this.familyMembers[index].insurincome != '' &&
                this.familyMembers[index].ins_relationship != '') {
                if (this.buyProductdetails.product_id == 6) {
                    if (this.familyMembers[index].ins_hospital_cash != '') {
                        stepper.next();
                    }
                } else {
                    stepper.next();
                }
                if (this.buyProductdetails.product_id == 9) {
                    if (this.familyMembers[index].ins_engage_manual_labour != '' && this.familyMembers[index].ins_engage_winter_sport != '' && this.familyMembers[index].ins_personal_accident_applicable != '') {
                        stepper.next();
                    }
                } else {
                    stepper.next();
                }
                this.totalProposal.push(this.familyMembers);
            } else {
                this.toastr.error('Please fill the empty fields', key);
            }
        }
    }
    //Nominee Details
    nomineeDetails(stepper: MatStepper, index, index2, key) {
        if (key == 'Nominee Details') {
            if (this.nomineeDate[index].nominee[index].nname != '' &&
                this.nomineeDate[index].nominee[index].nage != '' &&
                this.nomineeDate[index].nominee[index].nrelationship != '' &&
                this.nomineeDate[index].policynumber != '' &&
                this.nomineeDate[index].nominee[index].nclaim != '' &&
                this.nomineeDate[index].anyclaims != '') {
                this.totalProposal.push(this.nomineeDate);
                if (this.nomineeDate[index].nominee[index].nage < 18) {
                    if (this.nomineeDate[index].nominee[index].aname != '' && this.nomineeDate[index].nominee[index].aage != '' && this.nomineeDate[index].nominee[index].arelationship != '') {
                        this.proposal();
                    } else{
                        this.toastr.error('Please fill the empty fields', key);
                    }
                } else {
                    this.proposal();
                }
            } else {
                this.toastr.error('Please fill the empty fields', key);
            }

        }
    }
    public keyPress(event: any) {
        if (event.charCode !== 0) {
            const pattern = /[0-9\\ ]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (!pattern.test(inputChar)) {
                event.preventDefault();
            }
        }
    }
  proposal() {

          const data = [{
              'platform': 'web',
              'enquiry_id': this.enquiryId,
              'group_name':  this.groupName,
              'product_id': this.buyProductdetails.product_id,
              'policy_type_name': this.buyProductdetails.prod_shortform,
              'policy_category': 'fresh',
              'policy_started_on': this.personalData.personalDob,
              'policy_end_on': this.personalData.personalDob,
              'policy_period': '1',
              'sum_insured_id': this.buyProductdetails.suminsured_id,
              'scheme_id': this.buyProductdetails.scheme,
              'proposer_name': this.personalData.personalFirstname,
              'proposer_email': this.personalData.personalEmail,
              'proposer_mobile': this.personalData.personalMobile,
              'proposer_res_address1': this.personalData.residenceAddress,
              'proposer_res_address2': this.personalData.residenceAddress2,
              'proposer_res_area': this.personalData.personalFirstname,
              'proposer_res_city': this.personalData.residenceCity,
              'proposer_res_state': this.personalData.residenceState,
              'proposer_res_pincode': this.personalData.residencePincode,
              'proposer_comm_address1': this.personalData.personalAddress,
              'proposer_comm_address2': this.personalData.personalAddress2,
              'proposer_comm_area': this.personalData.personalCity,
              'proposer_comm_city': this.personalData.personalCity,
              'proposer_comm_state': this.personalData.personalState,
              'proposer_comm_pincode': this.personalData.personalPincode,
              'prop_dob': this.personalData.personalDob,
              'prop_occupation': this.personalData.personalOccupation,
              'prop_annual_income': this.personalData.personalIncome,
              'prop_pan_no': this.personalData.personalPan,
              'prop_aadhar_no': this.personalData.personalAadhar,
              'gst_id_no': this.personalData.personalGst,
              'exist_health_ins_covered_persons_details': '',
              'have_eia_no': '1',
              'eia_no': '',
              'previous_medical_insurance': this.personalData.previousinsurance,
              'critical_illness': '0',
              'social_status': this.personalData.socialStatus ? 0 : 1,
              'social_status_bpl': this.personalData. socialAnswer1,
              'social_status_disabled': this.personalData. socialAnswer2,
              'social_status_informal': this.personalData. socialAnswer3,
              'social_status_unorganized': this.personalData. socialAnswer4,
              'nominee_name_one': this.nomineeDate[0].nominee[0].nname,
              'nominee_age_one': this.nomineeDate[0].nominee[0].nage,
              'nominee_relationship_one': this.nomineeDate[0].nominee[0].nrelationship,
              'nominee_percentclaim_one': this.nomineeDate[0].nominee[0].nclaim,
              'appointee_name_one': this.nomineeDate[0].nominee[0].aname,
              'appointee_age_one': this.nomineeDate[0].nominee[0].aage,
              'appointee_relationship_one': this.nomineeDate[0].nominee[0].arelationship,
              'nominee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nname : '',
              'nominee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nage : '',
              'nominee_relationship_two': this.nomineeDate[0].nominee.length > 1 ?  this.nomineeDate[0].nominee[1].nrelationship : '',
              'nominee_percentclaim_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].nclaim : '',
              'appointee_name_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aname : '',
              'appointee_age_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].aage : '',
              'appointee_relationship_two': this.nomineeDate[0].nominee.length > 1 ? this.nomineeDate[0].nominee[1].arelationship : '',
              'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4,
              'created_by': '0',
              'insured_details': this.familyMembers
          }];

          this.proposalservice.getProposal(data).subscribe(
              (successData) => {
                  this.proposalSuccess(successData);
              },
              (error) => {
                  this.proposalFailure(error);
              }
          );
}
    public proposalSuccess(successData) {
        console.log(successData);
    }
    public proposalFailure(error) {
        console.log(error);
    }

    setOccupationList() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'user_id': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4
        }
        this.proposalservice.getOccupationList(data).subscribe(
            (successData) => {
                this.occupationListSuccess(successData);
            },
            (error) => {
                this.occupationListFailure(error);
            }
        );

    }
    public occupationListSuccess(successData) {
        console.log(successData.ResponseObject);
        this.occupationList = successData.ResponseObject;
    }
    public occupationListFailure(error) {
        console.log(error);
    }

    setRelationship() {
        const data = {
            'platform': 'web',
            'product_id': this.buyProductdetails.product_id,
            'user_id': '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : 4
        }
        this.proposalservice.getRelationshipList(data).subscribe(
            (successData) => {
                this.setRelationshipSuccess(successData);
            },
            (error) => {
                this.setRelationshipFailure(error);
            }
        );
    }
    public setRelationshipSuccess(successData) {
        console.log(successData.ResponseObject);
        this.relationshipList = successData.ResponseObject;
    }
    public setRelationshipFailure(error) {
        console.log(error);
    }
}
