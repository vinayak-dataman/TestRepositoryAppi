import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadcompaniesProvider {

  data: any;
  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello LoadcompaniesProvider Provider');
  }


  load(parameter)
  {
    let loader = this.loadingCtrl.create({
      content: 'Loading companies...'
    })
    loader.present();
    if (this.data) {
      return Promise.resolve(this.data);
    }
  
  
    return new Promise(resolve => {
      alert(parameter);
      
      this.http.get(parameter)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          loader.dismiss();
          alert(JSON.stringify(this.data));
        }, 
        error => {
          loader.dismiss();
          alert(error);
        });
    });
  }
  }

 
  
  

