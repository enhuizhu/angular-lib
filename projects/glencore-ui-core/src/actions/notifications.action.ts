export const RECIEVE_NOTIFICATIONS = 'RECIEVE_NOTIFICATIONS';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const recieveNotifications = (info) => ({
  type: RECIEVE_NOTIFICATIONS,
  payload: info,
});
