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
import { HealthService} from './shared/services/health.service';
import { LearningcenterService} from './shared/services/learningcenter.service';
import { DeactivateGuard} from './shared/deactivate-guard';
import { DeactivatetimeGuard} from './shared/deactivatetime-guard';
import { ExamactivateGuard} from './shared/activate-guard';
import { ExamdeactivatetimeGuard} from './shared/examdeactivatetime-guard';
import { DmexamactivateGuard} from './shared/dmactivate-guard';
import { DmdeactivatetimeGuard} from './shared/dmdeactivatetime-guard';
import { DmexamdeactivatetimeGuard} from './shared/dmexamdeactivatetime-guard';
import {DmresultdeactivatetimeGuard} from './shared/dmresultdeactivatetime-guard';
import {ResultDeactivateGuard} from './shared/resultdeactivate-guard';
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

import { HomeComponent } from './pages/home/home.component';
import { DisclaimerDialog} from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

import { FixappointmentComponent } from './pages/fixappointment/fixappointment.component';
import { NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PosComponent } from './pages/pos/pos.component';
import { PosInsurer} from './pages/pos/pos.component';

import { StarHealthProposalComponent } from './pages/star-health-proposal/star-health-proposal.component';
import { ProposalmessageComponent } from './pages/star-health-proposal/proposalmessage/proposalmessage.component';
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
import {DownloadMessageRelianceTravel} from './pages/travel-reliance-payment-success/travel-reliance-payment-success.component';
import { PosstatusAlert} from './pages/health-insurance/health-insurance.component';
import { TruncatePipe} from '../limit.pipe';
import { ReligareHealthProposalComponent } from './pages/religare-health-proposal/religare-health-proposal.component';
import { ViewdetailsComponent } from './pages/health-insurance/viewdetails/viewdetails.component';
import { SplitLastPipe} from '../splitpipe';
import { TestimonialComponent } from './pages/home/testimonial/testimonial.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ResultpageComponent } from './pages/exam/resultpage/resultpage.component';
import { ConfrimAlert} from './pages/exam/exam.component';
import { ViewresultComponent } from './pages/viewresult/viewresult.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { PersonalaccidentComponent } from './pages/personal-accident-home/personal-accident-home.component';
import { PersonalInsurer} from './pages/personal-accident-home/personal-accident-home.component';
import { TravelHomeComponent } from './pages/travel-home/travel-home.component';
import { TravelInsurer} from './pages/travel-home/travel-home.component';
import { EntranceexamComponent } from './pages/entranceexam/entranceexam.component';
import { ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import { RegisterComponent} from './pages/register/register.component';
import { FireInsurer} from './pages/fire/fire.component';
import {RenewalReminderComponent} from './pages/renewal-reminder/renewal-reminder.component';
//import { PersonalAccidentProposalComponent } from './pages/personal-accident-star-health-proposal/personal-accident-star-health-proposal.component';
import { PosCertificateComponent } from './pages/pos-certificate/pos-certificate.component';
import { TrainingComponent } from './pages/training/training.component';
// import { RelianceComponent } from './pages/reliance/reliance.component';
import { RelainceAgeMin} from './pages/health-insurance/health-insurance.component';
import {RelainceAgeMax} from './pages/health-insurance/health-insurance.component';
import {AgeValidate} from './pages/health-insurance/health-insurance.component';
import { RelianceHeathProposalComponent } from './pages/reliance-heath-proposal/reliance-heath-proposal.component';
import { DocumentViewComponent } from './pages/posprofile/document-view/document-view.component';
import { TrainingcompletedAlert} from './pages/training/training.component';
import { DmTrainingcompletedAlert} from './pages/dm-training/dm-training.component';
import {ShopkeeperpolicyComponent} from './pages/shopkeeperpolicy/shopkeeperpolicy.component';
import {ShopkepperInsurer} from './pages/shopkeeperpolicy/shopkeeperpolicy.component';
import {MarinecargoComponent} from './pages/marinecargo/marinecargo.component';
import {MarineCargoInsurer} from './pages/marinecargo/marinecargo.component';
import {MarinehullComponent} from './pages/marinehull/marinehull.component';
import {AviationComponent} from './pages/aviation/aviation.component';
import {MoneyComponent} from './pages/money/money.component';
import {MoneyInsurer} from './pages/money/money.component';
import {FireComponent} from './pages/fire/fire.component';
import {BurglaryComponent} from './pages/burglary/burglary.component';
import {MachineryComponent} from './pages/machinery/machinery.component';
import {MachineryInsurer} from './pages/machinery/machinery.component';
import {ElectronicsComponent} from './pages/electronics/electronics.component';
import {ElectronicInsurer} from './pages/electronics/electronics.component';
import {ContractorsComponent} from './pages/contractors/contractors.component';
import {ContractorsInsurer} from './pages/contractors/contractors.component';
import {HouseholdComponent} from './pages/household/household.component';
import {HouseholdInsurer} from './pages/household/household.component';
import {PublicComponent} from './pages/public/public.component';
import {PublicInsurer} from './pages/public/public.component';
import {ProfessionalComponent} from './pages/professional/professional.component';
import {ProfessionalInsurer} from './pages/professional/professional.component';
import {WorkmenComponent} from './pages/workmen/workmen.component';
import {WorkmenInsurer} from './pages/workmen/workmen.component';
import {GroupmedicalComponent} from './pages/groupmedical/groupmedical.component';
import {GroupHealthInsurer} from './pages/groupmedical/groupmedical.component';
import {GrouppersonalComponent} from './pages/grouppersonal/grouppersonal.component';
import {GroupPersonalAccidentInsurer} from './pages/grouppersonal/grouppersonal.component';
import {GrouptermComponent} from './pages/groupterm/groupterm.component';
import {GroupTermLifeInsurer} from './pages/groupterm/groupterm.component';
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
import { PersonalAccidentReligareProposalComponent } from './pages/personal-accident-religare-proposal/personal-accident-religare-proposal.component';
import { TravelPremiumListComponent } from './pages/travel-premium-list/travel-premium-list.component';
import { PosstatusAlertTravel } from './pages/travel-premium-list/travel-premium-list.component';
import { TravelProposalComponent } from './pages/travel-starthealth-proposal/travel-starthealth-proposal.component';
import { CompareDetailsComponent } from './pages/personal-accident-home/compare-details/compare-details.component';
import { PaymentSuccessTravelComponent } from './pages/payment-success-travel/payment-success-travel.component';
import { DownloadtravelMessage} from './pages/payment-success-travel/payment-success-travel.component';
import {AppolloMunichComponent} from './pages/appollo-munich-health/appollo-munich-health.component';
import{AppollomunichpaComponent} from './pages/appollo-munich-pa/appollo-munich-pa.component';
import { IffcoTokioComponent } from './pages/iffco-tokio/iffco-tokio.component';
import { ReligarePaymentSuccessPaComponent } from './pages/religare-payment-success-pa/religare-payment-success-pa.component';
import {DownloadMessageReligarePersonal} from './pages/religare-payment-success-pa/religare-payment-success-pa.component';
import {PersonalAccidentService} from './shared/services/personal-accident.service';
import { ApollomunichPaymentSuccessComponent } from './pages/apollomunich-payment-success/apollomunich-payment-success.component';
import { ViewProductDetailsComponent} from './pages/personal-accident-home/view-product-details/view-product-details.component';
import { TravelCompareComponent } from './pages/travel-premium-list/travel-compare/travel-compare.component';
import { TravelViewKeyFeaturesComponent } from './pages/travel-premium-list/travel-view-key-features/travel-view-key-features.component';
import { BajajAlianzComponent } from './pages/bajaj-alianz/bajaj-alianz.component';
import { previousDisease} from './pages/bajaj-alianz/bajaj-alianz.component';
import { ApollomunichPaPaymentSuccessComponent } from './pages/apollomunich-pa-payment-success/apollomunich-pa-payment-success.component';
import { DownloadAppolloPersonalAccident } from './pages/apollomunich-pa-payment-success/apollomunich-pa-payment-success.component';
import { BurglaryInsurer} from './pages/burglary/burglary.component';
import { CarInsuranceComponent } from './pages/car-insurance/car-insurance.component';
import {CarInsurer} from './pages/car-insurance/car-insurance.component';
import { BikeInsuranceComponent } from './pages/bike-insurance/bike-insurance.component';
import { BikeInsurer} from './pages/bike-insurance/bike-insurance.component';
import { ReliagretravelproposalComponent } from './pages/travel-religare-proposal/travel-religare-proposal.component';
import { TermLifeInsurer} from './pages/term-life/term-life.component';
// import { LifeInsurer} from './pages/life-insurance/life-insurance.component';
import { HdfcHealthInsuranceComponent } from './pages/hdfc-health-insurance/hdfc-health-insurance.component';
import { BajajalianzPaymentSuccessComponent } from './pages/bajajalianz-payment-success/bajajalianz-payment-success.component';
import {DownloadMessageBajaj} from './pages/bajajalianz-payment-success/bajajalianz-payment-success.component';
import { HdfcPersonalaccidentComponent } from './pages/hdfc-personalaccident/hdfc-personalaccident.component';
import { TravelShriramProposalComponent } from './pages/travel-shriram-proposal/travel-shriram-proposal.component';
import { TravelHdfcProposalComponent } from './pages/travel-hdfc-proposal/travel-hdfc-proposal.component';
import { HdfcHealthPaymentSuccessComponent } from './pages/hdfc-health-payment-success/hdfc-health-payment-success.component';
import {DownloadMessageHdfcHealth} from './pages/hdfc-health-payment-success/hdfc-health-payment-success.component';
import { ClaimAssistanceComponent } from './pages/claim-assistance/claim-assistance.component';
import { ClaimAssistanceDialog} from './pages/claim-assistance/claim-assistance.component';
import { HdfcPaPaymentSuccessComponent} from './pages/hdfc-pa-payment-success/hdfc-pa-payment-success.component';
import { DownloadMessageHdfcPa} from './pages/hdfc-pa-payment-success/hdfc-pa-payment-success.component';
import { RenewExistingPolicyComponent } from './pages/renew-existing-policy/renew-existing-policy.component';
import { TravelShriramPaymentSuccessComponent} from './pages/travel-shriram-payment-success/travel-shriram-payment-success.component';
import { DownloadMessageShriram} from './pages/travel-shriram-payment-success/travel-shriram-payment-success.component';
import { HdfcTravelPaymentSuccessComponent } from './pages/hdfc-travel-payment-success/hdfc-travel-payment-success.component';
import { DownloadMessageHdfcTravel} from './pages/hdfc-travel-payment-success/hdfc-travel-payment-success.component';
import { TravelReligarePaymentSuccessComponent } from './pages/travel-religare-payment-success/travel-religare-payment-success.component';
import { DownloadMessageReligareTravel } from './pages/travel-religare-payment-success/travel-religare-payment-success.component';
// import {OrderBy} from '../oderByPipe';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {KeysPipe} from '../iterateObjectPipe';
import { ValidationService} from './shared/services/validation.service';
import {HdfcproposaldeactivateGuardService} from './shared/hdfcproposaldeactivate-guard.service';
import {AppollohealthproposaldeactivateGuardService} from './shared/appollohealthproposaldeactivate-guard.service';
import {TravelhdfcdeactivateGuardService} from './shared/travelhdfcdeactivate-guard.service';
import {AppolloPaproposaldeactivateGuardService} from './shared/appollo-paproposaldeactivate-guard.service';
import {ReligarePaproposaldeactivateGuardService} from './shared/religare-paproposaldeactivate-guard.service';
import {HdfcPaproposaldeactivateGuardService} from './shared/hdfc-paproposaldeactivate-guard.service';
import {ReligareHealthDeactivateGuardService} from './shared/religare-health-deactivate-guard.service';
import { ClearSessionService} from './shared/services/clear-session.service';
import {BajajHealthDeactivateGuardService} from './shared/bajaj-health-deactivate-guard.service';
import {RelianceHealthDeactivateGuardService} from './shared/reliance-health-deactivate-guard.service';
import { TravelRelianceProposalComponent } from './pages/travel-reliance-proposal/travel-reliance-proposal.component';
import {IffcoProposalGuardService} from './shared/iffco-proposal-guard.service';
import { TravelReliancePaymentSuccessComponent } from './pages/travel-reliance-payment-success/travel-reliance-payment-success.component';
import {HealthInsuranceResolver} from './pages/health-insurance/health-insurance.resolver';
import { BajajDownloadPolicyComponent } from './pages/bajaj-download-policy/bajaj-download-policy.component';
import {LifeService} from './shared/services/life.service';
import {EndowmentLifeInsuranceComponent} from './pages/endowment-life-insurance/endowment-life-insurance.component';
import {LifeCompareNowComponent} from './pages/endowment-life-insurance/life-compare-now/life-compare-now.component';
import {LifeCallBackComponent} from './pages/endowment-life-insurance/life-call-back/life-call-back.component';
import {LifeViewDetailsComponent} from './pages/endowment-life-insurance/life-view-details/life-view-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClearSessionPaService} from './shared/services/clear-session-pa.service';
import { TermLifeComponent } from './pages/term-life/term-life.component';
import { IffcoTokioHealthPayamentSuccessComponent } from './pages/iffco-tokio-health-payament-success/iffco-tokio-health-payament-success.component';
import { ReligareDownloadPaPolicyComponent } from './pages/religare-download-pa-policy/religare-download-pa-policy.component';
import {ReliancePaComponent} from './pages/reliance-pa/reliance-pa.component';
import { TermLifeCommonService } from './shared/services/term-life-common.service';
import { BikePremiumListComponent } from './pages/bike-premium-list/bike-premium-list.component';
import {BikeInsuranceService} from './shared/services/bike-insurance.service';
import { TermLifePremiumListComponent } from './pages/term-life-premium-list/term-life-premium-list.component';
import { LifeBajajProposalComponent} from './pages/life-bajaj-proposal/life-bajaj-proposal.component';
import { BikeShriramProposalComponent} from './pages/bike-shriram-proposal/bike-shriram-proposal.component';
import{ ClearSessionTravelService} from './shared/services/clear-session-travel.service';
import { ShriramMotorPaymentSuccessComponent } from './pages/shriram-motor-payment-success/shriram-motor-payment-success.component';
import { BikeRoyalProposalComponent } from './pages/bike-royal-proposal/bike-royal-proposal.component';
import { DownloadPolicyTravelComponent } from './pages/download-policy-travel/download-policy-travel.component';
import {TravelBajajalianzProposalComponent} from './pages/travel-bajajalianz-proposal/travel-bajajalianz-proposal.component';
import {LifeDocuments} from './pages/life-bajaj-proposal/life-bajaj-proposal.component';
import { DownloadPolicyTravelReligareComponent } from './pages/download-policy-travel-religare/download-policy-travel-religare.component';
import { CholaHealthProposalComponent } from './pages/chola-health-proposal/chola-health-proposal.component';
import { RelianceMotorProposalComponent } from './pages/reliance-motor-proposal/reliance-motor-proposal.component';
import {TravelBajajalianzDownloadPolicyComponent} from './pages/travel-bajajalianz-download-policy/travel-bajajalianz-download-policy.component';
import { TravelBajajPaymentSuccessComponent } from './pages/travel-bajaj-payment-success/travel-bajaj-payment-success.component';
import {DownloadMessageTravelBajaj} from './pages/travel-bajaj-payment-success/travel-bajaj-payment-success.component';
import {BajajLifeOpt} from './pages/life-bajaj-proposal/life-bajaj-proposal.component';
import { ReliancePaPaymentSuccessComponent } from './pages/reliance-pa-payment-success/reliance-pa-payment-success.component';
import { ReliancePaDownloadPolicyComponent } from './pages/reliance-pa-download-policy/reliance-pa-download-policy.component';
import { DownloadReliancePersonalAccident} from './pages/reliance-pa-payment-success/reliance-pa-payment-success.component';
import { BikeTataaigProposalComponent } from './pages/bike-tataaig-proposal/bike-tataaig-proposal.component';
import {CholaHealthPaymentSuccessComponent, DownloadMessageCholaHealth} from './pages/chola-health-payment-success/chola-health-payment-success.component';
import { EnquiryPopupComponent } from './pages/bike-insurance/enquiry-popup/enquiry-popup.component';
import { BikeTataaigPaymentSuccesssComponent } from './pages/bike-tataaig-payment-successs/bike-tataaig-payment-successs.component';
import { RoyalsundaramMotorPaymentSuccessComponent } from './pages/royalsundaram-motor-payment-success/royalsundaram-motor-payment-success.component';

@NgModule({
    imports: [
        BrowserModule,
        Ng2OrderModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        FormsModule,
        NgbModule.forRoot(),
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
        // AmazingTimePickerModule,
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
        ComparelistComponent,
        HomeComponent,
        ContactComponent,
        HomeComponent,
        GrouppopupComponent,
        ForgotPasswordComponent,
        RegisterComponent,
        FixappointmentComponent,
        PosComponent,
        StarHealthProposalComponent,
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
        DownloadtravelMessage,
        DownloadMessageReligare,
        DownloadMessageRelianceTravel,
        PosstatusAlert,
        TruncatePipe,
        ReligareHealthProposalComponent,
        ViewdetailsComponent,
        SplitLastPipe,
        KeysPipe,
        TestimonialComponent,
        ExamComponent,
        ResultpageComponent,
        ConfrimAlert,
        ViewresultComponent,
        EntranceexamComponent,
        PersonalaccidentComponent,
        TravelHomeComponent,
        TravelInsurer,
        PosstatusAlertTravel,
        // PersonalAccidentProposalComponent,
        PosCertificateComponent,
        TrainingComponent,
        // RelianceComponent,
        RelainceAgeMin,
        RelainceAgeMax,
        AgeValidate,
        RelianceHeathProposalComponent,
        DocumentViewComponent,
        TrainingcompletedAlert,
        DmTrainingcompletedAlert,
        ShopkeeperpolicyComponent,
        ShopkepperInsurer,
        MarinecargoComponent,
        MarineCargoInsurer,
        MarinehullComponent,
        AviationComponent,
        MoneyComponent,
        MoneyInsurer,
        FireComponent,
        BurglaryComponent,
        MachineryComponent,
        MachineryInsurer,
        ElectronicsComponent,
        ElectronicInsurer,
        ContractorsComponent,
        ContractorsInsurer,
        HouseholdComponent,
        HouseholdInsurer,
        PublicComponent,
        PublicInsurer,
        ProfessionalComponent,
        RenewalReminderComponent,
        ProfessionalInsurer,
        WorkmenComponent,
        WorkmenInsurer,
        GroupmedicalComponent,
        GroupHealthInsurer,
        GrouppersonalComponent,
        GroupPersonalAccidentInsurer,
        GrouptermComponent,
        GroupTermLifeInsurer,
        JewelersblockComponent,
        DirectorsComponent,
        BankersComponent,
        ErectionComponent,
        HealthComponent,
        ReligarePaymentSuccessComponent,
        HealthInsurer,
        PersonalInsurer,
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
        PosInsurer,
        DmForgotpasswordComponent,
        DmConfirmpasswordComponent,
        AboutVizzaComponent,
        DmChangepasswordComponent,
        MediaCenterComponent,
        ViewmediaComponent,
        SafePipe,
        ReliancePaymentSuccessComponent,
        PersonalAccidentReligareProposalComponent,
        TravelPremiumListComponent,
        TravelProposalComponent,
        CompareDetailsComponent,
        PaymentSuccessTravelComponent,
        AppolloMunichComponent,
        IffcoTokioComponent,
        ReligarePaymentSuccessPaComponent,
        DownloadMessageReligarePersonal,

        ApollomunichPaymentSuccessComponent,
        ViewProductDetailsComponent,
        TravelCompareComponent,
        TravelViewKeyFeaturesComponent,
        AppollomunichpaComponent,
        BajajAlianzComponent,
        ApollomunichPaPaymentSuccessComponent,
        DownloadAppolloPersonalAccident,
        FireInsurer,
        BurglaryInsurer,
        CarInsuranceComponent,
        CarInsurer,
        BikeInsuranceComponent,
        BikeInsurer,
        TermLifeInsurer,
        ReliagretravelproposalComponent,
        // LifeInsuranceComponent,
        // LifeInsurer,
        HdfcHealthInsuranceComponent,
        BajajalianzPaymentSuccessComponent,
        DownloadMessageBajaj,
        HdfcPersonalaccidentComponent,
        TravelShriramProposalComponent,
        TravelHdfcProposalComponent,
        previousDisease,
        HdfcHealthPaymentSuccessComponent,
        DownloadMessageHdfcHealth,
        ClaimAssistanceComponent,
        ClaimAssistanceDialog,
        HdfcPaPaymentSuccessComponent,
        DownloadMessageHdfcPa,
        RenewExistingPolicyComponent,
        TravelShriramPaymentSuccessComponent,
        DownloadMessageShriram,
        HdfcTravelPaymentSuccessComponent,
        DownloadMessageHdfcTravel,
        TravelReligarePaymentSuccessComponent,
        DownloadMessageReligareTravel,
        DisclaimerDialog,
        TravelRelianceProposalComponent,
        TravelReliancePaymentSuccessComponent,
        BajajDownloadPolicyComponent,
        TravelReliancePaymentSuccessComponent,
        EndowmentLifeInsuranceComponent,
        LifeCompareNowComponent,
        LifeCallBackComponent,
        LifeViewDetailsComponent,
        TermLifeComponent,
        IffcoTokioHealthPayamentSuccessComponent,
        ReligareDownloadPaPolicyComponent,
        ReliancePaComponent,
        BikePremiumListComponent,
        TermLifePremiumListComponent,
        LifeBajajProposalComponent,
        BikeShriramProposalComponent,
        ShriramMotorPaymentSuccessComponent,
        BikeRoyalProposalComponent,
        DownloadPolicyTravelComponent,
        TravelBajajalianzProposalComponent,
        LifeDocuments,
        DownloadPolicyTravelReligareComponent,
        CholaHealthProposalComponent,
        RelianceMotorProposalComponent,
        TravelBajajalianzDownloadPolicyComponent,
        TravelBajajPaymentSuccessComponent,
        DownloadMessageTravelBajaj,
        BajajLifeOpt,
        ReliancePaPaymentSuccessComponent,
        ReliancePaDownloadPolicyComponent,
        DownloadReliancePersonalAccident,
        BikeTataaigProposalComponent,
        CholaHealthPaymentSuccessComponent,
        DownloadMessageCholaHealth,
        EnquiryPopupComponent,
        RoyalsundaramMotorPaymentSuccessComponent,
        BikeTataaigPaymentSuccesssComponent
    ],
    providers: [
        AppSettings,
        LoginService,
        ConfigurationService,
        AuthService,
        CommonService,
        TravelService,
        LearningcenterService,
        HealthService,
        PersonalAccidentService,
        DeactivateGuard,
        DeactivatetimeGuard,
        ExamactivateGuard,
        ExamdeactivatetimeGuard,
        DmexamactivateGuard,
        DmdeactivatetimeGuard,
        DmexamdeactivatetimeGuard,
        DmresultdeactivatetimeGuard,
        ResultDeactivateGuard,
        DatePipe,
        ValidationService,
        HdfcproposaldeactivateGuardService,
        AppollohealthproposaldeactivateGuardService,
        TravelhdfcdeactivateGuardService,
        AppolloPaproposaldeactivateGuardService,
        ReligarePaproposaldeactivateGuardService,
        HdfcPaproposaldeactivateGuardService,
        ReligareHealthDeactivateGuardService,
        BajajHealthDeactivateGuardService,
        RelianceHealthDeactivateGuardService,
        ClearSessionService,
        IffcoProposalGuardService,
        HealthInsuranceResolver,
        LifeService,
        ClearSessionPaService,
        TermLifeCommonService,
        BikeInsuranceService,
        ClearSessionTravelService,

        { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
        { provide: OverlayContainer, useClass: CustomOverlayContainer }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ComparelistComponent,CompareDetailsComponent, GrouppopupComponent, EnquiryPopupComponent,GroupmembersAlert, ProposalmessageComponent, ChangepasswordComponent, DownloadMessage, DownloadMessageReligare, DownloadtravelMessage, DownloadMessageRelianceTravel, PosstatusAlert, ViewdetailsComponent, TestimonialComponent, ResultpageComponent, ConfrimAlert, DocumentViewComponent, TrainingcompletedAlert,DmTrainingcompletedAlert, DmConfrimAlert, DmChangepasswordComponent, HealthInsurer, TravelCompareComponent, TravelViewKeyFeaturesComponent, DownloadMessageReligarePersonal,ViewProductDetailsComponent,
        DownloadAppolloPersonalAccident,PosstatusAlertTravel,PersonalInsurer,TravelInsurer,BurglaryInsurer,CarInsurer,BikeInsurer,TermLifeInsurer,HouseholdInsurer,ShopkepperInsurer,WorkmenInsurer, GroupHealthInsurer, GroupTermLifeInsurer, GroupPersonalAccidentInsurer, MarineCargoInsurer,ProfessionalInsurer,ContractorsInsurer,MoneyInsurer,PublicInsurer,ElectronicInsurer,MachineryInsurer,previousDisease,DownloadMessageHdfcHealth,DisclaimerDialog
        ,FireInsurer,RelainceAgeMin,RelainceAgeMax,AgeValidate,DownloadMessageBajaj,DownloadMessageHdfcPa,ClaimAssistanceDialog,DownloadMessageShriram,DownloadMessageHdfcTravel,DownloadMessageReligareTravel, PosInsurer,
        DownloadMessageRelianceTravel,LifeCompareNowComponent,LifeCallBackComponent,LifeViewDetailsComponent,LifeDocuments,DownloadMessageTravelBajaj,BajajLifeOpt,DownloadReliancePersonalAccident, DownloadMessageCholaHealth
    ]
})
export class AppModule { }

