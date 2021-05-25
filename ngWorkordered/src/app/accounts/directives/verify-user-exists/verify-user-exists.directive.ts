import { AlertsService } from '@alerts/services/alerts.service';
import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[appVerifyUserExists]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: VerifyUserExistsDirective,
    multi: true
  }]
})
export class VerifyUserExistsDirective implements AsyncValidator {

  constructor(
    private accountsService: AccountsService,
    private alertsService: AlertsService
  ) { }
  private subscription!: Subscription;

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control && (control.value !== undefined || control.value !== null || control.value !== '')) {
      const phoneNumber = control.value;
      const username = control.root.get('username');

      if (username) {
        this.subscription = username.valueChanges
          // tslint:disable-next-line: deprecation
          .subscribe(
            () => {
              control.updateValueAndValidity();
              this.subscription.unsubscribe();
            }
          );

      }

      return phoneNumber && username ? this.accountsService.verifyUserExists(username.value, phoneNumber)
        .pipe(
          map(
            (userObj: any) => {
              const message = userObj[`message`];
              return message === 'invalid user credentials' ?
                {
                  noActiveUser: {
                    value:
                      this.alertsService.error(
                        'Invalid credentials. Check your username/payroll number or phone number.'
                      )
                  }
                } : null;

            }
          )
        ) : null;
    }
    return Promise.resolve(null);
  }

}
