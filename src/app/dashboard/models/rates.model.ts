export interface Rate {
  km?: string;
  euro: number;
  active: boolean;
  key?: string;
}

export interface RateTable {
  key?: string;
  value: Rate[];
  name: string;
}
