import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { ApiCommon } from '../app.apicommon';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
/*
  Generated class for the GetcompaniesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GetcompaniesProvider {
 
  cordova: any;
  data: any;
  apiCommon: ApiCommon;
  constructor(public http: Http,public loadingCtrl: LoadingController) {
    console.log('Hello GetcompaniesProvider Provider');
    
    this.apiCommon = new ApiCommon();
 
  }
  

  // get All Companies from inputted URL ...
 load(parameter)
 {
   let loader = this.loadingCtrl.create({
     content: 'Loading companies...'
   })
 //  loader.present();
   if (this.data) {
     return Promise.resolve(this.data);
   }
 
 
   return new Promise(resolve => {
    // alert(parameter);
     
     this.http.get(parameter)
       .map(res => res.json())
       .subscribe(data => {
         this.data = data;
         resolve(this.data);
        // loader.dismiss();
       //  alert(JSON.stringify(this.data));
       }, 
       error => {
       //  loader.dismiss();
         alert(error);
       });
   });
 }

 
}




