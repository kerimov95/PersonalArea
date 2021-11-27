import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalAccountsPageRoutingModule } from './personal-accounts-routing.module';
import { PersonalAccountsPage } from './personal-accounts.page';
import { AddAccountPageModule } from './add-account/add-account.module';
import { AddAccountPage } from './add-account/add-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalAccountsPageRoutingModule,
    AddAccountPageModule
  ],
  declarations: [PersonalAccountsPage],
  entryComponents: [AddAccountPage]
})
export class PersonalAccountsPageModule { }
