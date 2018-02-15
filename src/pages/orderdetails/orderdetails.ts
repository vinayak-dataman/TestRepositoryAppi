import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { OrderitemsProvider } from '../../providers/orderitems/orderitems';
import { ItemdetailPage } from '../itemdetail/itemdetail';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { SignaurePage } from '../signaure/signaure';


// @IonicPage()
@Component({
  selector: 'page-orderdetails',
  templateUrl: 'orderdetails.html',
})
export class OrderdetailsPage{
  record: any;
  detailLink: any;
  cdata: any=[];
  items: string[];
  status: any;
  orderType: any;
  hold: any;
  uName: any;
  uPassword: any;
  bcountryName: any;
  scountryName: any;
  billingAddress: any;
  shippingAddress: any;
  b_addresses_lines: any=[];
  s_addresses_lines: any=[]; 
  companyName = "";
  companyUrl = "";
  userSign: string="";
  sign:any;
  constructor(public modalCtrl: ModalController,public platform:Platform, public printer: Printer,public navCtrl: NavController, public navParams: NavParams, public orderDetailProvider: OrderitemsProvider,public storage: Storage ) 
  {
    
    this.storage.get('SelectedCompany').then((val) => {
      console.log("Val in home"+val);
        this.companyName = val.companyTitle;
        this.companyUrl = val.companyUrl;
      
     });
    this.detailLink = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');
  }


  

  updateOtherInfo()
  {
    if (this.record.status === "O") // checked status values
    {
      this.status = "Open";
      
    }
    else if (this.record.status === "P") 
    {
      this.status = "Processed";
      
    }
    else if (this.record.status === "S") 
    {

      this.status = "Shipped";
      
    }
    else if (this.record.status === "L") 
    {
      this.status = "Deposit";
      
    }
    else if (this.record.status === "C") 
    {
      this.status = "Closed";
    }


    // Order Type values 

    if (this.record.type === "O") 
    {
      this.orderType = "Sales Order";
    }
    else if (this.record.type === "Q") 
    {
      this.orderType = "Quote";
    }
    else if (this.record.type === "S") 
    {
      this.orderType = "Standing";
    }
    else if (this.record.type === "W") 
    {
      this.orderType = "Work Order";
    }
    else if (this.record.type === "R") 
    {
      this.orderType = "RMA";
    }

    // On Hold Values ..
    if (this.record.hold === "false") 
    {
      this.hold = "No";
    }
    else
    {
      this.hold = "Yes";
    }

    this.b_addresses_lines = this.record.address.streetAddress.split("\n");
    this.s_addresses_lines = this.record.shippingAddress.streetAddress.split("\n");
    this.bcountryName = this.record.address.country;
    this.scountryName = this.record.shippingAddress.country;

    this.orderDetailProvider.getCountryNameFromCode().
    then(data => {
       this.cdata = data;
        
       // Billing Address country name translation... 
       for(let data of this.cdata) {
        
         if(data.alpha3.toUpperCase() === this.bcountryName)
         {
           this.bcountryName = data.name;
           break;
         }
       }
   
      // shipping country name translation
       for(let data of this.cdata) {
         if(data.alpha3.toUpperCase() === this.scountryName)
         {
           this.scountryName = data.name;
           break;
         }
       }
   
      
      }).catch((error) => 
      {
        alert('Error getting companies'+JSON.stringify(error));
   
      });



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailsPage');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      // Get Order Items ....
      this.loadCompanySalesOrderItems();
    }, 40);


    
     
  }


  // Order detail by Id

  loadCompanySalesOrderItems()
  {
      
    this.orderDetailProvider.
    load(this.detailLink,this.uName,this.uPassword).
    then(data => {
      this.record = data;
       this.items = data.items;
      
       
      this.updateOtherInfo();
      }).catch((error) => 
      {
  
        alert('Error getting companies'+JSON.stringify(error));
        
      });
  }


  // Redirect to the Item Detail page ... 
  showOrderItemDetails(item)
  {
    this.navCtrl.push(ItemdetailPage, {
      param1: item,
      param2: this.uName, // passing Params to next page ...
      param3: this.uPassword
    });
  }
  

// Pull to refresh ...
  doRefresh(refresher){
    
   this.loadCompanySalesOrderItems();
   setTimeout(() => {
    refresher.complete();
  }, 100); 
   
  }


// Print Order Invoice

