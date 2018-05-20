import { HttpService } from './../http-service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx'

import { Evento } from '../../domain/evento';

@Injectable()
export class EventoProvider {
  public evento: Evento;
  private _url: string = '/eventos';

  constructor(public http: HttpService) { }

  getDisponiveis(): Observable<Evento[]>{
      return this.http.get(this._url+'/search/disponiveis')
                      .map(res => { return res.json().data as Evento[]});
  }
  
  getByID(id:number): Observable<Evento>{
      return this.http.get(this._url+'/'+id)
                      .map(res =>{ return res.json() as Evento});
  }

}