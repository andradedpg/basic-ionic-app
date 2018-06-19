import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'
import { Reciclagem } from '../../domain/reciclagem';
import { Participacao } from '../../domain/participacao';

@Injectable()
export class ReciclagemProvider {
  public reciclagem: Reciclagem;
  private _url: string = '/reciclagem';

  constructor(public http: HttpService) { }
 
  save(reciclagem: Reciclagem){
    return new Promise((success, reject) => {
        let _error = this._manageMessage;
        let action = this.http.post(this._url, null, JSON.stringify(reciclagem));
        
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

  public getByParticipacao(participacao_id: number): Observable<any>{
    return this.http.get(this._url+'/searchByParticipacao/'+participacao_id)
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

  
