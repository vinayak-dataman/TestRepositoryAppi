import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApicommonProvider } from '../../providers/apicommon/apicommon';
import { OrderitemsProvider } from '../../providers/orderitems/orderitems';
import { CustomershipaddressPage } from '../customershipaddress/customershipaddress';

/**
 * Generated class for the CustomerdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-customerdetail',
  templateUrl: 'customerdetail.html',
})
export class CustomerdetailPage {
  applyFinanceCharges: any;
  creditType: any;
  public toggled: boolean = false;
  public hasMoreData: boolean = true;
  limit: number = 10;
  uName: any;
  uPassword: any;
  searchTerm: string;
  record: any;
  Status: any;
  detailLink: any;
  Onhold: any;
  address: any=[];
  address_country: any;
  cdata: any=[];
  address_contacts: any=[];
  shippingAdresses: any=[];
  isShowShip: any;
  forgroundColor: any;
  backgroundColor: any;

  constructor(public orderDetailProvider: OrderitemsProvider, public apiCommon: ApicommonProvider, public navCtrl: NavController, public navParams: NavParams) {
   // Data from last pages ...
    this.detailLink = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');
  }

  ionViewDidLoad() 
  {

    console.log('ionViewDidLoad CustomerdetailPage');
    setTimeout(() => {
      console.log('Async operation has ended');
      // Get Customer Data ....
      this.loadCustomersItem();
    }, 40);

    
  }


  loadCustomersItem()
  {
    // customer user detail by id ... 
    this.apiCommon.loadCustomerDatabyId(this.detailLink,this.uName,this.uPassword).
    then(data => 
    {
      this.record = data;
      //alert(JSON.stringify(this.record));
      this.updateInfo(this.record);
    
      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
      });
  }



  // Update the Api Key values abbriviation with value ...
  updateInfo(record)
  {
    if (this.record.status === "A") // checked status values
    {
      this.Status = "Active";
      
    }
    else if (this.record.status === "I") 
    {
      this.Status = "Processed";
    }
    else if (this.record.status === "P") 
    {
      this.Status = "Shipped";
      
    }


    if (this.record.hold == true) // checked status values
    {
      this.Onhold = "Yes";
      
    }
    else{
      this.Onhold="No";
    }

    if(this.record.applyFinanceCharges == true)
    {
      this.applyFinanceCharges = "Yes";
    }
    else
    {
      this.applyFinanceCharges = "No";
    }

    if(this.record.creditType == 0)
    {
      this.creditType = "No Credit";
    }
    if(this.record.creditType == 1)
    {
      this.creditType = "Unlimited Credit";
    }
    if(this.record.creditType == 2)
    {
      this.creditType = "Limited Credit";
    }





    // for( let s of this.record.shippingAddresses)
    // {
    //   if(s.type === "S")
    //   {
    //     this.shippingAdresses.push(s);
    //   }
    // }


    if(this.record.address.type === "B")
    {
      this.address = this.record.address.streetAddress.split('\n');
      
      this.address_country = this.record.address.country;

       // Permform Country Translation ....
    this.orderDetailProvider.
    getCountryNameFromCode().
    then(data => {
       this.cdata = data;
      
      
       // Billing Address country name translation... 
       for(let data of this.cdata) 
       {
        
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

      for(let p of this.record.address.contacts)
      {
        if(p.name === "")
        {
          // do nothing
        }
        else
        {
          this.address_contacts.push(p);
        }
      }
      // this.address_contacts = this.record.address.contacts;
    }

    
    
    this.forgroundColor = record.foregroundColor.toString(16).toUpperCase();
    if(this.forgroundColor.length > 6)
    {
      this.forgroundColor = "#"+this.forgroundColor.substring(this.forgroundColor.length-6,this.forgroundColor.length);
    }
    else
    {
      // do nothing ...
    }
    
    this.backgroundColor = "#"+record.backgroundColor.toString(16).toUpperCase();
    if(this.backgroundColor.length > 6)
    {
      this.backgroundColor = "#"+this.backgroundColor.substring(this.backgroundColor.length-6,this.backgroundColor.length);
    }
    else
    {
      // do nothing ...
    }
  
   
   for( let s of this.record.shippingAddresses)
   {
     if(s.type === "S")
     {
       this.shippingAdresses.push(s);
     }
   }

   if(this.shippingAdresses.length == 0)
   {
     this.isShowShip = "";
   }
   else
   {
     this.isShowShip = "yes";
   }
  }


  // Redirect to the Ship Address Detail Page. ...
  showShipAdressDetail(item)
  {
    this.navCtrl.push(CustomershipaddressPage, {
      param1: item,
      param2: this.uName,
      param3: this.uPassword
    });
  }


  // Pull To Refresh load data again  ....
  doRefresh(refresher){
    this.address_contacts.length=0;
    this.shippingAdresses.length = 0;
    this.loadCustomersItem();
    setTimeout(() => {
     refresher.complete();
   }, 100); 
    
   }

}
