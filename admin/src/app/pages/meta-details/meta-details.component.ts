import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-meta-details',
  templateUrl: './meta-details.component.html',
  styleUrls: ['./meta-details.component.scss']
})
export class MetaDetailsComponent implements OnInit {
  public data: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public total: any;
  // public testeditor: any;
  public status: any;
  public settings: Settings;
  testeditor: any;


  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService,  private toastr: ToastrService, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.mmetaDetailList();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  public mmetaDetailList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId()
    };
    this.loadingIndicator = true;

    this.branchservice.metaDetail(data).subscribe(
        (successData) => {
          this.metaDetailSuccess(successData);
        },
        (error) => {
          this.metaDetailFailure(error);
        }
    );
  }
  public metaDetailSuccess(success) {
    console.log(success.ResponseObject);
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.data = success.ResponseObject;
      this.total = success.ResponseObject.length;
      this.rows = this.data;
      this.temp = this.data;
    } else {
    }
  }
  public metaDetailFailure(error) {
    console.log(error);
  }

  addMetaDetails() {
    this.router.navigate(['/addMetaDetails']);
  }

  edit(row){
    this.router.navigate(['/editMetaDetails/' + row.id]);
  }

  delete(row){
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'id': row.id

    };
    console.log(data);
    this.branchservice.metaDetailDelete(data).subscribe(
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
      this.mmetaDetailList();
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
