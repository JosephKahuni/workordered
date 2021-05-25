import { AccountsModule } from 'src/app/accounts/accounts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { NavComponent } from '@nav/components/nav.component';
import { AppRoutingModule } from './../app-routing.module';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    AvatarModule,
    AppRoutingModule,
    AccountsModule

  ],
  exports: [NavComponent],
})
export class NavModule { }
