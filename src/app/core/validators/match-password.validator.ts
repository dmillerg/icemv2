import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const password = control.root.get('password');
  const confirmPassword = control.value;

  if (password && confirmPassword !== password.value) {
    return { message: 'Las contraseñas deben coincidir' };
  }

  return null;
}
