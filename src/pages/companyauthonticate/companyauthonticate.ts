import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';

import { CompanymenuPage } from '../companymenu/companymenu';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ApicommonProvider } from '../../providers/apicommon/apicommon';



@Component({
  selector: 'page-companyauthonticate',
  templateUrl: 'companyauthonticate.html',
})
export class CompanyauthonticatePage {
  companyUrl: string;
  title: string;
  userCName: string;
  userCPassword: string;
  data: any;
  headers: Headers = new Headers();
  options;
  allCompanyUsers: any[];
  loggedUserFName: string="";
  loggedUserLName: string="";
  loggedUserEmail: string="";
  constructor(public alertCtrl: AlertController, public apicommon: ApicommonProvider,public platform: Platform,public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  
    this.companyUrl = navParams.get('param1'); 
    this.title = navParams.get('param2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyauthonticatePage');
  }

  ionViewWillEnter(){
    
    this.storage.get('loggedUserEmail').then((val) => {
      console.log("Val in home"+val);
      this.loggedUserFName = val.loggedinFName;
      this.loggedUserLName = val.loggedinlName;
      this.loggedUserEmail = val.loggedinEmail;
   
    });
  }


  // Define progress indicator ...
  loader = this.loadingCtrl.create({
    content: 'Authenticating...'
  });

  // Authonticate company end points .
  onAuthonticateCompanyEndpoint()
  {
    if(this.userCName == null)
    {
      alert("Please Enter User Name");
      return;
    }
    if(this.userCPassword == null)
    {
      alert("Please Enter User Password");
      return;
    }
    
  
    this.loader.present();
    let companyObj = {
      "Username": "",
      "Password": ""
    };

    companyObj.Username = this.userCName;
    companyObj.Password = this.userCPassword;
    this.headers.append('Authorization', 'Basic ' + btoa(this.userCName+":"+this.userCPassword));
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
       
    this.http.get(this.companyUrl, this.options)
    .map(response => response.json()).subscribe(data => {
      this.data = data;
     
      this.checkUserLicence(this.companyUrl+"users/",this.userCName,this.userCPassword);
      this.storage.set('ApiAuthData', companyObj);

    
  },
  error => {
    this.loader.dismiss();
    alert("Invalid username or Password");
  })
 
}

checkUserLicence(parameter,uName,uPassword)
{
  this.apicommon.getAllCompanyUsers(parameter,uName,uPassword).then(data=>{
   
    this.allCompanyUsers = data.records;
    var isLicenced = this.checkLicence(this.allCompanyUsers);
    if(isLicenced)
    {
        setTimeout(() => {
        this.loader.dismiss();
        console.log('Async operation has ended');
       
        this.navCtrl.push(CompanymenuPage, {
          
          param2: this.title
      });
      }, 100); 
    }
    else
    {
      this.loader.dismiss();
      this.doAlert("","This App is not authorized to access this company with the specified information given at signup. Please contact Interaction Versa Inc. for more details");
    }
  }).catch((error) => 
  {
    alert('Error getting companies'+JSON.stringify(error));
  });

  
}


checkLicence(users)
{
  var isLicenced = false;
  let username: string;
  let fname: string;
  let lname: string;
  for(let user of users)
  {
    fname = user.firstname;
    lname = user.lastname;
    username = user.username;

    if(username.toLowerCase() === this.userCName.toLowerCase() 
    && fname.toLowerCase() === this.loggedUserFName.toLowerCase() && 
    lname.toLowerCase() === this.loggedUserLName.toLowerCase() ){
      isLicenced = true;
      break;
    }
  }
  return isLicenced;
}



doAlert(title: string, message: string) {
    
  let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
  });
  alert.present();
}
}
