import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpService } from './http.service';

@Injectable()
export class PlcalendarService {

  constructor(
    private configService: ConfigService,
    private httpService: HttpService
  ) { 
  }

  getValuationCalendar(startDate, endDate) {
    return this.httpService.get(this.getUrl(`ValuationCalendar?from=${startDate}&to=${endDate}`), true);
  }

  getValuationDateCalendar(startDate, endDate) {
    return this.httpService.get(this.getUrl(`ValuationDateCalendar?from=${startDate}&to=${endDate}`), true);
  }

  updateValuationDateCalendar(data) {
    return this.httpService.put(this.getUrl('ValuationDateCalendar'), data);
  }

  updateValuationCalendar(data) {
    return this.httpService.put(this.getUrl('Dates'), data);
  }

  getExecutionCalendar(startDate, endDate) {
    return this.httpService.get(this.getUrl(`JobExecutionCalendar?from=${startDate}&to=${endDate}`));
  }

  updateExecutionCalendar(newJobExecutionData) {
    return this.httpService.put(this.getUrl('JobExecutionCalendar'), newJobExecutionData);
  }

  getUrl(url) {
    return `${this.configService.queryUrl}/PLCalendar/api/${url}`;
  }
}
