import { RECIEVE_USERINFO} from '../actions/userinfo.action';

export default (state = {}, action) => {
  switch (action.type) {
    case RECIEVE_USERINFO:
      return action.payload;
    default:
      return state;
  }
};
