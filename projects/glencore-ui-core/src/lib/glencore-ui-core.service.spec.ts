import { TestBed, inject } from '@angular/core/testing';

import { GlencoreUiCoreService } from './glencore-ui-core.service';

describe('GlencoreUiCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlencoreUiCoreService]
    });
  });

  it('should be created', inject([GlencoreUiCoreService], (service: GlencoreUiCoreService) => {
    expect(service).toBeTruthy();
  }));
});
