import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {User} from "../model/user";
import {SigninService} from "../service/signin.service";
//import {SignInService} from "../service/signin.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User=new User();
  isUpdateUser:boolean;

  constructor(private  signInService: SigninService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  signIn(user: User): void {
    this.signInService.signIn(user).subscribe(user => this.user = user);
  }

}
