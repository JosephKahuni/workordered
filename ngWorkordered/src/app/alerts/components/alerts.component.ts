import { Alert, AlertType } from '@alerts/models/alerts.model';
import { AlertsService } from '@alerts/services/alerts.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-custom-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertsService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      // tslint:disable-next-line: deprecation
      .subscribe(alert => {
        if (!alert.message) {
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          this.alerts.forEach((x: { [prop: string]: any }) => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        this.alerts.push(alert);

        // auto close the alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 15000);
        }
      });

    // clear alerts on location change
    // tslint:disable-next-line: deprecation
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();

  }

  removeAlert(alert: Alert): any {
    // check if already removed to avoid errors on auto close
    if (!this.alerts.includes(alert)) { return; }

    if (this.fade) {
      // tslint:disable-next-line: no-non-null-assertion
      this.alerts.find(x => x === alert)!.fade = true;


      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    }

    else {
      // remove the alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert): any {
    if (!alert) { return; }

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-warning',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-danger',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }
    return classes.join(' ');
  }
}
