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
    this.storage.get('nokontrak').then((data) => {
      this.nokontrak = data;
    }); 
 }

 ionViewDidEnter(){
  console.log('orders:', this.orders);
  console.log('order:', JSON.stringify(this.orders));
  // this.nokontrak = this.nokontrak;
  // this._totalPrice();
 }

 kirimwa() {
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
    product: this.orders[idx]
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
