import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { ToastrModule } from 'ngx-toastr';


export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }