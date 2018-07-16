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
import { CommonService } from '../../shared/services/common.service';

declare var google: any;


@Component({
    selector: 'app-doctors',
    templateUrl: './pos.component.html',
    styleUrls: ['./pos.component.scss'],

})
export class PosComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    pendingPOSList: Array<any>;
    approvedPOSList: Array<any>;
    holdPOSList: Array<any>;
    rejectedPOSList: Array<any>;
    filters: string;
    tabStatus: any;
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
    totalPOS: any;
    pendingPOSCount: number;
    approvedPOSCount: number;
    holdPOSCount: number;
    rejectedPOSCount: number;
    POSStatus: any;


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
                public config: ConfigurationService, public common: CommonService, public doctorService: DoctorsService) {

        this.settings = this.appSettings.settings;
        // this.settings.loadingSpinner = true;
        this.webhost = this.config.getimgUrl();
        this.filters = 'No';
        this.tabStatus = '0';
        this.pageno = 1;
        this.tabValue = 'inactive';
        this.recordsperpage = 10;
        this.pendingPOSList = [];
        this.approvedPOSList = [];
        this.holdPOSList = [];
        this.rejectedPOSList = [];
        this.totalPOS = 0;
        this.searchTag = '';
        this.pendingPOSCount = 0;
        this.approvedPOSCount = 0;
        this.holdPOSCount = 0;
        this.rejectedPOSCount = 0;
        this.POSStatus = '0';


    }

    ngOnInit() {

        this.setPage({offset: 0});
    }

    setPage(pageInfo) {
        this.pageno = pageInfo.offset + 1;
        this.pageOffSet = pageInfo.offset;
        this.getPOSList()
    }

    getPOSList() {
        this.settings.loadingSpinner = true;
        if (this.tabStatus == '0') {
            this.tabValue = 'inactive';
        } else if (this.tabStatus == '1') {
            this.tabValue = 'active';
        } else if (this.tabStatus == '2') {
            this.tabValue = 'rejected';
        } else {
            this.tabValue = 'onhold';
        }
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': this.POSStatus
        };
        this.common.getPOSList(data).subscribe(
            (successData) => {
                this.getPOSListSuccess(successData);
            },
            (error) => {
                this.getPOSListFailure(error);
            }
        );
    }

    getPOSListSuccess(successData) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            console.log(successData);
            let POS = [];
            if (this.tabStatus == '0') {
                this.pendingPOSList = successData.ResponseObject;
                POS = [];
                POS = this.pendingPOSList;
                this.pendingPOSCount = successData.ResponseObject.length;
                this.totalPOS = this.pendingPOSCount;

            } else if (this.tabStatus == '1') {
                this.approvedPOSList = successData.ResponseObject;
                POS = [];
                POS = this.approvedPOSList;
                this.approvedPOSCount = successData.ResponseObject.length;
                this.totalPOS = this.approvedPOSCount;

            } else if (this.tabStatus == '2') {
                this.rejectedPOSList = successData.ResponseObject;
                POS = [];
                POS = this.rejectedPOSList;
                this.rejectedPOSCount = successData.ResponseObject.length;
                this.totalPOS = this.rejectedPOSCount;
            } else {
                this.holdPOSList = successData.ResponseObject;
                POS = [];
                POS = this.holdPOSList;
                this.holdPOSCount = successData.ResponseObject.length;
                this.totalPOS = this.holdPOSCount;
            }

            this.temp = [...POS];
            this.rows = POS;
            setTimeout(() => {
                this.loadingIndicator = false;
            }, 1500);
        } else {
            this.settings.loadingSpinner = false;
        }
    }

    getPOSListFailure(error) {
        console.log(error);
    }

    public tabChange(value) {
        this.tabValue = value;
        console.log(value);
        let POS = [];
        if (value === 'inactive') {
            this.POSStatus = '0';
            if (this.pendingPOSList.length === 0) {
                this.getPOSList();
            } else {
                POS = [];
                this.totalPOS = this.pendingPOSCount;
                console.log(this.pendingPOSList);
                POS = this.pendingPOSList;
                this.temp = [...POS];
                this.rows = POS;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else if (value === 'active') {
            this.POSStatus = '1';
            if (this.approvedPOSList.length === 0) {
                this.getPOSList();
            } else {
                POS = [];
                this.totalPOS = this.approvedPOSCount;
                POS = this.approvedPOSList;
                this.temp = [...POS];
                this.rows = POS;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else if (value === 'onhold') {
            this.POSStatus = '3';
            if (this.holdPOSList.length === 0) {
                console.log(this.holdPOSList.length);
                this.getPOSList();
            } else {
                console.log(this.holdPOSList);
                POS = [];
                this.totalPOS = this.holdPOSCount;
                POS = this.holdPOSList;
                this.temp = [...POS];
                this.rows = POS;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        } else {
            this.POSStatus = '2';
            if (this.rejectedPOSList.length === 0) {
                this.getPOSList();
            } else {
                POS = [];
                this.totalPOS = this.rejectedPOSCount;
                POS = this.rejectedPOSList;
                this.temp = [...POS];
                this.rows = POS;
                setTimeout(() => {
                    this.loadingIndicator = false;
                }, 1500);
            }
        }
    }
    POSProfile(id) {
        console.log(id, 'skfkhsdkfhdkf');
        // this.settings.loadingSpinner = true;
        this.router.navigate(['/pos-profile/' + id + '/' + this.POSStatus]);

    }
    public updateFilter(event) {
        this.searchTag = event.target.value.toLowerCase();
        this.loadingIndicator = true;
        this.setPage({offset: 0});

    }
}

