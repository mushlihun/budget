import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

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
    private storage: Storage,
    private auth: AuthProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.loginForm = new FormGroup({
			name: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
    });
  }

  ionviewDidLoad() {
  }
  ionviewDidEnter() {
    this.checkUserLogin();
  }
  checkUserLogin() {
    this.storage.get('isLoggedIn').then((loggedIn) => {
      console.log('isLoggedIn', loggedIn);  
      if (loggedIn === true) {
        this.navCtrl.push(HomePage);
      }
    });
  }
  dologin(){
    this.navCtrl.push(HomePage);
  }
  // Attempt to login in through our User service
  doLogins() {
    console.log('authenticate', this.loginForm.value);
    if (this.loginForm.value !== null) {
    this.auth.authenticate(this.loginForm.value).subscribe((resp) => {
      console.log('authenticate', resp.id);
      this.storage.set('isLoggedIn', true);
      this.storage.set('token', resp.access_token);
      let accesstoken = resp.access_token;
      let id = resp.id;
      this.pengawas(accesstoken, id);
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
    console.log('pengawas', resp);
    this.storage.set('kodepengawas', resp.pengawas.kode_pengawas);
    this.navCtrl.push(HomePage);
  }, (err) => {
    let error = err.json();
    this.globalService.toastInfo(error.message ? error.message : 'Failed, please check your internet connection...', 3000, 'bottom');
    console.log(err);
    });
  }

}
