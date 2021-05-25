import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertsService } from '@alerts/services/alerts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private alert: AlertsService
  ) { }

  loading = true;

  ngOnInit(): void {
    // this.spinner.show();
    // setTimeout(
    //   () => {
    //     this.loading = false;
    //     this.spinner.hide();
    //   }, 5
    // );
  }

}
