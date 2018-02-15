import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

import { GetcompaniesProvider } from '../../providers/getcompanies/getcompanies';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddcompaniesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
selector: 'page-addcompanies',
templateUrl: 'addcompanies.html',
})

export class AddcompaniesPage {

companies: string[];
companyApiUrl: string;

addedtoCompanies: any[]=[];
title: any;


constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
  public menuCtrl: MenuController, public loadcomapnies: GetcompaniesProvider) 
  {
  
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad AddcompaniesPage');
}




// Save the company .....
addtomycompany(description,url)
{
  
  let companyObj = {
    "title": "",
    "companyUrl": ""
  };
  
  companyObj.title = description;
  companyObj.companyUrl = url;
  this.storage.get('CompanyDetails').then((val) => {
    
      if(val){
        this.addedtoCompanies = val;
        console.log(companyObj);
       // alert(companyObj.title);
        this.addedtoCompanies.push(companyObj);
        this.storage.set('CompanyDetails', this.addedtoCompanies);
      }else{
        this.addedtoCompanies.push(companyObj);
        this.storage.set('CompanyDetails', this.addedtoCompanies);
      }

      // showed company Added Alerts...
      let alert = this.alertCtrl.create({
      
        subTitle: "Company "+companyObj.title+" has been added to Appi4 Spire"
        
    });
    alert.addButton({
      
      text: 'OK',
      handler: data => {
        
        
        setTimeout(() => {
          console.log('Async operation has ended');
          this.navCtrl.pop();
        }, 100);   
        
      }
    });
    alert.present();
    });

  
    
  }


// Go Back to My Company Page ...
onBack()
{
this.navCtrl.pop();
}

// Add Company from url 
loadCompanies()
{
  if(this.companyApiUrl == null)
  {
    alert("Please Enter Company Api Url");
  }
  else
  {
      this.loadcomapnies.load(this.companyApiUrl).then(data => {
    
      this.companies = data.companies;
    
    
    }).catch((error) => 
    {
      alert('Error getting companies'+JSON.stringify(error));
      
    });
  }
}
}
