import { Injectable } from '@angular/core';
import { createStore, applyMiddleware } from 'redux';
import { isEmpty } from 'lodash';

@Injectable()
export class Store {
  private _store: any;
  constructor(
  ) {

  }

  appStore(rootReducer: any = null, middleWares: any = []) {
    if (isEmpty(this._store)) {
      if (!isEmpty(middleWares)) {
        this._store = createStore(rootReducer, applyMiddleware(...middleWares));
      } else {
        this._store = createStore(rootReducer);
      } 
    }

    return this._store;
  }
}
