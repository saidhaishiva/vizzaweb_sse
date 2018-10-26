import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CommonService} from '../../shared/services/common.service';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AppSettings} from '../../app.settings';
import {DoctorsService} from '../../shared/services/doctors.service';
import {DatePipe} from '@angular/common';
import {AddrenewalComponent} from './addrenewal/addrenewal.component';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.scss']
})
export class RenewalComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
    total:any;
    aproveStatus:any;
    statusList:any;
    selectedStatus:any;
    allRenewalDetails:any;
    loadingIndicator: boolean = true;
    constructor(public route: ActivatedRoute, public datepipe: DatePipe, public auth: AuthService, public doctorService: DoctorsService, private toastr: ToastrService, public router: Router, public authService: AuthService,
                public appSettings: AppSettings, public common: CommonService, public config: ConfigurationService, public dialog: MatDialog) {
        this.selectedStatus = '';
        this.statusList = [
            {'id': 1, 'name': 'Active'},
            {'id': 0, 'name': 'InActive'}
        ];
    }
  ngOnInit() {
      this.renewalDetails();
      this.aproveStatus = true;
  }
    addAmin() {

        const dialogRef = this.dialog.open(AddrenewalComponent, {
            width: '900px'
        });
        dialogRef.disableClose = true;

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    public renewalDetails() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
        };
        this.loadingIndicator = true;
        this.common.renewalList(data).subscribe(
            (successData) => {
                this.renewalListSuccess(successData);
            },
            (error) => {
                this.renewalListFailure(error);
            }
        );
    }

    public renewalListSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.total = success.ResponseObject.length;
            this.allRenewalDetails = success.ResponseObject;
            for (let i =0; i <this.allRenewalDetails.length; i++) {
                this.allRenewalDetails[i].aprove = this.allRenewalDetails[i].status == 0 ? false : true;
            }
            this.rows = success.ResponseObject;
            this.temp = success.ResponseObject;
        } else {
        }
    }
    public renewalListFailure(error) {
        this.loadingIndicator = false;
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return d.insure_name.toLowerCase().indexOf(val) !== -1 || d.insure_mobile.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    updateStatus(i, value) {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'insure_status': value.aprove,
            'insure_id': value.insure_id
        };
        this.loadingIndicator = true;
        this.common.approve(data).subscribe(
            (successData) => {
                this.approveSuccess(successData);
            },
            (error) => {
                this.approveFailure(error);
            }
        );
    }

    public approveSuccess(success) {
        if (success.IsSuccess) {
            this.renewalDetails();
            this.toastr.success(success.ResponseObject);
        }
    }
    public approveFailure(error) {

    }

    changeStatus() {
      let rows;
      let temp;
      if (this.selectedStatus == '0') {
          rows = this.allRenewalDetails.filter(data => data.status == 0 );
          temp = rows;
      } else if (this.selectedStatus == '1') {
          rows = this.allRenewalDetails.filter(data => data.status == 1 );
          temp = rows;
        }
        this.rows =  rows;
        this.temp =  temp;
        console.log(rows, 'rows');
    }

}
