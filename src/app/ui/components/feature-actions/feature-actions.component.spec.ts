import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureActionsComponent } from './feature-actions.component';

describe('FeatureActionsComponent', () => {
  let component: FeatureActionsComponent;
  let fixture: ComponentFixture<FeatureActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
