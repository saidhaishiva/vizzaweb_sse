import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class FourWheelerService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService, public auth: AuthService) {

  }



  //////Reliance four wheeker motor

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

  fourWheelergetProposal(data){
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getFourwheelerInsurance() + 'reliance/proposal';
    return this.http.post(url,json, httpOptions)
        .map(this.extractData)        .catch(this.handleError);
  }

  //Royal Sundaram Four Wheeler

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
