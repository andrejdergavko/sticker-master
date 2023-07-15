'use client';
import { FC, memo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { IAttachment } from '~app-types/entities';

import DateCell from '../cell-renderers/DateCell';

interface FilesTableProps {
  data: IAttachment[];
  onRowParseClick: () => void;
  isLoading?: boolean;
}

const columns: MRT_ColumnDef<IAttachment>[] = [
  {
    accessorKey: 'from.name',
    header: 'Отправитель',
  },
  {
    accessorKey: 'from.address',
    header: 'Адрес',
  },
  {
    accessorKey: 'date',
    header: 'Дата',
    Cell: ({ cell }) => <DateCell date={cell.getValue<string>()} />,
  },
  {
    accessorKey: 'fileName',
    header: 'Имя файла',
    maxSize: 610,
    minSize: 300,
  },
];

const FilesTable: FC<FilesTableProps> = ({
  data,
  onRowParseClick,
  isLoading = false,
}) => {
  return (
    <MaterialReactTable
      state={{ showProgressBars: isLoading }}
      columns={columns}
      data={data}
      enableDensityToggle={false}
      enableHiding={false}
      enableColumnActions={false}
      initialState={{
        density: 'comfortable',
        sorting: [{ id: 'date', desc: true }],
        pagination: { pageSize: 50, pageIndex: 0 },
      }}
      positionToolbarAlertBanner="bottom"
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
          onClick={() => {
            // onRowsDelete([row.original?.uuid]);
          }}
        >
          <FontAwesomeIcon icon={faPrint} size="lg" />
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

export default memo(FilesTable);
