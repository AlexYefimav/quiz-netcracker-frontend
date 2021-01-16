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
  // private readonly LANG_KEY: string;

  constructor() {
    this.PASSPHRASE = 'secret';
    this.USER_KEY = 'currentUser';
    this.TOKEN_KEY = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MyIsImV4cCI6MTYxMTA5MDAwMH0.Cqd556LRhcVwZcXb6Oz23cFDv-AQ8ppNn6OZiXHsMQJImt6bmVdJtwo52dT38u81Ju_VkAjVu76PueW3ScQ';
    // this.LANG_KEY = 'currentLang';
  }

  set currentUser(account: User) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(account), this.PASSPHRASE, 256);
    localStorage.setItem(this.USER_KEY, encrypted.toString());
  }

  get currentUser(): User {
    console.log(this.USER_KEY);
    // if (localStorage.getItem(this.USER_KEY).match(null)) {
    //   return null;
    // }
    const decrypted = CryptoJS.AES.decrypt(localStorage.getItem(this.USER_KEY), this.PASSPHRASE, 256);
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  set currentToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  get currentToken(): string {
    // console.log('current yoken null');
    // if (localStorage.getItem(this.TOKEN_KEY).match(null)) {
    //   return null;
    // }
    console.log('current yoken parse');
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }


  static isEmpty(): boolean {
    return localStorage.length === 0;
  }

  static clear(): void {
    localStorage.clear();
  }
}
