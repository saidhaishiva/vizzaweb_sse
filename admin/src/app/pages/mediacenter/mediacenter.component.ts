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
import {EditdmComponent} from '../dmmanager/editdm/editdm.component';
import {EditmediaComponent} from './editmedia/editmedia.component';

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
    loadingIndicator: boolean = true;
    public response: any;
    public status: any;
    public total: any;
    public settings: Settings;
    aaaaa: any;
    val: any;
  constructor(public auth: AuthService,  private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog) {


  }

  ngOnInit() {
      this.mediacenterList();
  }
    public mediacenterList() {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
        };
        this.loadingIndicator = true;

        this.branchservice.mediaCenterList(data).subscribe(
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
        this.loadingIndicator = false;
        if (success.IsSuccess) {
            this.data = success.ResponseObject;
            for(let i=0; i<this.data.length; i++) {
                let html = this.data[i].center;
                let div = document.createElement("div");
                div.innerHTML = html;
                let text = div.textContent || div.innerText || "";
              this.data[i].content = text;

            }
            this.total = success.ResponseObject.length;
            this.rows = this.data;
            this.temp = this.data;
            console.log(this.data, 'hjkl');
        } else {
        }
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.center.toLowerCase().indexOf(val) !== -1 || !val;
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
                this.mediacenterList();
            }

        });
    }
    edit(row) {
        const dialogRef = this.dialog.open(EditmediaComponent, {
            width: '800px',
            data: row,

        });
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.mediacenterList();
            }

        });
    }
    delete(row) {
        const data = {
            'platform': 'web',
            'role_id': this.auth.getAdminRoleId(),
            'adminid': this.auth.getAdminId(),
            'id': row.id

        };


        console.log(data);
        this.branchservice.deleteMedia(data).subscribe(
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

            this.mediacenterList();
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
