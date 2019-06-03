import { Injectable } from '@angular/core';

@Injectable()
export class ClearSessionService {

  constructor() { }

    clearSessionData() {
        // star health
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper3Details = '';
        sessionStorage.nomineeData = '';
        sessionStorage.nomineeDate = '';
        sessionStorage.familyMembers = '';
        sessionStorage.personalCitys = '';
        sessionStorage.residenceCitys = '';
        sessionStorage.rAreaNames = '';
        sessionStorage.areaNames = '';

        sessionStorage.mobileNumber = '';
        sessionStorage.ageRestriction = '';
        sessionStorage.proposalId = '';
        sessionStorage.personalAge = '';
        sessionStorage.summaryData = '';
        sessionStorage.proposerFormData = '';
        sessionStorage.insuredFormData = '';
        sessionStorage.nomineeFormData = '';

        // religare health
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper3Details = '';
        sessionStorage.addonDetails = '';

        sessionStorage.proposalId = '';
        sessionStorage.mobileNumber = '';
        sessionStorage.ageRestriction = '';
        sessionStorage.personalAge = '';
        sessionStorage.proposalID = '';
        sessionStorage.summaryData = '';

        // reliance health
        sessionStorage.nomineeAreaList = '';
        sessionStorage.personalAge = '';
        sessionStorage.nomineeAge = '';
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper2Details = '';
        sessionStorage.stepper3Details = '';
        sessionStorage.nomineeData = '';
        sessionStorage.prevviousInsuranceStepperDetails = '';

        sessionStorage.proposalID = '';
        sessionStorage.mobileNumber = '';
        sessionStorage.summaryData = '';
        sessionStorage.proposerFormData = '';
        sessionStorage.insuredFormData = '';
        sessionStorage.previousInsuranceFromData = '';
        sessionStorage.nomineeFormData = '';

        // appollo munich health
        sessionStorage.stepper1Details = '';
        sessionStorage.stepper2Details = '';
        sessionStorage.proposerAge = '';
        sessionStorage.titleValidation = '';
        sessionStorage.nomineeData = '';
        sessionStorage.appollo_health_proposal_id = '';
        sessionStorage.proposerAge = '';
        sessionStorage.mobileNumber = '';
        sessionStorage.apollomedical = '';

        sessionStorage.summaryData = '';
        sessionStorage.proposerFormData = '';
        sessionStorage.nomineeFormData = '';
        sessionStorage.insuredFormData = '';

      // bajaj health
        sessionStorage.bajaj_health_proposalid = '';
        sessionStorage.stepper1Details = '';
        sessionStorage.copaymentShow = '';

        sessionStorage.summaryData = '';
        sessionStorage.insuredFormData = '';



        // hdfc health insurance
        sessionStorage.hdfc_health_proposal_id = '';
        sessionStorage.hdfcStep1 = '';
        sessionStorage.hdfcStep2 = '';
        sessionStorage.hdfcHealthNomineeDetails = '';
        sessionStorage.sameAsinsure = '';
        sessionStorage.pincodeValid = '';
        sessionStorage.hdfcHealthProposerAge = '';
        sessionStorage.hdfcHealthInsurerAge = '';
        sessionStorage.summaryData = '';
        sessionStorage.personlData = '';
        sessionStorage.insuredFormData = '';
        sessionStorage.nomineeFromData = '';


        ///iffco tokyo
        sessionStorage.cityDetails = '';
        sessionStorage.stepper1IffcoDetails = '';
        sessionStorage.stepper2IffcoDetails = '';
        sessionStorage.nomineecityDetails = '';
        sessionStorage.nomineeData1 = '';
        sessionStorage.iffco_health_proposal_id = '';
        sessionStorage.proposerAgeiffco = '';

    }

}
