import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'
import { Residuo } from '../../domain/residuo';

@Injectable()
export class ResiduoProvider {
  public residuo: Residuo;
  private _url: string = '/vigencias';

  constructor(public http: HttpService) { }
  
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

  
