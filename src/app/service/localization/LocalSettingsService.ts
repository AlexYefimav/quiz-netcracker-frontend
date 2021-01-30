import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService{

  getLanguage(): string {
    if (localStorage.lang) {
      return JSON.parse(localStorage.lang);
    }
    else {
      return '';
    }
  }

  setLanguage(language: string): void {
    localStorage.setItem('lang', JSON.stringify(language));
  }
}
