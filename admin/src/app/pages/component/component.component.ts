import {Component, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { BranchService } from '../../shared/services/branch.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  public data: any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  public total: any;
  public selectedStatus: any;
  public statusList: any;

  constructor(public auth: AuthService, public branchservice: BranchService, public router: Router) {
    this.selectedStatus = '';
    this.statusList = [
      {'id': 1, 'name': 'Active'},
      {'id': 0, 'name': 'InActive'}
    ];
  }

  ngOnInit() {
    this.componentList();
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
      rows = this.data.filter(data => data.status == 0 );
      temp = rows;
    } else if (this.selectedStatus == '1') {
      rows = this.data.filter(data => data.status == 1 );
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
      this.data = success.ResponseObject;
      for (let i =0; i <this.data.length; i++) {
        this.data[i].aprove = this.data[i].status == 0 ? false : true;
      }
      this.rows = this.data;
      this.temp = this.data;
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

}
