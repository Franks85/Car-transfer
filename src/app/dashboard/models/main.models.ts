import { Moment } from 'moment';
import { DayTable } from './day-schedule.model';
import { Car } from './car.model';
import { GeoArea } from './geo.model';

export interface UserValues {
  geoArea: GeoArea;
  car: Car;
  dayNames?: string[];
  days: DayTable[];
}

export interface DayInfo {
  selectedDay: string;
  availableForSale: boolean;
  timestamp?: number;
  key?: string;
}

export interface DataDialog {
  id: string;
  daysList: string[];
  selectedDate: Moment;
  savedDatesInfo: DayInfo[];
  avDates: Date[];
}
