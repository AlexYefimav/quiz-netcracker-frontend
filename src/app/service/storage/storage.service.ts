import {Injectable} from '@angular/core';

import CryptoJS from "crypto-js";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly PASSPHRASE: string;
  private readonly USER_KEY: string;
  private readonly TOKEN_KEY: string;

  constructor() {
    this.PASSPHRASE = 'secret';
    this.USER_KEY = 'currentUser';
    this.TOKEN_KEY = 'currentToken';
  }

  set currentUser(account: User) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(account), this.PASSPHRASE, 256);
    localStorage.setItem(this.USER_KEY, encrypted.toString());
  }

  get currentUser(): User {
    if (localStorage.getItem(this.USER_KEY)) {
      return null;
    }
  const decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.USER_KEY), this.PASSPHRASE, 256);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  set currentToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  get currentToken(): string {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }
  static isEmpty(): boolean {
    return localStorage.length === 0;
  }

  static clear(): void {
    localStorage.clear();
  }
}
