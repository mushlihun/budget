import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, ModalOptions, ViewController } from 'ionic-angular';
//Pages
import  { ProductModalPage } from '../product-modal/product-modal'; 
import 'rxjs/add/operator/map';
//Service
// import { MenuService } from '../../services/menu.service';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
//Models
import { Categories } from '../../models/menu.model';
import { Storage } from '@ionic/storage';
import { OrdersService } from '../../services/orders.service';
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  menu: Categories[];
  bahan: any;
  cart: any[] = [];
  tahapan: any = [];
  total: number;
  jumlah: number;
  kodebahan: any;
  nokontrak: any;
  bloks: any;
  blokno: any;
  produkall: any;

  constructor(
    private auth: AuthProvider,
    private globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    // private menuService: MenuService,
    private ordersService: OrdersService,
    private storage: Storage,
    private modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    // this.idxhome = this.navParams.get('idxhome').kode_lokasi;
    // this.menuService.getMenu(navParams.get('restaurant'))
    // .then(menu => {
    //   this.menu = menu.categories;
    // });
 }

 ionViewDidEnter(){
 }
 ionViewDidLoad(){
  this.getTahapan();
  this.getBahan();
  this.storage.get('blok').then((data) => {
    this.bloks = data;
  });
  this.storage.get('nokontrak').then((data) => {
    this.nokontrak = data;
  });
 }

 getTahapan() {
  // this.storage.get('token').then((data) => {
  //   this.auth.tahapan(data).subscribe((resp) => {
  //     this.tahapan = resp.tahapan;
  // }, (err) => {
  //   let error = err.json();
  //   this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
  //   console.log(err);
  // });
// });
this.storage.get('tahapan').then((data) => {
  this.tahapan = data.tahapan;
});
}

getBahan() {
  this.storage.get('token').then((data) => {
    this.auth.bahan(data).subscribe((resp) => {
      this.bahan = resp.bahan;
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
  });
});
}

/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui rajoute l'objet désiré au panier. Elle incrémente le compteur de l'objet
  * et lance la donction de calcul du prix final. Elle ajoute la propriété quantity
  * qui n'est pas définie dans l'objet initial.
  * @param {number} catId
  * @param {number} productId
  */
 _addToCart = (catId, productId) => {
  // this.bahan[productId].quantity = 
  // this.bahan[productId].quantity
  // ? this.bahan[productId].quantity + 1
  // : 1;
  // for(this.tahapan[catId] === this.tahapan[catId])
  if (this.bahan[productId].kodebahan === this.bahan[productId].kodebahan) {
    this.bahan[productId].quantity = 
  this.bahan[productId].quantity
  ? this.bahan[productId].quantity + 1
  : 1;
    this.jumlah = this.bahan[productId];
    this.cart.push(this.bahan[productId]);
  }
  // this.jumlah = this.bahan[productId].quantity;
  console.log('quantity: ', this.bahan[productId]);
  // this.cart.push(this.bahan[productId]);
  this._totalPrice();
  //dariindra
  // for (i=0; i<produk.length; i++){
// if (produk[i][kode_bahan] === this.bahan[productId].kodebahan) {
  // produk[i].quantity = 
  // produk[i].quantity.quantity + this.bahan[productId].quantity + 1
// }
  // }

}

addToCart = (productId) => {
  for (let i = 0; this.bahan[productId] < 0; i++){
    if (this.bahan[productId].kode_bahan === this.bahan[productId].kode_bahan) {
      this.jumlah = this.bahan[productId].quantity;
      console.log('addToCart: ',  this.jumlah);
    }
  }
  
  // this.jumlah = this.bahan[productId].quantity;
  this.cart.push(this.bahan[productId]);
  this._totalPrice();
  let produk = {
    kode : this.bahan[productId].kode_bahan,
    bahan : this.bahan[productId].nama_bahan,
    qty : this.bahan[productId].quantity,
    satuan : this.bahan[productId].satuan
  }
  console.log('produk: ', produk.qty);
  this._addToOrders();
}

