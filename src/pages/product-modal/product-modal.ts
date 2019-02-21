import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//Service
// import { MenuService } from '../../services/menu.service';
//Models
import { Product } from '../../models/menu.model'
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {
  date: any;
  product: Product;
  produk: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private menuService: MenuService,
    private view: ViewController
    ) {
      this.product = this.navParams.get('product');
      console.log(this.product);
      this.date = this.navParams.get('date');
      console.log(this.date);
      this.produk = this.navParams.get('product').datatotal.produk;
      console.log('produk', this.produk);
  }

  _closeModal = (addToCart) => {
    this.view.dismiss({addToCart});
  }

}
