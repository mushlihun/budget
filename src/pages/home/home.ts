import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
// Pages
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  accesstoken: any;
  blokshome: any = [];
  isLastPage: boolean = false;
  kodepengawas: any;
  kontrakheader: any;
  kodelokasi: any;
  kodeinfo: any;
  lokasi: any;

  constructor(
    private storage: Storage,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    ) {
    this.kodeinfo = this.navParams.get('_params');
    this.storage.get('lokasi').then((data) => {
      this.getLokasi(data);
    });
  }
  
  _onChoose = (resto) => {
    console.log('resto:', resto);
    this.navCtrl.push(MenuPage, {
      restaurant: resto
    });
  }

  ionViewDidLoad(){
    
  }

  ionViewDidEnter() {
    this.storage.set('isLoggedIn', true);
  }
  
  getLokasi(data) {
    this.globalService.presentRouteLoader();
    if(data.lokasi && data.lokasi.length > 0) {
      this.isLastPage = true;          
      this.lokasi = data.lokasi;
      console.log('this.lokasi:', this.lokasi);
    } else {
      this.isLastPage = false;
    }
  }

  goBlok(item) {
    this.storage.set('blok', item.kode_lokasi);
    this.navCtrl.setRoot('BlokhomePage', {bloks: item});
  }

  goOrder() {
    this.navCtrl.push('OrdersPage');
  }

  logOut() {
    this.storage.set('isLoggedIn', null);  
    this.navCtrl.setRoot('LoginPage');
  }

}
