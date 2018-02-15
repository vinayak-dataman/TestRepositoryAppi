import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApicommonProvider } from '../../providers/apicommon/apicommon';
import { InventoryunitdetailPage } from '../inventoryunitdetail/inventoryunitdetail';

/**
 * Generated class for the InventoryitemdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-inventoryitemdetail',
  templateUrl: 'inventoryitemdetail.html',
})
export class InventoryitemdetailPage {

  prData: any;
  sellPrice: any;
  pData: any[];
  units: any=[];
  record: any;
  cdata: any=[];
  items: any=[];
  status: any;
  inventoryType: any;
  isLotNumberd: any;
  uName: any;
  uPassword: any;
  bcountryName: any;
  scountryName: any;
  serialized : any;
  allowBackorder: any;
  allowReturns: any;
  consumeBy: any;
  forgroundColor: any;
  backgroundColor: any;
  pricess: any=[];

  pricess_arr: Array<{uom: string, p_values: any}>;
  ind_pricess_arr: Array<{uom: string, p_values: string[]}>;
  sellPricess_arr: Array<{price_label: string, p_values: any}>;
  
  sellPricess: any=[];
  finalPricings: any=[];
  detailLink: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiCommon: ApicommonProvider) {
    this.detailLink = navParams.get('param1');
    this.uName = navParams.get('param2');
    this.uPassword = navParams.get('param3');

    
  }

  updateRecordUi(record)
  {
    if (record.type === "N") // checked status values
    {
      this.inventoryType = "Normal";
      
    }
    else if (record.type === "M") 
    {
      this.inventoryType = "Manufactured";
      
    }
    else if (record.type === "K") 
    {
      this.inventoryType = "Kit";
      
    }
    else if (record.type === "R") 
    {
      this.inventoryType = "Raw material";
      
    }
    else if (record.type === "V") 
    {
      this.inventoryType = "Non Physical";
      
    }


    if (record.lotNumbered  === true) 
    {
      this.isLotNumberd = "Yes";
      if(record.lotConsumeType == 0)
      {
        this.consumeBy = "User choice";
      }
      if(record.lotConsumeType ==1)
      {
        this.consumeBy = "Date received";
      }
      if(record.lotConsumeType == 2)
      {
        this.consumeBy = "Alpha Numeric Order";
      }
      if(record.lotConsumeType == 3)
      {
        this.consumeBy = "Expiration Date";
      }
      
    }
    else 
    {
      this.isLotNumberd = "";
      
    }




    if (record.allowBackorders === true) 
    {
      this.allowBackorder = "Yes";
      
    }
    else
    {
      this.allowBackorder = "No";
      
    }
  if (record.allowReturns === true) 
  {
    this.allowReturns = "Yes";
      
  }
  else
  {
    this.allowReturns = "No";
      
    }


    if (record.serialized === true) 
    {
      this.serialized = "Yes";
      
    }
    else 
    {
      
      this.serialized = "";
      
    }


    if (record.status == 0) 
    {
      this.status = "Active";
      
    }
    else if(record.status ==1) 
    {
      this.status = "On Hold";
      
    }
    else if (record.status == 2) 
    {
      this.status = "Inactive";
      
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
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryitemdetailPage');
    setTimeout(() => {
      console.log('Async operation has ended');
      // Get Order Items ....
      this.loadInventoryItemById();
    }, 100);
  }



  // pull to refresh ...
  doRefresh(refresher){
   
    this.loadInventoryItemById();
   setTimeout(() => {
    refresher.complete();
  }, 100); 
   
  }


  // load inventory data by id ...
  loadInventoryItemById()
  {
   
    this.finalPricings.length = 0;
    this.units.length = 0;
    this.pricess.length = 0;
    
    this.apiCommon.
    loadInventoryItemsDetailById(this.detailLink,this.uName,this.uPassword).
    then(data => {
      this.cdata = data;
      this.record = data;
      this.updateRecordUi(this.record);
      this.prData = data.pricing;
      let keyArr: any[] = Object.keys(this.cdata.pricing);
      
      keyArr.forEach((key: any) => {
        this.pricess_arr = [
         { uom: key, p_values: this.cdata.pricing[key]}];
          this.pricess.push(this.pricess_arr[0]);
      });


      setTimeout(() => {
        console.log('Async operation has ended');
        for(let p of this.pricess)
        {
          let prcess: any=[];
          for(let i=0;i<p.p_values.sellPrices.length;i++)
          {
            if(p.p_values.sellPrices[i] == 0)
            {

            }
            else{
              this.sellPricess_arr = [
                { price_label: 'Price'+(i+1), p_values: p.p_values.sellPrices[i]}];
              prcess.push(this.sellPricess_arr[0]);
            }
          }
          this.ind_pricess_arr = [
            { uom: p.uom, p_values: prcess}];
          this.finalPricings.push(this.ind_pricess_arr[0]);
             
        }

        let keyArr1: any[] = Object.keys(this.cdata.unitOfMeasures);
        keyArr1.forEach((key: any) => {
          let obj = {};
          obj = this.cdata.unitOfMeasures[key];
          this.units.push(obj);
          
        });
        
        for(let p of this.finalPricings)
        {
         
         if(p.uom === this.record.stockMeasureCode) 
         {
           this.sellPrice = p.p_values[0].p_values;
         
           break;
         }
        }
      }, 100);
       
     
      }).catch((error) => 
      {
  
        alert('Error getting companies'+JSON.stringify(error));
        
      });

     
      
      
      
  }



  // redirect to the nit detail page
  showUnitDetails(unit)
  {
    this.navCtrl.push(InventoryunitdetailPage, {
      param1: unit,
      param2: this.uName,
      param3: this.uPassword
    });
  }

  
  showPricingDetails(item)
  {

  }
}
