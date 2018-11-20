import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { SafePipe} from '../safe-pipe';
import {ScrollToModule} from 'ng2-scroll-to';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { SlickModule} from 'ngx-slick';
import { NgxPaginationModule } from 'ngx-pagination';

// import { ImageUploadModule } from "angular2-image-upload";

// services
import { LoginService } from './shared/services/login.service';
import { ConfigurationService } from './shared/services/configuration.service';
import { AuthService } from './shared/services/auth.service';
import { TravelService} from './shared/services/travel.service';
import { CommonService } from './shared/services/common.service';
import { ProposalService} from './shared/services/proposal.service';
import { LearningcenterService} from './shared/services/learningcenter.service';
import { DeactivateGuard} from './shared/deactivate-guard';
import { DeactivatetimeGuard} from './shared/deactivatetime-guard';
import { ExamactivateGuard} from './shared/activate-guard';
import { ExamdeactivatetimeGuard} from './shared/examdeactivatetime-guard';
import { DmexamactivateGuard} from './shared/dmactivate-guard';
import { DmdeactivatetimeGuard} from './shared/dmdeactivatetime-guard';
import { DmexamdeactivatetimeGuard} from './shared/dmexamdeactivatetime-guard';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
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

import { HealthinsurancelistComponent } from './pages/healthinsurancelist/healthinsurancelist.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

import { FixappointmentComponent } from './pages/fixappointment/fixappointment.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PosComponent } from './pages/pos/pos.component';

