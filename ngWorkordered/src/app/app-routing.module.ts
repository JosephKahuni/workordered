import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// login auth guard
import { LoginAuthGuard } from '@guards/login-auth-guard/login.auth.guard';

// my components
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/accounts/login/login.component';
import { RegisterComponent } from '@components/accounts/register/register.component';
import { ChangePasswordComponent } from '@components/accounts/change-password/change-password.component';
import { UserProfileComponent } from '@components/user-profile/user-profile.component';
import { AddPhoneNumberComponent } from '@components/accounts/add-phone-number/add-phone-number.component';
import { ChangePrimaryComponent } from '@components/accounts/change-phone-number/change-primary/change-primary.component';
import { ChangeSecondaryComponent } from '@components/accounts/change-phone-number/change-secondary/change-secondary.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [LoginAuthGuard] },
  { path: 'changePrimaryPhoneNumber', component: ChangePrimaryComponent, canActivate: [LoginAuthGuard] },
  { path: 'changeSecondaryPhoneNumber', component: ChangeSecondaryComponent, canActivate: [LoginAuthGuard] },
  { path: 'addSecondaryPhoneNumber', component: AddPhoneNumberComponent, canActivate: [LoginAuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
