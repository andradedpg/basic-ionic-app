import { HttpService } from './../http-service';
import { ConfigService } from './../config-service';

import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx'
import { of } from 'rxjs/observable/of';
//import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';
 
import { User } from './../../domain/user';

@Injectable()
export class UserProvider {
  public user: User;

  constructor(public http: HttpService, 
              private _options: RequestOptions, 
              private _configService: ConfigService) { 
  }

  getUserAuth(): Observable <User>{
      const url = '/user/getUserInfo';
      return this.http.get(url)
                .map(res => res.json().user.data as User)
                .catch(err => Observable.throw(err));
  };

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.user = resp.user;
  }

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
