import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForgotpassowrdPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-forgotpassowrd',
  templateUrl: 'forgotpassowrd.html',
})
export class ForgotpassowrdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassowrdPage');
  }

// Back button click event
  onBack()
  {
    this.navCtrl.pop();
  }
}
