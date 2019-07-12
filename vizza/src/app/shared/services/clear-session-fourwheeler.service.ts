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

  }

}
