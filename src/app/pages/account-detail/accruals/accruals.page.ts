import { Component, OnInit } from '@angular/core';
import { accruals, payment, service } from 'src/app/models/account';
import { AccountDetailService } from 'src/app/services/account-detail.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { provider } from 'src/app/tabs/personal-accounts/personal-accounts.page';

@Component({
  selector: 'app-accruals',
  templateUrl: './accruals.page.html',
  styleUrls: ['./accruals.page.scss'],
})
export class AccrualsPage implements OnInit {

  public provider: number;
  public lic: string;
  public services: service[];
  public currenService: number;
  public accruals: accruals[];
  public statusBar: boolean;

  constructor(
    private accountServ: AccountDetailService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.accountServ.update.subscribe(_ => {
      this.changeService();
    })
    this.provider = this.util.getValue<provider>('params').value.id;
    this.lic = this.util.getValue<provider>('params').value.lic;

    this.accountServ.detailAccount(this.provider, this.lic)
      .subscribe(account => {
        this.services = account.dogovors;
        this.currenService = this.services[0].id;
        this.changeService();
      });
  }

  public changeService() {
    this.accountServ.getAccruals(this.provider, this.currenService)
      .subscribe(accruals => {
        this.accruals = accruals;
        this.statusBar = true;
      });
  }

  public getMonth(month: number): string {
    switch (month) {
      case 1:
        return 'январь';
      case 2:
        return 'февраль';
      case 3:
        return 'март';
      case 4:
        return 'апрель';
      case 5:
        return 'май';
      case 6:
        return 'июнь';
      case 7:
        return 'июль';
      case 8:
        return 'август';
      case 9:
        return 'сентябрь';
      case 10:
        return 'октябрь';
      case 11:
        return 'ноябрь';
      case 12:
        return 'декабрь';
    }
  }

}
