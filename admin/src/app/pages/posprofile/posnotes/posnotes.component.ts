import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from '../../../shared/services/auth.service';
import { DoctorsService} from '../../../shared/services/doctors.service';

@Component({
  selector: 'app-doctornotes',
  templateUrl: './posnotes.component.html',
  styleUrls: ['./posnotes.component.scss']
})
export class PosnotesComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    editing = {};
    rows = [];
    temp = [];
    selected = [];
    loadingIndicator: boolean = true;
    reorderable: boolean = true;
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];
    public settings: Settings;

    notes: any;
    title: any;
    getNotes: any;
    pageno: number;
    recordsperpage: any;
    pageOffSet: any;
    searchTag: string;
    totalNotes: any;
    constructor(
        public dialogRef: MatDialogRef<PosnotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public appSettings: AppSettings, public auth: AuthService, public doctorservice: DoctorsService, ) {
        this.title = data;
        this.pageno = 1;
        this.recordsperpage = 5;
        this.totalNotes = 0;
        this.settings = this.appSettings.settings;
        this.dialogRef.disableClose = true;

    }
    ngOnInit() {
      if (this.title.title == 'Notify') {
      }
      if (sessionStorage.notes != '' && sessionStorage.notes != undefined) {
          this.notes = sessionStorage.notes;
      }
    }
    onNoClick(): void {
        this.dialogRef.close({type: this.notes, title: this.title});
    }
    setPage(pageInfo) {
        this.pageno = pageInfo.offset + 1;
        this.pageOffSet = pageInfo.offset;
    }



    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }
    saveNotes() {
        sessionStorage.notes = this.notes;
        this.dialogRef.close({type: this.notes, title: this.title});

    }

}
