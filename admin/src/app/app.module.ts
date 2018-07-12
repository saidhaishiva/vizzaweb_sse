import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import {HttpClientModule} from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule} from '@angular/material';

import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RejectDoctor} from './pages/doctorprofile/doctorprofile.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
// import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';

import { ConfigurationService } from './shared/services/configuration.service';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';

import { LoginService } from './shared/services/login.service';
import { UsersService } from './shared/services/users.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CommonService } from './shared/services/common.service';
import { ConfirmPasswordComponent } from './pages/confirm-password/confirm-password.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import {DoctorprofileComponent} from './pages/doctorprofile/doctorprofile.component';
import {ClinicimageviewComponent} from './pages/doctorprofile/clinicimageview/clinicimageview.component';
import { DoctorsService } from './shared/services/doctors.service';
import { DoctornotesComponent } from './pages/doctorprofile/doctornotes/doctornotes.component';
import {DashboardService} from './shared/services/dashboard.service';
import { AddposComponent } from './pages/addpos/addpos.component';
import { PosComponent } from './pages/pos/pos.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxDatatableModule,
        ToastrModule.forRoot(),
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        HttpModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
        }),
        PerfectScrollbarModule,
        CalendarModule.forRoot(),
        SharedModule,
        PipesModule,
        NgxPaginationModule,
        routing
    ],
    declarations: [
        AppComponent,
        PagesComponent,
        NotFoundComponent,
        ErrorComponent,
        SidenavComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        BreadcrumbComponent,
        FlagsMenuComponent,
        FullScreenComponent,
        ApplicationsComponent,
        MessagesComponent,
        UserMenuComponent,
        ForgotPasswordComponent,
        ConfirmPasswordComponent,
        AboutUsComponent,
        FaqComponent,
        ContactUsComponent,
        DoctorprofileComponent,
        ClinicimageviewComponent,
        DoctornotesComponent,
        RejectDoctor,
        AddposComponent,
        PosComponent
    ],
    providers: [
        AppSettings,
        ConfigurationService,
        AuthService,
        LoginService,
        UsersService,
        AuthGuardService,
        DoctorsService,
        CommonService,
        DashboardService,
        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        { provide: OverlayContainer, useClass: CustomOverlayContainer }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ ClinicimageviewComponent, DoctornotesComponent, RejectDoctor,  ]
})
export class AppModule { }