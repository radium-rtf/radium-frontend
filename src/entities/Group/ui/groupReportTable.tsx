import { cn, Table, TableBodyRow, TableDataCell, TableHeaderCell } from "@/shared";
import { FC } from "react";
import { CourseReportDto, Section } from "../model/courseReportDto";

interface CourseReportProps {
    courseReport: CourseReportDto;
}

export const GroupReportTable: FC<CourseReportProps> = ({ courseReport }) => {
    const createSubtext = (text: string) =>
        <div className="text-text-secondary text-[0.625rem] mt-[0.38rem]">
            {text}
        </div>;

    const emptySectionColumns: number[] = courseReport.header.values
        .map<[Section, number]>((section, column) => [section, column])
        .filter(x => x[0].maxScore === 0)
        .map(x => x[1]);

    return (<Table
        headerRow={[
            <TableHeaderCell key='Имя' className="w-full text-text-primary text-sm">
                <p>Имя</p>
            </TableHeaderCell>,
            <TableHeaderCell key='Итог' className="text-center">
                <div className="w-full m-auto text-text-primary text-sm">
                    <p>Итог</p>
                </div>
                {createSubtext(`/ ${courseReport.header.maxScore}`)}
            </TableHeaderCell>,
            ...courseReport.header.values
                .filter((_, column) => !emptySectionColumns.includes(column))
                .map(section =>
                    <TableHeaderCell key={section.name} className="text-center">
                        <div className={cn("text-center text-text-primary text-sm m-auto", section.isModule && "text-accent-primary-200")}>
                            {section.name}
                        </div>
                        {createSubtext((section.isModule ? 'глава' : '') + ' / ' + section.maxScore)}
                    </TableHeaderCell>
                )]}
        bodyRows={courseReport.rows
            .map((row, rowIndex) => {
                return (<TableBodyRow
                    key='Body'
                    row={[
                        <TableDataCell key={row.user.name} value={row.user.name}>
                            <div>
                                {row.user.name}
                            </div>
                            {/* {createSubtext(row.user.fio)} */}
                        </TableDataCell>,
                        <TableDataCell key={row.score} value={row.score.toString()}>{row.score}</TableDataCell>,
                        ...row.values
                            .filter((_, column) => !emptySectionColumns.includes(column))
                            .map(value => <TableDataCell key={value} value={value.toString()}>{value}</TableDataCell>)]}
                    rowIndex={rowIndex}
                />);
            })}
    />);
};