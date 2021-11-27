import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { provider } from 'src/app/tabs/personal-accounts/personal-accounts.page';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.page.html',
  styleUrls: ['./account-detail.page.scss'],
})
export class AccountDetailPage implements OnInit {

  public lic: string;

  constructor(
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.lic = this.util.getValue<provider>('params').value.lic
  }


}
