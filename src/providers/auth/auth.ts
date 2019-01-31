import { Injectable } from '@angular/core';
import Config, { ApiHelper } from '../../config/global';
import { Headers, Http, RequestOptions } from '@angular/http';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  isLoggedIn = 'isLoggedIn';
  constructor(public http: Http,
              private api: ApiHelper,
              public storage: Storage,
              private connectivityService: GlobalServiceProvider,) {
    console.log('Hello AuthProvider Provider');
  }

  loggedIn(): Promise<boolean> {
    return this.storage.get(this.isLoggedIn).then((value) => {
      return value === true;
    });
  };

  authenticate(data) {
    if (this.connectivityService.isOnline()){
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({headers: headers});
      let body = this.formData(data);
      return this.http.post(this.api.getApiUrl(Config.apis.login), body, options).map(res => res.json());
      
    } else {
      this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
    }
  }
  
  register(data) {
    if (this.connectivityService.isOnline()){
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({headers: headers});
      let body = this.formData(data);
      return this.http.post(this.api.getApiUrl(Config.apis.register), body, options).map(res => res.json());
    } else {
      this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
    }
  }
  
  bahan(token) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.bahan), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  budget(token) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        // headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.budget), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }
  budgets(token, blok) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        // headers.append('Accept', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.budget  + '?blok_no=' + blok), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  kh(token, id) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.kontraks + id), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  kd(token) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.kontrak), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }
  tahapan(token) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.tahapan), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  lokasi(token, id) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.lokasi + '?kode_pengawas='+ id), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  pengawas(token, id) {
    if (this.connectivityService.isOnline()){
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Authorization', 'Bearer '+token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.api.getApiUrl(Config.apis.pengawas + id), options).map(res => res.json());
      } else {
        this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
      }
  }

  sumbit(data) {
    if (this.connectivityService.isOnline()){
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      let options = new RequestOptions({headers: headers});
      let body = this.formData(data);
      return this.http.post(this.api.getApiUrl(Config.apis.submit), body, options).map(res => res.json());
    } else {
      this.connectivityService.toastInfo('You are offline, please check your internet connection', 3000, 'top');
    }
  }

  formData(data){
    return Object.keys(data).map(function(key){
      return encodeURIComponent(key)+'='+encodeURIComponent(data[key]);
    }).join('&');
  }
}
