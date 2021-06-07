import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new Subject<any>();
  constructor() { }

  setLanguage(language: string) {
    this.languageSubject.next(language);
  }

  getLanguageSetting(): Observable<any> {
    return this.languageSubject.asObservable();
  }
}
