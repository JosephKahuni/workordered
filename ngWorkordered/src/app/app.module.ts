import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// maodules - imports
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatar';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// components/directives/pipes - declarations
import { AppComponent } from './app.component';
import { NavComponent } from '@components/nav/nav.component';
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/accounts/login/login.component';
import { RegisterComponent } from '@components/accounts/register/register.component';
import { AlertsComponent } from '@components/alerts/alerts.component';
import { ChangePasswordComponent } from '@components/accounts/change-password/change-password.component';
import { AddPhoneNumberComponent } from '@components/accounts/add-phone-number/add-phone-number.component';
import { UserProfileComponent } from '@components/user-profile/user-profile.component';
import { ChangePrimaryComponent } from '@components/accounts/change-phone-number/change-primary/change-primary.component';
import { ChangeSecondaryComponent } from '@components/accounts/change-phone-number/change-secondary/change-secondary.component';

import {
  ValidateNameFormatDirective,
  ValidatePayrollFormatDirective,
  ValidatePhoneFormatDirective,
  ValidateUsernameFormatDirective
} from '@directives/accounts/validate-format/validate-format.directive';
import {
  ComparePhoneNumbersDirective,
  ComparePasswordsDirective
} from '@directives/accounts/compare-fields/compare-fields.directive';
import {
  VerifyUniquePhoneNumberDirective,
  VerifyUniquePayrollNumberDirective
} from '@directives/accounts/verify-unique/verify-unique.directive';
import { ConfirmIfTechnicianDirective } from '@directives/accounts/confirm-if-technician/confirm-if-technician.directive';
import { VerifyUserExistsDirective } from '@directives/accounts/verify-user-exists/verify-user-exists.directive';


// services/values - providers
import { AccountsService } from '@services/accounts/accounts.service';
import { CookieService } from 'ngx-cookie-service';
import { AlertsService } from '@services/alerts/alerts.service';
import { JwtInterceptor } from '@interceptors/jwt/jwt';
import { appInitializer } from '@initializer/app.initializer';
import { ErrorsInterceptor } from '@interceptors/error/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertsComponent,
    ValidateNameFormatDirective,
    ValidatePayrollFormatDirective,
    ValidatePhoneFormatDirective,
    ValidateUsernameFormatDirective,
    ComparePhoneNumbersDirective,
    ComparePasswordsDirective,
    VerifyUniquePhoneNumberDirective,
    VerifyUniquePayrollNumberDirective,
    ConfirmIfTechnicianDirective,
    ChangePasswordComponent,
    AddPhoneNumberComponent,
    VerifyUserExistsDirective,
    UserProfileComponent,
    ChangePrimaryComponent,
    ChangeSecondaryComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    AvatarModule,
    CommonModule,
    NgxSpinnerModule,
    BrowserAnimationsModule

  ],

  providers: [
    {
      provide: APP_INITIALIZER, useFactory: appInitializer,
      multi: true, deps: [AccountsService]
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },

    AccountsService,
    CookieService,
    AlertsService
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule { }

