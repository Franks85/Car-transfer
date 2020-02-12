import { Moment } from 'moment';
import { DateSelectDialogComponent } from './components/date-select-dialog/date-select-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FeatureStorageService } from './../services/main-feature/feature-storage.service';
import { AuthService } from './../../core/services/auth.service';
import { UserValues, DayInfo } from './../models/main.models';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeatureService } from '../services/main-feature/feature.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-feature',
  templateUrl: './main-feature.component.html',
  styleUrls: ['./main-feature.component.scss']
})
export class MainFeatureComponent implements OnInit, OnDestroy {
  userId: string;
  userValues$: Observable<UserValues>;
  dateSub$: Subscription;
  savedDates: Date[];
  savedDatesInfo: DayInfo[];
  constructor(
    private authService: AuthService,
    private mainStorageService: FeatureStorageService,
    public mainService: FeatureService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
    this.userValues$ = this.mainStorageService.fetchFeaturesData(this.userId);
    this.dateSub$ = this.mainStorageService
      .fetchDates(this.userId)
      .subscribe(dates => {
        this.savedDates = dates.savedDates;
        this.savedDatesInfo = dates.info;
        this.mainService.availableDateList.next(dates.availableDates);
        this.mainService.datesNotAvailable.next(dates.notAvailableDates);
      });
  }

  dateSelected(value: Moment, daysList: string[]) {
    if (!value) {
      return;
    }
    const ad = this.savedDates.map(d => moment(d).toString());
    if (ad.includes(value.toString())) {
      this.mainService.availableDateEdit.next(true);
    }
    this.dialog.open(DateSelectDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: {
        id: this.userId,
        daysList,
        selectedDate: value,
        savedDatesInfo: this.savedDatesInfo
      }
    });
  }

  ngOnDestroy() {
    this.dateSub$.unsubscribe();
  }
}
