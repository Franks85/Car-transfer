import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectDialogComponent } from './date-select-dialog.component';

describe('DateSelectDialogComponent', () => {
  let component: DateSelectDialogComponent;
  let fixture: ComponentFixture<DateSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
