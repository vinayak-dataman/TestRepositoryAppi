import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanysalesorderProvider {
  headers: Headers = new Headers();
  data: any;
  searchData: any;
  options;
  userName: "";
  password: "";
  loader: any;
  constructor(public http: Http, public loadingCtrl: LoadingController,public storage: Storage) {
    console.log('Hello CompanysalesorderProvider Provider');
  }

  
  loadSalesOrder(parameter,uName,uPassword) {
  
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
    return this.http.get(parameter,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  
  }



  load(parameter,uName,uPassword)
  {
   

     let loader = this.loadingCtrl.create({
      content: 'Loading Sale Orders...'
    })
   // loader.present();
    if (this.data) {
      return Promise.resolve(this.data);
    }
   
  
    return new Promise(resolve => {
     
     
      this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
      
      this.headers.append('Content-Type', "application/json");
      this.options = new RequestOptions();
      this.options = new RequestOptions({ headers: new Headers(this.headers) });
      this.http.get(parameter,this.options)
        .map(res => res.json())
        .subscribe(data => {
          this.data= data;
          resolve(this.data);
          // loader.dismiss();
       //  alert("api"+JSON.stringify(this.data.limit));
        }, 
        error => {
          loader.dismiss();
          alert(error);
        });
    });
  }



  loadSearchData(parameter,uName,uPassword)
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
}
