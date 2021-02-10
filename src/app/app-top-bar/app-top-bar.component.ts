import {Component, Input, OnInit} from '@angular/core';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {MatDialog} from '@angular/material/dialog';
import {SignInComponent} from '../sign-in/sign-in.component';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';
import {PlayerService} from '../service/player.service';
import {Player} from '../model/player';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  authorizedAccount: User;
  isAccount: boolean;
  @Input() languages;
  currentLanguage: string;
  private player: Player;

  constructor(private router: Router,
              public storageService: StorageService,
              public dialog: MatDialog,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService,
              private playerService: PlayerService) {
    this.isAccount = false;
  }

  openLoginDialog(): void {
    console.log('authorization acc' + this.authorizedAccount);
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
      }, 2000);
    });
  }

  ngOnInit(): void {
    this.currentLanguage = this.localSettingsService.getLanguage();
    if (!this.currentLanguage) {
      this.currentLanguage = 'RU';
      this.localSettingsService.setLanguage('RU');
    }
    this.translateService.use(this.currentLanguage);
    this.checkAuthorized();
  }

  checkAuthorized(): void {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
        this.isAccount = true;
        this.playerService.getPlayerByUserId(this.authorizedAccount.id).subscribe(player => {
          this.player = player;
        });
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
      this.isAccount = false;
    }
  }


  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    StorageService.clear();
    this.authorizedAccount = undefined;
    this.isAccount = false;
    this.redirect('/games');
  }

  toAccount(): void {
    this.redirectTo(`/player/${this.player.id}`);
  }

  changeLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.translateService.use(lang);
    this.localSettingsService.setLanguage(lang);
  }
}
