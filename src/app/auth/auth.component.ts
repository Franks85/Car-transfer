import { UserProfile } from '../dashboard/models/user-profile.model';
import { AuthService } from './../core/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isLoading = false;
  error: string = null;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    });
  }

  onSignupLinkClick() {
    this.router.navigateByUrl('/register');
  }

  onLoginLinkClick() {
    this.router.navigateByUrl('/login');
  }

  get email() {
    return this.authService.form.get('email');
  }
  get password() {
    return this.authService.form.get('password');
  }
  get phone() {
    return this.authService.form.get('phone');
  }

  onSubmit() {
    this.isLoading = true;
    const user: UserProfile = this.authService.form.value;
    let authObs: Observable<any>;
    const { email, password } = user;
    if (this.authType === 'login') {
      if (this.email.valid && this.password.valid) {
        authObs = this.authService.login(email, password);
      }
    } else {
      if (this.email.valid && this.password.valid) {
        authObs = this.authService.signup(email, password, user);
      }
    }
    authObs
      .subscribe(
        data => {
          this.isLoading = false;
        },
        errMsg => {
          this.error = errMsg;
          this.isLoading = false;
        }
      )
      .add(() => {
        this.id = this.authService.user.value.id;
        this.router.navigate(['dashboard', 'user', this.id]);
      });
    this.authService.form.reset();
  }
}
