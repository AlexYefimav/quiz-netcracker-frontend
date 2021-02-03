import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Answer} from '../../model/answer';
import {Question} from '../../model/question';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DuplicateValidator {

  possibleDuplicateProperties = ['title', 'description', 'login', 'mail'];
  comparingValue: string;
  propertyName: string;

  duplicateValidation(array: any[], entity?: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control) {
        this.setPropertyAndValue(control);
        return this.validate(control, array, entity);
      }
      return null;
    };
  }

  setPropertyAndValue(control: AbstractControl): void {
    this.possibleDuplicateProperties.forEach(property => {
      if (control.get(property)?.dirty) {
        this.comparingValue = control.get(property).value;
        this.propertyName = property;
        control.get(property).markAsPristine({onlySelf: true});
      }
    });
  }

  validate(control: AbstractControl, array: any[], entity?: any):
    ValidationErrors | null {
    if (array) {
      array.forEach(arrayElement => {
        if (arrayElement[this.propertyName] === this.comparingValue) {
          if (entity) {
            if (entity.id !== arrayElement.id) {
              control.get(this.propertyName)?.setErrors({duplicate: true});
              return {duplicate: true};
            }
          }
          else {
            control.get(this.propertyName)?.setErrors({duplicate: true});
            return { duplicate: true };
          }
        }
      });
    }
    return null;
  }

  // areEntitiesEqual(entity: any, element: any): boolean {
  //   if (entity instanceof Answer || entity instanceof Question) {
  //     return entity.equals(element);
  //   }
  // }
}
