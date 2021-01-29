import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from './service/localization/LocalSettingsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-netcracker-frontend';
  currentLanguage: string;
  languages = [];

  constructor(public translateService: TranslateService,
              private localSettingsService: LocalSettingsService) {
    this.translateService.stream('BUTTON.LANG').subscribe(value => {
      this.languages = value;
    });
  }

  setLanguage(lang: string): void {
    this.translateService.use(lang);
    this.localSettingsService.setLanguage(lang);
  }
}
