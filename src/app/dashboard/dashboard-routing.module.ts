import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { RateCardsComponent } from './rate-cards/rate-cards.component';
import { CarComponent } from './car/car.component';
import { GeoAreaComponent } from './geo-area/geo-area.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from './../core/services/auth.guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard/user/:id',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'geo', component: GeoAreaComponent},
      {path: 'car', component: CarComponent},
      {path: 'rates', component: RateCardsComponent},
      {path: 'day', component: DayScheduleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
