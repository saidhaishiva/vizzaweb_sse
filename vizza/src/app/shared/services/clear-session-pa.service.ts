import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionPaService {

  constructor() { }
  clearSessionPaData(){
    //apollo munich
    sessionStorage.buyProductsPa = '';
    sessionStorage.appollo2Detail = '';
    sessionStorage.panomineeData = '';
    sessionStorage.appolloPAproposalID = '';
    sessionStorage.proposerAgeP = '';
    sessionStorage.insuredAgeP = '';
    sessionStorage.appollo1Details = '';
  // religare
    sessionStorage.residenceCitys = '';
    sessionStorage.personalCitys = '';
    sessionStorage.proposerAge = '';
    sessionStorage.insuredAgePA = '';
    sessionStorage.mobileNumber = '';
    sessionStorage.insuremobileNumber = '';
    sessionStorage.proposal3Detail = '';
    sessionStorage.personalnomineeData = '';
    sessionStorage.pa_religare_proposal_id = '';
    sessionStorage.proposal2Detail = '';
    sessionStorage.insureoccupationDescription = '';
    sessionStorage.insureoccupationClass = '';
    // home
    // sessionStorage.pincoceP = '';
    // sessionStorage.occupationP = '';
    // sessionStorage.AnnualIncomeP = '';
    // sessionStorage.setAgeP = '';
    // sessionStorage.selectedProfession = '';
    // sessionStorage.enquiryDetailsPa = '';
    // sessionStorage.setAllProductLists = '';
    // sessionStorage.filterCompany = '';
    // sessionStorage.allProductLists = '';
    // sessionStorage.sumInsuredAmountLists = '';
    // sessionStorage.buyProductsPa = '';
  }



  }
