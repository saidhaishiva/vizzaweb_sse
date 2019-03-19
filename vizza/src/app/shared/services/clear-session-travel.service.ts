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
  }

}
