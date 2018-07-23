import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProposalService} from '../../shared/services/proposal.service';
import { MatStepper } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ProposalmessageComponent} from './proposalmessage/proposalmessage.component';
import { DatePipe } from '@angular/common';

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
    public familyMembers: any;
    public nomineeDate: any;
    public setDate: any;
  constructor(public proposalservice: ProposalService, public datepipe: DatePipe, private toastr: ToastrService, public dialog: MatDialog, public fb: FormBuilder) {
      this.totalProposal = [];
      this.illnessCheck = false;
      this.personal = this.fb.group({
          personalTitle: ['', Validators.required],
          personalFirstname: ['', Validators.required],
          personalLastname: ['', Validators.required],
          personalDob: ['', Validators.required],
          personalAge: ['', Validators.required],
          personalOccupation: ['', Validators.required],
          personalIncome: ['', Validators.required],
          personalAadhar: '',
          personalPan: '',
          personalGst: '',
          socialStatus: '',
          socialAnswer1: '',
          socialAnswer2: '',
          socialAnswer3: '',
          socialAnswer4: '',
          personalAddress: ['', Validators.required],
          personalPincode: ['', Validators.required],
          personalCity: ['', Validators.required],
          personalEmail: ['', Validators.required],
          personalMobile: ['', Validators.required],
          personalAltnumber: '',
          residenceAddress: '',
          residencePincode: '',
          residenceCity: '',
          residenceEmail: '',
          residenceMobile: '',
          residenceAltnumber: '',
          illnessCheck: ''
      });
  }

    ngOnInit() {
        this.groupList();
        this.setDate = Date.now();
        this.setDate = this.datepipe.transform(this.setDate, 'y-MM-dd');
    }
    criticalIllness(illness) {
      if (illness) {
          const dialogRef = this.dialog.open(ProposalmessageComponent, {
              width: '250px',
          });

          dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
          });
      }
    }

    groupList() {
      this.familyMembers = [
          {type: 'Self'},
          {type: 'Son'},
          {type: 'Spose'}
          ]
        for(let i =0; i < this.familyMembers.length; i++ ) {
            this.familyMembers[i].insurname = '';
            this.familyMembers[i].insurdob = '';
            this.familyMembers[i].insurage = '';
            this.familyMembers[i].insurgender = '';
            this.familyMembers[i].insurillness = '';
            this.familyMembers[i].previousinsurer = '';
            this.familyMembers[i].insurweight = '';
            this.familyMembers[i].insurheight = '';
            this.familyMembers[i].insuroccupation = '';
            this.familyMembers[i].insurincome = '';
            this.familyMembers[i].insurrelationship = '';
        }
        this.nomineeDate = [{nname: '', nnage: '', nrelationship: '', aname: '', arelationship: '', policynumber: '', anyclaims: '', nclaim: ''}]
    }

    //Personal Details
    personalDetails(value){
        if(this.personal.valid){
            console.log(value, 'value');
            this.totalProposal.push(value);
        }
    }

    //Insured Details
    InsureDetails(stepper: MatStepper, index, key){
        if (key == 'Insured Details') {

            if (this.familyMembers[index].insurname != '' &&
                this.familyMembers[index].insurdob != '' &&
                this.familyMembers[index].insurage != '' &&
                this.familyMembers[index].insurgender != '' &&
                this.familyMembers[index].insurillness != '' &&
                this.familyMembers[index].previousinsurer != '' &&
                this.familyMembers[index].insurweight != '' &&
                this.familyMembers[index].insurheight != '' &&
                this.familyMembers[index].insuroccupation != '' &&
                this.familyMembers[index].insurincome != '' &&
                this.familyMembers[index].insurrelationship != '') {
                stepper.next();
                this.totalProposal.push(this.familyMembers);

            } else {
                this.toastr.error('Please fill the empty fields', key);
            }
        }
    }
    //Nominee Details
    nomineeDetails(stepper: MatStepper, index, key){
        if (key == 'Nominee Details') {
            if (this.nomineeDate[index].nname != '' &&
                this.nomineeDate[index].nnage != '' &&
                this.nomineeDate[index].nrelationship != '' &&
                this.nomineeDate[index].aname != '' &&
                this.nomineeDate[index].aage != '' &&
                this.nomineeDate[index].arelationship != '' &&
                this.nomineeDate[index].policynumber != '' &&
                this.nomineeDate[index].previousinsurer != '' &&
                this.nomineeDate[index].anyclaims != '') {
                this.totalProposal.push(this.nomineeDate);
                this.proposal()

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
      console.log(this.totalProposal, 'this.totalProposalthis.totalProposalthis.totalProposal');
          const data = {}

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
}
