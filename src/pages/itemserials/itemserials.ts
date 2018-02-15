
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Component, ViewChild, Renderer } from '@angular/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ItemserialsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-itemserials',
  templateUrl: 'itemserials.html',
})
export class ItemserialsPage {

  serails :any= [];
  orderQty: number;
  checkedCount: number =0 ;
  selected_serials : any =[];
  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams,public renderer: Renderer, public viewCtrl: ViewController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'custom-popup', true);
    this.serails = navParams.get('param1');
    this.orderQty = parseInt(navParams.get('param2'));
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemserialsPage');
  }


  toggle(ev,item)
  {
    
  }


  // item checkbox events ...
  datachanged(e:any,item){
    console.log(e);
    console.log(e.checked);
    if(e.checked)
    {
      this.checkedCount++;
      
    }
    else
    {
      this.checkedCount--;
    }
    if(this.checkedCount > this.orderQty)
    {
      e.checked = false;
      
    }
    else
    {
      //e.checked = true;
      if(e.checked){
        let serials = {
          id: "",
          committedQty: ""
        };
        serials.id = item.id;
        serials.committedQty = "1";
        this.selected_serials.push(serials);
      }
      
    }
}


saveSerials()
{
  this.viewCtrl.dismiss(this.selected_serials);
}
}
