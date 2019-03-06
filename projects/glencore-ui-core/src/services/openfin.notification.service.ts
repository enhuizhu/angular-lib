declare var fin: any;

import { Injectable } from '@angular/core';

@Injectable()
export class OpenfinNotificationService {
  constructor() {

  }

  public publish(topic: string, data: any) {
    console.log('publish', topic);
    if (typeof fin === 'undefined') {
      return;
    }

    fin.desktop.InterApplicationBus.publish(topic, data);
  }

  public subscribe(topic: string, callback: Function) {
    console.log('subscribe', topic);
    if (typeof fin === 'undefined') {
      return;
    }

    fin.desktop.InterApplicationBus.subscribe('*', topic, function (message) {
      callback(message);
    });
  }
}
