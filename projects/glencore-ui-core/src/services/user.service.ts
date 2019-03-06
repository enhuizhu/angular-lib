import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';

export interface UserServiceInterface {
  getUserInfo();
}

@Injectable()
export class UserService implements UserServiceInterface {
  
  constructor(
    private httpService: HttpService, 
    private configService: ConfigService,
  ) {
  }

  getUserInfo() {
    return this.httpService.get(this.getUrl('username'));
  }

  getUserPicture(name: string = null) {
    return `${this.configService.entitlementsBaseUri}/GetUserPicture${name ? '/Name?username=' + name : ''}`;
  }

  getPLCalendarEntitlements() {
    return this.httpService.get(this.getUrl('PlCalendar'), true);
  }

  getUrl(url) {
    return `${this.configService.entitlementsBaseUri}/api/${url}`; 
  }
}
