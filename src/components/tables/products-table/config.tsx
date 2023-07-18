import { MRT_ColumnDef } from 'material-react-table';

import { IProduct } from '~app-types/entities';

export const columns: MRT_ColumnDef<IProduct>[] = [
  {
    accessorKey: 'article',
    header: 'Артикул',
  },
  {
    accessorKey: 'productName',
    header: 'Название',
  },
  {
    accessorKey: 'quantity',
    header: 'Количество',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
  },
  {
    accessorKey: 'amount',
    header: 'Сумма',
  },
];
