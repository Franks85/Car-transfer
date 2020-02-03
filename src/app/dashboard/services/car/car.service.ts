import { Car } from './../../models/car.model';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { objectsEqual } from '../../utils/utility';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor() {}
  private car: Car;
  carsChanged = new BehaviorSubject<Car>(null);

  form: FormGroup = new FormGroup({
    casa: new FormControl('', Validators.required),
    modello: new FormControl('', Validators.required),
    targa: new FormControl('', Validators.required),
    anno: new FormControl('', Validators.required)
  });

  inizializedFormGroup() {
    this.form.setValue({
      casa: 0,
      modello: 0,
      targa: '',
      anno: 0
    });
  }

  populateForm(values: Car) {
    this.form.setValue(values);
  }

  checkFormValuesChanges(car1: Car, car2: Car): boolean {
    const isObjEqual = objectsEqual(car1, car2);
    if (isObjEqual) {
      return true;
    }
    return false;
  }

  setCar(car: Car) {
    this.car = car;
    this.carsChanged.next({ ...this.car });
  }

  getCar(): Observable<Car> {
    return this.carsChanged.asObservable();
  }

  deleteCar() {
    this.carsChanged.next(null);
  }
}
