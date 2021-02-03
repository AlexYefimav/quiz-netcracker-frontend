import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';


@Component({
  selector: 'app-error-authentication-connection',
  templateUrl: './error-authentication-connection.component.html',
  styleUrls: ['./error-authentication-connection.component.css']
})
export class ErrorAuthenticationConnectionComponent implements OnInit{

  constructor(private translateService: TranslateService,
              private localSettingsService: LocalSettingsService) {
  }

  ngOnInit(): void {
    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
  }
}
