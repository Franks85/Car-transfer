import { DayTable } from './../../models/day-schedule.model';
import { ApiService } from './../../../core/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayStorageService {
  serviceEndpoint = 'daySchedule';

  constructor(
    private apiService: ApiService
  ) {}

  fetchDays(userId: string) {
    return this.apiService.getList<DayTable>(this.serviceEndpoint, userId);
  }

  saveDay(day: DayTable, userId: string) {
    return this.apiService.addToList(this.serviceEndpoint, day, userId);
  }

  updateDay(day: DayTable, userId: string, key: string) {
    return this.apiService.updateListItem(
      this.serviceEndpoint,
      day,
      userId,
      key
    );
  }
}
