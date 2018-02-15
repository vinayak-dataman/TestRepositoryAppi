import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserLoginService } from '../../providers/userLogin.service';
import { CognitoCallback, LoggedInCallback } from '../../providers/cognito.service';


import { Storage } from '@ionic/storage'
import { DashboardPage } from '../dashboard/dashboard';


// @IonicPage()
@Component({
  selector: 'page-slide-intro',
  templateUrl: 'slide-intro.html',
})

export class SlideIntroPage implements CognitoCallback,LoggedInCallback {
  attributes:any=[];
  // Checking Login session ....
  isLoggedInCallback(message: string, loggedIn: boolean, userData: any): void {
       if ( loggedIn) 
       {     
        
        if(this.isKeepmeLoggedInValue == "true")
        {
          this.navCtrl.setRoot(DashboardPage);
          return;
        }
          this.userService.logout();
        }
     
     else
     {
      
     }
  }
 
  isKeepmeLoggedInValue: string;
  isUserActive: any;

  cognitoCallback(message: string, result: any): void {
    throw new Error("Method not implemented.");
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
    public userService: UserLoginService)
  {
    this.storage.get('isKeepMeLogin').then((val) => {
    console.log("Val in home"+val);
    if(val != null)
    {
      this.isKeepmeLoggedInValue = val.iskeptLoggedIn;
      // Check user already authontication ...
      this.userService.isAuthenticated(this);
    }
   
    });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad SlideIntroPage');
  }


  //Redirect to the login page ...
  navHome()
  {

    this.navCtrl.setRoot(LoginPage);
   
  }
}
