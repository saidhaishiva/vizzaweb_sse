import { Component, OnInit, ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
// import {EditposmanagerComponent} from './editposmanager/editposmanager.component';
import {ToastrService} from 'ngx-toastr';
import {AddposmanagerComponent} from '../posmanager/addposmanager/addposmanager.component';
import {EditposmanagerComponent} from '../posmanager/editposmanager/editposmanager.component';
// import {AddposmanagerComponent} from './addposmanager/addposmanager.component';


@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  public webhost: any;
  public data: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public response: any;
  public status: any;
  public total: any;
  public settings: Settings;


  constructor(public auth: AuthService,  private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) { }

  ngOnInit() {
    this.testimonialList();
  }

  public testimonialList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
    };
    this.loadingIndicator = true;

    this.branchservice.testimonialList(data).subscribe(
        (successData) => {
          this.posSuccess(successData);
        },
        (error) => {
          this.posFailure(error);
        }
    );
  }

  public posSuccess(success) {
    console.log(success);
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.data = success.ResponseObject;
      this.total = success.ResponseObject.length;
      this.rows = this.data;
      this.temp = this.data;
    } else {
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.manager_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  public posFailure(error) {

  }
  speical(){
    const dialogRef = this.dialog.open(AddposmanagerComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList();
      }

    });
  }

  edit(row) {
    const dialogRef = this.dialog.open(EditposmanagerComponent, {
      width: '400px',
      data: row,

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList();
      }

    });
  }
  delete(row) {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'manager_id': row.manager_id

    };


    console.log(data);
    this.branchservice.delete(data).subscribe(
        (successData) => {
          this.deleteSuccess(successData);
        },
        (error) => {
          this.deleteFailure(error);
        }
    );
  }


  public deleteSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);

      this.testimonialList();
    } else {
      this.toastr.error(successData.ResponseObject);

    }
  }
  public deleteFailure(error) {
    if (error.status === 401) {
      this.status = error.status;
    }
  }


}
