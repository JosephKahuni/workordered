import { AccountsModule } from 'src/app/accounts/accounts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { LoginAuthGuard } from '@utils/guards/login-auth-guard/login.auth.guard';
// import { ErrorsInterceptor } from '@utils/interceptors/error/error.interceptor';
// import { JwtInterceptor } from '@utils/interceptors/jwt/jwt';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, AccountsModule
  ],
  // exports: [LoginAuthGuard, ErrorsInterceptor, JwtInterceptor]
})
export class UtilsModule { }
