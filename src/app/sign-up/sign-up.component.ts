import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../model/user';
import {MatAccordion} from '@angular/material/expansion';
import {SigninService} from '../service/signin.service';
import {SignUpValidation} from '../service/validation/sign-up-validator';
import {UserService} from '../service/user.service';

export class SignUpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../app.component.css']
})

export class SignUpComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  form: FormGroup;
  userForm: FormGroup;

  errorMatcher: ErrorStateMatcher;
  isPasswordsEqual: boolean;

  existingUsers: User[];
  isLinear = false;
  firstFormGroup: FormGroup;
  text: string = "Пройдите предыдущие шаги регистрации!";
  isLoading = true;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(private signinService: SigninService,
              private router: Router,
              private formBuilder: FormBuilder,
              private signUpValidation: SignUpValidation,
              private userService: UserService,
              private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(existingUsers => {
      this.existingUsers = existingUsers;
      if (this.existingUsers) {
        this.signUpValidation.setUsers(this.existingUsers);
        this.userForm = this.signUpValidation.createUserForm();
      }
      this.user = new User();
      this.errorMatcher = new SignUpErrorStateMatcher();
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.isLoading = false;
    });
  }

  getLogin() {
    return this.userForm?.get('login').value;
  }

  getEmail() {
    return this.userForm?.get('email').value;
  }

  getPassword() {
    return this.userForm?.get('password').value;
  }

  getPasswordRepeat() {
    return this.userForm?.get('passwordRepeat').value;
  }

  submitPlayer() {
    if (this.userForm.valid) {
      this.user.login = this.getLogin()
      this.user.username=this.user.login;
      this.user.email = this.getEmail()
      this.user.password = this.getPassword()
      this.sendData();
    }
  }

  async sendData() {
    this.user = await this.signinService.register(this.user).toPromise();
  }

  checkPasswords() {
    this.isPasswordsEqual = this.getPassword() === this.getPasswordRepeat();
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

  setText() {
    this.text = "На ваш email было отправлено сообщение!"
  }
}
