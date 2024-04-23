import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function dobValidator(control: AbstractControl): ValidationErrors | null {
    const eighteenYearsInMillis = 5.67648e11;
    let birthDate = new Date(control.value);
    if (new Date().getTime() - birthDate.getTime() < eighteenYearsInMillis) {
      return { invalidDOB: true };
    }
    return null;
}

// export function dobValidator() : ValidatorFn {
//   const eighteenYearsInMillis = 5.67648e11;
//   console.log("inside")
//   return(control: AbstractControl): ValidationErrors | null => {
//     console.log("inside")
//     if(new Date(control.value).getTime() - new Date().getTime() < eighteenYearsInMillis) {
//       console.log("less")
//       return {inValidDOB:true}
//     }
//     return null
//   }
// }

export function passwordValidator(password: AbstractControl) : ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(password.value, control.value);
    if (password.value != control.value) return {passwordsNotMatched: true}
    return null;
  }
}
