import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderitemsProvider } from '../../providers/orderitems/orderitems';

/**
 * Generated class for the CustomershipaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-customershipaddress',
  templateUrl: 'customershipaddress.html',
})
export class CustomershipaddressPage {

  isAddressThere: any;
  detailLink: any;
  uName: any;
  uPassword: any;
  address: any=[];
  item: any;
  address_country: any;
  cdata: any=[];
  address_contacts: any=[];
  constructor(public orderDetailProvider: OrderitemsProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');
    if(this.item.streetAddress === "")
    {
      
      this.isAddressThere = "";
    }
    else
    {
      this.isAddressThere = "yes";
      this.address = this.item.streetAddress.trim().split('\n');
      
  
    }
    
    this.address_country = this.item.country;

     // // Permform Country Translation ....
    this.orderDetailProvider.
    getCountryNameFromCode().
    then(data => {
       this.cdata = data;
      
      
       // Billing Address country name translation... 
       for(let data of this.cdata) {
        
         if(data.alpha3.toUpperCase() === this.address_country)
         {
           this.address_country = data.name;
           break;
         }
       }
  
      }).catch((error) => 
      {
  
        alert('Error getting companies'+JSON.stringify(error));
        
      });


      for(let p of this.item.contacts)
      {
        if(p.name === "")
        {
          // do nothing
        }
        else{
          this.address_contacts.push(p);
        }
      }

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomershipaddressPage');
  }

}
