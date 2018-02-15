import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


import { LoginPage } from '../pages/login/login';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp 
{

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
      
  }

  

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 10);
     }
    }
}
