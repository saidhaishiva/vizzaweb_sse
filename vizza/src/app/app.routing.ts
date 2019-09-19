import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';
import {FixappointmentComponent} from './pages/fixappointment/fixappointment.component';
import {ShopkeeperpolicyComponent} from './pages/shopkeeperpolicy/shopkeeperpolicy.component';
import {MarinecargoComponent} from './pages/marinecargo/marinecargo.component';
import {MoneyComponent} from './pages/money/money.component';
import {FireComponent} from './pages/fire/fire.component';
import { BurglaryComponent} from './pages/burglary/burglary.component';
import { MachineryComponent} from './pages/machinery/machinery.component';
import { ElectronicsComponent} from './pages/electronics/electronics.component';
import { ContractorsComponent} from './pages/contractors/contractors.component';
import { ProfessionalComponent} from './pages/professional/professional.component';
import {PosComponent} from './pages/pos/pos.component';
import {RegisterComponent} from './pages/register/register.component';
import {StarHealthProposalComponent} from './pages/star-health-proposal/star-health-proposal.component';
import {HealthInsuranceComponent} from './pages/health-insurance/health-insurance.component';
import { ConfirmpasswordComponent } from './pages/confirmpassword/confirmpassword.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import { EditposComponent } from './pages/editpos/editpos.component';
import {PaymentSuccessComponent} from './pages/payment-success/payment-success.component';
import {DownloadPolicyComponent} from './pages/download-policy/download-policy.component';
import {DeactivateGuard} from './shared/deactivate-guard';
import {ReligareHealthProposalComponent} from './pages/religare-health-proposal/religare-health-proposal.component';
import {RelianceHeathProposalComponent} from './pages/reliance-heath-proposal/reliance-heath-proposal.component';
import {DeactivatetimeGuard} from './shared/deactivatetime-guard';
import {ExamComponent} from './pages/exam/exam.component';
import {ExamactivateGuard} from './shared/activate-guard';
import {ExamdeactivatetimeGuard} from './shared/examdeactivatetime-guard';
import { ViewresultComponent} from './pages/viewresult/viewresult.component';
import { EntranceexamComponent} from './pages/entranceexam/entranceexam.component';
import {PersonalaccidentComponent} from './pages/personal-accident-home/personal-accident-home.component';
import {TravelHomeComponent} from './pages/travel-home/travel-home.component';
import {DmViewresultComponent} from './pages/dm-exam/dm-viewresult/dm-viewresult.component';
import {PaymentSuccessTravelComponent} from './pages/payment-success-travel/payment-success-travel.component';
import {AppolloMunichComponent} from './pages/appollo-munich-health/appollo-munich-health.component';
import {IffcoTokioComponent} from './pages/iffco-tokio/iffco-tokio.component';
import {ApollomunichPaymentSuccessComponent} from './pages/apollomunich-payment-success/apollomunich-payment-success.component';
import {BikeInsuranceComponent } from './pages/bike-insurance/bike-insurance.component';
import {TermLifeComponent} from './pages/term-life/term-life.component';
import {HdfcHealthInsuranceComponent} from './pages/hdfc-health-insurance/hdfc-health-insurance.component';
import {RenewalReminderComponent} from './pages/renewal-reminder/renewal-reminder.component';
import {RenewExistingPolicyComponent} from './pages/renew-existing-policy/renew-existing-policy.component';
import {HdfcPaPaymentSuccessComponent} from './pages/hdfc-pa-payment-success/hdfc-pa-payment-success.component';
import {TravelReliancePaymentSuccessComponent} from './pages/travel-reliance-payment-success/travel-reliance-payment-success.component';
//import {PersonalAccidentProposalComponent} from './pages/personal-accident-star-health-proposal/personal-accident-star-health-proposal.component';
import {PosCertificateComponent} from './pages/pos-certificate/pos-certificate.component';
import {TrainingComponent} from './pages/training/training.component';
import {HouseholdComponent} from './pages/household/household.component';
import {PublicComponent} from './pages/public/public.component';
import {WorkmenComponent} from './pages/workmen/workmen.component';
import {GroupmedicalComponent} from './pages/groupmedical/groupmedical.component';
import {GrouppersonalComponent} from './pages/grouppersonal/grouppersonal.component';
import {GrouptermComponent} from './pages/groupterm/groupterm.component';
import {JewelersblockComponent} from './pages/jewelersblock/jewelersblock.component';
import {BankersComponent} from './pages/bankers/bankers.component';
import {MarinehullComponent} from './pages/marinehull/marinehull.component';
import {AviationComponent} from './pages/aviation/aviation.component';
import {ErectionComponent} from './pages/erection/erection.component';
import {DirectorsComponent} from './pages/directors/directors.component';
import {HealthComponent} from './health/health.component';
import {ReligarePaymentSuccessComponent} from './pages/religare-payment-success/religare-payment-success.component';
import {DmRegisterComponent} from './pages/dm-register/dm-register.component';
import {DmLoginComponent} from './pages/dm-login/dm-login.component';
import {DmProfileComponent} from './pages/dm-profile/dm-profile.component';
import {DmTrainingComponent} from './pages/dm-training/dm-training.component';
import {DmExamComponent} from './pages/dm-exam/dm-exam.component';
import {DmexamactivateGuard} from './shared/dmactivate-guard';
import {ReligareDownloadPolicyComponent} from './pages/religare-download-policy/religare-download-policy.component';
import {DmdeactivatetimeGuard} from './shared/dmdeactivatetime-guard';
import {DmexamdeactivatetimeGuard} from './shared/dmexamdeactivatetime-guard';
import {CareerComponent} from './pages/career/career.component';
import {AboutPosComponent} from './pages/about-pos/about-pos.component';
import {DmForgotpasswordComponent} from './pages/dm-forgotpassword/dm-forgotpassword.component';
import {DmConfirmpasswordComponent} from './pages/dm-confirmpassword/dm-confirmpassword.component';
import {AboutVizzaComponent} from './pages/about-vizza/about-vizza.component';
import {MediaCenterComponent} from './pages/media-center/media-center.component';
// import {ViewmediaComponent} from './pages/media-center/viewmedia/viewmedia.component';

