import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainPage } from './main.page';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentPage } from './create-payment/create-payment.page';
import { CreatePaymentPageModule } from './create-payment/create-payment.module';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CreatePaymentPageModule
  ],
  exports: [MainPage],
  declarations: [MainPage],
  entryComponents: [CreatePaymentPage]
})
export class MainPageModule { }
