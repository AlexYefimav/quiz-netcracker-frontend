// import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
// import {Injectable} from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserDuplicateValidator {
//
//   duplicateValidation(array: any[]): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       if (control) {
//         let comparingValue;
//         let propertyName;
//         if (control.get('login')?.touched || control.get('login')?.dirty) {
//           comparingValue = control.get('login')?.value;
//           propertyName = 'login';
//         }
//         if (control.get('mail')?.touched || control.get('mail')?.dirty) {
//           comparingValue = control.get('mail')?.value;
//           propertyName = 'mail';
//         }
//         return this.validate(control, array, comparingValue, propertyName);
//       }
//       return null;
//     };
//   }
//
//   validate(control: AbstractControl, array: any[], comparingValue: string, propertyName: string):
//     ValidationErrors | null {
//     if (array) {
//       // console.log(array);
//       array.forEach(arrayElement => {
//         // console.log('comparingValue: ' + comparingValue);
//         // console.log('arrayElement[propertyName]:' + arrayElement[propertyName]);
//         if (arrayElement[propertyName] === comparingValue) {
//           control.get(propertyName)?.setErrors({duplicate: true});
//           return { duplicate: true };
//         }
//       });
//     }
//     return null;
//   }
// }
