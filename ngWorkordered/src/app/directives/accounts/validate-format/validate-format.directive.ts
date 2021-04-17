import { environment } from '@environments/environment';
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

// validate the names
@Directive({
  selector: '[appValidateNameFormat]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateNameFormatDirective,
    multi: true
  }]
})
export class ValidateNameFormatDirective implements Validator {
  // validation errors = {[key: string]: any}
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0 || control.value.length < 3) {
      return null;
    }
    const name = control.value;
    const regex = new RegExp(environment.nameFormat);
    const valid = regex.test(name);
    return !valid ? { invalidFormat: { value: `${name} is invalid. Only letters and ' are allowed.` } } : null;
  }
}

// validate the payroll number
@Directive({
  selector: '[appValidatePayrollFormat]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePayrollFormatDirective,
    multi: true
  }]
})
export class ValidatePayrollFormatDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {

    if (control.value.length === 0 || control.value.length < 2 || control.value.length > 9) {
      return null;
    }
    const payrollNumber = control.value;
    const regex = new RegExp(environment.payrollFormat);
    const valid = regex.test(payrollNumber);
    return !valid ? {
      invalidFormat:
      {
        value:
          `${payrollNumber} is invalid. Use the format cas 12345 or 12345.`
      }
    } : null;

  }
}

// validate phone number
@Directive({
  selector: '[appValidatePhoneFormat]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePhoneFormatDirective,
    multi: true
  }]
})
export class ValidatePhoneFormatDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control.value.length === 0) {
      return null;
    }
    const phoneNumber = control.value;
    const regex = new RegExp(environment.phoneFormat);
    const valid = regex.test(phoneNumber);
    return !valid ? { invalidFormat: { value: `${phoneNumber} is invalid. Use the format 07xx xxx xxx OR 01xx xxx xxx` } } : null;
  }
}

// validate the username
@Directive({
  selector: '[appValidateUsernameFormat]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateUsernameFormatDirective,
    multi: true
  }]
})
export class ValidateUsernameFormatDirective implements Validator {
  // @Input('validUsernameFormat') userNameFormat!: string;

  // validation formats
  // validation errors = {[key: string]: any}
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0 || control.value === null || control.value === undefined) {
      return null;
    }
    const name = control.value;
    const regex = new RegExp(environment.usernameFormat);
    const valid = regex.test(name);
    return !valid ? {
      invalidFormat:
      {
        value:
          `${name} is invalid. Only letters and ' are allowed for Username and cas 12345 or 12345 for Payroll Number.`
      }
    } : null;
  }
}

