import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
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

  save(contrato: Contrato) {
    if (contrato.id) {
        return this.http.put(this._url + '/' + contrato.id, JSON.stringify(contrato.id))
            .map(res => res.json().data as Contrato)
            .toPromise()
            .catch(this.handleError);
    } else {
        return this.http.post(this._url, null, JSON.stringify(contrato))
            .map(res => res.json().data as Contrato)
            .toPromise()
            .catch(this.handleError);
    }
  }

  search(): Observable <Contrato> {
      return this.http.get(this._url+'/search')
                .map(res => res.json().contratos.data as Contrato[])
                .catch(err => Observable.throw(err.message));
  };

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  private log(message: string) {
    console.log(message);
  }
}
