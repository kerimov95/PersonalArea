import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatePaymentPage } from './create-payment.page';
import { CreateAccountPage } from 'src/app/pages/login/create-account/create-account.page';
import { RouterModule, Routes } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [CreatePaymentPage]
})
export class CreatePaymentPageModule { }
