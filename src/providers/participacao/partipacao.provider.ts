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

  adicionarParticipante(participante:Participacao){
    return new Promise((success, reject) => {
      let _error = this._manageMessage;
      let action = this.http.post(this._url, null, JSON.stringify(participante));
      
      action.map(res => res.json().data)
            .toPromise().then(function (data){
              success(data);
            }).catch(function (err) {
              reject(_error(err));
            });
    });
  }

  removerParticipante(participante:Participacao){

    return new Promise((success, reject) => {
      let _error   = this._manageMessage;
      let action   = this.http.delete(this._url, null, participante.id);
      
      action.map(res => res.json().data)
            .toPromise().then(function (data){
              success(data);
            }).catch(function (err) {
              reject(_error(err));
            });
    });
  }

  
  public getById(id:number): Observable <any>{
    return this.http.get(this._url+'/'+id)
              .map(res => {
                return res.json().data;
              });
  }
  

  /** Privates  */
  private _manageMessage(retorno){
    
    let msgs = JSON.parse(retorno._body);
    let r = { status: 0, msg:'', participacao: null};
    for (var key in msgs) {
      if (msgs.hasOwnProperty(key)) {

        if(msgs.error.search(/fk_reciclagem_cliente_evento_contrato/) !== -1){
          r.msg    = 'Erro: Esse contrato possui participações';
        }

        if(msgs.error.search(/unique_clientes_eventos_contratos_contrato_evento_modulo/) !== -1){
          r.msg    = 'Erro: Esse contrato já participa deste evento';
          r.participacao = msgs.participacao;
        }

        r.status = 500;
          
      }else{
        r = msgs;
      }
    }

    return r;
  }
}

  
