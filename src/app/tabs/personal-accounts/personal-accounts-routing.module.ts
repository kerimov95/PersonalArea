import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalAccountsPage } from './personal-accounts.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalAccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalAccountsPageRoutingModule { }
