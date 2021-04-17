import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// my components
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/accounts/login/login.component';
import { RegisterComponent } from '@components/accounts/register/register.component';
import { ChangePasswordComponent } from '@components/accounts/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changePassword', component: ChangePasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
