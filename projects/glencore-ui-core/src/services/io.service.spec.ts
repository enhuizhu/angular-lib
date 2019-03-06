import { TestBed, inject } from '@angular/core/testing';

import { IoService } from './io.service';
import { ConfigService } from './config.service';
import { NotificationsService } from './notifications.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';


describe('IoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        IoService,
        ConfigService,
        NotificationsService,
        HttpService,
      ]
    });
  });

  it('should be created', inject([IoService], (service: IoService) => {
    expect(service).toBeTruthy();
  }));
});
