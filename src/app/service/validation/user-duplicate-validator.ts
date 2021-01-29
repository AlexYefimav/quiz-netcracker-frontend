import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDuplicateValidator {

  duplicateValidation(array: any[], entity?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control) {
        let comparingValue;
        let propertyName;
        if (control.get('login')?.touched || control.get('login')?.dirty) {
          comparingValue = control.get('login')?.value;
          propertyName = 'login';
        }
        if (control.get('mail')?.touched || control.get('mail')?.dirty) {
          comparingValue = control.get('mail')?.value;
          propertyName = 'mail';
        }
        return this.validate(control, array, comparingValue, propertyName, entity);
      }
      return null;
    };
  }

  validate(control: AbstractControl, array: any[], comparingValue: string, propertyName: string, entity?: any):
    ValidationErrors | null {
    if (array) {
      array.forEach(arrayElement => {
        if (arrayElement[propertyName] === comparingValue) {
          if (entity) {
            if (entity.id !== arrayElement.id) {
              control.get(propertyName)?.setErrors({duplicate: true});
              return {duplicate: true};
            }
          }
          else {
            control.get(propertyName)?.setErrors({duplicate: true});
            return { duplicate: true };
          }
        }
      });
    }
    return null;
  }
}
