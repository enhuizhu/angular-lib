import { Injectable } from '@angular/core';

export interface AggregateNotificationsServiceInterface {
  showSummaryNotifications(
    failCount: number, 
    successCount: number, 
    total: number, 
    successMsg: string, 
    failMsg: string,
    pluralSuccessMsg: string,
    pluralFailMsg: string, 
    succesCb, 
    failCb);
}

@Injectable({
  providedIn: 'root'
})
export class AggregateNotificationsService implements AggregateNotificationsServiceInterface {

  constructor() { }

  showSummaryNotifications(
    failCount: number, 
    successCount: number, 
    total: number, 
    successMsg: string, 
    failMsg: string,
    pluralSuccessMsg: string,
    pluralFailMsg: string, 
    succesCb, 
    failCb
  ) {
    const currentToatl = failCount + successCount;
    
    if (currentToatl !== total) {
      return ;
    }

    if (successCount > 0) {
      const msg = successCount > 1 ? pluralSuccessMsg : successMsg;
      successMsg = msg.replace('%s', successCount.toString());
      succesCb(successMsg);
    }

    if (failCount > 0) {
      const msg = failCount > 1 ? pluralFailMsg : failMsg;
      failMsg = msg.replace('%s', failCount.toString());
      failCb(failMsg);
    }
  }
}