print(){
  let options: PrintOptions = {
    name: 'MyDocument',
    duplex: true,
    landscape: true,
    grayscale: true
  };
  var preTax = "<tr><td align='left'><b>Net Amount</b></td><td align='right' style='padding-right:5px'>"+parseFloat(this.record.subtotal.toString()).toFixed(2).toString()+"</td></tr><tr><td align='left'><b>Freight</b></td><td align='right' style='padding-right:5px'>"+parseFloat(this.record.freight.toString()).toFixed(2).toString()+"</td></tr>";
  let taxes ="<table style='width: 100%;border-right-color:white;border-left-color:white;border-bottom-color:white;  table-layout: fixed;border-top: 0;'  cellspacing='0'><tr><td colspan='9'>"+
  "<table style='width: 100%;  table-layout: fixed;' cellspacing='0'><tr><td align='left'>"+this.userSign+"</td><td align='left'></td></tr></table>"+
  "<td colspan='3'><table style='width: 100%;  table-layout: fixed;' cellspacing='0'>"+preTax;
  
  for(let tax of this.record.taxes){
    if(tax.code != 0)
    {
      var retailPrice = tax.total;
    var taxTotal = parseFloat(retailPrice.toString()).toFixed(2).toString();
      var taxstr = "<tr><td align='left'><b>"+tax.name+"</b></td><td align='right' style='padding-right:5px'>"+taxTotal+"</td></tr>";
      taxes = taxes+taxstr;
    }
  }
  taxes = taxes+"<tr><td align='left'><b>Total Due</b></td><td align='right' style='padding-right:5px'>"+parseFloat(this.record.total.toString()).toFixed(2).toString();+"</td></tr>";
  taxes = taxes+" </table></td></tr></table>"
  
  let itemsString = "";
  for(let item of this.record.items)
  {
    var str = "<div>"+ item.description+"</div><br/>"+item.orderQty +" @ "+item.retailPrice+"<div>";
    itemsString = itemsString+str+"<br/>"
  }
  this.printer.pick();
  this.platform.ready().then(success =>{
    var headerPart = this.headerSection();
    var adresssection = this.addressSectionForPrint();
    var tabheaderpart = this.itemsSectionHeaderPart();
    var headerbeforeitem = this.addheaderBeforeItems();
    var userSigns = this.setSignatureInPrint();
    
  let page = "<html><body>"+headerPart+ "<br/>"+adresssection+" "+headerbeforeitem+""+tabheaderpart+" "+taxes+"</body></html>";
  console.log("Hi testing "+page);
  this.printer.print(page).then(function()
  {
   // alert("Order sent to printer");
  },
  function()
  {
     alert("Error while printing!");
  });

  },
  error=>{
    alert('Platform Not Ready'+error);
  });
}

headerSection()
{
 
  var datePipe = new DatePipe('en-US');
  var setDob = datePipe.transform(this.record.orderDate, 'MMM dd, yyyy');  
  
  var headers = "<table style='width:100%'><tr><td align='left'>"+
  "<h2>"+this.companyName+"</h2></td><td align='right' >"+
  "<table style='width=100%'><tr><td colspan='2' align='center'><h2>Sales Order</h2>"+this.record.orderNo+""+
  "</td></tr><tr><td align='left'><b>Date: </b></td><td align='left'>&nbsp;"+setDob+"</td></tr><tr><td align='left'><b>Customer: </b></td>"+
  "<td align='left'>"+this.record.customer.customerNo+"</td></tr></table></td></tr></table>";
  
  return headers;
}
addressSectionForPrint()
{
  var address = "<table style='width:100%'><tr><td align='left'><table><tr><td valign='top'><b>Bill To:</b></td><td><div> "+this.record.address.name+"<br/>"+this.record.address.streetAddress+"<br/>"+this.record.address.city+" "+this.record.address.provState+
  "&nbsp;"+this.record.address.postalCode+"<br/>"+this.bcountryName+"</div></td></tr></table></td><td align='right'><table><tr><td valign='top'><b>Ship To:</b></td><td><div> "+this.record.shippingAddress.name+"<br/>"+this.record.shippingAddress.streetAddress+"<br/>"+this.record.shippingAddress.city+" "+this.record.shippingAddress.provState+
  "&nbsp;"+this.record.shippingAddress.postalCode+"<br/>"+this.scountryName+"</div></td></tr></table></td></tr></table>";
  return address;

}


