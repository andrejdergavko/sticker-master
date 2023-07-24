import { FC, memo } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { IProduct } from '~app-types/entities';

import EditableNumberCell from '../cell-renderers/EditableNumberCell';

type ProductsTableProps = {
  data: IProduct[];
  onDelete: (rowIds: string[]) => void;
  onEdit: (rowId: string, newValues: Partial<IProduct>) => void;
};

const ProductsTable: FC<ProductsTableProps> = ({ data, onDelete, onEdit }) => {
  const columns: MRT_ColumnDef<IProduct>[] = [
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
      Cell({ cell }) {
        return (
          <EditableNumberCell
            value={cell.getValue<number>()}
            onChange={(newValue) => {
              onEdit(cell.row.original.id, { quantity: newValue });
            }}
          />
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Цена',
      maxSize: 60,
      Cell({ cell }) {
        return (
          <EditableNumberCell
            value={cell.getValue<number>()}
            onChange={(newValue) => {
              onEdit(cell.row.original.id, { price: newValue });
            }}
          />
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Сумма',
      maxSize: 66,
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={false}
      enableColumnActions={false}
      initialState={{
        density: 'comfortable',
        pagination: { pageSize: 50, pageIndex: 0 },
        // @ts-ignore problem in the material-react-table lib
        density: 'compact',
      }}
      positionToolbarAlertBanner="bottom"
      muiTableBodyRowProps={({ row }) => ({
        onClick: row.getToggleSelectedHandler(),
        sx: { cursor: 'pointer' },
      })}
      //TopToolbarActions
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          className="normal-case m-2"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => {
            const idsToDelete = table
              .getSelectedRowModel()
              .rows.map((row) => row.original?.id);
            onDelete(idsToDelete);
            table.resetRowSelection();
          }}
          variant="contained"
          size="small"
          color="error"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" size="sm" />
          Удалить
        </Button>
      )}
      //Row actions props
      enableRowActions
      displayColumnDefOptions={{
        'mrt-row-actions': {
          header: '',
          muiTableHeadCellProps: {
            align: 'left',
          },
        },
      }}
      renderRowActions={({ table, row }) => (
        <Button
          className="w-1 p-2 mx-3 min-w-fit"
          onClick={(e) => {
            e.stopPropagation();
            onDelete([row.original?.id]);
          }}
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
        </Button>
      )}
      positionActionsColumn="last"
      //Pagination
      muiTablePaginationProps={{
        rowsPerPageOptions: [25, 50, 100, 200],
      }}
    />
  );
};

export default memo(ProductsTable);
