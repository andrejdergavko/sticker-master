export const ATTACHMENTS_FOLDER_PATH = 'attachments/';

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
}

export const PROVIDER_EMAIL_TO_LABEL_MAP: { [key in ProviderEmails]: string } =
  {
    [ProviderEmails.ARCLOW]: 'Эквипмент Рент Инвестмент',
  };

export const PROVIDER_OPTIONS = [
  {
    id: ProviderEmails.ARCLOW,
    label: PROVIDER_EMAIL_TO_LABEL_MAP[ProviderEmails.ARCLOW],
  },
];
