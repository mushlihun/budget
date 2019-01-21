import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// Pages
import { MenuPage } from '../menu/menu';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  accesstoken: any;
  isLastPage: boolean = false;
  kodepengawas: any;
  lokasi: any;

  constructor(
    private storage: Storage,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    ) {
  Promise.all([this.storage.get('token'), this.storage.get('kodepengawas')]).then((data) => {                  
        this.accesstoken = data[0];
        this.kodepengawas = data[1];
      });
  }
  
  _onChoose = (resto) => {
    this.navCtrl.push(MenuPage, {
      restaurant: resto
    });
  }

  ionViewDidEnter() {
      console.log('kodepengawas:', this.kodepengawas);
        this.auth.lokasi(this.accesstoken, this.kodepengawas).subscribe((resp) => {
        if(resp.lokasi && resp.lokasi.length > 0) {
        console.log('lokasi', resp);
          this.isLastPage = true;          
          // this.productLists = res.data.filter((item) => item.product_type.name.toString().toLowerCase().replace(/\s+/g, '') === this.productName.toString().toLowerCase().replace(/\s+/g, ''));          
          this.lokasi = resp.lokasi; //.lokasi.filter((item) => item.nama_lokasi.toString().toLowerCase().replace(/\s+/g, ''));
        } else {
          this.isLastPage = false;
        }
        this.globalService.dismissLoader();
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
    }

}
