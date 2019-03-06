declare var fin: any;

import { Injectable } from '@angular/core';
import { uniqueId } from 'lodash';


export interface WinInterface {
  open(url: string, size?: object);
  postMessage(win: any, data: any, url: string);
}


@Injectable({
  providedIn: 'root'
})
export class WinService implements WinInterface {

  constructor() { 

  }

  open(url: string, size = {width: 1680, height: 800}) {
    if (typeof fin !== 'undefined') {
      return new fin.desktop.Window({
        name: uniqueId('win'),
        url: url,
        autoShow: true,
        backgroundColor: 'black',
        frame: false,
        defaultWidth: size.width,
        defaultHeight: size.height,
        defaultTop: 0,
        defaultLeft: 0,
        shadow: true,
      }, () => {
        console.log('win open', url);
      });
    } else {
      return window.open(url, '_blank');
    }
  }

  postMessage(win: any, data: any, url: string) {
    if (win.postMessage) {
      win.postMessage(data, url);
    } else {
      win.contentWindow.postMessage(data, url);
    }
  }
}
