import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationsService {
  events: object = {};
  subject = new Subject<any>();
  
  constructor() { 
    this.subject.subscribe({
      next: (obj) => {
        if (this.events[obj.event]) {
          this.events[obj.event].forEach((fn) => {
            fn(obj.data);
          });
        }
      }
    });
  }

  pub(eventName, data) {
    this.subject.next({
      event: eventName,
      data
    });
  }

  sub(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  }

  removeEvent(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName].map((fn, i) => {
        if (fn === callback) {
          this.events[eventName].splice(i, 1);
        }
      });
    }
  }
}
