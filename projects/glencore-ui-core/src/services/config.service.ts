import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

export interface Config {
  loadConfig(); 
}

@Injectable()
export class ConfigService {
  public odataUrl: string;
  public restUrl: string;
  public entitlementsBaseUri: string;
  public socketUrl: string;
  public gmexUrl: string;
  public queryUrl: string;
  public apiBaseUrl: string;
  public savedSearchUrl: string;
  public plCalendarUrl: string;
  public env: string;
  public frontend: any;
  
  constructor(private httpService: HttpService) { 

  }
  
  loadConfig(): Promise<any> {
    return new Promise((resolve) => {
      this.httpService.get('assets/config.json', true).then(results => {
        this.odataUrl = results.uri.odata;
        this.restUrl = results.uri.rest;
        this.entitlementsBaseUri = results.uri.entitlements;
        this.socketUrl = results.uri.socketUrl;
        this.gmexUrl = results.uri.gmexUrl;
        this.queryUrl = results.uri.queryUrl; 
        this.apiBaseUrl = results.uri.apiBaseUrl;
        this.savedSearchUrl = results.uri.savedSearchUrl;
        this.plCalendarUrl = results.uri.plCalendarUrl;
        this.frontend = results.frontend;
        this.env = results.env;
        resolve();
      });
    });
  }
}
