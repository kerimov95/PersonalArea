import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { CreateAccountPageModule } from './create-account/create-account.module';
import { CreateAccountPage } from './create-account/create-account.page';
import { LoginPageRoutingModule } from './login-routing.module';
import { ReplacepasswordPageModule } from './replacepassword/replacepassword.module';
import { ReplacepasswordPage } from './replacepassword/replacepassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CreateAccountPageModule,
    ReplacepasswordPageModule
  ],
  entryComponents: [CreateAccountPage, ReplacepasswordPage],
  declarations: [LoginPage]
})
export class LoginPageModule { }
