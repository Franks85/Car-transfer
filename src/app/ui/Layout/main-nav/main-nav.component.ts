import { Router, NavigationEnd } from '@angular/router';
import { SideNavLink, getSidenavLinks } from './main-nav.sidebar.model';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, withLatestFrom, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer', { static: true }) drawer: MatSidenav;
  isAuthenticated: boolean;
  @Input() userId: string;
  sidenavLinks: SideNavLink[];
  private userSub: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {
    router.events
      .pipe(
        withLatestFrom(this.isHandset$),
        filter(([a, b]) => b && a instanceof NavigationEnd)
      )
      .subscribe(_ => this.drawer.close());
  }
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!!user) {
        this.userId = user.id;
        this.sidenavLinks = getSidenavLinks(this.userId);
      }
    });
  }

  onProfileClick() {
    this.router.navigate(['dashboard', 'user', this.userId, 'profile']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
