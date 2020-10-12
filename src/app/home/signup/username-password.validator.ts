import { FormGroup, ValidatorFn } from '@angular/forms';

export const userNamePassword: ValidatorFn = (form: FormGroup) => {
    let userName = form.get('userName').value;
    let password = form.get('password').value;

    if(userName.trim() + password.trim()) {
        return userName != password
            ? null 
            : { userNamePassword: true };
    } else {
        return null;
    }
}