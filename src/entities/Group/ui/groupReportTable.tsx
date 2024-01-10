import { FC, useMemo, useState } from 'react';
import { CourseReportDto } from '../model/courseReportDto';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Icon, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from '@/shared';

type CourseReportProps = {
  courseReport: CourseReportDto;
};

type userDataType = {
  name: string;
  email: string;
  total: number;
  [header: string]: string | number;
};

export const GroupReportTable: FC<CourseReportProps> = ({ courseReport }) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const userData: userDataType[] = useMemo(() => {
    const result: userDataType[] = courseReport.rows.map((row) => {
      const x = row.values.reduce((prev, curr, index) => {
        prev[`column-${index}`] = curr;
        return prev;
      }, {} as userDataType);

      return {
        ...x,
        name: row.user.name,
        email: row.user.email,
        total: row.score,
      };
    });

    return result;
  }, [courseReport]);

  const columns: ColumnDef<userDataType>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <button
            className='-m-4 flex h-full w-64 flex-col gap-1.5 p-4 text-start'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className='flex items-center gap-1.5'>
              <span className='line-clamp-2 font-NTSomic text-[0.8125rem] leading-tight'>Имя</span>
              {column.getIsSorted() && (
                <Icon
                  type='arrow-right'
                  className={cn(
                    'h-3 w-3 rotate-90',
                    column.getIsSorted() === 'asc' && '-rotate-90'
                  )}
                />
              )}
            </div>
          </button>
        );
      },
      cell: ({ row, getValue }) => {
        return (
          <div className='flex flex-col gap-2'>
            <span className='line-clamp-1 text-[0.8125rem] leading-tight'>
              {getValue<string>()}
            </span>
            <span className='line-clamp-1 text-[0.625rem] leading-normal text-[#B3B3B3]'>
              {row.original.email}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'total',
      header: ({ column }) => {
        return (
          <button
            className='-m-4 flex w-32 flex-col items-center justify-center gap-1.5 p-4'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <span className='line-clamp-2 font-NTSomic text-[0.8125rem] leading-tight'>Итого</span>
            <div className='flex items-center gap-1.5'>
              <span className='line-clamp-1 font-NTSomic text-[0.8125rem] leading-tight text-[#B3B3B3]'>
                / {courseReport.header.maxScore}
              </span>
              {column.getIsSorted() && (
                <Icon
                  type='arrow-right'
                  className={cn(
                    'h-3 w-3 rotate-90',
                    column.getIsSorted() === 'asc' && '-rotate-90'
                  )}
                />
              )}
            </div>
          </button>
        );
      },
      cell: ({ getValue }) => <span className='text-[0.8125rem]'>{getValue<string>()}</span>,
    },
  ];

  columns.push(
    ...courseReport.header.values.map((value, index) => {
      return {
        accessorKey: `column-${index}`,
        header: ({ column }) => {
          return (
            <button
              className='-m-4 flex w-32 flex-col items-center justify-center gap-1.5 p-4'
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              <span
                className={cn(
                  'line-clamp-2 font-NTSomic text-[0.8125rem] leading-tight',
                  courseReport.header.values[index].isModule && 'text-primary'
                )}
              >
                {value.name}
              </span>
              <div className='flex items-center gap-1.5'>
                <span className='line-clamp-1 font-NTSomic text-[0.8125rem] leading-tight text-[#B3B3B3]'>
                  {`${courseReport.header.values[index].isModule ? 'глава ' : ''}/ ${
                    courseReport.header.values[index].maxScore
                  }`}
                </span>
                {column.getIsSorted() && (
                  <Icon
                    type='arrow-right'
                    className={cn(
                      'h-3 w-3 rotate-90',
                      column.getIsSorted() === 'asc' && '-rotate-90'
                    )}
                  />
                )}
              </div>
            </button>
          );
        },
        cell: ({ getValue }) => <span className='text-[0.8125rem]'>{getValue<string>()}</span>,
      } as ColumnDef<userDataType>;
    })
  );

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className='[&>*]:scrollbar rounded-[0.5rem] border border-white/10'>
      <Table className='table-fixed'>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='first:w-64'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Никто еще не записался :)
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
