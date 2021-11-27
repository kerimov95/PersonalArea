import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { user, login } from 'src/app/models/login';
import { AccountService } from '../account.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  public login = new login;
  public confirm: string;

  constructor(
    private modal: ModalController,
    private serv: AccountService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
  }

  public cancel() {
    this.modal.dismiss();
  }

  public get Confirm(): boolean {
    if (this.login.password == this.confirm)
      return true;
    else
      return false;
  }

  public async createAccount() {
    let load = await this.util.presentLoading();
    this.serv.createAccount(this.login)
      .subscribe(data => {
        this.util.presentToast('Вы успешно зарегистрировались')
        this.modal.dismiss({ login: this.login.login, password: this.login.password });
        load.dismiss();
      },
        error => {
          let message: string;
          switch (error.status) {
            case 401:
              message = 'Пользователь с таким логином уже существует';
              break;
            case 403:
              message = 'Номер телефона уже используется';
              break;
            case 400:
              message = 'Не удается отправить код подтверждения. Проверьте номер телефона';
              break;
            case 500:
              message = 'Произошла ошибка';
              break;
          }
          load.dismiss();
          this.util.presentAlert(message);
        })
  }

}
