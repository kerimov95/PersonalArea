import { Component, OnInit } from '@angular/core';
import { AccountDetailService } from 'src/app/services/account-detail.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { CreatePaymentPage } from './create-payment/create-payment.page';
import { ModalController } from '@ionic/angular';
import { paymentQiwi, paymentDetails } from 'src/app/models/paymentQiwi';
import { Plugins } from '@capacitor/core';
import { accountDetail } from 'src/app/models/account';
import { provider } from 'src/app/tabs/personal-accounts/personal-accounts.page';
const { Browser } = Plugins;


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public accountDetail: accountDetail;
  public statusReport: boolean;
  private provider: number;
  private lic: string;

  constructor(
    private serv: AccountDetailService,
    private util: UtilitiesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.serv.update.subscribe(_ => this.update());
    this.provider = this.util.getValue<provider>('params').value.id;
    this.lic = this.util.getValue<provider>('params').value.lic;
    this.serv.detailAccount(this.provider, this.lic)
      .subscribe(data => this.accountDetail = data);
  }

  public update() {
    this.serv.detailAccount(this.provider, this.lic)
      .subscribe(data => this.accountDetail = data);
  }

  public get paymentStatus(): boolean {
    return this.accountDetail.payment;
  }

  public get statusBar(): boolean {
    if (this.accountDetail)
      return true;
    else
      return false;
  }

  public get address(): string {
    if (this.accountDetail) {
      let town = '';
      if (this.accountDetail.town)
        town = this.accountDetail.town.toLowerCase();
      let street = '';
      if (this.accountDetail.street)
        street = ', ул. ' + this.accountDetail.street.toLowerCase();
      let house = '';
      if (this.accountDetail.house)
        house = ', дом ' + this.accountDetail.house;
      let corp = '';
      if (this.accountDetail.corp)
        corp = ', корп. ' + this.accountDetail.corp;
      let aparts = '';
      if (this.accountDetail.apparts)
        aparts = ', кв. ' + this.accountDetail.apparts;
      return town + street + house + corp + aparts;
    }
  }

  public get Consumer(): string {
    if (this.accountDetail)
      return this.accountDetail.name.toLowerCase();
  }

  public get Balance(): { note: string, color: string, summa: number, type: number } {
    let total = 0;
    if (this.accountDetail) {
      this.accountDetail.dogovors.forEach(r => {
        total = r.balance
      })
    }
    if (total <= 0)
      return { note: 'Переплата', color: 'success', summa: parseFloat((total * -1).toFixed(2)), type: 1 }
    else
      return { note: 'Задолженноcть', color: 'danger', summa: parseFloat(total.toFixed(2)), type: 2 }
  }

  public sendReport() {
    this.statusReport = true;
    if (this.Balance.summa > 300 && this.Balance.type == 2) {
      this.util.presentAlert('Для получения справки погасите задолженность');
      return;
    }
    this.serv.sendReport({ name: this.Consumer.toUpperCase(), address: this.address.toUpperCase(), providerid: this.provider, lic: this.lic })
      .subscribe(_ => {
        this.util.presentToast('Справка отправлена на @Mail');
        this.statusReport = false;
      }, error => {
        this.util.presentToast('Произошла ошибка попробуйте позже');
        this.statusReport = false;
      });
  }

  public async createPayment() {
    const modal = await this.modalController.create({
      component: CreatePaymentPage,
      componentProps: {
        service: this.accountDetail.dogovors
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      let payment: paymentQiwi = { providerid: this.provider, lic: this.lic, paymentDetails: [] };
      let paymentDetails: paymentDetails[] = [];
      data.forEach(r => {
        paymentDetails.push({ servicesid: r.id, sum: r.balance })
      });
      payment.paymentDetails = paymentDetails;
      this.serv.createPayment(payment).subscribe(async data => {
        await Browser.open({ url: data.url });
      });
    }
  }

}
