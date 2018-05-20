import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Rx'

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