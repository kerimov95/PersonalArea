import { Injectable, ViewChild } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { login } from '../models/login';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private UtilitiesService: UtilitiesService,
    private router: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let obj = this.UtilitiesService.getValue<login>('token');
    if (obj)
      return true;
    else {
      this.router.navigate(['login'])
    }
  }
}
