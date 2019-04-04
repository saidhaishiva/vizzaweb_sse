import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionTravelService {

  constructor() {

  }

  clearSessionTravelData() {
      // common
      // sessionStorage.travelPremiumList = '';
      // sessionStorage.allTravelPremiumLists = '';
      // sessionStorage.enquiryDetailsTravel = '';

      sessionStorage.summaryData = '';
      sessionStorage.proposerFormData = '';
      sessionStorage.insuredFormData = '';
      sessionStorage.nomineeFormData = '';

      // Hdfc
      sessionStorage.hdfcTravelCity = '';
      sessionStorage.hdfcTravelDetails1 = '';
      sessionStorage.hdfcTravelDetails2 = '';
      sessionStorage.hdfcTravelDetails3 = '';
      sessionStorage.hdfc_Travel_proposal_id = '';
      sessionStorage.proposerAgeHdfcTravel = '';

      // statr health
      sessionStorage.travelPremiumList = '';
      sessionStorage.proposerAgeForTravel = '';
      sessionStorage.personalCitys = '';
      sessionStorage.areaList = '';
      sessionStorage.stepper1DetailsForTravel = '';
      sessionStorage.stepper2DetailsForTravel = '';
      sessionStorage.travel_proposal_id = '';

      // shriram
      sessionStorage.stepper1ShriramTravel = '';
      sessionStorage.stepper2ShriramTravel = '';
      sessionStorage.proposerAgeForTravel = '';
      sessionStorage.travel_shriram_proposal_id = '';

  }


}
