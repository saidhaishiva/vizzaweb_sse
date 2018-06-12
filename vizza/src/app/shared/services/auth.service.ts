import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    loggedIn() {
        return (this.getAccessToken() === undefined || this.getAccessToken() === '' || this.getAccessToken() == null) ?  false : true;
    }

    clearToken() {
        sessionStorage.removeItem('mt-doctor-userid');
        sessionStorage.removeItem('mt-doctor-doctorid');
        sessionStorage.removeItem('mt-doctor-doctorname');
        sessionStorage.removeItem('mt-doctor-accesstoken');
        sessionStorage.removeItem('mt-doctor-roleid');
    }

    setToken( doctorid, name, roleid, userid, accesstoken, assistantName  ) {
        sessionStorage.setItem('mt-doctor-userid', userid);
        sessionStorage.setItem('mt-doctor-doctorid', doctorid);
        sessionStorage.setItem('mt-doctor-doctorname', name);
        sessionStorage.setItem('mt-doctor-accesstoken', accesstoken);
        sessionStorage.setItem('mt-doctor-roleid', roleid);
        sessionStorage.setItem('mt-doctor-assistantname', assistantName);

    }
    getUserId() {
        return sessionStorage.getItem('mt-doctor-userid');
    }
    getDoctorId() {
        return sessionStorage.getItem('mt-doctor-doctorid');
    }
    getDoctorName() {
        return sessionStorage.getItem('mt-doctor-doctorname');
    }

    getAccessToken() {
        return sessionStorage.getItem('mt-doctor-accesstoken');
    }

    getRoleId() {
        return sessionStorage.getItem('mt-doctor-roleid');
    }
    getAssistantName() {
        return sessionStorage.getItem('mt-doctor-assistantname');
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
