import {
  Component,
  OnInit,
  Output,
  ViewChild,
  Renderer2,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatCalendar } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Output()
  dateSelected = new Subject<Moment>();

  @Output()
  selectedDate: Moment;

  @ViewChild('calendar', { static: false })
  calendar: MatCalendar<Moment>;

  minDate = new Date(Date.now());
  maxDate: Date;

  constructor(private renderer: Renderer2) {
    this.maxDate = new Date(
      new Date().setFullYear(this.minDate.getFullYear() + 1)
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    /*  const buttons = document.querySelectorAll(
      '.mat-calendar-previous-button, .mat-calendar-next-button'
    );

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          console.log('Arrow buttons clicked');
        });
      });
    } */
  }

  dateChanged() {
    this.calendar.activeDate = this.selectedDate;

    this.dateSelected.next(this.selectedDate);
  }

  dateClass(date: Date) {
    const now = moment();
    if (now.isSame(date, 'day')) {
      return 'cell-color-start';
    } else {
      return;
    }
  }
}
