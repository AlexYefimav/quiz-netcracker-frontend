import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../model/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {MatAccordion} from '@angular/material/expansion';
import {StorageService} from "../service/storage/storage.service";
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  roles: string[] = ["USER", "ADMIN"];
  isUpdateUser:boolean;
  disable: string;
  authorizedAccount: User;
  @Input() roleControl: AbstractControl;
  @Output() roleControlChange = new EventEmitter<AbstractControl>();

  constructor(private  userService: UserService,
              private  storageService: StorageService,
              private route: ActivatedRoute) {

  }

  ngOnInit(){
    this.checkAuthorized();
    if(this.route.snapshot.params.id!=undefined){
      this.isUpdateUser = true;
      this.getUser(this.route.snapshot.params.id);
    } else {
      this.isUpdateUser = false;
      this.user = new User();
    }

  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
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
    this.userService.getUserById(userId).subscribe( user =>
    {
      this.user = user
    }
    );
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(user => this.user = user);
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe(user => this.user = user);
  }

  getRole(): string {
    for (const role of this.roles) {
      if (this.roleControl.value === role) {
        this.user.role = role;
        return role;
      }
    }
  }

  checkForm(): void {
    if (this.roleControl.valid) {
      this.user.role = this.getRole();
    }
    else {
      this.user.role = null;
    }
    this.roleControlChange.emit(this.roleControl);
  }

}
