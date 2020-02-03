import { dataSm, dataLg } from './main-dashboard-card-model';
import { CardConfig } from './main-dashboard-card-model';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  @Input() isAuth: boolean;
  cards: Observable<CardConfig[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return dataSm;
        }

        return dataLg;
      })
    );
  }

  onSectionClick(): void {
    this.router.navigateByUrl('login');
  }
}
