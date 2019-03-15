import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionPaService {

  constructor() { }
  clearSessionPaData(){
    //apollo munich
    sessionStorage.personalPremiumLists = '';
        sessionStorage.pAccidentProposalList = '';
    sessionStorage.appollo2Detail = '';
    sessionStorage.panomineeData = '';
    sessionStorage.appolloPAproposalID = '';
    sessionStorage.proposerAgeP = '';
    sessionStorage.insuredAgeP = '';
    sessionStorage.appollo1Details = '';

  }



  }
