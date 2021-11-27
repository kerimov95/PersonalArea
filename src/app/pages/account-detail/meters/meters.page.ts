import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { AccountDetailService } from 'src/app/services/account-detail.service';
import { service, meter, ph, accountDetail } from 'src/app/models/account';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { MetersService } from 'src/app/services/meters.service';
import { provider } from 'src/app/tabs/personal-accounts/personal-accounts.page';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.page.html',
  styleUrls: ['./meters.page.scss'],
})
export class MetersPage implements OnInit {

  public currenService: number;
  public provider: number;
  public lic: string;
  public statusBar: boolean;
  public currentMeter: number;
  public metersCheck: boolean;
  public newPh: number;
  public statusPh: boolean;
  public meters: meter[];
  public ph: ph[];
  public accountDetail: accountDetail;

  constructor(
    private metersService: MetersService,
    private accountService: AccountDetailService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.provider = this.util.getValue<provider>('params').value.id;
    this.lic = this.util.getValue<provider>('params').value.lic;
    this.accountService.detailAccount(this.provider, this.lic)
      .subscribe(data => {
        this.accountDetail = data;
        this.currenService = data.dogovors[0].id;
        this.changeService();
      });
  }

  public changeMeters() {
    this.ph = undefined;
    this.metersService.getPh(this.provider, this.currentMeter)
      .subscribe(ph => {
        this.ph = ph;
        this.statusBar = true;
      });
  }

  public changeService() {
    this.metersService.getMeters(this.provider, this.currenService)
      .subscribe(meters => {
        if (meters.length > 0) {
          this.meters = meters;
          this.currentMeter = meters[0].id;
          this.changeMeters();
        }
        else
          this.metersCheck = true;
      });
  }

  public setPh() {
    let datePipe = new DatePipe('en-US');
    let date = datePipe.transform(new Date, 'dd.MM.yyyy');

    let con = this.newPh - this.ph[0].ph;
    if (con > 5000) {
      this.util.presentAlert('Расход более 5000 кВт/ч. Для занесения расхода более 5000 кВт/ч обратитесь в офис поставщика');
      return;
    }
    else if (con < 0 || con.toString() == 'NaN') {
      this.util.presentAlert('Неверные показания.');
      return;
    }
    this.statusPh = true;
    this.metersService.setPh(this.provider, this.currentMeter, con)
      .subscribe(_ => {
        this.accountService.update.next();
        this.ph.unshift({ ph: this.newPh, docdate: date })
        this.util.presentAlert('Показания успешно занесены');
        this.newPh = undefined;
        this.statusPh = false;
        this.accountService.detailAccount(this.provider, this.lic).subscribe();
      }, _ => {
        this.util.presentAlert('Не удалось сохранить показания');
        this.statusPh = false;
      });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (propName == 'currenService' && !changedProp.isFirstChange())
        this.changeService();
    }
  }

}
