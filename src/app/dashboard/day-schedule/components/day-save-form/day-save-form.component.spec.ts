import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySaveFormComponent } from './day-save-form.component';

describe('DaySaveFormComponent', () => {
  let component: DaySaveFormComponent;
  let fixture: ComponentFixture<DaySaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
