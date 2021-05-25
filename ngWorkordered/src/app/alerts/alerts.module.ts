import { AlertsComponent } from '@alerts/components/alerts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AlertsService } from '@alerts/services/alerts.service'



@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertsComponent],
  // providers: [AlertsService]

})
export class AlertsModule { }
