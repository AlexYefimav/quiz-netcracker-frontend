import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {MatAccordion} from '@angular/material/expansion';
import {StorageService} from '../service/storage/storage.service';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css', '../app.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  user: User;
  roles: string[] = ['USER', 'ADMIN'];
  isUpdateUser: boolean;
  disable: string;
  authorizedAccount: User;
  @Input() roleControl: AbstractControl;
  @Output() roleControlChange = new EventEmitter<AbstractControl>();
  isLoading = true;

  constructor(private  userService: UserService,
              private router: Router,
              private  storageService: StorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.checkAuthorized() != undefined) {
      if (this.route.snapshot.params.id != undefined) {
        this.isUpdateUser = true;
        this.userService.getUserById(this.route.snapshot.params.id).subscribe(user => {
            this.user = user;
            this.isLoading = false;
          }
        );
      } else {
        this.isUpdateUser = false;
        this.user = new User();
        this.isLoading = false;
      }
    } else {
      this.redirect('403');
    }

  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  checkAuthorized(): User {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
    }
    return this.authorizedAccount;
  }

  isDisable(): string {
    if (this.user.login != null && this.user.login != '' &&
      this.user.mail != null && this.user.mail != '' &&
      this.user.role != null) {
      this.disable = 'false';
    } else {
      this.disable = 'disable';
    }
    return this.disable;
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
    } else {
      this.user.role = null;
    }
    this.roleControlChange.emit(this.roleControl);
  }

}
