import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureNavBtnComponent } from './feature-nav-btn.component';

describe('FeatureNavBtnComponent', () => {
  let component: FeatureNavBtnComponent;
  let fixture: ComponentFixture<FeatureNavBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureNavBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureNavBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
