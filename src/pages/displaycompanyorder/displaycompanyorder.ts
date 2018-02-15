import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CompanysalesorderProvider } from '../../providers/companysalesorder/companysalesorder';
import { OrderdetailsPage } from '../orderdetails/orderdetails';
import { Storage } from '@ionic/storage';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CreateneworderPage } from '../createneworder/createneworder';

import { SortbyPage } from '../sortby/sortby';

/**
 * Generated class for the DisplaycompanyorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-displaycompanyorder',
  templateUrl: 'displaycompanyorder.html',
})
export class DisplaycompanyorderPage {
  public toggled: boolean = false;
  public hasMoreData: boolean = true;
  limit: any = 50;
  uName: any;
  uPassword: any;
  searchTerm: string;
  records: string[];
  orderType: any;
  sortsBy: any;
  sortKey: any;
  sort = "";
  
  constructor(public actionSheetCtrl: ActionSheetController,public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public companysalesorderProvider: CompanysalesorderProvider,public menuctrl: MenuController) {
    menuctrl.enable(true,'menu2');
    this.menuctrl.enable(true, 'menu2');
}

ionViewDidLoad() 
{
 
 
  this.storage.get('ApiAuthData').then((val) => {
    console.log("Val in home"+val);
    this.uName = val.Username;
    this.uPassword = val.Password;
  
  });
  console.log('ionViewDidLoad DisplaycompanyorderPage');
 
   this.storage.get('OrderSortBy').then((val) => 
  {
    this.sortsBy = val;
    if(this.sortsBy == null)
    {
      // do nothing
      this.sortKey = "";
    }
    else
    {
      this.sortKey = this.sortsBy.pSort.sortBy;
    }
    

    // {"pSort":{"type":"O","sortBy":"orderDate","sortedOrder":"ASC"}}
    
  }
);
  
}


doRefresh(refresher){
  this.limit=50;
 this.loadCompanySalesOrder(this.limit,this.sortKey);
 setTimeout(() => {
  refresher.complete();
}, 100); 
 
}


ionViewWillEnter()
{

    this.storage.get('ApiAuthData').then((val) => {
    console.log("Val in home"+val);
    this.uName = val.Username;
    this.uPassword = val.Password;
 
});
 
this.storage.get('savedLimitInOrder').then((val)=>{
  if(val == null)
  {
    this.limit= 50;
  }
  else
  {
    this.limit = val;
  }
});
  this.storage.get('OrderSortBy').then((val) => 
  {
    this.sortsBy = val;
    if(this.sortsBy == null)
    {
      // do nothing
      this.sortKey = "";
    }
    else
    {
      this.sortKey = this.sortsBy.pSort.sortBy;
    }
    

    // {"pSort":{"type":"O","sortBy":"orderDate","sortedOrder":"ASC"}}
    setTimeout(() => {
      if(this.records != null)
      {
        this.records.length =0;
      }
      console.log('Async operation has ended');
      this.loadCompanySalesOrder(this.limit,this.sortKey); 
    }, 100); 
  }
);

 
}

loadCompanySalesOrder(limit,sortbykey)
{
 
  //alert(limit);
  
  if(sortbykey === "")
  {

  }
  else
  {
    this.sort = "&sort="+sortbykey;
  }
  this.companysalesorderProvider.
  loadSalesOrder("https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/sales/orders/?limit="+limit+this.sort,this.uName,this.uPassword
).
then(data => 
{
  this.records = data.records;
  
  if(this.records.length %10 ==0)
  {
    this.hasMoreData = true;
  }
  else
  {
    this.hasMoreData = false;
  }
   
  }).catch((error) => 
  {
    alert('Error getting companies'+JSON.stringify(error));
  });
}

showOrderDetails(record)
{
  this.navCtrl.push(OrderdetailsPage, {
    param1: record.links.self,
    param2: this.uName,
    param3: this.uPassword,
    param4: record.billingAddress,
    param5: record.shippingAddress
  });
}


doInfinite (infiniteScroll) {
  console.log('Begin async operation');
  this.hasMoreData = false;
  setTimeout(() => {
    
    this.loadmore();
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 200);

}


  // Call Load more function while scroll at end //
  loadmore()
  {
    if(this.limit%10 == 0)
    {
      this.hasMoreData = true;
    }
    else
    {
      this.hasMoreData = false;
    }
    
    if(this.hasMoreData)
    {
      this.limit = parseInt(this.limit)+parseInt('10');
      if(this.limit)
      this.loadCompanySalesOrder(this.limit,this.sortKey);
    }
  }

  public toggle(): void {
    this.toggled = this.toggled ? false : true;
 }


 // On cancel search hide the search bar
 onSearchCancel()
 {
   this.toggle();
   this.loadCompanySalesOrder(this.limit,this.sortKey);

 }

 // Perform Searching on Keyboard Event ....
 searchWithKeyword()
 {
    setTimeout(() => {
    this.companysalesorderProvider.
    loadSearchData("https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/sales/orders/?q="+this.searchTerm,this.uName,this.uPassword).
    then(data => 
    {
      this.records = data.records;
      
      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
      });
  },500);
 
 }



 setting()
 {
  this.navCtrl.push(SortbyPage, {
    param1: 1,
 
  });
 }

 openFabButton()
 {

  this.presentActionSheet();
 }


 presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'New',
    buttons: [
      {
        text: 'Sales Order',
        icon: 'add',
        role: 'destructive',
        handler: () => {
          this.orderType = "O"

          this.navCtrl.push(CreateneworderPage, {
            param1: this.orderType,
            param2: this.uName,
            param3: this.uPassword,
         
          });


        }
      },
      {
        text: 'Quote',
        icon: 'add',
        handler: () => {
          this.orderType = "Q"

          this.navCtrl.push(CreateneworderPage, {
            param1: this.orderType,
            param2: this.uName,
            param3: this.uPassword,
         
          });

        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
}


