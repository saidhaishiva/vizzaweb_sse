import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {AddposmanagerComponent} from '../posmanager/addposmanager/addposmanager.component';
import {EditposmanagerComponent} from '../posmanager/editposmanager/editposmanager.component';
import {AdddmComponent} from './adddm/adddm.component';
import {EditdmComponent} from './editdm/editdm.component';

@Component({
  selector: 'app-dmmanager',
  templateUrl: './dmmanager.component.html',
  styleUrls: ['./dmmanager.component.scss']
})
export class DmmanagerComponent implements OnInit {
    public webhost: any;
    public data: any;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
    // loadingIndicator: boolean = true;
    public response: any;
    public status: any;
    public total: any;
    public settings: Settings;
  constructor(public auth: AuthService,  private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) { }

  ngOnInit() {
      this.dmManagerList();
  }
    public dmManagerList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'admin_id': this.auth.getAdminId(),
        };
        // this.loadingIndicator = true;

        this.branchservice.dmManagerList(data).subscribe(
            (successData) => {
                this.dmSuccess(successData);
            },
            (error) => {
                this.dmFailure(error);
            }
        );
    }

    public dmSuccess(success) {
        console.log(success);
        // this.loadingIndicator = false;
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

    public dmFailure(error) {

    }
    speical(){
        const dialogRef = this.dialog.open(AdddmComponent, {
            width: '400px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.dmManagerList();
            }

        });
    }

    edit(row) {
        const dialogRef = this.dialog.open(EditdmComponent, {
            width: '400px',
            data: row,

        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                 this.dmManagerList();
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
        this.branchservice.dmDelete(data).subscribe(
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

            this.dmManagerList();
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
