import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

declare let numeral: any;

@Injectable()
export class ConfigurationService {

  apiHost: string = environment.apiHost;
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
  }
    getHost() {
        return this.apiHost;
    }
    getwebHost() {
        return this.webHost;
    }
    getimgUrl() {
    return this.imgUrl;
    }
}
