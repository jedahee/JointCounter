import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class AppTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string,
    private suffix: string,
  ) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    return this.http.get<TranslationObject>(`${this.prefix}${lang}${this.suffix}`);
  }
}