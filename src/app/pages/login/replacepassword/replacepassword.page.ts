import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-replacepassword',
  templateUrl: './replacepassword.page.html',
  styleUrls: ['./replacepassword.page.scss'],
})
export class ReplacepasswordPage implements OnInit {

  public phone: string;

  constructor(
    private http: HttpClient,
    private modal: ModalController,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
  }

  public cancel() {
    this.modal.dismiss();
  }

  public async replace() {
    let load = await this.util.presentLoading();
    this.http.get('account/ReplacePassword?phone=' + this.phone).subscribe(
      _ => {
        load.dismiss();
        alert('Пароль отправлен на указанный номер');
        this.modal.dismiss();
      }, error => {
        load.dismiss();
        if (error.status == 401)
          alert('Пользователь с указанным номером не найден');
        else
          alert('Не удается восстановить пароль. Обратитесь в службу технической поддержки');
      }
    );
  }

}
