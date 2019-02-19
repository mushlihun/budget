import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, ModalOptions, Slides, Content, ViewController } from 'ionic-angular';
// Pages
import  { ProductModalPage } from '../product-modal/product-modal'; 
import 'rxjs/add/operator/map';
// Service
// import { MenuService } from '../../services/menu.service';
// import { AuthProvider } from '../../providers/auth/auth';
// import { GlobalServiceProvider } from '../../providers/global-service/global-service';
// Models
import { Categories } from '../../models/menu.model';
import { Storage } from '@ionic/storage';
import { OrdersService } from '../../services/orders.service';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('scroll') scroll: Content;
  menu: Categories[];
  bmt: any;
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
  produk: any = [];
  
  public blokshome: any = [];
  isLastPage: boolean = false;
  selectedTabIndex = 0;
  SwipedTabsIndicator :any= null;
  no_kontrak: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private menuService: MenuService,    
    public globalService: GlobalServiceProvider,
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
    
    // this.bloks = this.navParams.get('bloks').kode_lokasi;
    // this.no_kontrak = this.navParams.get('bloks').no_kontrak;
    // console.log('this.blok', this.bloks);
    // console.log('this.blok', this.no_kontrak);
 }

 ionViewDidEnter(){
  this.storage.get('nokontrak').then((data) => {
    this.nokontrak = data;
  });
  this.SwipedTabsIndicator = document.getElementById("indicator");
  // this.kontrakdetail();
 }

 onTabSelect(ev: any) {
  // this.selectedTabIndex = ev.index;
  
    this.selectedTabIndex = ev.index;
    // this.storage.set('blokno', indexhome.blok_no);
    // this.superTabs.clearBadge(this.blokshome[ev.index].title);
    // console.log('supertabs', this.blokshome[ev.index].title);
}
click(indexhome) {
  this.storage.set('blokno', indexhome.blok_no);
  this.storage.get('budgets').then((data) => {
    let bmt = data.budget.filter(item => item.tipe === indexhome.tipe);
    this.storage.set('tipes', bmt);
  });
}

getkontrakheader() {
  this.storage.get('kontrakheader').then((data) => {
    let bmt = data.filter(item => item.kode_lokasi === this.bloks);
    console.log('kontrakheader', bmt);
  });
}
kontrakdetail() {
  this.storage.get('nokontrak').then((data) => {
    console.log('nokontrak', data);
    this.no_kontrak = data;
  });
  this.storage.get('kontrakdetail').then((data) => {
    if(data && data.length > 0) {
      console.log('this.no_kontrak', this.no_kontrak);
      console.log('this.bloks', this.bloks);
    this.blokshome = data.filter(item => item.no_kontrak === this.no_kontrak);
    this.isLastPage = true;
    console.log('this.blokshome', this.blokshome);
    } else {
      this.isLastPage = false;
    }
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
    });
}

 ionViewDidLoad(){
  this.storage.get('blok').then((data) => {
    this.bloks = data;
  });
  // this.storage.get('bahan').then((data) => {
  //   this.bahan = data;
  // });
  this.storage.get('tahapan').then((data) => {
  this.tahapan = data.tahapan.sort().reverse();
  });
  
 }


/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui rajoute l'objet désiré au panier. Elle incrémente le compteur de l'objet
  * et lance la donction de calcul du prix final. Elle ajoute la ariété quantity
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
  // if (this.bahan[productId].kodebahan === this.bahan[productId].kodebahan) {
  //   this.bahan[productId].quantity = 
  // this.bahan[productId].quantity
  // ? this.bahan[productId].quantity + 1
  // : 1;
  //   this.jumlah = this.bahan[productId];
  //   this.cart.push(this.bahan[productId]);
  // }
  // // this.jumlah = this.bahan[productId].quantity;
  // console.log('quantity: ', this.bahan[productId]);
  // this.cart.push(this.bahan[productId]);

  //baru
  for (let i=0; i<this.tahapan.length; i++){
  if (this.tahapan[catId].kode_tahapan === this.tahapan[i].kode_tahapan){
  if (this.bmt[productId].kode_bahan === this.bmt[productId].kode_bahan) {
    this.bmt[productId].quantity = 
  this.bmt[productId].quantity
  ? this.bmt[productId].quantity + 1
  : 1;
  }
}
 }
  this.jumlah = this.bmt[productId];
  this.cart.push(this.bmt[productId]);
  this._totalPrice();
  console.log('this.tahapan: ',  this.tahapan[catId].kode_tahapan);
  // this._onOrder();
  //dariindra
  // for (i=0; i<produk.length; i++){
// if (produk[i][kode_bahan] === this.bahan[productId].kodebahan) {
  // produk[i].quantity = 
  // produk[i].quantity.quantity + this.bahan[productId].quantity + 1
