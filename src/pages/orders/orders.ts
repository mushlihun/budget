import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Services
import { OrdersService } from '../../services/orders.service';
// Model
import { Order } from '../../models/menu.model'

@IonicPage()
@Component({
  selector: 'orders-page',
  templateUrl: 'orders.html'
})
export class OrdersPage {
  orders: Order[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ordersService: OrdersService,
  ) {
   
 }

 ionViewDidEnter(){
  this.orders = this.ordersService.getOrders();
   console.log('order:', this.orders);
 }

}