_aggregateCart = (cart) => {
  console.log('cart', cart);
  let newCart = [];
  cart.forEach(function(item) {
   if(newCart.indexOf(item) < 0) {
       newCart.push(item);
    }
  });
  console.log('newCart: ', newCart);
  this.storage.set('cart', newCart);
  return newCart;
}
_addToOrders = () => {
  this.storage.get('blokno').then((data) => {
  let blokno = data;
  let bloks = {
    // produk: this.cart,
    blokhome: this.bloks,
    blokno: blokno
  }
  const lastOrder = {
    date: new Date(),
    datatotal: bloks,
    produkall: this.cart,
  }
  this._onOrder();
  this.ordersService.newOrder(lastOrder);
  console.log('lastorder', lastOrder);
  });
}

/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui supprime l'objet désiré du panier. Elle décrémente le compteur de l'objet
  * et lance la fonction de calcul du prix final. Elle modifie la propriété quantity
  * en conséquence
  * @param {number} catId
  * @param {number} productId
  */
_deleteFromCart = (productId) => {
  this.bahan[productId].quantity = 
  this.bahan[productId].quantity === 0 
  ? 0 
  :this.bahan[productId].quantity - 1;

  const itemToRemove = this.cart.findIndex(item => 
    item.name === this.bahan[productId].nama_bahan);
    if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
      this.cart.splice(itemToRemove, 1);
    }
    this.jumlah = this.bahan[productId].quantity;
    console.log('jumlah bahan setelah dikurang: ', this.jumlah);
    this.total -= this.bahan[productId].quantity;
    this._totalPrice();
  }


// redirige vers la page de paiments si le panier contient au moins un produit.
  _onOrder = () => {
    
  this.storage.get('blokno').then((data) => {
    let datatotal = {
      blokhome: this.bloks = {
        blokno: data = {
          produk: this.cart,
        }
      }
      
    }
    this.storage.set('datatotal', datatotal.blokhome.blokno.produk);
    if(this.cart.length > 0) {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].kode_bahan === this.bahan[i].kode_bahan){
          console.log('looping', this.cart[i].kode_bahan);
    this._aggregateCart(this.cart);
        }
      }
      console.log('this.cart', this.cart);
      console.log('datatotal', datatotal);
      // this.storage.set('cart', datatotal.produk);
      // this.navCtrl.push('PaymentPage', {
      //   produk: this.cart,
      //   datatotal
      // });
    }
    //dari indra
  //   for (let i =0; i < datatotal.produk.length; i++) {
  //     if(datatotal.produk[i].kode_bahan === this.cart[i].kode_bahan) {
  //       datatotal.produk[i].quantity = datatotal.produk[i].quantity 
  //       + 1
  //     }
  //   }
  //   console.log('datatotalp', datatotal.produk);
  //   console.log('datatotals', this.cart);
  });
  }

/**
  * Méthode qui prend l'index et la catégorie et d'un produit 
  * et ouvre une modale concernant le produit en question
  * en conséquence
  * @param {number} catId
  * @param {number} productId
  */
_productModal = (indexhome, productId) => {
  console.log('indexhome: ', indexhome);
  console.log('productId: ', productId);
  const modalOptions: ModalOptions = { enableBackdropDismiss: true, showBackdrop: true};
  const productModal: Modal = this.modalCtrl.create(ProductModalPage, { 
    product: this.blokno[indexhome].bahan[productId] 
  }, modalOptions);
   productModal.present();
   productModal.onWillDismiss((param) => {  
     if(param.addToCart) {
      this._addToCart(indexhome,productId);
     }
   });
}

/**
  * Méthode qui calcule le prix total du panier si le panier a au moins un élément.
  */
  _totalPrice = () => {
    this.total = this.cart.length > 0 ? this.cart
    .map(item => item.quantity)
    .reduce((a, b) => {
      return a+b;
    }) : '0';
  }

  /**
    * Prend l'index de la catégorie et ouvre ou la ferme le menu déroulant au click.
    * Ferme les autres menus déroulant si il y en a d'autre ouverts
    * la propriété open est automatiquement rajouté à l'objet en cours. Elle n'est pas
    * définie dans l'objet initial.
    * @param {number} i
    */
  _toggleCategory = (i) => {
    this.tahapan[i].open = !this.tahapan[i].open;
    this.tahapan.forEach(item => {
      if(item !== this.tahapan[i]) {
        item.open = false;
      }
    });
  } 
}
