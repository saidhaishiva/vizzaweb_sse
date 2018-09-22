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
    tabValue: string;
    totalPOS: any;
    pendingPOSCount: number;
    approvedPOSCount: number;
    holdPOSCount: number;
    rejectedPOSCount: number;
    POSStatus: any;
    posStatus: any;
    pageOffSet: any;
    allManagerLists: any;
    posManager: any;
    filterStatus: any;
    searchTag: string;
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
        this.posManager = '';
        this.pendingPOSCount = 0;
        this.approvedPOSCount = 0;
        this.holdPOSCount = 0;
        this.rejectedPOSCount = 0;
        this.POSStatus = '0';
        this.filterStatus = false;
    }
    ngOnInit() {
        this.getPOSList('inactive');
        this.managerList();
    }
    filtermanagerWise() {
        this.filterStatus = true;
        this.temp = [];
        this.rows = [];
        this.totalPOS = '';
        this.getPOSList('inactive');
    }
    getPOSList(value) {
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': '',
            'pos_manager_id': this.posManager ? this.posManager : ''
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
        this.settings.loadingSpinner = false;
        if (successData.IsSuccess) {
            console.log(successData.ResponseObject[0].pos_status, 'poss');
            if (this.filterStatus) {
                if (successData.ResponseObject[0].pos_status == '0') {
                    this.tabValue = 'inactive';
                } else  if (successData.ResponseObject[0].pos_status == '1') {
                    this.tabValue = 'active';
                }else  if (successData.ResponseObject[0].pos_status == '2') {
                    this.tabValue = 'rejected';
                }else  if (successData.ResponseObject[0].pos_status == '3') {
                    this.tabValue = 'onhold';
                }
            } else {
                this.tabValue = 'inactive';
            }

            let POS = [];
            if (value == 'inactive') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '0') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            } else if (value == 'active') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '1') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;
                    }
                }
            } else if (value == 'rejected') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '2') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = successData.ResponseObject.length;

                    }
                }
            } else if (value == 'onhold') {
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '3') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
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
        this.settings.loadingSpinner = false;
        console.log(error);
    }
    public tabChange(value) {
        console.log(value);
        this.temp = [];
        this.rows = [];
            this.getPOSList(value);

    }
    POSProfile(id, status) {
        console.log(id, 'skfkhsdkfhdkf');
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
    public managerList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId()
        };
        this.common.branchList(data).subscribe(
            (successData) => {
                this.branchListSuccess(successData);
            },
            (error) => {
                this.branchListFailure(error);
            }
        );
    }
    public branchListSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            this.allManagerLists = success.ResponseObject;

        } else {
        }
    }

    public branchListFailure(error) {

    }
}

