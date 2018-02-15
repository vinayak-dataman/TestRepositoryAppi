import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {CognitoCallback, RegistrationUser} from "../../providers/cognito.service";
import { UserRegistrationService } from '../../providers/userRegistration.service';
import { ConfirmregistrationPage } from '../confirmregistration/confirmregistration';
import { LoginPage } from '../login/login';

// @IonicPage()
@Component({
  selector: 'page-createaccount',
  templateUrl: 'createaccount.html',
})
export class CreateaccountPage implements CognitoCallback{
  loading: any;
  password: string;
  companyname: string;
  useremail: string;
  usermobile: string;
  registrationUser: RegistrationUser;
  userName: string;
  spireUserName: string;
  
  public type = 'password';
  public showPass = false;
  fName:"";
  lName: "";


  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController,
    public userRegistration: UserRegistrationService, public alertCtrl: AlertController) {
      this.registrationUser = new RegistrationUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateaccountPage');
  }

  navToLogin(){
    this.navCtrl.pop();
  }

  // Create Account button click ...
  createAccount(form: NgForm)
  {
    if(this.userName == null )
    {
      alert("Please Enter First Name");
      return;
    }
    if(this.lName == null )
    {
      alert("Please Enter Last Name");
      return;
    }
    if(this.spireUserName == null )
    {
      alert("Please Enter Spire username");
      return;
    }
    if(this.companyname == null )
    {
      alert("Please enter company name");
      return;
    }
    if(this.useremail == null)
    {
      alert("Please enter user email");
      return;
    }
    if(this.password == null)
    {
      alert("Please enter password");
      return;
    }
  
    
    // Asigning user value ... 

    this.registrationUser.name = this.userName;
    this.registrationUser.email = this.useremail;
    this.registrationUser.companyName = this.companyname;
    this.registrationUser.password = this.password;
    this.registrationUser.fName = this.fName;
    this.registrationUser.lName = this.lName;
    this.registrationUser.spireUserName = this.spireUserName;
    // Call user registration 
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    this.userRegistration.register(this.registrationUser, this);
  }


  // Show and Hide password accordingly 
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass)
    {
      this.type = 'text';
    } 
    else
    {
      this.type = 'password';
    }
  }

  // Registration Response on callback method
  cognitoCallback(message: string, result: any): void {
    this.loading.dismiss();
    if (message != null) 
    { //error
      
      this.doAlert("Registration", message);

    }
    else
    { 
      //success
      console.log("in callback...result: " + result);
      
      this.navCtrl.push(ConfirmregistrationPage, {
          'username': result.user.username,
          'email': this.registrationUser.email
      });

    }
  }



  // Show Commont alert messages
  doAlert(title: string, message: string) {
    
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: message,
          buttons: ['OK']
      });
      alert.present();
  }


  onBack()
  {
    this.navCtrl.pop();
  }


}
