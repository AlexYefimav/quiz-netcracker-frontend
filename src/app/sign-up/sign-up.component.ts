import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from "../model/user";
import {MatAccordion} from "@angular/material/expansion";
import {SigninService} from "../service/signin.service";
import {AddAnswerValidation} from "../service/validation/add-answer-validation.service";
import {SignUpValidation} from "../service/validation/sign-up-validator";
import {UserService} from "../service/user.service";
import {MatSnackBar} from '@angular/material/snack-bar';

export class SignUpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  get login() {
    return this.userForm.get('login');
  }

  get mail() {
    return this.userForm.get('mail');
  }

  get password() {
    return this.userForm.get('password');
  }

  get passwordRepeat() {
    return this.userForm.get('passwordRepeat');
  }


  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  // userCheck: User;
  form: FormGroup;
  userForm: FormGroup;

  errorMatcher: ErrorStateMatcher;
  isPasswordsEqual: boolean;
  // isUserFromDB: boolean;

  existingUsers: User[];

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(private signinService: SigninService,
              private router: Router,
              private formBuilder: FormBuilder,
              private signUpValidation: SignUpValidation,
              private userService: UserService) {

    // this.form = formBuilder.group({
    //   username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    //   mail: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //   passwordRepeat: new FormControl('', Validators.required),
    // });
  }

  async ngOnInit(): Promise<void> {
    this.existingUsers = await this.getUsers();
    if (this.existingUsers) {
      this.signUpValidation.setUsers(this.existingUsers);
      this.userForm = this.signUpValidation.createUserForm();
    }
    this.user = new User();
    this.errorMatcher = new SignUpErrorStateMatcher();
    // this.signUpValidation.setUser(this.user);
    // this.userForm = this.signUpValidation.createUserForm();
  }

  async getUsers(): Promise<User[]> {
    return this.userService.getUsers().toPromise();
  }

  submitPlayer() {
    if (this.userForm.valid) {
      this.user.username = this.login.value;
      this.user.mail = this.mail.value;
      this.user.password = this.password.value;
      this.sendData();
      // this.checkUsersFromDB();
    }
  }

  sendData() {
    this.signinService.register(this.user).subscribe(() => {
          this.redirect('/games')
      }
    );
  }

  // checkUsersFromDB() {
  //   this.userService.checkUserByLoginOrEmail(this.user.username).subscribe(
  //     user => {
  //       this.userCheck = user;
  //       this.isUserFromDB = this.userCheck== null;
  //       const snackbarAction = 'Закрыть';
  //       if (!this.isUserFromDB) {
  //         this.snackBar.open('Пользователь с таким именем/почтой уже существует', snackbarAction, {
  //           panelClass: ['snackbar']
  //         });
  //       } else {
  //         this.sendData();
  //         this.snackBar.open('Регистрация прошла успешно', snackbarAction, {
  //           panelClass: ['snackbar']
  //         });
  //       }
  //     }
  //    );
  // }

  checkPasswords() {
    this.isPasswordsEqual = this.password.value === this.passwordRepeat.value;
    if (!this.isPasswordsEqual) {
      this.error = 'Пароли не совпадают';
    } else {
      this.error = null;
    }
    return this.isPasswordsEqual;
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
