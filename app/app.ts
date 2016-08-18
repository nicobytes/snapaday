import { Component } from '@angular/core';
import { Platform, ionicBootstrap } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { DataService } from './providers/data';
import { SimpleAlertService } from './providers/simple-alert';
import { LocalNotifications } from 'ionic-native';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      this.rootPage = HomePage;
      this._notification();
      StatusBar.styleDefault();
    });
  }

  private _notification(){
    LocalNotifications.isScheduled(1)
    .then( scheduled => {
      if(!scheduled){
        let firstNotificationTime = new Date();
        firstNotificationTime.setHours(firstNotificationTime.getHours()+24);
        LocalNotifications.schedule({
          id: 1,
          title: 'Snapaday',
          text: 'Have you taken your snap today?',
          at: firstNotificationTime,
          every: 'day'
        });
      }
    })
  }
}

ionicBootstrap(MyApp, [ DataService, SimpleAlertService ]);
