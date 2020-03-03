/* import { Observable, of } from 'rxjs';
import { DOMHelper } from './../../testing/domHelper';
import { User } from './../core/models/user.model';
import { AuthService } from './../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from './../ui/ui.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthComponent } from './auth.component';

fdescribe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authSvcMock: any;
  let dh: DOMHelper<AuthComponent>;
  let user: User;

  beforeEach(async(() => {
    authSvcMock = jasmine.createSpyObj('AuthService', ['login', 'signup']);
    authSvcMock.login.and.returnValue(Observable);
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        UiModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: authSvcMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */