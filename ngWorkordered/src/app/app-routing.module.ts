import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// login auth guard
import { LoginAuthGuard } from '@guards/login-auth-guard/login.auth.guard';

// my components
import { LoginComponent } from '@components/accounts/login/login.component';
import { RegisterComponent } from '@components/accounts/register/register.component';
import { ChangePasswordComponent } from '@components/accounts/change-password/change-password.component';
import { UserProfileComponent } from '@components/user-profile/user-profile.component';
import { AddPhoneNumberComponent } from '@components/accounts/add-phone-number/add-phone-number.component';
import { ChangePrimaryComponent } from '@components/accounts/change-phone-number/change-primary/change-primary.component';
import { ChangeSecondaryComponent } from '@components/accounts/change-phone-number/change-secondary/change-secondary.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [LoginAuthGuard] },
  { path: 'changePrimaryPhoneNumber', component: ChangePrimaryComponent, canActivate: [LoginAuthGuard] },
  { path: 'changeSecondaryPhoneNumber', component: ChangeSecondaryComponent, canActivate: [LoginAuthGuard] },
  { path: 'addSecondaryPhoneNumber', component: AddPhoneNumberComponent, canActivate: [LoginAuthGuard] },
  { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
