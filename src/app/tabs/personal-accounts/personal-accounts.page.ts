import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { account } from 'src/app/models/account';
import { PersonalAccoutnService } from './personal-accoutn.service';
import { AddAccountPage } from './add-account/add-account.page';
import { Router } from '@angular/router';
import { storege, UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-personal-accounts',
  templateUrl: './personal-accounts.page.html',
  styleUrls: ['./personal-accounts.page.scss'],
})
export class PersonalAccountsPage implements OnInit {

  public statusBar: boolean;

  constructor(
    private serv: PersonalAccoutnService,
    private modalCtl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.serv.getAccounts().subscribe(_ => {
      setTimeout(() => {
        this.statusBar = true;
      }, 2000);
    })
  }

  public get getAccounts(): account[] {
    if (this.serv.accounts)
      return this.serv.accounts
  }

  public async addAccount() {
    const modal = await this.modalCtl.create({
      component: AddAccountPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.parentOutlet.nativeEl
    });
    await modal.present();
  }

  public delete(id: number) {
    this.serv.dalete(id).subscribe();
  }

  public navigate(lic: string, provider: number) {
    this.util.setValue<provider>({ key: 'params', value: { id: provider, lic: lic } })
    this.router.navigate(['detail']);
  }

}

export interface provider {
  id: number;
  lic: string;
}
