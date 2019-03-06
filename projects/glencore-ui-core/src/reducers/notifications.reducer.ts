import { RECIEVE_NOTIFICATIONS } from '../actions/notifications.action';

export default (state = [], action) => {
  switch (action.type) {
    case RECIEVE_NOTIFICATIONS:
      state = state.concat(action.payload);
      return state;
    default:
      return state;
  }
};
