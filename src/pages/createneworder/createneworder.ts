import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { CustomersPage } from '../customers/customers';
import { setTimeout } from 'timers';
import { Storage } from '@ionic/storage';
import { OrderitemsProvider } from '../../providers/orderitems/orderitems';
import { ApicommonProvider } from '../../providers/apicommon/apicommon';
import { emitKeypressEvents } from 'readline';
import { InventoryPage } from '../inventory/inventory';
import { Http,  Headers, RequestOptions } from '@angular/http';
import { OrderdetailsPage } from '../orderdetails/orderdetails';
import { ItemserialsPage } from '../itemserials/itemserials';
import { AlertInputOptions } from 'ionic-angular/components/alert/alert-options';
/**
 * Generated class for the CreateneworderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-createneworder',
  templateUrl: 'createneworder.html',
})
export class CreateneworderPage {
  addtoInventories: any=[];
  customerObj: any;
  data: any;
  ship_address: any=[];
  record: any;
  test: any;
  item: any;
  options;
  headers: Headers = new Headers();
  selectedShipId: string="Select Ship-to Address";
  address: any=[];
  address_country: any;
  ship_country: any;
  cdata: any=[];
  customerName: string= "Select Customer";
  customerNo: any;
  addedCustomerList: string[];
  customerPO: any;
  referenceNo: any;
  uName: any;
  uPassword: any;
  orderType: any;
  shipids: any=[];
  selectedShipAddress: any;
  isShip: any;
  isShipSelected: any;
  shipStreetAddress: any=[];
  streetAddress: any;
  addedInventorisList: any[];
  selectedCustomerId: any;
  postshipId: any;
  pricess_arr: Array<{uom: string, p_values: any}>;
  postItems: any=[];
  companyName = "";
  companyUrl = "";
  isSeriealised: any=false;
  constructor(public modalCtrl: ModalController,public http: Http,public alertCtrl: AlertController, public apiCommon: ApicommonProvider,public orderDetailProvider: OrderitemsProvider, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
   
    this.orderType = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');
    this.storage.get('SelectedCompany').then((val) => {
      console.log("Val in home"+val);
        this.companyName = val.companyTitle;
        this.companyUrl = val.companyUrl;
      
     });
  }

  selectShipAddress(shipaddress)
  {
    
    let alert1 = this.alertCtrl.create();
    alert1.setTitle('Select Ship-to Address');
    this.shipids.length = 0;
    
    // Add the new colors here!
    
for(let m of this.ship_address)
{
  this.shipids.push(m.shipId);
}


    this.ship_address.forEach(data => {
        alert1.addInput({
            type: 'radio',
            label: data.shipId,
            value: data
            
        });
    });

    // ...

    alert1.addButton('Cancel');
    alert1.addButton({
        text: 'Ok',
        handler: data => {
            // ...
            this.selectedShipId = data.shipId;
            
            this.selectedShipAddress = data;
            this.isShipSelected = "yes";
          
            if(this.selectedShipAddress.streetAddress === "")
            {
                this.streetAddress = "";
            }
            else{
              this.streetAddress = "sdsd";
              this.shipStreetAddress = this.selectedShipAddress.streetAddress.split("\n");
            }


            this.ship_country = this.record.address.country;
            // Permform Country Translation ....
          this.orderDetailProvider.
          getCountryNameFromCode().
          then(data => {
             this.cdata = data;
            
            
             // Billing Address country name translation... 
             for(let data of this.cdata) 
             {
              
               if(data.alpha3.toUpperCase() === this.ship_country)
               {
      
                 this.ship_country = data.name;
                 break;
      
               }
             }
         
           
         
            
            }).catch((error) => 
            {
        
              alert('Error getting companies'+JSON.stringify(error));
              
            });


        }
    });

    alert1.present();
}

  


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateneworderPage');
    
    this.clearKeys();
    
  }


  onBack()
  {
    this.navCtrl.pop();
  }

 

  onSelectCustomer()
  {
              
  this.selectedShipAddress = "";
  this.isShipSelected = "";
    this.ship_address.length = 0;
    this.shipids.length = 0;
    this.isShip="";
    this.selectedShipId = "Select Ship-to Address";
    this.ship_country = "";
    this.shipStreetAddress.length = 0;
    this.streetAddress = "";
    this.isShip = "";
    this.navCtrl.push(CustomersPage,{
     // callback: this.myCallbackFunction,
      param2: 1
    });
  }

  clearKeys() {
    this.storage.remove('SelectedCustomerData').then(() => {
      console.log('Keys have been removed');
    });
   
    this.storage.remove('SelectedInventoryData').then(() => {
      console.log('Keys have been removed');
    });
  }

ionViewWillEnter()
{
  this.storage.get('SelectedCustomerData').then((val) => 
    {
      console.log("Val in home"+val);
      this.addedCustomerList = val;
     // alert("sds " +JSON.stringify(this.addedCustomerList));
      if(this.addedCustomerList == null)
      {

      }
      else
      {
        this.customerObj  = this.addedCustomerList;
        this.record = this.customerObj.customerRecord;
        this.selectedCustomerId = this.record.id;
        this.customerName = this.record.name;
        this.customerNo = this.record.customerNo;
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
   
       setTimeout(() => {
        console.log('Async operation has ended');
        this.loadCustomersItem(this.record.links.self);
      }, 40);
   
      
      }).catch((error) => 
      {
  
        alert('Error getting companies'+JSON.stringify(error));
        
      });

     
    
     
      }
    });
    

    this.storage.get("SelectedInventoryData").then((val) => {
      console.log("val in company page");
      this.addedInventorisList = val;
      
      
    });
  
    
}


loadCustomersItem(detailLink)
{
  // customer user detail by id ... 
  
  this.apiCommon.loadCustomerDatabyId(detailLink,this.uName,this.uPassword).
  then(data => 
  {
    this.data = data;
    this.ship_address = this.data.shippingAddresses;
  
    if(this.ship_address.length == 0)
    {
        this.isShip = "";
    }
    else
    {
        this.isShip = "yes";
    }
    }).catch((error) => 
    {
      alert('Error getting companies'+JSON.stringify(error));
    });
}


// Add new item
addNewItem()
{
  this.navCtrl.push(InventoryPage,{
    // callback: this.myCallbackFunction,
     param2: 1
   });
}
decrement(item,index){
  
  if(item.orderQty > 0) {
    item.orderQty--;
   this.updatedOrderQtyForItem(item.orderQty,index);
  }
}

increment(item,index){
  
  item.orderQty++;
  this.updatedOrderQtyForItem(item.orderQty,index);
}


updatedOrderQtyForItem(qty,i)
{
  let str: any;
  str = this.addedInventorisList[i];
  str.orderQty = qty;

     // Modify just that property
    //  value.orderQty = qty;

    //  // Save the entire data again
    
     this.storage.set('SelectedInventoryData', this.addedInventorisList);

}

getQty(ev: any,item,index)
{
  
  let val = ev._value;
  item.orderQty = val;
 this.updatedOrderQtyForItem(item.orderQty,index);
}


saveOrder()
{
  if(this.customerName === "Select Customer")
  {
    alert("Please select customer");
    return;
  }

  
  this.postItems.length = 0;
  let customer = {
    id: ""+this.selectedCustomerId+""
  }

  if(this.selectedShipId === "Select Ship-to Address")
  {
    this.postshipId = "";
  }
  else
  {
    this.postshipId = this.selectedShipId;
  }
  let shipaddress = {
    shipId: this.postshipId
  }
  
  
  for(this.item of this.addedInventorisList)
  {
    let InventoryObject = {
      id: "",
       
    };
    
    let pInventry={
      inventory: {},
      orderQty: "",
      committedQty:"",
      serials: []
    }
        InventoryObject.id = this.item.id;
        pInventry.inventory = InventoryObject;
        pInventry.orderQty = ""+this.item.orderQty+"";
        pInventry.committedQty = "1";
        pInventry.serials = this.item.selectedSerials;
        this.postItems.push(pInventry);
  }


  

  let pdata = 
  {  
    customer: customer,
    customerPO: this.customerPO,
    referenceNo: this.referenceNo,
    type: this.orderType,
    shippingAddress: shipaddress,
    items:this.postItems
  };
 
  
  var headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(this.uName+":"+this.uPassword));
  headers.append('Content-Type', 'application/json' );
  
  
  let options = new RequestOptions({ headers: headers });
  this.http.post("https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/sales/orders/", pdata, options).map(res => {
  //  console.log(res.headers); // Print http header
  
   var loc = res.headers.get("Location");
   this.loadCompanySalesOrderItems(loc);
  //  alert(loc);

    return res;
}).subscribe(res => {
    console.log(res);
    this.data = res;
  
} , error => {
  console.log(error);// Error getting the data
  
  this.doAlert(error.json().message);
});


 
  
}


  // Show Commont alert messages
  doAlert(message: string) {
    
    let alert = this.alertCtrl.create({
    
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}
orderCreatedAlert(orderNo: string,location: string) {

   
  let alert = this.alertCtrl.create({
      
      subTitle: "Order No "+orderNo+" successfully saved",
      
  });
  alert.addButton({
    
    text: 'View',
    handler: data => {
      this.clearAllFields();
      this.navCtrl.push(OrderdetailsPage, {
        param1: location,
        param2: this.uName,
        param3: this.uPassword,
        
      });
    }
  });
  alert.present();
}


clearAllFields(){
  this.referenceNo = "";
  this.customerPO = "";
  this.addedCustomerList.length = 0;
  this.selectedShipAddress = "";
  this.isShipSelected = "";
    this.ship_address.length = 0;
    this.shipids.length = 0;
    this.isShip="";
    this.selectedShipId = "Select Ship-to Address";
    this.ship_country = "";
    this.shipStreetAddress.length = 0;
    this.streetAddress = "";
    this.isShip = "";
    this.storage.remove('SelectedCustomerData').then(() => {
      console.log('Keys have been removed');
    });
   
    this.storage.remove('SelectedInventoryData').then(() => {
      console.log('Keys have been removed');
    });
    this.customerObj  = "";
    this.record = "";
    this.selectedCustomerId = "";
    this.customerName = "Select Customer";
    this.customerNo = "";
    this.address.length = 0;
    this.address_country="";
}

removeItem(item){
  let index = this.addedInventorisList.indexOf(item);

  if(index > -1){
    this.addedInventorisList.splice(index, 1);
  }
  this.storage.set('SelectedInventoryData', this.addedInventorisList);
}


loadCompanySalesOrderItems(location)
{
    
  this.orderDetailProvider.
  load(location,this.uName,this.uPassword).
  then(data => {
    this.record = data;
    
  this.orderCreatedAlert(this.record.orderNo,location);
     
   
    }).catch((error) => 
    {

      alert('Error getting companies'+JSON.stringify(error));
      
    });
}


addNewItemByCode()
{
  this.presentPrompt();
}


presentPrompt() {
  let alert = this.alertCtrl.create({
    
    inputs: [
      {
        name: 'upcNumber',
        placeholder: 'UPC'
      }
     
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'OK',
        handler: data => {
          if(data.upcNumber == null)
          {
            this.doAlert("Please enter UPC Number");
          }
          else
          {
           this.getinventoryFromUPC(data.upcNumber);
          }
      
        }
      }
    ]
  });
  alert.present();
}


getinventoryFromUPC(upcNumber)
{
  this.apiCommon.getInventoryFromUPC(this.companyUrl+"inventory/upcs/?filter={\"upc\":\""+upcNumber+"\"}",this.uName,this.uPassword).then(data => 
    {
      this.data = data;
      
      let records=[];
      records = this.data.records;
      if(records.length > 0)
      {
        this.addtoinventoryFromUPCAPI(records[0].inventory);
      }
      else
      {
        this.doAlert("UPC not found");
      }

      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
      });
}


addtoinventoryFromUPCAPI(record)
{
 // alert(JSON.stringify(record));
  let InventoryObject = {
    "id": "",
   "whse" : "",
   "partNo": "",
   "description": "",
    "orderQty": 1
  };

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

     setTimeout(() => {
      this.showInvetories();
     }, 50);
        

    });
}


showInvetories(){
  //alert("call");

  this.storage.get("SelectedInventoryData").then((val) => {
    console.log("val in company page");
    
    this.addedInventorisList = val;
    //alert(JSON.stringify(this.addedInventorisList));
    
  });
}

showSerails(item,i)
{
  alert(i);
  let chooseModal = this.modalCtrl.create(ItemserialsPage,{param1:item.serials,param2:item.orderQty});
  chooseModal.onDidDismiss(data => {
    console.log(data);
    alert(JSON.stringify(data));
    if(data ==null)
    {
      
    }
    else
    {
      this.updatedSerialForItem(data,i);
    }
 
  });
  chooseModal.present();
  // this.showCheckbox(item.serials);
}


showCheckbox(serials) {
 
 
  let alert = this.alertCtrl.create();
  alert.setTitle('Serial Numbers');

  serials.forEach(data => {
    alert.addInput({
      type: 'checkbox',
      label: data.serialNumber,
      value: data.serialNumber,
       handler: optionHandler 
    });
});


  alert.addButton('Cancel');
  alert.addButton({
    text: 'Okay',
    handler: data => {
      console.log('Checkbox data:', data);
   
    }
  });
  alert.present();


  let optionHandler = (data : AlertInputOptions) => {
    let countChecked = alert.data.inputs.filter((option : AlertInputOptions) => {
        return option.checked;
    }).length;

    alert.data.inputs.forEach((option : AlertInputOptions) => {
        option.disabled = !option.checked && countChecked >= 5;
    });
};

}


updatedSerialForItem(data,i)
{
  let str: any;
  str = this.addedInventorisList[i];
  str.selectedSerials = data;

     // Modify just that property
    //  value.orderQty = qty;

    //  // Save the entire data again
    
     this.storage.set('SelectedInventoryData', this.addedInventorisList);

}
}
