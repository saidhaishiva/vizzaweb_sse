import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {BranchService} from '../../shared/services/branch.service';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {MatDialog} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
export const MY_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MM YYYY',
        dateA11yLabel: 'DD/MM/YYYY',

        monthYearA11yLabel: 'MM YYYY',
    },
};
@Component({
  selector: 'app-salesmanager',
  templateUrl: './salesmanager.component.html',
  styleUrls: ['./salesmanager.component.scss']
})
export class SalesmanagerComponent implements OnInit {
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
    public selectedBranch: any;
    public branchManager:any;
    public branchLists: any;
    public bmList: any;
    public total: any;
    public rmList: any;
    public settings: Settings;
    constructor(public auth: AuthService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.salesManagerList('', []);
        this.branchList('');
        this.branchManagerList([]);
        // this.relationalManagerList([])
    }

    public salesManagerList(bmId,bId) {

        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'bm_id': bmId,
            'branch_id': bId,
        };

        this.branchservice.salesManagerList(data).subscribe(
            (successData) => {
                this.salesSuccess(successData);
            },
            (error) => {
                this.salesFailure(error);
            }
        );
    }

    public salesSuccess(success) {
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
        console.log(val,'ss');
        const temp = this.temp.filter(function(d) {
            return d.firstname.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        console.log(this.rows, 'opo');
        this.table.offset = 0;
    }

    public salesFailure(error) {

    }
    public branchList(bmid) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branchmanagerid': bmid
        };
        this.loadingIndicator = false;

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
        } else {
        }
    }

    public branchListFailure(error) {

    }
    // changeList() {
    //     this.salesManagerList(this.selectedBranch);
    //
    // }
    public branchManagerList(value) {
        const data = {
            'platform': 'web',
            'roleid': this.auth.getAdminRoleId(),
            'userid': this.auth.getAdminId(),
            'branch_id': value,

        };

        this.branchservice.branchManagerList(data).subscribe(
            (successData) => {
                this.branchSuccess(successData);
            },
            (error) => {
                this.branchFailure(error);
            }
        );
    }
    public branchSuccess(success) {
        console.log(success);
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.bmList = success.ResponseObject;
        } else {
        }
    }
    public branchFailure(error) {

    }
    changeManagerList() {
        this.branchList(this.branchManager);
    }
    changeManager() {
      this.salesManagerList(this.branchManager,this.selectedBranch);

    }
    // public relationalManagerList(val) {
    //
    //     const data = {
    //         'platform': 'web',
    //         'roleid': this.auth.getAdminRoleId(),
    //         'userid': this.auth.getAdminId(),
    //         'salesmanagerid': val
    //
    //     };
    //
    //     this.branchservice.relationalManagerList(data).subscribe(
    //         (successData) => {
    //             this.relationalSuccess(successData);
    //         },
    //         (error) => {
    //             this.relationalFailure(error);
    //         }
    //     );
    // }
    //
    // public relationalSuccess(success) {
    //
    //     this.loadingIndicator = false;
    //     console.log(success);
    //     if (success.IsSuccess) {
    //         this.rmList = success.ResponseObject;
    //     } else {
    //     }
    // }
    // public relationalFailure(error){
    //
    // }
    // change() {
    // }
}
