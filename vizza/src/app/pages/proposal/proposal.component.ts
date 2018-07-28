import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProposalmessageComponent} from './proposalmessage/proposalmessage.component';
import { DatePipe } from '@angular/common';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from '../../shared/services/configuration.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
    public personal: FormGroup;
    public summary: FormGroup;
    public checked: boolean;
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
    public today: any;
    public declaration: boolean;
    public summaryData: any;
    public lastStepper: any;
    public paymentGatewayData: any;
    public webhost: any;
    public proposalId: any;
    public illness: any;
  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public dialog: MatDialog, public config: ConfigurationService,
              public fb: FormBuilder, public auth: AuthService, public http:HttpClient) {
      let today  = new Date();
      this.today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.illnessCheck = false;
      this.socialStatus = true;
      this.stopNext = false;
      this.nomineeAdd = false;
      this.nomineeRemove = true;
      this.declaration = false;
      this.illness = false;
      this.webhost = this.config.getimgUrl();
      this.selectDate = '';
      this.proposalId= 0;
      this.personal = this.fb.group({
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalDob: ['', Validators.required],
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
          previousinsurance: '',
          personalAddress2: '',
          personalPincode: ['', Validators.required],
          personalCity: ['', Validators.required],
          personalState: ['', Validators.required],
          personalEmail: ['', Validators.required],
          personalMobile: ['', Validators.compose([Validators.required, Validators.pattern('[789][0-9]{9}')])],
          personalAltnumber: ['', Validators.compose([ Validators.pattern('[789][0-9]{9}')])],
          residenceAddress: '',
          residenceAddress2: '',
          residencePincode: '',
          residenceCity: '',
          residenceState: '',
          illnessCheck: ''

      });
      // this.http.get('http://localhost:4203/assets/mockjson/sample.json').subscribe(
      //     (successData) => {
      //         this.testProposalSuccess(successData);
      //     },
      //     (error) => {
      //         this.proposalFailure(error);
      //     }
      // );

      // this.personal = this.fb.group({
      //     personalTitle: [''],
      //     personalFirstname: [''],
      //     personalLastname: [''],
      //     personalDob: [''],
      //     personalOccupation: [''],
      //     personalIncome: [''],
      //     personalAadhar: [''],
      //     personalPan: [''],
      //     personalGst: [''],
      //     socialStatus: '',
      //     socialAnswer1: '',
      //     socialAnswer2: '',
      //     socialAnswer3: '',
      //     socialAnswer4: '',
      //     personalAddress: [''],
      //     previousinsurance: '',
      //     personalAddress2: '',
      //     personalPincode: [''],
      //     personalCity: [''],
      //     personalState: [''],
      //     personalEmail: [''],
      //     personalMobile: [''],
      //     personalAltnumber: [''],
      //     residenceAddress: '',
      //     residenceAddress2: '',
      //     residencePincode: '',
      //     residenceCity: '',
      //     residenceState: '',
      //     residenceEmail: '',
      //     residenceMobile: [''],
      //     residenceAltnumber: [''],
      //     illnessCheck: ''
      //
      // });
  }
    ngOnInit() {
        this.buyProductdetails = JSON.parse(sessionStorage.buyProductdetails);
        this.enquiryId = sessionStorage.enquiryId;
        this.groupName = sessionStorage.groupName;
        this.getFamilyDetails = JSON.parse(sessionStorage.changedTabDetails);
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'dd-MM-y');
        this.setOccupationList()
        this.setRelationship()
        this.groupList();
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
            this.familyMembers[i].ins_gender = '';
            this.familyMembers[i].ins_illness = 'No';
            this.familyMembers[i].ins_weight = '';
            this.familyMembers[i].ins_height = '';
            this.familyMembers[i].ins_occupation_id = '';
            this.familyMembers[i].insurincome = '';
            this.familyMembers[i].ins_relationship = '';
            this.familyMembers[i].ins_hospital_cash = '';
            this.familyMembers[i].ins_engage_manual_labour = '';
            this.familyMembers[i].ins_engage_winter_sports = '';
            this.familyMembers[i].ins_personal_accident_applicable = '';
            this.familyMembers[i].ins_suminsured_indiv = this.buyProductdetails.suminsured_id;
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
            }]
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

      } else if (this.nomineeDate[0].nominee.length == 1){
          this.nomineeAdd = false;
          this.nomineeRemove = true;
      } else{
          this.nomineeAdd = false;

      }
    }


    //Personal Details
    personalDetails(stepper: MatStepper, value) {
      this.personalData = value;
        if (this.personal.valid) {
            console.log(value, 'value');
            this.personalData.personalDob = this.setDate;
            console.log(this.personalData.personalDob, 'this.personalData.personalDobthis.personalData.personalDob')
            stepper.next();
        }
    }
    //Insured Details
    InsureDetails(stepper: MatStepper, index, key) {

        console.log( this.familyMembers, 'poppppppppppppppppppppppsdgdf');
        if (key == 'Insured Details') {
            for (let i = 0; i < this.familyMembers.length; i++ ) {
                if (this.familyMembers[i].ins_name != '' &&
                    this.familyMembers[i].ins_dob != '' &&
                    this.familyMembers[i].ins_gender != '' &&
                    this.familyMembers[i].ins_weight != '' &&
                    this.familyMembers[i].ins_height != '' &&
                    this.familyMembers[i].ins_occupation_id != '' &&
                    this.familyMembers[i].ins_relationship != '') {

                    if (this.familyMembers[i].ins_illness.trim != 'No' ){
                        console.log(this.familyMembers[i].ins_illness, 'pop');
                        if (this.familyMembers[i].ins_illness != '') {
                            if (i == this.familyMembers.length - 1) {
                                stepper.next();
                            }
                        }
                    } else if (this.buyProductdetails.product_id == 6) {
                        console.log('in');
                        if (this.familyMembers[i].ins_hospital_cash != '') {
                            if (i == this.familyMembers.length - 1) {
                                stepper.next();
                            }
                        }
                    } else if (this.buyProductdetails.product_id == 9 || this.buyProductdetails.product_id == 8) {
                        if (this.familyMembers[i].ins_engage_manual_labour != '' &&
                            this.familyMembers[i].ins_engage_winter_sports != '' &&
                            this.familyMembers[i].ins_personal_accident_applicable != '') {
                            if (i == this.familyMembers.length - 1) {
                                stepper.next();
                            }
                        }
                    } else  {
                        if (i == this.familyMembers.length - 1) {
                            stepper.next();
                        }
                        if (i == this.familyMembers.length - 1) {
                            this.toastr.error('Please fill the empty fields', key);
                        }
                    }

                } else {
                    if (i == this.familyMembers.length - 1) {
                        this.toastr.error('Please fill the empty fields', key);
                    }
                }
            }
        }
        console.log( this.familyMembers, 'popppppppppppppppppppppp');
    }
    //Nominee Details
    nomineeDetails(stepper: MatStepper, index, key) {
      this.lastStepper = stepper;
        if (key == 'Nominee Details') {
            for (let i = 0; i < this.nomineeDate[index].nominee.length; i++) {
                if (this.nomineeDate[index].nominee[i].nname != '' &&
                    this.nomineeDate[index].nominee[i].nage != '' &&
                    this.nomineeDate[index].nominee[i].nrelationship != '' &&
                    this.nomineeDate[index].nominee[i].nclaim != '') {
                    if (this.nomineeDate[index].nominee[i].nage < 18) {
                        if (this.nomineeDate[index].nominee[i].aname != '' &&
                            this.nomineeDate[index].nominee[i].aage != '' &&
                            this.nomineeDate[index].nominee[i].arelationship != '') {
                            this.proposal();

                        } else {
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
    }
    illnessStatus(values: any, index) {
        if (values.checked) {
            this.familyMembers[index].ins_illness = '';
            this.familyMembers[index].illness = true;
        } else {
            this.familyMembers[index].illness = false;
            this.familyMembers[index].ins_illness = 'No';

        }

}
    sameAddress(values: any){
      if (values.checked) {
          this.personal.controls['residenceAddress'].setValue(this.personal.controls['personalAddress'].value);
          this.personal.controls['residenceAddress2'].setValue(this.personal.controls['personalAddress2'].value);
          this.personal.controls['residenceCity'].setValue(this.personal.controls['personalCity'].value);
          this.personal.controls['residencePincode'].setValue(this.personal.controls['personalPincode'].value);
          this.personal.controls['residenceState'].setValue(this.personal.controls['personalState'].value);
      } else {
          this.personal.controls['residenceAddress'].setValue('');
          this.personal.controls['residenceAddress2'].setValue('');
          this.personal.controls['residenceCity'].setValue('');
          this.personal.controls['residencePincode'].setValue('');
          this.personal.controls['residenceState'].setValue('');
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
    addEventInsurer(event, i) {
        this.familyMembers[i].ins_dob = this.datepipe.transform(event.value, 'dd-MM-y');
        console.log(this.familyMembers[i].ins_dob);
    }
    addEvent(event) {
        this.selectDate = event.value;
        this.setDate = this.datepipe.transform(this.selectDate, 'dd-MM-y');

    }
  proposal() {
          const data = [{
              'platform': 'web',
              'proposal_id' : this.proposalId,
              'enquiry_id': this.enquiryId,
              'group_name':  this.groupName,
              'company_name': this.buyProductdetails.company_name,
              'product_id': this.buyProductdetails.product_id,
              'policy_type_name': this.buyProductdetails.prod_shortform,
              'policy_category': 'fresh',
              'policy_started_on': this.personalData.personalDob,
              'policy_end_on': this.personalData.personalDob,
              'policy_period': '1',
              'sum_insured_id': this.buyProductdetails.suminsured_id,
              'scheme_id': this.buyProductdetails.scheme,
              'title': this.personalData.personalTitle,
              'proposer_fname': this.personalData.personalFirstname,
              'proposer_lname': this.personalData.personalLastname,
              'proposer_email': this.personalData.personalEmail,
              'proposer_mobile': this.personalData.personalMobile,
              'proposer_alternate_mobile': this.personalData.personalAltnumber,
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
              'critical_illness': 'NO   ',
              'social_status': this.personalData.socialStatus ? 1 : 0,
              'social_status_bpl': this.personalData.socialAnswer1 == '' ? 0 : this.personalData. socialAnswer1,
              'social_status_disabled': this.personalData.socialAnswer2 == '' ? 0 : this.personalData. socialAnswer2,
              'social_status_informal': this.personalData.socialAnswer3 == '' ? 0 : this.personalData. socialAnswer3 ,
              'social_status_unorganized': this.personalData.socialAnswer4 == '' ? 0 : this.personalData. socialAnswer4,
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
    public proposalSuccess( successData) {
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.summaryData = successData.ResponseObject;
            this.proposalId = this.summaryData.proposal_id;
            this.auth.setSessionData('proposalID',  this.proposalId );
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }
    // public testProposalSuccess( successData) {
    //     console.log(successData);
    //     if (successData.IsSuccess) {
    //         this.toastr.success('Proposal created successfully!!');
    //         this.summaryData = successData.ResponseObject;
    //         console.log(this.summaryData);
    //         this.lastStepper.next();
    //
    //     } else {
    //         this.toastr.error(successData.ErrorObject);
    //     }
    // }
    public proposalFailure(error) {
        console.log(error);
    }

    public payNow() {
        const data = {
            'platform': 'web',
            'reference_id' :  this.summaryData.proposal_details[0].referenceId,
            'proposal_id': this.proposalId,
            'user_id': this.auth.getPosUserId() ? this.auth.getPosUserId() : '0',
            'role_id': this.auth.getPosRoleId() ? this.auth.getPosRoleId() : '4'
        }
        this.proposalservice.getPolicyToken(data).subscribe(
            (successData) => {
                this.getPolicyTokenSuccess(successData);
            },
            (error) => {
                this.getPolicyTokenFailure(error);
            }
        );
    }

    public getPolicyTokenSuccess(successData) {
        if (successData.IsSuccess) {
            this.toastr.success('Proposal created successfully!!');
            this.paymentGatewayData = successData.ResponseObject;
            console.log(this.paymentGatewayData);
            window.location.href = this.paymentGatewayData.payment_gateway_url;
            this.lastStepper.next();

        } else {
            this.toastr.error(successData.ErrorObject);
        }
    }

    public getPolicyTokenFailure(error) {
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
