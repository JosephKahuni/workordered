import { AccountsRoutingModule } from './accounts-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components/declaratives/pipes - declarations
import { RegisterComponent } from '@accounts/components/register/register.component';
import { LoginComponent } from '@accounts/components/login/login.component';
import { AddPhoneNumberComponent } from '@accounts/components/add-phone-number/add-phone-number.component';
import { ChangePasswordComponent } from '@accounts/components/change-password/change-password.component';
import { ChangePrimaryComponent } from '@accounts/components/change-phone-number/change-primary/change-primary.component';
import { ChangeSecondaryComponent } from '@accounts/components/change-phone-number/change-secondary/change-secondary.component';
import { UserProfileComponent } from '@accounts/components/user-profile/user-profile.component';
import {
  ValidateNameFormatDirective,
  ValidatePayrollFormatDirective,
  ValidatePhoneFormatDirective,
  ValidateUsernameFormatDirective
} from '@accounts/directives/validate-format/validate-format.directive';
import {
  ComparePhoneNumbersDirective,
  ComparePasswordsDirective
} from '@accounts/directives/compare-fields/compare-fields.directive';
import {
  VerifyUniquePhoneNumberDirective,
  VerifyUniquePayrollNumberDirective
} from '@accounts/directives/verify-unique/verify-unique.directive';
import { ConfirmIfTechnicianDirective } from '@accounts/directives/confirm-if-technician/confirm-if-technician.directive';
import { VerifyUserExistsDirective } from '@accounts/directives/verify-user-exists/verify-user-exists.directive';


// services - providers
// import { AccountsService } from '@accounts/services/accounts/accounts.service';
// import { UserProfileService } from '@accounts/services/user-profile/user-profile.service';

// modules - imports
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AddPhoneNumberComponent,
    ChangePasswordComponent,
    ChangePrimaryComponent,
    ChangeSecondaryComponent,
    UserProfileComponent,
    ValidateNameFormatDirective,
    ValidatePayrollFormatDirective,
    ValidatePhoneFormatDirective,
    ValidateUsernameFormatDirective,
    ComparePhoneNumbersDirective,
    ComparePasswordsDirective,
    VerifyUniquePhoneNumberDirective,
    VerifyUniquePayrollNumberDirective,
    ConfirmIfTechnicianDirective,
    VerifyUserExistsDirective
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    NgxSpinnerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
  // providers: [Accoun]tsService]
})
export class AccountsModule { }
