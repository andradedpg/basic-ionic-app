import { HttpService } from './../http-service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx'
//import { of } from 'rxjs/observable/of';
//import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Evento } from '../../domain/evento';

@Injectable()
export class EventoProvider {
  public evento: Evento;
  private _url: string = '/eventos';

  constructor(public http: HttpService) { }

  getDisponiveis(): Observable<Evento[]>{
      return this.http.get(this._url+'/search/disponiveis')
                      .map(res => {
                        let eventos = res.json().data.filter((evento) => evento.acao.nome === 'ECOPONTOS');
                        return eventos as Evento[]; 
                        //return res.json().data as Evento[] // Retorando todos os eventos (Parceiros e EcoPontos)
                      });
  }
  
  getByID(id:number): Observable<Evento>{
      return this.http.get(this._url+'/'+id)
                      .map(res =>{ return res.json() as Evento});
  }

  update(evento:Evento){
    return new Promise((success, reject) => {
      let _success = success;
      let _reject  = reject;
      let _erroMsg = this._manageMessage;
      
      this.http.put(this._url, JSON.stringify(evento), evento.id)
                .map(res => res.json().data)
                .toPromise().then(function (data){
                  _success(data);
                }).catch(function (err) {
                  _reject(_erroMsg(err));
                });
    });
  }
  /* */

  /** Privates  */

  private _manageMessage(retorno){
    console.log(retorno);
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