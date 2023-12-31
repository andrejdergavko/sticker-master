export const ATTACHMENTS_FOLDER_PATH = 'attachments/';
export const SUPPORTED_FILE_FORMATS = ['xls', 'xlsx', 'csv'];

//Routing

export enum Pages {
  PRINT = 'print',
  FILE_SELECTION = 'fileSelection',
}

export enum Routes {
  PRINT = '/',
  FILE_SELECTION = '/file-selection',
}

export enum PageNames {
  PRINT = 'Печать',
  FILE_SELECTION = 'Выбор файла',
}

export const PAGE_TO_ROUTE_MAP: { [key in Pages]: Routes } = {
  [Pages.PRINT]: Routes.PRINT,
  [Pages.FILE_SELECTION]: Routes.FILE_SELECTION,
};

export const ROUTE_TO_PAGE_NAME_MAP: { [key in Routes]: PageNames } = {
  [Routes.PRINT]: PageNames.PRINT,
  [Routes.FILE_SELECTION]: PageNames.FILE_SELECTION,
};

// Provider

export enum ProviderEmails {
  ARCLOW = 'zakaz@ussrauto.by',
  USSRAUTO = 'info@ussrauto.by',
  FORSAGE = 'opt@th-tool.by',
  BUGAUTOHIT = '5222249@mail.ru',
  LAUTO = 'report@l-auto.by',
  ALMIK = 'almikauto@mail.ru',
}

export const PROVIDER_EMAIL_TO_LABEL_MAP: { [key in ProviderEmails]: string } =
  {
    [ProviderEmails.ARCLOW]: 'Эквипмент Рент Инвестмент',
    [ProviderEmails.USSRAUTO]: 'USSRAUTO',
    [ProviderEmails.FORSAGE]: 'Форсаж',
    [ProviderEmails.BUGAUTOHIT]: 'БугАвтоХит',
    [ProviderEmails.LAUTO]: 'L-AUTO',
    [ProviderEmails.ALMIK]: 'Алмик',
  };

export const PROVIDER_OPTIONS: { id: ProviderEmails; label: string }[] = [
  {
    id: ProviderEmails.ARCLOW,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ARCLOW],
  },
  {
    id: ProviderEmails.USSRAUTO,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.USSRAUTO],
  },
  {
    id: ProviderEmails.FORSAGE,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.FORSAGE],
  },
  {
    id: ProviderEmails.BUGAUTOHIT,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.BUGAUTOHIT],
  },
  {
    id: ProviderEmails.LAUTO,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.LAUTO],
  },
  {
    id: ProviderEmails.ALMIK,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ALMIK],
  },
];
