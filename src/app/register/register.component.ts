import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {User} from "../model/user";
import {SigninService} from "../service/signin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  login: string;
  mail: string;
  password: string;
  isRegisterUser:boolean;

  constructor(private  signinService: SigninService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.user = new User();
  }
  register(user: User): void {
    user.login = this.login;
    user.mail = this.mail;
    user.password = this.password;
    console.log(user.login);
    console.log(user.mail);
    console.log(user.password);
    this.signinService.register(user).subscribe(user => this.user = user);
  }

}
