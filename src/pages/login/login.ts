import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  // account: { username: string, password: string } = {
  //   username: 'test@example.com',
  //   password: 'test'
  // };
  loginForm: FormGroup;
  isLoggedIn: Boolean =  false;
  // Our translated text strings
  private loginErrorString: string;

  constructor(
    private globalService: GlobalServiceProvider,
    private auth: AuthProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storage: Storage) {

    this.loginForm = new FormGroup({
			name: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
    });
    this.checkUserLogin();
    this.storage.set('isLoggedIn', null);
  }

  ionviewDidLoad() {
  }
  ionviewDidEnter() {
    
  }
  checkUserLogin() {
    this.storage.get('isLoggedIn').then((loggedIn) => {
      console.log('telah login', loggedIn);
      if (loggedIn === true) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }
  // Attempt to login in through our User service
  doLogin() {
    this.globalService.presentRouteLoader();
    if (this.loginForm.value !== null) {
    this.auth.authenticate(this.loginForm.value).subscribe((resp) => {
      this.storage.set('token', resp.access_token);
      let accesstoken = resp.access_token;
      let id = resp.id;
      this.pengawas(accesstoken, id);
      this.getTahapan(accesstoken);
    }, (err) => {
      let error = err.json();
      this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
      console.log(err);
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
}

pengawas(accesstoken, id) {
  this.auth.pengawas(accesstoken, id).subscribe((resp) => {
    this.storage.set('kodepengawas', resp.pengawas.kode_pengawas);
    this.getlokasi(accesstoken, resp.pengawas.kode_pengawas);
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
    });
  }

  getlokasi(accesstoken, kodepengawas) {
    this.auth.lokasi(accesstoken, kodepengawas).subscribe((resp) => {
      this.storage.set('lokasi', resp);
      this.navCtrl.setRoot('HomePage');
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
    });

  }

  getTahapan(data) {
    this.auth.tahapan(data).subscribe((resp) => {
      this.storage.set('tahapan', resp);
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
  });
  }

}
