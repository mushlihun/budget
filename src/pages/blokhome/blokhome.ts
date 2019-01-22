import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, Events } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
//Models
// import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the BlokhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blokhome',
  templateUrl: 'blokhome.html',
})
export class BlokhomePage {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;
  @ViewChild('scroll') scroll: Content;
  accesstoken: any;
  bloks: any;
  kontrakheader: any;
  kodelokasi: any;
  isLastPage: boolean = false;
  SwipedTabsIndicator :any= null;
  tabElementWidth_px :number= 50;
  tabs:any=[];
  MenuPage = 'MenuPage';

  constructor(
    private storage: Storage,
    public auth: AuthProvider,
    public globalService: GlobalServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events) {
    this.tabs=["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10"];
    this.bloks = this.navParams.get('bloks'); 
    console.log('this.bloks', this.bloks);
    // this.menuService.getMenu(navParams.get('restaurant'))
    // .then(menu => {
    //   console.log('pengawas', menu);
    //   this.menu = menu.categories;
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlokhomePage');
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  onTabSelect(evt: any) {    
    switch(evt.index) {
      case 0:
        // this.events.publish('project:apartment');
        // break;
      case 1:
        this.events.publish('project:landed');
        break;
      case 2:
        this.events.publish('project:apartment');
        break;
      case 3:
        this.events.publish('project:commercial');
        break;
    }
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
     this.scroll.scrollTo(index*this.tabElementWidth_px,0,500);
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    this.scroll.scrollTo(this.SwipedTabsSlider.getActiveIndex()*this.tabElementWidth_px,0,200);

      // this condition is to avoid passing to incorrect index
    if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
    {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
    }

    }

  animateIndicator($event) {
    if(this.SwipedTabsIndicator)
         this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

  nokontrak(kodelokasi) {
    this.globalService.presentRouteLoader();
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data[0];
      console.log('kodelokasi:', kodelokasi);
        this.auth.kh(this.accesstoken, kodelokasi).subscribe((resp) => {
        console.log('no kontrak', resp);
        this.kontrakheader = resp.kontrak;
        this.kontrakdetail();
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
  }

    kontrakdetail() {
    this.storage.get('token').then((data) => {                  
      this.accesstoken = data;
        this.auth.kd(this.accesstoken).subscribe((resp) => {
        if(resp.kontrak && resp.kontrak.length > 0) {
        console.log('tipe kontrak', resp);
          this.isLastPage = true;          
          this.kontrakheader = resp.kontrak;
        } else {
          this.isLastPage = false;
        }
      }, (err) => {
        let error = err.json();
        this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
        console.log(err);
        });
      });
    }
}
