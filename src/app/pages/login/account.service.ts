import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { login } from 'src/app/models/login';
import { NgStyle } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor(
    private http: HttpClient,
    private util: UtilitiesService
  ) { }

  public inLogin(login: string, password: string): Observable<any> {
    return this.http.post('account/inlogin', { login: login, password: password })
      .pipe(tap((data: login) => {
        this.util.setValue<login>({ key: 'token', value: data })
      }));
  }

  public confirm(login: string, password: string, code: string): Observable<any> {
    return this.http.post('account/confirm', { login: login, password: password, code: code });
  }

  public createAccount(login: login): Observable<any> {
    return this.http.post('account/createaccount', login);
  }
}
