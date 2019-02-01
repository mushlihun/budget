import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})

export class ConfirmationPage {
  
  constructor(public navCtrl: NavController) {
    setTimeout(() => {
      // this.navCtrl.popToRoot();
      this.navCtrl.setRoot('HomePage');
    }, 2000);
    // });
  }
  
  _goHome = () => {
    this.navCtrl.popToRoot();
    // this.navCtrl.push('HomePage');
  }
}
