import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlencoreUiCoreComponent } from './glencore-ui-core.component';

describe('GlencoreUiCoreComponent', () => {
  let component: GlencoreUiCoreComponent;
  let fixture: ComponentFixture<GlencoreUiCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlencoreUiCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlencoreUiCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
