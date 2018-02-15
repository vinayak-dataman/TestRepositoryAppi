import {  NavController, NavParams, MenuController } from 'ionic-angular';
import { Nav, AlertController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { MycompaniesPage } from '../mycompanies/mycompanies';
import { UserLoginService } from '../../providers/userLogin.service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { LoggedInCallback } from '../../providers/cognito.service';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements LoggedInCallback {
  
  attributesList: any=[];
  loggedUserNameVal: any;
  loggeduserEmailVal: any;
  
  
    isLoggedInCallback(message: string, loggedIn: boolean, userData: any): void {
      userData.getUserAttributes((err, data) => {
        this.attributesList = data;
        let loggedInObj = {
          loggedinEmail : "",
          loggedinFName : "",
          loggedinlName : ""
        };
       
        loggedInObj.loggedinEmail = this.attributesList[6].Value;
        loggedInObj.loggedinFName = this.attributesList[4].Value;
        loggedInObj.loggedinlName = this.attributesList[5].Value; 
        setTimeout(() => {
         
          this.loggedUserNameVal = this.attributesList[4].Value+" "+this.attributesList[5].Value;
          this.loggeduserEmailVal = this.attributesList[6].Value;
          this.storage.set("loggedUserEmail",loggedInObj);
          
        }, 100); 
     });
    }
  pages: Array<{title: string, component: any, icon: string}>;
  @ViewChild(Nav) nav: Nav;
  rootPage:any = MycompaniesPage;
 
  constructor(public storage:Storage, private alertCtrl: AlertController,public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams,public userService: UserLoginService) 
  {
    menu.enable(true,'menu1');
    this.menu.enable(true, 'menu1');
    this.pages = [
      { title: 'Logout', component: null,icon: 'assets/icon/ic_action_logout.png'}
    ];
    this.userService.isAuthenticated(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  openPage(page) {
    if(page.component) {
      this.nav.setRoot(page.component);
  } else {
      // Since the component is null, this is the logout option
      // ...

      // logout logic
      // redirect to home
      this.showConfirmLogout();
    
  }
}


  //  Confirm Logout alert
  showConfirmLogout() {
    let alert = this.alertCtrl.create({
      
      message: 'Do you want to Logout of Appi4 Spire?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.userService.logout();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }


}
