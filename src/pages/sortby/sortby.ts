import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SortbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-sortby',
  templateUrl: 'sortby.html',
})
export class SortbyPage {
   orderSort = {
    sortby: "",
    sortbyName: ""
  }
  sortsBy: any;
  selectedOption: string;
  
  ordersortByArr: string[] ;
  ordersortByFront: string[];
  isFrom: number;
  selectedIndex: number;
  sortByKey: any;
  limit: number=50;
  selectedSortBy: string="ASC";
  isPrimaryOrSecondary: any;
  sortoptionList: { pSort:{type:string; soryBy: string;sortedOrder: string}}[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) 
  {
    
    this.isFrom = this.navParams.get('param1');
    //this.isPrimaryOrSecondary = this.navParams.get('param2');
    
    if(this.isFrom == 1) // Order Sort Objects ..
    {
      this.ordersortByArr =  ["orderDate","invoiceDate","customer.customerNo","customer.name","orderNo"];
      this.ordersortByFront = ["Order Date","Invoice Date","Customer No","Customer Name","Order No"];
      this.storage.get('OrderSortBy').then((val) => 
      {
        this.sortsBy = val;
        if(this.sortsBy == null)
        {
          // do nothing
        
        }
        else
        {
          this.selectedIndex = this.sortsBy.pSort.selectedPosition;
          this.sortByKey = this.ordersortByFront[this.selectedIndex];
          this.selectedOption = this.ordersortByArr[this.selectedIndex];
          this.selectedSortBy = this.sortsBy.pSort.selectedSortBy;
          
        }
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
    }
    else if(this.isFrom == 2)  // Customer Sort Object ..
    {
      
      this.ordersortByArr =  ["customerNo","name"];
      this.ordersortByFront = ["Customer No","Customer Name"];
      this.storage.get('CustomerSortBy').then((val) => 
      {
        this.sortsBy = val;
        if(this.sortsBy == null)
        {
          // do nothing
        
        }
        else
        {
          this.selectedIndex = this.sortsBy.pSort.selectedPosition;
          this.sortByKey = this.ordersortByFront[this.selectedIndex];
          this.selectedOption = this.ordersortByArr[this.selectedIndex];
          this.selectedSortBy = this.sortsBy.pSort.selectedSortBy;
        }
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
    }
    else if(this.isFrom == 3)
    {
      this.ordersortByArr =  ["partNo","description","whse"];
      this.ordersortByFront = ["Part No","Description","Warehouse"];
      this.storage.get('InventorySortBy').then((val) => 
      {
        this.sortsBy = val;
        if(this.sortsBy == null)
        {
          // do nothing
        
        }
        else
        {
          this.selectedIndex = this.sortsBy.pSort.selectedPosition;
          this.sortByKey = this.ordersortByFront[this.selectedIndex];
          this.selectedOption = this.ordersortByArr[this.selectedIndex];
          this.selectedSortBy = this.sortsBy.pSort.selectedSortBy;
        }
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
    }

        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SortbyPage');
  }

  selectedAsc()
  {

  }
  selectedDesc()
  {

  }

  selectSortBy(index,m)
  {
    this.selectedIndex = index;
    this.selectedOption = this.ordersortByArr[index];
    this.sortByKey = m;
    // alert(this.sortByKey);
  }


  saveOption()
  {
    
    if(this.sortByKey == null)
    {
      // do nothing

    }
    else{

      let primarySort =
        {
          
            type: '',
            sortBy: "",
            sortedOrder: "",
            selectedPosition:-1,
            selectedSortBy: ""
        }
        
        let secondrySort =
        {
          
            type: '',
            sortBy: "",
            sortedOrder: ""
        }

        let fSort = {
          pSort: {}
         
        }

        
        if(this.isFrom == 3)
        {
          // if(this.isPrimaryOrSecondary === "p")
          // {
            primarySort.type = "I";
            primarySort.sortBy= this.selectedOption;
            primarySort.sortedOrder = this.selectedSortBy;
            primarySort.selectedPosition = this.selectedIndex;
            primarySort.selectedSortBy = this.selectedSortBy;
            if(this.selectedSortBy === "DESC")
            {
              primarySort.sortBy= "-"+this.selectedOption;
            }

            fSort.pSort = primarySort;

            this.storage.set('InventorySortBy',fSort);
            
        }
        if(this.isFrom == 2)
        {
          // if(this.isPrimaryOrSecondary === "p")
          // {
            primarySort.type = "C";
            primarySort.sortBy= this.selectedOption;
            primarySort.sortedOrder = this.selectedSortBy;
            primarySort.selectedPosition = this.selectedIndex;
            primarySort.selectedSortBy = this.selectedSortBy;
            if(this.selectedSortBy === "DESC")
            {
              primarySort.sortBy= "-"+this.selectedOption;
            }

            fSort.pSort = primarySort;

            this.storage.set('CustomerSortBy',fSort);
            
        }
        if(this.isFrom == 1)
        {
            primarySort.type = "O";
            primarySort.sortBy= this.selectedOption;
            primarySort.sortedOrder = this.selectedSortBy;
            primarySort.selectedPosition = this.selectedIndex;
            primarySort.selectedSortBy = this.selectedSortBy;
            if(this.selectedSortBy === "DESC")
            {
              primarySort.sortBy= "-"+this.selectedOption;
            }

            fSort.pSort = primarySort;
            this.storage.set('OrderSortBy',fSort);
          
          
        }
        
       
    }
    if(this.isFrom == 1)
    {
      this.storage.set('savedLimitInOrder', this.limit);
    }
    if(this.isFrom == 2)
    {
      this.storage.set('savedLimitInCustomer', this.limit);
    }
    if(this.isFrom == 3)
    {
      this.storage.set('savedLimitInInventory', this.limit);
    }
    this.navCtrl.pop();
  }


}