import {ReliancePaymentSuccessComponent} from './pages/reliance-payment-success/reliance-payment-success.component';
import {PersonalAccidentReligareProposalComponent} from './pages/personal-accident-religare-proposal/personal-accident-religare-proposal.component';
import {TravelPremiumListComponent} from './pages/travel-premium-list/travel-premium-list.component';
import {TravelProposalComponent} from './pages/travel-starthealth-proposal/travel-starthealth-proposal.component';
import {ReligarePaymentSuccessPaComponent} from './pages/religare-payment-success-pa/religare-payment-success-pa.component';
import {BajajAlianzComponent} from './pages/bajaj-alianz/bajaj-alianz.component';
import {BajajalianzPaymentSuccessComponent} from './pages/bajajalianz-payment-success/bajajalianz-payment-success.component';
import {AppollomunichpaComponent} from './pages/appollo-munich-pa/appollo-munich-pa.component';
import { ApollomunichPaPaymentSuccessComponent } from './pages/apollomunich-pa-payment-success/apollomunich-pa-payment-success.component';
import {ReliagretravelproposalComponent} from './pages/travel-religare-proposal/travel-religare-proposal.component';
import {HdfcPersonalaccidentComponent} from './pages/hdfc-personalaccident/hdfc-personalaccident.component';
import {TravelShriramProposalComponent} from './pages/travel-shriram-proposal/travel-shriram-proposal.component';
import {HdfcHealthPaymentSuccessComponent} from './pages/hdfc-health-payment-success/hdfc-health-payment-success.component';
import {ClaimAssistanceComponent} from './pages/claim-assistance/claim-assistance.component';
import {TravelHdfcProposalComponent} from './pages/travel-hdfc-proposal/travel-hdfc-proposal.component';
import {TravelShriramPaymentSuccessComponent} from './pages/travel-shriram-payment-success/travel-shriram-payment-success.component';
import {HdfcTravelPaymentSuccessComponent} from './pages/hdfc-travel-payment-success/hdfc-travel-payment-success.component';
import {TravelReligarePaymentSuccessComponent} from './pages/travel-religare-payment-success/travel-religare-payment-success.component';
import {DmresultdeactivatetimeGuard} from './shared/dmresultdeactivatetime-guard';
import {ResultDeactivateGuard} from './shared/resultdeactivate-guard';
import {HdfcproposaldeactivateGuardService} from './shared/hdfcproposaldeactivate-guard.service';
import {AppollohealthproposaldeactivateGuardService} from './shared/appollohealthproposaldeactivate-guard.service';
import {TravelhdfcdeactivateGuardService} from './shared/travelhdfcdeactivate-guard.service';
import {AppolloPaproposaldeactivateGuardService} from './shared/appollo-paproposaldeactivate-guard.service';
import {ReligarePaproposaldeactivateGuardService} from './shared/religare-paproposaldeactivate-guard.service';
import {HdfcPaproposaldeactivateGuardService} from './shared/hdfc-paproposaldeactivate-guard.service';
import {ReligareHealthDeactivateGuardService} from './shared/religare-health-deactivate-guard.service';
import {BajajHealthDeactivateGuardService} from './shared/bajaj-health-deactivate-guard.service';
import {RelianceHealthDeactivateGuardService} from './shared/reliance-health-deactivate-guard.service';
import { TravelRelianceProposalComponent} from './pages/travel-reliance-proposal/travel-reliance-proposal.component';
import {HealthInsuranceResolver} from './pages/health-insurance/health-insurance.resolver';
import {BajajDownloadPolicyComponent} from './pages/bajaj-download-policy/bajaj-download-policy.component';
import {EndowmentLifeInsuranceComponent} from './pages/endowment-life-insurance/endowment-life-insurance.component';
// import {IffcoTokioHealthPayamentSuccessComponent} from './pages/iffco-tokio-health-payament-success/iffco-tokio-health-payament-success.component';
import {ReligareDownloadPaPolicyComponent} from './pages/religare-download-pa-policy/religare-download-pa-policy.component';
import {ReliancePaComponent} from './pages/reliance-pa/reliance-pa.component';
import {BikePremiumListComponent} from './pages/bike-premium-list/bike-premium-list.component';
import {TermLifePremiumListComponent} from './pages/term-life-premium-list/term-life-premium-list.component';
import {BikeShriramProposalComponent} from './pages/bike-shriram-proposal/bike-shriram-proposal.component';
import {LifeBajajProposalComponent} from './pages/life-bajaj-proposal/life-bajaj-proposal.component';
import {ShriramMotorPaymentSuccessComponent} from './pages/shriram-motor-payment-success/shriram-motor-payment-success.component';
import {IffcoTokioHealthPayamentSuccessComponent} from './pages/iffco-tokio-health-payament-success/iffco-tokio-health-payament-success.component';
import {BikeRoyalProposalComponent} from './pages/bike-royal-proposal/bike-royal-proposal.component';
import {DownloadPolicyTravelComponent} from './pages/download-policy-travel/download-policy-travel.component';
import {TravelBajajalianzProposalComponent} from './pages/travel-bajajalianz-proposal/travel-bajajalianz-proposal.component';
import {DownloadPolicyTravelReligareComponent} from './pages/download-policy-travel-religare/download-policy-travel-religare.component';
import {CholaHealthProposalComponent} from './pages/chola-health-proposal/chola-health-proposal.component';
import {RelianceMotorProposalComponent} from './pages/reliance-motor-proposal/reliance-motor-proposal.component';
import {TravelBajajalianzDownloadPolicyComponent} from './pages/travel-bajajalianz-download-policy/travel-bajajalianz-download-policy.component';
import {TravelBajajPaymentSuccessComponent} from './pages/travel-bajaj-payment-success/travel-bajaj-payment-success.component';
import {ReliancePaPaymentSuccessComponent} from './pages/reliance-pa-payment-success/reliance-pa-payment-success.component';
import {BikeTataaigProposalComponent} from './pages/bike-tataaig-proposal/bike-tataaig-proposal.component';
import {CholaHealthPaymentSuccessComponent} from './pages/chola-health-payment-success/chola-health-payment-success.component';
import {RoyalsundaramMotorPaymentSuccessComponent} from './pages/royalsundaram-motor-payment-success/royalsundaram-motor-payment-success.component';
import {BikeTataaigPaymentSuccesssComponent} from './pages/bike-tataaig-payment-successs/bike-tataaig-payment-successs.component';
import {CarTataaigProposalComponent} from './pages/car-tataaig-proposal/car-tataaig-proposal.component';
import {AegonTermLifeComponent} from './pages/aegon-term-life/aegon-term-life.component';
import {HdfcTermLifeComponent} from './pages/hdfc-term-life/hdfc-term-life.component';
import {RsFourwheelerProposalComponent} from './pages/rs-fourwheeler-proposal/rs-fourwheeler-proposal.component';
import { RelianceFourwheelerProposalComponent } from './pages/reliance-fourwheeler-proposal/reliance-fourwheeler-proposal.component';
import {FourWheelerHomeComponent} from './pages/four-wheeler-home/four-wheeler-home.component';
import {FourWheelerProductListComponent} from './pages/four-wheeler-product-list/four-wheeler-product-list.component';
import {ShriramFourwheelerProposalComponent} from './pages/shriram-fourwheeler-proposal/shriram-fourwheeler-proposal.component';
import {RelianceFourwheelerPaymentSuccessComponent} from './pages/reliance-fourwheeler-payment-success/reliance-fourwheeler-payment-success.component';
import {EnquiryPopupComponent} from './pages/bike-insurance/enquiry-popup/enquiry-popup.component';
import {ShriramMfwPaymentSuccessComponent} from './pages/shriram-mfw-payment-success/shriram-mfw-payment-success.component';
import {RoyalsundaramMfwPaymentSuccessComponent} from './pages/royalsundaram-mfw-payment-success/royalsundaram-mfw-payment-success.component';
import {LearningCenterComponent} from './pages/learning-center/learning-center.component';
import { CarTataaigPaymentSuccessComponent} from './pages/car-tataaig-payment-success/car-tataaig-payment-success.component';
import { RelianceTwowheelerPaymentSuccessComponent} from './pages/reliance-twowheeler-payment-success/reliance-twowheeler-payment-success.component';
import {NewContactComponent} from './pages/new-contact/new-contact.component';
import {EdelweissTermLifeComponent} from './pages/edelweiss-term-life/edelweiss-term-life.component';
import {BajajGoldSurakshaComponent} from './pages/bajaj-gold-suraksha/bajaj-gold-suraksha.component';
import {UlipComponent} from './pages/ulip/ulip.component';
import {SpecialContigencyPolicyComponent} from './pages/special-contigency-policy/special-contigency-policy.component';
import {GroupTravelComponent} from './pages/group-travel/group-travel.component';
import {HdfcTwoWheelerProposalComponent} from './pages/hdfc-two-wheeler-proposal/hdfc-two-wheeler-proposal.component';
import {EdelweissTermLifePaymentSuccessComponent} from './pages/edelweiss-term-life-payment-success/edelweiss-term-life-payment-success.component';
import {BajajTermPaymentSuccessComponent} from './pages/bajaj-term-payment-success/bajaj-term-payment-success.component';
import {HdfcCarProposalComponent} from './pages/hdfc-car-proposal/hdfc-car-proposal.component';
import {ConsequentialLossPolicyComponent} from './pages/consequential-loss-policy/consequential-loss-policy.component';
import {ContractorMachineryPolicyComponent} from './pages/contractor-machinery-policy/contractor-machinery-policy.component';
import {MarineErectionComponent} from './pages/marine-erection/marine-erection.component';
import {AdvanceLossProfitComponent} from './pages/advance-loss-profit/advance-loss-profit.component';
import {MegaPackagePolicyComponent} from './pages/mega-package-policy/mega-package-policy.component';
import {ContractorMachineryPlantComponent} from './pages/contractor-machinery-plant/contractor-machinery-plant.component';
import {ProfessionalIndemnityPolicyComponent} from './pages/professional-indemnity-policy/professional-indemnity-policy.component';
import {ProfessionalLiabiltyPolicyComponent} from './pages/professional-liabilty-policy/professional-liabilty-policy.component';
import {DirectorsLiabilityPolicyComponent} from './pages/directors-liability-policy/directors-liability-policy.component';
import {LiftPolicyComponent} from './pages/lift-policy/lift-policy.component';
import {EmployeeLiabilityComponent} from './pages/employee-liability/employee-liability.component';
import {CareerLiabilityPolicyComponent} from './pages/career-liability-policy/career-liability-policy.component';
import {LiabilityInsuranceActComponent} from './pages/liability-insurance-act/liability-insurance-act.component';
import {GolfersPolicyComponent} from './pages/golfers-policy/golfers-policy.component';
import {FiedlityPolicyComponent} from './pages/fiedlity-policy/fiedlity-policy.component';
import {ErectionRiskPolicyComponent} from './pages/erection-risk-policy/erection-risk-policy.component';
import {HdfcTwoWheelerPaymentComponent} from './pages/hdfc-two-wheeler-payment/hdfc-two-wheeler-payment.component';
import {HdfcCarPaymentSuccessComponent} from './pages/hdfc-car-payment-success/hdfc-car-payment-success.component';
import {EdelweissPosHomeComponent} from './pages/edelweiss-pos-home/edelweiss-pos-home.component';
import {EdelweissposPremiumListComponent} from './pages/edelweisspos-premium-list/edelweisspos-premium-list.component';
import {EdelweissPosComponent} from './pages/edelweiss-pos/edelweiss-pos.component';
import {EdelweissposPaymnetSuccessComponent} from './pages/edelweisspos-paymnet-success/edelweisspos-paymnet-success.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: PagesComponent, children: [
            { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
            { path: 'contact', component: ContactComponent, data: { breadcrumb: 'Contact us' } },
            { path: 'contacts', component: NewContactComponent, data: { breadcrumb: 'Contact us' } },
            { path: 'renewal-reminder', component: RenewalReminderComponent, data: { breadcrumb: 'Renewal Reminder' } },
            { path: 'renew-existing-policy', component: RenewExistingPolicyComponent, data: { breadcrumb: 'Renew Existing Policy' } },
            { path: 'users', loadChildren: 'app/pages/users/users.module#UsersModule', data: { breadcrumb: 'Users' } },
            { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            { path: 'form-controls', loadChildren: 'app/pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            { path: 'icons', loadChildren: 'app/pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            { path: 'drag-drop', loadChildren: 'app/pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            { path: 'mailbox', loadChildren: 'app/pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: 'app/pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            { path: 'dynamic-menu', loadChildren: 'app/pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'pos-profile', component: PosprofileComponent, data: { breadcrumb: 'Pos Profile' } },
            { path: 'pos-edit', component: EditposComponent, data: { breadcrumb: 'Pos Profile Edit' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'forgotpassword', component: ForgotPasswordComponent, data: { breadcrumb: 'Forgot password' } },
            { path: 'dm-forgotpassword', component: DmForgotpasswordComponent, data: { breadcrumb: 'Dm Forgot password' } },
            { path: 'confirmpassword', component: ConfirmpasswordComponent, data: { breadcrumb: 'Confirm Password' } },
            { path: 'dm-confirmpassword', component: DmConfirmpasswordComponent, data: { breadcrumb: 'Dm Confirm Password' } },
            { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS' } },
            { path: 'dm-login', component: DmLoginComponent, data: { breadcrumb: 'Dm Login' } },
            { path: 'dm-register', component: DmRegisterComponent, data: { breadcrumb: 'Dm Login' } },
            { path: 'dm-profile', component: DmProfileComponent, data: { breadcrumb: 'DM Profile' } },
            { path: 'dm-training', component: DmTrainingComponent, data: { breadcrumb: 'DM Training' }, canDeactivate: [DmdeactivatetimeGuard] },
            { path: 'dm-exam', component: DmExamComponent, data: { breadcrumb: 'DM Exam' }, canActivate: [DmexamactivateGuard], canDeactivate: [DmexamdeactivatetimeGuard]  },
            { path: 'fix-appointment/:id', component: FixappointmentComponent, data: { breadcrumb: 'Fix Appointment' } },
            { path: 'shopkeeperpolicy', component: ShopkeeperpolicyComponent, data: { breadcrumb: 'Shopkeeper Policy'} },
            { path: 'marinecargo', component: MarinecargoComponent, data: {breadcrumb: 'Marine Cargo Policy'}},
            { path: 'marinehull', component: MarinehullComponent, data: {breadcrumb: 'Marine Hull policy'}},
            { path: 'aviation', component: AviationComponent, data: {breadcrumb: 'Aviation Insurance'}},
            { path: 'money', component: MoneyComponent, data: {breadcrumb: ' Money Insurance'}},
            { path: 'consequentialLossPolicy', component: ConsequentialLossPolicyComponent, data: {breadcrumb: ' Consequential Loss Policy Insurance'}},
            { path: 'contractorMachineryPolicy', component: ContractorMachineryPolicyComponent, data: {breadcrumb: ' Contractor Machinery Policy'}},
            { path: 'marineErectionComponent', component: MarineErectionComponent, data: {breadcrumb: 'Marine Erection Component'}},
            { path: 'advanceLossProfit', component: AdvanceLossProfitComponent, data: {breadcrumb: 'Advance LossProfit Component'}},
            { path: 'fire', component: FireComponent, data: {breadcrumb: 'Fire Policy'}},
            { path: 'mega', component: MegaPackagePolicyComponent, data: {breadcrumb: 'Mega Package Policy'}},
            { path: 'contractorMachineryPlant', component: ContractorMachineryPlantComponent, data: {breadcrumb: 'Contractor Machinery Plant'}},
            { path: 'burglary', component: BurglaryComponent, data: {breadcrumb: 'Burglary Policy'}},
            { path: 'machinery', component: MachineryComponent, data: {breadcrumb: 'Machinery Breakdown Policy'}},
            { path: 'professionalIndemnity', component: ProfessionalIndemnityPolicyComponent, data: {breadcrumb: 'Professional Indemnity Policy'}},
            { path: 'professionalLiabilty', component: ProfessionalLiabiltyPolicyComponent, data: {breadcrumb: 'Professional Liabilty Policy'}},
            { path: 'directorsLiabilty', component: DirectorsLiabilityPolicyComponent, data: {breadcrumb: 'Directors Liability Policy'}},
            { path: 'liftPolicy', component: LiftPolicyComponent, data: {breadcrumb: 'Lift Policy'}},
            { path: 'emplyoeeLiabilty', component: EmployeeLiabilityComponent, data: {breadcrumb: 'Employee Liability Policy'}},
            { path: 'careerPolicy', component: CareerLiabilityPolicyComponent, data: {breadcrumb: 'Career Liability Policy'}},
            { path: 'liabilityAct', component: LiabilityInsuranceActComponent, data: {breadcrumb: 'Liability Insurance Act Policy'}},
            { path: 'golfersPolicy', component: GolfersPolicyComponent, data: {breadcrumb: 'Golfers Policy'}},
            { path: 'fedlityPolicy', component: FiedlityPolicyComponent, data: {breadcrumb: 'FiedlityPolicy'}},
            { path: 'erectionPolicy', component: ErectionRiskPolicyComponent, data: {breadcrumb: 'Machinery Breakdown Policy'}},
            { path: 'electronics', component: ElectronicsComponent, data: {breadcrumb: 'Electronics Equiptment Policy'}},
            { path: 'contractors', component: ContractorsComponent, data: {breadcrumb: 'Contractors All Risk Policy'}},
            { path: 'household', component: HouseholdComponent, data: {breadcrumb: 'House Holders Policy'}},
            { path: 'public', component: PublicComponent, data: {breadcrumb: 'Public Liability Policy'}},
            { path: 'professional', component: ProfessionalComponent, data: {breadcrumb: 'Professional Indemnity Policy'}},
            { path: 'workmen', component: WorkmenComponent, data: {breadcrumb: 'Workmen Compensation'}},
            { path: 'grouphealth', component: GroupmedicalComponent, data: {breadcrumb: 'Group Health Insurance'}},
            { path: 'grouppersonal', component: GrouppersonalComponent, data: {breadcrumb: 'Group Personal Accident'}},
            { path: 'groupterm', component: GrouptermComponent, data: {breadcrumb: 'Group Term Life Insurance'}},
            { path: 'jewelersblock', component: JewelersblockComponent, data: {breadcrumb: 'Jewelers Block Policy'}},
            { path: 'directors', component: DirectorsComponent, data: {breadcrumb: 'Directors and Officers Liability Policy'}},
            { path: 'bankers', component: BankersComponent, data: {breadcrumb: 'Bankers Identity Policy'}},
            { path: 'erection', component: ErectionComponent, data: {breadcrumb: 'Erection All rick Policy'}},
            { path: 'register', component: RegisterComponent, data: { breadcrumb: 'Register' } },
            { path: 'star-proposal/:stepper', component: StarHealthProposalComponent, data: { breadcrumb: 'Proposal' }, canDeactivate: [DeactivateGuard] },
            { path: 'proposal/:proposalId/:stepper', component: StarHealthProposalComponent, data: { breadcrumb: 'Proposal' }, canDeactivate: [DeactivateGuard] },
            { path: 'healthinsurance', component: HealthInsuranceComponent, data: { breadcrumb: 'Health' }, resolve: { companyDetails: HealthInsuranceResolver}},
            { path: 'health', component: HealthComponent, data: { breadcrumb: 'Health Form' }},
            { path: 'paymentSuccess', component: PaymentSuccessComponent, data: { breadcrumb: 'Payment Success' } },
            { path: 'downloadPolicy/:id', component: DownloadPolicyComponent, data: { breadcrumb: 'Download Policy' } },
            { path: 'downloadPolicyTravelReligare/:id', component: DownloadPolicyTravelReligareComponent, data: { breadcrumb: 'Download Policy' } },
            { path: 'downloadPolicyTravelStar/:id', component: DownloadPolicyTravelComponent, data: { breadcrumb: 'Download Policy' } },
            { path: 'religareDownloadPolicy/:status/:proId', component: ReligareDownloadPolicyComponent, data: { breadcrumb: 'Religare Download Policy' } },
            { path: 'religare-proposal/:stepper', component: ReligareHealthProposalComponent, data: { breadcrumb: 'Religare' }, canDeactivate: [ReligareHealthDeactivateGuardService] },
            { path: 'religare-health-proposal/:proposalId/:stepper', component: ReligareHealthProposalComponent, data: { breadcrumb: 'Religare' }, canDeactivate: [ReligareHealthDeactivateGuardService] },
            { path: 'viewresult', component: ViewresultComponent, data: { breadcrumb: 'Result' }, canDeactivate: [ResultDeactivateGuard] },
            { path: 'dm-viewresult', component: DmViewresultComponent, data: { breadcrumb: 'Result' }, canDeactivate: [DmresultdeactivatetimeGuard]},
            { path: 'startexam', component: EntranceexamComponent, data: { breadcrumb: 'Exam' }, canActivate: [ExamactivateGuard]},
            { path: 'exam', component: ExamComponent, data: { breadcrumb: 'Exam' }, canDeactivate: [ExamdeactivatetimeGuard], canActivate: [ExamactivateGuard] },
            { path: 'training', component: TrainingComponent, data: { breadcrumb: 'Training' }, canDeactivate: [DeactivatetimeGuard] },
            { path: 'personalaccident', component: PersonalaccidentComponent, data: {breadcrumb: 'Personal Accident'} },
            { path: 'travel', component: TravelHomeComponent, data: {breadcrumb: 'Travel' } },
            //{ path: 'Personal-accident-star-health-proposal', component: PersonalAccidentProposalComponent, data: { breadcrumb: 'Personal Accident Proposal'} },
            { path: 'pos-certificate', component: PosCertificateComponent, data: { breadcrumb: 'Pos Certificate'} },
            { path: 'reliance-heath/:stepper', component: RelianceHeathProposalComponent, data: { breadcrumb: 'Reliance'}, canDeactivate: [RelianceHealthDeactivateGuardService] },
            { path: 'reliance-heath-proposal/:proposalId/:stepper', component: RelianceHeathProposalComponent, data: { breadcrumb: 'Reliance'}, canDeactivate: [RelianceHealthDeactivateGuardService] },
            { path: 'religare-health-proposal-payment-success/:status/:proId/:policyNo/:policyStatus', component: ReligarePaymentSuccessComponent, data: { breadcrumb: 'Religare payment Success'} },
            { path: 'reliance-heath-proposal-payment-success/:status/:proId/:mailstatus', component: ReliancePaymentSuccessComponent, data: { breadcrumb: 'Relaince payment Success'} },
            { path: 'apollomunich-payment-success/:status/:proId/:applicationNo', component: ApollomunichPaymentSuccessComponent, data: { breadcrumb: 'Apollo munich payment Success'} },
            { path: 'careers', component:CareerComponent, data: { breadcrumb: 'Career'} },
            { path: 'about-pos', component:AboutPosComponent, data: { breadcrumb: 'About Pos'} },
            { path: 'about-vizza', component:AboutVizzaComponent, data: { breadcrumb: 'About Vizza'} },
            { path: 'mediacenter', component:MediaCenterComponent, data: { breadcrumb: 'Learning Center'} },
            // { path: 'viewmedia', component:ViewmediaComponent, data: { breadcrumb: 'View Media Center'} },
            { path: 'personal-accident-religare/:stepper', component:PersonalAccidentReligareProposalComponent, data: { breadcrumb: 'Personal Accident Form'},canDeactivate: [ReligarePaproposaldeactivateGuardService] },
            { path: 'religare-pa/:proposalId/:stepper', component:PersonalAccidentReligareProposalComponent, data: { breadcrumb: 'Personal Accident Form'},canDeactivate: [ReligarePaproposaldeactivateGuardService] },
            { path: 'appollo-health/:stepper', component:AppolloMunichComponent, data:{ breadcrumb: 'Appollo Munich'},canDeactivate: [AppollohealthproposaldeactivateGuardService]},
            { path: 'appollo-munich-health/:proposalId/:stepper', component:AppolloMunichComponent, data:{ breadcrumb: 'Appollo Munich'},canDeactivate: [AppollohealthproposaldeactivateGuardService]},
            { path: 'travelpremium', component:TravelPremiumListComponent, data: { breadcrumb: 'Travel Premium'} },
            { path: 'travelproposal/:stepper', component:TravelProposalComponent, data: { breadcrumb: 'Travel Proposal'} },
            { path: 'paymentSuccessTravel', component:PaymentSuccessTravelComponent, data: { breadcrumb: 'Payment Success'} },
            { path: 'iffcoProposal/:stepper', component:IffcoTokioComponent, data: { breadcrumb: 'Iffco Tokio'} },
            { path: 'iffco/:proposalId/:stepper', component:IffcoTokioComponent, data: { breadcrumb: 'Iffco Tokio'} },
            { path: 'religare-payment-success-pa/:status/:proId', component:ReligarePaymentSuccessPaComponent, data: { breadcrumb: 'personalAccidentPayment Success'} },
            { path: 'travel-reliance-payment-success/:status/:proId/:mailStatus', component:TravelReliancePaymentSuccessComponent, data: { breadcrumb: 'Travel reliance payment success'} },
            { path: 'apollomunich-pa-payment-success/:status/:proId/:applicationNo', component:ApollomunichPaPaymentSuccessComponent, data: { breadcrumb: 'personalAccidentPayment Success'} },
            { path: 'iffco-tokio-health-payament-success/:status/:applicationNo/:proId', component:IffcoTokioHealthPayamentSuccessComponent, data: { breadcrumb: 'personalAccidentPayment Success'} },
            { path: 'bajaj-health/:stepper', component: BajajAlianzComponent, data: { breadcrumb: 'Bajaj Alianz'}, canDeactivate: [BajajHealthDeactivateGuardService]},
            { path: 'bajaj/:proposalId/:stepper', component: BajajAlianzComponent, data: { breadcrumb: 'Bajaj Alianz'}, canDeactivate: [BajajHealthDeactivateGuardService]},
            { path: 'bajajalianz-payment-success/:status/:proId', component: BajajalianzPaymentSuccessComponent, data: { breadcrumb: 'Bajaj Alianz Payment Success'} },
            { path: 'bajaj-download-policy/:proId', component: BajajDownloadPolicyComponent, data: { breadcrumb: 'Bajaj Alianz Download Policy'} },
            { path: 'appollopa/:stepper',component: AppollomunichpaComponent, data:{ breadcrumb: 'Appllo PA'},canDeactivate: [AppolloPaproposaldeactivateGuardService]},
            { path: 'appollo-pa/:proposalId/:stepper',component: AppollomunichpaComponent, data:{ breadcrumb: 'Appllo PA'},canDeactivate: [AppolloPaproposaldeactivateGuardService]},
            { path: 'bike-insurance', component: BikeInsuranceComponent, data:{breadcrumb: 'Bike Insurance'}},
            { path: 'religaretravel/:stepper', component: ReliagretravelproposalComponent, data:{breadcrumb: 'Religare Travel Proposal'}},
            { path: 'reliancetravel/:stepper', component: TravelRelianceProposalComponent, data:{breadcrumb: 'Reliance Travel Proposal'}},
            { path: 'term-life', component: TermLifeComponent, data:{breadcrumb: 'Term Life Insurance'}},
            { path: 'endowment-life-insurance', component: EndowmentLifeInsuranceComponent, data:{breadcrumb: 'Endowment Life Insurance'}},
            { path: 'hdfc-proposal/:stepper', component: HdfcHealthInsuranceComponent, data:{breadcrumb: 'HDFC Insurance'}, canDeactivate: [HdfcproposaldeactivateGuardService]},
            { path: 'hdfc-insurance/:proposalId/:stepper', component: HdfcHealthInsuranceComponent, data:{breadcrumb: 'HDFC Insurance'}, canDeactivate: [HdfcproposaldeactivateGuardService]},
            { path: 'hdfc-personalAccident/:stepper', component: HdfcPersonalaccidentComponent, data:{breadcrumb: 'HDFC PersonalAccident'}, canDeactivate: [HdfcPaproposaldeactivateGuardService]},
            { path: 'shriram-travel-home/:stepper', component: TravelShriramProposalComponent, data:{breadcrumb: 'Shriram Travel'}},
            { path: 'hdfc-payment-success/:status/:proId/:policyStatus', component: HdfcHealthPaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'hdfc-pa-payment-success/:status/:proId', component: HdfcPaPaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'hdfc-travel-payment-success/:status/:proId', component: HdfcTravelPaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'travel-religare-payment-success/:status/:proId/:policyNo/:policyStatus', component: TravelReligarePaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'shriram-travel-payment-success/:status/:proId', component: TravelShriramPaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'shriram-travel-payment-success/:status/:proId/:mailstatus', component: TravelShriramPaymentSuccessComponent, data:{breadcrumb: 'Payment Success'}},
            { path: 'claim-assistance', component: ClaimAssistanceComponent, data:{breadcrumb: 'Claim Assistance'}},
            { path: 'hdfc-travel/:proposalId/:stepper', component: TravelHdfcProposalComponent, data:{breadcrumb: 'HDFC Travel'}, canDeactivate: [TravelhdfcdeactivateGuardService]},
            { path: 'religareDownloadPaPolicy/:status/:proId', component: ReligareDownloadPaPolicyComponent, data: { breadcrumb: 'Religare Pa Download Policy' } },
            { path: 'reliance-pa/:stepper', component: ReliancePaComponent, data:{breadcrumb: 'Reliance pa'}},
            { path: 'bikepremium', component: BikePremiumListComponent, data: { breadcrumb: 'Bike Premium'} },
            { path: 'life-premium-list', component: TermLifePremiumListComponent, data: { breadcrumb: 'Life Premium'} },
            { path: 'bike-shriram-proposal/:stepper', component: BikeShriramProposalComponent, data:{ breadcrumb: 'Bike-shriram-proposal'}},
            { path: 'royalsundaram-motor-payment-success/:status/:proId', component: RoyalsundaramMotorPaymentSuccessComponent, data:{ breadcrumb: 'Bike-Royal-Payment'}},
            { path: 'life-bajaj-proposal/:stepper', component: LifeBajajProposalComponent, data:{ breadcrumb: 'life-bajaj-proposal'}},
            { path: 'shriram-motor-payment-success/:status/:proId', component: ShriramMotorPaymentSuccessComponent, data:{ breadcrumb: 'Shriram Motor'}},
            { path: 'shriram-mfw-payment-success/:status/:proId', component: ShriramMfwPaymentSuccessComponent, data:{ breadcrumb: 'Shriram Motor'}},
            { path: 'bike-royal-proposal/:stepper', component: BikeRoyalProposalComponent, data:{ breadcrumb: 'Bike-Royal-proposal'}},
            { path: 'bajaj-travel/:stepper', component: TravelBajajalianzProposalComponent, data:{ breadcrumb: 'Travel Bajajalianz '}},
            { path: 'chola-health-proposal/:stepper', component: CholaHealthProposalComponent, data:{ breadcrumb: 'Chola Health'}},
            { path: 'reliance-motor-proposal/:stepper', component: RelianceMotorProposalComponent, data:{ breadcrumb: 'Reliance Motor'}},
            { path: 'bajaj-travel-payment-success/:status/:proId', component: TravelBajajPaymentSuccessComponent, data:{ breadcrumb: 'travel Bajaj'}},
            { path: 'reliance-pa-payment-success/:status/:proId', component: ReliancePaPaymentSuccessComponent, data:{ breadcrumb: 'reliance pa'}},
            { path: 'bike-tataaig-proposal/:stepper', component: BikeTataaigProposalComponent, data: { breadcrumb:'Bike-Tataaig-proposal'}},
            { path: 'app-chola-health-payment-success/:status/:proId', component: CholaHealthPaymentSuccessComponent, data: {breadcrumb: 'Payment Success'}},
            { path: 'bajaj-term-payment-success/:status/:policyNo/:applicationNo', component: BajajTermPaymentSuccessComponent, data: {breadcrumb: 'Payment Success'}},
            { path: 'enquiryPop', component: EnquiryPopupComponent, data: {breadcrumb: 'Vehicle List'}},
            { path: 'bike-tataaig-payment-success/:status/:proId', component: BikeTataaigPaymentSuccesssComponent, data:{ breadcrumb: 'bikeTataaig Payment'} },
            { path: 'car-tataaig-proposal/:stepper', component: CarTataaigProposalComponent, data: { breadcrumb: 'Car-Tataaig-proposal'}},
            { path: 'royal-sundaram-fourwheeler-proposal/:stepper', component: RsFourwheelerProposalComponent, data: { breadcrumb: 'Rs-fourwheeler-proposal'}},
            { path: 'royalsundaram-mfw-payment-success/:status/:proId', component: RoyalsundaramMfwPaymentSuccessComponent, data: { breadcrumb: 'Rs-fourwheeler-proposal'}},
            { path: 'aegon-term-life/:stepper', component: AegonTermLifeComponent, data: { breadcrumb: 'aegon-term-life'}},
            { path: 'hdfc-term-life/:stepper', component: HdfcTermLifeComponent, data: { breadcrumb: 'hdfc-term-life'}},
            { path: 'reliance-fourwheeler-motor-proposal/:stepper', component: RelianceFourwheelerProposalComponent, data: { breadcrumb: 'reliance-fourwheeler-motor-proposal'}},
            { path: 'reliance-fourwheeler-motor-payment-success/:status/:proId', component: RelianceFourwheelerPaymentSuccessComponent, data: { breadcrumb: 'reliance fourwheeler payment'}},
            { path: 'four-wheeler-home', component: FourWheelerHomeComponent, data: { breadcrumb: 'Four Wheeler Home'}},
            { path: 'four-wheeler-list', component: FourWheelerProductListComponent, data: { breadcrumb: 'Four Wheeler Home'}},
            { path: 'four-wheeler-shriram/:stepper', component: ShriramFourwheelerProposalComponent, data: { breadcrumb: 'Shriram Four Wheeler '}},
            { path: 'learning-center', component: LearningCenterComponent, data: { breadcrumb: 'Learning Center'}},
            { path: 'edelweiss-term-life/:stepper', component: EdelweissTermLifeComponent, data: { breadcrumb: 'Edelweiss TermLife Component'}},
            { path: 'edelweiss-term-life-payment-success/:status/:proId', component: EdelweissTermLifePaymentSuccessComponent, data: { breadcrumb: 'Edelweiss term life payment'}},
            { path: 'car-tataaig-payment-success/:status/:proId', component: CarTataaigPaymentSuccessComponent, data: { breadcrumb: 'carTataaig payment'} },
            { path: 'reliance-twowheeler-motor-payment-success/:status/:proId', component: RelianceTwowheelerPaymentSuccessComponent, data: { breadcrumb: 'reliance Twowheeler payment'}},
            { path: 'gold-suraksha', component: BajajGoldSurakshaComponent, data: { breadcrumb: 'Bajaj- Gold Suraksha'}},
            { path: 'ulip', component: UlipComponent, data: { breadcrumb: 'ULIP'}},
            { path: 'jewelers', component: JewelersblockComponent, data: { breadcrumb: 'Jewelers Block Policy'}},
            { path: 'specialContigency', component: SpecialContigencyPolicyComponent, data: { breadcrumb: 'Special Contigency Policy'}},
            { path: 'groupTravel', component: GroupTravelComponent, data: { breadcrumb: 'Group Travel Insurance'}},
            { path: 'hdfc-twoWheeler-proposal/:stepper', component: HdfcTwoWheelerProposalComponent, data: { breadcrumb: 'hdfc-twoWheeler-proposal'}},
            { path: 'hdfc-car-proposal/:stepper', component: HdfcCarProposalComponent, data: { breadcrumb: 'hdfc-car-proposal'}},
            { path: 'hdfc-two-wheeler-payment/:status/:proId', component: HdfcTwoWheelerPaymentComponent, data: { breadcrumb: 'hdfc-two-wheeler-payment'} },
            { path: 'hdfc-car-payment-success/:status/:proId', component: HdfcCarPaymentSuccessComponent, data: { breadcrumb: 'hdfc-car-payment-success'} },
            { path: 'edelweiss-pos-home', component: EdelweissPosHomeComponent, data:{breadcrumb: 'Edelweiss pos Home'}},
            { path: 'edelweiss-premium-list', component: EdelweissposPremiumListComponent, data: { breadcrumb: 'Edelweiss Premium'} },
            { path: 'edelweiss-pos/:stepper', component: EdelweissPosComponent, data:{breadcrumb: 'Edelweiss pos Insurance'} },
            { path: 'edelweisspos-payment-success/:status/:proId', component: EdelweissposPaymnetSuccessComponent, data: { breadcrumb: 'Edelweisspos payment'}},

        ]
    },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
    useHash: true
});
