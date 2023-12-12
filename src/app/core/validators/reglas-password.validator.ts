import { AbstractControl } from '@angular/forms';

export function reglasPasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const regex = /^(?=.*\W)(?=.*\d).+/;
console.log(regex.test(control.value));
console.log(control.value);

  if (!regex.test(control.value)) {
    return {
      message:
        'La contraseña debe contener números y al menos un caracter extraño.',
    };
  }

  return null;
}
