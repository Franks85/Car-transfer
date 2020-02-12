import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { FeatureService } from 'src/app/dashboard/services/main-feature/feature.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Output()
  dateSelected = new Subject<Moment>();

  @Output()
  selectedDate: Moment;

  @ViewChild('calendar', { static: false })
  calendar: MatCalendar<Moment>;

  minDate = new Date(Date.now());
  maxDate: Date;
  avDates$: Subscription;
  avDateList: Date[];
  notAvDates$: Subscription;
  notAvDateList: Date[];
  constructor(private mainFeatureSvc: FeatureService) {
    this.maxDate = new Date(
      new Date().setFullYear(this.minDate.getFullYear() + 1)
    );
  }

  ngOnInit() {
    this.avDates$ = this.mainFeatureSvc
      .getAvailableDateList()
      .subscribe(dates => {
        this.avDateList = dates;
      });
    this.notAvDates$ = this.mainFeatureSvc
      .getNotAvailableDateList()
      .subscribe(dates => (this.notAvDateList = dates));
  }

  dateChanged() {
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.next(this.selectedDate);
    this.selectedDate = null;
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const actDate = moment(date);
      const available = this.avDateList
        .map(dt => moment(dt))
        .some(
          d =>
            d.date() === actDate.date() &&
            d.month() === actDate.month() &&
            d.year() === actDate.year()
        );
      const notAvailable = this.notAvDateList
        .map(dt => moment(dt))
        .some(
          d =>
            d.date() === actDate.date() &&
            d.month() === actDate.month() &&
            d.year() === actDate.year()
        );
      return available
        ? 'cell-color-avalaible'
        : notAvailable
        ? 'cell-color-not-avalaible'
        : '';
    };
  }

  onCalendarRefresh() {
    this.selectedDate = null;
    this.calendar.updateTodaysDate();
  }

  ngOnDestroy() {
    this.avDates$.unsubscribe();
    this.notAvDates$.unsubscribe();
  }
}
