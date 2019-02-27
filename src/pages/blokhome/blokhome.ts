import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Events, ViewController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
import { OrdersService } from '../../services/orders.service';
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
  no_kontrak: any;
  isLastPage: boolean = false;
  SwipedTabsIndicator :any= null;
  tabElementWidth_px :number= 50;
  tabs:any=[];
  cart: any[] = [];
  MenuPage = 'MenuPage';
  pages = [
    { pageName: 'MenuPage', title: 'A1', icon: 'flame', id: 'timelineTab'},
    { pageName: 'SettingsPage', title: 'A2', icon: 'help-circle', id: 'profileTab'}
  ];
   selectedTabIndex = 0;
  public blokshome: any = [];

  constructor(
    private storage: Storage,
    private ordersService: OrdersService,
    public alertCtrl: AlertController,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public view: ViewController) {
    this.bloks = this.navParams.get('bloks').kode_lokasi;
    this.no_kontrak = this.navParams.get('bloks').no_kontrak;
    // this.getBlokhome(this.bloks);
  }

  ionViewDidLoad() {
    // this.getkontrakheader();
    this.kontrakdetail();
    // this.getBlokhome(this.bloks);
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  onTabSelect(ev: any) {
    // this.selectedTabIndex = ev.index;
    
      this.selectedTabIndex = ev.index;
      // this.storage.set('blokno', indexhome.blok_no);
      // this.superTabs.clearBadge(this.blokshome[ev.index].title);
      // console.log('supertabs', this.blokshome[ev.index].title);
}
  click(indexhome) {
    this.storage.set('blokno', indexhome.blok_no);
    this.storage.set('tipermh', indexhome.tipe);
    this.storage.get('budgets').then((data) => {
      let bmt = data.budget.filter(item => item.tipe === indexhome.tipe);
      this.storage.set('tipes', bmt);
    });
  }

  getkontrakheader() {
    this.storage.get('kontrakheader').then((data) => {
      let bmt = data.filter(item => item.kode_lokasi === this.bloks);
      console.log('kontrakheader', bmt);
    });
  }
  kontrakdetail() {
    this.storage.get('nokontrak').then((data) => {
      this.no_kontrak = data;
    });
    this.storage.get('kontrakdetail').then((data) => {
      if(data && data.length > 0) {
      this.blokshome = data.filter(item => item.no_kontrak === this.no_kontrak);
      this.isLastPage = true;
      } else {
        this.isLastPage = false;
      }
    }, (err) => {
      let error = err.json();
      this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
      console.log(err);
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
    // this.navCtrl.setRoot('PaymentPage');
    this.storage.get('datatotal').then((data) => {
      let datatotal = data;
    // this.navCtrl.push('PaymentPage', {
    //     produk: this.cart,
    //     datatotal: datatotal
    //   });

    // this._addToOrders(datatotal);
    const finalOrder = {
      date: new Date(),
      datatotal: datatotal,
    }
    console.log('finalOrder blokhome', finalOrder);
    this.navCtrl.push('OrdersPage', {
      finalOrder
    });
  
    });
  }

  _addToOrders = (datatotal) => {
    const lastOrder = {
      date: new Date(),
      // datatotal: this.produkall,
      datatotal: datatotal,
    }
    this.ordersService.newOrder(lastOrder);
    console.log('_addToOrders lastOrder', lastOrder);
  }
  blokhome() {
    this.storage.get('tahapan').then((data) => {
      let tahapan = data.tahapan.sort().reverse();
      console.log('tahapan blokhome', tahapan);
      this.navCtrl.push('MenuPage');
      });
  }
}
