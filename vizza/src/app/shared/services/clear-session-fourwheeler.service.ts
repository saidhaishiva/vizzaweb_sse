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


  }

}
