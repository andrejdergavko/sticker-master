import type { MRT_ColumnDef } from 'material-react-table';

import { IProduct } from '~app-types/entities';

export const columns: MRT_ColumnDef<IProduct>[] = [
  {
    accessorKey: 'article',
    header: 'Артикул',
    minSize: 150,
  },
  {
    accessorKey: 'productName',
    header: 'Название',
    minSize: 310,
  },
  {
    accessorKey: 'quantity',
    header: 'Количество',
    maxSize: 100,
  },
  {
    accessorKey: 'price',
    header: 'Цена',
    maxSize: 60,
  },
  {
    accessorKey: 'amount',
    header: 'Сумма',
    maxSize: 66,
  },
];
