import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,FormControl} from '@angular/forms';
import {ValidationService} from '../../shared/services/validation.service';

@Component({
  selector: 'app-reliance-pa',
  templateUrl: './reliance-pa.component.html',
  styleUrls: ['./reliance-pa.component.scss'],
})
export class ReliancePaComponent implements OnInit {
  public insured: FormGroup;

  constructor(public fb: FormBuilder,public validation: ValidationService){
    this.insured= this.fb.group({
      insuredPaTitle: ['',Validators.required],
      insuredPaFirstname: ['', Validators.required],
      insuredPaMidname: '',
      insuredPaLastname: ['', Validators.required],
      insuredPaGender: ['', Validators.compose([Validators.required])],
      insuredPaDob: ['', Validators.compose([Validators.required])],
      policyStartDate: '',
      policyEndDate: '',
      insuredPaEmail: ['', Validators.compose([Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')])],
      insuredPaMobile: ['', Validators.compose([Validators.pattern('[6789][0-9]{9}')])],
      maritalStatus: ['', Validators.required],
      insuredParelationship: '',
      maritalStatusName: '',
      insuredParelationshipName: '',
      insuredPaIdProof: '',
      insuredPaIdProofName: '',
      insuredPaIdProofIdP: '',
      insuredPaPan: ['', Validators.compose([ Validators.minLength(10)])],
      insuredPaDriving: '',
      insuredPaPassport: '',
      insuredPaVoter: '',
      insuredPaGst: ['', Validators.compose([Validators.minLength(15)])],
      insuredPaAddress: ['', Validators.required],
      insuredPaAddress2: '',
      insuredPaAddress3: '',
      nationality: 'IN',
      insuredPaPincode: ['', Validators.required],
      insuredPaCity: ['', Validators.required],
      insuredPaCityName: '',
      insuredPaCountry: 'IN',
      insuredPaState: ['', Validators.required],
      insuredPaDistrict: '',
      insuredPaDistrictName: '',
      insuredPaCityIdP: '',
      insuredPaStateIdP: '',
      insuredPaCountryIdP: '',
      insuredPrevList: '',
      insuredPrevListName: '',
      insuredPrevious:'',
      insureSumInsured:'',
      insuredQualify:'',
      insuredremark:'',
      insuredWaive:'',
      insuredPouches:'',
      insuredSmoke:'',
      insuredCheck:'',
      insuredLiquor:'',
      insuredWine:'',
      insuredBeer:'',
      insuredCheck1:'',
      insuredCheck2:'',
      insuredSmokeList:'',
      insuredPouchesList:'',
      insuredPaDistrictIdP: '',
      insuredOccupationList: ['', Validators.required],
      insuredOccupationListName: '',
      insuredProfessionList:['', Validators.required],
      insuredProfessionListName:'',
      PolicyStartDate:'',
      PolicyEndDate:'',
      MedicalInformations: '',
      insuredPaAge: '',
      insuredAnnual: '',
      previousradio:'2',
      rolecd: 'PROPOSER',
      type: '',
      insuredHeight:'',
      insuredWeight:'',
      sameAsProposer:false
    });
  }
  ngOnInit(){

    }
  insurechangeGender(){
    if(this.insured.controls['insuredPaTitle'].value =='Mr'){
      this.insured.controls['insuredPaTitle'].patchValue('MALE')
    }else{
      this.insured.controls['insuredPaTitle'].patchValue('FEMALE')
    }
  }
  nameValidate(event: any){
    this.validation.nameValidate(event);
  }
  // Dob validation
  dobValidate(event: any){
    this.validation.dobValidate(event);
  }
  // Number validation
  numberValidate(event: any){
    this.validation.numberValidate(event);
  }
  idValidate(event: any){
    this.validation.idValidate(event);
  }
  // space
  space(event: any){
    this.validation.space(event);
  }

}
