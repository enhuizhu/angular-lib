import { TestBed, inject } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';


describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsService]
    });
  });

  it('should be created', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));

  it('check sub function and removeEvent function', inject([NotificationsService], (service: NotificationsService) => {
    const callback1 = function() {};
    const callback2 = function() {};
    service.sub('test', callback1);
    expect(service.events['test']).toBeDefined();
    expect(service.events['test'].length).toBe(1);
    service.sub('test', callback2);
    expect(service.events['test'].length).toBe(2);

    service.removeEvent('test', callback1);
    expect(service.events['test'].length).toBe(1);
    service.removeEvent('test', callback2);
    expect(service.events['test'].length).toBe(0);
  }));

  it('check pub functon', inject([NotificationsService], (service: NotificationsService) => {
    const spy = jasmine.createSpy('spy');

    service.sub('test', spy);
    service.pub('test', '123');
    expect(spy).toHaveBeenCalledWith('123');
    service.pub('test', '234');
    expect(spy).toHaveBeenCalledWith('234');
  }));
});
