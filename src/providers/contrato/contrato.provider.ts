import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
//import { of } from 'rxjs/observable/of';
//import { catchError, map, tap } from 'rxjs/operators';
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

  public save(contrato: Contrato) {
    return new Promise((success, reject) => {
      let action;
      let _success = success;
      let _reject  = reject;
      let _erroMsg = this._manageMessage;
      
      if(contrato.id !== undefined && contrato.id > 0){
        action = this.http.put(this._url, JSON.stringify(contrato), contrato.id)
      }else{
        action = this.http.post(this._url, null, JSON.stringify(contrato));
      }
      
      action.map(res => res.json().data)
            .toPromise().then(function (data){
              _success(data);
            }).catch(function (err) {
              _reject(_erroMsg(err));
            });
    });
  }

  public search(term: string): Observable <any> {
      let data: Observable <any> = this.http.get(this._url+'/search/'+term);
      return data;
  };

  public getById(id:number): Observable <any>{
    return this.http.get(this._url+'/'+id)
             .map(res => {
               return res.json().data;
              })
             .catch(this._manageMessage);
  }

  /** Privates  */

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
