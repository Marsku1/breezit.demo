import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  public static isEqualFour(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
      return control.value != 4 ? { notFour: true } : null;
    };
	}

  public static noALetterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value.includes('a') || value.includes('A') ? { containsAError: true } : null;
    };
  }
}
