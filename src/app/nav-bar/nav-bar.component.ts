import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';
import {StorageService} from '../service/storage/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from '../sign-in/sign-in.component';
import {User} from "../model/user";
import {PlayerService} from "../service/player.service";
//import {OfferComponent} from '../offer/offer.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  authorizedAccount: User;
  isAccount: boolean;
//  userService: UserService;

  constructor(private router: Router,
              public storageService: StorageService,
              public userService: UserService,
              public playerService: PlayerService,
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
        //this.authorizedAccount.role=this.authorizedAccount.role;
       // console.log("Для полли: "+this.authorizedAccount.id);
        this.userService.getUserById(this.storageService.currentUser.id).subscribe(
          account => {
           if (account.role=="USER") {
             this.authorizedAccount.player_id = account.id;
            }
            if (account.role=="ADMIN") {
              this.authorizedAccount.admin_id = account.id;
            }
      })
        this.isAccount = true;
       } else {
        StorageService.clear();
        }
    } else{
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
    this.redirect('');
  }

  toAccount() {
    this.authorizedAccount = this.storageService.currentUser;
    this.playerService.getUserByPlayerId(this.storageService.currentUser.id).subscribe(
      account => {
        console.log("Для меня: "+account.id+account.name);
      //   if (account.role=="USER") {
      //     this.authorizedAccount.player_id = account.id;
      //   }
      //   if (account.role=="ADMIN") {
      //     this.authorizedAccount.admin_id = account.id;
      //   }
       }
      )
    console.log("to account" + this.authorizedAccount.role+this.authorizedAccount.player_id);
    if (this.authorizedAccount.player_id) {
      console.log("to player");
      this.redirectTo(`/users/${this.authorizedAccount.player_id}`);
    }
    if (this.authorizedAccount.admin_id) {
      console.log("to admin");
      this.redirectTo(`/admin/${this.authorizedAccount.admin_id}`);
    }
  }

}
