import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { DashboardComponent } from './backOffice/body-admin/body-admin.component';
import { AllTemplateUserComponent } from './FrontOffice/all-template-user/all-template-user.component';
import { BodyUserComponent } from './FrontOffice/body-user/body-user.component';
import { ClaimComponent } from './backOffice/claim/claim.component';
import { AddclaimComponent } from './FrontOffice/addclaim/addclaim.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UsersComponent } from './backOffice/users/users.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateuserComponent } from './FrontOffice/updateuser/updateuser.component';
import { LoginadComponent } from './loginad/loginad.component';
import { ClaimsuserComponent } from './FrontOffice/claimsuser/claimsuser.component';
import { FinancialnewsComponent } from './FrontOffice/financialnews/financialnews.component';
import { Financialnews1Component } from './FrontOffice/financialnews1/financialnews1.component';
import { Financialnews2Component } from './FrontOffice/financialnews2/financialnews2.component';
import { PortfolioComponent } from './FrontOffice/portfolio/portfolio.component';
import { TradebodyComponent } from './FrontOffice/tradebody/tradebody.component';
import { OrderbuyComponent } from './FrontOffice/orderbuy/orderbuy.component';
import { TransactionhistoryComponent } from './FrontOffice/transactionhistory/transactionhistory.component';
import {FormationComponent} from "./backOffice/formation/formation.component";
import {TutorialComponent} from "./FrontOffice/tutorial/tutorial.component";
import {ChatComponent} from "./FrontOffice/chat/chat.component";



const routes: Routes = [
  {
    path:'',
    component: LoginComponent},
    {
      path:'loginadmin',
      component: LoginadComponent},
    {
      path:'forbidden',
      component: ForbiddenComponent},
      {
        path:'forgotpassword',
        component: ForgotpasswordComponent},
        {
          path:'signup',
          component: SignupComponent},
  {
    path:'admin',
    component:AllTemplateAdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
    children:[
      {
        path:'',
        component:DashboardComponent, canActivate:[AuthGuard], data:{roles:['Admin']}
      },
      {
        path:'claim',
        component:ClaimComponent, canActivate:[AuthGuard], data:{roles:['Admin']}
      },
      {
        path:'users',
        component:UsersComponent, canActivate:[AuthGuard], data:{roles:['Admin']}
      },
      {
        path:'formations',
        component:FormationComponent, canActivate:[AuthGuard], data:{roles:['Admin']}
      },
      {
        path:'updatepassword',component:UpdateuserComponent, canActivate:[AuthGuard], data:{roles:['Admin']}
      }

    ]

  },


   { path:'user',
   component: AllTemplateUserComponent, canActivate:[AuthGuard], data:{roles:['User']},
   children:[
      {
        path:'',
        component: BodyUserComponent
      },{
        path:'addclaim',component:AddclaimComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{
        path:'updatepassword',component:UpdateuserComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{
        path:'claims',component:ClaimsuserComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{
        path:'news',component:FinancialnewsComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{
        path:'newsCrypto',component:Financialnews1Component, canActivate:[AuthGuard], data:{roles:['User']}
      },{
        path:'newsAction',component:Financialnews2Component, canActivate:[AuthGuard], data:{roles:['User']}
      },
     {
       path:'tutorial',
       component:TutorialComponent, canActivate:[AuthGuard], data:{roles:['User']}
     },{
       path:'ChatBot',
       component:ChatComponent, canActivate:[AuthGuard], data:{roles:['User']}
     },

    ]
  },{
    path:'trade',component:TradebodyComponent, canActivate:[AuthGuard], data:{roles:['User']},
    children:[
      {

        path:'',component:PortfolioComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{

        path:'orderbuy',component:OrderbuyComponent, canActivate:[AuthGuard], data:{roles:['User']}
      },{

        path:'history',component:TransactionhistoryComponent, canActivate:[AuthGuard], data:{roles:['User']}
      }



    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
