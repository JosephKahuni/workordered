import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';


import { HomeRoutingModule } from '@home/home-routing.module';
import { HomeComponent } from '@home/components/home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
