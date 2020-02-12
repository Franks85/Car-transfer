import { BehaviorSubject } from 'rxjs';
import { DayInfo } from './../../models/main.models';
import { Moment } from 'moment';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  availableDateEdit = new BehaviorSubject<boolean>(false);
  availableDateList = new BehaviorSubject<Date[]>([]);
  datesNotAvailable = new BehaviorSubject<Date[]>([]);
  userOptKey = new BehaviorSubject<string>(null);
  constructor(private router: Router) {}

  form: FormGroup = new FormGroup({
    selectedDay: new FormControl('', Validators.required),
    availableForSale: new FormControl(false)
  });

  populateForm(values: DayInfo) {
    const formValues = {
      selectedDay: values.selectedDay,
      availableForSale: values.availableForSale || false
    };
    this.form.setValue(formValues);
  }

  navigateToFeature(feature: string, userId: string) {
    return this.router.navigate(['dashboard', 'user', userId, feature]);
  }

  createObjToDb(date: Moment, info: DayInfo) {
    if (info.availableForSale === null) {
      info.availableForSale = false;
    }
    const timestamp = +date.format('X');

    return {
      ...info,
      timestamp
    };
  }

  timestampToDate(ts: number[]) {
    return ts.map(n => moment.unix(n).toDate());
  }

  getAvailableDateList() {
    return this.availableDateList.asObservable();
  }

  getNotAvailableDateList() {
    return this.datesNotAvailable.asObservable();
  }
}
