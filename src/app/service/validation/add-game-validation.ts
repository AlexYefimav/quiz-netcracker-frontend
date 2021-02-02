import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddGameValidation {
  constructor(private formBuilder: FormBuilder) {
  }

  createGameForm(): FormGroup {
    return this.formBuilder.group({
      // title: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', []],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
