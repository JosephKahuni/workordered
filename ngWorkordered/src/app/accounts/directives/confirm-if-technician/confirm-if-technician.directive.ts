import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';




@Directive({
  selector: '[appConfirmIfTechnician]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ConfirmIfTechnicianDirective,
    multi: true
  }]
})
export class ConfirmIfTechnicianDirective implements AsyncValidator {

  constructor(private accountsService: AccountsService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control && (control.value !== 0 || control.value !== undefined || control.value !== null)) {
      if (control.value === 'Technicians') {
        const payroll = control.root.get('payroll_number');

        if (payroll) {
          // tslint:disable-next-line: deprecation
          const subscription: Subscription = payroll.valueChanges.subscribe(
            () => {
              control.updateValueAndValidity();
              subscription.unsubscribe();
            }
          );

          const payrollNumber = payroll.value;

          return this.accountsService.confrimIfTechnician(payrollNumber)
            .pipe(
              map(
                (user: any) => {
                  const message = user[`message`];
                  return message === 'not technician' ?
                    {
                      notTechnician:
                      {
                        value:
                          `${payrollNumber} is not registered to any technician. 
                        Change the payroll or group and then try again.`
                      }
                    } : null;
                }
              )
            );

        }
      }
    }
    return Promise.resolve(null);
  }


}
