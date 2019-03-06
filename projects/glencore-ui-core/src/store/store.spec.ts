import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { HttpService } from '../services/http.service';
import { ConfigService } from '../services/config.service';
import { NotificationsService } from '../services/notifications.service';
import { Store } from './store';
import { recieveUserInfo } from '../actions/userinfo.action';
import { recieveNotifications } from '../actions/notifications.action';
import { combineReducers } from 'redux';
import { indexReducer } from '../reducers/index.reducer';

describe('data middleware', () => {
  const rootReducer = combineReducers(indexReducer);
  let appStore;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ 
        Store, 
        UserService, 
        HttpService, 
        ConfigService,
        NotificationsService,
      ]
    });
  });

  it('test store userinfo', inject([Store], (store: Store) => {
    appStore =  store.appStore(rootReducer, []);
    let state = appStore.getState();
    console.log('state', state);
    expect(state.userinfo).toEqual({});
    
    appStore.dispatch(recieveUserInfo({'name': 'test'}));
    state = appStore.getState();
    expect(state.userinfo).toEqual({'name': 'test'});
  }));

  it('test reducer of notifications', inject([Store], (store: Store) => {
    appStore = store.appStore(rootReducer, []);
    let state = appStore.getState();
    console.log('initial notifications', state.notifications);
    expect(state.notifications.length).toBe(0);

    appStore.dispatch(recieveNotifications({type: 'error', text: 'error'}));
    state = appStore.getState();
    expect(state.notifications.length).toBe(1);
  }));
});
