import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DisplaycompanyorderPage } from '../displaycompanyorder/displaycompanyorder';
import { UserLoginService } from '../../providers/userLogin.service';
import { LoginPage } from '../login/login';
import { Nav, AlertController } from 'ionic-angular';

import { InventoryPage } from '../inventory/inventory';
import { HomescreenPage } from '../homescreen/homescreen';
import { LoggedInCallback } from '../../providers/cognito.service';
import { CustomersPage } from '../customers/customers';
import { MycompaniesPage } from '../mycompanies/mycompanies';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { DashboardPage } from '../dashboard/dashboard';

/*
 * Generated class for the CompanymenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-companymenu',
  templateUrl: 'companymenu.html',
})
export class CompanymenuPage implements LoggedInCallback {
attributes: any=[];
loggedUserName: any;
loggeduserEmail: any;
title: string;

  isLoggedInCallback(message: string, loggedIn: boolean, userData: any): void {
    userData.getUserAttributes((err, data) => {
      this.attributes = data;
     
      setTimeout(() => {
       
        this.loggedUserName = this.attributes[4].Value+" "+this.attributes[5].Value;
        this.loggeduserEmail = this.attributes[6].Value;

      
      }, 100); 
     
     
   
     
    });
  }

  @ViewChild(Nav) navs: Nav;
  rootPage:any = HomescreenPage;
  pagess: Array<{title: string, component: any, icon: string}>;
  constructor(private alertCtrl: AlertController,public navCtrl: NavController,public menuctrl: MenuController, 
    public navParams: NavParams,public userService: UserLoginService) 
    {
      this.title = navParams.get('param2');
      this.userService.isAuthenticated(this);
      menuctrl.enable(true,'menu2');
      this.menuctrl.enable(true, 'menu2');
      // Initialliging Side menu options array ....
      this.pagess = [
      { title: 'Home', component: HomescreenPage, icon: "assets/icon/ic_action_home.png" },
      { title: 'Sales', component: DisplaycompanyorderPage, icon: 'assets/icon/ic_action_orders.png' },
      { title: 'Inventory', component: InventoryPage, icon: 'assets/icon/ic_action_forklift.png' },
      { title: 'Customers', component: CustomersPage,icon: 'assets/icon/ic_action_handshake.png' },
      { title: 'Logout', component: null,icon: 'assets/icon/ic_action_logout.png' }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanymenuPage');
    
    this.menuctrl.enable(true, 'menu2');
  }
  
  openPage(page) {
    if(page.component) {
      this.navs.setRoot(page.component);
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
      message: 'Do you want to Logout of '+this.title+'?',
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
            //this.userService.logout();
            this.navCtrl.setRoot(DashboardPage);
          }
        }
      ]
    });
    alert.present();
  }

  

}
