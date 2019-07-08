import { Component, OnInit, ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import { AddtestimonialComponent } from './addtestimonial/addtestimonial.component';
import { EdittestimonialComponent } from './edittestimonial/edittestimonial.component';
import { ToastrService } from 'ngx-toastr';


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


  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog, public toastr: ToastrService) {
    this.webhost = this.config.getimgUrl();
  }

  ngOnInit() {
    this.testimonialList();
  }

  public testimonialList() {
    const data = {
      'platform': 'web',
      'role_id': '1',
    };
    this.loadingIndicator = true;

    this.branchservice.testimonialList(data).subscribe(
        (successData) => {
          this.testimonialSuccess(successData);
        },
        (error) => {
          this.testimonialFailure(error);
        }
    );
  }

  public testimonialSuccess(success) {
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.data = success.ResponseObject;
      this.total = success.ResponseObject.length;
      this.rows = this.data;
      this.temp = this.data;
    } else {
    }
  }

  public testimonialFailure(error) {

  }

  updateFilter(event) {
    console.log(event,'ed');
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.manager_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  speical(){
    const dialogRef = this.dialog.open(AddtestimonialComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList();
      }

    });
  }

  approve(row) {
    const data = {
      'platform': "web",
      'role_id': "1",
      'testemonial_id': row.id,
      'testemonial_status': row.status,
    };
    console.log(data,'approvedata');
    this.branchservice.statusupdate(data).subscribe(
        (successData) => {
          this.approveSuccess(successData);
        },
        (error) => {
          this.approveFailure(error);
        }
    );
  }
  approveSuccess(successData) {
    if (successData.IsSuccess) {
      this.toastr.success(successData.ResponseObject);
     }
  }
  approveFailure(error) {

  }

  edit(row) {
    const dialogRef = this.dialog.open(EdittestimonialComponent, {
      width: '800px',
      data: row,

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.testimonialList();
      }

    });
  }
}
