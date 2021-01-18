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
  disable: string;

  constructor(private  userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit(){
    if(this.route.snapshot.params.id!=undefined){
      this.isUpdateUser = true;
      this.getUser(this.route.snapshot.params.id);
    } else {
      this.isUpdateUser = false;
      this.user = new User();
    }

  }

  isDisable(): string {
    if (this.user.login != null && this.user.login != "" &&
      this.user.mail != null && this.user.mail != "" &&
      this.user.role != null) {
      this.disable = "false";
    } else {
      this.disable = "disable"
    }
    return this.disable;
  }

  private getUser( userId: string): void {
    console.log("get "+userId);
    this.userService.getUserById(userId).subscribe( user =>
    {  console.log(user);
      this.user = user });
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(user => this.user = user);
  }

  createUser(user: User): void {
    console.log(user)
    this.userService.createUser(user).subscribe(user => this.user = user);
  }

}
