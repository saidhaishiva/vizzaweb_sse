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
// import { AuthGuardService } from './shared/services/auth-guard.service';
import { AddposComponent} from './pages/addpos/addpos.component';
import { PosComponent } from './pages/pos/pos.component';
import { PosprofileComponent } from './pages/posprofile/posprofile.component';
import {LearningcenterComponent} from './pages/learningcenter/learningcenter.component';
import {CategoryComponent} from './pages/category/category.component';
import {SubjectComponent} from './pages/subject/subject.component';
import {QuestionComponent} from './pages/question/question.component';
import { BranchmanagerComponent} from './pages/category/branchmanager.component';
import {AddbranchmanagerComponent} from './pages/branchmanager/addbranchmanager/addbranchmanager.component';
import {SalesmanagerComponent} from './pages/salesmanager/salesmanager.component';
import {AddsalesmanagerComponent} from './pages/salesmanager/addsalesmanager/addsalesmanager.component';
import {RelationalComponent} from './pages/relational/relational.component';
import {AddrelationalmanagerComponent} from './pages/relational/addrelationalmanager/addrelationalmanager.component';
import {BranchcoordinatorComponent} from './pages/branchcoordinator/branchcoordinator.component';
import {AddbranchcoordinatorComponent} from './pages/branchcoordinator/addbranchcoordinator/addbranchcoordinator.component';

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
            { path: 'contact-us', component: ContactUsComponent, data: { breadcrumb: 'Contact Us' } },
            { path: 'pos', component: PosComponent, data: { breadcrumb: 'POS List' } },
            { path: 'addpos', component: AddposComponent, data: { breadcrumb: 'Add POS' } },
            { path: 'pos-profile/:id/:status', component: PosprofileComponent, data: { breadcrumb: 'POS Profile' } },


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