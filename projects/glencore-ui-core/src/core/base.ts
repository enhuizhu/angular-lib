import { recieveNotifications } from '../actions/notifications.action';

export class Base {  
  protected _store: any;
  
  constructor(private store: any) {
    this._store = store.appStore();
  }

  sendError(msg) {
    this._store.dispatch(recieveNotifications({
      type: 'error',
      text: `${msg}`
    }));
  }

  sendSuccess(msg) {
    this._store.dispatch(recieveNotifications({
      type: 'success',
      text: `${msg}`
    }));
  }
}
