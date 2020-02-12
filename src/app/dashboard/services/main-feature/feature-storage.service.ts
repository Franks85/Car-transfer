import { map } from 'rxjs/operators';
import { UserValues, DayInfo } from './../../models/main.models';
import { Observable, combineLatest } from 'rxjs';
import { ApiService } from './../../../core/services/api.service';
import { DayStorageService } from './../day-schedule/day-storage.service';
import { GeoStorageService } from './../geo/geo-storage.service';
import { CarStorageService } from './../car/car-storage.service';
import { Injectable } from '@angular/core';
import { FeatureService } from './feature.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FeatureStorageService {
  serviceEndpoint = 'calendar';
  constructor(
    private carStorageService: CarStorageService,
    private geoStorageService: GeoStorageService,
    private dayStorageService: DayStorageService,
    private apiService: ApiService,
    private featureSvc: FeatureService
  ) {}

  fetchFeaturesData(userId: string): Observable<UserValues> {
    const geoArea$ = this.geoStorageService.fetchArea(userId);
    const car$ = this.carStorageService.fetchCar(userId);
    const dayList$ = this.dayStorageService.fetchDays(userId);
    return combineLatest(geoArea$, car$, dayList$).pipe(
      map(([geoArea, car, days]) => {
        const dayNames = days.map(day => day.name);
        return { geoArea, car, dayNames, days };
      })
    );
  }

  fetchDates(userId: string) {
    return this.apiService.getList<DayInfo>(this.serviceEndpoint, userId).pipe(
      map(dates => {
        const minDate = moment(new Date(Date.now()))
          .subtract(1, 'day')
          .toDate();
        const availableDayList = dates.filter(d => d.availableForSale === true);
        const avTimestamps = availableDayList.map(d => d.timestamp);
        const availableDates = this.featureSvc.timestampToDate(avTimestamps).filter(d => d >= minDate);
        const notAvalaibleDayList = dates.filter(d => d.availableForSale === false);
        const notAvTimestamps = notAvalaibleDayList.map(d => d.timestamp);
        const notAvailableDates = this.featureSvc.timestampToDate(notAvTimestamps).filter(d => d >= minDate);
        const savedDates = availableDates.concat(notAvailableDates);
        return { availableDates, notAvailableDates, info: dates, savedDates };
      })
    );
  }

  saveDates(item: DayInfo, userId: string) {
    return this.apiService.addToList(this.serviceEndpoint, item, userId);
  }

  updateDates(item: DayInfo, userId: string, key: string) {
    return this.apiService.updateListItem(
      this.serviceEndpoint,
      item,
      userId,
      key
    );
  }
}
