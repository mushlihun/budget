import { Component, ViewChild } from '@angular/core';
import { App, IonicApp, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { LoginPage } from '../pages/login/login';
// import { FirstRunPage } from '../pages';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage:any = LoginPage;
  // rootPage = FirstRunPage;
  rootPage: any;

  constructor(
    public app: App,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public ionicApp: IonicApp 
    ) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.initializeApp();
    this.rootPage = 'LoginPage'
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#F05A22');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.platform.registerBackButtonAction(() => {
        this.handlerDeviceBackButtonAndroid();
      }, 101);
    });
  }
  handlerDeviceBackButtonAndroid() {
    // get current active page     
    let ready: Boolean = true;    
    let activeNav = this.app.getActiveNavs()[0];
    let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
    
    if(activeNav.canGoBack()) {
      activeNav.pop();
    } else {
      if(activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => { ready = true; });      
        return false;
      } else {
          this.platform.exitApp();          
      }
    }    
  }
}

