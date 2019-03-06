export const RECIEVE_USERINFO = 'RECIEVE_USERINFO';
export const GET_USERINFO = 'GET_USERINFO';

export const recieveUserInfo = (info) => ({
  type: RECIEVE_USERINFO,
  payload: info,
});

export const getUserInfo = () => ({
  type: GET_USERINFO
});
