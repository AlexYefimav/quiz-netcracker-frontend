import {Injectable} from '@angular/core';

import CryptoJS from "crypto-js";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PASSPHRASE: string;
  private readonly USER: string;
  private readonly TOKEN: string;
  private authorizedAccount: User;

  constructor() {
    this.PASSPHRASE = 'secret';
    this.USER = 'currentUser';
    this.TOKEN = 'currentToken';
  }

  set currentUser(user: User) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(user), this.PASSPHRASE, 256);
    localStorage.setItem(this.USER, encrypted.toString());
  }

  get currentUser(): User {
    if (localStorage[this.USER]) {
      const decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.USER), this.PASSPHRASE, 256);
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }
  }

  set currentToken(token: string) {
    localStorage.setItem(this.TOKEN, JSON.stringify(token));
  }

  get currentToken(): string {
    return JSON.parse(localStorage.getItem(this.TOKEN));
  }
  static isEmpty(): boolean {
    return localStorage.length === 0;
  }

  static clear(): void {
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    // localStorage.clear();
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.currentToken) {
        this.authorizedAccount = this.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
    }
    return this.authorizedAccount;
  }

}
