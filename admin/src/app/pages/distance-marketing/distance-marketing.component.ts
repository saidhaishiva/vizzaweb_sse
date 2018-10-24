import { Component, OnInit, ViewChild } from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Settings} from '../../app.settings.model';
import {DoctorsService} from '../../shared/services/doctors.service';
import {AppSettings} from '../../app.settings';
import {AuthService} from '../../shared/services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-distance-marketing',
  templateUrl: './distance-marketing.component.html',
  styleUrls: ['./distance-marketing.component.scss']
})
export class DistanceMarketingComponent implements OnInit {

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
    totalDM: any;
    pendingPOSCount: number;
    approvedPOSCount: number;
    holdPOSCount: number;
    rejectedPOSCount: number;
    dmStatus: any;
    pageOffSet: any;
    allManagerLists: any;
    posManager: any;
    filterStatus: any;
    allLists: any;
    selectedList: any;
    allPosLists: any;
    searchTag: string;
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
        this.totalDM = 0;
        this.searchTag = '';
        this.posManager = '';
        this.pendingPOSCount = 0;
        this.approvedPOSCount = 0;
        this.holdPOSCount = 0;
        this.rejectedPOSCount = 0;
        this.filterStatus = false;
        this.allLists = [
            {name: 'All'},
            {name: 'Documents'},
            {name: 'Training'},
            {name: 'Examination'}
        ];
    }
    ngOnInit() {
        this.getDmList('inactive');
        this.managerList();
    }
    filtermanagerWise() {
        this.filterStatus = true;
        this.getDmList('active');
    }
    allActiveLists() {
        this.posManager = '';
        this.getDmList('active');

    }
    filterPending() {
        this.temp = [];
        this.rows = [];
        this.totalDM = 0;
        let DM = [];
        if (this.selectedList == 'All') {
            for (let i =0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].dm_status =='3') {
                    this.dmStatus = this.allPosLists[i].dm_status;
                    DM.push(this.allPosLists[i]);
                    this.temp = [...DM];
                    this.rows = DM;
                    this.totalDM = this.allPosLists[i].length;
                }
            }
        } else if (this.selectedList == 'Documents') {
            for (let i = 0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].dm_status == '3' && this.allPosLists[i].doc_verified_status == '1') {
                    this.dmStatus = this.allPosLists[i].dm_status;
                    DM.push(this.allPosLists[i]);
                    this.temp = [...DM];
                    this.rows = DM;
                    this.totalDM = this.allPosLists[i].length;
                    console.log(this.temp, 'this.temp');
                }
            }

        } else if (this.selectedList == 'Training') {
            for (let i = 0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].dm_status == '3' && this.allPosLists[i].doc_verified_status == '2' && this.allPosLists[i].training_status == '0') {
                    this.dmStatus = this.allPosLists[i].dm_status;
                    DM.push(this.allPosLists[i]);
                    this.temp = [...DM];
                    this.rows = DM;
                    this.totalDM = this.allPosLists[i].length;
                    console.log(this.temp, 'this.temp');
                }
            }
        } else if (this.selectedList == 'Examination') {
            for (let i =0; i < this.allPosLists.length; i++) {
                if (this.allPosLists[i].dm_status == '3' && this.allPosLists[i].doc_verified_status == '2' && (this.allPosLists[i].exam_status == '1' || this.allPosLists[i].exam_status == '0')) {
                    this.dmStatus = this.allPosLists[i].dm_status;
                    DM.push(this.allPosLists[i]);
                    this.temp = [...DM];
                    this.rows = DM;
                    this.totalDM = DM.length;
                    console.log(this.rows, 'this.allPosLists[i].dm_status');
                }
            }

        }
    }

    getDmList(value) {
        this.temp = [];
        this.rows = [];
        this.totalDM = 0;
        this.settings.loadingSpinner = true;
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
            'status': '',
            'dm_manager_id': this.posManager && this.posManager != 'all' ? this.posManager : ''
        };
        this.common.getDmList(data).subscribe(
            (successData) => {
                this.getDmListSuccess(successData, value);
            },
            (error) => {
                this.getDmListFailure(error);
            }
        );
    }
    getDmListSuccess(successData, value) {
        this.settings.loadingSpinner = false;
        this.loadingIndicator = false;
        if (successData.IsSuccess) {
            console.log(value, 'value');
            this.allPosLists = successData.ResponseObject;
            if (value == 'inactive') {
                let DM = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].dm_status === '0') {
                        this.dmStatus = successData.ResponseObject[i].dm_status;
                        DM.push(successData.ResponseObject[i]);
                        this.temp = DM;
                        this.rows = DM;
                        this.totalDM = DM.length;
                    }
                }
            } else if (value == 'active') {
                let DM = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].dm_status === '1') {
                        this.dmStatus = successData.ResponseObject[i].dm_status;
                        DM.push(successData.ResponseObject[i]);
                        this.temp = [...DM];
                        this.rows = DM;
                        this.totalDM = DM.length;
                    }
                }
            } else if (value == 'rejected') {
                let DM = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].dm_status === '2') {
                        this.dmStatus = successData.ResponseObject[i].dm_status;
                        DM.push(successData.ResponseObject[i]);
                        this.temp = [...DM];
                        this.rows = DM;
                        this.totalDM = DM.length;

                    }
                }
            } else if (value == 'onhold') {
                let DM = [];
                this.rows = [];
                this.temp = [];
                for (let i =0; i < successData.ResponseObject.length; i++) {
                    if (successData.ResponseObject[i].dm_status === '3') {
                        this.dmStatus = successData.ResponseObject[i].dm_status;
                        DM.push(successData.ResponseObject[i]);
                        this.temp = [...DM];
                        this.rows = DM;
                        this.totalDM = DM.length;

                    }
                }
            }

        }
    }
    getDmListFailure(error) {
        this.settings.loadingSpinner = false;
        console.log(error);
    }
    public tabChange(value) {
        console.log(value);
        this.tabValue = value;
        this.temp = [];
        this.rows = [];
        this.getDmList(value);

    }
    DmProfile(id, status) {
        this.router.navigate(['/dm-profile/' + id + '/' + status]);
    }
    DmEdit(id){
        this.router.navigate(['/dm-edit/' + id]);
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        console.log(val, 'val');
        // const val1 = event.target.value.toUpperCase();
        const temp = this.temp.filter(function(d) {
            if (d.dm_firstname.toLowerCase().indexOf(val) !== -1 || d.dm_mobileno.toLowerCase().indexOf(val) !== -1 || !val) {
                return d.dm_firstname.toLowerCase().indexOf(val) !== -1 || d.dm_mobileno.toLowerCase().indexOf(val) !== -1 || !val;
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
    public managerList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId()
        };
        this.common.dmManagerList(data).subscribe(
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

