import { Component, OnInit } from '@angular/core';
import {
  Plugins,
  PushNotification
} from '@capacitor/core';
import { AccountDetailService } from '../services/account-detail.service';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(
    private serv: AccountDetailService
  ) { }

  ngOnInit() {
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        this.serv.update.next();
        alert('Платеж успешно проведен.');
      }
    );
  }

}
