import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in/sign-in.component";
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.css']
})
export class AppTopBarComponent implements OnInit {
  authorizedAccount: User;
  isAccount: boolean;
  @Input() languages;
  @Output() languageChange = new EventEmitter<string>();
  currentLanguage: string;

  constructor(private router: Router,
              public storageService: StorageService,
              public dialog: MatDialog,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService) {
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
      }, 2000);
    });
  }

  ngOnInit(): void {
    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    this.checkAuthorized();
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
        this.isAccount = true;
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
    if (this.authorizedAccount.role=='USER') {
      this.redirectTo(`/player/${this.authorizedAccount.player}`);
    }
    if (this.authorizedAccount.role=='ADMIN') {
      this.redirectTo(`/admin/${this.authorizedAccount.id}`);
    }
  }

  changeLanguage(lang: string): void {
    this.languageChange.emit(lang);
  }
}
