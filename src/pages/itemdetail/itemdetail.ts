import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-itemdetail',
  templateUrl: 'itemdetail.html',
})
export class ItemdetailPage 
{
  item: any;
  uName: any;
  uPassword: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemdetailPage');
  }

}
