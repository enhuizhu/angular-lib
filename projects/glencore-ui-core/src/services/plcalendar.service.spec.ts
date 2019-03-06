import { TestBed, inject } from '@angular/core/testing';
import { PlcalendarService } from './plcalendar.service';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlcalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlcalendarService,
        ConfigService,
        HttpService
      ],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([PlcalendarService], (service: PlcalendarService) => {
    expect(service).toBeTruthy();
  }));
});
