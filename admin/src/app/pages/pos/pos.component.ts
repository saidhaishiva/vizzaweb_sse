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
    allLists: any;
    selectedList: any;
    allPosLists: any;
    roleId: any;
    searchTag: string;
    constructor(public router: Router, public route: ActivatedRoute,
                public appSettings: AppSettings, private toastr: ToastrService,
                public dialog: MatDialog, public auth: AuthService,
                public config: ConfigurationService, public common: CommonService, public doctorService: DoctorsService) {
        this.settings = this.appSettings.settings;
        // this.settings.loadingSpinner = true;
        this.roleId = this.auth.getAdminRoleId();
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
        this.allLists = [
            {name: 'All'},
            {name: 'Documents'},
            {name: 'Training'},
            {name: 'Examination'}
        ];
    }
    ngOnInit() {
        this.getPOSList('inactive');
        this.managerList();
    }
    filtermanagerWise() {
        this.filterStatus = true;
        this.getPOSList('active');
    }
    allActiveLists() {
        this.posManager = '';
        this.getPOSList('active');

    }
    filterPending() {
        this.temp = [];
        this.rows = [];
        this.totalPOS = 0;
        let POS = [];
        if (this.selectedList == 'All') {
            for (let i =0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].pos_status =='3') {
                    this.posStatus = this.allPosLists[i].pos_status;
                    POS.push(this.allPosLists[i]);
                    this.temp = [...POS];
                    this.rows = POS;
                    this.totalPOS = this.allPosLists[i].length;
                }
            }
        } else if (this.selectedList == 'Documents') {
            for (let i = 0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].pos_status == '3' && this.allPosLists[i].doc_verified_status == '1') {
                    this.posStatus = this.allPosLists[i].pos_status;
                    POS.push(this.allPosLists[i]);
                    this.temp = [...POS];
                    this.rows = POS;
                    this.totalPOS = this.allPosLists[i].length;
                    console.log(this.temp, 'this.temp');
                }
            }

        } else if (this.selectedList == 'Training') {
            for (let i = 0; i < this.allPosLists.length; i++) {
                    if (this.allPosLists[i].pos_status == '3' && this.allPosLists[i].doc_verified_status == '2' && this.allPosLists[i].training_status == '0') {
                    this.posStatus = this.allPosLists[i].pos_status;
                    POS.push(this.allPosLists[i]);
                    this.temp = [...POS];
                    this.rows = POS;
                    this.totalPOS = this.allPosLists[i].length;
                    console.log(this.temp, 'this.temp');
                }
            }
        } else if (this.selectedList == 'Examination') {
            for (let i =0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].pos_status == '3' && this.allPosLists[i].doc_verified_status == '2' && (this.allPosLists[i].exam_status == '1' || this.allPosLists[i].exam_status == '0')) {
                    this.posStatus = this.allPosLists[i].pos_status;
                    POS.push(this.allPosLists[i]);
                    this.temp = [...POS];
                    this.rows = POS;
                    this.totalPOS = POS.length;
                    console.log(this.rows, 'this.allPosLists[i].pos_status');
                }
            }

        }
    }

    getPOSList(value) {
        this.temp = [];
        this.rows = [];
        this.totalPOS = 0;
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': '',
            'pos_manager_id': this.posManager && this.posManager != 'all' ? this.posManager : ''
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
        this.loadingIndicator = false;
        if (successData.IsSuccess) {
            console.log(value, 'value');
            this.allPosLists = successData.ResponseObject;
            if (value == 'inactive') {
                let POS = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '0') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = POS;
                        this.rows = POS;
                        this.totalPOS = POS.length;
                    }
                }
            } else if (value == 'active') {
                let POS = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '1') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = POS.length;
                        // console.log(this.totalPOS, 'totalPOS');
                    }
                }
            } else if (value == 'rejected') {
                let POS = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '2') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = POS.length;

                    }
                }
            } else if (value == 'onhold') {
                let POS = [];
                this.rows = [];
                this.temp = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].pos_status === '3') {
                        this.posStatus = successData.ResponseObject[i].pos_status;
                        POS.push(successData.ResponseObject[i]);
                        this.temp = [...POS];
                        this.rows = POS;
                        this.totalPOS = POS.length;

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
        this.tabValue = value;
        this.temp = [];
        this.rows = [];
        this.getPOSList(value);

    }
    POSProfile(id, status) {
        this.router.navigate(['/pos-profile/' + id + '/' + status]);
    }
    POSEdit(id){
        this.router.navigate(['/pos-edit/' + id]);
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        console.log(val, 'val');
       // const val1 = event.target.value.toUpperCase();
        const temp = this.temp.filter(function(d) {
            if (d.pos_name.toLowerCase().indexOf(val) !== -1 || d.pos_mobileno.toLowerCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 || d.doc_aadhar_no.toLowerCase().indexOf(val) !== -1 || !val) {
                return d.pos_name.toLowerCase().indexOf(val) !== -1 || d.pos_mobileno.toLowerCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 || d.doc_aadhar_no.toLowerCase().indexOf(val) !== -1 || !val;
            }
            // else if (d.doc_pan_no.toUpperCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 ! || val ) {
            //     return d.doc_pan_no.toUpperCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 || !val;
            // }
            // else if (d.pos_mobileno.toLowerCase().indexOf(val) !== -1 || !val) {
            //     return d.pos_mobileno.toLowerCase().indexOf(val) !== -1 || !val;
            // } else if (d.doc_aadhar_no.toLowerCase().indexOf(val) !== -1 || !val) {
            //     return d.doc_aadhar_no.toLowerCase().indexOf(val) !== -1 || !val;
            // }
            // else if (d.doc_pan_no.toUpperCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 ! || val ) {
            //     return d.doc_pan_no.toUpperCase().indexOf(val) !== -1 || d.doc_pan_no.toLowerCase().indexOf(val) !== -1 || !val;
            // }
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    // updateFilter(event) {
    //     console.log(event,'ed');
    //     const val = event.target.value.toLowerCase();
    //     const temp = this.temp.filter(function (d) {
    //         return d.pos_name.toLowerCase().indexOf(val) !== -1 || !val;
    //         return d.pos_mobileno.toLowerCase().indexOf(val) !== -1 || !val;
    //     });
    //
    //     this.rows = temp;
    //     this.table.offset = 0;
    // }
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
    getDownload(){
        let posStatus = '';
        if(this.tabValue == 'inactive'){
             posStatus = '0';
        } else if(this.tabValue == 'active') {
             posStatus = '1';
        }  else if(this.tabValue == 'rejected') {
          posStatus = '2';
        } else if(this.tabValue == 'onhold') {
            posStatus = '3';
        }

const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'pos_status': posStatus
        };
        this.common.getDownloadPosReport(data).subscribe(
            (successData) => {
                this.downloadSuccess(successData);
            },
            (error) => {
                this.downloadFailure(error);
            }
        );
    }
    public downloadSuccess(success) {
        console.log(success);
        if (success.IsSuccess) {
            window.open(success.ResponseObject, '_self');

        } else {
        }
    }

    public downloadFailure(error) {

    }

}

