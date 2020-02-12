import { objectsEqual } from './../utils/utility';
import { GeoArea } from './../models/geo.model';
import { NotificationService } from './../../ui/services/notification.service';
import { GeoStorageService } from './../services/geo/geo-storage.service';
import { GeoService } from './../services/geo/geo.service';
import { AuthService } from './../../core/services/auth.service';

import { Component, OnInit } from '@angular/core';
import {
  Location,
  Appearance
} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-geo-area',
  templateUrl: './geo-area.component.html',
  styleUrls: ['./geo-area.component.scss']
})
export class GeoAreaComponent implements OnInit {
  userId: string;
  error: string = null;
  editMode = false;
  area: GeoArea;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  constructor(
    private authService: AuthService,
    public geoService: GeoService,
    private geoStorageService: GeoStorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.userId = this.authService.user.value.id;
    this.geoStorageService.fetchArea(this.userId).subscribe(area => {
      if (area) {
        this.geoService.populateForm(area);
        this.editMode = true;
        this.area = area;
      }
    });

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
    // Uncomment next line in production for real location search
    // this.setCurrentPosition();
  }

  onSubmit() {
    const geoArea: GeoArea = this.geoService.form.value;
    if (this.geoService.form.valid) {
      let isEqual: boolean;
      if (this.area) {
        isEqual = objectsEqual(geoArea, this.area);
      } else {
        isEqual = false;
      }
      if (!isEqual) {
        this.geoStorageService.saveArea(geoArea, this.userId).then(
          () => {
            this.notificationService.success('Area salvata correttamente!');
          },
          err => {
            this.error = err;
          }
        );
      } else {
        this.notificationService.warn("L'Area non è stata modificata!");
      }
    }
  }

  onCancel() {
    this.geoService.form.reset();
    this.editMode = false;
  }

  // Uncomment next lines in production for real location search
  /* private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onMapUpdate(lat: number, lng: number, radius: number) {}

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  } */
}
