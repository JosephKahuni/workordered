import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '@accounts/components/register/register.component';
import { LoginComponent } from '@accounts/components/login/login.component';
import { AddPhoneNumberComponent } from '@accounts/components/add-phone-number/add-phone-number.component';
import { ChangePasswordComponent } from '@accounts/components/change-password/change-password.component';
import { ChangePrimaryComponent } from '@accounts/components/change-phone-number/change-primary/change-primary.component';
import { ChangeSecondaryComponent } from '@accounts/components/change-phone-number/change-secondary/change-secondary.component';
import { UserProfileComponent } from '@accounts/components/user-profile/user-profile.component';

// login auth guard
import { LoginAuthGuard } from '@utils/guards/login-auth-guard/login.auth.guard';


const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    { path: 'userProfile', component: UserProfileComponent, canActivate: [LoginAuthGuard] },
    { path: 'changePrimaryPhoneNumber', component: ChangePrimaryComponent, canActivate: [LoginAuthGuard] },
    { path: 'changeSecondaryPhoneNumber', component: ChangeSecondaryComponent, canActivate: [LoginAuthGuard] },
    { path: 'addSecondaryPhoneNumber', component: AddPhoneNumberComponent, canActivate: [LoginAuthGuard] },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }
