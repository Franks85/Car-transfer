import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedBtnComponent } from './raised-btn.component';

describe('RaisedBtnComponent', () => {
  let component: RaisedBtnComponent;
  let fixture: ComponentFixture<RaisedBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisedBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
