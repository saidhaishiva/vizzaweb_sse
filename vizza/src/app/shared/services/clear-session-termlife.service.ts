import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionTermlifeService {

  constructor() { }
  clearSessiontermData()
  {
    //Aegon term life
    sessionStorage.summaryData='';
    sessionStorage.stepper1='';
    sessionStorage.stepper2='';
    sessionStorage.enquiryFormData='';
    sessionStorage.lifePremiumList='';
    sessionStorage.getEnquiryDetials='';
    sessionStorage.enquiryFromDetials='';

  }

}