itemsSectionHeaderPart()
{

var itemstr= "<table style='width: 100%; border-right-color:white;border-left-color:white; table-layout: fixed; margin-top: 10px;border-bottom: 0;border-right-color:white;border-bottom-color:white' border='1' bordercolor='#d7d7d7' cellspacing='0'>"+
"<tr><td colspan='6'><table style='width: 100%;  table-layout: fixed; border-right-color:white; border-left-color:white' cellspacing='0'>"+
  "<tr><td colspan='2'><b>Part No</b></td><td align='left' colspan='4'><b>Description</b></td></tr></table>"+
  "</td><td colspan='3'><table style='width: 100%; table-layout: fixed;'cellspacing='0'>"+
  "<tr><td align='center'><b>Ordered&nbsp;</b></td><td align='right'><b>&nbsp;Shipped</b></td><td align='right'><b>B/O</b></td></tr></table></td>"+
  "<td colspan='3'><table style='width: 100%;  table-layout: fixed;'cellspacing='0'><tr style='border:1px;bordercolor='#d7d7d7'; solid blue;'>"+
  "<td align='center'><b>Retail<br/> Price</b></td><td align='right' style='padding-right:5px'><b>Extended Price</b></td></tr></table></td></tr></table>";

var itemPartstr = "<table style='width: 100%;border-right-color:white;border-left-color:white;  table-layout: fixed;' border='1' bordercolor='#d7d7d7' cellspacing='0'>";  
var itemsString = "<tr><td colspan='6'><table style='width: 100%;  table-layout: fixed;' cellspacing='0'>";
for(let item of this.record.items)
{
  var str =  "<tr><td colspan='2'>"+item.partNo+"</td><td align='left' colspan='4'>"+item.description+"</td></tr>";
  itemsString = itemsString+str;
}
  itemsString= itemsString+"</table></td>";
  var itemOtherDetailPart = "<td colspan='3'><table style='width: 100%;  table-layout: fixed;'cellspacing='0'>";
  for(let item of this.record.items)
  {
   
    var str =  "<tr><td align='right'>"+item.orderQty+"</td><td align='right'>"+item.committedQty+"</td><td align='right'>"+item.backorderQty+"</td></tr>";
    itemOtherDetailPart = itemOtherDetailPart+str;
  } 
  itemOtherDetailPart = itemOtherDetailPart+"</table></td>";
  var lastsectionPart = "<td colspan='3'><table style='width: 100%;  table-layout: fixed;'cellspacing='0'>";
  for(let item of this.record.items)
  {

    var retailPrice = item.retailPrice;
    var formedRetailPrice = parseFloat(retailPrice.toString()).toFixed(2).toString();
    var extPrice = item.extendedPriceOrdered;
    var formedExtendPrice = parseFloat(extPrice.toString()).toFixed(2).toString();
    var str =  "<tr><td align='right' style='padding-right: 10px'>"+formedRetailPrice+"</td><td  style='padding-right: 5px' align='right'>"+formedExtendPrice+"</td></tr>";
    lastsectionPart = lastsectionPart+str;
  } 
  
  itemPartstr = itemstr+itemPartstr+itemsString+ itemOtherDetailPart+lastsectionPart+"</table></td></tr></table>";
  return itemPartstr;
}


addheaderBeforeItems()
{
  var datePipe = new DatePipe('en-US');
  var setDob = datePipe.transform(this.record.orderDate, 'MMM dd, yyyy');  
  var headerPart =  "<br/><table style='width: 100%;  table-layout: fixed;border-right-color:white;border-left-color:white;' border='1px'; bordercolor='#d7d7d7' cellspacing='0'><tr><th>PO Number</th>"+
  "<th>Territory</th><th>Sales Person</th></tr><tr>"+
  "<td align='center'>"+this.record.customerPO+"&nbsp;</td><td align='center'>"+this.record.address.territory.description+"</td><td align='center'>"+this.record.address.salesperson.name+"</td></tr></table>";
  return headerPart;
}

setSignatureInPrint()
{
  let sign: any;
  let userSign: any;
  this.storage.get('savedSignature').then((val) => {
    console.log("Val in home"+val);
   
   return userSign;
  }

 
);


 
}

ionViewWillEnter()
{
  
 
  this.storage.get('savedSignature').then((val) => 
  {
    console.log("Val in home"+val);
    if(val == null)
    {
      this.userSign = "";
    }
    else
    {
      this.sign = val;
   
      this.userSign = "<img src='"+this.sign+"' alt='sign'>";
    }
 
   
  });
}



// Add user signature to print on order ...
onAddSignature()
{
  
  let chooseModal = this.modalCtrl.create(SignaurePage);
   chooseModal.onDidDismiss(data => {
     console.log(data);
     if(data ==null)
     {
        this.userSign = "";
     }
     else
     {
      this.sign = data;
   
      this.userSign = "<img src='"+this.sign+"' alt='sign'>";
     }
  
   });
   chooseModal.present();
}

}
