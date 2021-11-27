import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailPage } from './account-detail.page';

const routes: Routes = [
  {
    path: 'subtab',
    component: AccountDetailPage,
    children: [
      {
        path: 'info', loadChildren: () => import('../account-detail/main/main.module').then(m => m.MainPageModule)
      },
      { path: 'meters', loadChildren: () => import('../account-detail/meters/meters.module').then(m => m.MetersPageModule) },
      { path: 'payments', loadChildren: () => import('../account-detail/payments/payments.module').then(m => m.PaymentsPageModule) },
      { path: 'accruals', loadChildren: () => import('../account-detail/accruals/accruals.module').then(m => m.AccrualsPageModule) },
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'subtab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountDetailPageRoutingModule { }
