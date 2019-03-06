import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { catchError, map} from 'rxjs/operators';
import { isEmpty, isArray} from 'lodash';
import { Subject } from 'rxjs';

export interface HttpInterface {
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
  put(url: string, data: any): Promise<any>;
}

@Injectable()
export class HttpService implements HttpInterface {
  private _cache  = {};
  
  constructor(private http: HttpClient) { 
  }

  getFromCache(key, needObservable = false) {
    if (needObservable) {
      let sub = new Subject<any>();

      if (this._cache[key]) {
        sub.next(this._cache[key]);
      } else {
        sub = this.send(key, 'get', null, null, needObservable);
        // sub.subscribe(response => {
        //   this._cache[key] = response;
        // });
      }

      return sub;
    } else {
      return new Promise((resolve, reject) => {
        if (this._cache[key]) {
          resolve(this._cache[key]);
        } else {
          this.send(key, 'get').then(response => {
            this._cache[key] = response;
            resolve(response);
          }).catch(reject);
        }
      });
    }
  }

  get(url: string, cache: boolean = false, needObservable = false) {
    if (cache) {
      return this.getFromCache(url, needObservable);
    }
    
    return this.send(url, 'get', null, null, needObservable);
  }

  post(url: string, data: any): Promise<any> {
    return this.send(url, 'post', data);
  }

  put(url: string, data: any): Promise<any> { 
    return this.send(url, 'put', data);
  }

  patch(url: string, data: any): Promise<any> { 
    return this.send(url, 'patch', data);
  }

  delete(url: string, data: any = null): Promise<any> {
    return this.send(url, 'delete', data);
  }

  send(url: string, method: string, data?: any, options?: any, needObservable = false) {
    const parmas: any[] = [];
    
    const optionObj = {
      withCredentials: true,
    };

    parmas.push(url);

    if (!isEmpty(data)) {
      parmas.push(data);
    }

    if (!isEmpty(options)) {
      Object.assign(optionObj, options);
    }
    
    parmas.push(new RequestOptions(optionObj));
    
    const observer = this.http[method](...parmas);

    if (needObservable) {
      return observer;
    }

    return observer
     .pipe(
        map((res: any) =>  res),
        catchError(this.handleErrorObservable)
      )
      .toPromise();
  }

  handleErrorObservable(err: any) {
    console.error(err);
    return Promise.reject((err.error && err.error.value || (isArray(err.error) && err.error)) || err.message || err);
  }
}
