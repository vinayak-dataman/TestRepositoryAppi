import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, Platform } from 'ionic-angular';

/*
  Generated class for the OrderitemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrderitemsProvider {
  options;
  data: any;
  headers: Headers = new Headers();
  constructor(public http: Http, public loadingCtrl: LoadingController,private platform: Platform ) {
    console.log('Hello OrderitemsProvider Provider');
  }



  load(parameter,uName,uPassword)
  {
   
     let loader = this.loadingCtrl.create({
      content: 'Loading Sale Orders...'
    })
   // loader.present();
  
 
 this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
 this.headers.append('Content-Type', "application/json");
 this.options = new RequestOptions();
 this.options = new RequestOptions({ headers: new Headers(this.headers) });
 
 return this.http.get(parameter,this.options)
     .map(res => res.json())
     .map(data => data)  
     .toPromise();

 
}



public getCountryNameFromCode() {

  var url = 'assets/data/countries.json'; 

  if (this.platform.is('cordova') && this.platform.is('android')) {
      url = "/android_asset/www/" + url;
  }

  return this.http.get(url)
  .map(res => res.json())
  .toPromise();
}

  
}
