import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class headers{
    contentHeaders = new Headers();
    
    constructor(){
        this.contentHeaders.append('Accept', 'application/json');
        this.contentHeaders.append('Content-Type', 'application/json');
        this.contentHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('token')); 
    }

    getHeaders(){
        return this.contentHeaders;
    }
};