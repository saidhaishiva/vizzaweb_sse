import {Component, OnInit, ViewChild} from '@angular/core';
import {BranchService} from '../../shared/services/branch.service';
import {AuthService} from '../../shared/services/auth.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {MatDialog} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {AddbranchComponent} from './addbranch/addbranch.component';
import {EditbranchComponent} from './editbranch/editbranch.component';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
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
    public branchLists: any;
  constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService,public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.branchList();
  }

    public branchList() {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': ''

        };
        // this.loadingIndicator = true;

        this.branchservice.branchList(data).subscribe(
            (successData) => {
                this.branchListSuccess(successData);
            },
            (error) => {
                this.branchListFailure(error);
            }
        );
    }
    public branchListSuccess(success) {
         this.loadingIndicator = false;

        console.log(success);
        if (success.IsSuccess) {
            this.branchLists = success.ResponseObject;
            this.rows = this.branchLists;
            this.temp = this.branchLists;

        } else {
        }
    }

    public branchListFailure(error) {

    }
    speical() {
        const dialogRef = this.dialog.open(AddbranchComponent, {
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.branchList();
            }

        });

    }
    edit(row) {
      console.log(row);
        const dialogRef = this.dialog.open(EditbranchComponent, {
            width: '400px',
            data : row,

        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.branchList();
            }

        });

    }

    updateFilter(event) {

        const val = event.target.value.toLowerCase();
        console.log(val,'ss');
        const temp = this.temp.filter(function(d) {
            return d.branchname.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        console.log(this.rows, 'opo');
        this.table.offset = 0;
    }
}
