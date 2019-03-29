import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionTravelService {

  constructor() {

  }

  clearSessionTravelData() {
      // Hdfc
      sessionStorage.hdfcTravelCity = '';
      sessionStorage.hdfcTravelDetails1 = '';
      sessionStorage.hdfcTravelDetails2 = '';
      sessionStorage.hdfcTravelDetails3 = '';
      sessionStorage.hdfc_Travel_proposal_id = '';
      sessionStorage.proposerAgeHdfcTravel = '';

      sessionStorage.summaryData = '';
      sessionStorage.proposerFormData = '';
      sessionStorage.insuredFormData = '';
      sessionStorage.nomineeFormData = '';


      // statr health

      sessionStorage.travelPremiumList = '';
      sessionStorage.proposerAgeForTravel = '';
      sessionStorage.personalCitys = '';
      sessionStorage.areaList = '';
      sessionStorage.stepper1DetailsForTravel = '';
      sessionStorage.stepper2DetailsForTravel = '';
      sessionStorage.travel_proposal_id = '';
      sessionStorage.summaryData = '';
      sessionStorage.proposerFormData = '';
      sessionStorage.insuredFormData = '';
      sessionStorage.startDate = '';
      sessionStorage.endDate = '';

      // shriram
      sessionStorage.travelPremiumList
      sessionStorage.allTravelPremiumLists
      sessionStorage.changedTabIndex
  }


}
