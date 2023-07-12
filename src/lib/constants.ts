import { Pages, Routes } from './enums';

export const PAGE_NAMES: { [key in Pages]: string } = {
  [Pages.print]: 'Печать',
};

export const PAGE_NAMES_BY_ROUTE: { [key: string]: string } = {
  [Routes.print]: PAGE_NAMES[Pages.print],
};
