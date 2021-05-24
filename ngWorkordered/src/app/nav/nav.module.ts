import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { AccountsService } from '@services/accounts/accounts.service';
import { NavComponent } from '@nav/components/nav.component';
import { AppRoutingModule } from './../app-routing.module';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    AvatarModule,
    AppRoutingModule

  ],
  exports: [NavComponent],
  providers: [AccountsService]
})
export class NavModule { }
