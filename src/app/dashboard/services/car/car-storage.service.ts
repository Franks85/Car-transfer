import { Car } from './../../models/car.model';
import { CarService } from './car.service';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarStorageService {
  svcEndpoint = 'car';
  constructor(private api: ApiService, private carService: CarService) {}

  fetchCar(userId: string): Observable<Car> {
    if (this.carService.carsChanged.value) {
      return this.carService.getCar();
    } else {
      return this.api.getOne(this.svcEndpoint, userId).pipe(
        tap((car: Car) => {
          if (car) {
            this.carService.setCar(car);
          }
        })
      );
    }
  }

  saveCar(item: Car, userId: string) {
    return this.api.saveOne(this.svcEndpoint, item, userId).then(() => {
      this.carService.setCar(item);
    });
  }

  deleteCar(userId: string) {
    return this.api.deleteOne(this.svcEndpoint, userId).then(() => {
      this.carService.deleteCar();
    });
  }
}
