import { Observable } from 'rxjs';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';
import { GeoService } from './geo.service';
import { GeoArea } from '../../models/geo.model';

@Injectable({
  providedIn: 'root'
})
export class GeoStorageService {
  svcEndpoint = 'geo';
  constructor(private apiSvc: ApiService) {}

  fetchArea(userId: string): Observable<GeoArea> {
    return this.apiSvc.getOne(this.svcEndpoint, userId);
  }

  saveArea(item: GeoArea, userId: string) {
    return this.apiSvc.saveOne(this.svcEndpoint, item, userId);
  }
}
