import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class I18nServiceService {
  localeEvent = new Subject<string>();

  constructor(private translate: TranslateService) {
    this.translate.use('en');
  }

  changeLocale(locale: string) {
    this.translate.use(locale);
  }
}
