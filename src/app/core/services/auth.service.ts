import { ProfileStorageService } from './../../dashboard/services/profile/profile-storage.service';
import { UserProfile } from '../../dashboard/models/user-profile.model';
import { UserData } from './../models/userData.interface';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../models';
import { catchError, tap, take, concatMap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { phoneNumberValidator } from 'src/app/core/validators/auth-form.validators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  isAuth = false;
  private tokenExpirationTimer: any;
  serviceEndpoint = 'profiles';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private http: HttpClient,
    private router: Router,
    private profileStorageService: ProfileStorageService
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    phone: new FormControl('', [Validators.required, phoneNumberValidator])
  });

  getUser() {
    return this.user.pipe(take(1));
  }

  signup(email: string, password: string, user: UserProfile) {
    return this.http
      .post<AuthResponse>(`${environment.auth_signup_url}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(data => {
          const { email, localId, idToken, expiresIn } = data;
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        }),
        concatMap(res =>
          this.profileStorageService.saveProfile(user, res.localId)
        )
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.auth_login_url}`, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(data => {
          const { email, localId, idToken, expiresIn } = data;
          this.handleAuthentication(email, localId, idToken, +expiresIn);
        })
      );
  }

  autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const { email, id, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(_tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = 'Si è verificato un errore!';
    if (!err.error || !err.error.error) {
      return throwError(errorMsg);
    }
    const { message } = err.error.error;

    switch (message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'Un profilo con questa email è già presente';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Questa email non è valida';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'Questa password non è valida';
        break;
    }
    return throwError(errorMsg);
  }
}
