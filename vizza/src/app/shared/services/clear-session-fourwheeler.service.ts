import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionFourwheelerService {

  constructor() { }
  clearSessionfourwheelerData() {

       // tataAig four wheeler
    sessionStorage.summaryDatacartata = '';
    sessionStorage.carproposerAge = '';
    sessionStorage.tatacarproposer = '';
    sessionStorage.tatacarvehicle = '';
    sessionStorage.tatacarprepolicy = '';
    sessionStorage.tatacarnominee = '';
    sessionStorage.tatacarproposalID = '';

    // Four Wheeler Royal Sundaram
    sessionStorage.summaryData = '';
    sessionStorage.royalFourWheelerproposalID = '';
    sessionStorage.stepper1 = '';
    sessionStorage.stepper2 = '';
    sessionStorage.stepper3 = '';
    sessionStorage.stepper4 = '';

//reliance four wheeler
    sessionStorage.summaryData = '';
    sessionStorage.relianceFourwheelerproposalID = '';
    sessionStorage.proposerAge = '';
    sessionStorage.nomineeAge = '';
    sessionStorage.npnomineeAge = '';
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper3Details = '';
    sessionStorage.stepper4Details = '';
    sessionStorage.proposerFormData = '';
  }

}
