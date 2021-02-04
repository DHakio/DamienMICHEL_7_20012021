import { FormGroup } from '@angular/forms';

export function passwordConfirm(input: string, input_confirm: string) {
    return (formGroup: FormGroup) => {
        const password = formGroup.controls[input];
        const password_confirm = formGroup.controls[input_confirm];

        if (password_confirm.errors && !password_confirm.errors.mustMatch) {
            return;
        }

        if (password.value !== password_confirm.value) {
            password_confirm.setErrors({ passwordConfirm: true });
        } else {
            password_confirm.setErrors(null);
        }
    }
}