import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    /* static match(group: AbstractControl): ValidationErrors | null {
        const control = group.get('password')
        const matchingControl = group.get('confirm_password')
        if(!control || !matchingControl) {
            return { controlNotFound: false }
        }
        const error = control.value === matchingControl.value ? 
            null : { noMatch: true }
        return error
    } */
    /* Re-written as a Factory function */
    static match(controlName: string, matchingControlName: string) : ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(controlName)
            const matchingControl = group.get(matchingControlName)
            if(!control || !matchingControl) {
                console.error('Form controls cannot be found in the form group.')
                return { controlNotFound: false }
            }
            const error = control.value === matchingControl.value ? 
                null : { noMatch: true }
            matchingControl.setErrors(error)
            return error
            }
    }
}
