import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { account, provider } from 'src/app/models/account';
import { PersonalAccoutnService } from '../personal-accoutn.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {

  private account = new account;

  constructor(
    private modal: ModalController,
    private serv: PersonalAccoutnService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.serv.getProviders().subscribe();
  }

  public async addAccount() {
    let load = await this.util.presentLoading();
    this.serv.addAccount(this.account).subscribe(
      _ => {
        load.dismiss();
        this.modal.dismiss();
      }, error => {
        load.dismiss();
        if (error.status == 404)
          this.util.presentAlert('Лицевой счет не найден в базе поставщика')
        else
          this.util.presentAlert('Произошла ошибка. Попробуйте позже или обратитесь в службу поддержки')
      });
  }

  public get getProdiders(): provider[] {
    if (this.serv.providers)
      return this.serv.providers
  }

  public cancel() {
    this.modal.dismiss();
  }

}
