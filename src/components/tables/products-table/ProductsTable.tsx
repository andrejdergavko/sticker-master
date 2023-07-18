import { FC, memo } from 'react';
import MaterialReactTable from 'material-react-table';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { IProduct } from '~app-types/entities';

import { columns } from './config';

type ProductsTablePropsT = {
  data: IProduct[];
  onRowsDelete: (rowUuids: string[]) => void;
};

const ProductsTable: FC<ProductsTablePropsT> = ({ data, onRowsDelete }) => {
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
        sorting: [{ id: 'date', desc: true }],
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
            const uuidsToDelete = table
              .getSelectedRowModel()
              .rows.map((row) => row.original?.uuid);

            onRowsDelete(uuidsToDelete);

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
            onRowsDelete([row.original?.uuid]);
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
