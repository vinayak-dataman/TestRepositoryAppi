import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserRegistrationService } from '../../providers/userRegistration.service';
import { CognitoCallback } from '../../providers/cognito.service';
import { LoginPage } from '../login/login';
import { CreateaccountPage } from '../createaccount/createaccount';

/**
 * Generated class for the ConfirmregistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-confirmregistration',
  templateUrl: 'confirmregistration.html',
})
export class ConfirmregistrationPage  implements CognitoCallback{
 
  confirmationCode: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public userRegistration: UserRegistrationService, public navParam: NavParams, public alertCtrl: AlertController) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmregistrationPage');
  }


  // Confirm register button click by entering varification codes you got on email. 
  onConfirmRegistration() {
    console.log("Confirming registration");
    this.userRegistration.confirmRegistration(this.navParam.get("email"), this.confirmationCode, this);
}




// Service callback response .. 
cognitoCallback(message: string, result: any) {
  if (message != null) { //error
      this.doAlert("Confirmation", message);
  } else { //success
      console.log("Entered ConfirmRegistrationComponent");
      let email = this.navParam.get("email");

      if (email != null)
          this.navCtrl.push(LoginPage, {
              'email': email
          });
      else
          this.navCtrl.push(LoginPage);
  }
}

// Show common alert messages. ...
doAlert(title: string, message: string) {
  
          let alert = this.alertCtrl.create({
              title: title,
              subTitle: message,
              buttons: ['OK']
          });
          alert.present();
}


// redirent to Signup page button click
navToRegister() {
  // redirect to signup page.. 
  this.navCtrl.push(CreateaccountPage);
}


// redirent to login page button click
navToLogin() {
  this.navCtrl.push(LoginPage);
}



}
