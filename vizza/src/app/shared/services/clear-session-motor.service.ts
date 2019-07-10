import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionMotorService {

  constructor() {}
  clearSessionbikeData() {
  // //   //home bike
  // //   // sessionStorage.enquiryFormData = '';
  // //   // sessionStorage.Rto = '';
  // //   // sessionStorage.bikeListDetails = '';
  // //   // sessionStorage.bikeEnquiryId = '';
  // //   // sessionStorage.bikeEnquiryId = '';
  // //   // sessionStorage.setAllProductLists = '';
  // //   // sessionStorage.vehicledetails = '';
  // //   // sessionStorage.allProductLists = '';
  // //   // sessionStorage.initialProductList = '';
  // //   // sessionStorage.filterCompany = '';
  // //   // sessionStorage.premiumAmount = '';
  // //   // sessionStorage.premiumAmount1 = '';
  // //   // sessionStorage.buyProductDetails = '';
  // //
  // //   // shriram
  //   sessionStorage.summaryData = '';
  //   sessionStorage.shiramFwProposalID = '';
  //   sessionStorage.bkShriramProposerAge = '';
  //   sessionStorage.stepper1 = '';
  //   sessionStorage.stepper2 = '';
  //   sessionStorage.stepper3 = '';
  //   sessionStorage.stepper4 = '';

      // tataAig two wheeler
    sessionStorage.summaryDatabiketata = '';
    sessionStorage.proposerAge = '';
    sessionStorage.tatabikeproposer = '';
    sessionStorage.tatabikevehicle = '';
    sessionStorage.tatabikeprepolicy = '';
    sessionStorage.tatabikenominee = '';
    sessionStorage.tataBikeproposalID = '';

      //  tataAig four wheeler
    sessionStorage.summaryDatacartata = '';
    sessionStorage.carproposerAge = '';
    sessionStorage.tatacarproposer = '';
    sessionStorage.tatacarvehicle = '';
    sessionStorage.tatacarprepolicy = '';
    sessionStorage.tatacarnominee = '';
  }
}