// }
  // }
  let produk = {
    kode : this.bmt[productId].kode_bahan,
    bahan : this.bmt[productId].nama_bahan,
    qty : this.bmt[productId].quantity,
    satuan : this.bmt[productId].satuan
  }
  console.log('produk,_addToCart: ', produk);
}
addToCart = (catId, productId) => {
  for (let i = 0; this.bmt[productId] < 0; i++){
    if (this.tahapan[catId].kode_tahapan === this.tahapan[i].kode_tahapan){
    if (this.bmt[productId].kode_bahan === this.bmt[i].kode_bahan) {
      this.jumlah = this.bmt[productId].quantity;
      console.log('addToCart: ',  this.jumlah);
    }
  }
}
  // this.jumlah = this.bahan[productId].quantity;
  this.cart.push(this.bmt[productId]);
  this._totalPrice();
  let produk = {
    kode : this.bmt[productId].kode_bahan,
    bahan : this.bmt[productId].nama_bahan,
    qty : this.bmt[productId].quantity,
    satuan : this.bmt[productId].satuan
  }
  console.log('produk,addToCart: ', produk);
  console.log('this.cart: ', this.cart);
  // this._onOrder();
}

addToCarts = (productId) => {
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
  console.log('produk: ', produk);
  // this._onOrder();
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
  this.produk = newCart;
  return newCart;
}
_addToOrders = () => {
  this.storage.get('blokno').then((data) => {
  let bloks = {
    produk: this.produk,
    blokhome: this.bloks,
    blokno: data
  }
  const lastOrder = {
    date: new Date(),
    datatotal: bloks,
    produkall: this.produk,
  }
  this.ordersService.newOrder(lastOrder);
  console.log('lastorder', lastOrder);
  });
}

/**
  * Méthode qui prend les indexs des catégories et des produits 
  * qui supprime l'objet désiré du panier. Elle décrémente le compteur de l'objet
  * et lance la fonction de calcul du prix final. Elle modifie la ariété quantity
  * en conséquence
  * @param {number} catId
  * @param {number} productId
  */
_deleteFromCart = (catId,productId) => {
  // this.bahan[productId].quantity = 
  // this.bahan[productId].quantity === 0 
  // ? 0 
  // :this.bahan[productId].quantity - 1;
//baru
  this.bmt[productId].quantity = 
  this.bmt[productId].quantity === 0 
  ? 0 
  :this.bmt[productId].quantity - 1;

  const itemToRemove = this.cart.findIndex(item => 
    // item.name === this.bahan[productId].nama_bahan);
    //baru
    item.name === this.bmt[productId].nama_bahan);
    if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
      this.cart.splice(itemToRemove, 1);
    }
    // this.jumlah = this.bahan[productId].quantity;
    this.jumlah = this.bmt[productId].quantity;
    console.log('jumlah bahan setelah dikurang: ', this.jumlah);
    // this.total -= this.bahan[productId].quantity;
    this.total -= this.bmt[productId].quantity;
    this._totalPrice();
  }


// redirige vers la page de paiments si le panier contient au moins un produit.
  _onOrder = () => {
  // this._addToOrders();
  this._aggregateCart(this.cart);
  this.storage.get('blokno').then((data) => {
    let datatotal = {
      blokhome: this.bloks,
      blokno: data,
      produk: this.cart
    }
    this.storage.set('datatotal', datatotal);
    if(this.cart.length > 0) {
      for (let i = 0; i < this.cart.length; i++) {
        // if (this.cart[i].kode_bahan === this.bahan[i].kode_bahan){
        if (this.cart[i].kode_bahan === this.bmt[i].kode_bahan){
    // this._aggregateCart(this.cart);
        }
      }
      this.storage.set('cart', datatotal.produk);
      // this.navCtrl.push('PaymentPage', {
      //   produk: this.cart,
      //   datatotal
      // });
    }
    console.log('datatotal', datatotal);
    //dari indra
  //   for (let i =0; i < datatotal.produk.length; i++) {
  //     if(datatotal.produk[i].kode_bahan === this.cart[i].kode_bahan) {
  //       datatotal.produk[i].quantity = datatotal.produk[i].quantity 
  //       + 1
  //     }
  //   }
  //   console.log('datatotalp', datatotal.produk);
  //   console.log('datatotals', this.cart);

  this.navCtrl.push('PaymentPage', {
    produk: datatotal.produk,
    datatotal: datatotal
  });

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

  totalarray = () => {
    this.total = this.cart.length > 0 ? this.cart
    .map(item => item.quantity)
    .reduce((a, b) => {
      return a+b;
    }) : '0';
    console.log('total', this.total);
  }

  /**
    * Prend l'index de la catégorie et ouvre ou la ferme le menu déroulant au click.
    * Ferme les autres menus déroulant si il y en a d'autre ouverts
    * la ariété open est automatiquement rajouté à l'objet en cours. Elle n'est pas
    * définie dans l'objet initial.
    * @param {number} i
    */
  _toggleCategory(i, indextahap) {
    this.globalService.presentRouteLoader();
    this.tahapan[i].open = !this.tahapan[i].open;
    this.tahapan.forEach(item => {
      if(item !== this.tahapan[i]) {
        item.open = false;
      }
    });
    this.storage.get('budgets').then((data) => {
      let bmt = data.budget.filter(item => item.kode_tahapan === indextahap.kode_tahapan);
      this.storage.get('tipermh').then((data) => {
        let bmts = bmt.filter(item => item.tipe === data);
        if (bmts.length !== 0 ) {
          this.bmt = bmts;
        } else {
          this.globalService.presentToast('Bahan tidak ditemukan, coba lagi');
        }
      });
    });
    // this.storage.get('tipes').then((data) => {
    //   console.log('_toggleCategory data', data);
    //   this.bmt = data.filter(item => item.kode_tahapan === indextahap.kode_tahapan);
    //   console.log('_toggleCategory this.bmt', this.bmt);
    // });
  }

}
