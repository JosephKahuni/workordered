import { AccountsService } from '@accounts/services/accounts/accounts.service';
import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// verify unique phone number
@Directive({
  selector: '[appVerifyUniquePoneNumber]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: VerifyUniquePhoneNumberDirective,
    multi: true
  }]
})
export class VerifyUniquePhoneNumberDirective implements AsyncValidator {

  constructor(private accountsService: AccountsService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control && (control.value.length === 10) && (control.value !== null || control.value !== undefined)) {
      return this.accountsService.verifyUniquePhoneNumber(control.value)
        .pipe(
          map(
            (user: any) => {
              const message = user[`message`];
              return message === 'phone registered' ?
                {
                  phoneNumberRegistered:
                    { value: `${control.value} is already registered. Change the number and try again.` }
                } : null;
            }
          ));
    }
    return Promise.resolve(null);

  }

}

// verify unique payroll number
@Directive({
  selector: '[appVerifyUniquePayrollNumber]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: VerifyUniquePayrollNumberDirective,
    multi: true
  }]
})
export class VerifyUniquePayrollNumberDirective implements AsyncValidator {

  constructor(private accountsService: AccountsService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (control && (control.value.length !== 0 || control.value !== null || control.value !== undefined)) {
      return this.accountsService.verifyUniquePayrollNumber(control.value)
        .pipe(
          map(
            (user: any) => {
              const message = user[`message`];
              return message === 'payroll number taken' ?
                {
                  payrollNumberRegistered:
                  {
                    value:
                      `${control.value} is registered. Log in if already registered or change the payroll and try again.`
                  }
                } : null;

            }
          )
        );
    }
    return Promise.resolve(null);
  }

}
