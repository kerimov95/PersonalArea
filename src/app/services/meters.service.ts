import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { meter, ph } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class MetersService {

  constructor(
    private http: HttpClient
  ) { }

  public getMeters(provider: number, id: number): Observable<meter[]> {
    return this.http.get<meter[]>('PersonalAccount/getmeters?providerid=' + provider + '&id=' + id)
  }

  public getPh(provider: number, id: number): Observable<ph[]> {
    return this.http.get<ph[]>('PersonalAccount/getph?providerid=' + provider + '&id=' + id)
  }

  public setPh(provider: number, id: number, con: number): Observable<any> {
    return this.http.get<ph>('PersonalAccount/setph?providerid=' + provider + '&id=' + id + '&con=' + con)
  }
}
