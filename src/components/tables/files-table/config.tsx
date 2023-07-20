import { MRT_ColumnDef } from 'material-react-table';

import { IAttachment } from '~app-types/entities';

import DateCell from '../cell-renderers/DateCell';

export enum Columns {
  name = 'name',
  emailAddress = 'email-address',
  date = 'date',
  fileName = 'file-name',
}

export const columns: MRT_ColumnDef<IAttachment>[] = [
  {
    id: Columns.name,
    accessorKey: 'from.name',
    header: 'Отправитель',
    minSize: 300,
    maxSize: 10,
  },
  {
    id: Columns.emailAddress,
    accessorKey: 'from.address',
    header: 'Адрес',
  },
  {
    id: Columns.date,
    accessorKey: 'date',
    header: 'Дата',
    Cell: ({ cell }) => <DateCell date={cell.getValue<string>()} />,
  },
  {
    id: Columns.fileName,
    accessorKey: 'fileName',
    header: 'Имя файла',
    // maxSize: 610,
    // minSize: 300,
  },
];
