import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';
import { contentHeaders } from './../../properties/headers';

import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginProvider {
  private _url: string;
  private _client_id: string;
  private _client_secret: string;
  private _baseApi: string = '/oauth/token/';

  private nativeStorage: NativeStorage;

  constructor(public http: HttpService, 
              private _nativeStorage: NativeStorage, 
              private _configService: ConfigService) {

    this.nativeStorage  = _nativeStorage;
    this._url           = this._configService.url;
    this._client_id     = this._configService.client_id;
    this._client_secret = this._configService.client_secret;
  }

  fazerLogin(login) {
    let _headers = contentHeaders;
    let _options = new RequestOptions({ headers: _headers });
    let api = `${this._baseApi}`;
    let self = this;

    let body = JSON.stringify({
      username: login.usuario,
      password: login.senha,
      client_id: this._client_id,
      client_secret: this._client_secret,
      grant_type: 'password'
    });

    return new Promise((success, reject) => {
      let _success = success;
      let _reject = reject;
      self.http.post(api, this._url, body, _options)
        .map(res => res.json())
        .toPromise().then(function (data) {
            self._nativeStorage.setItem('token', data.access_token);
            localStorage.setItem('token', data.access_token);
            _success(data);
        }).catch(function (err) {
          let retorno = JSON.parse(err._body);
          _reject(retorno.message);
        });

    });
  }

  logout() {
    let api = '/logout';
    let self = this;

    let _headers = contentHeaders;
    let _options = new RequestOptions({ headers: _headers });

    let body = JSON.stringify({
      client_id: this._client_id,
      client_secret: this._client_secret
    });

    return new Promise((success, reject) => {
      let _success = success;
      let _reject = reject;
      self.http.post(api, this._url, body, _options)
        .map(res =>  res.json())
        .toPromise().then(function (data) {
            localStorage.removeItem('currentUser');          
            localStorage.removeItem('token');
            
            _success(data);
        }).catch(function (err) {
          let retorno = JSON.parse(err._body);
          _reject(retorno);
        });
    });
  }

}
