import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  authorizedAccount: User;
  isAccount: boolean;

  constructor(private router: Router,
              public storageService: StorageService,
              public dialog: MatDialog) {
    this.isAccount = false;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: this.authorizedAccount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorizedAccount = result;
        this.isAccount = true;
      }
      setTimeout(() => {
        this.checkAuthorized();
        location.reload();
      }, 30000);
    });
  }

  ngOnInit(): void {
    this.checkAuthorized();
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
        this.isAccount = true;
          console.log("check"+ this.storageService.currentUser.role)
        if(this.authorizedAccount.role=="ADMIN")
        {
          this.authorizedAccount.admin_id=this.authorizedAccount.id;
        }
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
      this.isAccount = false;
    }
  }


  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    StorageService.clear();
    this.authorizedAccount = undefined;
    this.isAccount = false;
    this.redirect('/games');
  }

  toAccount() {
    if (this.authorizedAccount.player) {
      console.log("to player");
      this.redirectTo(`/player/${this.authorizedAccount.player}`);
    }
    if (this.authorizedAccount.admin_id) {
      this.redirectTo(`/admin/${this.authorizedAccount.admin_id}`);
    }
  }
}
