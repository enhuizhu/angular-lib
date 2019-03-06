import { TestBed, inject } from '@angular/core/testing';

import { WinService } from './win.service';

describe('WinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinService]
    });
  });

  it('should be created', inject([WinService], (service: WinService) => {
    expect(service).toBeTruthy();
  }));
});
