import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {AuthService} from './../../shared/services/auth.service';
import {DashboardService} from '../../shared/services/dashboard.service';
import { orders, products, customers, refunds } from './dashboard.data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public settings: Settings;
    public orders: any[];
    public products: any[];
    response: any;
    status: any;
    data: any;
    details: any;
    public colorScheme = {
        domain: ['#999']
    };


    constructor(public appSettings: AppSettings, public Dashboard: DashboardService, public authService: AuthService) {
        this.settings = this.appSettings.settings;
        this.data = '';
        this.details = '';
    }

    ngOnInit() {
        this.orders = orders;
        this.products = products;

        // call service
        // this.settings.loadingSpinner = true;
        this.doctorDetails();

    }

    public doctorDetails() {
        // this.settings.loadingSpinner = false;
        // const data = {
        //     'platform': 'webadmin',
        //     'roleid': this.authService.getRoleId(),
        //     'userid' : this.authService.getUserId()
        // };
        // this.Dashboard.getDoctorDetails(data).subscribe(
        //     (successData) => {
        //         this.dashboardSuccess(successData);
        //     },
        //     (error) => {
        //         this.dashboardFailure(error);
        //     }
        // );
    }

    // handle success data

    // public dashboardSuccess(successData) {
    //     this.settings.loadingSpinner = false;
    //     if (successData.IsSuccess) {
    //         console.log(successData.ResponseObject, 'successData.ResponseObject');
    //         this.data = successData.ResponseObject.count;
    //         this.details = successData.ResponseObject.doctor;
    //         console.log(this.data, 'count');
    //         console.log(this.details, 'doc');
    //     }
    // }
    //
    // // handle error data
    //
    // public dashboardFailure(error) {
    //     console.log(error);
    //     this.settings.loadingSpinner = false;
    // }

}
