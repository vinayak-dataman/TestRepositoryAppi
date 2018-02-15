import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {CreateaccountPage} from '../pages/createaccount/createaccount';

import { LoginPage } from '../pages/login/login';
import { ForgotpassowrdPage } from '../pages/forgotpassowrd/forgotpassowrd';
import { StorageProvider } from '../providers/storage/storage';
import { UserLoginService } from '../providers/userLogin.service';
import { CognitoUtil, RegistrationUser } from '../providers/cognito.service';
import { AwsUtil } from '../providers/aws.service';
import { UserParametersService} from '../providers/userParameters.service';
import { EventsService } from '../providers/events.service';
import { UserRegistrationService } from '../providers/userRegistration.service';
import { ConfirmregistrationPage } from '../pages/confirmregistration/confirmregistration';
import { AddcompaniesPage } from '../pages/addcompanies/addcompanies';
import { MycompaniesPage } from '../pages/mycompanies/mycompanies';
import { GetcompaniesProvider } from '../providers/getcompanies/getcompanies';
import { Pro } from '@ionic/pro';
import { LoadcompaniesProvider } from '../providers/loadcompanies/loadcompanies';
import { IonicStorageModule } from '@ionic/storage';
import { DisplaycompanyorderPage } from '../pages/displaycompanyorder/displaycompanyorder';
import { CompanyauthonticatePage } from '../pages/companyauthonticate/companyauthonticate';
import { CompanymenuPage } from '../pages/companymenu/companymenu';
import { HttpModule } from '@angular/http';
import { CompanysalesorderProvider } from '../providers/companysalesorder/companysalesorder';
import { OrderdetailsPage } from '../pages/orderdetails/orderdetails';
import { OrderitemsProvider } from '../providers/orderitems/orderitems';
import { ItemdetailPage } from '../pages/itemdetail/itemdetail';
import {Injectable, Injector } from '@angular/core';
import { InventoryPage } from '../pages/inventory/inventory';
import { ApicommonProvider } from '../providers/apicommon/apicommon';
import { InventoryitemdetailPage } from '../pages/inventoryitemdetail/inventoryitemdetail';
import { HomescreenPage } from '../pages/homescreen/homescreen';
import { CustomersPage } from '../pages/customers/customers';
import { InventoryunitdetailPage } from '../pages/inventoryunitdetail/inventoryunitdetail';
import { CustomerdetailPage } from '../pages/customerdetail/customerdetail';
import { CustomershipaddressPage } from '../pages/customershipaddress/customershipaddress';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Printer} from '@ionic-native/printer';
import { CreateneworderPage } from '../pages/createneworder/createneworder';

import { SortbyPage } from '../pages/sortby/sortby';
import { SignaurePage } from '../pages/signaure/signaure';

import { ItemserialsPage } from '../pages/itemserials/itemserials';

const IonicPro = Pro.init('e363211c', {
  appVersion: "1.0.0"
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
    
    }
  }

    handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}



@NgModule({
  declarations: [
    MyApp,
    CreateaccountPage,
   // SlideIntroPage,
  LoginPage,
    ItemserialsPage,
    ForgotpassowrdPage,
    ConfirmregistrationPage,
    AddcompaniesPage,
    MycompaniesPage,
    DisplaycompanyorderPage,
    CompanymenuPage,
    CompanyauthonticatePage,
    OrderdetailsPage,
    CreateneworderPage,
    ItemdetailPage,
    InventoryPage,
    InventoryitemdetailPage,
    HomescreenPage,
    CustomersPage,
    SortbyPage,
    InventoryunitdetailPage,SignaurePage,
    CustomerdetailPage,CustomershipaddressPage,DashboardPage
  ],
  imports: [
    SignaturePadModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  
  // Entry components ...
  entryComponents: [
    MyApp,
    CreateaccountPage,
   // SlideIntroPage,
  LoginPage,
    ForgotpassowrdPage,
    ConfirmregistrationPage,
    AddcompaniesPage,
    MycompaniesPage,
    DisplaycompanyorderPage,
    CompanyauthonticatePage,
    CompanymenuPage,
    OrderdetailsPage,
    ItemdetailPage,
    InventoryPage,SortbyPage,
    InventoryitemdetailPage,
    CreateneworderPage,
    HomescreenPage,
    CustomersPage,
    InventoryunitdetailPage,
    CustomerdetailPage,
    CustomershipaddressPage,
    DashboardPage,
    
    ItemserialsPage,
    SignaurePage
  ],

  //provideres used in app
  
  providers: [
    Printer,
    StatusBar,
    SplashScreen,
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler}],
    StorageProvider,
    GetcompaniesProvider,
    CognitoUtil,
    AwsUtil,
    UserLoginService,
    UserParametersService,
    UserRegistrationService,
    EventsService,
    RegistrationUser,
    GetcompaniesProvider,
    LoadcompaniesProvider,
    
    CompanysalesorderProvider,
    OrderitemsProvider,
    ApicommonProvider,
    
  ]
})


export class AppModule {
  
}