import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class SimpleAlertService {

  constructor(
    private _alertCtrl: AlertController
  ) {}

  createAlert(title:string, message: string){
    return this._alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
  }

}

