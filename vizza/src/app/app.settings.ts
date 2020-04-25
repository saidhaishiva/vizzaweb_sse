import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Vizza',   //theme name
        true,       //loadingSpinner
        true,       //fixedHeader
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned  
        false,       //sidenavUserBlock
        false,   // HomeSidenavUserBlock
        'horizontal', //horizontal , verticalz
        'default',  //default, compact, mini
        'teal-light',   //indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
        false ,
         0,
         '', // true = rtl, false = ltr
        ''
    )
}

