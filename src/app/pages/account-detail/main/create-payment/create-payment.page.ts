import { Component, OnInit, Input } from '@angular/core';
import { service } from 'src/app/models/account';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.page.html',
  styleUrls: ['./create-payment.page.scss'],
})
export class CreatePaymentPage implements OnInit {

  @Input() service: service[]

  public serv: service[] = []

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.service.forEach(r => {
      let newServ = Object.assign(new service, r)
      if (newServ.balance < 0)
        newServ.balance = 0;
      this.serv.push(newServ);
    })
  }

  public get getTotal(): number {
    let total = 0;
    this.serv.forEach(r => {
      total += r.balance;
    })
    return total;
  }

  public get getCount(): number {
    return this.serv.length;
  }

  public delete(id: number) {
    this.serv = this.serv.filter(r => r.id != id);
  }

  public dismiss(status: boolean) {
    if (status)
      this.modal.dismiss(this.serv);
    else
      this.modal.dismiss();
  }

}
