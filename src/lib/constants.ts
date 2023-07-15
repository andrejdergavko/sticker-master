import { Pages, Providers, Routes } from './enums';

export const ATTACHMENTS_FOLDER_PATH = 'attachments/';

export const PAGE_NAMES: { [key in Pages]: string } = {
  [Pages.print]: 'Печать',
  [Pages.fileSelection]: 'Выбор файла',
};

export const PAGE_NAMES_BY_ROUTE: { [key: string]: string } = {
  [Routes.print]: PAGE_NAMES[Pages.print],
  [Routes.fileSelection]: PAGE_NAMES[Pages.fileSelection],
};

export const PROVIDER_LABELS = {
  [Providers.almik]: 'Алмик',
  [Providers.arclow]: 'Арклов',
  [Providers.andrei]: 'Andrei Dergavko',
};

export const PROVIDER_OPTIONS = [
  {
    id: Providers.almik,
    label: PROVIDER_LABELS[Providers.almik],
    email: 'almik@list.ru',
  },
  {
    id: Providers.arclow,
    label: PROVIDER_LABELS[Providers.arclow],
    email: 'arclow@list.ru',
  },
  {
    id: Providers.andrei,
    label: PROVIDER_LABELS[Providers.andrei],
    email: 'andrejdergavko@gmail.com',
  },
];
