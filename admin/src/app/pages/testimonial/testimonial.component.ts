import {Component, OnInit, ViewChild} from '@angular/core';
import {Settings} from '../../app.settings.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {AppSettings} from '../../app.settings';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {DoctorsService} from '../../shared/services/doctors.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigurationService} from '../../shared/services/configuration.service';
import { CommonService } from '../../shared/services/common.service';
import { BranchService } from '../../shared/services/branch.service';
import {EdittestimonialComponent} from '../testimonial/edittestimonial/edittestimonial.component';
import { AddtestimonialComponent } from './addtestimonial/addtestimonial.component';

declare var google: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
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
  selectedList: any;
  allPosLists: any;
  roleId: any;
  searchTag: string;

  constructor(public router: Router, public route: ActivatedRoute,
              public appSettings: AppSettings, private toastr: ToastrService,
              public dialog: MatDialog, public auth: AuthService,
              public config: ConfigurationService, public common: CommonService, public doctorService: DoctorsService,public branchservice: BranchService) {
    this.settings = this.appSettings.settings;
    // this.settings.loadingSpinner = true;
    this.roleId = this.auth.getAdminId();
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
    this.filterStatus = false;  }

  ngOnInit() {
    this.testimonialList('inactive');
  }

  testimonialList(value) {
    this.temp = [];
    this.rows = [];
    this.totalPOS = 0;
    this.settings.loadingSpinner = true;
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
    };
    this.branchservice.testimonialList(data).subscribe(
        (successData) => {
          this.testimonialSuccess(successData, value);
        },
        (error) => {
          this.testimonialFailure(error);
        }
    );
  }
  testimonialSuccess(successData, value) {
    this.settings.loadingSpinner = false;
    this.loadingIndicator = false;
    if (successData.IsSuccess) {
      console.log(value, 'value');
      this.allPosLists = successData.ResponseObject;
      if (value == 'inactive') {
        let POS = [];
        for (let i =0; i < successData.ResponseObject.length; i++) {
          if (successData.ResponseObject[i].status === '0') {
            this.posStatus = successData.ResponseObject[i].status;
            POS.push(successData.ResponseObject[i]);
            this.temp = POS;
            this.rows = POS;
            this.totalPOS = POS.length;
          }
        }
      } else if (value == 'active') {
        let POS = [];
        for (let i =0; i < successData.ResponseObject.length; i++) {
          if (successData.ResponseObject[i].status === '1') {
            this.posStatus = successData.ResponseObject[i].status;
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
          if (successData.ResponseObject[i].status === '2') {
            this.posStatus = successData.ResponseObject[i].status;
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
          if (successData.ResponseObject[i].status === '3') {
            this.posStatus = successData.ResponseObject[i].status ;
            POS.push(successData.ResponseObject[i]);
            this.temp = [...POS];
            this.rows = POS;
            this.totalPOS = POS.length;

          }
        }
      }

    }
  }
  testimonialFailure(error) {
    this.settings.loadingSpinner = false;
    console.log(error);
  }
  public tabChange(value) {
    console.log(value);
    this.tabValue = value;
    this.temp = [];
    this.rows = [];
    this.testimonialList(value);
  }

  speical () {
    const dialogRef = this.dialog.open(AddtestimonialComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList(this.tabValue);
      }

    });
  }

  updateFilter(event) {
    console.log(event,'ed');
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.customer_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  edit(row) {
    const dialogRef = this.dialog.open(EdittestimonialComponent, {
      width: '800px',
      data: row,

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList(this.tabValue);
      }

    });
  }

  updatestatus(row,event) {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'testemonial_id': row.id,
      'testemonial_status': event.checked == true ? '1' : '0'
    };
    this.branchservice.statusupdate(data).subscribe(
        (successData) => {
          this.UpdateSuccess(successData);
        },
        (error) => {
          this.UpdateFailure(error);
        }
    );
  }

  UpdateSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
      this.testimonialList(this.tabValue);
    }
  }

  UpdateFailure(error) {
    console.log(error);
  }
}
