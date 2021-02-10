import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {Player} from '../model/player';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {ErrorStateMatcher} from '@angular/material/core';
import {SigninService} from '../service/signin.service';
import {SignUpValidation} from '../service/validation/sign-up-validator';
import {SignUpErrorStateMatcher} from '../sign-up/sign-up.component';
import {PlayerService} from '../service/player.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './sign-in-once.component.html',
  styleUrls: ['./sign-in-once.component.css']
})
export class SignInOnceComponent implements OnInit {

  get username() {
    return this.form.get('username');
  }

  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: Player;
  form: FormGroup;
  userForm: FormGroup;

  errorMatcher: ErrorStateMatcher;
  isPasswordsEqual: boolean;
  isUserFromDB: boolean;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(private signinService: SigninService,
              private playerService: PlayerService,
              private storageService: StorageService,
              private router: Router,
              private formBuilder: FormBuilder,
              private signUpValidation: SignUpValidation,
              private userService: UserService) {

    this.form = formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.user = new Player();
    this.errorMatcher = new SignUpErrorStateMatcher();
    // this.signUpValidation.setUser(this.user);
    this.userForm = this.signUpValidation.createUserForm();
  }

  submitPlayer() {
    if (this.form.valid) {
      this.user.username = this.username.value;
      //  this.user.name = this.username.value;
      this.sendData();
    }
  }

  sendData() {
    this.signinService.registerOnce(this.user).subscribe(() => {
      }
    );
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }
}
