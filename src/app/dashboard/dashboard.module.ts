import { environment } from './../../environments/environment';
import { ConfirmDialogComponent } from './../ui/components/confirm-dialog/confirm-dialog.component';
import { CoreModule } from './../core/core.module';
import { UiModule } from './../ui/ui.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MatDialogRef } from '@angular/material/dialog';

import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { ProfileFormComponent } from './profile/components/profile-form/profile-form.component';
import { GeoAreaComponent } from './geo-area/geo-area.component';
import { CarComponent } from './car/car.component';
import { CarFormComponent } from './car/components/car-form/car-form.component';
import { CarDetailCardComponent } from './car/components/car-detail-card/car-detail-card.component';
import { RateCardsComponent } from './rate-cards/rate-cards.component';
import { RateSaveFormComponent } from './rate-cards/components/rate-save-form/rate-save-form.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { DaySaveFormComponent } from './day-schedule/components/day-save-form/day-save-form.component';
import { MainFeatureComponent } from './main-feature/main-feature.component';
import { DateSelectDialogComponent } from './main-feature/components/date-select-dialog/date-select-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainDashboardComponent,
    ProfileComponent,
    ProfileFormComponent,
    GeoAreaComponent,
    CarComponent,
    CarFormComponent,
    CarDetailCardComponent,
    RateCardsComponent,
    RateSaveFormComponent,
    DayScheduleComponent,
    DaySaveFormComponent,
    MainFeatureComponent,
    DateSelectDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    UiModule,
    CoreModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_api_key,
      libraries: ['places']
    })
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ProfileFormComponent,
    CarFormComponent,
    RateSaveFormComponent,
    DaySaveFormComponent,
    DateSelectDialogComponent
  ],
  providers: [
    { provide: MatDialogRef },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'it'
    }
  ]
})
export class DashboardModule {}

