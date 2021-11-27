import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { account, provider } from 'src/app/models/account';
import { tap } from 'rxjs/operators';
import { paymentQiwi, QiwiResponse } from 'src/app/models/paymentQiwi';

@Injectable({
  providedIn: 'root'
})
export class PersonalAccoutnService {

  public accounts: account[];
  public providers: provider[];

  constructor(
    private http: HttpClient
  ) { }

  public getAccounts(): Observable<account[]> {
    return this.http.get<account[]>('PersonalAccount')
      .pipe(tap(data => {
        this.accounts = data
      }));
  }

  public getProviders(): Observable<provider[]> {
    return this.http.get<provider[]>('provider')
      .pipe(tap(data => {
        this.providers = data;
      }));
  }

  public addAccount(account: account): Observable<any> {
    return this.http.post('PersonalAccount', account)
      .pipe(tap(data => {
        this.accounts.push(data)
      }));
  }

  public dalete(id: number): Observable<any> {
    return this.http.delete('PersonalAccount/' + id)
      .pipe(tap(_ => {
        this.accounts = this.accounts.filter(r => r.id != id)
      }));
  }

}
