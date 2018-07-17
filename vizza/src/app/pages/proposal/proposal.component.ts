import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {proposalService} from '../../shared/services/proposal.service'
@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss']
})
export class ProposalComponent implements OnInit {
    proposalDetail: FormGroup;
    secondFormGroup: FormGroup;
    checked: boolean;
    private isAppUser = false;
    totalProposal: any;

  constructor(private formBuilder: FormBuilder, public proposalservice: proposalService) {
      this.proposalDetail = this.formBuilder.group({
          groupA: this.formBuilder.group({
              name: ['', Validators.compose([Validators.required])],
              dob: ['', Validators.compose([Validators.required])],
              age: ['', Validators.compose([Validators.required])],
              occupation: ['', Validators.compose([Validators.required])],
              income: ['', Validators.compose([Validators.required])],
              aadhar: ['', Validators.compose([Validators.required])],
              pan: ['', Validators.compose([Validators.required])],
              address: ['', Validators.compose([Validators.required])],
              pincode: ['', Validators.compose([Validators.required])],
              city: ['', Validators.compose([Validators.required])],
              email: ['', Validators.compose([Validators.required])],
              mobile: ['', Validators.compose([Validators.required])],
              altnumber: ''
          }),
          groupB: this.formBuilder.group({
              name: ['', Validators.compose([Validators.required])],
              dob: ['', Validators.compose([Validators.required])],
              age: ['', Validators.compose([Validators.required])],
              occupation: ['', Validators.compose([Validators.required])],
              income: ['', Validators.compose([Validators.required])],
              aadhar: ['', Validators.compose([Validators.required])],
              pan: ['', Validators.compose([Validators.required])],
              address: ['', Validators.compose([Validators.required])],
              pincode: ['', Validators.compose([Validators.required])],
              city: ['', Validators.compose([Validators.required])],
              email: ['', Validators.compose([Validators.required])],
              mobile: ['', Validators.compose([Validators.required])],
              altnumber: ''
          })
      });
      this.totalProposal = [];

  }
    ngOnInit() {
        //
        // this.secondFormGroup = this.formBuilder.group({
        //     name: ['', Validators.compose([Validators.required])],
        //     dob: ['', Validators.compose([Validators.required])],
        //     age: ['', Validators.compose([Validators.required])],
        //     occupation: ['', Validators.compose([Validators.required])],
        //     income: ['', Validators.compose([Validators.required])],
        //     aadhar: ['', Validators.compose([Validators.required])],
        //     pan: ['', Validators.compose([Validators.required])],
        //     address: ['', Validators.compose([Validators.required])],
        //     pincode: ['', Validators.compose([Validators.required])],
        //     city: ['', Validators.compose([Validators.required])],
        //     email: ['', Validators.compose([Validators.required])],
        //     mobile: ['', Validators.compose([Validators.required])],
        //     altnumber: ''
        // });
    }
  proposal(list) {
      if (this.proposalDetail.valid) {
          console.log(list);
          this.totalProposal.push(list);
         const data = {
             'platform': 'web',
             'product_id': '1',
             'policy_type_name': 'MCINEW',
             'policy_category': 'fresh',
             'policy_started_on': '01-07-2018 10:00',
             'policy_end_on': '01-07-2019 10:00',
             'policy_period': '1',
             'sum_insured_id': '1',
             'scheme_id': '1',
             'proposer_name': list.name,
             'proposer_email': list.email,
             'proposer_mobile': list.mobile,
             'proposer_res_address1': list.address,
             'proposer_res_address2': 'Anna Nagar West',
             'proposer_res_area': 'Annanagar',
             'proposer_res_city': list.city,
             'proposer_res_state': 'Tamil Nadu',
             'proposer_res_pincode': list.pincode,
             'proposer_comm_address1': '12/2 New street',
             'proposer_comm_address2': 'Anna Nagar West',
             'proposer_comm_area': 'Annanagar',
             'proposer_comm_city': 'Chennai',
             'proposer_comm_state': 'Tamil Nadu',
             'proposer_comm_pincode': '600026',
             'prop_dob': list.dob,
             'prop_occupation': list.occupation,
             'prop_annual_income': list.income,
             'prop_pan_no': list.pan,
             'prop_aadhar_no': list.aadhar,
             'gst_id_no': '32r234',
             'exist_health_ins_covered_persons_details': '',
             'have_eia_no': '1',
             'eia_no': '',
             'previous_medical_insurance': '',
             'critical_illness': '',
             'social_status': '',
             'social_status_bpl': '',
             'social_status_disabled': '',
             'social_status_informal': '',
             'social_status_unorganized': '',
             'social_status_backwardclass': '',
             'social_status_othercategories': '',
             'nominee_name_one': '',
             'nominee_age_one': '',
             'nominee_relationship_one': '',
             'nominee_percentclaim_one': '',
             'appointee_name_one': '',
             'appointee_age_one': '',
             'appointee_relationship_one': '',
             'nominee_name_two': '',
             'nominee_age_two': '',
             'nominee_relationship_two': '',
             'nominee_percentclaim_two': '',
             'appointee_name_two': '',
             'appointee_age_two': '',
             'appointee_relationship_two': '',
             'created_type': 'self',
             'created_by': '0',
             'insured_details': [{
                 'ins_name': 'Muthu',
                 'ins_dob': '10-05-2000',
                 'ins_age': '18',
                 'ins_relationship': '1',
                 'ins_gender': 'Male',
                 'ins_illness': '',
                 'ins_height': '170',
                 'ins_weight': '60',
                 'ins_suminsured_indiv': '1',
                 'ins_occupation_id': '1',
                 'ins_personal_accident_applicable': 'false',
                 'ins_engage_manual_labour': '',
                 'ins_engage_winter_sports': '',
                 'ins_hospital_cash': ''
             },
                 {
                     'ins_name': 'Kumar',
                     'ins_dob': '10-05-2003',
                     'ins_age': '15',
                     'ins_relationship': '2',
                     'ins_gender': 'Male',
                     'ins_illness': '',
                     'ins_height': '165',
                     'ins_weight': '55',
                     'ins_suminsured_indiv': '1',
                     'ins_occupation_id': '1',
                     'ins_personal_accident_applicable': 'false',
                     'ins_engage_manual_labour': '',
                     'ins_engage_winter_sports': '',
                     'ins_hospital_cash': ''
                 }
             ]

         }

          this.proposalservice.getProposal(data).subscribe(
              (successData) => {
                  this.proposalSuccess(successData);
              },
              (error) => {
                  this.proposalFailure(error);
              }
          );
      }
      console.log(this.totalProposal, 'totallllll');

}
    public proposalSuccess(successData) {
        console.log(successData);
    }
    public proposalFailure(error) {
        console.log(error);


    }
    applyToAll(value) {
      console.log(value);
      this.proposalDetail.setValue({
          name: value.groupa.name,
          dob: value.groupa.dob,
          age: value.groupa.age,
          occupation: value.groupa.occupation,
          income: value.groupa.income,
          aadhar: value.groupa.aadhar,
          pan: value.groupa.pan,
          address: value.groupa.address,
          pincode: value.groupa.pincode,
          city: value.groupa.city,
          email: value.groupa.email,
          mobile: value.groupa.mobile,
          altnumber: value.groupa.altnumber
      });
    }

}
