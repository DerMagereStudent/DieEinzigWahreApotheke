import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
  })
  export class HttpService {
  
    constructor(private httpClient: HttpClient) { }
  
    public async get(url: string, headers?: HttpHeaders): Promise<any> {
      return this.httpClient.get(url, { headers: headers, withCredentials: true, observe: "response"}).toPromise().then(this.onRequestSucceeded.bind(this), this.onRequestFailed.bind(this));
    }
  
    public async post(url: string, body: any, headers?: HttpHeaders): Promise<any> {
      return this.httpClient.post(url, body, {headers: headers, withCredentials: true, observe: "response"}).toPromise().then(this.onRequestSucceeded.bind(this), this.onRequestFailed.bind(this));
    }
  
    public async put(url: string, body: any, headers?: HttpHeaders): Promise<any> {
      return this.httpClient.put(url, body, {headers: headers, withCredentials: true, observe: "response"}).toPromise().then(this.onRequestSucceeded.bind(this), this.onRequestFailed.bind(this));
    }
  
    public async delete(url: string, body: any, headers?: HttpHeaders): Promise<any> {
      return this.httpClient.delete(url, {body: body, headers: headers, withCredentials: true, observe: "response"}).toPromise().then(this.onRequestSucceeded.bind(this), this.onRequestFailed.bind(this));
    }
  
    private onRequestSucceeded(response: any): any {
      console.log(response.headers);
      return response.body;
    }
  
    private onRequestFailed(error: any): any {
      return error;
    }
  }