import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';
//Models
// import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the BlokhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blokhome',
  templateUrl: 'blokhome.html',
})
export class BlokhomePage {
  // @ViewChild(SuperTabsComponent) superTabs: SuperTabsComponent;
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('scroll') scroll: Content;
  accesstoken: any;
  bloks: any;
  kontrakheader: any;
  kodelokasi: any;
  isLastPage: boolean = false;
  SwipedTabsIndicator :any= null;
  tabElementWidth_px :number= 50;
  tabs:any=[];
  MenuPage = 'MenuPage';
  pages = [
    { pageName: 'MenuPage', title: 'A1', icon: 'flame', id: 'timelineTab'},
    { pageName: 'SettingsPage', title: 'A2', icon: 'help-circle', id: 'profileTab'}
  ];
   selectedTabIndex = 0;
  public blokshome: any = [];

  constructor(
    private storage: Storage,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events) {
    this.bloks = this.navParams.get('bloks').kode_lokasi;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlokhomePage');
    console.log('bloks', this.bloks);
    this.kontrakdetail();
    this.getBlokhome(this.bloks);
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.storage.set('blok', this.bloks);
    this.nokontrak(this.bloks);
  }

  onTabSelect(ev: any) {
    this.selectedTabIndex = ev.index;
}

  nokontrak(kodelokasi) {
    this.globalService.presentRouteLoader();
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data;
      console.log('kodelokasi:', kodelokasi);
        this.auth.kh(this.accesstoken, kodelokasi).subscribe((resp) => {
        console.log('no kontrak', resp);
        this.kontrakheader = resp.kontrak;
        this.storage.set('nokontrak', resp.kontrak.no_kontrak);
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
  }
    kontrakdetail() {
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data;
        this.auth.kd(this.accesstoken).subscribe((resp) => {
          if(resp.kontrak && resp.kontrak.length > 0) {
          this.blokshome = resp.kontrak;
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
    }

  getBlokhome(kodelokasi) {
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data;
        this.auth.budgets(this.accesstoken, kodelokasi).subscribe((resp) => {
        console.log('getBlokhome', resp);
          let blokhome = resp.kontrak;
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
    }
}
