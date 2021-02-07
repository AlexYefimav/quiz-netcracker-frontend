import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Event, Router, NavigationStart, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-netcracker-frontend';
  currentLanguage: string;
  languages = [];
  showLoadingIndicator = true;

  constructor(public translateService: TranslateService,
              private _route: Router) {
    this.translateService.stream('BUTTON.LANG').subscribe(value => {
      this.languages = value;
    });
  }
}
