import { Alert, AlertType } from '@models/alerts/alerts.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // subscribe to alerts observable

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // main alert method
  alert(alert: Alert): void {
    alert.id = alert.id ?? this.defaultId;
    this.subject.next(alert);
  }

  // methods of convenience
  success(message: string, options?: any): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Success,
      message
    }));
  }

  error(message: string, options?: any): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Error,
      message
    }));
  }

  info(message: string, options?: any): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Info,
      message
    }));
  }

  warn(message: string, options?: any): void {
    this.alert(new Alert({
      ...options,
      type: AlertType.Warning,
      message
    }));
  }

  // clearing the alerts
  clear(id = this.defaultId): void {
    this.subject.next(new Alert({ id }));
  }
}
