import { ConfigService } from './config-service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpService {

  private _baseApi: string;

  constructor(private http: Http, 
              private _configService: ConfigService) { this.baseApi = this._configService.url; }

  get(url: any, baseUrl?:string) {
    let headers = new Headers();
    this.createAuthHeader(headers);

    let _options = new RequestOptions({ headers:headers });

    if (!!baseUrl) {  
      return this.http.get(`${baseUrl}${url}`, _options);
    } 
    return this.http.get(`${this._baseApi}${url}`, _options);
  }

  put(url, data, id){
    let headers = new Headers();
    this.createAuthHeader(headers);

    let _options = new RequestOptions({  headers: headers });
    let _url = url+'/'+id;
    
    return this.http.put(`${this._baseApi}${_url}`, data ,_options);
  }

  post(url, baseUrl:string = null, data, options:RequestOptions = null ) {
    let headers = new Headers();
    this.createAuthHeader(headers);

    if(!options){
      options = new RequestOptions({ headers: headers });
    }

    if (!!baseUrl) {      
      return this.http.post(`${baseUrl}${url}`, data, options);
    }
    return this.http.post(`${this._baseApi}${url}`, data, options);
  }

  delete(url, baseUrl:string = null, id){
    let headers = new Headers();
    this.createAuthHeader(headers);

    let _options = new RequestOptions({ headers: headers });
    let _url = url+'/'+id;
    
    return this.http.delete(`${this._baseApi}${_url}`, _options);
  }

	public get baseApi(): string {
		return this._baseApi;
	}

	public set baseApi(value: string) {
		this._baseApi = value;
  }
  
  private createAuthHeader(headers: Headers){
    headers.append('Accept',          'application/json');
    headers.append('Content-Type',  'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));  
  }
}