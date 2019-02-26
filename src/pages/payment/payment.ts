import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ConfirmationPage } from '../confirmation/confirmation';
//Services
import { OrdersService } from '../../services/orders.service';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  datatotal: any[] = [];
  cart: any[];
  produks: any[];
  nokontrak: any;
  total: number;
  blokno: any;
  bloks: any;
  produkall: any;
  tipe: any;
  token: any;
  constructor(
    private auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private ordersService: OrdersService,
  ) {
    this.cart = this._aggregateCart(navParams.get('produk'));
    this.datatotal = navParams.get('datatotal');
    this.storage.get('tipermh').then((data) => {
      this.tipe = data;
    });
    this.storage.get('token').then((data) => {
      this.token = data;
    });
    this.storage.get('cart').then((data) => {
      this.produks = data;
    });
    this.storage.get('nokontrak').then((data) => {
      this.nokontrak = data;
    });
    this.storage.get('blokno').then((data) => {
      this.blokno = data;
    });
    this.storage.get('blok').then((data) => {
      this.bloks = data;
    });
  }
  
  ionViewCanEnter(){
    
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
      no_kontrak: this.nokontrak,
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
      this.globalService.toastInfo(error.message ? error.message : 'Cari sinyal dan aktifkan koneksi jaringan anda !', 3000, 'bottom');
      // this.globalService.presentAlert('', 'Cari sinyal dan aktifkan koneksi jaringan anda !', 'Tutup', 'alert-register-to-project', () => {});
      });
    }
   }
  /**
    * Prend le panier en cours, récupère les éléments par type 
    * et les aggrège et renvoie les quantités de chaques produits 
    * @param {object} cart
    */
  _aggregateCart = (cart) => {
    let newCart = [];
    cart.forEach(function(item) {
     if(newCart.indexOf(item) < 0) {
         newCart.push(item);
      }
    });
    console.log('newCart', newCart);
    this.produkall = newCart;
    return newCart;
  }

  // Calcumate the new total after adding or deleting items
  _calculateTotal = () => {
    const newTotal = this.cart.length ? this.cart
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b) : 0;
    this.total = newTotal;
  }

  /**
    * Ajoute un item à la sélection de produit
    * @param {number} productId
    */
  _addOne = (productId) => {
    this.cart[productId].quantity += 1;
    this._calculateTotal();
  }

  /**
    * enlève un item à la sélection de produit
    * @param {number} productId
    */
  _removeOne = (productId) => {
    if(this.cart[productId].quantity === 1) {
      this._deleteProduct(productId);
    } else {
      this.cart[productId].quantity -= 1;
    }
     this._calculateTotal();
  }

  /**
    * supprime la ligne de produits
    * @param {number} productId
    */
  _deleteProduct = (productId) => {
    if(this.cart.length === 1) {
      this.navCtrl.pop();
    } else {
      this.cart.splice(productId, 1);
      this._calculateTotal();
    }
    
  }

  _onPay = () => {
    const finalOrder = {
      datatotal: this.datatotal,
    }
    console.log('finalOrder', finalOrder);
    this.pushdata();    
    this._addToOrders();
    this.navCtrl.push('ConfirmationPage', {
      finalOrder
    });
  }
  
   /**
    * Ajoute aux commandes de l'utilisateur la commande actuelle
    */
  _addToOrdersx = () => {
    const lastOrder = {
      date: new Date(),
      datatotal: this.datatotal,
      produkall: this.produkall,
    }
    this.ordersService.newOrder(lastOrder);
    console.log('lastorder', lastOrder);
  }

  _addToOrders = () => {
    const lastOrder = {
      // date: new Date(),
      // datatotal: this.produkall,
      datatotal: this.datatotal,
    }
    this.ordersService.newOrder(lastOrder);
    console.log('lastorder', lastOrder);
  }

  // permet de revenir à la view précédente en gardant les éléments du panier
  _goBack = () => {
    this.navCtrl.pop();
  }
  
  // Appelle la fonction addToCart et push la view suivante
  
}
