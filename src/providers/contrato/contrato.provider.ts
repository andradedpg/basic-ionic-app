import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
 
import { Contrato } from './../../domain/contrato';

@Injectable()
export class ContratoProvider {
  public contrato: Contrato;
  private _url: string = '/contratos';

  constructor(public http: HttpService, 
              private _options: RequestOptions, 
              private _configService: ConfigService) { 
  }

  save(contrato: Contrato) {
    return new Promise((success, reject) => {
      let _success = success;
      let _reject  = reject;
      let _erroMsg = this._manageMessage;

      console.log(JSON.stringify(contrato));
      console.log(contrato);
      
      this.http.post(this._url, null, JSON.stringify(contrato))
          .map(res => res.json().data)
          .toPromise().then(function (data){
            _success(data);
          }).catch(function (err) {
            _reject(_erroMsg(err));
          });
      });
  }

  search(): Observable <Contrato> {
      return this.http.get(this._url+'/search')
                .map(res => res.json().contratos.data as Contrato[])
                .catch(err => Observable.throw(err.message));
  };

  private _manageMessage(retorno){
    let msgs = JSON.parse(retorno._body);
    let r = ' Atenção aos campos: ';
    for (var key in msgs) {
      if (msgs.hasOwnProperty(key)) {
          r += key+', ';
      }
    }

    return r;
  }

}
