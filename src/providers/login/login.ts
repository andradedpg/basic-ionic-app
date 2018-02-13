import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class LoginProvider {
  private _url: string;
  private _baseApi: string = '/pp/fazerLogin';

  private nativeStorage: NativeStorage;

  constructor(public http: HttpService, _options: RequestOptions, private _nativeStorage: NativeStorage, private _configService: ConfigService) {
    this.nativeStorage = _nativeStorage;
    this._url = ConfigService._portalUrl;
  }

  fazerLogin(login) {

    let _headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let _options = new RequestOptions({ headers: _headers });
    let body = new URLSearchParams();
    let api = `${this._baseApi}`;
    let self = this;

    body.set('cdMatricula', login.usuario);
    body.set('isFaleConosco', 'false');
    body.set('senha', login.senha);
    body.set('tpUsuario', '1');
    body.set('json', '1');

    return new Promise((success, reject) => {
      let _success = success;
      let _reject = reject;
      self.http.post(api, this._url, body.toString(), _options)
        .map(res => res.json())
        .toPromise().then(function (data) {
          if (data.status) {
            self._nativeStorage.setItem('beneficiario', data.beneficiario);
            self._nativeStorage.setItem('token', data.token);
            self._nativeStorage.setItem('usuario', data.usuario);
            self._nativeStorage.setItem('snUnimed', data.snOperadoraUnimed == "S" ? true:false);

            localStorage.setItem('beneficiario', JSON.stringify(data.beneficiario));
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            localStorage.setItem('snUnimed', JSON.stringify(data.snOperadoraUnimed));
            _success(data);
          } else {
            _reject(data);
          }
        }).catch(function (err) {

          _reject(err);

        });

    });
  }

}
