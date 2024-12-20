import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function priceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[0-9]+(\.[0-9]{1,2})?$/.test(control.value);
    return valid ? null : { invalidPrice: 'Prix invalide. Format: 0.00' };
  };
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/.test(control.value);
    return valid ? null : { invalidDate: 'Date invalide. Format: JJ-MM-AAAA' };
  };
}


