import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoAreaComponent } from './geo-area.component';

describe('GeoAreaComponent', () => {
  let component: GeoAreaComponent;
  let fixture: ComponentFixture<GeoAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
