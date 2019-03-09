import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ConfigurationService} from './configuration.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
@Injectable()
export class LifeService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService, private authService: AuthService) { }

  //Life Insurance table service
  getInsurerDetails(data) {
    console.log('haiiii');
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostLife() + 'lifeendowment/lists' ;
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }
//Life Key Feature Details
  getKeyFeatureDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostLife() + 'lifeendowment/keyFeatures' ;
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  //Pincode
  getPincodeDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostHealth() + 'common/checkpincode' ;
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getLifeAssistDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostLife() + 'Lifeendowment/insert_assist_details' ;
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  contactDetails(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostHome() + 'contact/addContactDetails' ;
    return this.http.post(url, json, httpOptions)
        .map(this.extractData)
        .catch(this.handleError);
  }

  fileUpload(data) {
    const json = JSON.stringify(data);
    const token = this.authService.getAccessToken();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = this.configurationService.getHostHealth() + 'common/webupload' ;
    return this.http.post(url, json, httpOptions)
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
