import { Http,  Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
/*
  Generated class for the ApicommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApicommonProvider {

  headers: Headers = new Headers();
  data: any;
  searchData: any;
  options;
  userName: "";
  password: "";
  constructor(public http: Http) {
    console.log('Hello ApicommonProvider Provider');
  }



  companyAuthontication(parameter,userName,uPassword)
  {

    let companyObj = {
      "Username": "",
      "Password": ""
    };

    companyObj.Username = userName;
    companyObj.Password = uPassword;
    this.headers.append('Authorization', 'Basic ' + btoa(userName+":"+uPassword));
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
  
    return this.http.get(parameter,this.options)
    .map(res => res.json())
    .map(data => data)  // You only return the .products from the server response right?
    .toPromise();
  }

  loadSalesOrder()
  {

  }


  loadsearchedSalesOrder()
  {
    
  }



  // Get All Inventory items. ..
  loadInventoryItems(limit,uName,uPassword)
  {
    let inventryUrl = "https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/inventory/items/?limit="+limit;
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
      
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
  
    return this.http.get(inventryUrl,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }


  // Inventory Item Detail api call
  loadInventoryItemsDetailById(parameter,uName,uPassword)
  {
   
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
      
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
    
    return this.http.get(parameter,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }

 



  // Call Inventories Item API by Search
  loadsearchedInventoryItem(query,uName,uPassword)
  {
    let inventryUrl = "https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/inventory/items/?q="+query;
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
      
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
  
    return this.http.get(inventryUrl,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }

  

  // Load Customer Data ...

  loadCustomerData(limit,uName,uPassword)
  {
    let customerUrl = "https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/customers/?limit="+limit;
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
      
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
  
    return this.http.get(customerUrl,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }

  loadCustomerDatabyId(parameter,uName,uPassword)
  {
   
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
    this.headers.append('Content-Type', "application/x-www-form-urlencoded");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
    
    return this.http.get(parameter,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }


  loadSearchCustomerDatabyId(query,uName,uPassword)
  {
   
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
    this.headers.append('Content-Type', "application/json");
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
    
    return this.http.get("https://spireapi.appi4spire.com:10880/api/v1/companies/inspirehealth/customers/?q="+query,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
  }



  postNewOrder(parameter,body,uName,uPassword)
  {
    var pbd = (JSON.stringify(body));
    
    pbd = pbd.substring(0,pbd.length);
    this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
   this.headers.append('Content-Type', "application/json");
    
    this.options = new RequestOptions();
    this.options = new RequestOptions({ headers: new Headers(this.headers) });
 
    console.log(body);
    return this.http.post(parameter, body, this.options)
    .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise().then(response => response.json(), this.handleError);
      }
    
      handleError(error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
      }
  

   

      // getinventorybyupc
      getInventoryFromUPC(parameter,uName,uPassword)
      {
      
        this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
        this.headers.append('Content-Type', "application/json");
        this.options = new RequestOptions();
        this.options = new RequestOptions({ headers: new Headers(this.headers) });
       
        return this.http.get(parameter,this.options)
            .map(res => res.json())
            .map(data => data)  // You only return the .products from the server response right?
            .toPromise();
      }

      getInventorySerials(parameter,uName,uPassword)
      {
        this.headers.append('Authorization', 'Basic ' + btoa(uName+":"+uPassword));
        this.headers.append('Content-Type', "application/json");
        this.options = new RequestOptions();
        this.options = new RequestOptions({ headers: new Headers(this.headers) });
       
        return this.http.get(parameter,this.options)
            .map(res => res.json())
            .map(data => data)  // You only return the .products from the server response right?
            .toPromise();
      }


      getAllCompanyUsers(parameter,userName,uPassword)
      {
       
        this.headers.append('Authorization', 'Basic ' + btoa(userName+":"+uPassword));
        this.headers.append('Content-Type', "application/json");
        this.options = new RequestOptions();
        this.options = new RequestOptions({ headers: new Headers(this.headers) });
      
        return this.http.get(parameter,this.options)
        .map(res => res.json())
        .map(data => data)  // You only return the .products from the server response right?
        .toPromise();
      }
}
