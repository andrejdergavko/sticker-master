'use client';
import { FC, memo } from 'react';
import MaterialReactTable, {
  MRT_ColumnFiltersState,
} from 'material-react-table';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { IAttachment } from '~app-types/entities';

import { columns } from './config';

interface FilesTableProps {
  data: IAttachment[];
  onParseClick: (attachment: IAttachment) => void;
  isLoading?: boolean;
  filters?: MRT_ColumnFiltersState;
}

const FilesTable: FC<FilesTableProps> = ({
  data,
  onParseClick,
  isLoading = false,
  filters = [],
}) => {
  return (
    <MaterialReactTable
      state={{
        showProgressBars: isLoading,
        columnFilters: filters,
      }}
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
            onParseClick(row.original);
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
