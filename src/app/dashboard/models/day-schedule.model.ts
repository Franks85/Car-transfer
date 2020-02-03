export interface Day {
  hour?: string;
  active: boolean;
  tarif: string;
  key?: string;
}

export interface DayTable {
  key?: string;
  value: Day[];
  name: string;
}

