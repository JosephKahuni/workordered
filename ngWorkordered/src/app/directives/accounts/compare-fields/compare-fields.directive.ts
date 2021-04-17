import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

// compare phone numbers
@Directive({
  selector: '[appComparePhoneNumbers]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ComparePhoneNumbersDirective,
    multi: true
  }]
})
export class ComparePhoneNumbersDirective implements Validator {
  @Input('comparePhoneWith') primary!: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0 || control.value === null) {
      return null;
    }
    const primaryPhone = control.root.get(this.primary);
    const primary = primaryPhone?.value;
    const secondary = control.value;

    if (primaryPhone) {
      // tslint:disable-next-line: deprecation
      const subscription: Subscription = primaryPhone.valueChanges.subscribe(
        () => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
    }

    return primaryPhone && primary === secondary ? {
      phoneNumbersMatch: {
        value:
          `Primary number ${primary} matches with alternative ${secondary}. Please change one of them.`
      }
    } : null;
  }

}

// compare passwords
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[appComparePasswords]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ComparePasswordsDirective,
    multi: true
  }]
})
export class ComparePasswordsDirective implements Validator {
  @Input('comparePasswordWith') primary!: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0 || control.value === null) {
      return null;
    }
    const firstPassword = control.root.get(this.primary);
    const primary = firstPassword?.value;
    const secondary = control.value;

    if (firstPassword) {
      // tslint:disable-next-line: deprecation
      const subscription: Subscription = firstPassword.valueChanges.subscribe(
        () => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
    }

    return firstPassword && primary !== secondary ? {
      passwordsMismatch: {
        value:
          `Passwords do not match.`
      }
    } : null;
  }

}
