import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { ApicommonProvider } from '../../providers/apicommon/apicommon';
import { CustomerdetailPage } from '../customerdetail/customerdetail';

import { SortbyPage } from '../sortby/sortby';

// @IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  addedtoCustomers: any[]=[];
  public toggled: boolean = false;
  public hasMoreData: boolean = true;
  limit: any = 50;
  uName: any;
  uPassword: any;
  searchTerm: string;
  records: string[];
  callback: any;
  key: number=0;
  sortsBy: any;
  sortKey: any;
  sort = "";
  constructor(public apiCommon: ApicommonProvider, public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.callback = this.navParams.get("callback");
    this.key = this.navParams.get("param2");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
    console.log('ionViewDidLoad InventoryPage');

    // Getting Authoniticated User Name/Password from storage
    this.storage.get('ApiAuthData').then((val) => {
      console.log("Val in home"+val);
      this.uName = val.Username;
      this.uPassword = val.Password;
    
    });
   

  }



  // Load Customers Data by limit ...
  loadCustomersItem(limit,sortbykey)
  {
    if(sortbykey === "")
    {
      this.sort = "";
    }
    else
    {
      this.sort = "&sort="+sortbykey;
    }


    this.apiCommon
  .loadCustomerData(limit+this.sort,this.uName,this.uPassword).
  then(data => 
  {
    this.records = data.records;
  // alert(JSON.stringify(this.records));
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


  // Pull to refresh options ...
  doRefresh(refresher){
    this.limit=50;
    this.loadCustomersItem(this.limit,this.sortKey); 
   setTimeout(() => {
    refresher.complete();
  }, 100); 
   
  }



// Load More functionality on scroll 

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
    this.loadCustomersItem(this.limit,this.sortKey); 
    }
  }
  
  public toggle(): void {
    this.toggled = this.toggled ? false : true;
 }


 // On cancel search hide the search bar
 onSearchCancel()
 {
   this.toggle();
   this.loadCustomersItem(this.limit,this.sortKey); 
 }

 ionViewWillEnter()
  {
  
      this.storage.get('ApiAuthData').then((val) => {
      console.log("Val in home"+val);
      this.uName = val.Username;
      this.uPassword = val.Password;
   
    });
   this.storage.get('savedLimitInCustomer').then((val)=>{
  if(val == null)
  {
    this.limit= 50;
  }
  else
  {
    this.limit = val;
  }
});
    this.storage.get('CustomerSortBy').then((val) => 
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

      setTimeout(() => {
        if(this.records != null)
        {
          this.records.length =0;
        }
        console.log('Async operation has ended');
        this.loadCustomersItem(this.limit,this.sortKey); 
      }, 100); 
    }
  );
  
   
  }


 
 // Perform Searching on Keyboard Event ....
 searchWithKeyword()
 {
    
  setTimeout(() => {
    this.apiCommon.
    loadSearchCustomerDatabyId(this.searchTerm,this.uName,this.uPassword).
    then(data => 
    {
      this.records = data.records;
      
      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
      });
  },500);

 }



// On Scroll call more data
doInfinite (infiniteScroll) {
  console.log('Begin async operation');
  this.hasMoreData = false;
  setTimeout(() => {
    
    this.loadmore();
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 200);

}


setting()
{
 this.navCtrl.push(SortbyPage, {
   param1: 2,

 });
}





// Function to get more data on scroll ...

// Redirect to the custoer detail page ...
showCustomersDetails(record){
  if(this.key == 1)
  {
    this.clearKeys();
    let customerObj = {
     "customerRecord" : ""
    };
    
    customerObj.customerRecord = record;
    this.storage.get('SelectedCustomerData').then((val) => {
      
        if(val){
          this.addedtoCustomers = val;
          console.log(customerObj);
          
        //  this.addedtoCustomers.push(customerObj);
          this.storage.set('SelectedCustomerData', customerObj);
        }else{
          this.addedtoCustomers.push(customerObj);
          this.storage.set('SelectedCustomerData',customerObj);
        }
      });
  
      setTimeout(() => {
        console.log('Async operation has ended');
        this.navCtrl.pop();
      }, 100); 
  
  }
  else
  {
    this.navCtrl.push(CustomerdetailPage, {
      param1: record.links.self,
      param2: this.uName,
      param3: this.uPassword
    });
  }
 


}

clearKeys() {
  this.storage.remove('SelectedCustomerData').then(() => {
    console.log('Keys have been removed');
  });
}
}
