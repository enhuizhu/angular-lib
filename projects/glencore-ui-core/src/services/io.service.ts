declare var require: any;
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BACKEND_LOADED_TO_TEMPEST } from '../constants/socket.constants';
import { NotificationsService } from './notifications.service';

const io = require('socket.io-client');

@Injectable()
export class IoService {
  public socket;
  
  constructor(
    private configService: ConfigService,
    private notificationService: NotificationsService
  ) { 
    this.socket = io(configService.socketUrl);
    this.setupListener();
  }

  setupListener() {
    this.socket.on(BACKEND_LOADED_TO_TEMPEST, (data) => {
      this.notificationService.pub(BACKEND_LOADED_TO_TEMPEST, data);
    });
  }
}
