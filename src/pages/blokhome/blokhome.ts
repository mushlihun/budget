import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Events, ViewController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
// import { SuperTabsComponent } from 'ionic2-super-tabs';
// import { SuperTabsModule } from 'ionic2-super-tabs';
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
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public view: ViewController) {
    this.bloks = this.navParams.get('bloks').kode_lokasi;
    // this.getBlokhome(this.bloks);
  }

  ionViewDidLoad() {
    this.kontrakdetail();
    this.getBlokhome(this.bloks);
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.nokontrak(this.bloks);
  }

  onTabSelect(ev: any) {
    // this.selectedTabIndex = ev.index;
    
      this.selectedTabIndex = ev.index;
      // this.superTabs.clearBadge(this.blokshome[ev.index].title);
      // console.log('supertabs', this.blokshome[ev.index].title);
}
  click(indexhome) {
    this.storage.set('blokno', indexhome.blok_no);
  }

  nokontrak(kodelokasi) {
    this.globalService.presentRouteLoader();
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data;
        this.auth.kh(this.accesstoken, kodelokasi).subscribe((resp) => {
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
          console.log('this.blokshome', this.blokshome);
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
        // let blokhome = resp.kontrak;
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
    }
  
  _closeModal = () => {
    this.navCtrl.setRoot('HomePage');
  }
}
