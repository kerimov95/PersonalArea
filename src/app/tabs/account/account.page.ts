import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/login';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  private login: user;

  constructor(
    private ustil: UtilitiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.login = this.ustil.getValue<user>('token').value;
  }

  public async logOut() {
    if (this.login)
      //this.fcm.unsubscribeFromTopic(this.login.username);
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
