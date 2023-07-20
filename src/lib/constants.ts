import { Pages, Routes } from './enums';

export const ATTACHMENTS_FOLDER_PATH = 'attachments/';

//Routing

export const PAGE_NAMES: { [key in Pages]: string } = {
  [Pages.print]: 'Печать',
  [Pages.fileSelection]: 'Выбор файла',
};

export const PAGE_NAMES_BY_ROUTE: { [key: string]: string } = {
  [Routes.print]: PAGE_NAMES[Pages.print],
  [Routes.fileSelection]: PAGE_NAMES[Pages.fileSelection],
};

// Provider

export enum ProviderEmails {
  ALMIK = 'almik@list.ru',
  ARCLOW = 'arclow@list.ru',
  ANDREI = 'andrejdergavko@gmail.com',
}

export const PROVIDER_EMAIL_TO_LABEL_MAP = {
  [ProviderEmails.ALMIK]: 'Алмик',
  [ProviderEmails.ARCLOW]: 'Арклов',
  [ProviderEmails.ANDREI]: 'Andrei Dergavko',
};

export const PROVIDER_OPTIONS = [
  {
    id: ProviderEmails.ALMIK,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ALMIK],
  },
  {
    id: ProviderEmails.ARCLOW,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ARCLOW],
  },
  {
    id: ProviderEmails.ANDREI,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ANDREI],
  },
];
