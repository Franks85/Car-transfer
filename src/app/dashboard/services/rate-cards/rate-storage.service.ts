import { RateTable } from './../../models/rates.model';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RateStorageService {
  serviceEndpoint = 'rates';

  constructor(
    private apiService: ApiService
  ) {}

  fetchRates(userId: string) {
    return this.apiService.getList<RateTable>(this.serviceEndpoint, userId);
  }

  saveRate(rate: RateTable, userId: string) {
    return this.apiService.addToList(this.serviceEndpoint, rate, userId);
  }

  updateRate(rate: RateTable, userId: string, key: string) {
    return this.apiService.updateListItem(
      this.serviceEndpoint,
      rate,
      userId,
      key
    );
  }
}
