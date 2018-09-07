import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    loggedIn() {
        return (this.getAccessToken() === undefined || this.getAccessToken() === '' || this.getAccessToken() == null) ?  false : true;
    }

    clearToken() {
        sessionStorage.removeItem('vizza-pos-email');
        sessionStorage.removeItem('vizza-pos-firstname');
        sessionStorage.removeItem('vizza-pos-userid');
        sessionStorage.removeItem('vizza-pos-lastname');
        sessionStorage.removeItem('vizza-pos-mobileno');
        sessionStorage.removeItem('vizza-pos-roleid');
        sessionStorage.removeItem('vizza-pos-accesstoken');
    }

    setToken( email, firstname, userid, lastname, mobileno, roleid, accesstoken, posStatus ) {
        sessionStorage.setItem('vizza-pos-email', email);
        sessionStorage.setItem('vizza-pos-firstname', firstname);
        sessionStorage.setItem('vizza-pos-userid', userid);
        sessionStorage.setItem('vizza-pos-lastname', lastname);
        sessionStorage.setItem('vizza-pos-mobileno', mobileno);
        sessionStorage.setItem('vizza-pos-roleid', roleid);
        sessionStorage.setItem('vizza-pos-accesstoken', accesstoken);
        sessionStorage.setItem('vizza-pos-status', posStatus);
    }
    getPosEmail() {
        return sessionStorage.getItem('vizza-pos-email');
    }
    getPosFirstName() {
        return sessionStorage.getItem('vizza-pos-firstname');
    }
    getPosUserId() {
        return sessionStorage.getItem('vizza-pos-userid');
    }
    getPosLastName() {
        return sessionStorage.getItem('vizza-pos-lastname');
    }
    getPosMobileno() {
        return sessionStorage.getItem('vizza-pos-mobileno');
    }
    getPosRoleId() {
        return (sessionStorage.getItem('vizza-pos-roleid')!= null) ? sessionStorage.getItem('vizza-pos-roleid') : 0;
    }
    getPosStatus() {
        return sessionStorage.getItem('vizza-pos-status');
    }
    getAccessToken() {
        return sessionStorage.getItem('vizza-pos-accesstoken');
    }
    getSessionData(variable) {
        return sessionStorage.getItem(variable);
    }
    setSessionData(variable, value) {
        return sessionStorage.setItem(variable, value);
    }



    /**
     * Checks wether used is logged in
     * and Redirects to users repository
     */
    checkAuthentication() {
        if (this.loggedIn()) {
            // route to home component
            // alert('checkAuthentication');
            this.router.navigate(['/dashboard']);
        }
    }
}
