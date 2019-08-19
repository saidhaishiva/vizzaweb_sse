import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BranchService } from '../../shared/services/branch.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  public compDetails: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public total: any;
  public selectedStatus: any;
  public statusList: any;
  public status: any;
  aproveStatus:any;

  constructor(public auth: AuthService, public branchservice: BranchService, public router: Router, public toastr: ToastrService) {
    this.selectedStatus = '';
    this.statusList = [
      {'id': 1, 'name': 'Active'},
      {'id': 0, 'name': 'InActive'}
    ];
  }

  ngOnInit() {
    this.componentList();
    this.aproveStatus = true;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.component_name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  changeStatus() {
    let rows;
    let temp;
    if (this.selectedStatus == '0') {
      rows = this.compDetails.filter(data => data.status == 0 );
      temp = rows;
    } else if (this.selectedStatus == '1') {
      rows = this.compDetails.filter(data => data.status == 1 );
      temp = rows;
    }
    this.rows =  rows;
    this.temp =  temp;
    console.log(rows, 'rows');
  }

  public componentList() {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
    };
    this.loadingIndicator = true;
    this.branchservice.componentSelect(data).subscribe(
        (successData) => {
          this.componentSelectSuccess(successData);
        },
        (error) => {
          this.componentSelectFailure(error);
        }
    );
  }
  public componentSelectSuccess(success) {
    // alert('in')
    console.log(success.ResponseObject);
    this.loadingIndicator = false;
    if (success.IsSuccess) {
      this.total = success.ResponseObject.length;
      this.compDetails = success.ResponseObject;
      for (let i =0; i <this.compDetails.length; i++) {
        this.compDetails[i].aprove = this.compDetails[i].status == 0 ? false : true;
      }
      this.rows = success.ResponseObject;
      this.temp = success.ResponseObject;
    } else {
    }
  }
  public componentSelectFailure(error) {
    // alert('out')
    console.log(error);
  }

    addMetaDetails() {
        this.router.navigate(['/addComponent']);
    }

    edit(row){
        this.router.navigate(['/editComponent/' + row.id]);
    }

  delete(row){
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'id': row.id

    };
    console.log(data);
    this.branchservice.componentDelete(data).subscribe(
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
      this.componentList();
    } else {
      this.toastr.error(successData.ResponseObject);

    }
  }
  public deleteFailure(error) {
    if (error.status === 401) {
      this.status = error.status;
    }
  }

  updateStatus(i, value) {
    const data = {
      'platform': 'web',
      'role_id': this.auth.getAdminRoleId(),
      'adminid': this.auth.getAdminId(),
      'status': value.aprove,
      'id': value.id
    };
    this.loadingIndicator = true;
    this.branchservice.componentStatus(data).subscribe(
        (successData) => {
          this.approveSuccess(successData);
        },
        (error) => {
          this.approveFailure(error);
        }
    );
  }

  public approveSuccess(success) {
    console.log(success.ResponseObject);
    if (success.IsSuccess) {
      this.componentList();
      this.toastr.success(success.ResponseObject);
    }
    // else {
    //   this.toastr.error(success.ErrorObject)
    // }
  }
  public approveFailure(error) {
    alert('out')
  }

}
