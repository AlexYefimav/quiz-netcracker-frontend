import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Answer} from '../../model/answer';
import {Question} from '../../model/question';
import {element} from 'protractor';
import {EMPTY} from 'rxjs';

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
      return EMPTY;
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
            if ((entity.id && entity.id !== arrayElement.id) || (entity.temporaryIndex && entity.temporaryIndex !== arrayElement.temporaryIndex)) {
              control.get(this.propertyName)?.setErrors({duplicate: true});
              this.comparingValue = '';
              this.propertyName = '';
              return {duplicate: true};
            }
          }
          else {
            control.get(this.propertyName)?.setErrors({duplicate: true});
            this.comparingValue = '';
            this.propertyName = '';
            return {duplicate: true};
          }
        }
      });
    }
    return EMPTY;
  }
}
