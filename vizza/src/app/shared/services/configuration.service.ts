import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

declare let numeral: any;

@Injectable()
export class ConfigurationService {

  apiHost: string = environment.apiHost;
  apiHostTravel: string = environment.apiHostTravel;
  apiHostPersonalaccident: string = environment.apiHostPersonalaccident;
  apiHostHealth: string = environment.apiHostHealth;

  webHost: string = environment.webHost;
  imgUrl: string = environment.imgUrl;
  host: string;
  webhost: string;
  imgurl: string;
  apihost: string;
  datasetPath: string;
  floatFormat = '0,0.000';
  percentFormat = '0.000%'
  intFormat = '0,0';

  constructor() {
    this.webhost = this.webHost;
    this.imgurl = this.imgUrl;
    this.apihost = this.apiHost;
    this.apiHostTravel = this.apiHostTravel;
    this.apiHostPersonalaccident = this.apiHostPersonalaccident;
    this.apiHostHealth = this.apiHostHealth;
  }
    getHost() {
        return this.apiHost;
    }
    getHostTravel() {
        return this.apiHostTravel;
    }
    getHostPersonalaccident() {
        return this.apiHostPersonalaccident;
    }
    getwebHost() {
        return this.webHost;
    }
    getimgUrl() {
    return this.imgUrl;
    }
    getHostHealth(){
      return this.apiHostHealth;
  }
}
