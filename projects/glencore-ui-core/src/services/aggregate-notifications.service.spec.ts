import { TestBed, inject } from '@angular/core/testing';

import { AggregateNotificationsService } from './aggregate-notifications.service';

describe('AggregateNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregateNotificationsService]
    });
  });

  it('should be created', inject([AggregateNotificationsService], (service: AggregateNotificationsService) => {
    expect(service).toBeTruthy();
  }));

  it('showSummaryNotifications', inject([AggregateNotificationsService], (service: AggregateNotificationsService) => {
    // test the scenario that sum of fail count and success count is less then total
    const successMsg = '%s recored has been created successfully.';
    const pluralSuccessMsg = '%s recoreds have been created successfully.';
    const failMsg = '%s recored failed to create.';
    const pluralFailMsg = '%s recoreds failed to create.';
    const succssCb = jasmine.createSpy('succssCb');
    const succssCb2 = jasmine.createSpy('succssCb2');
    const failCb = jasmine.createSpy('failCb');
    const failCb2 = jasmine.createSpy('failCb2');
    
    const result = service.showSummaryNotifications(5, 3, 9, 
      successMsg, failMsg, pluralSuccessMsg, pluralFailMsg, succssCb, failCb);

    expect(result).toBeUndefined();

    // test scenario that sum of fail count and success count is equal to the total
    service.showSummaryNotifications(5, 4, 9, successMsg, failMsg, pluralSuccessMsg, pluralFailMsg, succssCb, failCb);
    expect(succssCb).toHaveBeenCalledWith('4 recoreds have been created successfully.');
    expect(failCb).toHaveBeenCalledWith('5 recoreds failed to create.');


    service.showSummaryNotifications(1, 1, 2, successMsg, failMsg, pluralSuccessMsg, pluralFailMsg, succssCb2, failCb2);
    expect(succssCb2).toHaveBeenCalledWith('1 recored has been created successfully.');
    expect(failCb2).toHaveBeenCalledWith('1 recored failed to create.');
  }));

});
