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
      maxSize: 200,
    },
    {
      accessorKey: 'productName',
      header: 'Название',
      minSize: 400,
    },
    {
      accessorKey: 'quantity',
      header: 'Количество',
      size: 190,
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
      size: 190,
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
  ];

  return (
    <MaterialReactTable
      layoutMode="grid"
      columns={columns}
      data={data}
      enableRowSelection
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={false}
      enableColumnActions={false}
      initialState={{
        pagination: { pageSize: 50, pageIndex: 0 },
        density: 'compact',
      }}
      positionToolbarAlertBanner="bottom"
      muiTableBodyRowProps={({ row }) => ({
        onClick: row.getToggleSelectedHandler(),
        sx: { cursor: 'pointer' },
      })}
      muiTableBodyCellProps={{
        style: {
          whiteSpace: 'normal',
        },
      }}
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
          size: 70,
          muiTableHeadCellProps: { align: 'left' },
        },
        'mrt-row-select': { size: 40 },
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
