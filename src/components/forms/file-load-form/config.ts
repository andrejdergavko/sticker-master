import * as yup from 'yup';

import type { IProduct } from '~app-types/entities';

export interface IValues {
  provider: string;
  file?: File;
  products: IProduct[];
}

export const initialValues: IValues = {
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
