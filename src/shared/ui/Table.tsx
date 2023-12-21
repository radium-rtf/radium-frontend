'use client';
import { SortDirection, TableContainer, TableSortLabel } from '@mui/material';
import MuiTable from '@mui/material/Table';
import MuiTableBody from '@mui/material/TableBody';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';
import {
  Children,
  FC,
  ReactElement,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';

type Order = 'asc' | 'desc';

interface ITableHeader {
  children: ReactNode;
  orderByColumn: number;
  order: Order;
  createSortHandler: (column: number) => void;
}

const TableHeader: FC<ITableHeader> = ({
  children,
  orderByColumn,
  order,
  createSortHandler,
}) => {
  return (
    <MuiTableHead>
      <MuiTableRow>
        {Children.map(children, (child, column) => (
          <TableCell
            className='bg-black bg-opacity-10 hover:bg-white hover:bg-opacity-5'
            key={column}
          >
            <TableSortLabel
              sx={{
                marginLeft: '1.25rem',
                '& .MuiTableSortLabel-icon': {
                  color: '#E6E6E6',
                },
              }}
              IconComponent={() => (
                <Icon
                  className={cn(
                    'm-1 shrink-0',
                    orderByColumn !== column && 'opacity-0'
                  )}
                  width='16'
                  height='16'
                  type={
                    orderByColumn === column && order === 'desc' ? 'down' : 'up'
                  }
                />
              )}
              active={orderByColumn === column}
              direction={orderByColumn === column ? order : 'asc'}
              onClick={() => createSortHandler(column)}
            >
              {child}
            </TableSortLabel>
          </TableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

interface TableCellProps {
  children: ReactNode;
  scope?: string;
  className?: string;
  sortDirection?: SortDirection;
}

export const TableCell: FC<TableCellProps> = ({
  children,
  scope,
  className,
  sortDirection = false,
}) => {
  return (
    <MuiTableCell
      style={{ borderBottom: 'none' }}
      scope={scope}
      sortDirection={sortDirection}
      className={cn(
        'flex',
        'p-4',
        'break-words',
        'gap-1.5',
        'border-r',
        'outline-none',
        'border-white',
        'border-opacity-10',
        'text-text-primary',
        className
      )}
    >
      {children}
    </MuiTableCell>
  );
};

interface ITableHeaderCell {
  children: ReactNode;
  className?: string;
}

export const TableHeaderCell: FC<ITableHeaderCell> = ({
  children,
  className,
}) => <div className={className}>{children}</div>;

interface ITable {
  headerRow: ReactElement<ITableHeaderCell>[];
  bodyRows: ReactElement<ITableBodyRow>[];
}

export const Table: FC<ITable> = ({ bodyRows, headerRow }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderByColumn, setOrderByColumn] = useState(0);

  const handleRequestSort = (column: number) => {
    if (orderByColumn === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrder('desc');
    }
    setOrderByColumn(column);
  };

  const createSortHandler = (column: number) => {
    handleRequestSort(column);
  };

  const orderedRows = useMemo(
    () => sortRows(bodyRows, getComparator(order, orderByColumn)),
    [bodyRows, order, orderByColumn]
  );

  return (
    <div
      className='
            radium-scrollbar
            overflow-hidden
            rounded-lg
            border
            border-white
            border-opacity-10
            '
    >
      <TableContainer
        sx={{
          '&::-webkit-scrollbar': {
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '4px',
            backgroundColor: 'rgb(132, 133, 134)',
          },
        }}
      >
        <MuiTable className='table-auto'>
          <TableHeader
            orderByColumn={orderByColumn}
            order={order}
            createSortHandler={createSortHandler}
          >
            {headerRow}
          </TableHeader>
          <TableBody>{orderedRows}</TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

interface ITableBody {
  children: ReactElement<ITableBodyRow>[];
}

export const TableBody: FC<ITableBody> = ({ children }) => (
  <MuiTableBody>
    {children.map((row, rowIndex) => (
      <TableBodyRow
        key={rowIndex}
        rowIndex={rowIndex}
        row={row.props.row}
      ></TableBodyRow>
    ))}
  </MuiTableBody>
);

interface ITableDataCell {
  children: ReactNode;
  value: string;
}

export const TableDataCell: FC<ITableDataCell> = ({ children }) => (
  <>{children}</>
);

interface ITableBodyRow {
  row: ReactElement<ITableDataCell>[];
  rowIndex: number;
}

export const TableBodyRow: FC<ITableBodyRow> = ({ row, rowIndex }) => (
  <MuiTableRow
    className='border-b border-white border-opacity-10'
    key={rowIndex}
  >
    {row.map((value, cellIndex) => (
      <TableCell scope='row' key={cellIndex}>
        <text className='text-sm text-text-primary'>{value}</text>
      </TableCell>
    ))}
  </MuiTableRow>
);

function descendingComparator(a: string[], b: string[], orderByColumn: number) {
  const num = Number(a[orderByColumn]);
  const valueToCompare = isNaN(num) ? a[orderByColumn] : num;
  if (b[orderByColumn] < valueToCompare) {
    return -1;
  }
  if (b[orderByColumn] > valueToCompare) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderByColumn: number
): (a: string[], b: string[]) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderByColumn)
    : (a, b) => -descendingComparator(a, b, orderByColumn);
}

function sortRows(
  array: readonly ReactElement<ITableBodyRow>[],
  comparator: (a: string[], b: string[]) => number
): ReactElement<ITableBodyRow>[] {
  const stabilizedThis = array.map(
    (element, index) =>
      [element, index] as [ReactElement<ITableBodyRow>, number]
  );
  stabilizedThis.sort((row1, row2) => {
    const order = comparator(
      row1[0].props.row.map((child) => child.props.value),
      row2[0].props.row.map((child) => child.props.value)
    );

    if (order !== 0) {
      return order;
    }
    return row1[1] - row2[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
