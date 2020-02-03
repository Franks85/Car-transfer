import { GeoArea } from './../../models/geo.model';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private geoArea: GeoArea;
  geoAreaChanged = new BehaviorSubject<GeoArea>(null);
  constructor() {}

  form: FormGroup = new FormGroup({
    city: new FormControl('', Validators.required),
    radius: new FormControl('', Validators.required)
  });

  populateForm(values: GeoArea) {
    this.form.setValue(values);
  }

  setArea(geoArea: GeoArea) {
    this.geoArea = geoArea;
    this.geoAreaChanged.next({ ...this.geoArea });
  }

  getArea() {
    return this.geoAreaChanged.asObservable();
  }
}

