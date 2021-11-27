import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { user } from '../models/login';
import { Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService implements HttpInterceptor {

  private request: any;
  //private url: string = "http://localhost:5004/api/";
  private url: string = "https://onlinestore.itdevsoft.ru:444/api/"

  constructor(
    private router: Router,
    private util: UtilitiesService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.request = req.clone({
      url: this.url + req.url
    })

    let value = this.util.getValue<user>('token');
    if (value)
      this.request = this.request.clone({
        headers: req.headers.set('Authorization', value.value.access_token)
      })

    return next.handle(this.request)
      .pipe(tap(_ => _, error => {
        if (error.status == 401 || error.status == 403) {
          localStorage.removeItem('token');
        }
      }))
  }
}
