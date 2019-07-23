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
  //   // shriram
    sessionStorage.summaryData = '';
    sessionStorage.shiramFwProposalID = '';
    sessionStorage.bkShriramProposerAge = '';
    sessionStorage.stepper1 = '';
    sessionStorage.stepper2 = '';
    sessionStorage.stepper3 = '';
    sessionStorage.stepper4 = '';

      // tataAig two wheeler
    sessionStorage.summaryDatabiketata = '';
    sessionStorage.bikeproposerAge = '';
    sessionStorage.tatabikeproposer = '';
    sessionStorage.tatabikevehicle = '';
    sessionStorage.tatabikeprepolicy = '';
    sessionStorage.tatabikenominee = '';
    sessionStorage.tataBikeproposalID = '';

      //reliance two wheeler
    sessionStorage.summaryData = '';
    sessionStorage.relianceTwowheelerproposalID = '';
    sessionStorage.proposerAge = '';
    sessionStorage.nomineeAge = '';
    sessionStorage.npnomineeAge = '';
    sessionStorage.stepper1Details = '';
    sessionStorage.stepper2Details = '';
    sessionStorage.stepper3Details = '';
    sessionStorage.stepper4Details = '';
    sessionStorage.proposerFormData = '';
    sessionStorage.changeIdvDetail = '';
  }
}
