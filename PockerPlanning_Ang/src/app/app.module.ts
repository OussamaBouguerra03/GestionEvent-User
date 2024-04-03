 
import { SigninComponent } from './home/sign-in/signin/signin.component';
import { SignupComponent } from './home/sign-up/signup/signup.component';
import { ResetpasswordComponent } from './home/reset-password/resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './home/forgot-password/forgotpassword/forgotpassword.component';
import { Error404Component } from './home/error404/error404/error404.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { VerificationSuccessfulComponent } from './home/verification-successful/verification-successful/verification-successful.component';
import { VerificationFailedComponent } from './home/verification-failed/verification-failed/verification-failed.component';
 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin/admin.module';
import { ChefProjetModule } from './modules/chef-projet/chef-projet.module';
import { DeveloppeurModule } from './modules/developpeur/developpeur.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageAcceuilComponent } from './home/pageAcceuil/page-acceuil/page-acceuil.component';
import { CommonModule } from '@angular/common';
 
@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    SigninComponent,
    SignupComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    Error404Component,
    VerificationSuccessfulComponent,
    VerificationFailedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ReactiveFormsModule,
     FormsModule,
     CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    AdminModule,
    ChefProjetModule,
    DeveloppeurModule,
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
