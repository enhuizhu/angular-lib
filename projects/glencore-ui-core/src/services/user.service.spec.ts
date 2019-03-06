import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './user.service';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        HttpService,
        ConfigService,
      ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('getUserPicture', inject([UserService, ConfigService], (service: UserService, configService: ConfigService) => {
    configService.entitlementsBaseUri = 'http://gbldncommoniisdev1.anyaccess.net:82/entitlements';
    let expecResult = 'http://gbldncommoniisdev1.anyaccess.net:82/entitlements/GetUserPicture';
    expect(service.getUserPicture()).toBe(expecResult);
    expecResult = 'http://gbldncommoniisdev1.anyaccess.net:82/entitlements/GetUserPicture/Name?username=pcs';
    expect(service.getUserPicture('pcs')).toBe(expecResult);
  }));

  it('get url', inject([UserService, ConfigService], (service: UserService, configService: ConfigService) => {
    configService.entitlementsBaseUri = 'http://gbldncommoniisdev1.anyaccess.net:82/entitlements';
    const calenderUrl = service.getUrl('PlCalendar'); 
    expect(calenderUrl).toEqual('http://gbldncommoniisdev1.anyaccess.net:82/entitlements/api/PlCalendar');
  }));
});
