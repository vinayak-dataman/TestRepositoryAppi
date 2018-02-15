import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InventoryunitdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-inventoryunitdetail',
  templateUrl: 'inventoryunitdetail.html',
})
export class InventoryunitdetailPage {
record: any;
buyUOM: any;
sellUOM: any; 
allowFractionalQty: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.record = navParams.get('param1');

    if(this.record.buyUOM == true)
    {
      this.buyUOM = "Yes";
    }
    else{
      this.buyUOM = "No";
    }


    if(this.record.sellUOM == true)
    {
      this.sellUOM = "Yes";
    }
    else{
      this.sellUOM = "No";
    }


    if(this.record.allowFractionalQty == true)
    {
      this.allowFractionalQty = "Yes";
    }
    else{
      this.allowFractionalQty = "No";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryunitdetailPage');
  }


}
