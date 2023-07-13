import { Pages, Providers, Routes } from './enums';

export const PAGE_NAMES: { [key in Pages]: string } = {
  [Pages.print]: 'Печать',
};

export const PAGE_NAMES_BY_ROUTE: { [key: string]: string } = {
  [Routes.print]: PAGE_NAMES[Pages.print],
};

export const PROVIDER_LABELS = {
  [Providers.almik]: 'Алмик',
  [Providers.arclow]: 'Арклов',
};

export const PROVIDER_OPTIONS = [
  {
    id: Providers.almik,
    label: PROVIDER_LABELS[Providers.almik],
  },
  {
    id: Providers.arclow,
    label: PROVIDER_LABELS[Providers.arclow],
  },
];
