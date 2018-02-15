import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ApicommonProvider } from '../../providers/apicommon/apicommon';
import { InventoryitemdetailPage } from '../inventoryitemdetail/inventoryitemdetail';

import { SortbyPage } from '../sortby/sortby';
/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  addtoInventories: any=[];
  limit: any = 50;
  uName: any;
  uPassword: any;
  searchTerm: string;
  records: string[];
  public toggled: boolean = false;
  public hasMoreData: boolean = true;
  key: number=0;
  sortsBy: any;
  sortKey: any;
  sort = "";
  companyName:any;
  companyUrl:any;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public apiCommon: ApicommonProvider) {
 
    this.key = navParams.get("param2");
    this.storage.get('SelectedCompany').then((val) => {
      console.log("Val in home"+val);
        this.companyName = val.companyTitle;
        this.companyUrl = val.companyUrl;
      
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');

    // Getting Authoniticated User Name/Password from storage
    this.storage.get('ApiAuthData').then((val) => {
      console.log("Val in home"+val);
      this.uName = val.Username;
      this.uPassword = val.Password;
    
    });
    // console.log('ionViewDidLoad DisplaycompanyorderPage');
    // setTimeout(() => {
    //   console.log('Async operation has ended');
    //   this.loadInventoryItem(this.limit); 
    // }, 100); 

  }



  ionViewWillEnter()
  {
  
    this.storage.get('ApiAuthData').then((val) => {
      console.log("Val in home"+val);
      this.uName = val.Username;
      this.uPassword = val.Password;
   
    });
   
    this.storage.get('savedLimitInInventory').then((val)=>{
      if(val == null)
      {
        this.limit= 50;
      }
      else
      {
        this.limit = val;
      }
    });

    this.storage.get('InventorySortBy').then((val) => 
    {
      this.sortsBy = val;
      if(this.sortsBy == null)
      {
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
        this.loadInventoryItem(this.limit,this.sortKey); 
      }, 100); 
     
    }
  );
 
   
  }




  // Get Inventories Items
loadInventoryItem(limit,sortbykey)
{
  if(sortbykey === "")
  {
    this.sort = "";
  }
  else
  {
    this.sort = "&sort="+sortbykey;
  }

  
  this.apiCommon.
  loadInventoryItems(limit+this.sort,this.uName,this.uPassword).
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


// Function to get more data on scroll ...
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
    this.loadInventoryItem(this.limit,this.sortKey); 
  }
}


// Redirect to the Detail Page...
showInventoryDetail(record)
{
 
  if(this.key == 1)
  {
    
    let InventoryObject = {
      "id": "",
     "whse" : "", 
     "partNo": "",
     "description": "",
      "orderQty": 1,
      "serials":[],
      "selectedSerials":[]
    };
    InventoryObject.id = record.id;
    InventoryObject.whse = record.whse;
    InventoryObject.partNo = record.partNo;
    InventoryObject.description = record.description;
    InventoryObject.orderQty = 1;

    // this.storage.get('SelectedInventoryData').then((val) => {
      
    //     if(val)
    //     {
    //       this.addtoInventories = val;
    //       console.log(InventoryObject);
    //       this.addtoInventories.push(InventoryObject);
    //       this.storage.set('SelectedInventoryData', this.addtoInventories);
    //     }
    //     else
    //     {
    //       this.addtoInventories.push(InventoryObject);
    //       this.storage.set('SelectedInventoryData',this.addtoInventories);
    //    }
    //   });

      this.apiCommon.loadInventoryItemsDetailById(record.links.self,this.uName,this.uPassword).then(data => 
      {
          this.data = data;
          if(this.data.lotNumbered == true || this.data.serialized == true)
          {
            this.getAllSerials(this.data.id,record);
          }
          else
          {
            InventoryObject.id = record.id;
            InventoryObject.whse = record.whse;
            InventoryObject.partNo = record.partNo;
            InventoryObject.description = record.description;
            InventoryObject.orderQty = 1;

            this.storage.get('SelectedInventoryData').then((val) => {
                  
                    if(val)
                    {
                      this.addtoInventories = val;
                      console.log(InventoryObject);
                      this.addtoInventories.push(InventoryObject);
                      this.storage.set('SelectedInventoryData', this.addtoInventories);
                    }
                    else
                    {
                      this.addtoInventories.push(InventoryObject);
                      this.storage.set('SelectedInventoryData',this.addtoInventories);
                  }
                  });

                  setTimeout(() => {
                    console.log('Async operation has ended');
                    this.navCtrl.pop();
                  }, 100); 

          }
          
          
          }).catch((error) => 
          {
            alert('Error getting companies'+JSON.stringify(error));
          });
      
     
  
  }
  else
  {
    this.navCtrl.push(InventoryitemdetailPage, {
      param1: record.links.self,
      param2: this.uName,
      param3: this.uPassword
    });
  }
  



 
}

setting()
{
 this.navCtrl.push(SortbyPage, {
   param1: 3,

 });
}


// pull to refresh ...  
doRefresh(refresher){
  this.limit=50;
  this.loadInventoryItem(this.limit,this.sortKey); 
 setTimeout(() => {
  refresher.complete();
}, 100); 
 
}
// Search ICON toggle
public toggle(): void {
  this.toggled = this.toggled ? false : true;
}

// hide search ...
onSearchCancel()
 {
   this.toggle();
   this.loadInventoryItem(this.limit,this.sortKey); 
 }

 
 // search inventoriess ...
 searchWithKeyword()
 {
    setTimeout(() => {
    this.apiCommon.
    loadsearchedInventoryItem(this.searchTerm,this.uName,this.uPassword).
    then(data => 
    {
      this.records = data.records;
      
      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
      });
  },500);
 
 }



 getAllSerials(id,record)
 {

  let InventoryObject = {
    "id": "",
   "whse" : "", 
   "partNo": "",
   "description": "",
    "orderQty": 1,
    "serials":[]
    ,"selectedSerials":[]
  };
  InventoryObject.id = record.id;
  InventoryObject.whse = record.whse;
  InventoryObject.partNo = record.partNo;
  InventoryObject.description = record.description;
  InventoryObject.orderQty = 1;


   this.apiCommon.getInventorySerials(this.companyUrl+"inventory/items/"+id+"/serials/?filter={\"hold\":\"false\",\"closed\":\"false\"}",this.uName,this.uPassword).then
   (data => 
   {
     
     InventoryObject.serials = data.records;
     this.storage.get('SelectedInventoryData').then((val) => {
                  
      if(val)
      {
        this.addtoInventories = val;
        console.log(InventoryObject);
        this.addtoInventories.push(InventoryObject);
        this.storage.set('SelectedInventoryData', this.addtoInventories);
      }
      else
      {
        this.addtoInventories.push(InventoryObject);
        this.storage.set('SelectedInventoryData',this.addtoInventories);
    }
    });

      setTimeout(() => {
        console.log('Async operation has ended');
        this.navCtrl.pop();
      }, 100); 
     }).catch((error) => 
     {
       alert('Error getting companies'+JSON.stringify(error));
     });
 }

}
