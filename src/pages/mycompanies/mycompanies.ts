import { Component} from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { AddcompaniesPage } from '../addcompanies/addcompanies';
import { GetcompaniesProvider } from '../../providers/getcompanies/getcompanies';

import { Storage } from '@ionic/storage'
import { CompanyauthonticatePage } from '../companyauthonticate/companyauthonticate';


/*
 * Generated class for the MycompaniesPage page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
*/

// @IonicPage()
@Component({
  selector: 'page-mycompanies',
  templateUrl: 'mycompanies.html',
  
})

export class MycompaniesPage 
{

    
  addedCompaniesList: string[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public mycompaniesService: GetcompaniesProvider, public storage: Storage) 
    {
     // this.el = el.nativeElement;
      this.storage.get('CompanyDetails').then((val) => {
        console.log("Val in home"+val);
        this.addedCompaniesList = val;
        
       });
       
  }

  companyObj = {
    "title": "",
    "companyUrl": ""
  }


  // Runs when the page is about to enter and become the active page.
  ionViewWillEnter()
  {
   
    this.storage.get('CompanyDetails').then((val) => 
    {
      console.log("Val in home"+val);
      this.addedCompaniesList = val;
    });
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad MycompaniesPage');
    this.storage.get("CompanyDetails").then((val) => {
      console.log("val in company page");
      this.addedCompaniesList = val;
    });
   
  }

  // Redirect to Add Company page...
  onAddCompanies()
  {
    this.navCtrl.push(AddcompaniesPage);
  
  }

  authCompany(companyUrls,title)
  {
    let companyObj= {
      companyTitle: "",
      companyUrl: ""
    };
    companyObj.companyTitle = title;
    companyObj.companyUrl = companyUrls;
    this.storage.set('SelectedCompany',companyObj);
    this.navCtrl.push(CompanyauthonticatePage, {
      param1: companyUrls,
      param2: title
  });
  }

  onRemoveCompany(company)
  {
    let index = this.addedCompaniesList.indexOf(company);

    if(index > -1){
      this.addedCompaniesList.splice(index, 1);
    }
    this.storage.set('CompanyDetails', this.addedCompaniesList);
  }
  pressEvent(e,company) {
    this.presentConfirm(company);
  }
  


  presentConfirm(company) {
    let alert = this.alertCtrl.create({
   
      message: 'Are you sure do you want to remove this company?',
      buttons: [
      {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.onRemoveCompany(company);
          }
        }
      ]
    });
    alert.present();
  }

}
