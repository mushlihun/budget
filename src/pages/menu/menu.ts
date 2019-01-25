import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
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
  bloks: any;

  constructor(
    private auth: AuthProvider,
    private globalService: GlobalServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    // private menuService: MenuService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
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
    console.log('blok: ', data);
  });
 }

 getTahapan() {
  this.storage.get('token').then((data) => {
    this.auth.tahapan(data).subscribe((resp) => {
      console.log('tahapan: ', resp.tahapan);
      this.tahapan = resp.tahapan;
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
  });
});
}

getBahan() {
  this.storage.get('token').then((data) => {
    this.auth.bahan(data).subscribe((resp) => {
      console.log('bahan: ', resp.bahan);
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
_addToCart = (productId) => {

    this.bahan[productId].quantity = 
    this.bahan[productId].quantity
    ? this.bahan[productId].quantity + 1
    : 1;
  
  this.jumlah = this.bahan[productId].quantity;
  this.kodebahan = this.bahan[productId].kode_bahan;
  console.log('jumlah bahan: ', this.bahan[productId].quantity);
  console.log('nama bahan: ', this.bahan[productId].nama_bahan);
  console.log('productId: ', this.bahan[productId].kode_bahan);
  this.cart.push(this.bahan[productId]);
  console.log('this.cart.push: ', this.cart.push());
  // this._totalPrice();
   let produk = {
    kode : this.bahan[productId].kode_bahan,
    bahan : this.bahan[productId].nama_bahan,
    qty : this.bahan[productId].quantity,
    satuan : this.bahan[productId].satuan
  }
  console.log('produk: ', produk);
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
    // this._totalPrice();
  }
  

  _deleteFromCarts = (catId, productId) => {
    this.menu[catId].products[productId].quantity = 
    this.menu[catId].products[productId].quantity === 0 
    ? 0 
    :this.menu[catId].products[productId].quantity - 1;
  
    const itemToRemove = this.cart.findIndex(item => 
      // item.name === this.menu[catId].products[productId].name);
      item.blok === this.menu[catId].products[productId].name);
      if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
        this.cart.splice(itemToRemove, 1);
      }
      this.total -= this.menu[catId].products[productId].price;
      this._totalPrice();
    }

// redirige vers la page de paiments si le panier contient au moins un produit.
  _onOrder = () => {
    let datatotal = {
      cart: this.cart,
      total: this.total,
      jumlah: this.jumlah,
      kodebahan: this.kodebahan,
      blokhome: this.bloks
    }
    console.log('datatotal: ', datatotal);
    // if(this.cart.length > 0) {
    //   this.navCtrl.push('PaymentPage', {
    //     cart: this.cart,
    //     total: this.total,
    //     jumlah: this.jumlah,
    //     kodebahan: this.kodebahan,
    //     blokhome: this.bloks
    //   });
    // }
  }

/**
  * Méthode qui prend l'index et la catégorie et d'un produit 
  * et ouvre une modale concernant le produit en question
  * en conséquence
  * @param {number} catId
  * @param {number} productId
  */
_productModal = (catId, productId) => {
  console.log('catId: ', catId);
  console.log('productId: ', productId);
  const modalOptions: ModalOptions = { enableBackdropDismiss: true, showBackdrop: true};
  const productModal: Modal = this.modalCtrl.create(ProductModalPage, { 
    product: this.tahapan[catId].bahan[productId] 
  }, modalOptions);
   productModal.present();
   productModal.onWillDismiss((param) => {  
     if(param.addToCart) {
      this._addToCart(productId);
     }
   });
}

/**
  * Méthode qui calcule le prix total du panier si le panier a au moins un élément.
  */
  _totalPrice = () => {
    this.total = this.cart.length > 0 ? this.cart
    .map(item => item.nama_bahan)
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
