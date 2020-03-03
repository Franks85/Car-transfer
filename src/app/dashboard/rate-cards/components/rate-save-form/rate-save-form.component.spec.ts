import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateSaveFormComponent } from './rate-save-form.component';

describe('RateSaveFormComponent', () => {
  let component: RateSaveFormComponent;
  let fixture: ComponentFixture<RateSaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateSaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
