import { Injectable } from '@angular/core';
import { HttpService } from './../http-service';

import { Observable } from 'rxjs/Rx'

@Injectable()
export class CampanhaProvider {
  private _url: string = '/campanha';

  constructor(public http: HttpService) { }
 

  getAtivasByContrato(contrato:any){
    return this.http.get(this._url+'/getAtivasByContrato/'+contrato.id)
    .map(res => {  
      return res.json().data;
    });
  }

  participar(contrato_id:number, campanha_id:number, reciclagem_id:number){
    
    return new Promise((success, reject) => {
        let _error = this._manageMessage;
        let action = this.http.post(this._url+'/participar/'+reciclagem_id, 
                                    null, 
                                    JSON.stringify({campanha_id:campanha_id, contrato_id:contrato_id}));
        
        action.map(res => res.json().data)
              .toPromise().then(function (data){
                success(data);
              }).catch(function (err) {
                reject(_error(err));
              });
      });
  }

  /** Privates  */
  private _manageMessage(retorno){
    
    let msgs = JSON.parse(retorno._body);
    let r = { status: 0, msg:'', participacao: null};
    for (var key in msgs) {
      if (msgs.hasOwnProperty(key)) {

        r.status = 500;
          
      }else{
        r = msgs;
      }
    }

    return r;
  }
}