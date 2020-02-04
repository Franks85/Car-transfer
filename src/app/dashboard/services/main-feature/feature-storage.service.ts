import { map } from 'rxjs/operators';
import { UserValues } from './../../models/main.models';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from './../../../core/services/api.service';
import { DayStorageService } from './../day-schedule/day-storage.service';
import { GeoStorageService } from './../geo/geo-storage.service';
import { CarStorageService } from './../car/car-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureStorageService {
  serviceEndpoint = 'mainFeature';
  constructor(
    private carStorageService: CarStorageService,
    private geoStorageService: GeoStorageService,
    private dayStorageService: DayStorageService,
    private apiService: ApiService
  ) {}

  fetchUserData(userId: string): Observable<UserValues> {
    const geoArea$ = this.geoStorageService.fetchArea(userId);
    const car$ = this.carStorageService.fetchCar(userId);
    const dayList$ = this.dayStorageService.fetchDays(userId);
    return forkJoin(geoArea$, car$, dayList$).pipe(
      map(([geoArea, car, days]) => {
        const dayNames = days.map(day => day.name);
        return { geoArea, car, dayNames, days };
      })
    );
  }
}
