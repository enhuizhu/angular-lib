import { GET_USERINFO, recieveUserInfo } from '../actions/userinfo.action';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';


@Injectable()
export class UserInfoMiddleware {
  constructor(
    private userService: UserService,
  ) {
  }

  middleware = store => next => action => {
    switch (action.type) {
      case GET_USERINFO:
        this.userService.getUserInfo().then(response => {
          store.dispatch(recieveUserInfo(response));
        });
  
        break;
  
      default:
        break;
    }
  
    /*
    * Pass all actions through by default
    */
    return next(action);
  }
}
