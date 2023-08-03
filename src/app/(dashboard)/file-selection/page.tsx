'use client';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';

import FilesTable from '~components/tables/files-table/FilesTable';
import { Columns } from '~components/tables/files-table/config';
import { FormControl } from '~components/ui/FormControl';
import Select, { MenuItem } from '~components/ui/Select';
import { PROVIDER_OPTIONS, Routes } from '~lib/constants';
import useAttachments from '~lib/hooks/useAttachments';
import useParseAttachment from '~lib/hooks/useParseAttachment';
import { IAttachment } from '~app-types/entities';
import { useProductsStore } from '~store/products';

export default function FileSelection() {
  const router = useRouter();
  const { setProducts } = useProductsStore();

  const { parseAttachment, isParsing } = useParseAttachment({
    onSuccess(data) {
      setProducts(data);
      router.push(Routes.PRINT);
    },
  });
  const { attachments = [], isLoading } = useAttachments();
  const [providerEmailFilter, setProviderEmailFilter] = useState('');

  const handleAttachmentParse = (attachment: IAttachment) => {
    parseAttachment({
      bodyStructurePart: attachment.bodyStructurePart,
      fileName: attachment.fileName,
      providerEmail: attachment.from.address,
      letterSeq: attachment.letterSeq,
    });
  };

  return (
    <div className="mx-10 mb-14  bg-slate-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-slate-50 ">
        <h6 className="mx-4 text-lg font-medium">Выбор файла</h6>
      </div>
      <div className="px-10 pb-10">
        <h6 className="text-slate-400 text-sm mt-7 mb-6 font-bold uppercase">
          Фильтры
        </h6>

        <div className="mt-2 flex flex-wrap">
          <FormControl className="min-w-[200px] w-2/12 px-4 relative mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="provider-select-label"
            >
              Поставщик
            </label>
            <Select
              labelId="provider-select-label"
              id="provider-select"
              name="provider"
              value={providerEmailFilter}
              onChange={(e) => {
                setProviderEmailFilter(e.target.value);
              }}
            >
              <MenuItem key="all" value={''}>
                Все
              </MenuItem>
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
        <div className="rounded overflow-hidden">
          <FilesTable
            data={attachments}
            onParseClick={handleAttachmentParse}
            isParsing={isParsing}
            isLoading={isLoading}
            filters={[{ id: Columns.emailAddress, value: providerEmailFilter }]}
          />
        </div>
      </div>
    </div>
  );
}
