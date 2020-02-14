
export interface CardConfig {
  title: string;
  desc: string;
  actionLinkText: string;
  actionLink: string;
  imgUrl: string;
  cols: number;
  rows: number;
}

export const dataSm: Array<CardConfig> = [
  {
    title: 'Dashboard',
    desc: 'Inserisci i tuoi dati visitando le varie sezioni disponibili',
    actionLinkText: 'Visualizza',
    actionLink: 'main',
    imgUrl:
      'https://i.pinimg.com/originals/af/25/49/af25490494d3338afef00869c59fdd37.png',
    cols: 2,
    rows: 1
  },
  {
    title: 'Auto',
    desc: 'Gestisci i dati della tua auto',
    actionLinkText: 'Modifica',
    actionLink: 'car',
    imgUrl:
      'https://www.volareindoor.it/wp-content/uploads/2015/07/auto-icon.png',
    cols: 2,
    rows: 1
  },
  {
    title: 'Area Geografica',
    desc: 'Seleziona la tua area geografica di competenza',
    actionLinkText: 'Modifica',
    actionLink: 'geo',
    imgUrl:
      'http://www.myiconfinder.com/uploads/iconsets/256-256-67a199b16216c196ac1b41ac5c45d6a3.png',
    cols: 2,
    rows: 1
  },
  {
    title: 'Giornate',
    desc: 'Organizza le tue giornate',
    actionLinkText: 'Modifica',
    actionLink: 'day',
    imgUrl:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/schedule-day-3-507553.png',
    cols: 2,
    rows: 1
  },
  {
    title: 'Tariffari',
    desc: 'Fissa i tuoi tariffari predefiniti',
    actionLinkText: 'Modifica',
    actionLink: 'tariff',
    imgUrl:
      'https://smashicons.com/products/upload/accounting/yellow/cd9369cc3fce1a62eb07e23df6491c79.png',
    cols: 2,
    rows: 1
  }
];

export const dataLg: Array<CardConfig> = [
  dataSm[0],
  {
    title: 'Auto',
    desc: 'Gestisci i dati della tua auto',
    actionLinkText: 'Modifica',
    actionLink: 'car',
    imgUrl:
      'https://www.volareindoor.it/wp-content/uploads/2015/07/auto-icon.png',
    cols: 1,
    rows: 1
  },
  {
    title: 'Area Geografica',
    desc: 'Seleziona la tua area geografica di competenza',
    actionLinkText: 'Modifica',
    actionLink: 'geo',
    imgUrl:
      'http://www.myiconfinder.com/uploads/iconsets/256-256-67a199b16216c196ac1b41ac5c45d6a3.png',
    cols: 1,
    rows: 1
  },
  {
    title: 'Giornate',
    desc: 'Organizza le tue giornate',
    actionLinkText: 'Modifica',
    actionLink: 'day',
    imgUrl:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/schedule-day-3-507553.png',
    cols: 1,
    rows: 1
  },
  {
    title: 'Tariffari',
    desc: 'Fissa i tuoi tariffari predefiniti',
    actionLinkText: 'Modifica',
    actionLink: 'tariff',
    imgUrl:
      'https://smashicons.com/products/upload/accounting/yellow/cd9369cc3fce1a62eb07e23df6491c79.png',
    cols: 1,
    rows: 1
  }
];
