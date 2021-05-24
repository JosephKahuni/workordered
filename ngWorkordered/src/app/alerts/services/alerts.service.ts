import { Alert, AlertType } from '@alerts/models/alerts.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'any'
})
export class AlertsService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // subscribe to alerts observable

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // main alert method
  alert(alert: Alert): void {
    // using the nullish coalescing operator to assign default values
    alert.id = alert.id ?? this.defaultId;
    alert.keepAfterRouteChange = alert.keepAfterRouteChange ?? true;
    alert.autoClose = alert.autoClose ?? true;
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

  clear(id = this.defaultId): void {
    this.subject.next(new Alert({ id }));
  }
}
