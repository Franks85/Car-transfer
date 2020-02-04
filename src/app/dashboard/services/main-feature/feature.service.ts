import { DayInfo } from './../../models/main.models';
import { Moment } from 'moment';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DayService } from './../day-schedule/day.service';
import { CarService } from './../car/car.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { GeoService } from '../geo/geo.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  constructor(
    private router: Router,
    private geoService: GeoService,
    private carService: CarService,
    private dayService: DayService
  ) {}

  form: FormGroup = new FormGroup({
    selectedDay: new FormControl('', Validators.required),
    availableForSale: new FormControl(false)
  });

  navigateToFeature(feature: string, userId: string) {
    return this.router.navigate(['dashboard', 'user', userId, feature]);
  }

  getObjToDb(date: Moment, info: DayInfo) {
    const timestamp: string = date.format('X');
    return {
      userOpt: info,
      timestamp
    };
  }
}
