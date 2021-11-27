import { Component, OnInit, SimpleChange } from '@angular/core';
import { AccountDetailService } from 'src/app/services/account-detail.service';
import { payment, accountDetail } from 'src/app/models/account';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { provider } from 'src/app/tabs/personal-accounts/personal-accounts.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {


  public provider: number;
  public currenService: number;
  public lic: string;
  public statusBar: boolean;
  public accountDetail: accountDetail;

  constructor(
    private serv: AccountDetailService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.serv.update.subscribe(_ => {
      this.changeService();
    })
    this.provider = this.util.getValue<provider>('params').value.id;
    this.lic = this.util.getValue<provider>('params').value.lic
    this.serv.detailAccount(this.provider, this.lic)
      .subscribe(detaild => {
        this.accountDetail = detaild;
        this.currenService = detaild.dogovors[0].id;
        this.changeService();
      });
  }

  public get payments(): payment[] {
    if (this.serv.paymets)
      return this.serv.paymets
  }

  public changeService() {
    this.serv.paymets = undefined;
    this.serv.getPaymnets(this.provider, this.currenService)
      .subscribe(_ => this.statusBar = true)
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName == 'currenService' && !changedProp.isFirstChange())
        this.changeService();
    }
  }

}
