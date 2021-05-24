import { AlertsComponent } from '@alerts/components/alerts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertsComponent]

})
export class AlertsModule { }
