import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Answer} from '../../model/answer';
import {Question} from '../../model/question';

@Injectable({
  providedIn: 'root'
})
export class DuplicateValidator {

  duplicateValidation(array: any[], entity?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control) {
        let comparingValue;
        let propertyName;
        if (control.get('title')?.touched || control.get('title')?.dirty) {
          comparingValue = control.get('title')?.value;
          propertyName = 'title';
        }
        if (control.get('description')?.touched || control.get('description')?.dirty) {
          comparingValue = control.get('description')?.value;
          propertyName = 'description';
        }
        return this.validate(control, array, comparingValue, propertyName, entity);
      }
      return null;
    };
  }

  validate(control: AbstractControl, array: any[], comparingValue: string, propertyName: string, entity?: any):
    ValidationErrors | null {
    if (array) {
      // if (entity && entity.id == null) {
      //   return this.validateWithEntity(control, array, comparingValue, propertyName, entity);
      // }
      if (entity) {
        return this.validateWithEntity(control, array, comparingValue, propertyName, entity);
      }
      else {
        return this.validateWithoutEntity(control, array, comparingValue, propertyName);
      }
    }
  }

  validateWithEntity(control: AbstractControl, array: any[], comparingValue: string, propertyName: string, entity?: any): ValidationErrors | null {
    array.forEach(element => {
      // if ((element[propertyName] === comparingValue && entity.id !== element.id) ||
      //     (element[propertyName] === comparingValue && !this.areEntitiesEqual(entity, element))) {
      //   control.get(propertyName)?.setErrors({duplicate: true});
      //   return { duplicate: true };
      // }
      if (element[propertyName] === comparingValue && entity.id !== element.id) {
        control.get(propertyName)?.setErrors({duplicate: true});
        return { duplicate: true };
      }
    });
    return null;
  }

  validateWithoutEntity(control: AbstractControl, array: any[], comparingValue: string, propertyName: string): ValidationErrors | null {
    array.forEach(element => {
      if (element[propertyName] === comparingValue) {
        control.get(propertyName)?.setErrors({duplicate: true});
        return { duplicate: true };
      }
    });
    return null;
  }

  // areEntitiesEqual(entity: any, element: any): boolean {
  //   if (entity instanceof Answer || entity instanceof Question) {
  //     return entity.equals(element);
  //   }
  // }
}
