import { DOMHelper } from './../../testing/domHelper';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dh: DOMHelper<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ServicesSectionComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: DummyComponent }
        ])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(dh.getSingleElText('h1')).toBe('AUTO TRANSFER');
  });

  it('should have a subtitle', () => {
    expect(dh.getSingleElText('h3')).toBe(
      'Noleggio auto con conducente'
    );
  });

  it('should navigate to /dashboard on action button click', () => {
    const location = TestBed.get(Location);
    const actBtn = dh.getSingleDomEl('.act-btn');
    actBtn.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/dashboard');
    });
  });
});

@Component({ template: '' })
class DummyComponent {}


