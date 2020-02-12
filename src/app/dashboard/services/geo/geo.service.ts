import { GeoArea } from './../../models/geo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor() {}

  form: FormGroup = new FormGroup({
    city: new FormControl('', Validators.required),
    radius: new FormControl('', Validators.required)
  });

  populateForm(values: GeoArea) {
    this.form.setValue(values);
  }

}

