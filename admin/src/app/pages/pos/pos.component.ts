import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Settings} from '../../app.settings.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {AppSettings} from '../../app.settings';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {DoctorsService} from '../../shared/services/doctors.service';



import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';


declare var google: any;


@Component({
    selector: 'app-doctors',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss'],

})
export class PosComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    pendingDoctorsList: Array<any>;
    approvedDoctorsList: Array<any>;
    holdDoctorsList: Array<any>;
    rejectedDoctorsList: Array<any>;
    filters: string;
    doctorStatus: number;
    pageno: number;
    recordsperpage: any;
    public webhost: string;
    public settings: Settings;
    rows = [];
    temp = [];
    selected = [];
    loadingIndicator: boolean = true;
    reorderable: boolean = true;
    tabValue: string;
    totalDoctors: any;
    pendingDoctorsCount: number;
    approvedDoctorsCount: number;
    holdDoctorsCount: number;
    rejectedDoctorsCount: number;


    pageOffSet: any;
    searchTag: string;
    infoWindow: any;
    columns = [
        {prop: 'doctorname'},
        {prop: 'mobilenumber'},
        {name: 'hospitalname'},
        {name: 'speciality'},
        {name: 'designation'}
    ];

    constructor(public router: Router, public route: ActivatedRoute,
                public appSettings: AppSettings, private toastr: ToastrService,
                public dialog: MatDialog, public auth: AuthService,
                public config: ConfigurationService, public doctorService: DoctorsService) {

        this.settings = this.appSettings.settings;
        this.settings.loadingSpinner = true;
        this.webhost = this.config.getimgUrl();
        this.filters = 'No';
        this.doctorStatus = 0;
        this.pageno = 1;
        this.tabValue = 'pending';
        this.recordsperpage = 10;
        this.pendingDoctorsList = [];
        this.approvedDoctorsList = [];
        this.holdDoctorsList = [];
        this.rejectedDoctorsList = [];
        this.totalDoctors = 0;
        this.searchTag = '';
        this.pendingDoctorsCount = 0;
        this.approvedDoctorsCount = 0;
        this.holdDoctorsCount = 0;
        this.rejectedDoctorsCount = 0;


    }

    ngOnInit() {

        this.setPage({offset: 0});
    }

    setPage(pageInfo) {
        this.pageno = pageInfo.offset + 1;
        this.pageOffSet = pageInfo.offset;
    }



    doctorProfile(id) {
        console.log(id, 'skfkhsdkfhdkf');
        this.settings.loadingSpinner = true;
        this.router.navigate(['/doctor-profile/' + id]);

    }


    public tabChange(value) {
        this.tabValue = value;
        console.log(value);
        let doctors = [];
        if (value === 'pending') {
            this.doctorStatus = 0;
            if (this.pendingDoctorsList.length === 0) {
            } else {
                doctors = [];
                this.totalDoctors = this.pendingDoctorsCount;
                console.log(this.pendingDoctorsList);
                doctors = this.pendingDoctorsList;
                this.temp = [...doctors];
                this.rows = doctors;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else if (value === 'approved') {
            this.doctorStatus = 1;
            if (this.approvedDoctorsList.length === 0) {
            } else {
                doctors = [];
                this.totalDoctors = this.approvedDoctorsCount;
                doctors = this.approvedDoctorsList;
                this.temp = [...doctors];
                this.rows = doctors;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else if (value === 'onhold') {
            this.doctorStatus = 3;
            if (this.holdDoctorsList.length === 0) {
                console.log(this.holdDoctorsList.length);
            } else {
                console.log(this.holdDoctorsList);
                doctors = [];
                this.totalDoctors = this.holdDoctorsCount;
                doctors = this.holdDoctorsList;
                this.temp = [...doctors];
                this.rows = doctors;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else  {
            this.doctorStatus = 2;
            if (this.rejectedDoctorsList.length === 0) {
            } else {
                doctors = [];
                this.totalDoctors = this.rejectedDoctorsCount;
                doctors = this.rejectedDoctorsList;
                this.temp = [...doctors];
                this.rows = doctors;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        }


    }

    public updateFilter(event) {
        this.searchTag = event.target.value.toLowerCase();
        this.loadingIndicator = true;
        this.setPage({offset: 0});

    }


}

