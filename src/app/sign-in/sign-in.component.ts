import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Player} from '../model/player';
import {User} from '../model/user';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  player: Player = new Player();
  user: User = new User();
  form: FormGroup;
  showErrorMessage: boolean;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(private router: Router,
              private userService: UserService,
              private storageService: StorageService,
              public dialogRef: MatDialogRef<SignInComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogAccount: User,
              private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      login: new FormControl('', [Validators.required, Validators.minLength(3),
        loginValidator(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i, /[a-zA-Z0-9]+/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  ngOnInit(): void {
    this.showErrorMessage = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {

      this.login.value.toString().indexOf('@') === -1 ? this.player.login = this.login.value : this.player.email = this.login.value;
      this.user.login = this.login.value;
      this.user.username = this.user.login;
      this.user.password = this.password.value;

      this.userService.signIn(this.user).subscribe(
        response => {
          if (response.headers.get('Authorization') != null) {
            this.user.isAuthenticated = true;
          }
          if (this.user.isAuthenticated == true) {
            this.storageService.currentToken = response.headers.get('Authorization');
          }
          if (!this.user.active) {
            localStorage.removeItem('currentToken');
          }
        }
      );
      this.user.password = undefined;
      this.userService.getUserByLoginOrEmail(this.user.login).subscribe(
        user => {
          this.user = user;
          if (this.user.active) {
            setTimeout(() => {
              if (this.storageService.currentToken) {
                this.storageService.currentUser = this.user;
              }
            }, 2000);
            this.dialogAccount = this.user;
          } else {
            window.alert('Ваш профиль заблокирован');
          }
        }
      );
    }
  }

  redirect(url: string) {
    this.onNoClick();
    this.router.navigate([url]);
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

}

export function loginValidator(emailRegExp: RegExp, nameRegExp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value.toString().indexOf('@') !== -1 ?
      emailRegExp.test(control.value) ? null : {emailError: {value: control.value}}
      : nameRegExp.test(control.value) ? null : {nameError: {value: control.value}};
  };
}
