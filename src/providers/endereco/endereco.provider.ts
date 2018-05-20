import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx'
//import { of } from 'rxjs/observable/of';
//import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/toPromise';

import { Endereco } from '../../domain/endereco';

@Injectable()
export class EnderecoProvider {
  public endereco: Endereco;
  private _url: string = 'https://viacep.com.br/ws';

  constructor(public http: Http) { }

  getByCEP(cep:number): Observable<Endereco>{
      return this.http.get(this._url+'/'+cep+'/json')
                      .map(res =>{ return res.json() as Endereco});
  }

}