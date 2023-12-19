import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderAdminComponent } from './backOffice/header-admin/header-admin.component';
import { FooterAdminComponent } from './backOffice/footer-admin/footer-admin.component';
import { SideAdminComponent } from './backOffice/side-admin/side-admin.component';
import { DashboardComponent } from './backOffice/body-admin/body-admin.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { AllTemplateUserComponent } from './FrontOffice/all-template-user/all-template-user.component';
import { BodyUserComponent } from './FrontOffice/body-user/body-user.component';
import { FooterUserComponent } from './FrontOffice/footer-user/footer-user.component';
import { HeaderUserComponent } from './FrontOffice/header-user/header-user.component';
import { PreloaderComponent } from './FrontOffice/preloader/preloader.component';
import { ClaimComponent } from './backOffice/claim/claim.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ClaimService } from './claim.service';
import { AddclaimComponent } from './FrontOffice/addclaim/addclaim.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { UsersComponent } from './backOffice/users/users.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateuserComponent } from './FrontOffice/updateuser/updateuser.component';
import { StickynavComponent } from './FrontOffice/stickynav/stickynav.component';
import { LoginadComponent } from './loginad/loginad.component';
import { ClaimsuserComponent } from './FrontOffice/claimsuser/claimsuser.component';
import { FinancialnewsComponent } from './FrontOffice/financialnews/financialnews.component';
import { Financialnews1Component } from './FrontOffice/financialnews1/financialnews1.component';
import { Financialnews2Component } from './FrontOffice/financialnews2/financialnews2.component';
import { PortfolioComponent } from './FrontOffice/portfolio/portfolio.component';
import { TradebodyComponent } from './FrontOffice/tradebody/tradebody.component';


import { OrderbuyComponent } from './FrontOffice/orderbuy/orderbuy.component';
import { TransactionhistoryComponent } from './FrontOffice/transactionhistory/transactionhistory.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { WebsocketService } from './websocket.service';
import { FormationComponent } from './backOffice/formation/formation.component';
import { TutorialComponent } from './FrontOffice/tutorial/tutorial.component';
import { ChatComponent } from './FrontOffice/chat/chat.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    SideAdminComponent,
    DashboardComponent,
    AllTemplateAdminComponent,
    AllTemplateUserComponent,
    BodyUserComponent,
    FooterUserComponent,
    HeaderUserComponent,
    PreloaderComponent,
    ClaimComponent,
    AddclaimComponent,
    LoginComponent,
    ForbiddenComponent,
    UsersComponent,
    ForgotpasswordComponent,
    SignupComponent,
    UpdateuserComponent,
    StickynavComponent,
    LoginadComponent,
    ClaimsuserComponent,
    FinancialnewsComponent,
    Financialnews1Component,
    Financialnews2Component,
    PortfolioComponent,
    TradebodyComponent,

    OrderbuyComponent,
    TransactionhistoryComponent,
    FormationComponent,
    TutorialComponent,
    ChatComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService,ClaimService,WebsocketService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
