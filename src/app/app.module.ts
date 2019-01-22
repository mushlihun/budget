import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
// import { SuperTabsModule, SuperTabsController} from 'ionic2-super-tabs';
//Pages
// import { ConfirmationPage } from '../pages/confirmation/confirmation';
// import { HomePage } from '../pages/home/home';
// import { MenuPage } from '../pages/menu/menu';
// import { OrdersPage } from '../pages/orders/orders';
// import { PaymentPage } from '../pages/payment/payment';
// import { ProductModalPage } from '../pages/product-modal/product-modal';
// import { SettingsPage } from '../pages/settings/settings';
// import { TabsPage } from '../pages/tabs/tabs';


//Services
import { MenuService } from '../services/menu.service';
import { OrdersService } from '../services/orders.service';
import { ApiHelper } from '../config/global';
import { GlobalServiceProvider } from '../providers/global-service/global-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { Network } from '@ionic-native/network';
import { SuperTabsModule, SuperTabsController, /*SuperTabs*/ } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MyApp
    // ConfirmationPage,
    // HomePage,
    // MenuPage,
    // MyApp,
    // OrdersPage,
    // PaymentPage,
    // ProductModalPage,
    // SettingsPage,
    // TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    // ConfirmationPage,
    // HomePage,
    // MenuPage,
    // MyApp,
    // OrdersPage,
    // PaymentPage,
    // ProductModalPage,
    // SettingsPage,
    // TabsPage,
  ],
  providers: [
    ApiHelper,
    AuthProvider,
    GlobalServiceProvider,
    MenuService,
    OrdersService,
    Network,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    SuperTabsController,
    // SuperTabs
  ]
})
export class AppModule {}
