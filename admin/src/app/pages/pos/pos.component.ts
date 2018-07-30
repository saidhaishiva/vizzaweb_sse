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
        this.getPOSList('inactive');
    }

    getPOSList(value) {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': ''
        };
        this.common.getPOSList(data).subscribe(
            (successData) => {
                this.getPOSListSuccess(successData, value);
            },
            (error) => {
                this.getPOSListFailure(error);
            }
        );
    }
    getPOSListSuccess(successData, value) {
        if (successData.IsSuccess) {
            this.settings.loadingSpinner = false;
            let POS = [];
            if (value == 'inactive') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '0') {
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            } else if (value == 'active') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '1') {
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            } else if (value == 'rejected') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '2') {
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            } else if (value == 'onhold') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '3') {
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            }

        }
    }
    getPOSListFailure(error) {
        console.log(error);
    }
    public tabChange(value) {
        console.log(value);
        this.temp = [];
        this.rows = [];
        // if (value == 'inactive') {
        //     this.getPOSList('inactive')
        // } else if (value == 'active') {
        //     this.getPOSList('active')
        // } else if (value == 'rejected') {
        //    this.getPOSList('rejected')
        // } else if (value == 'onhold') {
            this.getPOSList(value);
        // }

    }
    POSProfile(id, status) {
        console.log(id, 'skfkhsdkfhdkf');
        // this.settings.loadingSpinner = true;
        this.router.navigate(['/pos-profile/' + id + '/' + status]);

    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return d.pos_firstname.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
}

