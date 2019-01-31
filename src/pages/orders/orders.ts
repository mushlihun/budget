import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Services
import { OrdersService } from '../../services/orders.service';
// Model
import { Order } from '../../models/menu.model'
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
    public navCtrl: NavController,
    public navParams: NavParams,
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
  this.nokontrak = this.nokontrak;
 }

 kirimwa() {
  let text = 'Check out the Ionic Academy!';
  let url = 'https://ionicacademy.com';
   let datatot = this.orders;
  //  let datablok = data.produk;
  console.log(datatot);
  // // this.auth.sumbit(datatot).subscribe((resp) => {
  // //   console.log('submit', resp);
  // // });
  // this.datatot = this.orders;
  this.socialSharing.shareViaWhatsApp(text, null, url).then((data) => {
    console.log(data);
    // Success
  }).catch((e) => {
    // Error!
  });
 }

//  _totalPrice = () => {
//   this.total = this.orders.length > 0 ? this.orders
//   .map(item => item.price)
//   .reduce((a, b) => {
//     return a+b;
//   }) : '0';
// }

}
