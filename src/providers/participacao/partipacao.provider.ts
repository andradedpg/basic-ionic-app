import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'

import { Participacao } from '../../domain/participacao';
import { Evento } from '../../domain/evento';

@Injectable()
export class ParticipacaoProvider {
  public participacao: Participacao;
  private _url: string = '/participacao';

  private _searchQuery     = '';
  private _fieldsLookinFor = ['contrato.numero','cliente.nome']; 

  constructor(public http: HttpService) { }

  searchInEvento(evento: Evento, term:string): Observable<any>{
    this._searchQuery = '?search=';
     
     for(let item of this._fieldsLookinFor){
        this._searchQuery += item+':'+term+';';
     }
     
     this._searchQuery += '&searchFields=cliente.nome:like;contrato.numero:like;'
    
     return this.http.get(this._url+'/searchByEvento/'+evento.id+this._searchQuery)
                     .map(res =>{ 
                        return res.json().data as Participacao[]; 
                      });
  }

}