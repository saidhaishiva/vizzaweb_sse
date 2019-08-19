import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { DoctorsService } from './shared/services/doctors.service';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';



import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {ConfirmPasswordComponent} from './pages/confirm-password/confirm-password.component';
import { FaqComponent} from './pages/faq/faq.component';
import { AboutUsComponent} from './pages/about-us/about-us.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import {RenewalComponent} from './pages/renewal/renewal.component';
// import { AuthGuardService } from './shared/services/auth-guard.service';
import { AddposComponent} from './pages/addpos/addpos.component';
import { PosComponent } from './pages/pos/pos.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import {LearningcenterComponent} from './pages/learningcenter/learningcenter.component';
import {CategoryComponent} from './pages/category/category.component';
import {SubjectComponent} from './pages/subject/subject.component';
import {QuestionComponent} from './pages/question/question.component';
import {ListquestionComponent} from './pages/question/listquestion/listquestion.component';
import { BranchmanagerComponent} from './pages/branchmanager/branchmanager.component';
import {AddbranchmanagerComponent} from './pages/branchmanager/addbranchmanager/addbranchmanager.component';
import {SalesmanagerComponent} from './pages/salesmanager/salesmanager.component';
import {AddsalesmanagerComponent} from './pages/salesmanager/addsalesmanager/addsalesmanager.component';
import {RelationalComponent} from './pages/relational/relational.component';
import {AddrelationalmanagerComponent} from './pages/relational/addrelationalmanager/addrelationalmanager.component';
import {BranchcoordinatorComponent} from './pages/branchcoordinator/branchcoordinator.component';
import {AddbranchcoordinatorComponent} from './pages/branchcoordinator/addbranchcoordinator/addbranchcoordinator.component';
import {BranchComponent} from './pages/branch/branch.component';
import {PosmanagerComponent} from './pages/posmanager/posmanager.component';
import {AddposmanagerComponent} from './pages/posmanager/addposmanager/addposmanager.component';
import {PosEditComponent} from './pages/pos-edit/pos-edit.component';
import {DmmanagerComponent} from './pages/dmmanager/dmmanager.component';
import {MediacenterComponent} from './pages/mediacenter/mediacenter.component';
import {DistanceMarketingComponent} from './pages/distance-marketing/distance-marketing.component';
import {DmProfileComponent} from './pages/dm-profile/dm-profile.component';
import {AddDmComponent} from './pages/add-dm/add-dm.component';
import {EditDmComponent} from './pages/edit-dm/edit-dm.component';
import {AddcenterComponent} from './pages/mediacenter/addcenter/addcenter.component';
import {EditmediaComponent} from './pages/mediacenter/editmedia/editmedia.component';
import { TestimonialComponent} from './pages/testimonial/testimonial.component';
import {CareerListComponent} from './pages/career-list/career-list.component';
import {MetaDetailsComponent} from './pages/meta-details/meta-details.component';
import {AddMetaDetailComponent} from './pages/meta-details/add-meta-detail/add-meta-detail.component';
import {EditMetaDetailComponent} from './pages/meta-details/edit-meta-detail/edit-meta-detail.component';
import {ComponentComponent} from './pages/component/component.component';
import {AddComponentComponent} from './pages/component/add-component/add-component.component';
import {EditComponentComponent} from './pages/component/edit-component/edit-component.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: PagesComponent, canActivate: [AuthGuardService], children: [
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
            { path: 'faq', component: FaqComponent, data: { breadcrumb: 'FAQ' } },
            { path: 'about-us', component: AboutUsComponent, data: { breadcrumb: 'About Us' } },
            { path: 'learningcenter', component: LearningcenterComponent, data: { breadcrumb: 'Learning Center' } },
            { path: 'category', component: CategoryComponent, data: { breadcrumb: 'Category' } },
            { path: 'branchmanager', component: BranchmanagerComponent, data: { breadcrumb: 'Branch Manager' } },
            { path: 'addbranchmanager', component: AddbranchmanagerComponent, data: { breadcrumb: ' Add Branch Manager' } },
            { path: 'salesmanager', component: SalesmanagerComponent, data: { breadcrumb: 'Sales Manager' } },
            { path: 'relationalmanager', component: RelationalComponent, data: { breadcrumb: 'Relational Manager' } },
            { path: 'addrelationalmanager', component: AddrelationalmanagerComponent, data: { breadcrumb: ' Add Relational Manager' } },
            { path: 'branchcoordinator', component: BranchcoordinatorComponent, data: { breadcrumb: ' Branch Coordinator' } },
            { path: 'addbranchcoordinator', component: AddbranchcoordinatorComponent, data: { breadcrumb: ' Branch Coordinator' } },
            { path: 'addsalesmanager', component: AddsalesmanagerComponent, data: { breadcrumb: ' Add Sales Manager' } },
            { path: 'subject', component: SubjectComponent, data: { breadcrumb: 'Subject' } },
            { path: 'question', component: QuestionComponent, data: { breadcrumb: 'Questions' } },
            { path:  'listquestion', component: ListquestionComponent, data: { breadcrumb: 'List Questions' } },
            { path: 'contact-us', component: ContactUsComponent, data: { breadcrumb: 'Contact Us' } },
            { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS List' } },
            { path: 'addpos', component: AddposComponent, data: { breadcrumb: 'Add POS' } },
            { path: 'pos-profile/:id/:status', component: PosprofileComponent, data: { breadcrumb: 'POS Profile' } },
            { path: 'branch', component: BranchComponent, data: { breadcrumb: ' Branch' } },
            { path: 'posmanager', component: PosmanagerComponent, data: { breadcrumb: 'POS Manager' } },
            { path: 'addposmanager', component: AddposmanagerComponent, data: { breadcrumb: 'Add POS Manager' } },
            { path: 'pos-edit/:id', component: PosEditComponent, data: { breadcrumb: 'POS Edit' } },
            { path: 'adminlist', component: RenewalComponent, data: { breadcrumb: 'List' } },
            { path: 'addadmin', component: RenewalComponent, data: { breadcrumb: 'Add Admin' } },
            { path: 'dmmanager', component: DmmanagerComponent, data: { breadcrumb: 'DM Manager' } },
            { path: 'mediacenter', component: MediacenterComponent, data: { breadcrumb: 'Media Center' } },
            { path: 'add-mediacenter', component: AddcenterComponent, data: { breadcrumb: 'Add Media Center' } },
            { path: 'edit-mediacenter/:id', component: EditmediaComponent, data: { breadcrumb: 'Edit Media Center' } },
            { path: 'distance-marketing', component: DistanceMarketingComponent, data: { breadcrumb: 'Add Center' } },
            { path: 'dm-add', component: AddDmComponent, data: { breadcrumb: 'Add DM' } },
            { path: 'dm-edit/:id', component: EditDmComponent, data: { breadcrumb: 'Edit DM' } },
            { path: 'dm-profile/:id/:status', component: DmProfileComponent, data: { breadcrumb: 'DM Profile' } },
            { path: 'testimonial', component: TestimonialComponent, data: { breadcrumb: 'Testimonial'} },
            { path: 'careerList', component: CareerListComponent, data: { breadcrumb: 'Career'} },
            { path: 'metaDetails', component: MetaDetailsComponent, data: { breadcrumb: 'Meta Details'} },
            { path: 'addMetaDetails', component: AddMetaDetailComponent, data: { breadcrumb: 'Add Meta Details'} },
            { path: 'editMetaDetails/:id', component: EditMetaDetailComponent, data: { breadcrumb: 'Edit Meta Details'} },
            { path: 'component', component: ComponentComponent, data: { breadcrumb: 'Component'} },
            { path: 'addComponent', component: AddComponentComponent, data: { breadcrumb: 'Add Component'} },
            { path: 'editComponent/:id', component: EditComponentComponent, data: { breadcrumb: 'Edit Component'} },
        ]
    },
    { path: 'login',  loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'forgotpassword', component: ForgotPasswordComponent, data: { breadcrumb: 'forgot password' } },
    { path: 'confirmpassword', component: ConfirmPasswordComponent, data: { breadcrumb: 'confirm password' } },
    { path: 'login/:status', loadChildren: 'app/pages/login/login.module#LoginModule'},
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   // preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   useHash: true
});
