import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { GeoService } from './geo.service';
import { shareReplay, tap } from 'rxjs/operators';
import { GeoArea } from '../../models/geo.model';

@Injectable({
  providedIn: 'root'
})
export class GeoStorageService {
  svcEndpoint = 'geo';
  constructor(private apiSvc: ApiService, private geoService: GeoService) {}

  fetchArea(userId: string) {
    if (this.geoService.geoAreaChanged.value) {
      return this.geoService.getArea();
    } else {
      return this.apiSvc.getOne(this.svcEndpoint, userId).pipe(
        tap((area: GeoArea) => {
          this.geoService.setArea(area);
        })
      );
    }
  }

  saveArea(item: GeoArea, userId: string) {
    return this.apiSvc.saveOne(this.svcEndpoint, item, userId).then(() => {
      this.geoService.setArea(item);
    });
  }
}
