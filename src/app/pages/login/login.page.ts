import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { CreateAccountPage } from './create-account/create-account.page';
import { AccountService } from './account.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { PushNotifications } = Plugins;
import { FCM } from 'capacitor-fcm';
import { ReplacepasswordPage } from './replacepassword/replacepassword.page';
const fcm = new FCM();


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public login: string;
  public password: string;

  constructor(
    private router: Router,
    private modalCtl: ModalController,
    private serv: AccountService,
    private util: UtilitiesService,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngOnInit() {
  }

  public async replacePassword() {
    const modal = await this.modalCtl.create({
      component: ReplacepasswordPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
  }

  public async createAccount() {
    const modal = await this.modalCtl.create({
      component: CreateAccountPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.login = data.login;
      this.password = data.password;
    }
  }

  public async inLogin() {
    let load = await this.util.presentLoading();
    this.serv.inLogin(this.login, this.password)
      .subscribe(async _ => {
        load.dismiss();
        PushNotifications.addListener('registration', data => { });
        PushNotifications.requestPermission().then(result => {
          if (result.granted) {
            PushNotifications.register()
              .then(_ => {
                fcm.subscribeTo({ topic: 'news' });
                fcm.subscribeTo({ topic: this.login });
              })
              .catch(err => alert(JSON.stringify(err)));
          }
        });
        this.router.navigate(['main']);
      }, error => {
        load.dismiss();
        if (error.status == 401)
          this.util.presentAlert('Неверный логин или пароль')
        else if (error.status == 403)
          this.confirmLogin()
      });
  }

  async confirmLogin() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Введите код подтверждения',
      inputs: [{
        name: 'code',
        placeholder: 'Код подтверждения'
      }],
      buttons: [{
        text: "Ok",
        handler: (async res => {
          this.serv.confirm(this.login, this.password, res.code)
            .subscribe(_ => { this.inLogin() }, _ => this.util.presentAlert('Неверный код'))
        })
      }]
    });
    await alert.present();
  }
}
