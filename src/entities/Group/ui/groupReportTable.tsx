import { cn, Table, TableBodyRow, TableDataCell, TableHeaderCell } from '@/shared';
import { FC } from 'react';
import { CourseReportDto, Section } from '../model/courseReportDto';
import { useSession } from 'next-auth/react';

interface CourseReportProps {
  courseReport: CourseReportDto;
}

export const GroupReportTable: FC<CourseReportProps> = ({ courseReport }) => {
  const { data: session } = useSession();
  const createSubtext = (text: string) => (
    <div className='text-text-secondary mt-[0.38rem] text-[0.625rem]'>{text}</div>
  );

  const emptySectionColumns: number[] = courseReport.header.values
    .map<[Section, number]>((section, column) => [section, column])
    .filter((x) => x[0].maxScore === 0)
    .map((x) => x[1]);

  return (
    <Table
      headerRow={[
        <TableHeaderCell key='Имя' className='text-text-primary w-full text-sm'>
          <p>Имя</p>
        </TableHeaderCell>,
        <TableHeaderCell key='Итог' className='text-center'>
          <div className='text-text-primary m-auto w-full text-sm'>
            <p>Итог</p>
          </div>
          {createSubtext(`/ ${courseReport.header.maxScore}`)}
        </TableHeaderCell>,
        ...courseReport.header.values
          .filter((_, column) => !emptySectionColumns.includes(column))
          .map((section) => (
            <TableHeaderCell key={section.name} className='text-center'>
              <div
                className={cn(
                  'text-text-primary m-auto text-center text-sm',
                  section.isModule && 'text-accent-primary-200'
                )}
              >
                {section.name}
              </div>
              {createSubtext((section.isModule ? 'глава' : '') + ' / ' + section.maxScore)}
            </TableHeaderCell>
          )),
      ]}
      bodyRows={courseReport.rows.map((row, rowIndex) => {
        return (
          <TableBodyRow
            key='Body'
            row={[
              <TableDataCell key={row.user.name} value={row.user.name}>
                <div>{row.user.name}</div>
                {session?.user.roles.isTeacher && createSubtext(row.user.email)}
              </TableDataCell>,
              <TableDataCell key={row.score} value={row.score.toString()}>
                {row.score}
              </TableDataCell>,
              ...row.values
                .filter((_, column) => !emptySectionColumns.includes(column))
                .map((value) => (
                  <TableDataCell key={value} value={value.toString()}>
                    {value}
                  </TableDataCell>
                )),
            ]}
            rowIndex={rowIndex}
          />
        );
      })}
    />
  );
};
