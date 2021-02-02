import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {UserDuplicateValidator} from './user-duplicate-validator';
import {User} from "../../model/user";
import {DuplicateValidator} from './duplicate-validation';

@Injectable({
  providedIn: 'root'
})
export class SignUpValidation {
  // user: User;
  users: User[];

  constructor(private formBuilder: FormBuilder,
              // private userDuplicateValidator: UserDuplicateValidator,
              private duplicateValidator: DuplicateValidator) {
  }

  // setUser(user: User): void {
  //   this.user = user;
  // }

  setUsers(users: User[]): void {
    this.users = users;
  }

  createUserForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required]]
    }, {validators: this.duplicateValidator.duplicateValidation(this.users)});
  }
}
