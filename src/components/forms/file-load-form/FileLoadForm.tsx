'use client';
import { ChangeEvent, FC } from 'react';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';

import Select, { MenuItem } from '~components/ui/Select';
import { Button } from '~components/ui/Button';
import { FormControl } from '~components/ui/FormControl';
import { PROVIDER_OPTIONS } from '~lib/constants';

import { initialValues, validationSchema, type IValues } from './config';

const ImportForm: FC = () => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    validateForm,
    errors,
  } = useFormik<IValues>({
    validateOnChange: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {},
  });

  const handleParseClick = async (): Promise<void> => {};

  const handleRowsDelete = (uuidsToDelete: string[]): void => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-14 mb-14  bg-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 ">
          <h6 className="mx-4 text-lg font-medium">Загрузка файла</h6>
        </div>
        <div className="px-10 pb-10">
          <h6 className="text-slate-400 text-sm mt-7 mb-6 font-bold uppercase">
            Настройка парсинга
          </h6>

          <div className="mt-2 flex flex-wrap">
            <FormControl
              className="min-w-[200px] w-2/12 px-4 relative mb-3"
              error={Boolean(errors.provider)}
              helperText={errors.provider}
              helperTextId="bank-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="bank-select-label"
              >
                Поставщик
              </label>
              <Select
                labelId="bank-select-label"
                aria-describedby="bank-error-text"
                id="bank-select"
                name="bank"
                value={values.provider}
                onChange={handleChange}
              >
                {PROVIDER_OPTIONS.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              className="flex-1 min-w-[240px] px-4 relative mb-3"
              error={Boolean(errors.file)}
              helperText={errors.file}
              helperTextId="file-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="exchange-rate-input"
              >
                Файл
              </label>
              <input
                aria-describedby="file-error-text"
                className="block w-full file:h-11 file:py-3 file:px-4 file:mr-3 file:border-none file:bg-slate-800
                  file:text-slate-100 file:cursor-pointer file:font-bolt text-sm shadow rounded cursor-pointer bg-gray-50 focus:outline-none"
                id="file-upload-input"
                type="file"
                name="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('file', e.target.files?.[0]);
                }}
              />
            </FormControl>

            <div className="mt-6 px-4">
              <Button
                className="h-11"
                variant="contained"
                size="large"
                onClick={handleParseClick}
              >
                Парсинг файла
              </Button>
            </div>
          </div>

          <Divider className="mt-6" />

          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            Превью
          </h6>

          <div className="flex justify-end mt-10">
            <Button
              disabled={values.products.length === 0}
              variant="contained"
              size="large"
              type="submit"
            >
              Печать
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImportForm;
