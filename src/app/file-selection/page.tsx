'use client';
import Divider from '@mui/material/Divider';

import FilesTable from '~components/tables/files-table/FilesTable';
import { Button } from '~components/ui/Button';
import { FormControl } from '~components/ui/FormControl';
import Select, { MenuItem } from '~components/ui/Select';
import { PROVIDER_OPTIONS } from '~lib/constants';
import useAttachments from '~lib/hooks/useAttachments';

export default function FileSelection() {
  // const { attachments } = useAttachments();

  return (
    <div className="mx-14 mb-14  bg-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 ">
        <h6 className="mx-4 text-lg font-medium">Выбор файла</h6>
      </div>
      <div className="px-10 pb-10">
        <h6 className="text-slate-400 text-sm mt-7 mb-6 font-bold uppercase">
          Фильтры
        </h6>

        <div className="mt-2 flex flex-wrap">
          <FormControl
            className="min-w-[200px] w-2/12 px-4 relative mb-3"
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
              // value={values.provider}
              // onChange={handleChange}
            >
              {PROVIDER_OPTIONS.map(({ id, label }) => (
                <MenuItem key={id} value={id}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Divider className="mt-6" />

        <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
          Файлы
        </h6>
        <div className="rounded overflow-hidden ">
          <FilesTable
            data={[
              {
                from: {
                  name: 'Андрей Дергавко',
                  address: 'andrejdergavko@gmail.com',
                },
                fileName: 'Кронавто.xls',
                date: '2023-07-13T15:04:57.000Z',
                bodyStructurePart: '2',
                letterUid: 33244,
                letterSeq: 14120,
              },
              {
                from: {
                  name: 'Андрей Дергавко',
                  address: 'andrejdergavko@gmail.com',
                },
                fileName: 'Кронавто.xls',
                date: '2023-07-13T15:04:57.000Z',
                bodyStructurePart: '2',
                letterUid: 33244,
                letterSeq: 14120,
              },
              {
                from: {
                  name: 'Андрей Дергавко',
                  address: 'andrejdergavko@gmail.com',
                },
                fileName: 'Кронавто.xls',
                date: '2023-07-13T15:04:57.000Z',
                bodyStructurePart: '2',
                letterUid: 33244,
                letterSeq: 14120,
              },
            ]}
            onRowParseClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
