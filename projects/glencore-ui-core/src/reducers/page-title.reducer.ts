import { RECIEVE_PAGE_TITLE } from '../actions/pageTitle.action';

export default (state = '', action) => {
  switch (action.type) {
    case RECIEVE_PAGE_TITLE:
      return action.payload;
    default:
      return state;
  }
};
