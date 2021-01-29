import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDuplicateValidator} from './user-duplicate-validator';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class SignUpValidation {
  user: User;

  constructor(private formBuilder: FormBuilder,
              private userDuplicateValidator: UserDuplicateValidator) {
  }

  setUser(user: User): void {
    this.user = user;
  }

  createUserForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', [Validators.required]],
      mail: ['', [Validators.required]]
    }, {validators: this.userDuplicateValidator.duplicateValidation(this.user?.usersSet)});
  }
}
