import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {AdddmComponent} from '../dmmanager/adddm/adddm.component';
import {AddcenterComponent} from './addcenter/addcenter.component';

@Component({
  selector: 'app-mediacenter',
  templateUrl: './mediacenter.component.html',
  styleUrls: ['./mediacenter.component.scss']
})
export class MediacenterComponent implements OnInit {
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
  }
    public mediacenterList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
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
        const dialogRef = this.dialog.open(AddcenterComponent, {
            width: '800px'
        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
            }

        });
    }

}
