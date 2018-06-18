import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    loggedIn() {
        return (this.getAccessToken() === undefined || this.getAccessToken() === '' || this.getAccessToken() == null) ?  false : true;
    }

    clearToken() {
        sessionStorage.removeItem('admin-id');
        sessionStorage.removeItem('admin-roleid');
        sessionStorage.removeItem('admin-name');
        sessionStorage.removeItem('admin-accesstoken');
    }

    setToken( adminid, adminroleid, name, accesstoken  ) {
        sessionStorage.setItem('admin-id', adminid);
        sessionStorage.setItem('admin-roleid', adminroleid);
        sessionStorage.setItem('admin-name', name);
        sessionStorage.setItem('admin-accesstoken', accesstoken);
    }
    getAdminId() {
        return sessionStorage.getItem('admin-id');
    }
    getAdminRoleId() {
        return sessionStorage.getItem('admin-roleid');
    }
    getAdminName() {
        return sessionStorage.getItem('admin-name');
    }

    getAccessToken() {
        return sessionStorage.getItem('admin-accesstoken');
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
