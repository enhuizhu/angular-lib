import { TestBed, inject } from '@angular/core/testing';

import { OpenfinNotificationService } from './openfin.notification.service';

describe('OpenfinNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenfinNotificationService]
    });
  });

  it('should be created', inject([OpenfinNotificationService], (service: OpenfinNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
