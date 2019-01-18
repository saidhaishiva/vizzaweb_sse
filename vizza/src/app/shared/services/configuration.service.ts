import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

declare let numeral: any;

@Injectable()
export class ConfigurationService {

  apiHost: string = environment.apiHost;
  apiHostTravel: string = environment.apiHostTravel;
  apiHostPa: string = environment.apiHostPa;
  apiHostHealth: string = environment.apiHostHealth;
  apiHostPos: string = environment.apiHostPos;

  webHost: string = environment.webHost;
  imgUrl: string = environment.imgUrl;
  host: string;
  webhost: string;
  imgurl: string;
  apihost: string;
  datasetPath: string;
  floatFormat = '0,0.000';
  percentFormat = '0.000%';
  intFormat = '0,0';

  constructor() {
    this.webhost = this.webHost;
    this.imgurl = this.imgUrl;
    this.apihost = this.apiHost;
    this.apiHostTravel = this.apiHostTravel;
    this.apiHostPa = this.apiHostPa;
    this.apiHostHealth = this.apiHostHealth;
    this.apiHostPos = this.apiHostPos;
  }
    getHost() {
        return this.apiHost;
    }
    getHostTravel() {
        return this.apiHostTravel;
    }
    getHostPa() {
        return this.apiHostPa;
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
  getHostPos(){
    return this.apiHostPos;
  }
}
