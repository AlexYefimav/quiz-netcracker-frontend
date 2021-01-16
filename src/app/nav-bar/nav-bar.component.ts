import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from '../sign-in/sign-in.component';
import {User} from "../model/user";
//import {OfferComponent} from '../offer/offer.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authorizedAccount: User;
  isAccount: boolean;

  constructor(private router: Router,
              private clientService: UserService,
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
      }, 3000);
    });
  }

  ngOnInit(): void {
    this.checkAuthorized();
  }

  checkAuthorized() {
    // console.log("check");
    // if (!StorageService.isEmpty()) {
    //   console.log("check 1");
    //   if (this.storageService.currentToken) {
    //     console.log("check 2");
        this.authorizedAccount = this.storageService.currentUser;
        this.isAccount = true;
    //   } else { StorageService.clear();
    //     console.log("check 3");}
    // } else {
    //   console.log("check 4");
    //   this.authorizedAccount = undefined;
    //   this.isAccount = false;
    // }
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
    this.redirect('/main');
  }

  toAccount() {
    if (this.authorizedAccount.player_id) {
      this.redirectTo(`/users/${this.authorizedAccount.player_id}`);
    }
    if (this.authorizedAccount.manager_id) {
      this.redirectTo(`/users/${this.authorizedAccount.manager_id}`);
    }
    if (this.authorizedAccount.admin_id) {
      this.redirectTo(`/users/${this.authorizedAccount.admin_id}`);
    }
  }

}
