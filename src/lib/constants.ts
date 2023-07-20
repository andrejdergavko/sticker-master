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

interface IProvider {
  id: Providers;
  label: string;
  email: string;
}

export const providers: {
  [key in Providers]: IProvider;
} = {
  [Providers.almik]: {
    id: Providers.almik,
    label: 'Алмик',
    email: 'almik@list.ru',
  },
  [Providers.arclow]: {
    id: Providers.arclow,
    label: 'Арклов',
    email: 'arclow@list.ru',
  },
  [Providers.andrei]: {
    id: Providers.andrei,
    label: 'Andrei Dergavko',
    email: 'andrejdergavko@gmail.com',
  },
};

export const PROVIDER_OPTIONS = Object.values(providers);