import { ProposalComponent } from './pages/proposal/proposal.component';
import { ProposalmessageComponent } from './pages/proposal/proposalmessage/proposalmessage.component';
import { HealthInsuranceComponent } from './pages/health-insurance/health-insurance.component';
import { GroupmembersAlert} from './pages/health-insurance/health-insurance.component';
import { HealthInsurer} from './pages/health-insurance/health-insurance.component';
import { ComparelistComponent} from './pages/health-insurance/comparelist/comparelist.component';
import { GrouppopupComponent} from './pages/health-insurance/grouppopup/grouppopup.component';
import { ConfirmpasswordComponent } from './pages/confirmpassword/confirmpassword.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { EditposComponent } from './pages/editpos/editpos.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { DownloadPolicyComponent } from './pages/download-policy/download-policy.component';
import {DownloadMessage} from './pages/payment-success/payment-success.component';
import {DownloadMessageReligare} from './pages/religare-payment-success/religare-payment-success.component';
import { PosstatusAlert} from './pages/health-insurance/health-insurance.component';
import { TruncatePipe} from '../limit.pipe';
import { ReligareComponent } from './pages/religare/religare.component';
import { ViewdetailsComponent } from './pages/health-insurance/viewdetails/viewdetails.component';
import { SplitLastPipe} from '../splitpipe';
import { TestimonialComponent } from './pages/home/testimonial/testimonial.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultpageComponent } from './pages/exam/resultpage/resultpage.component';
import { ConfrimAlert} from './pages/exam/exam.component';
import { ViewresultComponent } from './pages/viewresult/viewresult.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { PersonalaccidentComponent } from './pages/personalaccident/personalaccident.component';
import { TravelComponent } from './pages/travel/travel.component';
import { EntranceexamComponent } from './pages/entranceexam/entranceexam.component';
import { ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import { RegisterComponent} from './pages/register/register.component';
//import { PersonalAccidentProposalComponent } from './pages/personal-accident-proposal/personal-accident-proposal.component';
import { PosCertificateComponent } from './pages/pos-certificate/pos-certificate.component';
import { TrainingComponent } from './pages/training/training.component';
import { RelianceComponent } from './pages/reliance/reliance.component';
import { DocumentViewComponent } from './pages/posprofile/document-view/document-view.component';
import { TrainingcompletedAlert} from './pages/training/training.component';
import { DmTrainingcompletedAlert} from './pages/dm-training/dm-training.component';
import {ShopkeeperpolicyComponent} from './pages/shopkeeperpolicy/shopkeeperpolicy.component';
import {MarinecargoComponent} from './pages/marinecargo/marinecargo.component';
import {MarinehullComponent} from './pages/marinehull/marinehull.component';
import {AviationComponent} from './pages/aviation/aviation.component';
import {MoneyComponent} from './pages/money/money.component';
import {FireComponent} from './pages/fire/fire.component';
import {BurglaryComponent} from './pages/burglary/burglary.component';
import {MachineryComponent} from './pages/machinery/machinery.component';
import {ElectronicsComponent} from './pages/electronics/electronics.component';
import {ContractorsComponent} from './pages/contractors/contractors.component';
import {HouseholdComponent} from './pages/household/household.component';
import {PublicComponent} from './pages/public/public.component';
import {ProfessionalComponent} from './pages/professional/professional.component';
import {WorkmenComponent} from './pages/workmen/workmen.component';
import {GroupmedicalComponent} from './pages/groupmedical/groupmedical.component';
import {GrouppersonalComponent} from './pages/grouppersonal/grouppersonal.component';
import {GrouptermComponent} from './pages/groupterm/groupterm.component';
import {JewelersblockComponent} from './pages/jewelersblock/jewelersblock.component';
import {DirectorsComponent} from './pages/directors/directors.component';
import {BankersComponent} from './pages/bankers/bankers.component';
import {ErectionComponent} from './pages/erection/erection.component';
import { HealthComponent } from './health/health.component';
import { ReligarePaymentSuccessComponent } from './pages/religare-payment-success/religare-payment-success.component';
import { DmRegisterComponent } from './pages/dm-register/dm-register.component';
import { DmLoginComponent } from './pages/dm-login/dm-login.component';
import { DmProfileComponent } from './pages/dm-profile/dm-profile.component';
import { DmdocumentViewComponent } from './pages/dm-profile/dmdocument-view/dmdocument-view.component';
import { DmTrainingComponent } from './pages/dm-training/dm-training.component';
import { DmExamComponent } from './pages/dm-exam/dm-exam.component';
import { ReligareDownloadPolicyComponent } from './pages/religare-download-policy/religare-download-policy.component';
import { DmConfrimAlert} from './pages/dm-exam/dm-exam.component';
import { DmViewresultComponent } from './pages/dm-exam/dm-viewresult/dm-viewresult.component';
import {CareerComponent} from './pages/career/career.component';
import { DmForgotpasswordComponent } from './pages/dm-forgotpassword/dm-forgotpassword.component';
import { DmConfirmpasswordComponent } from './pages/dm-confirmpassword/dm-confirmpassword.component';
import { AboutPosComponent } from './pages/about-pos/about-pos.component';
import { AboutVizzaComponent } from './pages/about-vizza/about-vizza.component';
import { DmChangepasswordComponent } from './pages/dm-changepassword/dm-changepassword.component';
import { MediaCenterComponent } from './pages/media-center/media-center.component';
import { ViewmediaComponent } from './pages/media-center/viewmedia/viewmedia.component';
import { ReliancePaymentSuccessComponent } from './pages/reliance-payment-success/reliance-payment-success.component';
import { PersonalaccidentformComponent } from './pages/personalaccidentform/personalaccidentform.component';
import { PreligareComponent } from './pages/preligare/preligare.component';
import { TravelPremiumListComponent } from './pages/travel-premium-list/travel-premium-list.component';
import { TravelProposalComponent } from './pages/travel-proposal/travel-proposal.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      ToastrModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      HttpModule,
      NgxDatatableModule,
      NgxPaginationModule,
      NgxChartsModule,
      PdfViewerModule,
      ScrollToModule.forRoot(),
      SlickModule.forRoot(),
      // ImageUploadModule.forRoot(),
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    PipesModule,
      NgxMaterialTimepickerModule.forRoot(),
      AmazingTimePickerModule,
    routing
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
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
      HealthinsurancelistComponent,
      ComparelistComponent,
      HomeComponent,
      ContactComponent,
      HomeComponent,
      GrouppopupComponent,
      ForgotPasswordComponent,
      RegisterComponent,
      FixappointmentComponent,
      PosComponent,
      ProposalComponent,
      ProposalmessageComponent,
      GroupmembersAlert,
      HealthInsuranceComponent,
      ConfirmpasswordComponent,
      PosprofileComponent,
      EditposComponent,
      ChangepasswordComponent,
      PaymentSuccessComponent,
      DownloadPolicyComponent,
      DownloadMessage,
      DownloadMessageReligare,
      PosstatusAlert,
      TruncatePipe,
      ReligareComponent,
      ViewdetailsComponent,
      SplitLastPipe,
      TestimonialComponent,
      ExamComponent,
      ResultpageComponent,
      ConfrimAlert,
      ViewresultComponent,
      EntranceexamComponent,
     PersonalaccidentComponent,
      TravelComponent,
      //PersonalAccidentProposalComponent,
      PosCertificateComponent,
      TrainingComponent,
      RelianceComponent,
      DocumentViewComponent,
      TrainingcompletedAlert,
      DmTrainingcompletedAlert,
      ShopkeeperpolicyComponent,
      MarinecargoComponent,
      MarinehullComponent,
      AviationComponent,
      MoneyComponent,
      FireComponent,
      BurglaryComponent,
      MachineryComponent,
      ElectronicsComponent,
      ContractorsComponent,
      HouseholdComponent,
      PublicComponent,
      ProfessionalComponent,
      WorkmenComponent,
      GroupmedicalComponent,
      GrouppersonalComponent,
      GrouptermComponent,
      JewelersblockComponent,
      DirectorsComponent,
      BankersComponent,
      ErectionComponent,
      HealthComponent,
      ReligarePaymentSuccessComponent,
      HealthInsurer,
      DmRegisterComponent,
      DmLoginComponent,
      DmProfileComponent,
      DmdocumentViewComponent,
      DmTrainingComponent,
      DmExamComponent,
      ReligareDownloadPolicyComponent,
      DmConfrimAlert,
      DmViewresultComponent,
      CareerComponent,
      AboutPosComponent,
      DmForgotpasswordComponent,
      DmConfirmpasswordComponent,
      AboutVizzaComponent,
      DmChangepasswordComponent,
      MediaCenterComponent,
      ViewmediaComponent,
      SafePipe,
      ReliancePaymentSuccessComponent,
      PersonalaccidentformComponent,
      PreligareComponent,
      TravelPremiumListComponent,
      TravelProposalComponent,

  ],
  providers: [
      AppSettings,
      LoginService,
      ConfigurationService,
      AuthService,
      CommonService,
      TravelService,
      LearningcenterService,
      ProposalService,
      DeactivateGuard,
      DeactivatetimeGuard,
      ExamactivateGuard,
      ExamdeactivatetimeGuard,
      DmexamactivateGuard,
      DmdeactivatetimeGuard,
      DmexamdeactivatetimeGuard,
      DatePipe,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
    bootstrap: [AppComponent],
    entryComponents: [
        ComparelistComponent, GrouppopupComponent, GroupmembersAlert, ProposalmessageComponent, ChangepasswordComponent, DownloadMessage, DownloadMessageReligare, PosstatusAlert, ViewdetailsComponent, TestimonialComponent, ResultpageComponent, ConfrimAlert, DocumentViewComponent, TrainingcompletedAlert,DmTrainingcompletedAlert, DmConfrimAlert, DmChangepasswordComponent, HealthInsurer
    ]
})
export class AppModule { }