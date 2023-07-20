import * as yup from 'yup';

import type { IProduct } from '~app-types/entities';

export type ValuesT = {
  provider: string;
  file?: File;
  products: IProduct[];
};

export const initialValues: ValuesT = {
  provider: '',
  file: undefined,
  products: [],
};

export const validationSchema = yup.object({
  provider: yup.string().required('Пожалуйста введите провайдера'),
  file: yup.mixed().required('Пожалуйста загрузите файл'),
  products: yup
    .array()
    .min(1, 'Ytxtuj печатать, пожалуйста добавьте хотя бы одну позицию'),
});
