import { Injectable } from '@angular/core';


import { ConfigurationService } from './configuration.service';
import 'rxjs/Rx';

@Injectable()
export class UsersService {

  constructor( private configurationService: ConfigurationService) { }


}
