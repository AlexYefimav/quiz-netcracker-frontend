import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {Client} from '../../model/client';
// import {Account} from '../../model/account';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
//import {StorageService} from '../../service/storage/storage.service';
// import {Organization} from '../../model/organization';
// import {Coach} from '../../model/coach';
// import {RegistrationDto} from '../../model/registration-dto';
// import {ScheduleEnum} from '../../model/schedule.enum';
import {User} from "../model/user";
import {MatAccordion} from "@angular/material/expansion";
import {SigninService} from "../service/signin.service";

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
// export class SignUpComponent implements OnInit {
//
//   get username() {
//     return this.form.get('login');
//   }
//
//   get email() {
//     return this.form.get('email');
//   }
//
//   get phone() {
//     return this.form.get('phone');
//   }
//
//   get password() {
//     return this.form.get('password');
//   }
//
//   get passwordRepeat() {
//     return this.form.get('passwordRepeat');
//   }
//
//   get role() {
//     return this.form.get('role');
//   }
//
//   client: Player;
//   account: User;
//   // coach: Coach;
//   // organization: Organization;
//   //registrationDto: RegistrationDto;
//   form: FormGroup;
//
//   errorMatcher: ErrorStateMatcher;
//   isPasswordsEqual: boolean;
//
//   @Input() error: string | null;
//
//   @Output() submitEM = new EventEmitter();
//
//   constructor(private clientService: UserService,
//               private router: Router,
//               private formBuilder: FormBuilder) {
//
//     this.form = formBuilder.group({
//       username: new FormControl('', [Validators.required, Validators.minLength(3)]),
//       email: new FormControl('', [Validators.required, Validators.email]),
//     ///  phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:80|\(?\+375\)?\s?)[1-99](?:[\-\s]?\d\d){4}$/)]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//       passwordRepeat: new FormControl('', Validators.required),
//     //  role: new FormControl('client')
//     });
//   }
//
//   ngOnInit(): void {
//     this.client = new Player();
//     this.account = new User();
//     // this.coach = new Coach();
//     // this.organization = new Organization();
//     this.errorMatcher = new SignUpErrorStateMatcher();
//    // this.registrationDto = new RegistrationDto();
//   }
//
//   sendData() {
//     this.clientService.signUp(this.account).subscribe(() =>
//       this.redirect('/main'));
//   }
//
//
//   checkPasswords() {
//     this.isPasswordsEqual = this.password.value === this.passwordRepeat.value;
//     if (!this.isPasswordsEqual) {
//       this.error = 'Passwords do not match';
//     } else {
//       this.error = null;
//     }
//     return this.isPasswordsEqual;
//   }
//
//   submit() {
//   //  switch (this.role.value) {
//      // case ScheduleEnum.client.toLowerCase():
//         this.submitClient();
//     //     break;
//     //   case ScheduleEnum.coach.toLowerCase():
//     //     this.submitCoach();
//     //     break;
//     //   case ScheduleEnum.organization.toLowerCase():
//     //     this.submitOrganization();
//     //     break;
//     // }
//   }
//
//   submitClient() {
//     if (this.form.valid) {
//       this.client.name = this.username.value;
//       this.client.email = this.email.value;
//      // this.client.phone = this.phone.value;
//
//       this.account.login = this.username.value;
//       this.account.password = this.password.value;
//       // this.client.account = this.account;
//       //
//       // this.registrationDto.account = this.account;
//       // this.registrationDto.client = this.client;
//
//       this.sendData();
//     }
//   }
//
//   submitCoach() {
//     if (this.form.valid) {
//       // this.coach.name = this.username.value;
//       // this.coach.email = this.email.value;
//       // this.coach.phone = this.phone.value;
//
//       this.account.login = this.username.value;
//       this.account.password = this.password.value;
//       // this.coach.account = this.account;
//       //
//       // this.registrationDto.account = this.account;
//       // this.registrationDto.coach = this.coach;
//
//       this.sendData();
//     }
//   }
//
//   submitOrganization() {
//     if (this.form.valid) {
//       // this.organization.name = this.username.value;
//       // this.organization.email = this.email.value;
//       // this.organization.phone = this.phone.value;
//
//       this.account.login = this.username.value;
//       this.account.password = this.password.value;
//       // this.organization.account = this.account;
//       //
//       // this.registrationDto.account = this.account;
//       // this.registrationDto.organization = this.organization;
//
//       this.sendData();
//     }
//   }
//
//   redirect(url: string) {
//     this.router.navigate([url]);
//   }
//
//   // register(account: User): void {
//   //   user.login = this.username;
//   //   user.mail = this.email;
//   //   user.password = this.password;
//   //   console.log(user.login);
//   //   console.log(user.mail);
//   //   console.log(user.password);
//   //   this.signinService.register(user).subscribe(user => this.user = user);
//   // }
//
// }
export class SignUpComponent implements OnInit {

  get username() {
    return this.form.get('username');
  }

  get mail() {
    return this.form.get('mail');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordRepeat() {
    return this.form.get('passwordRepeat');
  }


  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  //login: string;
//  mail: string;
  // password: string;
  isRegisterUser: boolean;
  form: FormGroup;

  errorMatcher: ErrorStateMatcher;
  isPasswordsEqual: boolean;

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  constructor(private clientService: SigninService,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.form = formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      ///  phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:80|\(?\+375\)?\s?)[1-99](?:[\-\s]?\d\d){4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRepeat: new FormControl('', Validators.required),
      //  role: new FormControl('client')
    });
  }

  // constructor(private signinService: SigninService, private route: ActivatedRoute) {
  //
  // }

  ngOnInit() {
    this.user = new User();
    this.errorMatcher = new SignUpErrorStateMatcher();
  }

  submitPlayer() {
    if (this.form.valid) {
      this.user.username = this.username.value;
      this.user.mail = this.mail.value;
      this.user.password = this.password.value;
      // this.client.account = this.account;
      //
      // this.registrationDto.account = this.account;
      // this.registrationDto.client = this.client;
      console.log("submit");
      this.sendData();
    }
  }


  sendData() {
    this.clientService.register(this.user).subscribe(() =>
      this.redirect('/games'));
  }


  checkPasswords() {
    this.isPasswordsEqual = this.password.value === this.passwordRepeat.value;
    if (!this.isPasswordsEqual) {
      this.error = 'Passwords do not match';
    } else {
      this.error = null;
    }
    return this.isPasswordsEqual;
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

}
