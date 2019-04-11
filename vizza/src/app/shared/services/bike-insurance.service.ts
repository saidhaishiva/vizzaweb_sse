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
    const url = this.configurationService.getBikeInsurance() + 'shriram/getHypothenticateAddr';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
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
