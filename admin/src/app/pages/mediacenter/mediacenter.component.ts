import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {Settings} from '../../app.settings.model';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {BranchService} from '../../shared/services/branch.service';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

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
    val: any;
    testeditor: any;
  constructor(public auth: AuthService,  private toastr: ToastrService, public config: ConfigurationService, public branchservice: BranchService, public dialog: MatDialog, public router: Router) {


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
            // for(let i=0; i<this.data.length; i++) {
            //     let html = this.data[i].center;
            //     let div = document.createElement("div");
            //     div.innerHTML = html;
            //     let text = div.textContent || div.innerText || "";
            //   this.data[i].content = text;
            //
            // }
            this.total = success.ResponseObject.length;
            this.rows = this.data;
            this.temp = this.data;
          //  this.testeditor ='<p><strong>testing</strong></p><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASDSURBVGhD7dp5yGVzHMfxx75vWZIta/xjKdIUIcQfCiEGMyIkIUvCSLJEsicSofwhIlnKkjVEUpYIfyBmkD37vr7f89xv/frO755zn/vMPc+dzKde9cy553fu7957fuuZiaX5n2V5nIm38Ae+wwPYGUtMVsTj+LfidxyBJSKXovYhwk/YFGOd5fANah+gdAnGOluiVvHsYYx1Nket4pkNf6yzDD5FrfKlczH2OR21ygfb0LroNKtgnRYroIy/yh2ofQjHk73QWex9bsFfqFWo5NhwJVZCmYPxCD7Am7gBm6HTnI1apZu8hu0wNtkKP6NW2">';
           // console.log(this.data, 'hjkl');
        } else {
        }
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.refrence_by.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    public dmFailure(error) {

    }
    addMedia(){
      this.router.navigate(['/add-mediacenter']);
        // const dialogRef = this.dialog.open(AddcenterComponent, {
        //     width: '1000px'
        // });
        // dialogRef.afterClosed().subscribe(res => {
        //     if (res) {
        //         this.mediacenterList();
        //     }
        //
        // });
    }
    edit(row) {
        // this.router.navigate(['/edit-mediacenter'+'/'+row.id]);
        console.log(row.id);
        this.router.navigate(['/edit-mediacenter/' + row.id]);


        // const dialogRef = this.dialog.open(EditmediaComponent, {
        //     width: '800px',
        //     data: row,
        //
        // });
        // dialogRef.afterClosed().subscribe(res => {
        //     if (res) {
        //         this.mediacenterList();
        //     }
        //
        // });
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
