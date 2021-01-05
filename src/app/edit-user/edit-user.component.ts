import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from "../model/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  isUpdateUser:boolean;

  constructor(private  userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit(){
    if(this.route.snapshot.params.id!=null){
      this.isUpdateUser = true;
      this.getUser(this.route.snapshot.params.id);
    } else {
      this.isUpdateUser = false;
      this.user = new User();
    }

  }

  private getUser( userId: string): void {
    this.userService.getUserById( userId).subscribe( user =>
      this.user = user);
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(user => this.user = user);
  }

  createUser(user: User): void {
    console.log(user.login);
    this.userService.createUser(user).subscribe(user => this.user = user);
    console.log(this.user.login);
  }
}
