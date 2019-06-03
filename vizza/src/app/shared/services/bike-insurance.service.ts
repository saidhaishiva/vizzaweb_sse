import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class BikeInsuranceService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService, public auth: AuthService) {

  }
// bike home page
  getMotorHomeDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'productlist/vehicleDetails';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCompanyList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'productlist/company';
    return this.http.post(url, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getPremieumList(data, list) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    let response: any;
    response = [];
    for (let i = 0; i < list.length; i++) {
      data.company_id = list[i].company_id;
      let json = '';
      json = JSON.stringify(data);
      const url = this.configurationService.getBikeInsurance() + 'productlist/index';
      response.push(this.http.post(url, json, httpOptions));

    }
    console.log(response, 'res');
    return Observable.forkJoin(response);

  }
// shriram Insurance
  proposalCreation(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getNomineeRelationship(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/shriramMotorNomineeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getHypothecation(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/hypothecationBankList';
    return this.http.post(url, json,httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getHypothecationType(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/hypothecationTypeList';
    return this.http.post(url, json,httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getAddonPackage(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/addonCoverPackageList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getPolicyDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/policyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getProposalDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/proposalList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getTitleList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/tittleList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getPincodeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getClaimList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/NcbList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCityList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/cityList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getBuissnessList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/businessType';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getManifactureList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/manufactureDescList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getModelList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/modelDescList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getvariantList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/variantList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCCList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/ccList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getEnquiryDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'productlist/enquiry';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getPreviousList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/previousInsurerList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getHypoPincodeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
// download pdf
  getDownloadPdfShriram(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'shriram/PolicyDownload' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
// royal insurance
  getDownloadPdfRoyal(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/policy_download' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // calculate premium
  proposalCreationRoyal(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/calculatePremium';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  updateproposalCreationRoyal(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/updateVehicleDetails';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // title
  getTitle(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/titleList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // previousInsure
  getPreviousLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/previousInsurerList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // vountaryDetails
  getVountaryLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/voluntaryDeductibleList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  //policy Type
  getPolicyLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/policyType' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // registration name
  getRegNameLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/vehicleRegisteredNameList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // fuel List
  getdrivingExpLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/drivingExperience' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  getmilageLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/mileage' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // pa
  getpaLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/accidentCoverPassengers' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  //
  getpaidLists(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/accidentCoverDriver';
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // Occupation
  getOccupationList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/occupationList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // vichecal driven
  getvehicelList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'royalsundaram/vehicleDrivenList' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  // getvehicelList(data) {
  //   const json = JSON.stringify(data);
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  //   };
  //   const url = this.configurationService.getBikeInsurance() + 'royalsundaram/vehicleMostlyDrivenOnList' ;
  //   return this.http.post(url , json, httpOptions)
  //       .map(this.extractData )
  //       .catch(this.handleError);
  // }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }


  ////// RELIANCE MOTOR BIKE

//title
  RelianceGetTitleList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/salutationList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
///GET occupation list
  occupationList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/occupationList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // get reliance pincode list

  getrPincodeList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  //fuelTypeList

  fuelTypeList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/fuelTypeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //relationListDetails
  relationListDetails(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/nomineeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //marital status list

  maritalList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/maritalStatus';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  //prevInsureList
  prevInsureList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/insuranceCompanyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //prevPolicyList

  prevPolicyList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/previousPolicyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getProposal(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'reliance/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig GenderList

  GenderList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/gender';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }


// Tataaig pincodeList

  PincodeList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/pincode';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig CodeList

  CodeList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/previousInsurerCode';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig NameList

  NameList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/previousInsurerName';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig RelationList

  RelationList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/nomineeRelationship';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig QuoteList

  QuoteList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/fullQuote';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // Tataaig ProposalCreation

  proposal(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //Tataaig FinancierType

  Finacetype(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/financerDetails';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //
  getDownloadPdfTataaig(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getBikeInsurance() + 'tata/financerDetails';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      // const body = error.json() || '';
      const err = error || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(error);
  }
}



