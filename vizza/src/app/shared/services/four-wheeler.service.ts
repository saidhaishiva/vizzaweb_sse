import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class FourWheelerService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService, public auth: AuthService) {

  }
//// home page
  getMotorHomeDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/vehicleDetails';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/company';
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
      const url = this.configurationService.getFourwheelerInsurance() + 'productlist/index';
      response.push(this.http.post(url, json, httpOptions));

    }
    console.log(response, 'res');
    return Observable.forkJoin(response);

  }

  getClaimList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/NcbList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getHypoBankList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'common/Hypothecation_bank_list';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getHypoBankName(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'common/get_hypothecation_bank_name';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCompanyDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/getInsurerList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  previousPolicyType(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/previousPolicyType';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getRtoList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/getRtoDetails';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/cityList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getRegionList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'common/regionList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCompanyName(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'common/motorCompanyList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'common/manufactureDescList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'common/modelDescList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'common/variantList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'common/ccList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/enquiry';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // view details for fourwheeler
  viewKeyFeatureList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/view_keyfeatures';
    return this.http.post(url,json,httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }


  //////Reliance four wheeler motor

  //title
  fourWheelerRelianceGetTitleList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/salutationList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  fourWheelerRelianceGetBifuelList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'productlist/is_bifuel_kit';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
///GET occupation list
  fourWheeleroccupationList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/occupationList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //// get financial type

  getFinancialTypeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/financiarList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // get reliance pincode list

  fourWheelergetrPincodeList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  //fuelTypeList

  fourWheelerfuelTypeList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/fuelTypeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  ///fourWheelervoluntaryAmountList

  // fourWheelervoluntaryAmountList(data){
  //   const json = JSON.stringify(data);
  //   const token = this.authService.getAccessToken();
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  //   };
  //   const url = this.configurationService.getFourwheelerInsurance() + 'reliance/voluntaryDeductibleList';
  //   return this.http.post(url,json, httpOptions)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  fourWheelervoluntaryAmount(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/coverage';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }


  ///fourWheelerunnamedSiList

  // fourWheelerunnamedSiList(data){
  //   const json = JSON.stringify(data);
  //   const token = this.authService.getAccessToken();
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  //   };
  //   const url = this.configurationService.getFourwheelerInsurance() + 'reliance/unnamed_passanger_si_list';
  //   return this.http.post(url,json, httpOptions)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  fourWheelerunnamedSi(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/coverage';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  ///fourWheelergetPaidDriverSi

  fourWheelergetPaidDriverSi(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/pa_to_paid_si_list';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  fourWheelerBifuelChange(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'common/getFuelName';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //fourWheelergetTppdSi

  fourWheelergetTppdSi(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/tppd_cover_si_list';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //relationListDetails
  fourWheelerrelationListDetails(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/nomineeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //marital status list

  fourWheelermaritalList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/maritalStatus';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  //prevInsureList
  fourWheelerprevInsureList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/insuranceCompanyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //prevPolicyList

  fourWheelerprevPolicyList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/previousPolicyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

    coverPremium(data){
        const json = JSON.stringify(data);
        const token = this.authService.getAccessToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
        };
        const url = this.configurationService.getFourwheelerInsurance() + 'reliance/coverPremium';
        return this.http.post(url,json, httpOptions)
            .map(this.extractData)
            .catch(this.handleError);
    }

  fourWheelergetProposal(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //
  getDownloadPdfReliancefourWheeler(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/PolicyDownload' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }



  // Royal Sundaram Four Wheeler

  // Title
  getRoyalfourWheelerTitleList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/titleList';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  mobileotp(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/generateOtp';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  checkotp(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/verifyOtp';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // Occupation list
  getRoyalFourWheelerOccupationList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/occupationList';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // Vehicle Driven List
  getvehicleDrivenList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/vehicleDrivenList';
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // relationListDetails
  getRSRelationship(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/relationshipList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // previousInsurerList
  fourWheelergetpreviousInsurerList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/previousInsurerList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // modelList
  fourWheelerGetmodelListList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/modelList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // makemodel list
  fourWheelerGetmakeList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/makeList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // voluntaryDeductibleList
  fourWheelervoluntaryDeductibleListt(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/voluntaryDeductibleList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // addOn
  fourWheeleraddOnList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/addOn';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // city for communication
  fourWheelergetcityList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/policyList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)        .catch(this.handleError);
  }
// pincode for communication
  getRsPincodeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // vehicleRegisteredNameList
  fourWheelerGetvehicleRegisteredNameList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/vehicleRegisteredNameList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // ncbPreviousList
  fourWheelerncbPreviousList(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/ncbPreviousList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // financedValue
  fourWheelerfinancedValue(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/financedValue';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
// typeOfCover
  fourWheelergettypeOfCover(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/typeOfCover';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)        .catch(this.handleError);
  }
  // drivingExperience
  fourWheelergetdrivingExperience(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/drivingExperience';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)        .catch(this.handleError);
  }
  // mileage
  fourWheelerGetmileage(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/mileage';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // accidentCoverUnnamedPassengers
  fWaccidentCoverUnnamedPassengers(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/accidentCoverPassengers';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // accidentCoverDriver
  fourWheeleraccidentCoverDriver(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/accidentCoverDriver';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
    fourWheeleridvValue(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/idvRange';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
    // city for registration
  getRoyalRegPincodeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/cityList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
//  policy download
  getDownloadPdfRoyal(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/policy_download' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
// policy
  getRsPolicyDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/policyType';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // BiFuelKit
  getRsBiFuelKitDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/biFuel';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // baggage
  getRsbaggageValueDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/baggageValue';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }


// calculate premium
  proposalCreationRoyal(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/calculatePremium';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/updateVehicleDetails';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  calculatrepremiumrs(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/coverPremium';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
    fourWheeleraddOnsValue(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'royalsundaram/addOnPremium';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // End of Royal Sundaram

// shriram //
  proposalCreation(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getCoverPremium(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/coverPremium';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/shriramMotorNomineeList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/hypothecationBankList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/hypothecationTypeList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/addonCoverPackageList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/policyList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/proposalList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/tittleList';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/get_pincode_details';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/previousInsurerList';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getvoluntaryExcess(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/voluntaryExcess';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getDownloadPdfShriram(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/PolicyDownload' ;
    return this.http.post(url , json, httpOptions)
        .map(this.extractData )
        .catch(this.handleError);
  }
  getHypoPincodeList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'shriram/get_pincode_details';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  // shriram end //

  // Tataaig pincodeList

  PincodeList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/pincode';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/gender';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  packagesList(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/addons_contents';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  // // Tataaig NameList
  //
  // NameList(data) {
  //   const json = JSON.stringify(data);
  //   const httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
  //   };
  //   const url = this.configurationService.getFourwheelerInsurance() + 'tata/previousInsurerName';
  //   return this.http.post(url,json, httpOptions)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }

  // Tataaig RelationList

  RelationList(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/nomineeRelationship';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/financerDetails';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  tataFinancierName(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/financialname ';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //Tataaig packagelist

  packagetype(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/carAddons';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/fullQuote ';
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
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //tataaig PdfDownload

  getCarPolicyNumber(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/getPolicyNo';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  getDownloadPdfTataaig(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'tata/PolicyDownload';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
    getDownloadCarPdfHDFC(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'hdfc/PolicyDownload';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
    proposalHdfccar(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'hdfc/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
  hdfcCarCover(data) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'hdfc/coverPremium ';
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
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
