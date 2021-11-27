import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { accountDetail, accruals, payment, report } from '../models/account';
import { paymentQiwi, QiwiResponse } from '../models/paymentQiwi';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailService {

  public update = new Subject<void>();
  public paymets: payment[]

  constructor(
    private http: HttpClient
  ) { }

  public detailAccount(id: number, lic: string): Observable<accountDetail> {
    return this.http.get<accountDetail>('PersonalAccount/accountdetail?lic=' + lic + '&&id=' + id)
  }

  public getPaymnets(provider: number, id: number): Observable<payment[]> {
    return this.http.get<payment[]>('PersonalAccount/getpayments?providerid=' + provider + '&id=' + id)
      .pipe(tap(data => this.paymets = data));
  }

  public getAccruals(provider: number, id: number): Observable<accruals[]> {
    return this.http.get<accruals[]>('PersonalAccount/getaccruals?providerid=' + provider + '&id=' + id)
  }

  public sendReport(report: report): Observable<any> {
    return this.http.post('PersonalAccount/sendreport', report)
  }

  public createPayment(payment: paymentQiwi): Observable<QiwiResponse> {
    return this.http.post<QiwiResponse>('payment/create', payment)
  }
}
