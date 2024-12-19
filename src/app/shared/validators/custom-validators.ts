// src/app/shared/validators/custom-validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function zipCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[0-9]{5}$/.test(control.value);
    return valid ? null : { invalidZipCode: 'Code postal invalide. Minimum 5 chiffres.' };
  };
}

export function lettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[\p{L}\s]+$/u.test(control.value);
    return valid ? null : { invalidName: 'Champ invalide. Uniquement les lettres et les espaces sont acceptés.' };
  };
}

export function streetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[a-zA-Z0-9\s]+$/.test(control.value);
    return valid ? null : { invalidStreet: 'Champ invalide. Lettres, Chiffre, Espace sont seulement acceptés.' };
  };
}

