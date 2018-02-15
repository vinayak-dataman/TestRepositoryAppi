import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CreateaccountPage } from '../createaccount/createaccount';
import { ForgotpassowrdPage } from '../forgotpassowrd/forgotpassowrd';
import { UserLoginService } from '../../providers/userLogin.service';
import {CognitoCallback, LoggedInCallback} from "../../providers/cognito.service";


import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements CognitoCallback,LoggedInCallback {
  isKeepmeLoggedInValue : any;
  isLoggedInCallback(message: string, loggedIn: boolean, userData: any): void {
    if(loggedIn)
    {
      this.storage.get('isKeepMeLogin').then((val) => {
        console.log("Val in home"+val);
        if(val != null)
        {
          this.isKeepmeLoggedInValue = val.iskeptLoggedIn;
          
          // Check user already authontication ...
         
        }
  
        if(this.isKeepmeLoggedInValue === "true")
        {
          this.navCtrl.setRoot(DashboardPage);
          return;
        }
       
        });
    }
   
  }
  loading: any;
  rememberLogin: boolean;
  loginObj = 
  {
    "iskeptLoggedIn": "",
  };
  keepMeLogin() 
  {
     
  }

 
  // After Login Callback result ....
  cognitoCallback(message: string, result: any): void {
    this.loading.dismiss();
   // alert(JSON.stringify(result));
    if (message != null) 
    { 
      this.doAlert("Error", message);
      console.log("result: " + message);
    } 
    else
    {
      if(this.rememberLogin)
      {
        this.loginObj.iskeptLoggedIn = "true";
      }
      else
      {
        this.loginObj.iskeptLoggedIn = "false";
      }
      this.storage.get('isKeepMeLogin').then((val) => {
      if(val)
      {
          this.loginObj = val;
          if(this.rememberLogin)
          {
            this.loginObj.iskeptLoggedIn = "true";
          }
          else
          {
            this.loginObj.iskeptLoggedIn = "false";
          }
        
          this.storage.set('isKeepMeLogin', this.loginObj);
      }
      else
      {
        if(this.rememberLogin)
        {
           this.loginObj.iskeptLoggedIn = "true";
        }
        else
        {
            this.loginObj.iskeptLoggedIn = "false";
        }
        this.storage.set('isKeepMeLogin', this.loginObj);
      }
    });
    console.log("Redirect to ControlPanelComponent");
    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.setRoot(DashboardPage);
    }, 100); 
      
  }
  }

  password: string;
  userEmail: string;
  public type = 'password';
  public showPass = false;
  constructor(public navCtrl: NavController,public storage: Storage,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public userService: UserLoginService) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  
  }

  ionViewDidEnter(){
    this.userService.isAuthenticated(this);
  }


  navToSignup()
  {

    this.navCtrl.push(CreateaccountPage);

  }

  // Forgot Password link click event
  forgotPassword()
  {
    this.navCtrl.push(ForgotpassowrdPage);
    
  }


  // login button click event
  onLogin()
  {
    if(this.userEmail == null)
    {
      this.doAlert("Alert","Please Enter Email Id");
      return;
    }
    if(this.password == null){
      this.doAlert("Alert","Please Enter Email Id");
      return;
    }
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.userService.authenticate(this.userEmail, this.password, this);
  }


  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }



  doAlert(title: string, message: string) {
    
            let alert = this.alertCtrl.create({
                title: title,
                subTitle: message,
                buttons: ['OK']
            });
            alert.present();
  }

}
