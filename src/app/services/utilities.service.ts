import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  public setValue<T>(object: storege<T>) {
    localStorage.setItem(object.key, JSON.stringify(object))
  }

  public getValue<T>(key: string): storege<T> {
    return JSON.parse(localStorage.getItem(key));
  }

  public async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Уведомление',
      message: message,
      buttons: ['OK'],
      backdropDismiss: false
    });
    await alert.present();
  }

  public async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    return loading;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}

export class storege<T> {
  key: string;
  value: T;
}
