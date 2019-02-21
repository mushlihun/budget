import { Component } from '@angular/core';
import { IonicPage, Modal, ModalController, ModalOptions, NavController, NavParams } from 'ionic-angular';
// Services
import { OrdersService } from '../../services/orders.service';
// Model
import { Order } from '../../models/menu.model'
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
  selector: 'orders-page',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  datatot: any;
  nokontrak: any;
  produkall: any;
  total: number;
  orders: Order[] = [];
  produks: any[];
  blokno: any;
  bloks: any;
  date: any;
  no_kontrak: any;
  tipe: any;
  token: any;
  constructor(
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage,
    private ordersService: OrdersService,
    private socialSharing: SocialSharing
  ) {
    this.orders = this.ordersService.getOrders();
    this.date = new Date();
    console.log(this.date);
    this.storage.get('nokontrak').then((data) => {
      this.nokontrak = data;
    });
    this.storage.get('blokno').then((data) => {
      this.blokno = data;
    });
    this.storage.get('blok').then((data) => {
      this.bloks = data;
    });
    this.storage.get('nokontrak').then((data) => {
      this.no_kontrak = data;
    });
    this.storage.get('cart').then((data) => {
      this.produks = data;
    });
    this.storage.get('tipermh').then((data) => {
      this.tipe = data;
    });
    this.storage.get('token').then((data) => {
      this.token = data;
    });
 }

 ionViewDidEnter(){
  console.log('orders:', this.orders);
  console.log('order:', JSON.stringify(this.orders));
  // this.nokontrak = this.nokontrak;
  // this._totalPrice();
 }

 pushdata() {
  for (let i=0; i < this.produks.length; i++) {
    let tahapan = this.produks[i].kode_tahapan;
    let kodebahan = this.produks[i].kode_bahan;
    let namabahan = this.produks[i].nama_bahan;
    let quantity = this.produks[i].quantity;
    let satuan = this.produks[i].satuan;
    let untuk = this.produks[i].untuk;
  let pushdata = {
    no_kontrak: this.no_kontrak,
    kode_lokasi: this.bloks,
    blok_no: this.blokno,
    tipe: this.tipe,
    kode_tahapan: tahapan,
    kode_bahan: kodebahan,
    nama_bahan: namabahan,
    quantity: quantity,
    satuan: satuan,
    untuk: untuk
  }
  console.log('pushdata', pushdata);
  
  this.auth.order(this.token, pushdata).subscribe((resp) => {
    console.log('berhasil input', resp);
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
    });
    }
 }

 kirimwa() {
   this.pushdata();
   if (this.orders.length === 0) {
    this.globalService.showAlert();
   } else if (this.orders.length !== 0 || this.orders.length === null) {
    let datatot = JSON.stringify(this.orders);
    // console.log('orders todaysDate', this.orders[0].date);
    //  let datablok = data.produk;
    // for (let i=0; i <= this.orders.length; i++) {
    //   if (this.orders[i].date === todaysDate) {
    //     console.log('datatotal', JSON.stringify(datatot));
        console.log('datatot', datatot);
    //   }
    // }
    // // this.auth.sumbit(datatot).subscribe((resp) => {
    // //   console.log('submit', resp);
    // // });
    // this.datatot = this.orders;
    this.socialSharing.shareViaWhatsApp(datatot,  null).then((data) => {
      console.log(data);
      this.globalService.presentToast('Share whatsapp berhasil');
      // Success
    }).catch((e) => {
      // Error!
      console.log(e);
      this.globalService.presentToast('Share whatsapp gagal, coba lagi');
    });
   }
  
 }

 _totalPrice = () => {
  let props = ['no_urut', 'kode_tahapan', 'kode_bahan', 'nama_bahan',];
  let result = this.orders.filter(function(o1){
    // filter out (!) items in this.orders
    return !this.orders.some(function(o2){
        return o1.datatotal === o2.datatotal;          // assumes unique id
    });
}).map(function(o){
    // use reduce to make objects with only the required properties
    // and map to apply this to the filtered array as a whole
    return props.reduce(function(newo, name){
        newo[name] = o[name];
        return newo;
    }, {});
});
console.log(result);
}

goDetail = (idx) => {
  console.log('indexhome: ', idx);
  console.log('this.orders[idx]: ', this.orders[idx]);
  const modalOptions: ModalOptions = { enableBackdropDismiss: true, showBackdrop: true};
  const productModal: Modal = this.modalCtrl.create('ProductModalPage', { 
    product: this.orders[idx],
    date: this.date
  }, modalOptions);
   productModal.present();
}

goToHome() {
  this.navCtrl.setRoot('HomePage');
}

_deleteProduct = (idx) => {
  if(this.orders.length === 1) {
    this.navCtrl.pop();
  } else {
    this.orders.splice(idx, 1);
  }
}

}
