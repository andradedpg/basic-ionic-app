import { ConfigService } from './config-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { headers } from './../properties/headers';

@Injectable()
export class HttpService {

  private _baseApi: string;

  constructor(private http: Http, 
              private _configService: ConfigService,
              private _headers: headers) {
    this.baseApi = this._configService.url;
    /*this.headers.append('Client-Token', JSON.parse(localStorage.getItem('token')));
    this.headers.append('Client-Type', '1');*/
  }

  get(url: any, baseUrl?:string) {
    let _options = new RequestOptions({ headers: this._headers.getHeaders() });

    if (!!baseUrl) {
      return this.http.get(`${baseUrl}${url}`, _options);
    } 
    return this.http.get(`${this._baseApi}${url}`, _options);
  }

  put(url, data, id){
    let _options = new RequestOptions({  headers: this._headers.getHeaders() });
    let _url = url+'/'+id;
    
    return this.http.put(`${this._baseApi}${_url}`, data ,_options);
  }

  post(url, baseUrl:string = null, data, options:RequestOptions = null ) {
    if(!options){
      options = new RequestOptions({ headers: this._headers.getHeaders() });
    }
    if (!!baseUrl) {      
      return this.http.post(`${baseUrl}${url}`, data, options);
    }
    return this.http.post(`${this._baseApi}${url}`, data, options);
  }

  delete(url, baseUrl:string = null, id){
    let _options = new RequestOptions({ headers: this._headers.getHeaders() });
    let _url = url+'/'+id;
    
    return this.http.delete(`${this._baseApi}${_url}`, _options);
  }

	public get baseApi(): string {
		return this._baseApi;
	}

	public set baseApi(value: string) {
		this._baseApi = value;
	}
  
}